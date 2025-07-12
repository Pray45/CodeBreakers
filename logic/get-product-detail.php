<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require 'db.php';

$item_id = $_GET['item_id'] ?? null;

if (!$item_id) {
    echo json_encode(['success' => false, 'message' => 'Item ID is required']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT i.*, u.name AS uploader_name FROM items i JOIN users u ON i.user_id = u.user_id WHERE i.item_id = ?");
    $stmt->execute([$item_id]);
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($product) {
        echo json_encode(['success' => true, 'product' => $product]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Product not found']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'DB error', 'error' => $e->getMessage()]);
}
