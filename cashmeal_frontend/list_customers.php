<?php
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
            <h2>Customer List</h2>
            <?php
                $conn = new mysqli($servername, $username, $password, $database, $port);

                if ($conn->connect_error){
                    die("Connection failed: " . $conn->connect_error);
                }

                $sql = "SELECT AccountNumber, CustomerName FROM Customer ORDER BY CustomerName";
                $stmt = $conn->stmt_init();
                if (!$stmt->prepare($sql)){
                    echo "Failed to list customers";
                }
                else {
                    $stmt->execute();
                    $stmt->bind_result($accountNumber, $customerName);
                    echo "<ul>";
                    while ($stmt->fetch()){
                        echo '<li><a href="show_customer.php.php?id=' . $accountNumber . '">' . $customerName . '</a></li>';
                    }

                    echo "</ul>";
                }

                $conn->close();
            ?>
        </div>
    </body>
</html>
