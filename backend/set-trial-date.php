<?php
/**
 * MUMMY APP - Set Trial End Date
 * File: backend/set-trial-date.php
 * 
 * This endpoint allows admins or users to set/override trial end date
 * POST request with user_id and trial_days (or trial_end_date)
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Only POST requests allowed']);
    exit;
}

require_once 'config.php';

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['user_id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'user_id is required']);
    exit;
}

$user_id = intval($input['user_id']);
$trialEndDate = null;

// Option 1: Use trial_days to calculate end date
if (isset($input['trial_days'])) {
    $trialDays = intval($input['trial_days']);
    $trialDays = max(1, min($trialDays, 365)); // Ensure between 1-365 days
    $trialEndDate = calculateTrialEndDate($trialDays);
}
// Option 2: Use direct trial_end_date
elseif (isset($input['trial_end_date'])) {
    $trialEndDate = $input['trial_end_date'];
    // Validate date format
    $dateObj = DateTime::createFromFormat('Y-m-d H:i:s', $trialEndDate);
    if (!$dateObj) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid date format. Use Y-m-d H:i:s']);
        exit;
    }
}
else {
    http_response_code(400);
    echo json_encode(['error' => 'Either trial_days or trial_end_date is required']);
    exit;
}

try {
    // Connect to database
    $conn = new mysqli($db_host, $db_user, $db_password, $db_name);
    
    if ($conn->connect_error) {
        throw new Exception('Database connection failed: ' . $conn->connect_error);
    }
    
    // Check if user exists
    $check_user = $conn->prepare('SELECT id FROM users WHERE id = ?');
    $check_user->bind_param('i', $user_id);
    $check_user->execute();
    
    if ($check_user->get_result()->num_rows === 0) {
        http_response_code(404);
        echo json_encode(['error' => 'User not found']);
        exit;
    }
    
    // Update trial_end_date
    $stmt = $conn->prepare('UPDATE users SET trial_end_date = ? WHERE id = ?');
    $stmt->bind_param('si', $trialEndDate, $user_id);
    
    if ($stmt->execute()) {
        // Calculate days remaining
        $daysRemaining = getDaysRemaining($trialEndDate);
        $isExpired = isTrialExpired($trialEndDate);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Trial end date updated successfully',
            'user_id' => $user_id,
            'trial_end_date' => $trialEndDate,
            'days_remaining' => $daysRemaining,
            'trial_expired' => $isExpired,
            'status' => $isExpired ? 'expired' : 'active'
        ]);
    } else {
        throw new Exception('Update failed: ' . $stmt->error);
    }
    
    $stmt->close();
    $conn->close();
    
} catch (Exception $e) {
    http_response_code(500);
    error_log("ERROR: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'error' => 'Server error: ' . $e->getMessage()
    ]);
}
?>
