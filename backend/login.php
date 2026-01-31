<?php
/**
 * MUMMY – Bhook Lagi Hai
 * Login API
 */

require 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    $email = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';

    // Validation
    if (empty($email) || empty($password)) {
        respond(false, 'Email and password required');
    }

    // Check user exists
    $stmt = $conn->prepare("SELECT id, name, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        respond(false, 'Invalid email or password');
    }

    $user = $result->fetch_assoc();

    // Verify password
    if (!password_verify($password, $user['password'])) {
        respond(false, 'Invalid email or password');
    }

    // Login successful
    respond(true, 'Login successful', [
        'userId' => $user['id'],
        'name' => $user['name'],
        'email' => $email,
        'token' => bin2hex(random_bytes(32))
    ]);
} else {
    respond(false, 'Invalid request method');
}
?>
