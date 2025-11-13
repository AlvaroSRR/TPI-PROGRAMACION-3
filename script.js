function cargarMenu() {
    // conexion api datos usuarios
    let inputUsuario = document.getElementById("inputUsuario").value;
    let inputPassword = document.getElementById("inputPassword").value;
    // controlar que el usuario y password correspondan al administrador
    if (inputUsuario == 'alvaro') {
        if (inputPassword == '123') {
            window.location.href = '/Admin/MenuAdmin.html';
        }else{
            alert('Password Incorrecto');
        }
    } 
    else {
        // agregar control de usuario
        window.location.href = "/Usuario/MenuPaciente.html";
    }

}

async function cargarDatos(){
    const datos = await fetch('https://6913e692f34a2ff1170d7f79.mockapi.io/api/users');
    let dato = await datos.json();
    console.log(dato)
}
const btnLogin = document.getElementById('inputLogin');
btnLogin.addEventListener('click', cargarMenu);

cargarDatos();