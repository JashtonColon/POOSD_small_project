<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../helpers.php';

$method = $_SERVER['REQUEST_METHOD'];
$in = getInput();
$userId = requireUserId($in);

switch ($method) {
    case 'POST': createContact($conn, $in, $userId); break;
    case 'GET': break;
    case 'PUT': break;
    case 'DELETE': break;
    default:
        header('Allow: GET, POST, PUT, DELETE');
        sendJson(["error" => "Method not allowed"], 405);
}

function createContact($conn, $in, $userId) {
    $contact = requireFields($in, ['firstName', 'lastName', 'phone', 'email']);

    if (strlen($contact['firstName']) > 50 ||
        strlen($contact['lastName']) > 50 ||
        strlen($contact['phone']) > 50 ||
        strlen($contact['email']) > 255) {
            sendJson(["error" => "Email must be 255 characters or fewer, others 50"], 400);
        }
    
    try {
        $stmt = $conn->prepare(
            "INSERT INTO Contacts (FirstName, LastName, Phone, Email, UserID)
            VALUES (?, ?, ?, ?, ?)"
        );
        $stmt->bind_param( "ssssi", 
            $contact['firstName'], 
            $contact['lastName'], 
            $contact['phone'], 
            $contact['email'], 
            $userId
        );
        $stmt->execute();
    } catch (mysqli_sql_exception $e) {
        if ($e->getCode() === 1452) { //1452 = foreign key failed
            sendJson(["error" => "User not found"], 404);
        }
        sendJson(["error" => "Could not create contact"], 500);
    }

    sendJson([
        "id" => $conn->insert_id,
        "firstName" => $contact['firstName'],
        "lastName" => $contact['lastName']
    ], 201);
}