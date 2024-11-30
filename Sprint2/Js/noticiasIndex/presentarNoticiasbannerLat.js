document.addEventListener("DOMContentLoaded", async () => {
    try {
      // Realizar la solicitud GET al servidor
      const response = await fetch("http://localhost:8080/proyecto/news/search", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
  
      if (response.ok) {
        const newsList = await response.json(); // Convertir la respuesta a JSON
  
        // Ordenar las noticias por newsDateTime de más reciente a más antigua
        newsList.sort((a, b) => new Date(b.newsDateTime) - new Date(a.newsDateTime));
  
        // Seleccionar las últimas 2 noticias
        const latestNews = newsList.slice(0, 2);
  
        // Contenedor donde se mostrarán las noticias
        const noticiasExtras = document.querySelector(".cont_noticias_extras");
        noticiasExtras.innerHTML = ""; // Limpiar contenido previo
  
        // Recorrer las noticias limitadas y construir el HTML para cada una
        latestNews.forEach((news) => {
          const noticiaHTML = `
            <a href="">
              <div class="noticia_extra">
                <img src="http://localhost:8080/proyecto/images/${news.primaryImage}" >
                <h2><span>${news.newsTitle}</span></h2>
              </div>
            </a>
          `;
  
          // Agregar el contenido al contenedor
          noticiasExtras.insertAdjacentHTML("beforeend", noticiaHTML);
        });

        latestNews = newsList.slice(3, 5);
        
      } else {
        alert("No se encontraron noticias.");
      }
    } catch (error) {
      console.error("Error al cargar las noticias:", error);
      alert("Error al cargar las noticias. Por favor, intenta nuevamente.");
    }
  });
  