window.onload = function () {
    recuperarProyecto();
};

function recuperarProyecto() {
    const proyecto = JSON.parse(localStorage.getItem("proyectoEdit"));
    console.log("Proyecto recuperado:", proyecto);

    if (proyecto) {
        // rellenar campos
        document.getElementById("titulo").value = proyecto.projName;
        document.getElementById("inversion").value = proyecto.projBudget;
        document.getElementById("categoria").value = proyecto.projCategory;
        document.getElementById("fecha").value = proyecto.projStartDate;
        document.getElementById("address").value = proyecto.projAddress;
        document.getElementById("latitude").value = proyecto.projLat;
        document.getElementById("longitude").value = proyecto.projLong;
        document.getElementById("requerimientos").value = proyecto.projRequirementsPostulation;
        document.getElementById("contenido").value = proyecto.projDescription;

        if (proyecto.projPicture) {
            document.getElementById("imagen").insertAdjacentElement('afterend', `<p>Imagen actual: ${proyecto.projPicture}</p>`)
        }

    } else {
        console.log("No hay datos en localSotrage");
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

    const urlParams = new URLSearchParams(window.location.search);
    const projId = urlParams.get('id');

    if (!projId) {
        alert("No se pudo obtener el ID de la noticia. Intenta nuevamente");
        return;
    }

    const payload = {
        project: {
            id: projId,
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
        // Enviar los datos al servidor para actualizar la noticia
        const respuesta = await fetch("http://localhost:8080/proyecto/project/update", 
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload), // Enviar el payload con los datos de la noticia y la sesión
          });
    
        if (respuesta.ok) {

            // const proyecto = JSON.parse(localStorage.getItem("proyectoEdit"));

            alert("Proyecto actualizado exitosamente.");

            // aqui se debe actualizar el objeto en localStorage

            // Eliminar el localStorage con el nombre "noticiaEdit"
            localStorage.removeItem("noticiaEdit");
            // Redirigir o limpiar el formulario si es necesario
            window.location.href = "/Sprint2/Html/intranet/proyectos_intranet.html"; // O cualquier otra página de redirección
        } else {
            const errorMsg = await respuesta.text();
            alert("Error al actualizar la noticia: " + errorMsg);
        }
    } catch (error) {
        console.error("Error al enviar la noticia:", error);
        alert("Error al conectar con el servidor. Intenta nuevamente.");
    }

});