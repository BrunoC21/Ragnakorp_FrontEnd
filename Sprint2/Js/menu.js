// menu.js

// Esperamos que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Recuperar los datos de la sesión del Local Storage
    const sessionData = JSON.parse(localStorage.getItem("sessionData"));
    if (!sessionData) {
        alert("No hay datos de sesión disponibles. Por favor, inicie sesión nuevamente.");
        return;
    }

    console.log("Datos de sesión:", sessionData); // Verifica que role esté presente

    // Función para gestionar la visibilidad del menú según el rol
    function setMenuVisibility(role) {
        const elements = {
            estadisticas: document.getElementById("estadisticas-item"),
            historial: document.getElementById("historial-item"),
            roles: document.getElementById("roles-item"),
        };

        // Mostrar el rol para verificar
        console.log("Rol del usuario:", role);

        // Lógica para cada rol
        switch(role) {
            case "ADMIN":
            case "DESARROLLADOR":
                // ADMIN y DESARROLLADOR ven todas las páginas
                console.log("Rol ADMIN o DESARROLLADOR, se muestra todo.");
                break;

            case "ADMINISTRATIVE":
                // ADMINISTRATIVE no ve Estadísticas ni Administración de usuarios
                console.log("Rol ADMINISTRATIVE, ocultando Estadísticas y Administración de usuarios.");
                elements.estadisticas.style.display = 'none';
                elements.roles.style.display = 'none';
                break;

            case "INVESTIGADOR":
                // INVESTIGADOR no ve Estadísticas, Administración de usuarios ni Historial de cambios
                console.log("Rol INVESTIGADOR, ocultando Estadísticas, Administración de usuarios y Historial.");
                elements.estadisticas.style.display = 'none';
                elements.roles.style.display = 'none';
                elements.historial.style.display = 'none';
                break;

            case "ESTUDIANTE":
                // ESTUDIANTE no ve Estadísticas, Administración de usuarios, ni Historial de cambios
                console.log("Rol ESTUDIANTE, ocultando Estadísticas, Administración de usuarios y Historial.");
                elements.estadisticas.style.display = 'none';
                elements.roles.style.display = 'none';
                elements.historial.style.display = 'none';
                break;

            default:
                console.log("Rol desconocido:", role);
        }
    }

    // Ejecutar la función con el rol de la sesión
    setMenuVisibility(sessionData.role);
});
