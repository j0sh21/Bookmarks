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
    // Die Ansicht existiert bereits, aktualisiere sie
    $viewData = $_POST['viewData'];
    $backgroundUrl = $_POST['backgroundUrl'];

    $sql = "UPDATE views SET view_data = '$viewData', backgroundUrl = '$backgroundUrl' WHERE user_id = '$userId'";
    if ($conn->query($sql) === TRUE) {
        echo "Ansicht erfolgreich aktualisiert.";
    } else {
        echo "Fehler beim Aktualisieren der Ansicht: " . $conn->error;
    }
} else {
    // Die Ansicht existiert noch nicht, speichere sie als neue Ansicht
    $viewData = $_POST['viewData'];
    $backgroundUrl = $_POST['backgroundUrl'];

    $sql = "INSERT INTO views (user_id, view_data, backgroundUrl) VALUES ('$userId', '$viewData', '$backgroundUrl')";
    if ($conn->query($sql) === TRUE) {
        echo "Ansicht erfolgreich gespeichert.";
    } else {
        echo "Fehler beim Speichern der Ansicht: " . $conn->error;
    }
}

$conn->close();
?>
