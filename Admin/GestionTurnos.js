
async function cancelar(dato) {
    let id = dato;
    const estadoConfirmado = {
        estado: "Cancelado",
        hora: "--:--"
    }

    const respuesta = await fetch(`https://690b51d26ad3beba00f4675b.mockapi.io/api/appointments/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(estadoConfirmado),
    });
    if (!respuesta.ok) {
        alert('Falla al Actualizar')
    }
    location.reload();
    //cargarCitas();
}

async function confirmar(dato) {
    let id = dato;
    let nuevoHorario = await horario(dato);
    //alert(nuevoHorario)
    if (nuevoHorario === "cancelar") {
        alert("No hay Turnos disponibles, el Turno se Cancelara");
        cancelar(dato);

    } else {
        const estadoConfirmado = {
            estado: "Confirmado",
            hora: nuevoHorario
        }

        const respuesta = await fetch(`https://690b51d26ad3beba00f4675b.mockapi.io/api/appointments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(estadoConfirmado),
        });
        if (!respuesta.ok) {
            alert('Falla al Actualizar')
        }
        let btnConfirmar = document.getElementById(`confirmar${id}`);
        btnConfirmar.hidden = true;
        location.reload();

    }
    //cargarCitas();
}

//////////PRUEBA HORA/////////////
function calcularHora(i) {
    let horario = ["08:00 hs", "09:00 hs", "10:00 hs", "11:00 hs", "12:00 hs", "14:00 hs", "15:00 hs", "16:00 hs", "17:00 hs"];
    return (horario[i]);
}
async function horario(turno) {
    let dt = await fetch(`https://690b51d26ad3beba00f4675b.mockapi.io/api/appointments/${turno}`)
    let datTurno = await dt.json();
    const respuesta = await fetch('https://690b51d26ad3beba00f4675b.mockapi.io/api/appointments');
    const datos = await respuesta.json();
    let contHora = 0;
    for (let d of datos) {
        if (d.fecha == datTurno.fecha && d.doctorId == datTurno.doctorId && d.estado === "Confirmado") {
            contHora++;
        }
    }
    if (contHora <= 8) {
        let horaTurno = calcularHora(contHora);
        return horaTurno;

    } else {
        return ("cancelar");
    }

}

//////////////////////

async function cargarCitas() {

    const respuesta = await fetch('https://690b51d26ad3beba00f4675b.mockapi.io/api/appointments');
    const datos = await respuesta.json();

    const tabla = document.getElementById('tablaCitas');
    tabla.innerHTML = ""; // limpiar antes de cargar

    for (let d of datos) {
        // nombre medico
        const medicoR = await fetch(`https://6913e692f34a2ff1170d7f79.mockapi.io/api/doctor/${d.doctorId}`);
        const medicoD = await medicoR.json();
         // nombre paciente
        const pacienteR = await fetch(`https://6913e692f34a2ff1170d7f79.mockapi.io/api/doctor/${d.patientId}`);
        const pacienteD = await pacienteR.json();

        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${d.id}</td>
            <td>${d.fecha}</td>
            <td>${d.hora}</td>
            <td>${pacienteD.nombre}</td>
            <td>${medicoD.nombre}</td>
            <td>${d.estado}</td>    
            ${d.estado !== "Confirmado" && d.estado !== "Cancelado"
                ? `<button class="boton" onclick="confirmar(${d.id})" id="confirmar${d.id}">Confirmar</button>`
                : ``}
            <button class="boton" onclick="cancelar(${d.id})" id='cancelar${d.id}'>Cancelar</button>
        `;
        tabla.appendChild(fila);
    }

    let grafico;

    function generarDashboard(datos) {
        let confirmados = 0;
        let cancelados = 0;
        let pendientes = 0;

        datos.forEach(d => {
            if (d.estado === "Confirmado") confirmados++;
            else if (d.estado === "Cancelado") cancelados++;
            else pendientes++;
        });

        const graficot = document.getElementById('graficoEstados').getContext('2d');

        if (grafico) grafico.destroy();

        grafico = new Chart(graficot, {
            type: 'pie',
            data: {
                labels: ['Confirmado', 'Cancelado', 'Pendiente'],
                datasets: [{
                    data: [confirmados, cancelados, pendientes],
                    backgroundColor: ['#4CAF50', '#F44336', '#FFC107'],
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' },
                    title: { display: true, text: 'Distribución de Estados de Turnos' },

                }
            }
        });
    }

    generarDashboard(datos);

}


cargarCitas(); // cargar automáticamente




// Faltar agregar un filtro, para que muestre los turnos por estado/medico/paciente