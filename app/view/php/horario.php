<?php session_start(); ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Horario de Clase</title>
    <!-- Required meta tags -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <link rel="icon" type="image/png" href="https://www.earpunifim.com/laravel_fim/public/img/general/uni.png" />
    <link rel="stylesheet" href="/public/assets/css/style.css" />
    <link rel="stylesheet" href="/public/assets/css/horario.css" />
    <!-- Boxicons CSS -->
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
    <!-- Bootstrap CSS v5.2.1 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous" />
        
</head>
<body>
    <nav class="sidebar close">
        <header>
            <div class="image-text">
                <spam class="imge">
                    <img src="/public/assets/img/logo.png" alt="logo" />
                </spam>
                <div class="header-text">
                    <span class="empresa">UNI EARFIM</span>
                    <span class="profession">DOCENTE</span>
                </div>
            </div>
        </header>
        <div class="content-menu">
            <ul class="dropdown" id="menu">
                <li class="dropdown__list">
                    <a href="#" class="dropdown__link">
                        <i class="bx bxs-briefcase"></i>
                        <span class="dropdown__span">General</span>
                        <i class="bx bx-chevron-down arrow"></i>
                        <input type="checkbox" class="dropdown__check" />
                    </a>
                    <div class="dropdown__content">
                        <ul class="dropdown__sub">
                            <li class="dropdown__li">
                                <a href="#" class="dropdown__anchor"><i class="bx bxs-graduation"></i>Aula virtual
                                    FIM</a>
                            </li>
                            <li class="dropdown__li">
                                <a href="/app/view/php/horario.php" class="dropdown__anchor"><i class="bx bxs-pencil"></i>Mi horario de
                                    clases</a>
                            </li>

                            <li class="dropdown__li">
                                <a href="/app/view/php/info-docente.php" class="dropdown__anchor"><i
                                        class="bx bxs-user-rectangle"></i>Información Docente</a>
                            </li>
                            <li class="dropdown__li">
                                <a href="#" class="dropdown__anchor"><i class="bx bxs-landmark"></i>Mis
                                    Cursos Asignados</a>
                            </li>
                            <li class="dropdown__li">
                                <a href="#" class="dropdown__anchor"><i class="bx bxs-book-bookmark"></i>Tutoria
                                    Alumnos</a>
                            </li>
                            <li class="dropdown__li">
                                <a href="/app/view/php/asistencia.php" class="dropdown__anchor"><i
                                        class="bx bxs-book-bookmark"></i>Asistencia</a>
                            </li>
                            <li class="dropdown__li">
                                <a href="#" class="dropdown__anchor"><i class="bx bx-link-alt"></i>Cargar Notas ORCE</a>
                            </li>

                            <li class="dropdown__li">
                                <a href="#" class="dropdown__anchor"><i class="bx bxs-copy-alt"></i>Biblioteca
                                    Virtual</a>
                            </li>
                            <li class="dropdown__li">
                                <a href="#" class="dropdown__anchor"><i class="bx bxs-dashboard"></i>Mi
                                    Disponibilidad</a>
                            </li>
                            <li class="dropdown__li">
                                <a href="#" class="dropdown__anchor"><i class="bx bxs-book-content"></i>Reclamo del
                                    docente</a>
                            </li>
                            <li class="dropdown__li">
                                <a href="#" class="dropdown__anchor"><i class="bx bxs-book-content"></i>Correción de
                                    notas</a>
                            </li>
                            <li class="dropdown__li">
                                <a href="#" class="dropdown__anchor"><i class="bx bxs-cog"></i>Ayuda en Aula</a>
                            </li>
                            <li class="dropdown__li">
                                <a href="#" class="dropdown__anchor"><i class="bx bxs-graduation"></i>Aula virtual
                                    titulación</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="dropdown__list">
                    <a href="#" class="dropdown__link">
                        <i class="bx bxs-briefcase"></i>
                        <span class="dropdown__span">Administrador</span>
                        <i class="bx bx-chevron-down arrow"></i>
                        <input type="checkbox" class="dropdown__check" />
                    </a>
                </li>
                <li class="dropdown__list">
                    <a href="#" class="dropdown__link">
                        <i class="bx bxs-briefcase"></i>
                        <span class="dropdown__span">Acreditación FIM</span>
                        <i class="bx bx-chevron-down arrow"></i>
                        <input type="checkbox" class="dropdown__check" />
                    </a>
                </li>
                <li class="dropdown__list">
                    <a href="#" class="dropdown__link">
                        <i class="bx bxs-briefcase"></i>
                        <span class="dropdown__span">Virtual</span>
                        <i class="bx bx-chevron-down arrow"></i>
                        <input type="checkbox" class="dropdown__check" />
                    </a>
                </li>
                <li class="dropdown__list">
                    <a href="#" class="dropdown__link">
                        <i class="bx bxs-briefcase"></i>
                        <span class="dropdown__span">Documentos académicos</span>
                        <i class="bx bx-chevron-down arrow"></i>
                        <input type="checkbox" class="dropdown__check" />
                    </a>
                </li>
            </ul>
        </div>
    </nav>
    <main class="home">
        <section class="content-nav">
            <i class="bx bx-menu toggle"></i>
            <p class="name">
                <?php 
                    $usuario = $_SESSION['usuario'];
                    echo $usuario;
                ?>
            </p>
            <div class="vertical-rounded">
                <div class="dropdown ms-3 dots-vertical-rounded">
                    <button class="btn btn-bd-light dropdown" id="bd-versions" data-bs-toggle="dropdown"
                        aria-expanded="false" data-bs-display="static">
                        <i class='bx bx-dots-vertical-rounded' style="color: white;"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="bd-versions">
                        <li>Roles</li>
                        <li><img src="/public/assets/img/perfil.jpg"> DOCENTE</li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="/app/view/php/informacion.php">Mi información</a></li>
                        <li><a class="dropdown-item" href="#">Reinciar clave</a></li>
                        <li><a class="dropdown-item" href="#" onclick="cerrar_sesion()">Cerrar Sesion</a></li>
                    </ul>
                    </li>
                </div>
                <div class="pant" id="toggle"></div>
            </div>
        </section>
        <section class="content">
            <article class="content-clase">
                <div class="content-descripton">
                    <h1>Horario de clase</h1>
                    <p class="text-secondary">
                        <b>Nota:</b> Presione en los cuadros a colores para listar alumnos
                    </p>
                    <button  class="btn btn-danger" onclick="GeneraPDF()">
                        <i class="bx bxs-file-pdf"></i>Descargar PDF
                    </button>
                </div>
                <div class="content-año">
                    <div>
                        <select class="form-select form-select-lg mb-3 fs-6 fs-6" aria-label=".form-select-lg example" id="periodo">
                           <option value="20223" >20223</option>
                           <option value="20222">20222</option>
                        </select>
                        <b style="color: #224fb1;font-size: 20px;">DEFINITIVO</b>
                    </div>
            </article>
            <article class="content-table">
                <h5 class="carga-horaria">CARGA HORARIA: 16 HRS</h5>
                <div>
                    <table class="table table-bordered text-center" id="horarioTable">
                        <thead>
                            <tr>
                                <th scope="col">HORA</th>
                                <th scope="col">LUNES</th>
                                <th scope="col">MARTES</th>
                                <th scope="col">MIERCOLES</th>
                                <th scope="col">JUEVES</th>
                                <th scope="col">VIERNES</th>
                                <th scope="col">SABADO</th>
                                <th scope="col">DOMINGO</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </article>
        </section>
    </main>
    <script src="/public/assets/js/script.js"></script>
    <script src="/public/assets/js/horario.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/php2pdf.js/0.10.1/php2pdf.bundle.min.js" integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    
    <!-- Bootstrap JavaScript Libraries -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
        integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous">
        </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js"
        integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
        </script>
    <!-- Swee alert2 -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</body>

</html>