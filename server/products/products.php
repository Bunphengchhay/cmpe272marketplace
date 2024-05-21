<?php

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

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to retrieve wine data
$wine_query = "SELECT * FROM Wine";
$wine_result = $conn->query($wine_query);

// Convert wine data to associative array
$wine_data = [];
if ($wine_result->num_rows > 0) {
    while ($row = $wine_result->fetch_assoc()) {
        $wine_data[] = $row;
    }
}

// Query to retrieve cocktail data
$cocktail_query = "SELECT * FROM Cocktail";
$cocktail_result = $conn->query($cocktail_query);

// Convert cocktail data to associative array
$cocktail_data = [];
if ($cocktail_result->num_rows > 0) {
    while ($row = $cocktail_result->fetch_assoc()) {
        $cocktail_data[] = $row;
    }
}

// Close connection
$conn->close();

// Prepare response as JSON
$response = [
    'wine' => $wine_data,
    'cocktail' => $cocktail_data
];

// Send response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>