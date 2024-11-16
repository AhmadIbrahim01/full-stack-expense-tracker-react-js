<?php


// Allow requests from any origin
header("Access-Control-Allow-Origin: *");
// Allow specific HTTP methods
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Respond to preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


include "connection.php";

$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$password = $data['password'];

$query = "SELECT * FROM users WHERE username = '$username'";
$result = $connection->query($query);

if($result->num_rows >0){
    $user = $result->fetch_assoc();

    if($password == $user["password"]){
        echo json_encode([
            "status" => "Login Successful",
            "user" => $user,
        ]);
    } else {
        echo json_encode([
            "status" => "Login Failed",
        ]);
    }

} else {
    echo json_encode([
        "status" => "Login Faileed",
    ]);
}