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