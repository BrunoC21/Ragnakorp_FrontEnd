let boton = document.getElementById("btnRegistrar");

boton.addEventListener("click", evento => {
    registrarUsuario();
});

let registrarUsuario = async () => {

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
            userPassword: document.getElementById("password").value,
            userRole: document.getElementById("role").value,
        },
        sessionData: sessionData,
    };

    try {
        const peticion = await fetch("http://localhost:8080/proyecto/user/create", {  // Ajusta la URL si es necesario
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campos)
        });

        // Verificar si la respuesta es exitosa (status 200-299)
        if (peticion.ok) {
            // Redirigir a la ruta ../Html/index.html
            window.location.href = '../Html/login_intranet.html';
        } else {
            // Mostrar un mensaje de error al usuario
            const errorMsg = await peticion.text();  // Obtener el mensaje de error del backend si es posible
            alert("Error al registrar el usuario: " + errorMsg);
        }
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        alert("Error al registrar el usuario. Por favor, inténtalo nuevamente.");
    }
};
