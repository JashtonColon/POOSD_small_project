<?php
require_once __DIR__ . '/db.config.php';
require_once __DIR__ . '/helpers.php';

try {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT);
    $conn->set_charset('utf8mb4');
} catch (mysqli_sql_exception $e) {
    sendJson(["error" => "Database connection failed"], 500);
}