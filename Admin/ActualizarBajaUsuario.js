async function buscarUsuario() {
    const respuesta = await fetch('https://6913e692f34a2ff1170d7f79.mockapi.io/api/users');
    const dato = await respuesta.json();
    const email = document.getElementById('inputEmail').value;
    for (let e of dato) {
        if (e.email === email) {
            mostrarDatos(e);
        }
    }
}

function mostrarDatos(datos) {
    let s = document.getElementById('resultados');
    s.hidden = false;
    let idUsuario = document.getElementById('id');
    idUsuario.value = datos.id;
    let nombre = document.getElementById('nombre');
    nombre.value = datos.nombre;
    let apellido = document.getElementById('apellido');
    apellido.value = datos.apellido;
    let telefono = document.getElementById('telefono');
    telefono.value = datos.telefono;
    let email = document.getElementById('email');
    email.value = datos.email;
    let rol = document.getElementById('rol');
    rol.value = datos.role;
    let password = document.getElementById('password');
    password.value = datos.password;
}

async function actualizarDatos() {
    let id = document.getElementById('id').value;
    const datosNuevos = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        telefono: document.getElementById('telefono').value,
        password: document.getElementById('password').value,
        role: document.getElementById('rol').value
    }

    alert(id)
    const respuesta = await fetch(`https://6913e692f34a2ff1170d7f79.mockapi.io/api/users/${id}`, {
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
    buscarUsuario();

}

async function eliminar() {

    const confirmacion = prompt("Escribí SI para confirmar la eliminación:");

    if (confirmacion && confirmacion.toLowerCase() === "si") {
        let idEliminar = document.getElementById('id').value;
        const respuesta = await fetch(`https://6913e692f34a2ff1170d7f79.mockapi.io/api/users/${idEliminar}`, {
            method: 'DELETE'
        });
        if (!respuesta.ok) {
            alert('Falla al Eliminar')
        }
        alert('Eliminado Correctamente');
        buscarUsuario();
    } else {
        alert("Acción cancelada");
    }

}
const btnBuscar = document.getElementById('btnBuscar');
btnBuscar.addEventListener('click', buscarUsuario);

const btnActualizar = document.getElementById('guardar');
btnActualizar.addEventListener('click', actualizarDatos)

const btnEliminar = document.getElementById('eliminar');
btnEliminar.addEventListener('click', eliminar);