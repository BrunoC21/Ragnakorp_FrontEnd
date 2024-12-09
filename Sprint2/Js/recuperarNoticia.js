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
    document.querySelector('.titulo_noticia').innerText = `Titulo: ${noticia.newsTitle}`;
    document.querySelector('.detalles_noticia').innerHTML = `
        <span><strong>Numero de noticia:</strong> ${noticia.id}</span>
        <span><strong>Autor/a:</strong> ${noticia.newsWriter}</span>
        <span><strong>Categoria:</strong> ${noticia.newsCategory}</span>
        <span><strong>Fecha:</strong> ${formatDate(noticia.newsDateTime)}</span>
    `;
    document.querySelector('.contenido_noticia').innerHTML = `<p>${noticia.newsContent}</p>`;
    const img = document.querySelector('.imagen_noticia');
    img.src = `http://localhost:8080/proyecto/images/${noticia.primaryImage}`;
    img.alt = noticia.newsTitle;
}
