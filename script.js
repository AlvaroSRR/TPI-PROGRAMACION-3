// Cargar Datos Usuario
async function cargarDatos() {
    let datos = await fetch('https://6913e692f34a2ff1170d7f79.mockapi.io/api/users');
    let dato = await datos.json();
    console.log('datos cargados')
    return (dato);
}

// MENU PRINCIPAL

async function cargarMenu() {
    // conexion api datos usuarios
    let inputUsuario = document.getElementById("inputUsuario").value;
    let inputPassword = document.getElementById("inputPassword").value;
    // controlar que el usuario y password correspondan al administrador
    let datos = await cargarDatos();
    for (let d of datos) {
        if (inputUsuario == d.email) {
            if (inputPassword == d.password) {
                if (d.role == 'role 1') {
                    menuADM();
                } else {
                    menuUsuario();
                }
            } else {
                //alert('Password Incorrecto');
            }
        }
        else {
            //alert('Usuario no encontrado')
            // agregar control de usuario
        }
    }

}

function menuUsuario() {
    window.location.href = '/Usuario/MenuPaciente.html';
}

function menuADM() {
    window.location.href = '/Admin/MenuAdmin.html';
}

const btnLogin = document.getElementById('btnIniciarSesion');
btnLogin.addEventListener('click', cargarMenu);






