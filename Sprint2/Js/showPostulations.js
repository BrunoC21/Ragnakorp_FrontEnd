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
    : postulaciones.filter(postulaciones => postulaciones.postulationStatus.toLowerCase() === filtroCategoria.toLowerCase());

  for (let Postulacion of postulacionesFiltradas) {
    contenidoTabla += `
        <tr>
            <td>${Postulacion.postulationRut}</td>
            <td>${Postulacion.postulationProject}</td>
            <td class="status status-pending">${Postulacion.postulationStatus}</td>
            <td><button onclick="toggleDetails(this)">+</button></td>
        </tr>
        <tr class="hidden">
            <td colspan="4">
                <p><strong>RUT:</strong> ${Postulacion.postulationRut}</p>
                <p><strong>Nombre:</strong> ${Postulacion.postulationName}</p>
                <p><strong>Descripción:</strong> ${Postulacion.postulationDescription}</p>
                <button onclick="acceptPostulation(this)">Aceptar</button>
                <button onclick="rejectPostulation(this)">Rechazar</button>
                <div class="hidden rejection-reason">
                    <p>Justifique el rechazo:</p>
                    <textarea rows="3"></textarea>
                    <button onclick="submitRejection(this)">Enviar Justificación</button>
                </div>
            </td>
        </tr>
    `;
  }

  document.querySelector("#postulaciones tbody").innerHTML = contenidoTabla;

}

function toggleDetails(button) {
  const detailRow = button.parentElement.parentElement.nextElementSibling;
  detailRow.classList.toggle("hidden");
  button.textContent = detailRow.classList.contains("hidden") ? "+" : "-";
}

function acceptPostulation(button) {
  const parentRow = button.closest("tr").previousElementSibling;
  const statusCell = parentRow.querySelector(".status");
  statusCell.textContent = "Aceptada";
  statusCell.className = "status status-accepted";
  alert("Postulación aceptada.");
  toggleDetails(button.closest("tr").previousElementSibling.querySelector("button"));
}

function rejectPostulation(button) {
  const rejectionDiv = button.nextElementSibling;
  rejectionDiv.classList.remove("hidden");
}

function submitRejection(button) {
  const reason = button.previousElementSibling.value.trim();
  if (!reason) {
      alert("Debe justificar el rechazo.");
      return;
  }
  const parentRow = button.closest("tr").previousElementSibling;
  const statusCell = parentRow.querySelector(".status");
  statusCell.textContent = "Rechazada";
  statusCell.className = "status status-rejected";
  alert("Postulación rechazada. Justificación enviada.");
  toggleDetails(button.closest("tr").previousElementSibling.querySelector("button"));
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