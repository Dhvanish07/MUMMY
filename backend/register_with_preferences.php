<?php
/**
 * MUMMY APP - User Registration with Preferences
 * File: backend/register_with_preferences.php
 * 
 * This file handles user registration and saves their food preferences
 */

header('Content-Type: application/json');

// Enable CORS if needed
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Enable error logging
error_log("========== REGISTRATION REQUEST ==========");
error_log("Method: " . $_SERVER['REQUEST_METHOD']);
error_log("Content-Type: " . $_SERVER['CONTENT_TYPE'] ?? 'Not set');

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

error_log("Input received: " . json_encode($input));

// Validate input
if (!isset($input['name']) || !isset($input['email']) || !isset($input['password'])) {
    error_log("ERROR: Missing required fields");
    http_response_code(400);
    echo json_encode(['error' => 'Name, email, and password are required']);
    exit;
}

// Extract user data
$name = trim($input['name']);
$email = trim($input['email']);
$password = $input['password'];

// Extract preferences
$gender = $input['preferences']['gender'] ?? 'prefer_not_to_say';
$foodPref = $input['preferences']['foodPref'] ?? null;
$cookingFreq = $input['preferences']['cookingFreq'] ?? null;
$spiceLevel = $input['preferences']['spiceLevel'] ?? null;
$cookingTime = $input['preferences']['cookingTime'] ?? null;
$lateNightHunger = $input['preferences']['lateNightHunger'] ?? null;
$outsideFood = $input['preferences']['outsideFood'] ?? null;
$mummyReminders = $input['preferences']['mummyReminders'] ?? null;
$language = $input['preferences']['language'] ?? 'english';

error_log("Name: $name, Email: $email, Prefs: $foodPref, $cookingFreq, $spiceLevel, $cookingTime, $lateNightHunger, $outsideFood, $mummyReminders");

// Database configuration
$db_host = 'localhost';
$db_user = 'root';
$db_password = '';
$db_name = 'mummy_db';

try {
    // Connect to database
    $conn = new mysqli($db_host, $db_user, $db_password, $db_name);
    
    if ($conn->connect_error) {
        error_log("DATABASE CONNECTION FAILED: " . $conn->connect_error);
        throw new Exception('Database connection failed: ' . $conn->connect_error);
    }
    
    error_log("✅ Database connected successfully");
    
    // Check if table exists
    $tableCheck = $conn->query("SHOW TABLES LIKE 'users'");
    if (!$tableCheck || $tableCheck->num_rows === 0) {
        error_log("ERROR: users table does not exist");
        throw new Exception('Users table does not exist in database');
    }
    error_log("✅ Users table exists");
    
    // Check if email already exists
    $check_email = $conn->prepare('SELECT id FROM users WHERE email = ?');
    if (!$check_email) {
        error_log("PREPARE ERROR: " . $conn->error);
        throw new Exception('Prepare error: ' . $conn->error);
    }
    
    $check_email->bind_param('s', $email);
    $check_email->execute();
    
    if ($check_email->get_result()->num_rows > 0) {
        error_log("ERROR: Email already exists - $email");
        http_response_code(409);
        echo json_encode(['error' => 'Email already exists']);
        exit;
    }
    
    error_log("✅ Email is unique");
    
    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    
    // Insert user
    $stmt = $conn->prepare('
        INSERT INTO users (name, gender, email, password, food_preference, cooking_frequency, spice_level, cooking_time_preference, late_night_hunger, outside_food_frequency, mummy_reminders, language_preference)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ');
    
    if (!$stmt) {
        error_log("PREPARE ERROR on INSERT: " . $conn->error);
        throw new Exception('Prepare error on INSERT: ' . $conn->error);
    }
    
    $stmt->bind_param(
        'ssssssssssss',
        $name,
        $gender,
        $email,
        $hashedPassword,
        $foodPref,
        $cookingFreq,
        $spiceLevel,
        $cookingTime,
        $lateNightHunger,
        $outsideFood,
        $mummyReminders,
        $language
    );
    
    if ($stmt->execute()) {
        $user_id = $conn->insert_id;
        error_log("✅ USER REGISTERED SUCCESSFULLY - ID: $user_id, Email: $email");
        
        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'User registered successfully',
            'user_id' => $user_id,
            'name' => $name,
            'email' => $email
        ]);
    } else {
        error_log("EXECUTE ERROR: " . $stmt->error);
        throw new Exception('Registration failed: ' . $stmt->error);
    }
    
    $stmt->close();
    $check_email->close();
    $conn->close();
    
} catch (Exception $e) {
    error_log("EXCEPTION: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
error_log("========== END REQUEST ==========");
?>

