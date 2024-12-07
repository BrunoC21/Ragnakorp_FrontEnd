// URL del endpoint
const API_URL = "http://localhost:8080/proyecto/access/create";

// Función para registrar un acceso
async function registerAccess(accessData) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(accessData), // Convertir el objeto a JSON
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const result = await response.json(); // Parsear la respuesta JSON
        console.log("Acceso registrado:", result);
        return result;
    } catch (error) {
        console.error("Error al registrar el acceso:", error.message);
    }
}

// Ejecución al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    console.log("Página cargada. Registrando acceso...");

    const accessData = {
        hour: new Date().toISOString(), // Hora actual
        device: navigator.userAgent,    // User-Agent del navegador
        stadisticsIds: [],              // Si tienes IDs de estadísticas asociadas
    };

    registerAccess(accessData); // Llama a la función para registrar el acceso
});
