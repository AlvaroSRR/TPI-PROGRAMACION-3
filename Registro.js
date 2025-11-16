//Registro Nuevo Usuario

const form = document.getElementById("formRegistro");

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // crear objeto para la api
    const nuevoUsuario = {
        nombre: nombre,
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


