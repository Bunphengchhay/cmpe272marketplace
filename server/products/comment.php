<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
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

$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $requestBody = file_get_contents('php://input');
    $input = json_decode($requestBody, true);

    $comment = $input['comment'] ?? '';
    $rating = $input['rating'] ?? '';
    $wine_id = $input['wineId'] ?? null;
    $cocktail_id = $input['cocktailId'] ?? null;

    $insert_query = "INSERT INTO Comment (comment, rating, wine_id, cocktail_id) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($insert_query);
    if ($stmt === false) {
        http_response_code(500);
        echo json_encode(["error" => "Error preparing statement: " . $conn->error]);
        exit;
    }

    $stmt->bind_param("siii", $comment, $rating, $wine_id, $cocktail_id);
    if ($stmt->execute()) {
        $productType = ($wine_id !== null) ? 'Wine' : 'Cocktail';
        $productId = ($productType === 'Wine') ? $wine_id : $cocktail_id;
        updateRatingAndNumberOfRatings($conn, $productId, $productType);
        echo json_encode(["status" => "ok"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Error inserting comment: " . $conn->error]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Unsupported request method."]);
}

$conn->close();

function updateRatingAndNumberOfRatings($conn, $productId, $productType)
{
    $idColumn = ($productType === 'Wine') ? 'wine_id' : 'cocktail_id';
    $query = "UPDATE $productType 
              SET rating_average = (
                  (SELECT SUM(rating) FROM Comment WHERE $productType.$idColumn = ?) /
                  (SELECT COUNT(*) FROM Comment WHERE $productType.$idColumn = ?)
              ),
              number_of_ratings = number_of_ratings + 1
              WHERE $productType.$idColumn = ?";
              
    $stmt = $conn->prepare($query);
    if ($stmt === false) {
        http_response_code(500);
        echo json_encode(["error" => "Error preparing update statement: " . $conn->error]);
        exit;
    }

    $stmt->bind_param("iii", $productId, $productId, $productId);
    if ($stmt->execute()) {
        // Update successful
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Error updating rating and number of ratings: " . $conn->error]);
    }
}
?>