

//TRAER MÉDICOS DE LA API
async function cargarMedicos() {
    const res = await fetch("https://6913e692f34a2ff1170d7f79.mockapi.io/api/doctor");
    const medicos = await res.json();
    return medicos;
}

//Cargar Especialidad

async function cargarEspecialidad() {
    let listaEspecialidad = document.getElementById('especialidad');
    let datoEspecialidad = await cargarMedicos();

    // Usamos un Set para evitar duplicados
    let especialidadesUnicas = new Set();

    for (let i of datoEspecialidad) {
        if (!especialidadesUnicas.has(i.especialidad)) {
            especialidadesUnicas.add(i.especialidad);

            let opcion = document.createElement('option');
            opcion.value = i.especialidad;
            opcion.textContent = i.especialidad;
            listaEspecialidad.append(opcion);
        }
    }
}




//CARGAR MÉDICOS en base a la especialidad
async function cargarSelectMedicos() {
    const lista = await cargarMedicos();
    let optEspecialidad = document.getElementById('especialidad').value;
    const select = document.querySelector('select[name="medico"]'); // agrege name en el html, solo tenia id
    select.innerHTML = `<option value="">Seleccione un médico</option>`;

    lista.forEach(med => {
        if (med.especialidad == optEspecialidad) {
            const opt = document.createElement("option");
            opt.value = med.nombre;
            opt.textContent = med.nombre;
            select.appendChild(opt);
        }

    });
}

// carga los dias en base al medico
async function cargarDias() {
    let diasMedico = document.getElementById('medico').value;
    let lista = document.getElementById('dia');
    lista.innerHTML = '';
    let datos = await cargarMedicos();
    for (let n of datos) {
        if (n.nombre == diasMedico) {
            for (let d of n.diasDisponibles) {
                let optDia = document.createElement('li')
                optDia.innerHTML = `
                <li >${d.dia}</li>
                `;
                lista.append(optDia);
            }

        }
    }
}

// fecha minima para elegir
const fechaInput = document.getElementById('fechaTurno');
const hoy = new Date().toISOString().split('T')[0];
fechaInput.min = hoy;
//

let optEspecialidad = document.getElementById('especialidad');
optEspecialidad.addEventListener('change', cargarSelectMedicos);
let optMedico = document.getElementById('medico');
optMedico.addEventListener('change', cargarDias);

cargarEspecialidad();

// eleccion dia

async function controlarDia(){
    let fecha = document.getElementById('fechaTurno').value;
    let diaFecha = await diaSemana(fecha);
    let medico = await cargarMedicos();
    let selMedico = document.getElementById('medico').value;
    for(let m of medico){
        if (m.nombre == selMedico){
            //controlar esto
            alert(m.diasDisponibles.dia.value)
            alert(diaFecha.value)
            if(!m.diasDisponibles.dia.includes(diaFecha)){
                return alert('no Coincide')
            }
        }
    }
}

async function diaSemana(f) {
    const dias = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
    return dias[new Date(f+"T00:00:00").getDay];
    
}

let fechaTurno = document.getElementById('fechaTurno');
fechaTurno.addEventListener('change',controlarDia);



























//SOLICITARTURNO
// let fechaSeleccionada = null;

// const picker = flatpickr("#fecha", {
//     dateFormat: "Y-m-d",
//     locale: "es",
//     minDate: "today",
//     onChange: function (selectedDates, dateStr) {
//         fechaSeleccionada = dateStr;
//         console.log("Fecha elegida:", fechaSeleccionada);
//     }
// });

// let horarioSeleccionado = null;

// const horario = document.querySelectorAll('input[name="opcion"]');

// horario.forEach(hora => {
//     hora.addEventListener("change", () => {
//         horarioSeleccionado = hora.value;
//         console.log("Horario elegido:", horarioSeleccionado);
//     });
// });

// let medicoSeleccionado = null;

// const medico = document.querySelector('select[name="medico"]');

// medico.addEventListener("change", () => {
//     medicoSeleccionado = medico.value;
//     console.log("Médico elegido:", medicoSeleccionado);
// });


// document.getElementById("btnGuardar").addEventListener("click", () => {
//     if (!fechaSeleccionada) {
//         alert("Elegí una fecha primero");
//         return;
//     }

//     if (!horarioSeleccionado) {
//         alert("Elegí un horario primero");
//         return;
//     }

//     if (!medicoSeleccionado) {
//         alert("Elegí un médico primero");
//         return;
//     }

//     alert(`Turno confirmado para el ${fechaSeleccionada} en el horario de ${horarioSeleccionado} con el`);

// });



//SOL