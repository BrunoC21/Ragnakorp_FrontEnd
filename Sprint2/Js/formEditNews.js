window.onload = function () {
    recuperarNoticia();
};


function recuperarNoticia() {
    const noticia = JSON.parse(localStorage.getItem("noticiaEdit"));
    console.log("Noticia recuperada:", noticia);

    if (noticia) {
        // Rellenar los campos
        document.getElementById("titulo").value = noticia.newsTitle;
        document.getElementById("autor").value = noticia.newsWriter;
        document.getElementById("categoria").value = noticia.newsCategory;
        document.getElementById("contenido").value = noticia.newsContent;

        if (noticia.newsImage) {
            document
                .getElementById("imagen")
                .insertAdjacentHTML('afterend', `<p>Imagen actual: ${noticia.newsImage}</p>`);
        }
    } else {
        console.error("No hay datos en localStorage.");
    }
}

