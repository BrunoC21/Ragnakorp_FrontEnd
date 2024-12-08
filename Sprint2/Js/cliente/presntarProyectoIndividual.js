function formatDate(dateString) {
    const date = new Date(dateString); // Crear un objeto Date con la fecha recibida
    const day = String(date.getDate()).padStart(2, '0'); // Obtener el día, asegurándose de que sea de 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Obtener el mes, sumando 1 ya que los meses empiezan en 0
    const year = date.getFullYear(); // Obtener el año

    return `${day}/${month}/${year}`; // Retornar la fecha en formato dd/mm/yyyy
}

window.onload = function () {
    recuperarNoticia();
}

async function recuperarNoticia() {
    // Obtener el parámetro 'id' de la URL
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    // Verificar que se haya obtenido un ID válido
    if (!projectId) {
        console.error("No se proporcionó un ID válido en la URL.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/proyecto/project/search/${projectId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }

        const project = await response.json(); // Convertir la respuesta a JSON

        // Llenar los datos en el HTML
        document.querySelector('.news-title').innerText = project.projName;
        document.querySelector('.news-meta').innerHTML = `
            <span><strong>Fecha: </strong>${project.projStartDate}</span>
        `;
        document.querySelector('.news-image').src = `http://localhost:8080/proyecto/images/${project.projPicture}`;
        document.querySelector('.news-image').alt = project.projName;
        document.querySelector('.news-content').innerHTML = `<p>${project.projDescription}</p>
        `;

    } catch (error) {
        console.error("Error al cargar la noticia:", error);
    }
}
