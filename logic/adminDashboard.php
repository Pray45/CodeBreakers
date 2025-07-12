<?php
require 'cors.php';
session_start();

require 'db.php';

// Check if user is admin
if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'admin') {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

// Get total users
$userCountStmt = $pdo->query("SELECT COUNT(*) AS total_users FROM users");
$totalUsers = $userCountStmt->fetch()['total_users'];

// Get total items
$itemCountStmt = $pdo->query("SELECT COUNT(*) AS total_items FROM items");
$totalItems = $itemCountStmt->fetch()['total_items'];

// Get pending approvals
$pendingItemsStmt = $pdo->query("SELECT COUNT(*) AS pending_items FROM items WHERE status = 'pending'");
$pendingItems = $pendingItemsStmt->fetch()['pending_items'];

echo json_encode([
    'success' => true,
    'data' => [
        'total_users' => $totalUsers,
        'total_items' => $totalItems,
        'pending_items' => $pendingItems
    ]
]);
