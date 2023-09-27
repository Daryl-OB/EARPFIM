document.addEventListener("DOMContentLoaded", function () {
  desbloqueo();
  ocultar();
  
});

function desbloqueo() {
  // Obtén una referencia al elemento select de id "pais", "departamento","provincia","distrito"
  var paisSelect = document.getElementById("pais");
  var departamentoSelect = document.getElementById("departamento");
  var provinciaSelect = document.getElementById("provincia");
  var distritoSelect = document.getElementById("distrito");

  // Agrega un evento "change" al select de id "pais"
  paisSelect.addEventListener("change", function () {
    // Verifica si la opción seleccionada es "Perú"
    if (paisSelect.value === "1") {
      // Cambia "1" al valor correcto para "Perú"
      departamentoSelect.removeAttribute("disabled"); // Habilita el select de id "departamento"
    } else {
      departamentoSelect.setAttribute("disabled", "disabled"); // Desactiva el select de id "departamento"
    }
  });

  departamentoSelect.addEventListener("change", function () {
    provinciaSelect.removeAttribute("disabled");
  });

  provinciaSelect.addEventListener("change", function () {
    distritoSelect.removeAttribute("disabled");
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

      // Agregar un evento de cambio al primer select
      departamentoSelect.addEventListener("change", function () {
        // Limpiar los select de provincias y distritos

        // Obtener el ID del departamento seleccionado
        var selectedDepartamentoId = departamentoSelect.value;

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

          // Agregar un evento de cambio al segundo select (provincias)
          provinciaSelect.addEventListener("change", function () {
            // Limpiar el select de distritos

            // Obtener el ID de la provincia seleccionada
            var selectedProvinciaId = provinciaSelect.value;

            // Buscar los distritos correspondientes a la provincia seleccionada
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
          });
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

/*Table*/
function insertarTableDomicilio() {
  // Capturar los valores de los campos del formulario
  var pais = document.getElementById("pais").value;
  var departamento = document.getElementById("departamento").value;
  var provincia = document.getElementById("provincia").value;
  var distrito = document.getElementById("distrito").value;
  var tipoVia = document.getElementById("Tip_vía").value;
  var nombreVia = document.getElementById("Nom_via").value;
  var tipo = document.getElementById("tipo").value;
  var numeroInmueble = document.getElementById("N_inmueblo").value;
  var tipoZona = document.getElementById("tipo_zona").value;
  var nombreZona = document.getElementById("N_zona").value;
  var table = document
    .getElementById("DomicilioTable")
    .getElementsByTagName("tbody")[0];

  // Crear una nueva fila
  var newRow = table.insertRow(table.rows.length);

  // Insertar celdas con los valores capturados
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);
  var cell5 = newRow.insertCell(4);
  var cell6 = newRow.insertCell(5);
  var cell7 = newRow.insertCell(6);
  var cell8 = newRow.insertCell(7);
  var cell9 = newRow.insertCell(8);
  var cell10 = newRow.insertCell(9);
  var cell11 = newRow.insertCell(10);
  var cell12 = newRow.insertCell(11);
  // Establecer el contenido de las celdas
  cell1.innerHTML = table.rows.length - 1; // Contador de orden
  cell2.innerHTML = pais;
  cell3.innerHTML = pais;
  cell4.innerHTML = departamento;
  cell5.innerHTML = provincia;
  cell6.innerHTML = distrito;
  cell7.innerHTML = tipoVia;
  cell8.innerHTML = nombreVia; // Cambia esto según el campo que quieras mostrar
  cell9.innerHTML = tipo;
  cell10.innerHTML = numeroInmueble;
  cell11.innerHTML = tipoZona;
  cell12.innerHTML = nombreZona;
}

function insertarTableFormación() {
  // Capturar los valores de los campos del formulario
  var form_profe = document.getElementById("form_profe").value;
  var Pais = document.getElementById("Pais").value;
  var universidad = document.getElementById("universidad").value;
  var especialidad = document.getElementById("especialidad").value;
  var fech_ini = document.getElementById("fech_ini").value;
  var fech_fin = document.getElementById("fech_fin").value;
  var grado_obte = document.getElementById("grado").value;
  var documen_sus = document.getElementById("document_sus").value;
  var obser = document.getElementById("miTextarea").value;
  
  var table = document
    .getElementById("FormacionTable")
    .getElementsByTagName("tbody")[0];

  // Crear una nueva fila
  var newRow = table.insertRow(table.rows.length);

  // Insertar celdas con los valores capturados
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);
  var cell5 = newRow.insertCell(4);
  var cell6 = newRow.insertCell(5);
  var cell7 = newRow.insertCell(6);
  var cell8 = newRow.insertCell(7);
  var cell9 = newRow.insertCell(8);
  var cell10 = newRow.insertCell(9);
  var cell11 = newRow.insertCell(10);
  
  // Establecer el contenido de las celdas
  cell1.innerHTML = table.rows.length - 1; // Contador de orden
  cell2.innerHTML = form_profe;
  cell3.innerHTML = Pais;
  cell4.innerHTML = universidad;
  cell5.innerHTML = especialidad;
  cell6.innerHTML = fech_ini;
  cell7.innerHTML = fech_fin;
  cell8.innerHTML = grado_obte; // Cambia esto según el campo que quieras mostrar
  cell9.innerHTML = documen_sus;
  cell10.innerHTML = obser;
  cell11.innerHTML = opciones;
 
}
