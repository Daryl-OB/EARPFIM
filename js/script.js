/*Activar y desactivar modal*/
const body = document.querySelector("body"),
  sidebar = body.querySelector(".sidebar"),
  toggle = body.querySelector(".toggle"),
  pant = body.querySelector(".pant");
  
  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if (window.innerWidth <= 800) {
      pant.classList.toggle("d-none");   
    }
});
pant.addEventListener("click", () => {
  if (window.innerWidth <= 800) {
    pant.classList.toggle("d-none");
    sidebar.classList.toggle("close");
  }
});


/* Sweet Alert 2 */
function cerrar_sesion() {
  Swal.fire({
    title: "Deseas Cerrar Sesion?",
    text: "",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes ",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Cerrando Sesion con exito...!!!",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(function () {
        window.location.href = "https://www.google.com/?authuser=0";
      }, 2000);
    }
  });
}
/*function mensaje() {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Enviado",
    showConfirmButton: false,
    timer: 1500,
  });
}*/

