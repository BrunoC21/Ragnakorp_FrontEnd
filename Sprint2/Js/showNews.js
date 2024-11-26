window.onload = function () {
    obtenerNoticias();
};

let noticias = []; // Variable global para almacenar las noticias

let obtenerNoticias = async () => {
    const peticion = await fetch("http://localhost:8080/proyecto/news/search", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    noticias = await peticion.json(); // Guarda las noticias en la variable global
    generarOpcionesFiltro(); // Genera dinámicamente las opciones del filtro
    renderizarTabla("todos"); // Inicializa la tabla mostrando todas las noticias
};

let renderizarTabla = (filtroCategoria) => {
    let contenidoTabla = "";

    // Filtrar las noticias si se selecciona una categoría específica
    const noticiasFiltradas = filtroCategoria === "todos" 
        ? noticias 
        : noticias.filter(noticia => noticia.newsCategory.toLowerCase() === filtroCategoria.toLowerCase());

    for (let noticia of noticiasFiltradas) {
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

let generarOpcionesFiltro = () => {
    const categoriasUnicas = [...new Set(noticias.map(noticia => noticia.newsCategory))];
    const filtroCategoria = document.querySelector("#filtro-categoria");

    // Agregar la opción "Todos" por defecto
    filtroCategoria.innerHTML = '<option value="todos">Todos</option>';

    // Crear opciones dinámicas basadas en las categorías únicas
    categoriasUnicas.forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria;
        option.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1); // Capitaliza
        filtroCategoria.appendChild(option);
    });

    // Configura el evento "change" para filtrar las noticias
    filtroCategoria.addEventListener("change", () => {
        const categoriaSeleccionada = filtroCategoria.value;
        renderizarTabla(categoriaSeleccionada);
    });
};

