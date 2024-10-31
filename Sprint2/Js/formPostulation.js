window.onload = function() {
    inicializarPagina();
}

let inicializarPagina = async () => {
    // Cargar los proyectos en el desplegable
    await listarProyectos();

    // Configurar el evento para el botón de postulación
    let boton = document.getElementById("botonPostular");
    boton.addEventListener("click", evento => {
        evento.preventDefault(); // Previene el envío del formulario
        registrarPostulacion();
    });
}

let listarProyectos = async () => {
    try {
        const peticion = await fetch("http://localhost:8080/proyecto/project/search", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        const proyectos = await peticion.json();
        const selectProyecto = document.getElementById("proyecto");

        // Limpiar las opciones actuales y agregar la opción predeterminada
        selectProyecto.innerHTML = '<option value="">Seleccione un proyecto</option>';

        // Agregar las opciones obtenidas de la respuesta
        proyectos.forEach(proyecto => {
            const option = document.createElement("option");
            option.value = proyecto.projName;
            option.textContent = proyecto.projName;
            selectProyecto.appendChild(option);
        });

    } catch (error) {
        console.error("Error al listar proyectos: ", error);
    }
}

let registrarPostulacion = async () => {
    let campos = {
        postulationName: document.getElementById("nombre").value,
        postulationDescription: document.getElementById("motivo").value,
        postulationProject: document.getElementById("proyecto").value,
        postulationRut: document.getElementById("rut").value
    };

    try {
        const peticion = await fetch("http://localhost:8080/proyecto/postulation/create", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campos)
        });

        if (peticion.ok) {
            window.location.href = '../Html/home_intranet.html';
        } else {
            const errorMsg = await peticion.text();
            alert("Error al registrar la postulación: " + errorMsg);
        }

    } catch (error) {
        console.error("Error al registrar la solicitud: ", error);
        alert("Error al registrar la postulación, por favor intente nuevamente");
    }
};