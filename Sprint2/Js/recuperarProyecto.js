window.onload = function () {
    // Recuperar información del proyecto desde el localStorage
    const proyecto = JSON.parse(localStorage.getItem("proyectoEdit"));

    // Verificar si el proyecto existe en localStorage
    if (proyecto) {
        // Asignar información a los elementos HTML
        document.querySelector(".titulo_proyecto").textContent = `Titulo: ${proyecto.projName}`;
        document.querySelector(".detalles_proyecto").innerHTML = `
            <span><strong>Fecha de inicio:</strong> ${proyecto.projStartDate}</span><br>
            <span><strong>Requerimientos:</strong> ${proyecto.projRequirementsPostulation}</span><br>
            <span><strong>Categoría:</strong> ${proyecto.projCategory}</span><br>
        `;
        document.querySelector(".contenido_proyecto").textContent = proyecto.projDescription;
        document.querySelector(".imagen_proyecto").src = `http://localhost:8080/proyecto/images/${proyecto.projPicture}`;
        document.querySelector(".imagen_proyecto").alt = `Imagen del proyecto ${proyecto.projName}`;
    } else {
        // Mostrar mensaje si no se encuentra el proyecto
        document.querySelector(".container").innerHTML = "<p>No se encontró información del proyecto.</p>";
    }
};
