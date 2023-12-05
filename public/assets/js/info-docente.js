document.addEventListener("DOMContentLoaded", function () {
  introducir();
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

var familiarForm = document.getElementById("familiarForm");
var tablaFami = document.getElementById("bodyFamiliar");
var datoFamiliar = [];

var profesionalForm = document.getElementById("profesionalForm");
var formDomicilio = document.getElementById("DomicilioForm");
var docSustDatos = document.getElementById("document_sus");
var inputs = formDomicilio.querySelectorAll("input");
var selects = formDomicilio.querySelectorAll("select");
const datoDomicilio = [];
var datoFormacion = [];

var archivoPDF;
var modi = 0;
var rowIndexM = "";
const title_profe= document.getElementById("title_profe");
function desbloqueo() {
  let Lugar_pais = document.getElementById("Lugar_pais");
  let Lugar_depa = document.getElementById("Lugar_depa");
  let Lugar_provi = document.getElementById("Lugar_provi");
  let Lugar_distri = document.getElementById("Lugar_distri");

  Lugar_pais.addEventListener("change", function () {
    if (Lugar_pais.value === "1") {
      Lugar_depa.removeAttribute("disabled");
    }
  });

  Lugar_depa.addEventListener("change", function () {
    Lugar_provi.removeAttribute("disabled");
  });

  Lugar_provi.addEventListener("change", function () {
    Lugar_distri.removeAttribute("disabled");
  });

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
}
function introducir() {
  cargarDatos("Lugar_depa", "Lugar_provi", "Lugar_distri");
  cargarDatos("departamento", "provincia", "distrito");
}

function cargarDatos(departamentoId, provinciaId, distritoId) {
  var departamentoSelect = document.getElementById(departamentoId);
  var provinciaSelect = document.getElementById(provinciaId);
  var distritoSelect = document.getElementById(distritoId);

  fetch("/json/datos.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Llenar el select de departamento
      data.forEach(function (departamento) {
        var option = document.createElement("option");
        option.value = departamento.id;
        option.textContent = departamento.Departamento;
        departamentoSelect.appendChild(option);
      });

      // Agregar un evento de cambio al select de departamento
      departamentoSelect.addEventListener("change", function () {
        var selectedDepartamentoId = departamentoSelect.value;

        provinciaSelect.innerHTML =
          '<option value="" selected disabled>Seleccionar</option>';
        distritoSelect.innerHTML =
          '<option value="" selected disabled>Seleccionar</option>';

        var selectedDepartamento = data.find(function (departamento) {
          return departamento.id === selectedDepartamentoId;
        });

        if (selectedDepartamento) {
          // Llenar el select de provincia
          selectedDepartamento.provincias.forEach(function (provincia) {
            var option = document.createElement("option");
            option.value = provincia.id;
            option.textContent = provincia.nombre;
            provinciaSelect.appendChild(option);
          });
        }
      });

      // Agregar un evento de cambio al select de provincia
      provinciaSelect.addEventListener("change", function () {
        var selectedProvinciaId = provinciaSelect.value;
        distritoSelect.innerHTML =
          '<option value="" selected disabled>Seleccionar</option>';

        var selectedDepartamentoId = departamentoSelect.value;

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
            // Llenar el select de distrito
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
    fila.setAttribute("data-fila-index", i);
    fila.id="datos";
    var filaHTML = "";

    for (var j = 0; j < datoFormacion[i].length; j++) {
      var celda = document.createElement("td");

      if (j === 8) {
        var botonPDF =
          '<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal4" style="background-color: #224fb1" onclick="mostrarPDF(this)"><i class="bx bxs-show" color="#f7f7f2"></i></button>';

        celda.innerHTML = botonPDF;
      } else {
        celda.textContent = datoFormacion[i][j];
      }
      fila.appendChild(celda);
    }

    filaHTML +=
      '<td><button type="button" class="btn btn-primary" data-bs-toggle="modal"data-bs-target="#exampleModal2" style="background:#224fb1" onclick="modificar(this)"><i class="bx bxs-edit" style="color:#f7f7f2;"></i></button></td>';

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

function mostrarPDF(button) {
  const fila = button.closest("tr");
  const filaIndex = fila.getAttribute("data-fila-index");

  if (filaIndex !== null) {
    let rowIndex = parseInt(filaIndex);
    console.log("data-fila-index:", rowIndex);

    const modalPDF = document.getElementById("contenedorPDF");
    if (datoFormacion[rowIndex] && datoFormacion[rowIndex][8]) {
      const archivoURL = URL.createObjectURL(datoFormacion[rowIndex][8]);

      const iframe = document.createElement("iframe");
      iframe.src = archivoURL;
      iframe.style.width = "100%";
      iframe.style.height = "500px";

      modalPDF.innerHTML = "";
      modalPDF.appendChild(iframe);
    } else {
      console.error("No se ha seleccionado ningún archivo PDF.");
    }
  } else {
    console.error("El atributo 'data-fila-index' no está definido en la fila.");
  }
}

function eliminar() {
  // Obtiene el índice de la fila
  var filaIndex = tablaFormacion.getAttribute("data-fila-index");
  // Obtiene el índice de la fila
  let rowIndex = parseInt(filaIndex);

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

function modificar(button) {
  
  const fila = button.closest("tr");
  const filaIndex = fila.getAttribute("data-fila-index");
  rowIndexM = parseInt(filaIndex);
  modi = 1;
   
  title_profe.innerHTML += " (Modificar) ";

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

familiarForm.addEventListener("submit", (event) => {
  event.preventDefault();

  var ordenFami = datoFamiliar.length + 1;
  var Ape_nom = document.getElementById("Ape_Nom").value;
  var ParenSelect = document.getElementById("Paren");
  var Paren = ParenSelect.options[ParenSelect.selectedIndex].text;
  var Fech_na = document.getElementById("Fech_na").value;
  var Esta_CiSelect = document.getElementById("Esta_Civil");
  var Esta_Civil = Esta_CiSelect.options[Esta_CiSelect.selectedIndex].text;
  var Nivel_estuSelect = document.getElementById("Nivel_estu");
  var Nivel_estu =
    Nivel_estuSelect.options[Nivel_estuSelect.selectedIndex].text;
  var ocupacion = document.getElementById("Ocupacion").value;
  var seleccion = "";
  var economico = document.querySelector('input[name="tsSelector"]:checked');

  if (economico) {
    seleccion = economico.id === "true" ? "Si" : "No";
  }

  var familiar = [
    ordenFami,
    Ape_nom,
    Paren,
    Fech_na,
    Esta_Civil,
    Nivel_estu,
    ocupacion,
    seleccion,
  ];

  datoFamiliar.push(familiar);

  while (tablaFami.rows.length > 0) {
    tablaFami.deleteRow(0);
  }

  for (var i = 0; i < datoFamiliar.length; i++) {
    var fila = document.createElement("tr");
    fila.id="datos";

    for (var j = 0; j < datoFamiliar[i].length; j++) {
      var celda = document.createElement("td");
      celda.textContent = datoFamiliar[i][j];
      fila.appendChild(celda);
    }
    tablaFami.appendChild(fila);
  }
  familiarForm.reset();
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
  if (modi === 0) {

    datoFormacion.push(formacion);

  } else if (modi === 1) {
    
    datoFormacion[rowIndexM]= formacion ;
    for (var i = 0; i < datoFormacion.length; i++) {
      datoFormacion[i][0] = i + 1; // Actualiza los índices
    }
  }
  agregar()

  check.classList.add("d-none");
  profesionalForm.reset();
});

docSustDatos.addEventListener("change", function (event) {
  archivoPDF = event.target.files[0];
  var check = document.getElementById("check");
  check.classList.remove("d-none");
});

function borrar(){
  let title = "(Modificar)";
  title_profe.innerHTML = title_profe.innerHTML.replace(title, " ")

}

