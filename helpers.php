<?php
header('Content-Type: application/json');

function getRequestInfo() {
    return json_decode(file_get_contents('php://input'), true) ?? [];
}

function sendJson($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}