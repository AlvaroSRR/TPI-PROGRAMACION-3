const form = document.getElementById("formMedico");

const btnAgregarDia = document.getElementById("btnAgregarDia");

const listaDias = document.getElementById("listaDias");

let diasDisponibles = [];

btnAgregarDia.addEventListener("click", () => {
    const dia = document.getElementById("dia").value;
    diasDisponibles.push({
        dia
    });
    limpiarDias();
});

function limpiarDias() {
    listaDias.innerHTML = "";

    diasDisponibles.forEach(d => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${d.dia}</strong>`;
        listaDias.appendChild(li);
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const dni = document.getElementById("dni").value;
    const especialidad = document.getElementById("especialidad").value;

    try {
        const controlDni = await fetch('https://6913e692f34a2ff1170d7f79.mockapi.io/api/doctor?dni=');
        const dniExistentes = await controlDni.json();

        const dniYaRegistrado = dniExistentes.some(usuarios => usuarios.dni === dni);

        if (dniYaRegistrado) {
            alert('El dni ya está registrado. Por favor, utilice otro email.');
            return;
        }

        const nuevoMedico = {
            nombre,
            apellido,
            dni,
            especialidad,
            diasDisponibles
        };

        try {
            const resp = await fetch("https://6913e692f34a2ff1170d7f79.mockapi.io/api/doctor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoMedico)
            });

            if (!resp.ok) alert("Error al crear medico");

            alert("Medico registrado con exito");
            location.reload();

        } catch (error) {
            alert("Error al registrar medico");
        }

    } catch (error) {
        alert("Error al verificar DNI");
    } 

}); 
