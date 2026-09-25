<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../helpers.php';

$method = $_SERVER['REQUEST_METHOD'];
$in = getInput();
$userId = requireUserId($in);
 
switch ($method) {
    case 'POST': createContact($conn, $in, $userId); break;
<<<<<<< HEAD
    case 'GET': search($conn, $in, $userId); break;
    case 'PUT': edit($conn, $in, $userId); break;
=======
    case 'GET': break;
    case 'PUT': break;
>>>>>>> origin/api
    case 'DELETE': break;
    default:
        header('Allow: GET, POST, PUT, DELETE');
        sendJson(["error" => "Method not allowed"], 405);
}

<<<<<<< HEAD
function edit($conn, $in, $userId){
    $fields = ['contactId', 'firstName', 'lastName', 'phone', 'email'];
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
            $contactId,
            $userId
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

            $check->bind_param("ii", $contactId, $userId);
            $check->execute();

            //if this doesn't return a row, then the contact we are trying to update does not exist.
            if(!$check->get_result()->fetch_assoc()){
                sendJson(["error" => "Contact not found."], 404);
            }


        }
    } catch(mysqli_sql_exception $e){
        sendJson(["error" => "Could not edit contact."], 500);
    }

    //return the edited contact as a JSON
    sendJson([
        "id" => $contactId,
        "firstName" => $in['firstName'],
        "lastName" => $in['lastName'],
        "phone" => $in['phone'],
        "email" => $in['email']
    ]);


=======
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
>>>>>>> origin/api
}