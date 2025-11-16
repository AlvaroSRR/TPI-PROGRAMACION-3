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


// METODOS NAVEGABILIDAD

// main
function cerrarSesion(){
    window.location.href= '/main.html';
}

function registrarUsuario() {
    window.location.href = '/NuevoRegistro.html'
}

//usuario
function verPerfil(){
    window.location.href= '/Usuario/PerfilUsuario.html';
}

function solicitarTurno(){
    window.location.href= '/Usuario/SolicitarTurno.html';
}

function consultarTurno(){
    window.location.href= '/Usuario/ConsultarTurno.html';
}

function menuUsuario(){
    window.location.href= '/Usuario/MenuPaciente.html';
}

//admin
function menuADM(){
    window.location.href='/Admin/MenuAdmin.html';
}

function gestionMedicos(){
    window.location.href='/Admin/GestionMedicos.html';
}
function gestionUsuarios(){
    window.location.href='/Admin/ActualizarBajaUsuario.html';
}
function gestionTurnos(){
    window.location.href='/Admin/GestionTurnos.html';
}
function volverMenuMedicosADM(){
    window.location.href='/Admin/GestionMedicos.html';
}
function volverMenuUsuarioADM(){
    window.location.href='/Admin/GestionUsuarios.html';
}

// EVENTOS CLICK NAVEGABILIDAD


// Main  
const btnLogin = document.getElementById('btnIniciarSesion');
btnLogin.addEventListener('click', cargarMenu);

const btnRegistrarse = document.getElementById('btnRegistrarse');
btnRegistrarse.addEventListener('click', registrarUsuario);

// general
const btnCerrarSesionUsuario = document.getElementById('btnCerrarSesion');
btnCerrarSesionUsuario.addEventListener('click',cerrarSesion)

// // Usuario
const btnVerPerfilUsuario = document.getElementById('btnVerPerfil');
btnVerPerfilUsuario.addEventListener('click',verPerfil);

const btnSolicitarTurnoUsuario = document.getElementById('btnSolicitarTurno');
btnSolicitarTurnoUsuario.addEventListener('click',solicitarTurno);

const btnConsultarTurnoUsuario = document.getElementById('btnVerTurno');
btnConsultarTurnoUsuario.addEventListener('click',consultarTurno);

const btnVolverMenuUsuario = document.getElementById('btnVolverMenuUsuario')
btnVolverMenuUsuario.addEventListener('click', menuUsuario);


// Admin
//menuADM
const btnGestionarMedicosADM = document.getElementById('btnGestionarMedicos');
btnGestionarMedicosADM.addEventListener('click',gestionMedicos);
const btnGestionarUsuariosADM = document.getElementById('btnGestionarUsuarios');
btnGestionarUsuariosADM.addEventListener('click',gestionUsuarios);
const btnGestionarTurnosADM = document.getElementById('btnGestionarTurnos');
btnGestionarTurnosADM.addEventListener('click',gestionTurnos);
//volver
const btnVolverGestionarMedicios = document.getElementById('btnVolverGestionMedicosADM');
btnVolverGestionarMedicios.addEventListener('click',volverMenuMedicosADM);
const btnVolverGestionarUsuarios = document.getElementById('btnVolverMenuUsuariosADM');
btnVolverGestionarUsuarios.addEventListener('click',volverMenuUsuarioADM);
const btnVolverMenuADM = document.getElementById('btnVolverMenuADM');
btnVolverMenuADM.addEventListener('click',menuADM);
//gestion Usuarios
const btnAltaUsuario = document.getElementById('btnAltaUsuario');
btnAltaUsuario.addEventListener();
const btnActualizarUsuario = document.getElementById('btnActualizarUsuario');
//gestion Medicos