window.onload = function () {
    recuperarVinculacion();
};

function recuperarVinculacion() {
    const vinculacion = JSON.parse(localStorage.getItem("vinculacionEdit"));
    console.log("Vinculacion recuperada:", vinculacion);

    if (vinculacion) {
        document.getElementById("titulo").value = vinculacion.activityName;
        document.getElementById("descripcion").value = vinculacion.activityDescription;
    } else {
        console.log("No hay datos en localStorage");
    }
}

document.getElementById('update').addEventListener('click', async function (event) {
    event.preventDefault(); // Evitar la recarga de la página
  
    // Recuperar los datos de la sesión del Local Storage
    const sessionData = JSON.parse(localStorage.getItem("sessionData"));
    if (!sessionData) {
        alert("No hay datos de sesión disponibles. Por favor, inicie sesión nuevamente.");
        return;
    }

    // Recuperar la vinculacion desde el Local Storage
    const vinculacion = JSON.parse(localStorage.getItem("vinculacionEdit"));
    const vinculationUser = vinculacion ? vinculacion.user : null;

    if (!vinculacion || !vinculationUser) {
        alert("No se pudo obtener la información de la vinculación o del usuario. Intenta nuevamente.");
        return;
    }

    // Crear el objeto con los datos del formulario y los datos de sesión
    const payload = {
        vinculation: {
            id: vinculacion.id,
            activityName: document.getElementById("titulo").value,
            activityDescription: document.getElementById("descripcion").value,
            user: vinculationUser, // Usuario recuperado directamente del localStorage
        },
        sessionData: sessionData, // Agregar los datos de la sesión
    };

    try {
        // Enviar los datos al servidor para actualizar la vinculación
        const respuesta = await fetch("http://localhost:8080/proyecto/environmentVinculation/update", 
        {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload), // Enviar el payload con los datos
        });

        if (respuesta.ok) {
            alert("Vinculación actualizada exitosamente.");
            // Eliminar el localStorage con el nombre "vinculacionEdit"
            localStorage.removeItem("vinculacionEdit");
            // Redirigir o limpiar el formulario si es necesario
            window.location.href = "/Sprint2/Html/intranet/vinculaciones_intranet.html";
        } else {
            const errorMsg = await respuesta.text();
            alert("Error al actualizar la vinculación: " + errorMsg);
        }
    } catch (error) {
        console.error("Error al enviar la vinculación:", error);
        alert("Error al conectar con el servidor. Intenta nuevamente.");
    }
});
