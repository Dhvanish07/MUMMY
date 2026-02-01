<?php
/**
 * MUMMY – Bhook Lagi Hai
 * Backend Configuration
 */

// Database Configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'mummy_db');

// Create connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database if not exists
$conn->query("CREATE DATABASE IF NOT EXISTS " . DB_NAME);

// Select database
$conn->select_db(DB_NAME);

// Create users table if not exists
$createTable = "
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    account_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    trial_end_date DATETIME DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

$conn->query($createTable);

// Add account_created_at and trial_end_date columns if they don't exist (for existing tables)
@$conn->query("ALTER TABLE users ADD COLUMN account_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP");
@$conn->query("ALTER TABLE users ADD COLUMN trial_end_date DATETIME DEFAULT NULL");

// Check if trial has expired using trial_end_date
function isTrialExpired($trialEndDate) {
    if (!$trialEndDate) {
        return false; // No expiration set
    }
    $endDate = strtotime($trialEndDate);
    $currentDate = time();
    return $currentDate >= $endDate;
}

// Get days remaining in trial using trial_end_date
function getDaysRemaining($trialEndDate) {
    if (!$trialEndDate) {
        return 7; // Default 7 days if not set
    }
    $endDate = strtotime($trialEndDate);
    $currentDate = time();
    $secondsRemaining = $endDate - $currentDate;
    $daysRemaining = $secondsRemaining / (24 * 60 * 60);
    return max(0, round($daysRemaining, 1));
}

// Calculate trial end date (default 7 days from now)
function calculateTrialEndDate($daysFromNow = 7) {
    $endDate = new DateTime();
    $endDate->add(new DateInterval('P' . $daysFromNow . 'D'));
    return $endDate->format('Y-m-d H:i:s');
}

// Response helper function
function respond($success, $message, $data = null) {
    header('Content-Type: application/json');
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

// Set CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}
?>
