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

//Middleware: reject request that isn't POST
function requirePost() {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendJson(["error" => "Use POST"], 405);
    }
}

//Midleware: check if every required fields are filled
function requireFields(array $in, array $fields) {
    $checked = [];
    foreach ($fields as $f) {
            $value = (string)($in[$f] ?? "");

            if ($f !== 'password') {
                $value = trim($value);
            } 
            if ($value === "") {
                sendJson(["error" => "All fields are required"], 400);
            }

            $checked[$f] = $value;
        }
    return $checked;
}