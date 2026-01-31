<?php
// Create database and setup
$conn = new mysqli('localhost', 'root', '');

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

// Create database
$sql = "CREATE DATABASE IF NOT EXISTS mummy_app";
if ($conn->query($sql) === TRUE) {
    echo "✅ Database created successfully\n";
} else {
    echo "❌ Error creating database: " . $conn->error . "\n";
}

$conn->close();

// Now connect to the database and create table
$conn = new mysqli('localhost', 'root', '', 'mummy_app');

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

// Create users table with all preference columns
$sql = "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    food_preference VARCHAR(50),
    cooking_frequency VARCHAR(50),
    spice_level VARCHAR(50),
    cooking_time_preference VARCHAR(50),
    late_night_hunger VARCHAR(50),
    outside_food_frequency VARCHAR(50),
    mummy_reminders VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo "✅ Users table created successfully\n";
} else {
    echo "❌ Error creating table: " . $conn->error . "\n";
}

$conn->close();

echo "\n✅ Database setup complete! Ready to test registration.\n";
?>
