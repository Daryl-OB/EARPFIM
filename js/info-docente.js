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
  });