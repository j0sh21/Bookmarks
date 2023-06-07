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
$viewData = urldecode($_POST['viewData']);
$backgroundUrl = urldecode($_POST['backgroundUrl']);

// Check whether the view already exists in the database
$stmt = $conn->prepare("SELECT * FROM views WHERE user_id = ?");
$stmt->bind_param("s", $userId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // The view already exists, update it
    $stmt = $conn->prepare("UPDATE views SET view_data = ?, backgroundUrl = ? WHERE user_id = ?");
    $stmt->bind_param("sss", $viewData, $backgroundUrl, $userId);
    if ($stmt->execute()) {
        echo "View updated successfully.";
    } else {
        echo "Error updating the view: " . $stmt->error;
    }
} else {
    // The view does not yet exist, save it as a new view
    $stmt = $conn->prepare("INSERT INTO views (user_id, view_data, backgroundUrl) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $userId, $viewData, $backgroundUrl);
    if ($stmt->execute()) {
        echo "View saved successfully.";
    } else {
        echo "Error saving the view: " . $stmt->error;
    }
}

$conn->close();
?>
