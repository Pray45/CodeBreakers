<?php
session_start();
require 'db.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  echo json_encode(['success' => false, 'message' => 'Invalid request method']);
  exit;
}

if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'admin') {
  echo json_encode(['success' => false, 'message' => 'Unauthorized']);
  exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$userId = $data['id'] ?? null;

if (!$userId) {
  echo json_encode(['success' => false, 'message' => 'Missing user ID']);
  exit;
}

$stmt = $pdo->prepare("DELETE FROM users WHERE user_id = ?");
$success = $stmt->execute([$userId]);

echo json_encode([
  'success' => $success,
  'message' => $success ? 'User deleted' : 'Failed to delete user'
]);
