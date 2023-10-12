

document.addEventListener("DOMContentLoaded", function () {
 var meses = [
    'ENERO',
    'FEBRERO',
    'MARZO',
    'ABRIL',
    'MAYO',
    'JUNIO',
    'JULIO',
    'AGOSTO',
    'SEPTIEMBRE',
    'OCTUBRE',
    'NOVIEMBRE',
    'DICIEMBRE'
];

let button = "";
var content = document.getElementById("meses");
let table = "";
let num = 1;
for (var i = meses.length - 1; i >= 0 && num <= 6; i--) {
    button += `<button class="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample${num}" aria-expanded="false" aria-controls="collapseExample">${meses[i]}</button>
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
            <tbody></tbody> 
        </table>
        <div class="asisten-mensua">
            <b style="font-size: 18px">Resumen de Asistencia Mensual</b><br>
            <p><b>P:</b> <b>T:</b>  <b>F:</b></p> 
        </div>
    </div>`;
    num++;
}

content.innerHTML = button;

});
