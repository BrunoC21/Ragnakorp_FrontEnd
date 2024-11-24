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
                 <td>${noticia.id}</td>
                 <td>${noticia.newsTitle}</td>
                 <td>${noticia.newsWriter}</td>
                 <td>${noticia.newsCategory}</td>
                 <td>${noticia.newsDateTime}</td>
                    <td>
                        <button id="btnEditar" data-id="${noticia.id}">Editar</button>
                    </td>
                </tr>
            `;
        }

        document.querySelector("#tabla tbody").outerHTML = contenidoTabla;
    
}

function editNews(newsId) {
    window.location.href = `makeNews_intranet.html?id=${newsId}`;
}