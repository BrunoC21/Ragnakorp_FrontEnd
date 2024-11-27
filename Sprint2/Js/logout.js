let boton = document.getElementById("closeSession");

boton.addEventListener("click", evento => {
    cerrarSesion();
});

let cerrarSesion = async () => {
      // Recuperar los datos de la sesión del Local Storage
  const sessionData = JSON.parse(localStorage.getItem("sessionData"));
  if (!sessionData) {
    alert("No hay datos de sesión disponibles. Por favor, inicie sesión nuevamente.");
    return;
  } else {
    localStorage.removeItem("sessionData");
    window.location.href = "/Sprint2/Html/intranet/login_intranet.html";
  }
}