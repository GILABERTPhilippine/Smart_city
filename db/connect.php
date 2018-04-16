<?php

$connect = new mysqli("mysql-k0d3.alwaysdata.net", "k0d3", "Sm4rtc1ty*", "k0d3_smart_city");
if ($connect->connect_errno) {
    echo "Echec lors de la connexion à MySQL : (" . $connect->connect_errno . ") " . $connect->connect_error;
} else {
    // echo "connexion réussie";
}

mysqli_set_charset($connect, 'utf8');
?>