fetch("/horario.json")
  .then(response => response.json())
  .then(data => {
    const hora = ['07-08', '08-09', '09-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17', '17-18', '18-19', '19-20', '20-21', '21-22', '22-23'];
    const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    const table = document.getElementById('horarioTable').getElementsByTagName('tbody')[0];

    // Crear las filas vacías en la tabla
    hora.forEach(horaStr => {
      const row = table.insertRow();
      const cell = row.insertCell(0); // Celda para la hora
      cell.textContent = horaStr;
    });

    // Crear las celdas vacías para los cursos
    for (let i = 0; i < hora.length; i++) {
      for (let j = 1; j <= 7; j++) {
        const cell = table.rows[i].insertCell(j);
        cell.textContent = ''; // Celda vacía por defecto
      }
    }

    data.forEach(objetoDato => {
      const curso = `(${objetoDato.tope}) ${objetoDato.codCurso}-${objetoDato.secCurso} / [${objetoDato.codAula}](${objetoDato.teopra})`;
      const semestre = objetoDato.semestre;
      const horaStr = objetoDato.hora;
      const dia = dias.indexOf(objetoDato.dia.toLowerCase()); // Convertir el día en un índice
      const hora = horaStr.split('-');
      const horaIni = parseInt(hora[0], 10);
      const horaFin = parseInt(hora[1], 10);
      const duracion = Math.abs(horaIni - horaFin);

      // Insertar el curso en las celdas correspondientes y aplicar estilo
      for (let i = horaIni - 7; i < horaFin - 7; i++) {
        const cell = table.rows[i].cells[dia + 1];
        cell.textContent = curso;

        // Aplicar estilos a la celda
        cell.style.backgroundColor = '#b9eef6'; // Fondo celeste
        cell.style.color = '#000'; // Texto en negro
        cell.style.border = '3px solid #b3d5e5';
        cell.style.fontWeight ='500'

        if (i === horaIni - 7) {
          cell.setAttribute('rowspan', duracion);
        } else {
          cell.style.display = 'none'; // Ocultar celdas adicionales del curso
        }
      }
    });
  })
  .catch((error) => {
    console.log("Error en cargar", error);
  });
