function GetServer() {
    // Check if the location is localhost
    if (window.location.hostname === "localhost") {
        // If localhost, append the port number
        return "http://localhost:8080/index.php";
    } else {
        // If not localhost, use the IP address or domain name
        return "http://54.67.117.128/api/index.php";
    }
}

// Export the endpoint URL
export const endpoint = GetServer();