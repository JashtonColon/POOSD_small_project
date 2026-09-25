<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../helpers.php';

$method = $_SERVER['REQUEST_METHOD'];
$in = getInput();
$userId = requireUserId($in);
 
switch ($method) {
    case 'POST': create($conn, $in, $userId); break;
    case 'GET': search($conn, $in, $userId); break;
    case 'PUT': edit($conn, $in, $userId); break;
    case 'DELETE': break;
    default:
        header('Allow: GET, POST, PUT, DELETE');
        sendJson(["error" => "Method not allowed"], 405);
}

function edit($conn, $in, $userId){
    $fields = ['contactID', 'firstName', 'lastName', 'phone', 'email'];
    $in = requireFields($in, $fields);

    $contactId = (int)$in['contactId'];

    //check if valid id
    if($contactId <= 0){
        sendJson(["error" => "A valid contactId is required"], 400);
    }

    //database length constraints
    if(strlen($in['firstName']) > 50  ||
       strlen($in['lastName']) > 50   ||
       strlen($in['phone']) > 50      ||
       strlen($in['email']) > 255
    ){
        sendJson(["error" => "Contact information exceeds character limits"], 400);
    }


    try{
        //mySQL edit query
        $stmt = $conn->prepare(
            "UPDATE Contacts
             SET FirstName = ?, LastName = ?, Phone = ?, Email = ?
             WHERE ID = ? AND UserID = ?
            "
        );
    
        //put the input values into the query
        $stmt->bind_param(
            "ssssii", //data types of our input. string, string, string, string, int, int
            $in['firstName'],
            $in['lastName'],
            $in['phone'],
            $in['email'],
            $contactID,
            $userID
        );

        //execute query
        $stmt->execute();

        //if the query returns that 0 rows were changed, we investigate
        if($stmt->affected_rows === 0){
            $check = $conn->prepare(
                "SELECT ID
                FROM Contacts
                WHERE ID = ? AND UserID = ?
                "
            );
        }

        $check->bind_param("ii", $contactID, $userID);
        $check->execute();

        //if this doesn't return a row, then the contact we are trying to update does not exist.
        if(!$check->get_result()->fetch_assoc()){
            sendJson(["error" => "Contact not found."], 404);
        }
    } catch(mysqli_sql_exception $e){
        sendJson(["error" => "Could not edit contact."], 500);
    }

    //return the edited contact as a JSON
    sendJson([
        "id" => $contactID,
        "firstName" => $in['firstName'],
        "lastName" => $in['lastName'],
        "phone" => $in['phone'],
        "email" => $in['email']
    ]);


}