function cargarHorario() {
    fetch("/horario.json")
      .then(response => response.json())
      .then(data => {
        const horario = data.horario;
        const table = document.getElementById('horarioTable').getElementsByTagName('tbody')[0];
  
        // Recorre las horas (debes usar horario['Lunes'] en lugar de horario['lunes'])
        for (const hora in horario['Lunes']) {
          const row = table.insertRow();
          const horaCell = row.insertCell(0);
          horaCell.innerHTML = hora;
  
          // Recorre los días de la semana
          for (const dia in horario) {
            const cell = row.insertCell();
            cell.style.width = '155px';
            if (horario[dia][hora]) {
              cell.innerHTML = horario[dia][hora];
            } else {
              cell.innerHTML = ''; // Deja las celdas vacías si no hay clase
            }
            
          }
        }
      })
      .catch(error => console.error('Error al cargar el horario:', error));
  }
  
  // Cargar el horario cuando se cargue la página
  window.onload = cargarHorario;