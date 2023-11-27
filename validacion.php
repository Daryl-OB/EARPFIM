<?php 
   include('conexion.php');
   $con = conectar();
   $usuario = $_POST['usuario'];
   $clave = $_POST['clave'];

   $consulta ="SELECT * FROM accesso where codAcceso='$usuario'and clave='$clave'";
   $resultado = mysqli_query($con,$consulta);

   $fila = mysqli_num_rows($resultado);
   session_start(); 

   if($fila){
    $_SESSION[$usuario]=$usuario;
    header("Location:/app/view/php/home.php");

   }else{
      
      $_SESSION['error_message'] = "Credenciales incorrectas. Por favor, inténtalo de nuevo.";
      header("Location:index.php");
   }

?>
