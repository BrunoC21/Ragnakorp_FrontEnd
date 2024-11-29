window.onload = function () {
    recuperarUser();
};

let boton = document.getElementById("btnRegistrar");

function recuperarUser() {
    const user = JSON.parse(localStorage.getItem("sessionData"));

    if (user) {
        console.log("Usuario recuperado:", user);

        // Rellena los campos del formulario con los datos del usuario
        document.getElementById("firstname").value = user.username;
        document.getElementById("lastname").value = user.lastName;
        document.getElementById("rut").value = user.userRut;
        document.getElementById("email").value = user.email;
        document.getElementById("phone").value = user.phone;
        document.getElementById("descripcion").value = user.userBio;
    } else {
        console.log("No hay usuario en el localStorage.");
    }
}

boton.addEventListener("click", evento => {
    actualizarPerfil();
});

let actualizarPerfil = async () => {

    // Recuperar los datos de la sesión del Local Storage
    const sessionData = JSON.parse(localStorage.getItem("sessionData"));
    if (!sessionData) {
        alert("No hay datos de sesión disponibles. Por favor, inicie sesión nuevamente.");
        return;
    }

    const campos = {
        userDTO: {
            userRut: document.getElementById("rut").value,
            userLastName: document.getElementById("lastname").value,
            userName: document.getElementById("firstname").value,
            userEmail: document.getElementById("email").value,
            userPhone: document.getElementById("phone").value,
            userBio: document.getElementById("descripcion").value
        },
        sessionData: sessionData,
    };

    try {
        const peticion = await fetch("http://localhost:8080/proyecto/user/updateProfile", {  // Ajusta la URL si es necesario
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campos)
        });

        // Verificar si la respuesta es exitosa (status 200-299)
        if (peticion.ok) {
            // Redirigir a la ruta ../Html/index.html
            alert("Perfil actualizado");
            // Actualizar `localStorage` con los nuevos datos
            sessionData.userBio = campos.userDTO.userBio;
            sessionData.userLastName = campos.userDTO.userLastName;
            sessionData.userName = campos.userDTO.userName;
            sessionData.userEmail = campos.userDTO.userEmail;
            sessionData.userPhone = campos.userDTO.userPhone;
            localStorage.setItem("sessionData", JSON.stringify(sessionData));
            window.location.href = '/Sprint2/Html/intranet/perfil.html';
        } else {
            // Mostrar un mensaje de error al usuario
            const errorMsg = await peticion.text();  // Obtener el mensaje de error del backend si es posible
            alert("Error al registrar el usuario: " + errorMsg);
        }
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        alert("Error al actualizar perfil. Por favor, inténtalo nuevamente.");
    }
};