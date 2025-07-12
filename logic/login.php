<?php
session_start();

// CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    exit;
}
header("Content-Type: application/json");

// Debug mode
ini_set('display_errors', 1);
error_reporting(E_ALL);

require 'db.php';

// Capture input
$data = json_decode(file_get_contents("php://input"), true);
$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

// Step 1: Validate input
if (!$email || !$password) {
    echo json_encode(['success' => false, 'message' => 'Missing fields']);
    exit;
}

// Step 2: Fetch user
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user) {
    echo json_encode([
        'success' => false,
        'message' => 'User not found',
        'debug' => ['input_email' => $email]
    ]);
    exit;
}

// Step 3: Debug password match
$isPasswordCorrect = password_verify($password, $user['password_hash']);

if (!$isPasswordCorrect) {
    echo json_encode([
        'success' => false,
        'message' => 'Incorrect password',
        'debug' => [
            'input_password' => $password,
            'stored_hash' => $user['password_hash'],
            'password_verified' => false
        ]
    ]);
    exit;
}

// Step 4: Store session and return user
$_SESSION['user'] = [
    'id' => $user['user_id'],
    'name' => $user['name'],
    'email' => $user['email'],
    'role' => $user['role']
];

echo json_encode([
    'success' => true,
    'message' => 'Login successful',
    'user' => $_SESSION['user']
]);
