<?php
    ini_set('display_errors', 1);

    $dbuser = "";
    $dbpass = "";

    

    try {
        $conn = new PDO('mysql:host=localhost;dbname=test', $dbuser, $dbpass);
        return $conn;
    } catch (PDOException $e) {
        echo("Verbindung Fehlgeschlagen!");
        exit();
    }
?>