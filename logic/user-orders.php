<?php
require 'db.php';
require 'cors.php';


$user_id = $_GET['user_id'] ?? null;

if (!$user_id) {
    echo json_encode(['success' => false, 'message' => 'Missing user ID']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT o.*, i.title as item_title, i.image 
                           FROM orders o
                           JOIN items i ON o.item_id = i.item_id
                           WHERE o.buyer_id = ?");
    $stmt->execute([$user_id]);
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'orders' => $orders]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error', 'error' => $e->getMessage()]);
}
