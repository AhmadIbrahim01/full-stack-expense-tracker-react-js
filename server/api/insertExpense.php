<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'connection.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['expense_amount'], $data['category'], $data['date'], $data['user_id'])) {
    $expense_amount = $data['expense_amount'];
    $category = $data['category'];
    $date = $data['date'];
    $user_id = $data['user_id'];

    $query = $connection->prepare("INSERT INTO expenses (expense_amount, category, date, user_id) VALUES (?, ?, ?, ?)");
    $query->bind_param("dsdi", $expense_amount, $category, $date, $user_id); 

    if ($query->execute()) {
        echo json_encode([
            "status" => "Expense Added Successfully",
            "expense_id" => $query->insert_id
        ]);
    } else {
        echo json_encode([
            "status" => "Error: Could not add expense",
            "error" => $query->error
        ]);
    }

    $query->close();
} else {
    echo json_encode([
        "status" => "Error: Missing required data"
    ]);
}

$connection->close();
?>
