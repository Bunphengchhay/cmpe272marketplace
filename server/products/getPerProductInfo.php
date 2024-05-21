<?php

header("Access-Control-Allow-Origin: *"); // Specify allowed domain(s)
header("Access-Control-Allow-Methods: GET"); // Adjust as needed
header("Access-Control-Allow-Headers: Content-Type"); // Adjust as needed
header("Content-Type: application/json");
require_once __DIR__ . '/../vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

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
    http_response_code(500);
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Function to fetch product information based on product type and ID
function fetchProductInfo($conn, $productId, $productType)
{
    $table = ($productType === 'wine') ? 'Wine' : 'Cocktail';
    $idColumn = ($productType === 'wine') ? 'wine_id' : 'cocktail_id';

    // Prepare SQL query to fetch product information
    $fetch_query = "SELECT * FROM $table WHERE $idColumn = ?";
    $stmt = $conn->prepare($fetch_query);
    $stmt->bind_param("i", $productId);
    $stmt->execute();
    $result = $stmt->get_result();

    // Fetch data and store in an array
    $productData = [];
    while ($row = $result->fetch_assoc()) {
        $productData[] = $row;
    }

    return $productData;
}

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Retrieve product ID and type from query parameters
    $productId = $_GET['productId'] ?? null;
    $productType = $_GET['productType'] ?? null;

    // Validate product ID and type
    if ($productId === null || $productType === null || !in_array($productType, ['wine', 'cocktail'])) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid product ID or type."]);
        exit;
    }

    // Fetch product information
    $productInfo = fetchProductInfo($conn, $productId, $productType);

    // Send response as JSON with status ok
    http_response_code(200);
    echo json_encode(["status" => "ok", "productInfo" => $productInfo]);
} else {
    http_response_code(405);
    echo json_encode(["error" => "Unsupported request method."]);
}

// Close connection
$conn->close();

?>
