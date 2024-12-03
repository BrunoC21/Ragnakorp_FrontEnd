document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Obtén el valor dinámico desde el HTML
        const categoryElement = document.getElementById("dynamicCategory");
        const activityCategory = categoryElement.getAttribute("data-category");

        // Construye la URL dinámica
        const url = `http://localhost:8080/proyecto/environmentVinculation/search/category/${activityCategory}`;

        // Realiza la solicitud
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

        if (response.ok) {
            const envList = await response.json(); 
            const envExtras = document.querySelector(".container");
            envExtras.innerHTML = "";

            envList.forEach((env) => {
                const envHTML = `
                    <div class="actividad_text">
                        <h3>• ${env.activityName}: </h3>
                        <p>${env.activityDescription}</p>
                    </div>
                `;
                envExtras.insertAdjacentHTML("beforeend", envHTML);
            });
        } else {
            console.log("No se encontraron actividades.");
        }
    } catch (error) {
        console.error("Error al cargar las actividades:", error);
        alert("Error al cargar las actividades. Por favor, intenta nuevamente.");
    }
});