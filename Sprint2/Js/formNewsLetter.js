let boton = document.getElementById("boton");

boton.addEventListener("click", evento => {
    registrarSuscriptor();
});

let registrarSuscriptor = async () => {
    const campos  = {
        subFullName: document.getElementById("nombre").value,
        subEmail: document.getElementById("email").value,
        subPhone: document.getElementById("telefono").value,
    };

    try {
        const peticion = await fetch("http://localhost:8080/proyecto/suscriptor/create", {  // Ajusta la URL si es necesario
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
            window.location.href = '/Sprint2/Html/index.html';
        } else {
            // Mostrar un mensaje de error al usuario
            const errorMsg = await peticion.text();  // Obtener el mensaje de error del backend si es posible
            alert("Error al registrar el suscriptor: " + errorMsg);
        }
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        alert("Error al registrar el usuario. Por favor, inténtalo nuevamente.");
    }
}