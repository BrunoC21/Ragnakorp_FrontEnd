window.onload = function () {
    obtenerVinculaciones();
};

let obtenerVinculaciones = async () => {
    const peticion = await fetch("http://localhost:8080/proyecto/environmentVinculation/search", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    const vinculaciones = await peticion.json();

    let contenidoTabla = "";
    for (let vinculacion of vinculaciones) {
        contenidoTabla += `
            <tr>
                <td>${vinculacion.activityName}</td>
                <td>${vinculacion.activityDescription}</td>
                <td>
                    <button class="btnEditar" data-id="${vinculacion.id}">Editar</button>
                </td>

            </tr>
        `;
    }

    document.querySelector("#tabla tbody").innerHTML = contenidoTabla;
    
};