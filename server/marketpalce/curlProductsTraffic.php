<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

function fetchData($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}

$endpoint1 = 'http://hugecrab.com/products/visitJson.php';
$endpoint2 = 'http://sjsunfl.com/top_products.php';

$data1 = fetchData($endpoint1);
$data2 = fetchData($endpoint2);

// Check if both arrays are empty
if (empty($data1) && empty($data2)) {
    echo json_encode([]);
} else {
    // If one array is empty, use the other array as the combined result
    if (empty($data1)) {
        $combinedData = $data2;
    } elseif (empty($data2)) {
        $combinedData = $data1;
    } else {
        // Combine the arrays if neither is empty
        $combinedData = array_merge((array)$data1, (array)$data2);
    }
    echo json_encode($combinedData);
}
?>
