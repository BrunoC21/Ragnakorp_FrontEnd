window.onload = function () {
    obtenerCambios();
};

let cambios = [];

let obtenerCambios = async () => {
    const peticion = await fetch('http://localhost:8080/proyecto/chagnes/search/news', {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    cambios = await peticion.json();

    let contenidoTabla = "";
    
    for (let cambio in cambios) {
        contenidoTabla +=`
            <tr>
                <td>Actualizacion</td>
                <td>${cambio.changeIdUser}</td>
                <td>${cambio.changesDate}</td>
                <td>${cambio.changesThing}</td>
            </tr>
        `;
    }
    document.querySelector("#tabla tbody").innerHTML = contenidoTabla;
    // renderizarTablaCambios();
}