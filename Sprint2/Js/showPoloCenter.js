window.onload = function () {
    obtenerCentros();
};

let centros = [];

let obtenerCentros = async () => {
    try {
        const peticion = await fetch("http://localhost:8080/proyecto/polocenter/search", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
    
        centros = await peticion.json();
        
        let contenidoTabla = "";
    
        for (let centro of centros) {
            contenidoTabla += `
                <tr>
                    <td>${centro.centerName}</td>
                    <td>${centro.centerDirection}</td>
                    <td>${centro.centerLocation}</td>
                    <td>${centro.centerContact}</td>
                    <td>${centro.centerDescription}</td>
                </tr>
            `;
        }

        // Insertar la tabla con los datos recuperados
        document.querySelector("#tabla tbody").innerHTML = contenidoTabla;

    } catch (error) {
        console.error("Error al obtener los cambios:", error);
    }   

};

