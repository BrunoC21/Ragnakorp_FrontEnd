window.onload = function() {
    listarUsuarios();
}

let listarUsuarios = async ()=> {
    const peticion = await fetch("http://localhost:8080/proyecto/user/search",
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        const usuarios = await peticion.json();

        let contenidoTabla = "";
        for (let usuario of usuarios) {
            contenidoTabla += `
                <tr>
                    <td>${usuario.userName} ${usuario.userLastName}</td>
                    <td>${usuario.userRut}</td>
                    <td>${usuario.userRole}</td>
                    <td><button type="button"><a href="../register.html">Editar Rol</a></button></td>
                </tr>
            `;
        }

        document.querySelector("#tabla tbody").innerHTML = contenidoTabla;
}