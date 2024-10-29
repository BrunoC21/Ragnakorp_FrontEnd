document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

    const rut = document.getElementById('rut').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:8080/proyecto/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        mode: 'cors',
        body: `rut=${encodeURIComponent(rut)}&password=${encodeURIComponent(password)}`,
    })
    .then(response => {
        if (response.ok) {  // Verifica si la respuesta es exitosa
            return response.text();
        } else if (response.status === 401) {
            throw new Error('Invalid username or password');
        } else {
            throw new Error('Failed to login');
        }
    })
    .then(data => {
        // alert("Iniciaste sesion yupii"); // Muestra el mensaje de éxito
        window.location.href = '../Html/home_intranet.html'; // Redirigir en caso de éxito
    })
    .catch(error => {
        alert(error.message); // Mostrar mensaje de error
        console.error('Error:', error);
    });
});
