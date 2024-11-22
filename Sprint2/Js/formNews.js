document.getElementById('makeNewsForm').addEventListener('submit', async function (event) {
  event.preventDefault(); // Evita que la página se recargue

  const imageInput = document.getElementById("imagen"); // Input tipo file
  let imageBase64 = null;

  // Para que el JSON sirva con la imagen elegi Convertir imagen a Base64 basicametne convierte datos binarios a ASCII
  if (imageInput.files.length > 0) {
    const file = imageInput.files[0];
    const reader = new FileReader();

    // Esperar la conversión de la imagen a Base64
    imageBase64 = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject("Error al leer la imagen");
      reader.readAsDataURL(file);
    });
  }

  // Crear el objeto con los datos del formulario
  const noticia = {
    newsTitle: document.getElementById("titulo").value,
    newsContent: document.getElementById("contenido").value,
    newsWriter: document.getElementById("autor").value,
    newsCategory: document.getElementById("categoria").value,
    primaryImage: imageBase64, // Agregar la imagen codificada en Base64
  };

  try {
    // Enviar los datos al servidor
    const response = await fetch("http://localhost:8080/proyecto/news/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noticia),
    });

    if (response.ok) {
      alert("Noticia creada exitosamente.");
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

