window.onload = function(){
    listarProyectos();
}


let listarProyectos = async ()=> {
    const peticion = await fetch("http://localhost:8080/proyecto/project/search",
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }
    );

    const proyectos = await peticion.json();

    let contenidoProyectos = "";

    for (let project of proyectos) {
        let contenidoFila = '<tr> <td>${project.projName}</td><td>${project.projDescription}</td><td>${project.projStartDate}</td><td>${project.projRequirementsPostulation}</td> </tr>'

        contenidoProyectos += contenidoFila;
    }

    document.querySelector("#tablaProyectos tbody").outerHTML = contenidoProyectos;
}