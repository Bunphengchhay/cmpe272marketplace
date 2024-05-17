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

$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(array('error' => 'Database connection failed'));
    exit;
}

// Perform query to select all users
$sql = "SELECT * FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $users = array(); // Initialize an array to store user information
    while ($row = $result->fetch_assoc()) {
        // Add user information to the array
        $users[] = array(
            'id' => $row['id'],
            'firstname' => $row['first_name'],
            'lastname' => $row['last_name'],
            'email' => $row['email'],
            'home_address' => $row['home_address'],
            'home_phone' => $row['home_phone'],
            'cell_phone' => $row['cell_phone']
        );
    }
    // Return the array containing all users
    echo json_encode(array(
        'status' => 'ok',
        'users' => $users
    ));
} else {
    // No users found
    http_response_code(404);
    echo json_encode(array(
        'status' => '404',
        'message' => 'No users found'
    ));
}

// Close connection
$conn->close();

?>
