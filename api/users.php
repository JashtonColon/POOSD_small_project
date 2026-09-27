<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../helpers.php';

requirePost(); //Middleware

$fields = ['firstName', 'lastName', 'username', 'password'];

$in = getRequestInfo();
$in = requireFields($in, $fields); //Middleware

if (strlen($in['firstName']) > 50 || 
    strlen($in['lastName']) > 50 || 
    strlen($in['username']) > 50) {
    sendJson(["error" => "Names, username or password exceeds character limits"], 400);
}

if (strlen($in['password']) < 8) {
    sendJson(["error" => "Password must be at least 8 characters"], 400);
}

$hash = password_hash($in['password'], PASSWORD_DEFAULT);

try {
    $stmt = $conn->prepare(
        "INSERT INTO Users (FirstName, LastName, Username, Password) VALUES (?, ?, ?, ?)"
    );
    $stmt->bind_param("ssss", $in['firstName'], $in['lastName'], $in['username'], $hash);
    $stmt->execute();
} catch (mysqli_sql_exception $e) {
    if ($e->getCode() === 1062) { // 1062 = duplicate value
        sendJson(["error" => "Username is already taken"], 409);
    }

    sendJson(["error" => "Could not create account"], 500);
}

//success
sendJson([
    "id" => $conn->insert_id,
    "firstName" => $in['firstName'],
    "lastName" => $in['lastName']
], 201);
