window.onload = function() {
    const sessionData = JSON.parse(localStorage.getItem("sessionData"));

        
    // Ocultar el botón de "Agregar" si el usuario es estudiante
    if (sessionData.role === "ESTUDIANTE") {
        document.getElementById("agregar").style.display = "none";
        // Ocultar columna "Edición" en encabezado
        document.querySelector("th:nth-child(6)").style.display = "none";
        // Ocultar columna "Edición" en las filas de la tabla
        let filas = document.querySelectorAll("#tabla tbody tr");
        filas.forEach(fila => {
            fila.querySelector("td:nth-child(6)").style.display = "none";
        });
    }

    if (sessionData.role === "ADMIN" || sessionData.role === "ADMINISTRATIVE") {
        document.getElementById("btnPostular").style.display = "none";
    }

    listarProyectos();
}

function truncateText(text, limit) {
    if (text.length > limit) {
        return text.substring(0, limit) + '...'; // Agregar "..." al final si excede el límite
    }
    return text;
}


let listarProyectos = async ()=>{
    const peticion = await fetch("http://localhost:8080/proyecto/project/search",
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        const sessionData = JSON.parse(localStorage.getItem("sessionData"));

        const proyectos = await peticion.json();

        let contenidoTabla = "";
        for (let proyecto of proyectos) {
                // Truncar la descripción a 200 caracteres
                const truncatedDescription = truncateText(proyecto.projDescription, 200);

            contenidoTabla += `
                <tr>
                    <td>${proyecto.projName}</td>
                    <td>${truncatedDescription}</td>
                    <td>${proyecto.projStartDate}</td>
                    <td>${proyecto.projRequirementsPostulation}</td>
                    <td>
                        <button class="btnEditar" data-noticia='${JSON.stringify(proyecto)}'>Ver</button>
                    </td>
                    ${sessionData.role === "ESTUDIANTE" ? "" : `
                    <td>
                        <button class="btnEditar" data-noticia='${JSON.stringify(proyecto)}'>Editar</button>
                    </td>
                    `}
                </tr>
            `;
        }

        document.querySelector("#tabla tbody").outerHTML = contenidoTabla;
}

// Asigna eventos a los botones "Editar"
document.querySelectorAll(".btnEditar").forEach(button => {
    button.addEventListener("click", () => {
        const proyecto = JSON.parse(button.dataset.proyecto);
        localStorage.setItem("proyectoEdit", JSON.stringify(proyecto));
        window.location.href = `make_proyect.html?id=${proyecto.id}`;
    })
})