<?php
session_start();
require 'db.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'admin') {
  echo json_encode(['success' => false, 'message' => 'Unauthorized']);
  exit;
}

$stmt = $pdo->query("SELECT user_id, name, email, role FROM users");
$users = $stmt->fetchAll();

echo json_encode(['success' => true, 'users' => $users]);
