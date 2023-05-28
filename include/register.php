<?php
    include('dbconnect.php');

    $username = $conn->quote($_POST['username']);
    $email = $conn->quote($_POST['email']);
    $password = hash("sha256", $_POST['password1']);

    $sql = "SELECT user FROM users WHERE user = " . $username;

    $stmt = $conn->query($sql);
    $row = $stmt->fetch();

    if ($row) {
        echo("Username vergeben.");
        exit();
    } else {
        $sql = "INSERT INTO users (user, password, email) VALUES (" . $username . ", '" . $password . "', " . $email . ")";

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        echo("Account angelegt.");
        header("Location: ../index.html");
        exit();
    }
?>