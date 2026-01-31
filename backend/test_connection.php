<?php
/**
 * MUMMY APP - Database Connection Test
 * File: backend/test_connection.php
 * 
 * Tests database connection and table structure
 */

header('Content-Type: application/json');

$response = [
    'timestamp' => date('Y-m-d H:i:s'),
    'tests' => [],
    'summary' => 'UNKNOWN'
];

// Test 1: Database Connection
$test_name = "Database Connection";
try {
    $conn = new mysqli('localhost', 'root', '', 'mummy_db');
    
    if ($conn->connect_error) {
        $response['tests'][$test_name] = [
            'status' => 'FAILED',
            'error' => $conn->connect_error
        ];
    } else {
        $response['tests'][$test_name] = [
            'status' => 'SUCCESS',
            'message' => 'Connected to mummy_app database'
        ];
    }
} catch (Exception $e) {
    $response['tests'][$test_name] = [
        'status' => 'ERROR',
        'error' => $e->getMessage()
    ];
}

// Test 2: Users Table Exists
$test_name = "Users Table Exists";
if (isset($conn) && !$conn->connect_error) {
    $result = $conn->query("SHOW TABLES LIKE 'users'");
    if ($result && $result->num_rows > 0) {
        $response['tests'][$test_name] = [
            'status' => 'SUCCESS',
            'message' => 'Users table exists'
        ];
    } else {
        $response['tests'][$test_name] = [
            'status' => 'FAILED',
            'error' => 'Users table not found'
        ];
    }
}

// Test 3: Table Structure
$test_name = "Users Table Structure";
if (isset($conn) && !$conn->connect_error) {
    $result = $conn->query("DESCRIBE users");
    if ($result) {
        $columns = [];
        while ($row = $result->fetch_assoc()) {
            $columns[] = $row['Field'];
        }
        $response['tests'][$test_name] = [
            'status' => 'SUCCESS',
            'columns' => $columns,
            'total_columns' => count($columns)
        ];
        
        // Check for required preference columns
        $required_cols = [
            'food_preference',
            'cooking_frequency',
            'spice_level',
            'cooking_time_preference',
            'late_night_hunger',
            'outside_food_frequency',
            'mummy_reminders'
        ];
        
        $missing = array_diff($required_cols, $columns);
        if (count($missing) > 0) {
            $response['tests'][$test_name]['missing_columns'] = array_values($missing);
        }
    } else {
        $response['tests'][$test_name] = [
            'status' => 'ERROR',
            'error' => $conn->error
        ];
    }
}

// Test 4: Row Count
$test_name = "Users in Database";
if (isset($conn) && !$conn->connect_error) {
    $result = $conn->query("SELECT COUNT(*) as count FROM users");
    if ($result) {
        $row = $result->fetch_assoc();
        $response['tests'][$test_name] = [
            'status' => 'SUCCESS',
            'total_users' => $row['count']
        ];
    } else {
        $response['tests'][$test_name] = [
            'status' => 'ERROR',
            'error' => $conn->error
        ];
    }
}

// Test 5: Test Insert
$test_name = "Test Insert User";
if (isset($conn) && !$conn->connect_error) {
    $test_email = 'test_' . time() . '@example.com';
    $test_name_val = 'Test User';
    $test_pass = password_hash('test123', PASSWORD_BCRYPT);
    $food_pref = 'veg';
    $cooking_freq = 'roz';
    $spice_level = 'medium';
    $cooking_time = '20-30min';
    $late_night = 'haan';
    $outside_food = 'weekends';
    $mummy_remind = 'haan';
    
    $stmt = $conn->prepare('
        INSERT INTO users (name, email, password, food_preference, cooking_frequency, spice_level, cooking_time_preference, late_night_hunger, outside_food_frequency, mummy_reminders)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ');
    
    if ($stmt) {
        $stmt->bind_param(
            'ssssssssss',
            $test_name_val,
            $test_email,
            $test_pass,
            $food_pref,
            $cooking_freq,
            $spice_level,
            $cooking_time,
            $late_night,
            $outside_food,
            $mummy_remind
        );
        
        if ($stmt->execute()) {
            $user_id = $conn->insert_id;
            $response['tests'][$test_name] = [
                'status' => 'SUCCESS',
                'message' => 'Test user inserted successfully',
                'user_id' => $user_id,
                'email' => $test_email
            ];
            
            // Clean up - delete test user
            $conn->query("DELETE FROM users WHERE id = $user_id");
        } else {
            $response['tests'][$test_name] = [
                'status' => 'FAILED',
                'error' => $stmt->error
            ];
        }
        $stmt->close();
    } else {
        $response['tests'][$test_name] = [
            'status' => 'ERROR',
            'error' => $conn->error
        ];
    }
}

// Determine summary
$failed = array_filter($response['tests'], function($test) {
    return $test['status'] === 'FAILED' || $test['status'] === 'ERROR';
});

$response['summary'] = count($failed) === 0 ? 'ALL TESTS PASSED ✅' : 'SOME TESTS FAILED ❌';

if (isset($conn)) {
    $conn->close();
}

echo json_encode($response, JSON_PRETTY_PRINT);
?>
