<?php
// Allow requests from any origin (CORS header)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Respond to preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include the database connection
include 'connection.php';

// Get the raw POST data from the request body
$data = json_decode(file_get_contents('php://input'), true);

// Check if the user_id is present
if (isset($data['user_id'])) {
    $user_id = $data['user_id'];

    // Prepare the SQL statement to get the expenses for the user
    $query = $connection->prepare("SELECT * FROM expenses WHERE user_id = ?");
    $query->bind_param("i", $user_id); // "i" for integer

    // Execute the query
    $query->execute();
    $result = $query->get_result();

    // Check if there are any results
    if ($result->num_rows > 0) {
        $expenses = [];
        // Fetch all rows from the result
        while ($row = $result->fetch_assoc()) {
            $expenses[] = $row;
        }

        // Return the expenses as a JSON response
        echo json_encode([
            "status" => "Expenses Retrieved Successfully",
            "expenses" => $expenses
        ]);
    } else {
        // No expenses found for this user
        echo json_encode([
            "status" => "No Expenses Found"
        ]);
    }

    // Close the prepared statement
    $query->close();
} else {
    // Return an error message if user_id is missing
    echo json_encode([
        "status" => "Error: Missing user_id"
    ]);
}

// Close the database connection
$connection->close();
?>
