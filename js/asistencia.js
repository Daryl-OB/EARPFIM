Promise.all([
  fetch("/json/semestre.json").then((response) => response.json()),
  fetch("/json/asistencia.json").then((response) => response.json()),
])
  .then((data) => {
    const semestreData = data[0];
    const asistenciaData = data[1];

    var selectSeme = document.getElementById("semestre");
    var meses = [
      "ENERO",
      "FEBRERO",
      "MARZO",
      "ABRIL",
      "MAYO",
      "JUNIO",
      "JULIO",
      "AGOSTO",
      "SEPTIEMBRE",
      "OCTUBRE",
      "NOVIEMBRE",
      "DICIEMBRE",
    ];

    semestreData.forEach((semestreItem) => {
      var option = document.createElement("option");
      option.value = semestreItem.id;
      option.textContent = semestreItem.semestre;
      selectSeme.appendChild(option);
    });
    

    var content = document.getElementById("meses");
    var TotP = document.getElementById("TotP");
    var TotT = document.getElementById("TotT");
    var TotF = document.getElementById("TotF");
    var mesesArray = [];
    TotP.innerHTML = "";
    TotT.innerHTML = "";
    TotF.innerHTML = "";
   
    selectSeme.addEventListener("change", () => {
      var valoresPorMes = new Map();
      content.innerHTML = "";
      var Totpuntual = 0;
      var Tottardanza = 0;
      var Totfalta = 0;
      mesesArray.length = 0;
      
      semestreData.forEach((semestreItem) => {
        var semElegido = selectSeme.options[selectSeme.selectedIndex].text;
        var semestre = semestreItem.semestre;

        if (semestre === semElegido) {
          var fechaInicio = semestreItem.fechaInicio;
          var fechaFinal = semestreItem.fechaFinal;

          var mesI = fechaInicio.split("-");
          var mesF = fechaFinal.split("-");
          var año = parseInt(mesI[0], 10);
          var mesIni = parseInt(mesI[1], 10) - 1;
          var mesFin = parseInt(mesF[1], 10);
          var num = 1;
          var button = "";

          for (var i = mesIni; i < mesFin; i++) {
            button += `<button class="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample${num}" aria-expanded="false" aria-controls="collapseExample${num}">${meses[i]}  ${año}</button>
                  <div class="collapse" id="collapseExample${num}">
                    <table class="table table-striped text-center">
                      <thead>
                           <tr>
                           <th scope="col">Dia</th>
                           <th scope="col">Curso</th>
                           <th scope="col">Horario</th>
                           <th scope="col">Marcación</th>
                           <th scope="col">Est</th>
                          </tr>
                      </thead>
                      <tbody id="${meses[i]}">
                      </tbody> 
                    </table>
                  <div class="asisten-mensua">
                      <b style="font-size: 18px">Resumen de Asistencia Mensual</b><br>
                      <p><b id="puntual-${meses[i]}">P:</b> <b id="tardanza-${meses[i]}">T:</b>  <b id="falta-${meses[i]}">F:</b></p>
                  </div>
                </div> `;
            num++;
            content.innerHTML = button;

            mesesArray.push(meses[i]);
          }
        }
      });
      
      asistenciaData.forEach((asistencia) => {
        var semElegido = selectSeme.options[selectSeme.selectedIndex].text;
        var btnPunt = "";
        var btnTard = "";
        var btnFalta = "";
        var btnN = "";
        var puntual = 0;
        var tardanza = 0;
        var falta = 0;
        btnPunt += `<button type="button" class="btn btn-success" style="background:#28a745;">P</button>`;
        btnTard += `<button type="button" class="btn btn-success" style="background:#ff8100;">T</button>`;
        btnFalta += `<button type="button" class="btn btn-danger">F</button>`;
        btnN += `<button type="button" class="btn btn-primary">N:N</button>`;
        var semestre = asistencia.semestre;
        var mes = asistencia.mes.toUpperCase();

        if (semElegido === semestre && mesesArray.includes(mes)) {
          var dia = asistencia.dia;
          var curso = asistencia.curso;
          var horario = asistencia.horario;
          var marcacion = asistencia.marcacion;
          var est = asistencia.est;
          var dato = [dia, curso, horario, marcacion, est];
          var fila = document.createElement("tr");

          for (let i = 0; i < dato.length; i++) {
            var celda = document.createElement("td");

            if (i === 4) {
              var btn = dato[4].toUpperCase();

              if (btn === "P") {
                celda.innerHTML = btnPunt;
                fila.appendChild(celda);
                puntual++;
              } else if (btn === "T") {
                celda.innerHTML = btnTard;
                fila.appendChild(celda);
                tardanza++;

              } else if (btn === "F") {
                celda.innerHTML = btnFalta;
                fila.appendChild(celda);
                falta++;

              } else {
                celda.innerHTML = btnN;
                fila.appendChild(celda);

              }
            } else {
              celda.textContent = dato[i];
              fila.appendChild(celda);

            }
          }
          Totpuntual += puntual;
          Tottardanza += tardanza;
          Totfalta += falta;

          var selectedMonth = mesesArray.find((month) => mes.includes(month));

          if (selectedMonth) {
            var tbody = document.getElementById(selectedMonth);
            if (tbody) {
              // Recupera los valores acumulados del mapa
              var valoresMes = valoresPorMes.get(selectedMonth) || { puntual: 0, tardanza: 0, falta: 0 };
              valoresMes.puntual += puntual;
              valoresMes.tardanza += tardanza;
              valoresMes.falta += falta;

              // Actualiza los elementos HTML con los nuevos valores
              document.getElementById(`puntual-${selectedMonth}`).innerHTML = `P: ${valoresMes.puntual}`;
              document.getElementById(`tardanza-${selectedMonth}`).innerHTML = `T: ${valoresMes.tardanza}`;
              document.getElementById(`falta-${selectedMonth}`).innerHTML = `F: ${valoresMes.falta}`;

              // Almacena los valores acumulados en el mapa
              valoresPorMes.set(selectedMonth, valoresMes);

              TotF.innerHTML = Totfalta;
              TotP.innerHTML = Totpuntual;
              TotT.innerHTML = Tottardanza;
              tbody.appendChild(fila);
            }
          }
        }
      });

      mesesArray.forEach((month) => {
        var tbody = document.getElementById(month);
        if (tbody && tbody.children.length === 0) {
          var noDataMessage = "";
          noDataMessage += `<tr><td colspan=5>NO HAY DATOS DE LA TABLA</td></tr>`
          tbody.innerHTML = noDataMessage;

          document.getElementById(`puntual-${month}`).innerHTML = "P: 0";
          document.getElementById(`tardanza-${month}`).innerHTML = "T: 0";
          document.getElementById(`falta-${month}`).innerHTML = "F: 0";
        }
      });

    });
    selectSeme.dispatchEvent(new Event("change"));
  })
  .catch((error) => {
    console.error("Error al cargar los datos:", error);
  });
