document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("http://localhost:8080/proyecto/project/search", {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }

        const projectlist = await response.json(); // Convertir la respuesta a JSON

        const contenedorPrincipal = document.querySelector(".contenedor_principal");
        contenedorPrincipal.innerHTML = "";

        const contComponenteEmergente = document.querySelector(".cont_componente_emergente1");
        contComponenteEmergente.innerHTML = "";
        if (!contenedorPrincipal) {
            throw new Error("Contenedor de proyectos destacados no encontrado en el DOM");
        }

        // Función para recortar la descripción a 200 palabras
        const truncateDescription = (text, wordLimit = 200) => {
            const words = text.split(/\s+/);
            if (words.length > wordLimit) {
                return words.slice(0, wordLimit).join(" ") + "...";
            }
            return text;
        };

        // Iterar sobre los proyectos y agregar los títulos y detalles
        projectlist.forEach((project) => {
            const descripcionCorta = truncateDescription(project.projDescription);

            const titulo = `
                <input type="checkbox" id="btn_componente1">
                <label for="btn_componente1" class="componentes">
                    <div class="cont_titulo_componente1">
                        <h2><span>${project.projName.toUpperCase()}</span></h2>
                        <div class="linea"></div>
                    </div>

                    <br>

                    <div class="container_componentes">
                        <img src="http://localhost:8080/proyecto/images/${project.projPicture}" alt="${project.primaryImage}">
                        <div class="texto_componente">
                            <p>${descripcionCorta}</p>
                        </div>
                    </div>
                </label>
                    <br>
                    <br>
                    <br>

            `;
            contenedorPrincipal.innerHTML += titulo; // Agregar el nuevo título al contenedor
        });

    } catch (error) {
        console.error("Error:", error);
    }
});
