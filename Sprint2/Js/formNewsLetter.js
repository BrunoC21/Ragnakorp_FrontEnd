document.getElementById("boton").addEventListener("click", function () {
    // Recuperar los valores de los campos del formulario
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;

    // Crear el objeto según la norma especificada
    const suscriptor = {
        subFullName: nombre,
        subEmail: email,
        subPhone: telefono,
    };

    // Enviar los datos al servidor
    fetch("http://localhost:8080/proyecto/suscriptor/create", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(suscriptor),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error en la solicitud");
            }
        })
        .then((data) => {
            console.log("Respuesta del servidor:", data);
            alert("Suscriptor creado con éxito");
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Hubo un error al enviar la solicitud");
        });
});