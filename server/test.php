<?php
// Set headers for API requests
header("Access-Control-Allow-Origin: *"); // Specify allowed domain(s)
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Check the requested API path
$path = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '';

// // Output JSON data
//echo json_encode(fetchDataFromFile());
//Perform actions based on the API path
// Perform actions based on the API path
switch ($path) {
    default:
        echo '<h1> test php world </h1>';
        break;
}
// echo '<h1> hello world</h1>';


?>

