fetch("/json/semestre.json")
  .then((response) => response.json())
  .then((data) => {
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
    var semElegido = selectSeme.options[selectSeme.selectedIndex].text;
    var content = document.getElementById("meses");
    selectSeme.addEventListener("change", () => {
      data.forEach((semestreItem) => {
        var id = semestreItem.id;
        var semestre = semestreItem.semestre;
        var fechaInicio = semestreItem.fechaInicio;
        var fechaFinal = semestreItem.fechaFinal;

        var mesI = fechaInicio.split("-"); //lo elimna el - y lo pone en un array
        var mesF = fechaFinal.split("-");
        var mesIni = parseInt(mesI[1], 10);
        var mesFin = parseInt(mesF[1], 10);

        if (semestre === semElegido) {
          for (i = 0; i < 6; i++) {
            var button = "";
            let num = 1;
            button += 
            `<button class="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample${num}" aria-expanded="false" aria-controls="collapseExample">${meses[mesIni]}</button>
                <div class="collapse" id = "collapseExample${num}" >
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
                     <tbody></tbody> 
                    </table>
                <div class="asisten-mensua">
                    <b style="font-size: 18px">Resumen de Asistencia Mensual</b><br>
                    <p><b>P:</b> <b>T:</b>  <b>F:</b></p> 
                </div> `;
            num++;
            
          }
          content.innerHTML = button;
        }
      });
    });
    selectSeme.dispatchEvent(new Event("change"));
  });
