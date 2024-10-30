window.onload = function() {
    listarProyectos();
}

let boton = document.getElementById("botonPostular");

boton.addEventListener("click", evento => {
    registrarPostulacion();
});

let registrarPostulacion = async () => {
    let campos = {};

    campos.postulationName = document.getElementById("nombre").value;
    campos.postulationDescription = document.getElementById("motivo").value;
    campos.postulationProject = document.getElementById("proyecto").value;
    campos.postulationRut = document.getElementById("rut").value;

    try {
        const peticion = await fetch("http://localhost:8080/proyecto/postularion/create",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(campos)
            })

            if (peticion.of) {
                window.location.href = '../Html/home_intranet.html';
            } else {
                const errorMsg = await peticion.text();
                alert("error al registrar la postulacion: " + errorMsg);
            }

    } catch (error) {
        console.error("Error al registrar la solicitud: ", error);
        alert("Error al registrar la postulacion, por favor intente nuevament");
    }

};

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
                <option value="${proyecto.projName}">
                    ${proyecto.projName}
                </option>
            `;
        }

        document.querySelector("#proyecto").outerHTML = contenidoTabla;
}

// nombre
//rut
//seleccionar proyecto
//motivo postulacion