const form = document.getElementById("formMedico");

const btnAddHorario = document.getElementById("btnAddHorario");
const btnAgregarDia = document.getElementById("btnAgregarDia");

const listaHorarios = document.getElementById("listaHorarios");
const listaDias = document.getElementById("listaDias");

let horariosDelDia = [];  
let diasDisponibles = []; 

btnAddHorario.addEventListener("click", () => {
    const hora = document.getElementById("hora").value;

    if (!hora) {
        alert("Elegí un horario");
        return;
    }

    if (!horariosDelDia.includes(hora)) {
        horariosDelDia.push(hora);
    }

    renderHorarios();
});

function renderHorarios() {
    listaHorarios.innerHTML = "";
    horariosDelDia.forEach(h => {
        const li = document.createElement("li");
        li.textContent = h;
        listaHorarios.appendChild(li);
    });
}

btnAgregarDia.addEventListener("click", () => {
    const dia = document.getElementById("dia").value;

    if (horariosDelDia.length === 0) {
        alert("Agregá al menos un horario");
        return;
    }

    diasDisponibles.push({
        dia,
        horarios: [...horariosDelDia]
    });

    horariosDelDia = []; 
    renderHorarios();
    renderDias();
});

function renderDias() {
    listaDias.innerHTML = "";

    diasDisponibles.forEach(d => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${d.dia}:</strong> ${d.horarios.join(", ")}`;
        listaDias.appendChild(li);
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const especialidad = document.getElementById("especialidad").value;

    const nuevoMedico = {
        nombre,
        apellido,
        especialidad,
        diasDisponibles
    };

    try {
        const resp = await fetch("https://6913e692f34a2ff1170d7f79.mockapi.io/api/doctor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoMedico)
        });

        if (!resp.ok) throw new Error("Error al crear medico");

        alert("Medico registrado con exito");
        location.reload();

    } catch (error) {
        console.error(error);
        alert("Error al registrar medico");
    }
});