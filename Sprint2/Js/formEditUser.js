window.onload = function () {
    recuperarUser();
};

function recuperarUser() {
    const user = JSON.parse(localStorage.getItem("usuarioEdit"));

    if (user) {
        console.log("Usuario recuperado:", user);

        // Rellena los campos del formulario con los datos del usuario
        document.getElementById("firstname").value = user.userName;
        document.getElementById("lastname").value = user.userLastName;
        document.getElementById("rut").value = user.userRut;
        document.getElementById("email").value = user.userEmail;
        document.getElementById("phone").value = user.userPhone;
        document.getElementById("password").value = user.userPassword;
        document.getElementById("role").value = user.userRole;

        // Cambia el texto del botón a "Actualizar Usuario"
        const btnRegistrar = document.getElementById("btnRegistrar");
        btnRegistrar.textContent = "Actualizar Usuario";

        // Cambia la clase del botón (por ejemplo, para añadir una clase de estilo diferente)
        btnRegistrar.classList.remove("btn-primary"); // Elimina la clase de "Agregar Usuario"
        btnRegistrar.classList.add("btn-warning"); // Añade una clase para "Actualizar Usuario"

        // Asigna una función para manejar la actualización
        btnRegistrar.addEventListener("click", actualizarUsuario);
    } else {
        console.log("No hay usuario en el localStorage.");
    }
}


async function actualizarUsuario() {
    const sessionData = JSON.parse(localStorage.getItem("sessionData"));
    
    const payload = {
        updatedUser: {
            userName: document.getElementById("firstname").value,
            userLastName: document.getElementById("lastname").value,
            userRut: document.getElementById("rut").value,
            userEmail: document.getElementById("email").value,
            userPhone: document.getElementById("phone").value,
            userPassword: document.getElementById("password").value,
            userRole: document.getElementById("role").value,
        },
        sessionData,
    };

    try {
        // Aquí enviarías la solicitud para actualizar al usuario en el backend
        const respuesta = await fetch("http://localhost:8080/proyecto/user/assignRole", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        if (respuesta.ok) {
            // Eliminar el localStorage con el nombre "noticiaEdit"
            localStorage.removeItem("usuarioEdit");
            // Redirigir o limpiar el formulario si es necesario
            window.location.href = "/Sprint2/Html/intranet/roles_intranet.html"; // O cualquier otra página de redirección
        } else {
            const errorMsg = await respuesta.text();
            alert("Error al actualizar la noticia: " + errorMsg);
        }
    } catch (error) {
        console.error("Error al enviar la noticia:", error);
        alert("Error al conectar con el servidor. Intenta nuevamente.");
    }
}
