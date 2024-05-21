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

function wineproduct(){
    require_once('./products/products.php');
}

function updateComment(){
    require_once('./products/comment.php');
}
function getComment(){
    require_once('./products/getComment.php');
}
function getPerProductInfo(){
    require_once('./products/getPerProductInfo.php');
}

function getVisitedProducts(){
    require_once('./googleanalytics/getVisitedPage.php');
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
    case '/products':
        echo wineproduct();
        break;
    case '/updateComments':
        echo updateComment();
        break;
    case '/getComments':
        echo getComment();
        break;
    case '/getPerProductInfo':
        echo getPerProductInfo();
        break;
    case '/getVisitedProducts':
        echo getVisitedProducts();
        break;
    default:
        echo '<h1> world </h1>';
        break;
}
// echo '<h1> hello world</h1>';


?>

