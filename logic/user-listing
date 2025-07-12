<?php
require 'db.php';
require 'cors.php';

$user_id = $_GET['user_id'] ?? 0;

$stmt = $pdo->prepare("SELECT * FROM items WHERE user_id = ?");
$stmt->execute([$user_id]);
$items = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['success' => true, 'items' => $items]);
