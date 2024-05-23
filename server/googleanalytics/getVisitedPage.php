<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once __DIR__ . '/../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();
$GA_KEY = $_ENV['GA_JSON_KEY'] ?? '';
$KEY_FILE_LOCATION = __DIR__ . '/cmpe272-424008-d33b50e264f8.json';

$propertyId = '442169121';
$analytics = initializeAnalytics();
$results = getResults($analytics, $propertyId);
printResults($results);

function initializeAnalytics()
{
    $KEY_FILE_LOCATION = __DIR__ . '/cmpe272-424008-d33b50e264f8.json';
    $client = new Google_Client();
    $client->setApplicationName("Hello Analytics Reporting");
    $client->setAuthConfig($KEY_FILE_LOCATION);
    $client->setScopes(['https://www.googleapis.com/auth/analytics.readonly']);
    $analytics = new Google_Service_AnalyticsData($client);
    return $analytics;
}

function getResults($analytics, $propertyId)
{
    $request = new Google_Service_AnalyticsData_RunReportRequest([
        'property' => 'properties/' . $propertyId,
        'dateRanges' => [
            new Google_Service_AnalyticsData_DateRange([
                'startDate' => '2024-05-01',
                'endDate' => 'today',
            ]),
        ],
        'dimensions' => [
            new Google_Service_AnalyticsData_Dimension([
                'name' => 'pagePath',
            ]),
        ],
        'metrics' => [
            new Google_Service_AnalyticsData_Metric([
                'name' => 'screenPageViews',
            ]),
        ],
        'dimensionFilter' => new Google_Service_AnalyticsData_FilterExpression([
            'orGroup' => new Google_Service_AnalyticsData_FilterExpressionList([
                'expressions' => [
                    new Google_Service_AnalyticsData_FilterExpression([
                        'filter' => new Google_Service_AnalyticsData_Filter([
                            'fieldName' => 'pagePath',
                            'stringFilter' => new Google_Service_AnalyticsData_StringFilter([
                                'matchType' => 'PARTIAL_REGEXP',
                                'value' => 'wineprofile/wine/.*',
                            ]),
                        ]),
                    ]),
                    new Google_Service_AnalyticsData_FilterExpression([
                        'filter' => new Google_Service_AnalyticsData_Filter([
                            'fieldName' => 'pagePath',
                            'stringFilter' => new Google_Service_AnalyticsData_StringFilter([
                                'matchType' => 'PARTIAL_REGEXP',
                                'value' => 'wineprofile/cocktail/.*',
                            ]),
                        ]),
                    ]),
                ],
            ]),
        ]),
    ]);

    return $analytics->properties->runReport('properties/' . $propertyId, $request);
}

function printResults($results)
{
    $products = [];
    if (count($results->getRows()) > 0) {
        foreach ($results->getRows() as $row) {
            $pagePath = $row->getDimensionValues()[0]->getValue();
            $pageviews = $row->getMetricValues()[0]->getValue();

            if (preg_match('/wineprofile\/wine\/([^\/]+)\/([^\/]+)/', $pagePath, $matches)) {
                $productType = 'wine';
                $productName = $matches[1];
                $productId = $matches[2];
            } elseif (preg_match('/wineprofile\/cocktail\/([^\/]+)\/([^\/]+)/', $pagePath, $matches)) {
                $productType = 'cocktail';
                $productName = $matches[1];
                $productId = $matches[2];
            } else {
                continue;
            }

            if (!isset($products[$productId])) {
                $products[$productId] = [
                    'id' => $productId,
                    'name' => $productName,
                    'type' => $productType,
                    'pageviews' => 0,
                ];
            }

            $products[$productId]['pageviews'] += $pageviews;
        }

        uasort($products, function($a, $b) {
            return $b['pageviews'] - $a['pageviews'];
        });

        echo json_encode(array_values($products), JSON_PRETTY_PRINT);
    } else {
        echo json_encode(['message' => 'No results found.']);
    }
}

?>
