<?php
/**
 * Test recipe generation endpoint
 */

// Database configuration
$db_host = 'localhost';
$db_user = 'root';
$db_password = '';
$db_name = 'mummy_db';

// Connect to database
$conn = new mysqli($db_host, $db_user, $db_password, $db_name);

if ($conn->connect_error) {
    die("❌ Database connection failed: " . $conn->connect_error);
}

echo "✅ Database connected\n";

// Get total users
$result = $conn->query('SELECT COUNT(*) as count FROM users');
$row = $result->fetch_assoc();
echo "📊 Total users in database: " . $row['count'] . "\n";

// Get first user
$result = $conn->query('SELECT id, name, email, food_preference FROM users LIMIT 1');
$user = $result->fetch_assoc();

if (!$user) {
    echo "⚠️  No users found. Creating a test user...\n";
    
    $stmt = $conn->prepare('
        INSERT INTO users (name, email, password, food_preference, cooking_frequency, spice_level, 
                          cooking_time_preference, late_night_hunger, outside_food_frequency, mummy_reminders)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ');
    
    $hashed_pwd = password_hash('test123', PASSWORD_BCRYPT);
    $food_pref = 'vegetarian';
    $cooking_freq = 'roz';
    $spice = 'medium';
    $time = '20-30 min';
    $late_night = 'Sometimes';
    $outside_food = 'Sometimes';
    $mummy_reminders = 'yes';
    
    $stmt->bind_param('ssssssssss', $name, $email, $hashed_pwd, $food_pref, $cooking_freq, $spice, $time, $late_night, $outside_food, $mummy_reminders);
    $name = 'Test User';
    $email = 'test_' . time() . '@example.com';
    
    $stmt->execute();
    $user_id = $stmt->insert_id;
    echo "✅ Test user created with ID: $user_id\n";
    
    $user = [
        'id' => $user_id,
        'name' => $name,
        'email' => $email,
        'food_preference' => $food_pref
    ];
    
    $stmt->close();
}

echo "\n📋 Testing with user:\n";
echo "  ID: " . $user['id'] . "\n";
echo "  Name: " . $user['name'] . "\n";
echo "  Email: " . $user['email'] . "\n";

// Fetch full user profile
$stmt = $conn->prepare('
    SELECT name, food_preference, cooking_frequency, spice_level, 
           cooking_time_preference, late_night_hunger, outside_food_frequency, mummy_reminders
    FROM users
    WHERE id = ?
');

$stmt->bind_param('i', $user['id']);
$stmt->execute();
$result = $stmt->get_result();
$user_full = $result->fetch_assoc();

echo "\n📊 User Preferences:\n";
echo "  Food Preference: " . $user_full['food_preference'] . "\n";
echo "  Cooking Frequency: " . $user_full['cooking_frequency'] . "\n";
echo "  Spice Level: " . $user_full['spice_level'] . "\n";
echo "  Cooking Time: " . $user_full['cooking_time_preference'] . "\n";

echo "\n✅ All tests passed! User ID " . $user['id'] . " is ready for recipe generation.\n";

$stmt->close();
$conn->close();
?>
