// Cargar Datos Usuario
async function cargarDatos() {
    let datos = await fetch('https://6913e692f34a2ff1170d7f79.mockapi.io/api/users');
    let dato = await datos.json();
    console.log('datos cargados')
    return (dato);
}

// MENU PRINCIPAL

async function cargarMenu() {
    let inputUsuario = document.getElementById("inputUsuario").value;
    let inputPassword = document.getElementById("inputPassword").value;
    let datos = await cargarDatos();
    let estado = 0;
    for (let d of datos) {
        if (inputUsuario == d.email) {
            estado=0;
            if (inputPassword == d.password) {
                estado=0;
                if (d.role == 'admin') {
                    localStorage.setItem("lsUsuario", JSON.stringify(d));
                    return menuADM();
                } else {
                    if (d.role == "usuario") {
                        localStorage.setItem("lsUsuario", JSON.stringify(d));
                        return menuUsuario();
                    }

                }
            } else { return alert('Password Incorrecta') }
        } else { estado = 1; }
    }
    if (estado == 1) {
        alert('Usuario No Registrado')
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






