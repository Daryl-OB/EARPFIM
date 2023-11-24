<?php 
   include('conexion.php');
   $con = conectar();
   $usuario = $_POST['usuario'];
   $clave = $_POST['clave'];

   $consulta ="SELECT * FROM accesso where codAcceso='$usuario'and clave='$clave'";
   $resultado = mysqli_query($con,$consulta);

   $fila = mysqli_num_rows($resultado);
   if($fila){
    header("Location:/app/view/html/home.html");

   }else{
      session_start(); 
      $_SESSION['error_message'] = "Credenciales incorrectas. Por favor, inténtalo de nuevo.";
      header("Location:index.php");
   }

?>
