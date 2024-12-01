document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("http://localhost:8080/proyecto/environmentVinculation/search", {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });
        
        if (response.ok) {
            const envList = await response.json(); 
            const lastEnvList = envList.slice(0, 3);
            const envExtras = document.querySelector(".cont_ult_news");
            envExtras.innerHTML = "";

            lastEnvList.forEach((env) => {
                const envHTML = `
                    <a href="#">
                        <div class="noticias">
                            <div class="text_news">
                                <h3>${env.activityName}</h3>
                                <p>${env.activityDescription}</p>
                            </div>
                        </div>
                    </a>
                `;
                envExtras.insertAdjacentHTML("beforeend", envHTML); // Usar insertAdjacentHTML
            });
        } else {
            alert("No se encontraron actividades.");
        }
    } catch (error) {
        console.error("Error al cargar las actividades:", error);
        alert("Error al cargar las actividades. Por favor, intenta nuevamente.");
    }
});
