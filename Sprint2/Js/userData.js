// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Recuperar los datos almacenados en el localStorage
    const sessionData = JSON.parse(localStorage.getItem("sessionData"));
    
    if (sessionData) {
        // Si los datos existen en el localStorage, mostrarlos en el div correspondiente
        const sessionDiv = document.getElementById("sessionData");

        // Crear un contenido para mostrar los datos
        sessionDiv.innerHTML = `
            <h3>Nombre: ${sessionData.username} ${sessionData.lastName}</h3>
            <h3>Rol: ${sessionData.role}</h3>
            <h3>Email: ${sessionData.email}</h3>
            <h3>Teléfono ${sessionData.phone}</h3>
        `;
    } else {
        // Si no hay datos en el localStorage, mostrar un mensaje de error
        const sessionDiv = document.getElementById("sessionData");
        sessionDiv.innerHTML = "<p>No se ha encontrado información de sesión.</p>";
    }
});
