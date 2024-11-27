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
                    <button class="btnEditar" data-vinculacion='${JSON.stringify(vinculacion)}'>Editar</button>
                </td>
            </tr>
        `;
    }

    document.querySelector("#tabla tbody").innerHTML = contenidoTabla;

    // Agregar eventos de clic a los botones Editar
    document.querySelectorAll(".btnEditar").forEach(button => {
        button.addEventListener("click", () => {
            const vinculacion = JSON.parse(button.dataset.vinculacion);

            // Guardar en localStorage antes de redirigir
            localStorage.setItem("vinculacionEdit", JSON.stringify(vinculacion));

            // Redirigir a la página de edición
            window.location.href = `makeVinculacion_intranet.html?id=${vinculacion.id}`;
        });
    });
};


let boton = document.getElementById("agregar");
boton.addEventListener("click", evento => {
    const noticia = JSON.parse(localStorage.getItem("vinculacionEdit"));
    if (noticia) {
        localStorage.removeItem("vinculacionEdit");
    }
});
