<?php
    include('dbconnect.php');

    $username = $conn->quote($_POST['username']);
    $password = hash("sha256", $_POST['password1']);

    $sql = "SELECT id, user, password FROM users WHERE user = " . $username;

    $stmt = $conn->query($sql);
    $row = $stmt->fetch();

    if($row) {
        if ($password == $row['password']) {
            setcookie("userid", $row['id'], time() + (86400 * 30), "/"); // 86400 * 30 = 1 Tag
            setcookie("username", $row['user'], time() + (86400 * 30), "/"); // 86400 * 30 = 1 Tag

            // session_start();

            // $_SESSION['userid'] = $row['id'];
            // $_SESSION['username'] = $row['user'];

            header('Location: ../index.html');
        } else {
            echo("Falsches Passwort.");
        }
    } else {
        echo("Der User existiert nicht.");
    }
?>