document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("http://localhost:8080/proyecto/news/search", {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }

        const newsList = await response.json(); // Convertir la respuesta a JSON

        // Ordenar las noticias por newsDateTime de más reciente a más antigua
        newsList.sort((a, b) => new Date(b.newsDateTime) - new Date(a.newsDateTime));

        // **Últimas 2 noticias destacadas**
        const latestNoticiasDestacadas = newsList.slice(0, 2);

        const noticiasDestacadasContainer = document.querySelector(".cont_destacadas");
        if (!noticiasDestacadasContainer) {
            throw new Error("Contenedor de noticias destacadas no encontrado en el DOM.");
        }

        const destacadasContent = noticiasDestacadasContainer.querySelectorAll(".destacada");
        if (!destacadasContent.length) {
            throw new Error("Elementos '.destacada' no encontrados en el DOM.");
        }

        destacadasContent.forEach((destacada, index) => {
            if (index < latestNoticiasDestacadas.length) {
                const news = latestNoticiasDestacadas[index];
                const noticiasExtras = `
                    <a href="./noticia.html?id=${news.id}"><img src="http://localhost:8080/proyecto/images/${news.primaryImage}" alt="${news.newsTitle}"></a>
                    <div class="text">
                        <h4>${news.newsTitle}</h4>
                        <h5>${news.newsWriter}</h5>
                        <p class="truncate">${truncateText(news.newsContent, 150)}</p> <!-- Muestra solo los primeros 150 caracteres -->
                    </div>
                `;
                destacada.innerHTML = noticiasExtras;
            }
        });

        // **Últimas 6 noticias**
        const latestNoticias = newsList.slice(0, 6);

        // Seleccionar contenedores de noticias
        const primeraLinea = document.querySelector(".primera_linea_noticias");
        const segundaLinea = document.querySelector(".segunda_linea_noticias");

        if (!primeraLinea || !segundaLinea) {
            throw new Error("Contenedores de noticias no encontrados en el DOM.");
        }

        // Limpiar contenido previo
        primeraLinea.innerHTML = "";
        segundaLinea.innerHTML = "";

        // Mostrar noticias en las dos líneas
        latestNoticias.forEach((news, index) => {
            const noticiaHTML = `
                <div class="noticias">
                    <a href="./noticia.html?id=${news.id}">
                        <img src="http://localhost:8080/proyecto/images/${news.primaryImage}" alt="${news.newsTitle}" />
                        <h4>${news.newsTitle}</h4>
                        <h5>${news.newsWriter}</h5>
                    </a>
                </div>
            `;

            if (index < 3) {
                // Primeras tres noticias en la primera línea
                primeraLinea.insertAdjacentHTML("beforeend", noticiaHTML);
            } else {
                // Siguientes tres noticias en la segunda línea
                segundaLinea.insertAdjacentHTML("beforeend", noticiaHTML);
            }
        });

        // **Noticias para el carrusel** (3 a 5)
        const sliderNews = newsList.slice(2, 5);

        const sliderList = document.querySelector(".splide__list");
        sliderNews.forEach((news) => {
            const slideHTML = `
            <li class="splide__slide" style="background-color: transparent;">
                <a href="./noticia.html?id=${news.id}"><img src="http://localhost:8080/proyecto/images/${news.primaryImage}" alt="${news.newsTitle}"></a>
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
            pagination: false, // Oculta la paginación
            arrows: true, // Activa las flechas de navegación
            breakpoints: {
                768: {
                    perPage: 1, // En pantallas pequeñas, muestra 1 elemento
                },
                1024: {
                    perPage: 1, // En pantallas medianas, muestra 2 elementos
                },
            },
        }).mount();

    } catch (error) {
        console.error("Error al cargar las noticias:", error);
        console.log("Error al cargar las noticias. Por favor, intenta nuevamente.");
    }
});

// Función para truncar texto y agregar puntos suspensivos
const truncateText = (text, length) => {
    if (text.length > length) {
        return text.substring(0, length) + '...'; // Recorta el texto y agrega "..."
    }
    return text; // Si el texto es más corto que el límite, retorna el texto completo
};
