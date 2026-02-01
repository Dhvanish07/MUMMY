<?php
/**
 * Check if user's trial is expired
 * Returns trial status and days remaining
 */

header('Content-Type: application/json');

require_once 'config.php';

try {
    // Get user ID from request
    $input = json_decode(file_get_contents('php://input'), true);
    $user_id = isset($input['user_id']) ? intval($input['user_id']) : 0;

    if ($user_id <= 0) {
        throw new Exception('User ID required');
    }

    // Get user's trial end date
    $stmt = $conn->prepare('SELECT trial_end_date, account_created_at FROM users WHERE id = ?');
    $stmt->bind_param('i', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        throw new Exception('User not found');
    }

    $user = $result->fetch_assoc();
    $trialEndDate = $user['trial_end_date'];
    $accountCreatedAt = $user['account_created_at'];

    // If no trial end date is set, auto-set it to 7 days from now
    if (!$trialEndDate) {
        $trialEndDate = date('Y-m-d H:i:s', strtotime('+7 days'));
        
        // Update database with trial end date
        $updateStmt = $conn->prepare('UPDATE users SET trial_end_date = ? WHERE id = ?');
        $updateStmt->bind_param('si', $trialEndDate, $user_id);
        $updateStmt->execute();
        $updateStmt->close();
    }

    // Calculate trial status using trial_end_date
    $endDate = strtotime($trialEndDate);
    $currentDate = time();
    $timeRemaining = $endDate - $currentDate;
    $daysRemaining = $timeRemaining / (24 * 60 * 60);
    $isExpired = $currentDate >= $endDate;

    echo json_encode([
        'success' => true,
        'user_id' => $user_id,
        'account_created_at' => $accountCreatedAt,
        'trial_end_date' => $trialEndDate,
        'days_remaining' => round($daysRemaining, 2),
        'hours_remaining' => round($timeRemaining / (60 * 60), 1),
        'trial_expired' => $isExpired,
        'status' => $isExpired ? 'expired' : 'active'
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}

$conn->close();
?>
