
    // TERMINAR DE HACER LOS LA CARGA DE OPCIONES CON CONDICIONES//
//Cargar Especialidad
async function cargarEspecialidad() {
    let listaEspecialidad = document.getElementById('especialidad');
    let datoEspecialidad = await cargarMedicos();
    for (let i of datoEspecialidad) {
        let opcion = document.createElement('option');
        opcion.innerHTML = `
    <option value="" >${i.especialidad}</option>
    `;
        listaEspecialidad.append(opcion);
    }
}
cargarEspecialidad();

//TRAER MÉDICOS DE LA API
async function cargarMedicos() {
    const res = await fetch("https://6913e692f34a2ff1170d7f79.mockapi.io/api/doctor");
    const medicos = await res.json();
    return medicos;
}

//CARGAR MÉDICOS EN SELECT
async function cargarSelectMedicos() {
    const lista = await cargarMedicos();
    const select = document.querySelector('select[name="medico"]'); // agrege name en el html, solo tenia id
    select.innerHTML = `<option value="">Seleccione un médico</option>`;

    lista.forEach(med => {
        const opt = document.createElement("option");
        opt.value = med.nombre;
        opt.textContent = med.nombre;
        select.appendChild(opt);
    });
}

cargarSelectMedicos();
async function cargarDias() {
    let diasMedico = document.getElementById('medico').value;
    let lista = document.getElementById('dia');
    lista.innerHTML = '';
    let datos = await cargarMedicos();
    for (let n of datos) {
        if (n.nombre == diasMedico) {
            alert('encontrado')
            for (let d of n.diasDisponibles) {
                let optDia = document.createElement('option')
                optDia.innerHTML = `
                <option value="" >${d.dia}</option>
                `;
                lista.append(optDia);
            }

        }
    }
}

let optMedico = document.getElementById('medico');
optMedico.addEventListener('change', cargarDias);

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



//SOLICITARTURNO
