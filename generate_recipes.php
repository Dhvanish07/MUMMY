<?php
/**
 * Recipe Generation Proxy
 * This file is in the root mummy folder to avoid any .htaccess or directory restrictions
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Get user ID from request
$user_id = $_GET['user_id'] ?? $_POST['user_id'] ?? null;

if (!$user_id) {
    http_response_code(400);
    echo json_encode(['error' => 'User ID is required']);
    exit;
}

// Database configuration
$db_host = 'localhost';
$db_user = 'root';
$db_password = '';
$db_name = 'mummy_db';

$GEMINI_API_KEY = "AIzaSyA7scVzCGYB8qoCNUkCu0xrhbuEptJkyu0";
$GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
$MODEL_NAME = "gemini-2.5-flash";

try {
    // Connect to database
    $conn = new mysqli($db_host, $db_user, $db_password, $db_name);
    
    if ($conn->connect_error) {
        throw new Exception('Database connection failed: ' . $conn->connect_error);
    }
    
    // Fetch user preferences including gender
    $stmt = $conn->prepare('
        SELECT name, gender, food_preference, cooking_frequency, spice_level, 
               cooking_time_preference, late_night_hunger, outside_food_frequency, mummy_reminders, language_preference
        FROM users
        WHERE id = ?
    ');
    
    if (!$stmt) {
        throw new Exception('Prepare error: ' . $conn->error);
    }
    
    $stmt->bind_param('i', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    
    if (!$user) {
        http_response_code(404);
        echo json_encode(['error' => 'User not found']);
        exit;
    }
    
    // Build the recipe generation prompt
    $prompt = buildRecipePrompt($user);
    
    // Call Gemini API
    $recipe = callGeminiAPI($prompt, $GEMINI_API_KEY, $GEMINI_API_URL, $MODEL_NAME);
    
    if (!$recipe) {
        throw new Exception('Failed to generate recipe from API');
    }
    
    // Clean up the recipe
    $recipe = cleanRecipeContent($recipe);
    
    // Return the recipe
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'user_id' => $user_id,
        'user_name' => $user['name'],
        'recipe' => $recipe,
        'preferences' => $user
    ]);
    
    $stmt->close();
    $conn->close();
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

// ========= HELPER FUNCTIONS =========

function buildRecipePrompt($user) {
    $name = $user['name'];
    $gender = $user['gender'] ?? 'not_specified';
    $foodPref = ucfirst($user['food_preference']);
    $cookingFreq = translateCookingFreq($user['cooking_frequency']);
    $spiceLevel = translateSpiceLevel($user['spice_level']);
    $cookingTime = $user['cooking_time_preference'];
    $lateNight = $user['late_night_hunger'];
    $outsideFood = $user['outside_food_frequency'];
    $mummyReminders = $user['mummy_reminders'];
    $language = $user['language_preference'] ?? 'english';
    
    // Create gender-specific greeting
    $genderGreeting = '';
    if ($gender === 'male') {
        $genderGreeting = "beta 🧑‍🍳";
    } elseif ($gender === 'female') {
        $genderGreeting = "beta 👩‍🍳";
    } else {
        $genderGreeting = "beta 🧑‍🍳";
    }
    
    return <<<EOT
You are MUMMY, a caring Indian home chef AI assistant. Generate ONE personalized recipe recommendation for {$name} ({$gender}).

**USER PROFILE:**
- Name: {$name}
- Gender: {$gender}
- Food Preference: {$foodPref}
- Cooking Frequency: {$cookingFreq}
- Spice Level: {$spiceLevel}
- Available Time: {$cookingTime}
- Late-Night Hunger: {$lateNight}
- Outside Food Frequency: {$outsideFood}
- Preferred Language: {$language}
- Wants MUMMY Tips: {$mummyReminders}

**PERSONALIZATION TIPS:**
- If {$gender} is male: Suggest hearty, fulfilling recipes
- If {$gender} is female: Consider nutritional balance and quick meal options
- Always be inclusive and respectful regardless of gender

**RECIPE GENERATION RULES:**

1. **Food Type:** Only suggest {$foodPref} recipes. NO exceptions.

2. **Cooking Skill Level:**
   - If "{$cookingFreq}": Suggest quick, easy everyday recipes
   - If "Sometimes": Suggest medium complexity recipes
   - If "Rarely": Suggest impressive special occasion recipes

3. **Spice Adjustment:**
   - If "{$spiceLevel}": Adjust all spices accordingly
   - Provide variations if needed

4. **Time Constraint:**
   - If "10-15 min": ONLY quick recipes
   - If "20-30 min": Standard recipes
   - If "Flexible": Any recipe is fine

5. **Late-Night Consideration:**
   - If "Yes": Suggest light, easily digestible options
   - If "Sometimes": Mostly light options
   - If "No": Focus on main meal recipes

6. **Restaurant Alternative:**
   - If frequent outside food: Suggest homemade versions of popular dishes

7. **Health Tips:**
   - If wants MUMMY tips: Include health benefits and nutrition info

**RESPONSE FORMAT:**

**Recipe Name:** [Name in Hindi/English]

**Hey {$genderGreeting}!** Why This Recipe for {$name}?
- Perfect for your {$foodPref} preference
- Fits your {$cookingTime} time window
- Tailored to your {$spiceLevel} spice preference
- [2-3 more personalized reasons]

**Ingredients:**
[List with quantities]

**Instructions:**
[Step-by-step cooking]

**Prep Time:** X minutes
**Cook Time:** X minutes
**Total Time:** X minutes

**Difficulty Level:** Easy/Medium/Hard
**Serves:** X people

[IF {$mummyReminders} == 'haan' or 'yes']
**💚 MUMMY's Caring Tips for {$name}:**
[Health benefits, nutrition info, and caring advice]
EOT;
}

function callGeminiAPI($prompt, $api_key, $api_url, $model_name) {
    $payload = json_encode([
        'model' => $model_name,
        'messages' => [
            ['role' => 'user', 'content' => $prompt]
        ],
        'temperature' => 0.7,
        'max_tokens' => 1024
    ]);
    
    $ch = curl_init($api_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $api_key
    ]);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curl_error = curl_error($ch);
    curl_close($ch);
    
    if ($curl_error) {
        throw new Exception("API request failed: $curl_error");
    }
    
    if ($http_code !== 200) {
        throw new Exception("API returned HTTP $http_code: $response");
    }
    
    $response_data = json_decode($response, true);
    
    if (!isset($response_data['choices'][0]['message']['content'])) {
        throw new Exception('Invalid API response format');
    }
    
    return $response_data['choices'][0]['message']['content'];
}

function cleanRecipeContent($recipe) {
    $recipe = preg_replace('/^(Sure[, ]*|Here is.*?:|Of course[, ]*).*\n*/i', '', $recipe);
    $recipe = preg_replace('/^(I\'ll generate|I\'ll create|Let me create).*\n*/i', '', $recipe);
    $recipe = str_replace(['#', '**'], '', $recipe);
    $recipe = preg_replace('/\n+/', "\n", $recipe);
    $recipe = trim($recipe);
    
    return $recipe;
}

function translateCookingFreq($freq) {
    $map = ['roz' => 'Daily', 'kabhikabhi' => 'Sometimes', 'bahutKam' => 'Rarely'];
    return $map[$freq] ?? $freq;
}

function translateSpiceLevel($spice) {
    $map = ['kam' => 'Mild', 'medium' => 'Medium', 'teekha' => 'Spicy'];
    return $map[$spice] ?? $spice;
}
?>
