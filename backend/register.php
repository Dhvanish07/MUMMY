<?php
/**
 * MUMMY – Bhook Lagi Hai
 * Registration API
 */

require 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON data
    $data = json_decode(file_get_contents("php://input"), true);
    
    $name = trim($data['name'] ?? '');
    $email = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';
    $confirm = $data['confirm'] ?? '';

    // Validation
    if (empty($name) || empty($email) || empty($password)) {
        respond(false, 'All fields are required');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        respond(false, 'Invalid email format');
    }

    if (strlen($password) < 6) {
        respond(false, 'Password must be at least 6 characters');
    }

    if ($password !== $confirm) {
        respond(false, 'Passwords do not match');
    }

    // Check if email already exists
    $checkEmail = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $checkEmail->bind_param("s", $email);
    $checkEmail->execute();
    
    if ($checkEmail->get_result()->num_rows > 0) {
        respond(false, 'Email already registered');
    }

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Insert user
    $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $hashedPassword);

    if ($stmt->execute()) {
        respond(true, 'Registration successful', [
            'userId' => $conn->insert_id,
            'name' => $name,
            'email' => $email
        ]);
    } else {
        respond(false, 'Registration failed: ' . $stmt->error);
    }
} else {
    respond(false, 'Invalid request method');
}
?>
