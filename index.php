<?php session_start(); ?>
<!doctype html>
<html lang="en">

<head>
  <title>UNI | EARPIM</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="icon" type="image/png" href="https://www.earpunifim.com/laravel_fim/public/img/general/uni.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Prompt&display=swap" rel="stylesheet">
  <link href="/public/assets/css/index.css" rel="stylesheet">
  <!-- Bootstrap CSS v5.2.1 -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
</head>

<body>
  <header>
    <!-- place navbar here -->
    <nav id="barra">
      <img src="/public/assets/img/logo2.png">
      <span class="name" id="uni">UNIVERSIDAD NACIONAL DE INGENERÍA<br>FACULTAD DE INGENERÍA MECÁNICA</span>
    </nav>
  </header>
  <main class="content-login">
    <b style="font-size: 25px ;" class="text-center">INTRANET EARPFIM</b>
    <span style="font-size: 22px;" class="text-center">Sistema de Planificación de Recursos Académicos y
      Empresariales</span>

    <form class="login" action="validacion.php" method="post" >
      <span>Usuario:</span>
        <input type="text" class="form-control" name="usuario" aria-label="Default" aria-describedby="inputGroup-sizing-default"
        required>
      <span>Contraseña:</span>
        <input type="password" class="form-control" name="clave" aria-label="Default" aria-describedby="inputGroup-sizing-default"
        required>
        <br>
      <button type="submit" class="ini_sesion" >INICIAR SESIÓN</button>

      <?php if(isset($_SESSION['error_message'])) : ?>
      <div class="error-message" style="color: red; font-size :14px;"><?php echo $_SESSION['error_message']; ?></div>
      <?php unset($_SESSION['error_message']); // Limpiar el mensaje de error después de mostrarlo ?>
      <?php endif; ?>
      
      <a href="/app/view/php/forgot_password.php" class="link" >¿Olvido su contraseña?</a>
      <hr>
      <button type="submit" class="sesion_google"><img src="/public/assets/img/google.png" class="google"> Sesión con Google</button>
      <p>Temporalmente solo para docentes</p>
      <button type="button" class="comunicados" onclick="window.open('http://estadisticafim.uni.edu.pe', '_blank')"
        ;>VER COMUNICADOS</button>

    </form>
  </main>

  <script>
    var nav = document.getElementById("barra");
    var uni = document.getElementById("uni");
    var barra = document.getElementById("barra");

    window.addEventListener("resize", function () {
      if (window.innerWidth <= 770) {
        barra.style.justifyContent = "initial";
        let title = '<b style="font-size:26px; ">UNI FIM</b>';
        uni.innerHTML = title;
      } else {
        barra.style.justifyContent = "center";
        let title = '<span>UNIVERSIDAD NACIONAL DE INGENIERÍA<br>FACULTAD DE INGENIERÍA MECÁNICA</span>';
        uni.innerHTML = title;

      }
    });

  </script>

  <!-- Bootstrap JavaScript Libraries -->
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
    integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous">
    </script>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js"
    integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
    </script>
</body>

</html>