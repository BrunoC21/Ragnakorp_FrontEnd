window.onload = function () {
    obtenerSesion();
};

let obtenerSesion = async () => {
    try {
        const peticion = await fetch("http://localhost:8080/proyecto/user/sessionInfo", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include" // Importante para enviar cookies
        });

        if (peticion.ok) {
            const datos = await peticion.json();
            console.log("Datos de sesión recibidos:", datos);

            let contenido = `
                <h3 id="nombre">Nombre: ${datos.username}</h3>
                <h4 id="correo">Correo: ${datos.email}</h4>
                <h4 id="rol">Rol(es): ${datos.role}</h4>
                <h4 id="rut">Rut: ${datos.userRut}</h4>
            `;

            document.querySelector("#sessionData").innerHTML = contenido;
        } else if (peticion.status === 401) {
            alert("No hay sesión iniciada");
            document.querySelector("#sessionData").innerHTML = "<h3>No hay sesión iniciada</h3>";
        } else {
            alert("Error inesperado:", peticion.status);
            document.querySelector("#sessionData").innerHTML = "<h3>Error inesperado</h3>";
        }
    } catch (error) {
        alert("Error al recuperar los datos de sesión:", error);
    }
};
