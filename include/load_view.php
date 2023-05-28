<?php
// Stelle eine Verbindung zur Datenbank her
$servername = "localhost";
$username = "";
$password = "";
$dbname = "test";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Verbindung zur Datenbank fehlgeschlagen: " . $conn->connect_error);
}

// Empfange die Benutzer-ID aus dem JavaScript-Code
$userId = $_POST['userId'];

// Überprüfe, ob die Ansicht bereits in der Datenbank existiert
$sql = "SELECT * FROM views WHERE user_id = '$userId'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Die Ansicht existiert bereits, gib die Daten zurück
    $row = $result->fetch_assoc();
    $viewData = $row['view_data'];
    $backgroundUrl = $row['backgroundUrl'];

    $response = array(
        'viewData' => $viewData,
        'backgroundUrl' => $backgroundUrl
    );

    echo json_encode($response);
} else {
    // Die Ansicht existiert noch nicht, gib leere Daten zurück
    $response = array(
        'viewData' => null,
        'backgroundUrl' => null
    );

    echo json_encode($response);
}

$conn->close();
?>
