<?php
// Set headers for API requests
header("Access-Control-Allow-Origin: *"); // Specify allowed domain(s)
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

function getAllMembers(){
    require_once('./membership/getallmember.php');
}

function login(){
    require_once('./authentication/login.php');
}

function signup(){
    require_once('./authentication/signup.php');
}


// Check the requested API path
$path = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '';

// // Output JSON data
//echo json_encode(fetchDataFromFile());
//Perform actions based on the API path
// Perform actions based on the API path
switch ($path) {
    case '/getMembers':
        echo getAllMembers();
        break;
    case '/signup':
        echo signup();
        break;
    case '/login':
        echo login();
        break;
    default:
        echo '<h1> hello hello world </h1>';
        break;
}
// echo '<h1> hello world</h1>';


?>

