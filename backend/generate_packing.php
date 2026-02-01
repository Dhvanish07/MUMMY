<?php
/**
 * MUMMY APP - Packing List Generation Service
 * File: backend/generate_packing.php
 * 
 * Fetches user data and generates personalized packing lists using Gemini API
 * Similar to recipe generation - uses user profile + input data
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

error_log("========== PACKING GENERATION REQUEST ==========");
ini_set('display_errors', 1);
ini_set('log_errors', 1);
error_reporting(E_ALL);
set_error_handler(function($errno, $errstr, $errfile, $errline) {
    error_log("PHP Error [$errno]: $errstr in $errfile:$errline");
    return false;
});

// Configuration
$GEMINI_API_KEY = "AIzaSyBv4w57hZ2GJAYW24UyoeCDeza3cTepPCY";
$GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

// Database configuration
$db_host = 'localhost';
$db_user = 'root';
$db_password = '';
$db_name = 'mummy_db';

// Get request body
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['destination']) || !isset($input['days'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Missing required fields: destination, days'
    ]);
    exit;
}

$destination = trim($input['destination']);
$days = intval($input['days']);
$userId = isset($input['user_id']) ? intval($input['user_id']) : null;

if (empty($destination)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Destination cannot be empty'
    ]);
    exit;
}

if ($days < 1 || $days > 30) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Days must be between 1 and 30'
    ]);
    exit;
}

error_log("Trip Data: Destination=$destination, Days=$days, UserID=$userId");

try {
    // Initialize user data with defaults
    $userData = [
        'id' => null,
        'name' => 'friend',
        'email' => 'guest@mummy.local'
    ];
    
    // If user_id provided, fetch full user profile from database
    if ($userId) {
        $conn = new mysqli($db_host, $db_user, $db_password, $db_name);
        
        if ($conn->connect_error) {
            // Database connection failed - use default data
            error_log("⚠️ Database connection failed: " . $conn->connect_error);
            error_log("📝 Using default user data for demo purposes");
        } else {
            error_log("✅ Database connected");
            
            // Fetch user data from database
            $stmt = $conn->prepare('
                SELECT id, name, email
                FROM users
                WHERE id = ?
            ');
            
            if (!$stmt) {
                throw new Exception('Prepare error: ' . $conn->error);
            }
            
            $stmt->bind_param('i', $userId);
            $stmt->execute();
            $result = $stmt->get_result();
            $user = $result->fetch_assoc();
            
            if ($user) {
                $userData = $user;
                error_log("✅ User found: " . $user['name']);
                error_log("Profile: " . json_encode($user));
            } else {
                error_log("⚠️ User ID $userId not found, using defaults");
            }
            
            $stmt->close();
            $conn->close();
        }
    } else {
        error_log("⚠️ No user ID provided, using default user data");
    }

    // Build personalized packing prompt using user data + trip data
    $prompt = buildPackingPrompt($userData, $destination, $days);
    
    error_log("📤 Sending prompt to Gemini API");
    
    // Call Gemini API
    $apiResult = callGeminiAPI($prompt, $GEMINI_API_KEY, $GEMINI_API_URL);
    
    if (!$apiResult['success']) {
        if ($apiResult['httpCode'] === 429) {
            http_response_code(429);
            echo json_encode([
                'success' => false,
                'error' => 'API quota exceeded. Free tier limit is 20 requests/day. Please try again later.',
                'httpCode' => 429
            ]);
            exit;
        }
        throw new Exception('API Error (HTTP ' . $apiResult['httpCode'] . '): ' . $apiResult['error']);
    }
    
    $packingList = $apiResult['content'];
    
    error_log("✅ Packing list generated successfully");
    
    // Clean up the response
    $packingList = cleanPackingContent($packingList);
    
    // Return the packing list
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'destination' => $destination,
        'days' => $days,
        'user_name' => $userData['name'] ?? 'friend',
        'packing_list' => $packingList
    ]);
    
} catch (Exception $e) {
    error_log("❌ ERROR: " . $e->getMessage());
    error_log("❌ STACK: " . $e->getTraceAsString());
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

error_log("========== END PACKING GENERATION REQUEST ==========");

/**
 * Build packing list prompt using user profile + trip data
 * Similar to buildRecipePrompt - combines user data with input
 */
function buildPackingPrompt($userData, $destination, $days) {
    $name = $userData['name'] ?? 'beta';
    
    $durationText = ($days === 1) ? "1 din ka" : "$days din ka";
    
    $prompt = <<<EOT
You are MUMMY, a caring Indian mother helping your child pack for a trip.

**CHILD PROFILE:**
- Name: $name

**TRIP DETAILS:**
- Destination: $destination
- Duration: $durationText ($days days)

**YOUR TASK:**
Generate ONE personalized, comprehensive packing list for $name's trip to $destination for $days days.

**MUMMY'S TONE & STYLE:**
- Be warm, caring, and mother-like - like a real Indian mother advising their child
- Use Hinglish liberally with emoji and motherly expressions
- Format as organized sections with bullet points
- Be practical, thoughtful, and add personalized tips
- Keep items concise but clear

**PACKING LIST STRUCTURE (5 SECTIONS):**

1. 👕 CLOTHES - Weather-appropriate outfits for $destination
   - Consider local climate and culture
   - Mix formal/casual based on trip purpose
   - Include appropriate undergarments

2. 💊 MEDICINES & HEALTH - Health essentials
   - First aid kit
   - Common medicines (paracetamol, cough syrup, antacid)
   - Personal medications if needed
   - Pain relief items

3. 🧴 TOILETRIES - Bath and personal care
   - Based on available facilities at $destination
   - For $days days duration
   - Travel-friendly sizes

4. 🎒 ESSENTIALS - Important items and documents
   - Travel documents (ID, tickets, reservations)
   - Money and cards
   - Phone and chargers
   - Adapters if needed
   - Any essential personal items

5. 👵 MUMMY'S EXTRA TIPS - Motherly wisdom
   - Special advice for $destination
   - Comfort items from home
   - Emergency contacts
   - Travel tips
   - Weather-appropriate suggestions

**FORMAT RULES:**
- Start with: "Haan beta! Mummy ne teri packing tayyar kar di! 💚"
- Use bullet points (• or -)
- Include emojis for visual appeal
- Mix Hindi and English naturally
- Be specific: not just "clothes" but "2 t-shirts" or "comfortable pajamas"
- For longer trips ($days+ days), suggest laundry options or extra clothes
- End with: "Beta, ye sab pack kar le. Mummy ki du'a tumhare sath hai! 💚✨"

**SPECIAL CONSIDERATIONS FOR $destination:**
- Research what's important for this destination
- Include destination-specific items
- Weather-appropriate suggestions
- Cultural sensitivity if needed
- Any special items needed for activities

GENERATE THE PACKING LIST NOW with all 5 sections, detailed items, and warm motherly tone.
EOT;

    return $prompt;
}

/**
 * Call Gemini API to generate packing list
 * Similar to how recipes call the API
 */
function callGeminiAPI($prompt, $apiKey, $apiUrl) {
    $url = $apiUrl . '?key=' . $apiKey;

    $payload = json_encode([
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
            'maxOutputTokens' => 3000
        ]
    ]);

    error_log("API Request URL: $url");

    // Use file_get_contents with stream context instead of curl
    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => [
                'Content-Type: application/json',
                'Content-Length: ' . strlen($payload)
            ],
            'content' => $payload,
            'timeout' => 60
        ],
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
        ]
    ]);

    $response = @file_get_contents($url, false, $context);
    $httpCode = 200;
    
    // Get HTTP response code from headers
    if (isset($http_response_header)) {
        preg_match('{HTTP/\S*\s(\d{3})}', $http_response_header[0], $match);
        $httpCode = intval($match[1]);
    }

    error_log("API Response Code: $httpCode");

    // Return structured response
    $result = [
        'success' => false,
        'httpCode' => $httpCode,
        'error' => '',
        'content' => null
    ];

    if ($response === false) {
        error_log("❌ API Request Error: " . error_get_last()['message']);
        $result['error'] = 'Failed to connect to API';
        return $result;
    }

    if ($httpCode !== 200) {
        error_log("❌ Gemini API Error: HTTP $httpCode - $response");
        $result['httpCode'] = $httpCode;
        $result['error'] = $response;
        return $result;
    }

    $decoded = json_decode($response, true);

    if (!$decoded) {
        error_log("❌ JSON Decode Error: $response");
        $result['error'] = 'Invalid JSON response from API';
        return $result;
    }

    if (isset($decoded['candidates'][0]['content']['parts'][0]['text'])) {
        $text = $decoded['candidates'][0]['content']['parts'][0]['text'];
        error_log("✅ Successfully received content from API");
        $result['success'] = true;
        $result['content'] = $text;
        return $result;
    }

    error_log('❌ Invalid Gemini response structure: ' . json_encode($decoded));
    $result['error'] = 'Invalid response structure from API';
    return $result;
}

/**
 * Clean up the packing list response
 */
function cleanPackingContent($text) {
    // Just return as-is - keep formatting from API
    return trim($text);
}
?>
