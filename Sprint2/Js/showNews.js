window.onload = function () {
    obtenerNoticias();
};

let obtenerNoticias = async () => {
    const peticion = await fetch("http://localhost:8080/proyecto/news/search", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    const noticias = await peticion.json();

    let contenidoTabla = "";
    for (let noticia of noticias) {
        contenidoTabla += `
            <tr>
                <td>${noticia.id}</td>
                <td>${noticia.newsTitle}</td>
                <td>${noticia.newsWriter}</td>
                <td>${noticia.newsCategory}</td>
                <td>${noticia.newsDateTime}</td>
                <td>
                    <button class="btnEditar" data-noticia='${JSON.stringify(noticia)}'>Editar</button>
                </td>
            </tr>
        `;
    }

    document.querySelector("#tabla tbody").innerHTML = contenidoTabla;

    // Asigna eventos a los botones "Editar"
    document.querySelectorAll(".btnEditar").forEach(button => {
        button.addEventListener("click", () => {
            const noticia = JSON.parse(button.dataset.noticia);
            localStorage.setItem("noticiaEdit", JSON.stringify(noticia));
            window.location.href = `makeNews_intranet.html?id=${noticia.id}`;
        });
    });
    
};
