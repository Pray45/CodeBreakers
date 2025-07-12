<?php
session_start();
require 'db.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'admin') {
  echo json_encode(['success' => false, 'message' => 'Unauthorized']);
  exit;
}

try {
  $stmt = $pdo->query("
    SELECT 
      o.order_id,
      o.status,
      o.method,
      o.created_at,
      i.title AS item_name,
      b.name AS buyer_name,
      s.name AS seller_name
    FROM orders o
    JOIN items i ON o.item_id = i.item_id
    JOIN users b ON o.buyer_id = b.user_id
    JOIN users s ON o.seller_id = s.user_id
    ORDER BY o.created_at DESC
  ");
  
  $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode(['success' => true, 'orders' => $orders]);
} catch (Exception $e) {
  echo json_encode(['success' => false, 'message' => 'Database error', 'error' => $e->getMessage()]);
}
