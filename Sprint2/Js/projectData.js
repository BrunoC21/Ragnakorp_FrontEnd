window.onload = function() {
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
                </tr>
            `;
        }

        document.querySelector("#tabla tbody").outerHTML = contenidoTabla;
}