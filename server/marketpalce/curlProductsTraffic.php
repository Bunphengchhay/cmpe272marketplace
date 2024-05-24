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

$endpoint1 = 'https://hugecrab.com/products/visitJson.php';
$endpoint2 = 'http://sjsunfl.com/top_products.php';

$data1 = fetchData($endpoint1);
$data2 = fetchData($endpoint2);

file_put_contents('debug_log.txt', "Data from endpoint1:\n" . print_r($data1, true) . "\n", FILE_APPEND);
file_put_contents('debug_log.txt', "Data from endpoint2:\n" . print_r($data2, true) . "\n", FILE_APPEND);

// Check if both arrays are empty
if (empty($data1) && empty($data2)) {
    echo json_encode([]);
} else {
    if (empty($data1)) {
        $combinedData = $data2;
    } elseif (empty($data2)) {
        $combinedData = $data1;
    } else {
        $combinedData = array_merge((array)$data1, (array)$data2);
    }

    file_put_contents('debug_log.txt', "Combined data:\n" . print_r($combinedData, true) . "\n", FILE_APPEND);

    echo json_encode($combinedData);
}
?>
