<?php
session_start();
require 'db.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Optional: Check admin session
if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'admin') {
  echo json_encode(['success' => false, 'message' => 'Unauthorized']);
  exit;
}

try {
  $stmt = $pdo->query("
    SELECT 
      i.item_id,
      i.title,
      i.description,
      i.category,
      i.size,
      i.item_condition,
      i.status,
      i.image,
      u.name AS uploader_name
    FROM items i
    JOIN users u ON i.user_id = u.user_id
    ORDER BY i.created_at DESC
  ");
  $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode(['success' => true, 'items' => $items]);
} catch (PDOException $e) {
  echo json_encode(['success' => false, 'message' => 'DB error', 'error' => $e->getMessage()]);
}
