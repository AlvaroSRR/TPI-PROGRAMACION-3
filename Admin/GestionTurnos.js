
async function cancelar(dato) {
    let id = dato;
    const estadoConfirmado = {
        estado: "Cancelado"
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
    cargarCitas();
}

async function confirmar(dato) {
    let id = dato;
    const estadoConfirmado = {
        estado: "Confirmado"
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
    cargarCitas();
}
async function cargarCitas() {
    const respuesta = await fetch('https://690b51d26ad3beba00f4675b.mockapi.io/api/appointments');
    const datos = await respuesta.json();

    const tabla = document.getElementById('tablaCitas');
    tabla.innerHTML = ""; // limpiar antes de cargar

    for (let d of datos) {

        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${d.id}</td>
            <td>${d.fecha}</td>
            <td>${d.hora}</td>
            <td>${d.patientId}</td>
            <td>${d.doctorId}</td>
            <td>${d.estado}</td>    
            ${d.estado !== "Confirmado" && d.estado !== "Cancelado"
                ? `<button class="boton" onclick="confirmar(${d.id})" id="confirmar${d.id}">Confirmar</button>`
                : `<button class="boton" disabled>${d.estado}</button>`}
            <button class="boton" onclick="cancelar(${d.id})" id='cancelar${d.id}'>Cancelar</button>
        `;
        tabla.appendChild(fila);
    }

}

cargarCitas(); // cargar automáticamente


// Faltar agregar un filtro, para que muestre los turnos por estado/medico/paciente