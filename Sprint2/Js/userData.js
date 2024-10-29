fetch('http://localhost:8080/proyecto/userData/session-info')
    .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error("No hay sesión iniciada");
        }
    })
    .then(data => {
        console.log(data);
        // Puedes procesar y mostrar los datos en el frontend
        document.getElementById("sessionInfo").innerText = data;
    })
    .catch(error => console.error('Error:', error));
