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

    var content = document.getElementById("meses");
    var TotP = document.getElementById("TotP");
    var TotT = document.getElementById("TotT");
    var TotF = document.getElementById("TotF");
    var mesesArray = []; 
    TotP.innerHTML = "";
    TotT.innerHTML = "";
    TotF.innerHTML = "";

    selectSeme.addEventListener("change", () => {
      content.innerHTML = "";
      var Totpuntual = 0;
      var Tottardanza = 0;
      var Totfalta = 0;
      mesesArray.length = 0;
      semestreData.forEach((semestreItem) => {
        var semElegido = selectSeme.options[selectSeme.selectedIndex].text;
        var id = semestreItem.id;
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
          console.log(mesesArray);
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
            
            Totpuntual += puntual;
            Tottardanza += tardanza;
            Totfalta += falta;
            var selectedMonth = mesesArray.find((month) => mes.includes(month));

            if (selectedMonth) {
              hasData = true;
              var tbody = document.getElementById(selectedMonth);
              console.log(selectedMonth)
              if (tbody) {
                document.getElementById(`puntual-${mes}`).innerHTML = `P: ${puntual}`;
                document.getElementById(`tardanza-${mes}`).innerHTML = `T: ${tardanza}`;
                document.getElementById(`falta-${mes}`).innerHTML = `F: ${falta}`;

                tbody.appendChild(fila);
                TotP.innerHTML = Totpuntual;
                TotT.innerHTML = Tottardanza;
                TotF.innerHTML = Totfalta;
              }
            }
          }
        }
      });
      
    });
    selectSeme.dispatchEvent(new Event("change"));
  })
  .catch((error) => {
    console.error("Error al cargar los datos:", error);
  });
