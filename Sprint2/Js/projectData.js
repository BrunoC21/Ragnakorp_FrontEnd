window.onload = function() {
    const sessionData = JSON.parse(localStorage.getItem("sessionData"));

        
    // Ocultar el botón de "Agregar" si el usuario es estudiante
    if (sessionData.role === "ESTUDIANTE") {
        document.getElementById("agregar").style.display = "none";
    }

    if (sessionData.role === "ADMIN" || sessionData.role === "ADMINISTRATIVE") {
        document.getElementById("btnPostular").style.display = "none";
    }

    listarProyectos();
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

        const proyectos = await peticion.json();

        let contenidoTabla = "";
        for (let proyecto of proyectos) {
            contenidoTabla += `
                <tr>
                    <td>${proyecto.projName}</td>
                    <td>${proyecto.projDescription}</td>
                    <td>${proyecto.projStartDate}</td>
                    <td>${proyecto.projRequirementsPostulation}</td>
                    <td>
                        <button class="btnEditar" data-noticia='${JSON.stringify(proyecto)}'>Editar</button>
                    </td>
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