async function cargarDashboard() {
    const res = await fetch("https://6913e692f34a2ff1170d7f79.mockapi.io/api/doctor");
    const medicos = await res.json();

    const dashboard = document.getElementById("dashboardMedicos");
    dashboard.innerHTML = "";

    // --- Render tarjetas ---
    medicos.forEach(m => {
        const div = document.createElement("div");
        div.classList.add("medico-card");
        div.innerHTML = `
            <h3>${m.nombre} ${m.apellido}</h3>
            <p>Especialidad: ${m.especialidad}</p>
            <p>Días disponibles: ${m.diasDisponibles.map(d => d.dia).join(", ")}</p>
        `;
        dashboard.appendChild(div);
    });

    // --- Gráfico de barras: Médicos por especialidad ---
    const especialidades = {};
    medicos.forEach(m => {
        especialidades[m.especialidad] = (especialidades[m.especialidad] || 0) + 1;
    });

    const ctx = document.getElementById("graficoEspecialidades").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(especialidades),
            datasets: [{
                label: "Cantidad de médicos",
                data: Object.values(especialidades),
                backgroundColor: "rgba(54, 162, 235, 0.7)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


