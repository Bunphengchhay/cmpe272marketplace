<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

// Read the JSON key content from the environment variable
$jsonKeyContent = $_ENV['GA_JSON_KEY'] ?? '';

// Decode the JSON key content to an array
$keyArray = json_decode($jsonKeyContent, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    die(json_encode(['error' => 'Failed to decode JSON key: ' . json_last_error_msg()]));
}

// Create and configure a new client object.
$client = new Google_Client();
$client->setApplicationName('Google Analytics Reporting for Products');
$client->setScopes(['https://www.googleapis.com/auth/analytics.readonly']);
$client->setAuthConfig($keyArray);

$analytics = new Google_Service_AnalyticsReporting($client);

// Create the DateRange object.
$dateRange = new Google_Service_AnalyticsReporting_DateRange();
$dateRange->setStartDate("30daysAgo");
$dateRange->setEndDate("today");

// Create the Metrics object.
$pageviews = new Google_Service_AnalyticsReporting_Metric();
$pageviews->setExpression("ga:pageviews");
$pageviews->setAlias("pageviews");

// Create the Dimension object for pagePath.
$dimensions = new Google_Service_AnalyticsReporting_Dimension();
$dimensions->setName("ga:pagePath");

// Create Dimension Filter to include only wine and cocktail product pages.
$dimensionFilter = new Google_Service_AnalyticsReporting_DimensionFilter();
$dimensionFilter->setDimensionName('ga:pagePath');
$dimensionFilter->setOperator('REGEXP');
$dimensionFilter->setExpressions(['^/wineprofile/(wine|cocktail)/.+/.+$']);

// Create Dimension Filter Clause
$dimensionFilterClause = new Google_Service_AnalyticsReporting_DimensionFilterClause();
$dimensionFilterClause->setFilters([$dimensionFilter]);

// Create the ReportRequest object.
$request = new Google_Service_AnalyticsReporting_ReportRequest();
$request->setViewId('YOUR_VIEW_ID'); // Replace with your actual View ID
$request->setDateRanges($dateRange);
$request->setDimensions(array($dimensions));
$request->setMetrics(array($pageviews));
$request->setDimensionFilterClauses(array($dimensionFilterClause));

// Add the request to an array.
$body = new Google_Service_AnalyticsReporting_GetReportsRequest();
$body->setReportRequests(array($request));

// Make the data request.
try {
    $response = $analytics->reports->batchGet($body);
    echo json_encode($response);
} catch (Exception $e) {
    echo json_encode(['error' => 'There was an error creating the report: ' . $e->getMessage()]);
}
