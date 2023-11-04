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
var docSustDatos = document.getElementById("document_sus");

var profesionalForm = document.getElementById("profesionalForm");
var formDomicilio = document.getElementById("DomicilioForm");
var inputs = formDomicilio.querySelectorAll("input");
var selects = formDomicilio.querySelectorAll("select");
const datoDomicilio = [];
var datoFormacion = [];

var archivoPDF;

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
      dire_extra.setAttribute("required", "true");
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

  fetch("/json/datos.json")
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
function restablecer() {
  colDirec.classList.add("d-none");
  colPais.classList.remove("d-none");
  paisSelect.setAttribute("required", "true");
  dire_extra.removeAttribute("required");
  formDomicilio.reset();

  for (var i = 1; i < selects.length; i++) {
    selects[i].disabled = true;
  }
  for (var i = 1; i < inputs.length; i++) {
    inputs[i].disabled = true;
  }
}

function agregar() {
  while (tablaFormacion.rows.length > 0) {
    tablaFormacion.deleteRow(0);
  }

  for (var i = 0; i < datoFormacion.length; i++) {
    var fila = document.createElement("tr");
    var filaHTML = "";

    for (var j = 0; j < datoFormacion[i].length; j++) {
      var celda = document.createElement("td");

      if (j === 8) {
        // Reemplaza archivoPDF con un botón
        var botonPDF = document.createElement("button");
        botonPDF.type = "button";
        botonPDF.className = "btn btn-primary";
        botonPDF.setAttribute("data-bs-toggle", "modal");
        botonPDF.setAttribute("data-bs-target", "#exampleModal4");
        botonPDF.style.backgroundColor = "#224fb1";
        botonPDF.id = "mostrar";



        var iconoPDF = document.createElement("i");
        iconoPDF.className = "bx bxs-show";
        iconoPDF.style.color = "#f7f7f2";

        botonPDF.appendChild(iconoPDF);
        celda.appendChild(botonPDF);
      } else {
        celda.textContent = datoFormacion[i][j];
      }
      fila.appendChild(celda);
    }

    filaHTML +=
      '<td><button type="button" class="btn btn-primary" data-bs-toggle="button" aria-pressed="false" autocomplete="off" style="background:#224fb1" onclick="modificar()"><i class="bx bxs-edit" style="color:#f7f7f2;"></i></button></td>';
    filaHTML +=
      '<td><button type="button" class="btn btn-primary" data-bs-toggle="button" aria-pressed="false" autocomplete="off" style="background:#224fb1" onclick="eliminar()"><i class="bx bx-minus" style="color:#f7f7f2"; ></i></button></td>';

    fila.innerHTML += filaHTML;

    tablaFormacion.appendChild(fila);

  }

  if (datoFormacion.length === 0) {
    var filaNoDatos = document.createElement("tr");
    var celdaNoDatos = document.createElement("td");
    celdaNoDatos.setAttribute("colspan", "12");
    celdaNoDatos.style.fontSize = "20px";
    celdaNoDatos.textContent = "NO DATOS EN LA TABLA";
    filaNoDatos.appendChild(celdaNoDatos);
    tablaFormacion.appendChild(filaNoDatos);
  }
}


function eliminar() {
  // Obtiene el índice de la fila
  var filaIndex = tablaFormacion.getAttribute("data-fila-index");
  // Obtiene el índice de la fila
  var rowIndex = parseInt(filaIndex);

  // Elimina la fila de la tabla
  tablaFormacion.deleteRow(rowIndex);

  // Elimina la entrada correspondiente en el array datoFormacion
  datoFormacion.splice(rowIndex - 1, 1); // Resta 1 para obtener la posición correcta en el array

  // Actualiza los índices en el array datoFormacion para mantener la coherencia
  for (var i = 0; i < datoFormacion.length; i++) {
    datoFormacion[i][0] = i + 1; // Actualiza los índices
  }
  agregar();


}

function modificar() {


}

formDomicilio.addEventListener("submit", (e) => {
  e.preventDefault();

  const orden = datoDomicilio.length + 1;
  var pais = paisSelect.options[paisSelect.selectedIndex].text;
  var depaDato =
    departamentoSelect.value +
    " " +
    departamentoSelect.options[departamentoSelect.selectedIndex].text;
  var proviDato =
    provinciaSelect.value +
    " " +
    provinciaSelect.options[provinciaSelect.selectedIndex].text;
  var distriDato =
    distritoSelect.value +
    " " +
    distritoSelect.options[distritoSelect.selectedIndex].text;
  var tip_viaDato = tip_viaSelect.options[tip_viaSelect.selectedIndex].text;
  var tipoDato = tipoSelect.options[tipoSelect.selectedIndex].text;
  var tipo_zonaDato =
    tipo_zonaSelect.options[tipo_zonaSelect.selectedIndex].text;
  const n_zonaDato = document.getElementById("N_zona").value;
  const n_inmuebloDato = document.getElementById("N_inmueblo").value;
  const nom_viaDato = document.getElementById("Nom_via").value;
  const dire_extraDato = dire_extra.value;

  if (pais === "Seleccionar") {
    pais = "Otro pais";
    depaDato = "  ";
    proviDato = "  ";
    distriDato = "  ";
    tip_viaDato = "  ";
    tipoDato = " ";
    tipo_zonaDato = "  ";
  }
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
    archivoPDF,
    textDato,
  ];
  
  datoFormacion.push(formacion);

  agregar();

  profesionalForm.reset();


  var botonPDF = document.getElementById("mostrar");

  botonPDF.addEventListener("click", function (event) {
    event.preventDefault();
    var modalPDF = document.getElementById("contenedorPDF");

    // Verifica si tienes un archivo PDF cargado
    if (archivoPDF) {
      // Crea una URL válida a partir del archivo PDF
      var archivoURL = URL.createObjectURL(archivoPDF);

      // Crea un elemento de iframe y establece el origen en la URL del archivo PDF
      var iframe = '<embed src="' + archivoURL + '" style="width:100%; height:500px;">'

      modalPDF.innerHTML = iframe;



    } else {
      console.error("No se ha seleccionado ningún archivo PDF.");
    }
  });
});

docSustDatos.addEventListener("change", function (event) {

  archivoPDF = event.target.files[0];

});




