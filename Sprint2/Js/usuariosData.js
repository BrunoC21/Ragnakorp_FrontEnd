window.onload = function() {
    listarUsuarios();
};

let listarUsuarios = async () => {
    const peticion = await fetch("http://localhost:8080/proyecto/user/search", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    const usuarios = await peticion.json();

    let contenidoTabla = "";
    for (let usuario of usuarios) {
        // Escapar caracteres especiales en el JSON
        const usuarioData = encodeURIComponent(JSON.stringify(usuario));

        contenidoTabla += `
            <tr>
                <td>${usuario.userName} ${usuario.userLastName}</td>
                <td>${usuario.userRut}</td>
                <td>${usuario.userRole}</td>
                <td>
                    <button class="btnEditar" data-usuario="${usuarioData}">Editar usuario</button>
                </td>
            </tr>
        `;
    }

    document.querySelector("#tabla tbody").innerHTML = contenidoTabla;

    // Asigna eventos a los botones "Editar"
    document.querySelectorAll(".btnEditar").forEach(button => {
        button.addEventListener("click", () => {
            try {
                // Decodifica y analiza el JSON desde el atributo data-usuario
                const usuario = JSON.parse(decodeURIComponent(button.dataset.usuario));
                localStorage.setItem("usuarioEdit", JSON.stringify(usuario));
                window.location.href = `../register.html?id=${usuario.id}`;
            } catch (error) {
                console.error("Error al procesar el JSON:", error);
            }
        });
    });
};
