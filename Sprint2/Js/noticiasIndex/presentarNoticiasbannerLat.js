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
  
        // **Últimas 2 noticias** (noticias extras)
        const latestNewsExtras = newsList.slice(0, 2);
  
        const noticiasExtras = document.querySelector(".cont_noticias_extras");
        noticiasExtras.innerHTML = ""; // Limpiar contenido previo
  
        latestNewsExtras.forEach((news) => {
          const noticiaHTML = `
            <a href="#">
              <div class="noticia_extra">
                <img src="http://localhost:8080/proyecto/images/${news.primaryImage}" alt="${news.newsTitle}">
                <h2><span>${news.newsTitle}</span></h2>
              </div>
            </a>
          `;
          noticiasExtras.insertAdjacentHTML("beforeend", noticiaHTML);
        });
  
        // **Noticias para el carrusel** (3 a 5)
        const sliderNews = newsList.slice(2, 5);
  
        const sliderList = document.querySelector(".splide__list");
        // Agregar noticias al carrusel
        sliderNews.forEach((news) => {
            const slideHTML = `
            <li class="splide__slide" style="background-color: transparent;">
                <img src="http://localhost:8080/proyecto/images/${news.primaryImage}" alt="${news.newsTitle}">
                <h3><span>${news.newsTitle}</span></h3>
            </li>
            `;
            sliderList.insertAdjacentHTML("beforeend", slideHTML);
        });

        new Splide(".splide", {
            type: "loop",
            autoplay: true,
            interval: 3000, // Intervalo para autoplay
            perPage: 1, // Muestra 3 elementos por página
            gap: "1rem", // Espaciado entre elementos
            focus: "center", // Centra los elementos activos
            pagination: true, // Oculta la paginación
            arrows: true, // Activa las flechas de navegación
            breakpoints: {
                768: {
                    perPage: 1, // En pantallas pequeñas, muestra 1 elemento
                },
                1024: {
                    perPage: 2, // En pantallas medianas, muestra 2 elementos
                },
            },
        }).mount();
        
  
      } else {
        alert("No se encontraron noticias.");
      }
    } catch (error) {
      console.error("Error al cargar las noticias:", error);
      alert("Error al cargar las noticias. Por favor, intenta nuevamente.");
    }
  });
  