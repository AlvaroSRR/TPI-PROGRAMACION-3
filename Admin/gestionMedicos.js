async function cargarCitas() {
    const respuesta = await fetch(`https://6913e692f34a2ff1170d7f79.mockapi.io/api/doctor`);
    const datos = await respuesta.json();
    const tabla = document.getElementById('tablaCitas');
    tabla.innerHTML = ""; // limpiar antes de cargar

    for (let d of datos) {
        
            const fila = document.createElement('tr');

            fila.innerHTML = `
            <td>${d.dni}</td>
            <td>${d.nombre}</td>
            <td>${d.apellido}</td>
            <td>${d.especialidad}</td>
  
        `;
            tabla.appendChild(fila);
        }

    }

cargarCitas();