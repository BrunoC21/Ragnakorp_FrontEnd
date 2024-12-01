document.getElementById('makeProyForm').addEventListener('submit', async function (event) {
event.preventDefault(); // Evitar la recarga de la página

    // Recuperar los datos de la sesión del Local Storage
    const sessionData = JSON.parse(localStorage.getItem("sessionData"));
    if (!sessionData) {
        alert("No hay datos de sesión disponibles. Por favor, inicie sesión nuevamente.");
        return;
    }  

    const imageInput = document.getElementById("imagen"); // Input tipo file
    let imageBase64 = null;

    // Convertir la imagen a Base64 si se seleccionó alguna
    if (imageInput.files.length > 0) {
        const file = imageInput.files[0];
        const reader = new FileReader();

        // Esperar la conversión de la imagen a Base64
        imageBase64 = await new Promise((resolve, reject) => {
        reader.onload = () => {
            const base64String = reader.result.split(",")[1]; // Eliminar el prefijo
            resolve(base64String);
        };
        reader.onerror = () => reject("Error al leer la imagen");
        reader.readAsDataURL(file);
        });
    }


    // Crear el objeto con los datos necesarios
    const payload = {
        projectData: {
            projName: document.getElementById('titulo').value,
            projDescription: document.getElementById('contenido').value,
            projLong: document.getElementById('longitude').value,
            projStartDate: document.getElementById('fecha').value,
            projRequirementsPostulation: document.getElementById('requerimientos').value,
            projLat: document.getElementById('latitude').value,
            projBudget: document.getElementById('inversion').value,
            projCategory: document.getElementById('categoria').value,
            projAddress: document.getElementById('address').value,
            projPicture: imageBase64,
        },
        sessionData: sessionData,
    };

    try {
        // Enviar los datos al servidor
        const respuesta = await fetch(
        "http://localhost:8080/proyecto/project/create",
        {
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
        );

        if (respuesta.ok) {
        alert("proyecto creado exitosamente.");
        // Redirige a la página deseada
        window.location.href = '/Sprint2/Html/intranet/proyectos_intranet.html';
        document.getElementById("makeProyForm").reset(); // Limpia el formulario
        } else {
        // Si la respuesta no es exitosa, obtener el mensaje de error
        const errorMsg = await respuesta.text();
        alert("Error al crear el proyecto: " + errorMsg);
        }
    } catch (error) {
        // Solo mostramos este mensaje si ocurre un error de conexión o problema con la solicitud
        console.error("Error al enviar el proyecto:", error);
        alert("Error al conectar con el servidor. Intenta nuevamente.");
    }
});
