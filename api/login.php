<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../helpers.php';

requirePost(); //Middleware

$fields = ['username', 'password'];

$in = getRequestInfo();
$in = requireFields($in, $fields); //Middleware

try {
    $stmt = $conn->prepare(
        "SELECT ID, FirstName, LastName, Password FROM Users WHERE Username = ?"
    );
    $stmt->bind_param("s", $in['username']);
    $stmt->execute();
    $user = $stmt->get_result()->fetch_assoc(); // return array ["ID" => 1, ...] or null
} catch (mysqli_sql_exception $e) {
    sendJson(["error" => "Could not log in"], 500);
}

if (!$user || !password_verify($in['password'], $user["Password"])) {
    sendJson(["error" => "Invalid username or password"], 401);
}

//success
sendJson([
    "id" => (int)$user["ID"],
    "firstName" => $user["FirstName"],
    "lastName" => $user["LastName"]
]);

