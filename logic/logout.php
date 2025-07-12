<?php
session_start();
session_unset();
session_destroy();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

echo json_encode([
  'success' => true,
  'message' => 'Logged out successfully'
]);
