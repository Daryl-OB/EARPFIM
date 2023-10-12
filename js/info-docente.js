document.addEventListener("DOMContentLoaded", function () {
  desbloqueo();
  ocultar();
  
});

var paisSelect = document.getElementById("pais");
var dire_extra = document.getElementById("dire_extrajera");
var departamentoSelect = document.getElementById("departamento");
var provinciaSelect = document.getElementById("provincia");
var distritoSelect = document.getElementById("distrito");
var tip_viaSelect = document.getElementById("tip_via");
var tipo_zonaSelect = document.getElementById("tipo_zona");
var tipoSelect = document.getElementById("tipo");
var tabla = document.getElementById("tabla");
var tablaFormacion = document.getElementById("bobyFormacion");
var colPais = document.getElementById("col-Pais");
var colDirec = document.getElementById("col-Dire-extrajera");

var profesionalForm = document.getElementById("profesionalForm");
var formDomicilio = document.getElementById("DomicilioForm");
var inputs = formDomicilio.querySelectorAll("input");
var selects = formDomicilio.querySelectorAll("select");
const datoDomicilio = [];
const datoFormacion = [];

function desbloqueo() {
  // Obtén una referencia al elemento select de id "pais", "departamento","provincia","distrito"

  paisSelect.addEventListener("change", function () {
    if (paisSelect.value === "1") {
      departamentoSelect.removeAttribute("disabled");
    } else {
      restablecer();
      colDirec.classList.remove("d-none");
      colPais.classList.add("d-none");
      paisSelect.removeAttribute("required");
    }
  });

  departamentoSelect.addEventListener("change", function () {
    provinciaSelect.removeAttribute("disabled");
  });

  provinciaSelect.addEventListener("change", function () {
    distritoSelect.removeAttribute("disabled");
  });

  distritoSelect.addEventListener("change", function () {
    tipoSelect.removeAttribute("disabled");
    tip_viaSelect.removeAttribute("disabled");
    tipo_zonaSelect.removeAttribute("disabled");
    for (var i = 1; i < inputs.length; i++) {
      inputs[i].disabled = false;
    }
  });

  fetch("/datos.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Llenar el primer select con opciones de departamentos
      data.forEach(function (departamento) {
        var option = document.createElement("option");
        option.value = departamento.id;
        option.textContent = departamento.Departamento;
        departamentoSelect.appendChild(option);
      });

      // Agregar un evento de cambio al primer select (departamento)
      departamentoSelect.addEventListener("change", function () {
        // Obtener el ID del departamento seleccionado
        var selectedDepartamentoId = departamentoSelect.value;

        // Limpiar los select de provincia y distrito
        provinciaSelect.innerHTML =
          '<option value="" selected disabled>Seleccionar</option>';
        distritoSelect.innerHTML =
          '<option value="" selected disabled>Seleccionar</option>';

        // Buscar las provincias correspondientes al departamento seleccionado
        var selectedDepartamento = data.find(function (departamento) {
          return departamento.id === selectedDepartamentoId;
        });

        if (selectedDepartamento) {
          // Llenar el segundo select con opciones de provincias
          selectedDepartamento.provincias.forEach(function (provincia) {
            var option = document.createElement("option");
            option.value = provincia.id;
            option.textContent = provincia.nombre;
            provinciaSelect.appendChild(option);
          });
        }
      });

      // Agregar un evento de cambio al segundo select (provincias)
      provinciaSelect.addEventListener("change", function () {
        // Obtener el ID de la provincia seleccionada
        var selectedProvinciaId = provinciaSelect.value;

        // Limpiar el select de distritos
        distritoSelect.innerHTML =
          '<option value="" selected disabled>Seleccionar</option>';

        // Obtener el ID del departamento seleccionado
        var selectedDepartamentoId = departamentoSelect.value;

        // Buscar los distritos correspondientes a la provincia seleccionada
        var selectedDepartamento = data.find(function (departamento) {
          return departamento.id === selectedDepartamentoId;
        });

        if (selectedDepartamento) {
          var selectedProvincia = selectedDepartamento.provincias.find(
            function (provincia) {
              return provincia.id === selectedProvinciaId;
            }
          );

          if (selectedProvincia) {
            // Llenar el tercer select con opciones de distritos
            selectedProvincia.distritos.forEach(function (distrito) {
              var option = document.createElement("option");
              option.value = distrito.id;
              option.textContent = distrito.nombre;
              distritoSelect.appendChild(option);
            });
          }
        }
      });
    });
}

function ocultar() {
  const btn1 = body.querySelector(".btn1"),
    btn2 = body.querySelector(".btn2"),
    contentUno = body.querySelector(".content-uno"),
    contentDos = body.querySelector(".content-dos");

  btn1.addEventListener("click", () => {
    contentUno.classList.remove("d-none"),
      contentDos.classList.add("d-none"),
      btn1.classList.add("active"),
      btn2.classList.remove("active");
  });
  btn2.addEventListener("click", () => {
    contentUno.classList.add("d-none"),
      contentDos.classList.remove("d-none"),
      btn1.classList.remove("active"),
      btn2.classList.add("active");
  });
}

formDomicilio.addEventListener("submit", (e) => {
  e.preventDefault();

  const orden = datoDomicilio.length + 1;
  const pais = paisSelect.options[paisSelect.selectedIndex].text;
  const depaDato =
    departamentoSelect.value +
    " " +
    departamentoSelect.options[departamentoSelect.selectedIndex].text;
  const proviDato =
    provinciaSelect.value +
    " " +
    provinciaSelect.options[provinciaSelect.selectedIndex].text;
  const distriDato =
    distritoSelect.value +
    " " +
    distritoSelect.options[distritoSelect.selectedIndex].text;
  const tip_viaDato = tip_viaSelect.options[tip_viaSelect.selectedIndex].text;
  const tipoDato = tipoSelect.options[tipoSelect.selectedIndex].text;
  const tipo_zonaDato =
    tipo_zonaSelect.options[tipo_zonaSelect.selectedIndex].text;
  const n_zonaDato = document.getElementById("N_zona").value;
  const n_inmuebloDato = document.getElementById("N_inmueblo").value;
  const nom_viaDato = document.getElementById("Nom_via").value;
  const dire_extraDato = dire_extra.value;

  const dato = [
    orden,
    pais,
    dire_extraDato,
    depaDato,
    proviDato,
    distriDato,
    tip_viaDato,
    nom_viaDato,
    tipoDato,
    n_inmuebloDato,
    tipo_zonaDato,
    n_zonaDato,
  ];

  datoDomicilio.push(dato);

  // Resto del código sigue igual
  while (tabla.rows.length > 0) {
    tabla.deleteRow(0);
  }

  for (var i = 0; i < datoDomicilio.length; i++) {
    var fila = document.createElement("tr");

    for (var j = 0; j < datoDomicilio[i].length; j++) {
      var celda = document.createElement("td");
      celda.textContent = datoDomicilio[i][j];
      fila.appendChild(celda);
    }
    tabla.appendChild(fila);
  }
  restablecer();
});

profesionalForm.addEventListener("submit", (evento) => {
  evento.preventDefault();
  var ordenForma = datoFormacion.length + 1;
  var form_profe = document.getElementById("form_profe");
  var form_profeDato = form_profe.options[form_profe.selectedIndex].text;
  var Pais = document.getElementById("Pais");
  var PaisDato = Pais.options[Pais.selectedIndex].text;
  var univerDato = document.getElementById("universidad").value;
  var especiaDato = document.getElementById("especialidad").value;
  var fech_initDato = document.getElementById("fech_ini").value;
  var fech_finDato = document.getElementById("fech_fin").value;
  var gradoDato = document.getElementById("grado").value;
  var docSustDatos = document.getElementById("document_sus").value;
  var textDato = document.getElementById("miTextarea").value;

  var formacion = [
    ordenForma,
    form_profeDato,
    PaisDato,
    univerDato,
    especiaDato,
    fech_initDato,
    fech_finDato,
    gradoDato,
    docSustDatos,
    textDato,
  ];

  datoFormacion.push(formacion);
  console.log(datoFormacion);

  while (tablaFormacion.rows.length > 0) {
    tablaFormacion.deleteRow(0);
  }

  for (var i = 0; i < datoFormacion.length; i++) {
    var fila = document.createElement("tr");
    var filaHTML = "";

    for (var j = 0; j < datoFormacion[i].length; j++) {
      var celda = document.createElement("td");
      celda.textContent = datoFormacion[i][j];
      fila.appendChild(celda);
    }

    filaHTML +=
      '<td><button type="button" class="btn btn-primary" data-bs-toggle="button" aria-pressed="false" autocomplete="off" style="background:#224fb1;"><i class="bx bxs-edit" style="color:#f7f7f2;"></i></button></td>';
    filaHTML +=
      '<td><button type="button" class="btn btn-primary" data-bs-toggle="button" aria-pressed="false" autocomplete="off" style="background:#224fb1;"><i class="bx bx-minus" style="color:#f7f7f2;"></i></button></td>';

    fila.innerHTML += filaHTML;

    tablaFormacion.appendChild(fila);
  }
   profesionalForm.reset();
});

function restablecer() {
  colDirec.classList.add("d-none");
  colPais.classList.remove("d-none");
  paisSelect.setAttribute("required", "true");
  formDomicilio.reset();

  for (var i = 1; i < selects.length; i++) {
    selects[i].disabled = true;
  }
  for (var i = 1; i < inputs.length; i++) {
    inputs[i].disabled = true;
  }
}
