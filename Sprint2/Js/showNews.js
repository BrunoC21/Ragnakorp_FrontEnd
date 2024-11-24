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
                    <td><button class ="edit-btn" onclick= "editNews(${noticia.id})">Editar</button>
                    </td>
                </tr>
            `;
        }

        document.querySelector("#tabla tbody").outerHTML = contenidoTabla;
    
}

function editNews(newsId) {
    window.location.href = `makeNews_intranet.html?id=${newsId}`;
}

// // Función para obtener las noticias del servidor
// const obtenerNoticias = async () => {
//   try {
//     const respuesta = await fetch("http://localhost:8080/proyecto/news/list");
//     if (respuesta.ok) {
//       const noticias = await respuesta.json();
//       llenarTabla(noticias);
//     } else {
//       console.error("Error al obtener las noticias:", await respuesta.text());
//     }
//   } catch (error) {
//     console.error("Error de conexión al obtener las noticias:", error);
//   }
// };

// // Función para llenar la tabla con noticias
// const llenarTabla = (noticias) => {
//   tablaCuerpo.innerHTML = ""; // Limpia el contenido existente

//   noticias.forEach((noticia) => {
//     const fila = document.createElement("tr");

//     fila.innerHTML = `
//             <td>${noticia.newsTitle}</td>
//             <td>${noticia.newsContent}</td>
//             <td>${noticia.newsWriter}</td>
//             <td><img src="${noticia.primaryImage}" alt="${noticia.newsTitle}" style="max-width: 100px; max-height: 100px;"></td>
//             <td>${noticia.newsCategory}</td>
//         `;

//     tablaCuerpo.appendChild(fila);
//   });
// };

// // Cargar las noticias al abrir la página
// obtenerNoticias();