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


//Registro Nuevo Usuario

const form = document.getElementById("formRegistro");

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // crear objeto para la api
    const nuevoUsuario = {
        name: nombre,
        email: email,
        password: password,
    };

    // enviar datos a la api
    try {
        const respuesta = await fetch('https://6913e692f34a2ff1170d7f79.mockapi.io/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoUsuario),
        });

        if (!respuesta.ok) {
            throw new Error('Error al registrar el usuario');
        }

        const datos = await respuesta.json();
        console.log('Usuario registrado:', datos);
        alert('Usuario registrado con éxito');
        form.reset();

    } catch (error) {
        console.error("Hubo un error:", error);
        alert("Error registrando usuario");
    }
});



