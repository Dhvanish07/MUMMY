<?php
/**
 * MUMMY APP - Recipe Generation Service
 * File: backend/generate_recipes.php
 * 
 * Fetches user preferences and generates personalized recipes using Gemini API
 * Similar to how blogs are generated in runnnnn.py
 */

// Set CORS headers BEFORE any output
if (!headers_sent()) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Content-Type: application/json');
}

// Handle preflight OPTIONS requests - must exit before any content
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    if (!headers_sent()) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('HTTP/1.1 200 OK');
    }
    exit(0);
}

error_log("========== RECIPE GENERATION REQUEST ==========");

// Configuration
$GEMINI_API_KEY = "AIzaSyBoQm4-oU5HQCQf-yaKDXVVcyHsf_vOuBw";
$GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
$MODEL_NAME = "gemini-2.5-flash";

// Database configuration
$db_host = 'localhost';
$db_user = 'root';
$db_password = '';
$db_name = 'mummy_db';

// Get user ID from request
$user_id = $_GET['user_id'] ?? $_POST['user_id'] ?? null;

if (!$user_id) {
    http_response_code(400);
    echo json_encode(['error' => 'User ID is required']);
    exit;
}

error_log("User ID requested: $user_id");

try {
    // Connect to database
    $conn = new mysqli($db_host, $db_user, $db_password, $db_name);
    
    if ($conn->connect_error) {
        // Database connection failed - create mock user for demo
        error_log("⚠️ Database connection failed: " . $conn->connect_error);
        error_log("📝 Using mock user data for demo purposes");
        
        // Use mock user data
        $user = [
            'name' => 'Beta',
            'gender' => 'male',
            'food_preference' => 'vegetarian',
            'cooking_frequency' => 'sometimes',
            'spice_level' => 'medium',
            'cooking_time_preference' => '30',
            'late_night_hunger' => 'no',
            'outside_food_frequency' => 'weekly',
            'mummy_reminders' => 'yes',
            'language_preference' => 'hinglish'
        ];
    } else {
        error_log("✅ Database connected");
        
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
            // User not found - use mock data instead of failing
            error_log("⚠️ User ID $user_id not found, using mock user data");
            $user = [
                'name' => 'Beta',
                'gender' => 'male',
                'food_preference' => 'vegetarian',
                'cooking_frequency' => 'sometimes',
                'spice_level' => 'medium',
                'cooking_time_preference' => '30',
                'late_night_hunger' => 'no',
                'outside_food_frequency' => 'weekly',
                'mummy_reminders' => 'yes',
                'language_preference' => 'hinglish'
            ];
        } else {
            error_log("✅ User found: " . $user['name']);
        }
    }
    
    error_log("Preferences: " . json_encode($user));
    
    // Build the recipe generation prompt (similar to blog generation)
    $prompt = buildRecipePrompt($user);
    
    error_log("📤 Sending prompt to Gemini API");
    
    // Call Gemini API (similar to runnnnn.py)
    $recipe = callGeminiAPI($prompt, $GEMINI_API_KEY, $GEMINI_API_URL, $MODEL_NAME);
    
    // If API fails, use fallback mock recipe
    if (!$recipe) {
        error_log("⚠️ API failed, generating mock recipe for demo");
        $recipe = generateMockRecipe($user);
    }
    
    if (!$recipe) {
        throw new Exception('Failed to generate recipe');
    }
    
    error_log("✅ Recipe generated successfully");
    
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
    
    if (isset($stmt)) {
        $stmt->close();
    }
    if (isset($conn)) {
        $conn->close();
    }
    
} catch (Exception $e) {
    error_log("❌ ERROR: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

error_log("========== END RECIPE GENERATION REQUEST ==========");

/**
 * Build recipe generation prompt based on user preferences
 * Similar to how runnnnn.py builds blog prompts
 */
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
    
    $prompt = <<<EOT
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
   - Provide both regular and adjusted spice versions

4. **Time Constraint:**
   - If "10-15 min": ONLY quick recipes (simple prep, no long cooking)
   - If "20-30 min": Standard recipes with normal prep+cook time
   - If "Flexible": Any recipe is fine

5. **Late-Night Consideration:**
   - If "Yes": Suggest light, easily digestible options
   - If "Sometimes": Mostly light options with occasional heavier dishes
   - If "No": Focus on main meal recipes

6. **Restaurant Alternative:**
   - If outside food is frequent: Suggest homemade versions of popular restaurant dishes

7. **Health Tips:**
   - If wants MUMMY tips: Include health benefits and nutrition info
   - Otherwise: Just the recipe

**RESPONSE FORMAT:**

**Recipe Name:** [Name in Hindi/English]

**Why This Recipe for {$name}?**
- Matches your {$foodPref} preference
- Perfect for your {$cookingTime} cooking window
- Tailored to your {$spiceLevel} spice preference
- [2-3 personalized reasons]

**Ingredients:**
[List all ingredients with quantities]

**Instructions:**
[Step-by-step cooking instructions]

**Prep Time:** X minutes
**Cook Time:** X minutes
**Total Time:** X minutes

**Difficulty Level:** Easy/Medium/Hard
**Serves:** X people

[IF user wants MUMMY tips]
**💚 MUMMY's Caring Tips:**
- Health benefit
- Nutrition info
- Storage/leftover advice
- Kitchen hack

[IF late-night eater]
**⏰ Late-Night Friendly:** Yes - Light and easy to digest

[IF eats outside food often]
**🏠 Restaurant Alternative:** This is how [restaurant] makes [dish]

Generate ONE recipe now that matches ALL preferences above.
EOT;
    
    return $prompt;
}

/**
 * Call Gemini API to generate recipe
 * Similar to how runnnnn.py calls the API
 */
function callGeminiAPI($prompt, $api_key, $api_url, $model_name) {
    $url = $api_url . '?key=' . $api_key;
    
    $data = json_encode([
        'contents' => [
            [
                'parts' => [
                    [
                        'text' => $prompt
                    ]
                ]
            ]
        ],
        'generationConfig' => [
            'temperature' => 0.7,
            'topK' => 40,
            'topP' => 0.95,
            'maxOutputTokens' => 2000
        ]
    ]);
    
    // Use file_get_contents with stream context instead of curl
    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => [
                'Content-Type: application/json',
                'Content-Length: ' . strlen($data)
            ],
            'content' => $data,
            'timeout' => 60
        ],
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
        ]
    ]);

    $response = @file_get_contents($url, false, $context);
    $http_code = 200;
    
    // Get HTTP response code from headers
    if (isset($http_response_header)) {
        preg_match('{HTTP/\S*\s(\d{3})}', $http_response_header[0], $match);
        $http_code = intval($match[1]);
    }
    
    if ($response === false) {
        error_log("API Request Error: " . error_get_last()['message']);
        throw new Exception("API request failed");
    }
    
    if ($http_code !== 200) {
        error_log("API Error: HTTP $http_code - $response");
        throw new Exception("API returned HTTP $http_code");
    }
    
    $response_data = json_decode($response, true);
    
    if (!isset($response_data['candidates'][0]['content']['parts'][0]['text'])) {
        error_log("Invalid API response: " . json_encode($response_data));
        throw new Exception('Invalid API response format');
    }
    
    return $response_data['candidates'][0]['content']['parts'][0]['text'];
}

/**
 * Clean recipe content (similar to rephrase_blog_2 in runnnnn.py)
 */
function cleanRecipeContent($recipe) {
    // Remove common AI introductions
    $recipe = preg_replace('/^(Sure[, ]*|Here is.*?:|Of course[, ]*).*\n*/i', '', $recipe);
    $recipe = preg_replace('/^(I\'ll generate|I\'ll create|Let me create).*\n*/i', '', $recipe);
    
    // Remove markdown symbols if present
    $recipe = str_replace(['#', '*'], '', $recipe);
    
    // Clean up excess whitespace
    $recipe = preg_replace('/\n+/', "\n", $recipe);
    $recipe = trim($recipe);
    
    // Fix common formatting issues
    $recipe = preg_replace('/\s+([,.!?;:])/', '$1', $recipe);
    
    return $recipe;
}

/**
 * Helper functions to translate preference values
 */
function translateCookingFreq($freq) {
    $translations = [
        'roz' => 'Daily (Roz)',
        'kabhikabhi' => 'Sometimes (Kabhi-Kabhi)',
        'bahutKam' => 'Rarely (Bahut Kam)'
    ];
    return $translations[$freq] ?? $freq;
}

function translateSpiceLevel($spice) {
    $translations = [
        'kam' => 'Low/Mild (Kam)',
        'medium' => 'Medium',
        'teekha' => 'High/Spicy (Teekha)'
    ];
    return $translations[$spice] ?? $spice;
}

/**
 * Generate mock recipe for demo/fallback purposes
 */
function generateMockRecipe($user) {
    $name = $user['name'];
    $pref = strtolower($user['food_preference']);
    
    $recipes = [
        'vegetarian' => [
            "Haan beta! Here's a tasty Aloo Gobi for you! 🥔\n\nThis classic dish is perfect for your level of expertise. It's quick, easy, and packed with flavors.\n\n**Ingredients:**\n- 3 medium potatoes, cubed\n- 1 small cauliflower, cut into florets\n- 2 onions, chopped\n- 3 tomatoes, chopped\n- 2 tbsp oil\n- 1 tsp cumin seeds\n- 1/2 tsp turmeric\n- 1 tsp coriander\n- Salt to taste\n- Fresh cilantro\n\n**Instructions:**\n1. Heat oil in a large pan\n2. Add cumin seeds and let them crackle\n3. Add onions and sauté until golden\n4. Add potatoes and cauliflower, stir-fry for 5 minutes\n5. Add tomatoes and spices\n6. Cover and cook for 15-20 minutes until vegetables are soft\n7. Garnish with cilantro\n\n**Time:** 30 minutes\n**Serves:** 4 people\n\n💚 MUMMY's Tip: This dish is rich in fiber and vitamins. Store in fridge for up to 3 days!"
        ],
        'non-veg' => [
            "Namaste beta! Here's a delicious Butter Chicken recipe! 🍗\n\nPerfect comfort food that tastes like restaurant quality!\n\n**Ingredients:**\n- 500g chicken, cubed\n- 1 cup yogurt\n- 3 tbsp butter\n- 1 onion\n- 4 tomatoes\n- 1/2 cup cream\n- Spices: turmeric, red chili, coriander\n- Salt and oil\n\n**Instructions:**\n1. Marinate chicken in yogurt and spices for 30 mins\n2. Cook chicken in oil until done\n3. In separate pan, melt butter and sauté onions\n4. Add tomatoes and spices, cook until soft\n5. Blend the tomato mixture\n6. Add cooked chicken to the gravy\n7. Add cream and simmer for 10 minutes\n8. Serve hot with rice or naan\n\n**Time:** 45 minutes\n**Serves:** 4 people\n\n💚 MUMMY's Tip: This is like restaurant butter chicken! Marinating the chicken is key. Tastes even better the next day!"
        ]
    ];
    
    $food_pref = isset($recipes[$pref]) ? $pref : 'vegetarian';
    return $recipes[$food_pref][0];
}
?>

