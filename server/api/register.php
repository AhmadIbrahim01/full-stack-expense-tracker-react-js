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

// Get the raw POST data
$data = json_decode(file_get_contents('php://input'), true);

// Check if the data is not null and contains the necessary fields
if (is_array($data) && isset($data['username']) && isset($data['password'])) {
    $username = $data['username'];
    $password = $data['password'];

    // Check if the username already exists
    $query = "SELECT * FROM users WHERE username = ?";
    $stmt = $connection->prepare($query);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode([
            "status" => "Username already exists"
        ]);
    } else {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $insert_query = "INSERT INTO users (username, password) VALUES (?, ?)";
        $insert_stmt = $connection->prepare($insert_query);
        $insert_stmt->bind_param("ss", $username, $hashed_password);

        if ($insert_stmt->execute()) {
            $new_user_query = "SELECT * FROM users WHERE username = ?";
            $new_user_stmt = $connection->prepare($new_user_query);
            $new_user_stmt->bind_param("s", $username);
            $new_user_stmt->execute();
            $new_user_result = $new_user_stmt->get_result();
            $new_user = $new_user_result->fetch_assoc();

            unset($new_user['password']);

            echo json_encode([
                "status" => "Account Created and Logged In",
                "user" => $new_user
            ]);
        } else {
            echo json_encode([
                "status" => "Error: Could not create account",
                "error" => $connection->error
            ]);
        }
    }

    $connection->close();
} else {
    echo json_encode([
        "status" => "Error: Missing username or password"
    ]);
}
?>
