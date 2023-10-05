
    fetch("/horario.json")
      .then(response => response.json())
      .then(data => {
         const curso=[]
         const duración =[]
         const table = document.getElementById('horarioTable').getElementsByTagName('tbody')[0];
         data.forEach(objetosDatos => {
          const html= `(${objetosDatos.tope}) ${objetosDatos.codCurso}-${objetosDatos.secCurso} / [${objetosDatos.codAula}](${objetosDatos.teopra})`;
          var hora= `(${objetosDatos.hora})`;
          //document.getElementById("horarioTable").innerHTML= html;
            curso.push(html);   
            duración.push(hora);
        });
        console.log(curso);
        console.log(duración);
      

      })
      .catch((error)=>{
        console.error("error ar cargar");
      });

  
 