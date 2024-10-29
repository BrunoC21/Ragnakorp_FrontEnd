document.addEventListener('DOMContentLoaded', function() {
    console.log("Intentando recuperar la información de sesión..."); // Mensaje de depuración inicial

    fetch('http://localhost:8080/proyecto/user/sessionInfo', {
        method: 'GET',
        credentials: 'include' // Incluir credenciales (cookies) en la solicitud
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.text().then(text => {
                throw new Error(`Error ${response.status}: ${text}`);
            });
        }
    })
    .then(data => {
        console.log("Datos recibidos:", data); // Log para verificar los datos recibidos
        document.getElementById("rut").innerText = "Rut: " + data.userRut;
        document.getElementById("nombre").innerText = "Nombre: " + data.username + " " + data.lastName; // Asegúrate de incluir el apellido
        document.getElementById("correo").innerText = "Correo: " + data.correo; // Asegúrate de usar `data.correo`
        document.getElementById("rol").innerText = "Rol: " + data.role;
        alert("Información de sesión:\n" +
              "Rut: " + data.userRut + "\n" +
              "Nombre: " + data.username + " " + data.lastName + "\n" +
              "Rol: " + data.role);
    })
    .catch(error => {
        console.error('Error al obtener la información de sesión:', error);
        alert("Error al obtener la información de sesión: " + error.message);
        // Si tienes `error.response`, asegúrate de que no sea undefined, ya que puede no estar disponible en un error.
    });    
});
