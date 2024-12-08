window.onload = function () {
    const sessionData = JSON.parse(localStorage.getItem("sessionData"));
    
    // Ocultar el botón de "Agregar" si el usuario es estudiante
    if (sessionData.role === "ESTUDIANTE") {
        document.getElementById("agregar").style.display = "none";
        // Ocultar columna "Editar" en encabezado
        document.querySelector("th:nth-child(7)").style.display = "none";
        // Ocultar columna "Editar" en las filas de la tabla
        let filas = document.querySelectorAll("#tabla tbody tr");
        filas.forEach(fila => {
            fila.querySelector("td:nth-child(7)").style.display = "none";
        });
    }

    const news = localStorage.getItem('noticiaEdit');
    if (news) {
        localStorage.removeItem('noticiaEdit');
    }

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

    const sessionData = JSON.parse(localStorage.getItem("sessionData"));
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
                    <button class="btnVer" data-noticia='${JSON.stringify(noticia)}'>Ver</button>
                </td>
                ${sessionData.role === "ESTUDIANTE" ? "" : `
                <td>
                    <button class="btnEditar" data-noticia='${JSON.stringify(noticia)}'>Editar</button>
                </td>
                `}
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

    document.querySelectorAll(".btnVer").forEach(button => {
        button.addEventListener("click", () => {
            const noticia = JSON.parse(button.dataset.noticia);
            localStorage.setItem("noticiaEdit", JSON.stringify(noticia));
            window.location.href = `detalles_noticias.html?id=${noticia.id}`;
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

let boton = document.getElementById("agregar");
boton.addEventListener("click", evento => {
    const noticia = JSON.parse(localStorage.getItem("noticiaEdit"));
    if (noticia) {
        localStorage.removeItem("noticiaEdit");
    }
});