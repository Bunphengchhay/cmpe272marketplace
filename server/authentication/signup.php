<?php
// Set headers for API requests
header("Access-Control-Allow-Origin: *"); // Specify allowed domain(s)
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Adjust as needed
header("Access-Control-Allow-Headers: Content-Type"); // Adjust as needed
header("Content-Type: application/json");

// Check if the request method is OPTIONS (preflight request)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Respond to the preflight request with a 200 OK status
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$host = $_ENV['DB_HOST'] ?? '';
$username = $_ENV['DB_USERNAME'] ?? '';
$password = $_ENV['DB_PASSWORD'] ?? '';
$database = $_ENV['DB_DATABASE'] ?? '';

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(array('error' => 'Only POST requests are allowed'));
    exit;
}

// Get data from the request body
$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);

// Check if all required fields are provided
$requiredFields = ['first_name', 'last_name', 'email', 'password', 'home_address', 'home_phone'];
foreach ($requiredFields as $field) {
    if (!isset($data[$field]) || empty($data[$field])) {
        http_response_code(400); // Bad Request
        echo json_encode(array('error' => "Field '$field' is required"));
        exit;
    }
}

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    http_response_code(500); // Internal Server Error
    echo json_encode(array('error' => 'Database connection failed'));
    exit;
}

// Check if the email already exists
$email = $data['email'];
$sqlCheckEmail = "SELECT COUNT(*) AS count FROM users WHERE email = ?";
$stmtCheckEmail = $conn->prepare($sqlCheckEmail);

// Check if the SQL query was prepared successfully
if (!$stmtCheckEmail) {
    http_response_code(500);
    echo json_encode(array('error' => 'Failed to prepare SQL query: ' . $conn->error));
    exit;
}

// Bind parameters to the prepared statement
$stmtCheckEmail->bind_param("s", $email);

// Execute the prepared statement
if (!$stmtCheckEmail->execute()) {
    http_response_code(500);
    echo json_encode(array('error' => 'Failed to execute SQL query: ' . $stmtCheckEmail->error));
    exit;
}

// Get the result
$resultCheckEmail = $stmtCheckEmail->get_result();
$rowCheckEmail = $resultCheckEmail->fetch_assoc();
$emailCount = $rowCheckEmail['count'];

// Check if the email already exists
if ($emailCount > 0) {
    http_response_code(400); // Bad Request
    echo json_encode(array('error' => 'Email already exists'));
    exit;
}

// Prepare SQL statement to insert a new user
$sqlInsertUser = "INSERT INTO users (first_name, last_name, email, password, home_address, home_phone) VALUES (?, ?, ?, ?, ?, ?)";
$stmtInsertUser = $conn->prepare($sqlInsertUser);

// Check if the SQL query was prepared successfully
if (!$stmtInsertUser) {
    http_response_code(500);
    echo json_encode(array('error' => 'Failed to prepare SQL query: ' . $conn->error));
    exit;
}

// Bind parameters to the prepared statement
$stmtInsertUser->bind_param("ssssss", $data['first_name'], $data['last_name'], $data['email'], $data['password'], $data['home_address'], $data['home_phone']);

// Execute the prepared statement
if (!$stmtInsertUser->execute()) {
    http_response_code(500);
    echo json_encode(array('error' => 'Failed to execute SQL query: ' . $stmtInsertUser->error));
    exit;
}
// User added successfully
http_response_code(201); // Created
echo json_encode(array('status' => 'ok', 'message' => 'User added successfully'));


// Close connections
$stmtCheckEmail->close();
$stmtInsertUser->close();
$conn->close();
?>
