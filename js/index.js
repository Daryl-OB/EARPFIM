
    fetch("/horario.json")
      .then(response => response.json())
      .then(data => {
         const curso=[];
         const duración =[];
         const hora= ['07-08','08-09','09-10','10-11','11-12','12-13','13-14','14-15','15-16','16-17','17-18','18-19','19-20','20-21','21-22','22-23'];
         const table = document.getElementById('horarioTable').getElementsByTagName('tbody')[0];
         


         data.forEach(objetosDatos => {
          const html= `(${objetosDatos.tope}) ${objetosDatos.codCurso}-${objetosDatos.secCurso} / [${objetosDatos.codAula}](${objetosDatos.teopra})`;
          var duracion= `(${objetosDatos.hora})`;
          //document.getElementById("horarioTable").innerHTML= html;
            curso.push(html);   
            duración.push(duracion);

        });
        for(i=0;i<hora.length;i++){
          var fila = document.createElement("tr");
          var celda = document.createElement("td");
          celda.textContent  = hora[i];
          fila.appendChild(celda);

          table.appendChild(fila)
        }
        console.log(curso);
        console.log(duración);
      

      })
      .catch((error)=>{
        console.error("error ar cargar");
      });

  
 