document.addEventListener("DOMContentLoaded", function () {
    // Obtén una referencia al elemento select de id "pais", "departamento","provincia","distrito"
    var paisSelect = document.getElementById("pais");
    var departamentoSelect = document.getElementById("departamento");
    var provinciaSelect = document.getElementById("provincia");
    var distritoSelect = document.getElementById("distrito");
  
    // Agrega un evento "change" al select de id "pais"
    paisSelect.addEventListener("change", function () {
      // Verifica si la opción seleccionada es "Perú"
      if (paisSelect.value === "1") { // Cambia "1" al valor correcto para "Perú"
        // Habilita el select de id "departamento"
        departamentoSelect.removeAttribute("disabled");
      } else {
        // Desactiva el select de id "departamento"
        departamentoSelect.setAttribute("disabled", "disabled");
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
            var selectedProvincia = selectedDepartamento.provincias.find(function (provincia) {
              return provincia.id === selectedProvinciaId;
            });

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
  })

   
   /*Table*/
   const form = document.getElementById("DomicilioForm");

   form.addEventListener("submit",function(event){
    event.preventDefault();/*evita que se actualise la pagina*/
     let DomicilioForm = new FormData(form);
     let DomicilioTabletRef =  document.getElementById("DomicilioTable");
     let newDomicilioRowRef = DomicilioTabletRef.insertRow(-1);

     let newTypeCellRef = newDomicilioRowRef.insertCell(0);
     newTypeCellRef.textContent = DomicilioForm.get("pais")
 
     newTypeCellRef = newDomicilioRowRef.insertCell(1);
     newTypeCellRef.textContent = DomicilioForm.get("departamento")

     newTypeCellRef = newDomicilioRowRef.insertCell(2);
     newTypeCellRef.textContent = DomicilioForm.get("provincia")

     newTypeCellRef = newDomicilioRowRef.insertCell(3);
     newTypeCellRef.textContent = DomicilioForm.get("distrito")

     newTypeCellRef = newDomicilioRowRef.insertCell(4);
     newTypeCellRef.textContent = DomicilioForm.get("Tip_via")

     newTypeCellRef = newDomicilioRowRef.insertCell(5);
     newTypeCellRef.textContent = DomicilioForm.get("Nom_via")

     newTypeCellRef = newDomicilioRowRef.insertCell(6);
     newTypeCellRef.textContent = DomicilioForm.get("tipo")

     newTypeCellRef = newDomicilioRowRef.insertCell(7);
     newTypeCellRef.textContent = DomicilioForm.get("N_inmueble")

     newTypeCellRef = newDomicilioRowRef.insertCell(8);
     newTypeCellRef.textContent = DomicilioForm.get("tipo_zona")

     newTypeCellRef = newDomicilioRowRef.insertCell(9);
     newTypeCellRef.textContent = DomicilioForm.get("N_zona")

     

   })