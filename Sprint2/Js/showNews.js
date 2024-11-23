window.onload = function() {
    obtenerNoticias();
}


let obtenerNoticias = async ()=>{
    const peticion = await fetch("http://localhost:8080/proyecto/news/search",
        {
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
                    <td>${noticia.newsTitle}</td>
                    <td>${noticia.newsWriter}</td>
                    <td>${noticia.newsCategory}</td>
                    <td>${noticia.newsDateTime}</td>
                </tr>
            `;
        }

        document.querySelector("#tabla tbody").outerHTML = contenidoTabla;
}