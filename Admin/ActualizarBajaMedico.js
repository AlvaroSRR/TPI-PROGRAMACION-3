async function buscarMedico() {
    const respuesta = await fetch('https://6913e692f34a2ff1170d7f79.mockapi.io/api/doctor');
    const dato = await respuesta.json();
    const dni = document.getElementById('inputEmail').value;
    for (let e of dato) {
        if (e.dni == dni) {
            mostrarDatos(e);
        }
    }
}

function mostrarDatos(datos) {
    let s = document.getElementById('resultados');
    s.hidden = false;
    let idUsuario = document.getElementById('id');
    idUsuario.value = datos.id;
    let dni = document.getElementById('dni');
    dni.value = datos.dni;
    let nombre = document.getElementById('nombre');
    nombre.value = datos.nombre;
    let apellido = document.getElementById('apellido');
    apellido.value = datos.apellido;
    let especialidad = document.getElementById('especialidad');
    especialidad.value = datos.especialidad;
    let dias = document.getElementById('dias');

    for (let i of datos.diasDisponibles) {
        let dia = document.createElement('li');
        dia.innerHTML = `DIA: ${i.dia}`;
        dias.append(dia);
    }
}

async function actualizarDatos() {
    let id = document.getElementById('id').value;
    const datosNuevos = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        especialidad: document.getElementById('especialidad').value
    }

    alert(id)
    const respuesta = await fetch(`https://6913e692f34a2ff1170d7f79.mockapi.io/api/doctor/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosNuevos),
    });
    if (!respuesta.ok) {
        alert('Falla al Actualizar')
    }
    alert('Actualizado Correctamente');
    buscarMedico();

}

async function eliminar() {

    const confirmacion = prompt("Escribí SI para confirmar la eliminación:");

    if (confirmacion && confirmacion.toLowerCase() === "si") {
        let idEliminar = document.getElementById('id').value;
        const respuesta = await fetch(`https://6913e692f34a2ff1170d7f79.mockapi.io/api/doctor/${idEliminar}`, {
            method: 'DELETE'
        });
        if (!respuesta.ok) {
            alert('Falla al Eliminar')
        }
        alert('Eliminado Correctamente');
        buscarMedico();
    } else {
        alert("Acción cancelada");
    }

}
const btnBuscar = document.getElementById('btnBuscar');
btnBuscar.addEventListener('click', buscarMedico);

const btnActualizar = document.getElementById('guardar');
btnActualizar.addEventListener('click', actualizarDatos)

const btnEliminar = document.getElementById('eliminar');
btnEliminar.addEventListener('click', eliminar);


// FALTA VER EL TEMA DE LOS HORARIOS, PARA PODER AGREGAR/QUITAR MAS DIAS Y HORARIOS