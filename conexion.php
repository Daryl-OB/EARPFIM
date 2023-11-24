<?php

function conectar(){
    $localhost = "localhost";
    $user = "root";
    $pass = "";
    $bd = "uni";

    $con=mysqli_connect($localhost,$user,$pass);
    mysqli_select_db($con,$bd);
   

    return $con;
  
}

?>