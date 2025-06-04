<?php

    require_once 'config.inc.php';

    $id = $_GET['id'];
    if ($id === ""){
        header('location: list_restaurants.php');
        exit();
    }
    if ($id === false){
        header('location: list_restaurants.php');
        exit();
    }
    if ($id === null){
        header('location: list_restaurants.php');
        exit();
    }
?>
<html>
    <head>
        <title>CashMeal Database System</title>
        <link rel="stylesheet" href="base.css">
    </head>
    <body>
        <?php
            require_once 'header.inc.php';
        ?>
        <div>
            <h2>Delete Restaurants</h2>
            <?php

                // Create connection
                $conn = new mysqli($servername, $username, $password, $database, $port);

                // Check connection
                if ($conn->connect_error) {
                    die("Connection failed: " . $conn->connect_error);
                }