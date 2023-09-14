const body = document.querySelector("body"),
  sidebar = body.querySelector(".sidebar"),
  toggle = body.querySelector(".toggle");
  toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");   
});

function cerrar_sesion (){
Swal.fire({
  title: 'Deseas Cerrar Sesion?',
  text: "",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes '
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cerrando sesion con exito...!!!',
      showConfirmButton: false,
      timer: 1500,}
    )
    setTimeout(function () {
      window.location.href = 'asistencia.html';
    }, 2000);
  }
   
})
}
function mensaje(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Enviado',
    showConfirmButton: false,
    timer: 1500,}
  )
}