
//SOLICITARTURNO
let fechaSeleccionada = null;

const picker = flatpickr("#fecha", {
    dateFormat: "Y-m-d",
    locale: "es",
    minDate: "today",
    onChange: function (selectedDates, dateStr) {
        fechaSeleccionada = dateStr;
        console.log("Fecha elegida:", fechaSeleccionada);
    }
});

let horarioSeleccionado = null;

const horario = document.querySelectorAll('input[name="opcion"]');

horario.forEach(hora => {
    hora.addEventListener("change", () => {
        horarioSeleccionado = hora.value; 
        console.log("Horario elegido:", horarioSeleccionado);
    });
});

let medicoSeleccionado = null;

const medico = document.querySelector('select[name="medico"]');

    medico.addEventListener("change", () => {
        medicoSeleccionado = medico.value; 
        console.log("Médico elegido:", medicoSeleccionado);
    });


document.getElementById("btnGuardar").addEventListener("click", () => {
    if (!fechaSeleccionada) {
        alert("Elegí una fecha primero");
        return;
    }

    if (!horarioSeleccionado) {
        alert("Elegí un horario primero");
        return;
    }

    if (!medicoSeleccionado) {
        alert("Elegí un médico primero");
        return;
    }

    alert(`Turno confirmado para el ${fechaSeleccionada} en el horario de ${horarioSeleccionado} con el médico ${medicoSeleccionado}`);
    
});



//SOLICITARTURNO