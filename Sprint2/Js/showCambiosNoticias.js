window.onload = function () {
    obtenerCambios();
};

let cambios = [];

let obtenerCambios = async () => {
    try {
        const peticion = await fetch('http://localhost:8080/proyecto/changes/search/News', {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        if (!peticion.ok) {
            throw new Error(`HTTP error! status: ${peticion.status}`);
        }

        cambios = await peticion.json();

        let contenidoTabla = "";

        // Iterar sobre los cambios
        for (let cambio of cambios) {
            // Obtener el título de la noticia utilizando el ID de la noticia
            let newsTitle = await obtenerTituloNoticia(cambio.changesThing);

            // Obtener el nombre y apellido del usuario
            let nombreUsuario = `${cambio.changeIdUser.userName} ${cambio.changeIdUser.userLastName}`;

            // Formatear la fecha
            let fechaFormateada = formatearFecha(cambio.changesDate);

            contenidoTabla += `
                <tr>
                    <td>Actualización</td>
                    <td>${nombreUsuario}</td>
                    <td>${fechaFormateada}</td>
                    <td>${newsTitle}</td>
                </tr>
            `;
        }

        // Insertar la tabla con los datos recuperados
        document.querySelector(".tabla tbody").innerHTML = contenidoTabla;

    } catch (error) {
        console.error("Error al obtener los cambios:", error);
    }
};

// Función para obtener el título de la noticia
async function obtenerTituloNoticia(newsId) {
    try {
        const peticion = await fetch(`http://localhost:8080/proyecto/news/search/${newsId}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        if (!peticion.ok) {
            throw new Error(`HTTP error! status: ${peticion.status}`);
        }

        const noticia = await peticion.json();
        return noticia.newsTitle;  // Suponiendo que la noticia tiene un atributo `newsTitle`
    } catch (error) {
        console.error("Error al obtener la noticia:", error);
        return "Título no encontrado";  // Valor por defecto si ocurre un error
    }
}

// Función para formatear la fecha
function formatearFecha(fecha) {
    let fechaObj = new Date(fecha);
    let dia = String(fechaObj.getDate()).padStart(2, '0');
    let mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
    let anio = fechaObj.getFullYear();
    return `${dia}/${mes}/${anio}`;
}
