function formatDate(dateString) {
    const date = new Date(dateString); // Crear un objeto Date con la fecha recibida
    const day = String(date.getDate()).padStart(2, '0'); // Obtener el día, asegurándose de que sea de 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Obtener el mes, sumando 1 ya que los meses empiezan en 0
    const year = date.getFullYear(); // Obtener el año

    return `${day}/${month}/${year}`; // Retornar la fecha en formato dd/mm/yyyy
}

window.onload = function () {
    cargarNoticia();
}

function cargarNoticia() {
    // Obtener la noticia almacenada en el localStorage
    const noticiaGuardada = localStorage.getItem("noticiaEdit");

    if (!noticiaGuardada) {
        console.error("No se encontró una noticia en el localStorage.");
        return;
    }

    // Parsear la noticia guardada
    const noticia = JSON.parse(noticiaGuardada);

    // Llenar los datos en el HTML
    document.querySelector('.titulo_proyecto').innerText = `Titulo: ${noticia.newsTitle}`;
    document.querySelector('.detalles_proyecto').innerHTML = `
        <span><strong>Numero de noticia:</strong> ${noticia.id}</span>
        <br>
        <span><strong>Autor/a:</strong> ${noticia.newsWriter}</span>
        <br>
        <span><strong>Categoria:</strong> ${noticia.newsCategory}</span>
        <br>
        <span><strong>Fecha:</strong> ${formatDate(noticia.newsDateTime)}</span>
        <br>
    `;
    document.querySelector('.contenido_proyecto').innerHTML = `<p>${noticia.newsContent}</p>`;
    document.querySelector('.imagen_proyecto').src = `http://localhost:8080/proyecto/images/${noticia.primaryImage}`;
    document.querySelector('.imagen_proyecto').alt = noticia.newsTitle;
}
