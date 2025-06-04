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
        <h2>Update Restaurant</h2>
        <?php

        // Create connection
        $conn = new mysqli($servername, $username, $password, $database, $port);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Check the Request is an Update from User -- Submitted via Form
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $restaurantName = $_POST['restaurantName'];
            if ($restaurantName === null)
                echo "<div><i>Specify a new name</i></div>";
            else if ($restaurantName === false)
                echo "<div><i>Specify a new name</i></div>";
            else if (trim($restaurantName) === "")
                echo "<div><i>Specify a new name</i></div>";
            else {
                
                /* perform update using safe parameterized sql */
                $sql = "UPDATE Restaurant SET RestaurantName = ? WHERE RestaurantID = ?";
                $stmt = $conn->stmt_init();
                if (!$stmt->prepare($sql)) {
                    echo "failed to update restaurant";
                } else {
                    
                    // Bind user input to statement
                    $stmt->bind_param('ss', $restaurantName,$id);
                    
                    // Execute statement and commit transaction
                    $stmt->execute();
                    $conn->commit();
                }
            }
            $estimateCost = $_POST['estimateCost'];
            if ($restaurantName === null)
                echo "<div><i>Specify a new estimate cost</i></div>";
            else if ($restaurantName === false)
                echo "<div><i>Specify a new estimate cost</i></div>";
            else if (trim($restaurantName) === "")
                echo "<div><i>Specify a new estimate cost</i></div>";
            else {
                
                /* perform update using safe parameterized sql */
                $sql = "UPDATE Restaurant SET EstimateCost = ? WHERE RestaurantID = ?";
                $stmt = $conn->stmt_init();
                if (!$stmt->prepare($sql)) {
                    echo "failed to update restaurant";
                } else {
                    
                    // Bind user input to statement
                    $stmt->bind_param('ss', $estimateCost,$id);
                    
                    // Execute statement and commit transaction
                    $stmt->execute();
                    $conn->commit();
                }
            }
            $estimatePrepTime = $_POST['estimatePrepTime'];
            if ($restaurantName === null)
                echo "<div><i>Specify a new estimate prep time</i></div>";
            else if ($restaurantName === false)
                echo "<div><i>Specify a new estimate prep time</i></div>";
            else if (trim($restaurantName) === "")
                echo "<div><i>Specify a new estimate prep time</i></div>";
            else {
                
                /* perform update using safe parameterized sql */
                $sql = "UPDATE Restaurant SET EstimatePrepTime = ? WHERE RestaurantID = ?";
                $stmt = $conn->stmt_init();
                if (!$stmt->prepare($sql)) {
                    echo "failed to update restaurant";
                } else {
                    
                    // Bind user input to statement
                    $stmt->bind_param('ss', $estimatePrepTime,$id);
                    
                    // Execute statement and commit transaction
                    $stmt->execute();
                    $conn->commit();
                }
            }
            $location = $_POST['location'];
            if ($restaurantName === null)
                echo "<div><i>Specify a new location</i></div>";
            else if ($restaurantName === false)
                echo "<div><i>Specify a new location</i></div>";
            else if (trim($restaurantName) === "")
                echo "<div><i>Specify a new location</i></div>";
            else {
                
                /* perform update using safe parameterized sql */
                $sql = "UPDATE Restaurant SET Location = ? WHERE RestaurantID = ?";
                $stmt = $conn->stmt_init();
                if (!$stmt->prepare($sql)) {
                    echo "failed to update restaurant";
                } else {
                    
                    // Bind user input to statement
                    $stmt->bind_param('ss', $location,$id);
                    
                    // Execute statement and commit transaction
                    $stmt->execute();
                    $conn->commit();
                }
            }
        }

        /* Refresh the Data */
        $sql = "SELECT RestaurantID, RestaurantName, EstimateCost, EstimatePrepTime, Location FROM Restaurant";
        $stmt = $conn->stmt_init();
        if (!$stmt->prepare($sql)) {
            echo "failed to prepare";
        }
        else {
            $stmt->bind_param('s',$id);
            $stmt->execute();
            $stmt->bind_result($restaurantId, $restaurantName, $estimateCost, $estimatePrepTime, $location);
            ?>
            <form method="post">
                <input type="hidden" name="id" value="<?= $id ?>">
            <?php
            while ($stmt->fetch()) {
                echo '<a href="show_customer.php?id='  . $restaurantId . '">' . $restaurantName . '</a><br>' .
                $estimateCost . ',' . $estimatePrepTime . '  ' . $location;
            }
        ?><br><br>
                New Name: <input type="text" name="restaurantName">
                <button type="submit">Update</button>
            </form>
        <?php
        }

        $conn->close();

        ?>
    </>
    </body>
</html>