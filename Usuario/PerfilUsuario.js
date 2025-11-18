async function cargarPerfil() {
    const usuarioLS = JSON.parse(localStorage.getItem("lsUsuario"));
    let lsId = usuarioLS.id;
    let usuario = await fetch(`https://6913e692f34a2ff1170d7f79.mockapi.io/api/users/${lsId}`);
    const datoUsuario = await usuario.json();
    
    console.log(datoUsuario);
    const nombre = document.getElementById('nombre');
    nombre.value = datoUsuario.nombre;
    const apellido = document.getElementById('apellido');
    apellido.value = datoUsuario.apellido;
    const telefono = document.getElementById('telefono');
    telefono.value = datoUsuario.telefono;
    const email = document.getElementById('email');
    email.value = datoUsuario.email;
    const password = document.getElementById('password');
    password.value = datoUsuario.password;
    let estadoInput = document.getElementsByClassName('datoPerfil');
    for (let e of estadoInput) {
        e.disabled = true;
    }
}

function modificarEstado() {
    let estadoInput = document.getElementsByClassName('datoPerfil');
    for (let e of estadoInput) {
        e.disabled = false;
    }
    let btnActualizar = document.getElementById('guardar');
    btnActualizar.disabled = false;
}
async function actualizarDatos() {
    let datos = JSON.parse(localStorage.getItem('lsUsuario'));
    let id = datos.id;
    const datosNuevos = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        telefono: document.getElementById('telefono').value,
        password: document.getElementById('password').value,
    }
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
    alert('Actualizado Correctamente, relogee');
    location.reload();

}

const btnModificar = document.getElementById('modificar');
btnModificar.addEventListener('click', modificarEstado)

const btnGuardar = document.getElementById('guardar');
btnGuardar.addEventListener('click', actualizarDatos);
cargarPerfil();