function toggleDetails(button) {
  const detailRow = button.parentElement.parentElement.nextElementSibling;
  detailRow.classList.toggle("hidden");
  button.textContent = detailRow.classList.contains("hidden") ? "+" : "-";
}

function acceptPostulation(button) {
  const row = button.closest("tr").previousElementSibling;
  row.remove();
  button.closest("tr").remove();
  alert("Postulación aceptada y eliminada de la tabla.");
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
  const row = button.closest("tr").previousElementSibling;
  row.remove();
  button.closest("tr").remove();
  alert(
    "Postulación rechazada y eliminada de la tabla. Justificación enviada."
  );
}
