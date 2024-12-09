document.getElementById('makeCenterForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    // Recuperar los datos de la sesión del Local Storage
    const sessionData = JSON.parse(localStorage.getItem("sessionData"));
    if (!sessionData) {
        alert("No hay datos de sesión disponibles. Por favor, inicie sesión nuevamente.");
        return;
    }

    const campos = {
        poloCenter: {
            centerName: document.getElementById("name").value,
            centerDescription: document.getElementById("contenido").value,
            centerLocation: document.getElementById("ubicacion").value,
            centerDirection: document.getElementById("direccion").value,
            centerContact: document.getElementById("contact").value
        },
        sessionData: sessionData,
    }

    try {
        const peticion = await fetch("http://localhost:8080/proyecto/polocenter/create", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campos)
        })

        // Verificar si la respuesta es exitosa (status 200-299)
        if (peticion.ok) {
            // Redirigir a la ruta ../Html/index.html
            alert("centro creado");
            window.location.href = '/Sprint2/Html/intranet/ubicacion_intranet.html';
        } else {
            // Mostrar un mensaje de error al usuario
            const errorMsg = await peticion.text();  // Obtener el mensaje de error del backend si es posible
            alert("Error al ingresar el centro: " + errorMsg);
        }
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        alert("Error al registrar el usuario. Por favor, inténtalo nuevamente.");
    }
});