window.onload = function () {
    recuperarNoticia();
};


function recuperarNoticia() {
    const noticia = JSON.parse(localStorage.getItem("noticiaEdit"));
    console.log("Noticia recuperada:", noticia);

    if (noticia) {
        // Rellenar los campos
        document.getElementById("titulo").value = noticia.newsTitle;
        document.getElementById("autor").value = noticia.newsWriter;
        document.getElementById("categoria").value = noticia.newsCategory;
        document.getElementById("contenido").value = noticia.newsContent;

        if (noticia.newsImage) {
            document
                .getElementById("imagen")
                .insertAdjacentHTML('afterend', `<p>Imagen actual: ${noticia.newsImage}</p>`);
        }
    } else {
        console.error("No hay datos en localStorage.");
    }
}


// Manejar el clic en el botón de actualizar noticia
document.getElementById('update').addEventListener('click', async function (event) {
  event.preventDefault(); // Evitar la recarga de la página

  // Recuperar los datos de la sesión del Local Storage
  const sessionData = JSON.parse(localStorage.getItem("sessionData"));
  if (!sessionData) {
    alert("No hay datos de sesión disponibles. Por favor, inicie sesión nuevamente.");
    return;
  }

  // Recuperar los datos del formulario
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

  // Obtener el ID de la noticia de la URL (asumiendo que el ID está en la URL como parámetro)
  const urlParams = new URLSearchParams(window.location.search);
  const newsId = urlParams.get('id');

  // Verificar si se obtuvo el ID de la noticia
  if (!newsId) {
    alert("No se pudo obtener el ID de la noticia. Intenta nuevamente.");
    return;
  }

  // Crear el objeto con los datos del formulario y los datos de sesión
  const payload = {
    news: {
      id: newsId,
      newsTitle: document.getElementById("titulo").value,
      newsWriter: document.getElementById("autor").value,
      newsCategory: document.getElementById("categoria").value,
      newsContent: document.getElementById("contenido").value,
      primaryImage: imageBase64, // Agregar la imagen codificada en Base64 (si existe)
    },
    sessionData: sessionData, // Agregar los datos de la sesión
  };

  try {
    // Enviar los datos al servidor para actualizar la noticia
    const respuesta = await fetch("http://localhost:8080/proyecto/news/update", 
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Enviar el payload con los datos de la noticia y la sesión
      });

    if (respuesta.ok) {

      const noticia = JSON.parse(localStorage.getItem("noticiaEdit"));

      alert("Noticia actualizada exitosamente.");

      noticia.newsTitle = payload.news.newsTitle;
      noticia.newsContent = payload.news.newsContent;
      noticia.newsCategory = payload.news.newsCategory;
      noticia.newsWriter = payload.news.newsWriter;
      noticia.newsImage = payload.news.newsImage;

      // Eliminar el localStorage con el nombre "noticiaEdit"
      localStorage.removeItem("noticiaEdit");
      // Redirigir o limpiar el formulario si es necesario
      window.location.href = "/Sprint2/Html/intranet/news_intranet.html"; // O cualquier otra página de redirección
    } else {
      const errorMsg = await respuesta.text();
      alert("Error al actualizar la noticia: " + errorMsg);
    }
  } catch (error) {
    console.error("Error al enviar la noticia:", error);
    alert("Error al conectar con el servidor. Intenta nuevamente.");
  }
});
  