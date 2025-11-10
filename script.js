function cargarMenu() {
    // conexion api datos usuarios
    let inputUsuario = document.getElementById("usuario").value;
    let inputPassword = document.getElementById("password").value;
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

const btnLogin = document.getElementById('login');
btnLogin.addEventListener('click', cargarMenu);

