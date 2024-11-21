// Selección del botón de enviar y el formulario
const botonEnviar = document.getElementById("btnCrearNoticia");
const formulario = document.getElementById("formNoticia");

// Evento para enviar los datos al servidor
botonEnviar.addEventListener("click", async (evento) => {
  evento.preventDefault(); // Evita que la página se recargue

  // Captura los datos del formulario
  const noticia = {
    newsTitle: document.getElementById("titulo").value,
    newsContent: document.getElementById("contenido").value,
    newsWriter: document.getElementById("autores").value,
    primaryImage: document.getElementById("imagen").value,
    newsCategory: document.getElementById("categoria").value,
  };

  try {
    // Enviar los datos al servidor
    const respuesta = await fetch(
      "http://localhost:8080/proyecto/news/create",
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
      const errorMsg = await respuesta.text();
      alert("Error al crear la noticia: " + errorMsg);
    }
  } catch (error) {
    console.error("Error al enviar la noticia:", error);
    alert("Error al conectar con el servidor. Intenta nuevamente.");
  }
});
