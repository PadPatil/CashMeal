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
            <h2>Show Restaurants</h2>
            <?php
                $conn = new mysqli($servername, $username, $password, $database, $port);
                if ($conn->connect_error){
                    die("Connection failed: " . $conn->connect_error);
                }

                $sql = "SELECT RestaurantID, RestaurantName, EstimateCost, EstimatePrepTime, Location FROM Restaurant";
                $stmt = $conn->stmt_init();
                if (!$stmt->prepare($sql)){
                    echo "Failed to show restaurants";
                }
                else {
                    $stmt->bind_param('s',$id);
                    $stmt->execute();
                    $stmt->bind_result($restaurantId, $restaurantName, $estimateCost, $estimatePrepTime, $location);
                    echo "<div>";
                    while ($stmt->fetch()){
                        
                    }
                    echo "</div>";
                }
            ?>
            <div>
                <a href="update_customer.php?id=<?= ?>">Update Restaurant</a>
            </div>
            <?php
            $conn->close();
            ?>
    </body>
</html>