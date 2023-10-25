const table = document.getElementById("horarioTable").getElementsByTagName("tbody")[0];


function crearceldas() {
  const hora = ["07-08","08-09","09-10","10-11","11-12","12-13","13-14","14-15","15-16","16-17","17-18", "18-19", "19-20","20-21","21-22", "22-23",];

  hora.forEach((horaStr) => {
    const row = table.insertRow();
    const cell = row.insertCell(0); 
    cell.textContent = horaStr;
  });

  // Crear las celdas vacías para los cursos
  for (let i = 0; i < hora.length; i++) {
    for (let j = 1; j <= 7; j++) {
      const cell = table.rows[i].insertCell(j);
      cell.textContent = ""; 
    }
  }
}


fetch("/json/horario.json")
  .then((response) => response.json())
  .then((data) => {
    const dias = ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"];

    crearceldas();

    const semestreElegido = document.getElementById("periodo");

    semestreElegido.addEventListener("change", () => {
      const semestreSelect = semestreElegido.value;
      
      table.innerHTML = "";

      crearceldas();

     
      data.forEach((objetoDato) => {
        const semestre = objetoDato.semestre;
        if (semestre === semestreSelect) {
          const curso = `(${objetoDato.tope}) ${objetoDato.codCurso}-${objetoDato.secCurso} / [${objetoDato.codAula}](${objetoDato.teopra})`;
          const horaStr = objetoDato.hora;
          const dia = dias.indexOf(objetoDato.dia.toLowerCase()); // Convertir el día en un índice
          const hora = horaStr.split("-");
          
          const horaIni = parseInt(hora[0], 10);
          const horaFin = parseInt(hora[1], 10);
          const duracion = Math.abs(horaIni - horaFin);

          
          for (let i = horaIni - 7; i < horaFin - 7; i++) {
            const row = table.rows[i];
            if (!row) {
              // Si la fila no existe, crea una nueva
              const newRow = table.insertRow(i);
              for (let j = 0; j < 8; j++) {
                const cell = newRow.insertCell(j);
                cell.textContent = ""; // Celda vacía por defecto
              }
            }
            const cell = row.cells[dia + 1];
            cell.textContent = curso;

            cell.style.backgroundColor = "#b9eef6"; 
            cell.style.color = "#000"; 
            cell.style.border = "3px solid #b3d5e5";
            cell.style.fontWeight = "500";
            cell.style.textAlignLast="center"
            if (i === horaIni - 7) {
              cell.rowSpan = duracion;
            } else {
              cell.style.display = "none"; 
            }
          }
        }
      });
    });
    semestreElegido.dispatchEvent(new Event('change')); 
  })
  .catch((error) => {
    console.log("Error en cargar", error);
  });


