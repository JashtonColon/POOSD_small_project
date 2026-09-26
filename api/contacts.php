<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../helpers.php';

$method = $_SERVER['REQUEST_METHOD'];
$in = getInput();
$userId = requireUserId($in);

switch ($method) {
    case 'POST': create($conn, $in, $userId); break;
    case 'GET': break;
    case 'PUT': break;
    case 'DELETE': break;
    default:
        header('Allow: GET, POST, PUT, DELETE');
        sendJson(["error" => "Method not allowed"], 405);
}