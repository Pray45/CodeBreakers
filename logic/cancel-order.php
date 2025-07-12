<?php
session_start();
require 'db.php';
require 'cors.php';

if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'admin') {
  echo json_encode(['success' => false, 'message' => 'Unauthorized']);
  exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$orderId = $data['order_id'] ?? null;

if (!$orderId) {
  echo json_encode(['success' => false, 'message' => 'Order ID required']);
  exit;
}

try {
  $stmt = $pdo->prepare("DELETE FROM orders WHERE order_id = ?");
  $stmt->execute([$orderId]);

  echo json_encode(['success' => true, 'message' => 'Order cancelled']);
} catch (PDOException $e) {
  echo json_encode(['success' => false, 'message' => 'DB Error', 'error' => $e->getMessage()]);
}
