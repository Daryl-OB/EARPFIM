<?php

function conectar(){
    $localhost = "localhost";
    $user = "root";
    $pass = "";
    $bd = "uni";

    try {
        $con = mysqli_connect($localhost, $user, $pass);
        mysqli_select_db($con, $bd);

        return $con;
    } catch (Exception $e) {
        // Manejar la excepción
        die("Error: " . $e->getMessage());
    }
}

?>