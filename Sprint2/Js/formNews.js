document.getElementById('makeNewsForm').addEventListener('submit', async function (event) {
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


  // Crear el objeto con los datos del formulario y los datos de sesión
  const payload = {
    news: {
      newsTitle: document.getElementById("titulo").value,
      newsContent: document.getElementById("contenido").value,
      newsWriter: document.getElementById("autor").value,
      newsCategory: document.getElementById("categoria").value,
      primaryImage: imageBase64, // Agregar la imagen codificada en Base64
    },
    sessionData: sessionData, // Agregar los datos de la sesión
  };

  try {
    // Enviar los datos al servidor
    const response = await fetch("http://localhost:8080/proyecto/news/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), // Enviar el objeto completo
    });

    if (response.ok) {
      // alert("Noticia creada exitosamente.");
      document.getElementById("makeNewsForm").reset(); // Limpia el formulario
    } else {
      const errorMessage = await response.text();
      throw new Error(`Error del servidor: ${errorMessage}`);
    }
  } catch (error) {
    console.error("Error al enviar la noticia:", error);
    alert("Error al conectar con el servidor. Intenta nuevamente.");
  }
});
