<?php
/**
 * Created by PhpStorm.
 * User: MKochanski
 * Date: 7/24/2018
 * Time: 3:07 PM
 */
require_once 'config.inc.php';

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
            <h2>Restaurant List</h2>
            <?php
            // Create connection
            $conn = new mysqli($servername, $username, $password, $database, $port);

            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            // Prepare SQL Statement
            $sql = "SELECT RestaurantID, RestaurantName FROM Restaurant ORDER BY RestaurantName";
            $stmt = $conn->stmt_init();
            if (!$stmt->prepare($sql)) {
                echo "failed to list restaurants";
            }
            else {
                
                // Execute the Statement
                $stmt->execute();
                
                // Loop Through Result
                $stmt->bind_result($restaurantId,$restaurantName);
                echo "<ul>";
                while ($stmt->fetch()) {
                    echo '<li><a href="show_restaurant.php?id='  . $restaurantId . '">' . $restaurantName . '</a></li>';
                }
                echo "</ul>";
            }

            // Close Connection
            $conn->close();

            ?>
        </div>
    </body>
</html>
