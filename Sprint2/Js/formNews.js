// Selección del botón de enviar y el formulario


// Evento para enviar los datos al servidor
document.getElementById('makeNewsForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que la página se recargue

  // Captura los datos del formulario
  const noticia = {
    newsTitle: document.getElementById("titulo").value,
    newsContent: document.getElementById("contenido").value,
    newsWriter: document.getElementById("autor").value,
    newsCategory: document.getElementById("categoria").value,
  };

  try {
    // Enviar los datos al servidor
     fetch("http://localhost:8080/proyecto/news/create",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noticia),
      }
    );

    if (respuesta.ok) {
      alert("Noticia creada exitosamente.");
      formulario.reset(); // Limpia el formulario
    } else {
      throw new Error("Error al crear la noticia: " );
    }
  } catch (error) {
    console.error("Error al enviar la noticia:", error);
    alert("Error al conectar con el servidor. Intenta nuevamente.");
  }
});