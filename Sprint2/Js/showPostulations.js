window.onload = function () {
  obtenerPostulaciones();
};

let postulaciones = [];

let obtenerPostulaciones = async () => {
  const peticion = await fetch("http://localhost:8080/proyecto/postulation/search", {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
  });

  postulaciones = await peticion.json();
  renderizarTabla("todos");
}

let renderizarTabla = (filtroCategoria) => {
  let contenidoTabla = "";

  const postulacionesFiltradas = filtroCategoria === "todos"
      ? postulaciones
      : postulaciones.filter(
          postulacion => postulacion.postulationStatus.toLowerCase() === filtroCategoria.toLowerCase()
      );

  for (let Postulacion of postulacionesFiltradas) {
      let statusClass = "";
      switch (Postulacion.postulationStatus) {
          case "Pendiente":
              statusClass = "status-pending";
              break;
          case "Aprobada":
              statusClass = "status-accepted";
              break;
          case "Rechazada":
              statusClass = "status-rejected";
              break;
          default:
              statusClass = "status-unknown";
      }

      contenidoTabla += `
          <tr>
              <td>${Postulacion.postulationRut}</td>
              <td>${Postulacion.postulationName}</td>
              <td>${Postulacion.postulationProject}</td>
              <td class="status ${statusClass}">${Postulacion.postulationStatus}</td>
              <td><button onclick="toggleDetails(this)">Detalle</button></td>
              
              <td>
                  <button class="btn-accept" data-postulacion='${JSON.stringify(Postulacion)}' data-status="Aprobada">Aceptar</button>
                  <button class="btn-reject" data-postulacion='${JSON.stringify(Postulacion)}' data-status="Rechazada">Rechazar</button>
              </td>
          </tr>
          <tr class="hidden">
              <td colspan="4">
                  <p><strong>Descripción:</strong> ${Postulacion.postulationDescription}</p>
              </td>
          </tr>
      `;
  }

  document.querySelector("#postulaciones tbody").innerHTML = contenidoTabla;

  // Agregar eventos a los botones
  document.querySelectorAll(".btn-accept, .btn-reject").forEach(button => {
      button.addEventListener("click", (event) => {
          const postulacion = JSON.parse(button.dataset.postulacion);
          const status = button.dataset.status;
          modificarPostulacion(postulacion, status);
      });
  });
};


async function modificarPostulacion(postulacion, status) {
  const sessionData = JSON.parse(localStorage.getItem("sessionData"));
  if (!sessionData) {
      alert("No hay datos de sesión disponibles. Por favor, inicie sesión nuevamente.");
      return;
  }

  const payload = {
      post: {
          id: postulacion.id,
          postulationName: postulacion.postulationName,
          postulationRut: postulacion.postulationRut,
          postulationDescription: postulacion.postulationDescription,
          postulationProject: postulacion.postulationProject,
          postulationStatus: status,
      },
      sessionData: sessionData,
  };

  try {
      const respuesta = await fetch("http://localhost:8080/proyecto/postulation/update", {
          method: "PUT",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
      });

      if (respuesta.ok) {
          window.location.reload();
      } else {
          const errorMsg = await respuesta.text();
          alert("Error al actualizar la postulación: " + errorMsg);
      }
  } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      alert("Error al conectar con el servidor. Intenta nuevamente.");
  }
}


function toggleDetails(button) {
  const detailRow = button.parentElement.parentElement.nextElementSibling;
  detailRow.classList.toggle("hidden");
  button.textContent = detailRow.classList.contains("hidden") ? "Detalle" : "Cerrar";
}

function filterTable() {
  const filter = document.getElementById("statusFilter").value;
  const rows = document.querySelectorAll("#postulaciones tbody tr:not(.hidden)");
  rows.forEach(row => {
      const status = row.querySelector(".status").textContent.toLowerCase();
      if (filter === "all" || status.includes(filter)) {
          row.style.display = "";
      } else {
          row.style.display = "none";
      }
  });
}
