<?php
// Establish a connection to the database
$servername = "localhost";
$username = "python";
$password = "12345";
$dbname = "test";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection to the database failed: " . $conn->connect_error);
}

// Receive the user ID from the JavaScript code
$userId = $_POST['userId'];

// Check whether the view already exists in the database
$sql = "SELECT * FROM views WHERE user_id = '$userId'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // The view already exists, return the data
    $row = $result->fetch_assoc();
    foreach ($viewData as &$item) {
        $item['url'] = urldecode($item['url']);
    }
    $viewData = json_decode($row['view_data'], true);
    $backgroundUrl = urldecode($row['backgroundUrl']);

    // Decode URLs in viewData


    $response = array(
        'viewData' => $viewData,
        'backgroundUrl' => $backgroundUrl
    );

    echo json_encode($response);
} else {
    // The view does not yet exist, return empty data
    $response = array(
        'viewData' => null,
        'backgroundUrl' => null
    );

    echo json_encode($response);
}

$conn->close();
?>
