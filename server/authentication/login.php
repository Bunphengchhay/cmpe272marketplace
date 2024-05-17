<?php
// Set headers for API requests
header("Access-Control-Allow-Origin: *"); // Specify allowed domain(s)
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Adjust as needed
header("Access-Control-Allow-Headers: Content-Type"); // Adjust as needed
header("Content-Type: application/json");
require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$host = $_ENV['DB_HOST'] ?? '';
$username = $_ENV['DB_USERNAME'] ?? '';
$password = $_ENV['DB_PASSWORD'] ?? '';
$database = $_ENV['DB_DATABASE'] ?? '';

$inputEmail = $_GET['email'] ?? '';
$inputPassword = $_GET['password'] ?? '';

// Check if email or password is missing
if (empty($inputEmail) || empty($inputPassword)) {
    http_response_code(400);
    echo json_encode(array('error' => 'Email or password is empty'));
    exit;
}

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(array('error' => 'Database connection failed'));
    exit;
}

// Perform query to select user by email and password
$sql = "SELECT id, first_name, last_name, email, home_address, home_phone FROM users WHERE email = ? AND password = ?";
$stmt = $conn->prepare($sql);

// Check if the SQL query was prepared successfully
if (!$stmt) {
    http_response_code(500);
    echo json_encode(array('error' => 'Failed to prepare SQL query: ' . $conn->error));
    exit;
}

// Bind parameters to the prepared statement
$stmt->bind_param("ss", $inputEmail, $inputPassword);

// Execute the prepared statement
if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(array('error' => 'Failed to execute SQL query: ' . $stmt->error));
    exit;
}

$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    // User found, return user information excluding password
    echo json_encode(array(
        'status' => 'ok',
        'user' => array(
            'id' => $row['id'],
            'firstname' => $row['first_name'],
            'lastname' => $row['last_name'],
            'email' => $row['email'],
            'home_address' => $row['home_address'],
            'home_phone' => $row['home_phone']
        )
    ));
} else {
    // User not found or password incorrect
    http_response_code(401);
    echo json_encode(array(
        'error' => 'Authentication failed. Invalid email or password.'
    ));
}

// Close connection
$stmt->close();
$conn->close();
?>

