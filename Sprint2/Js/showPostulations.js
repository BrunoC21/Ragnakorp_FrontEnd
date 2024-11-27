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
