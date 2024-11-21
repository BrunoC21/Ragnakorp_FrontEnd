// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

//     const rut = document.getElementById('rut').value;
//     const password = document.getElementById('password').value;

//     fetch('http://localhost:8080/proyecto/user/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         mode: 'cors',
//         body: `rut=${encodeURIComponent(rut)}&password=${encodeURIComponent(password)}`,
//     })
//     .then(response => {
//         if (response.ok) {  // Verifica si la respuesta es exitosa
//             return response.text();
//         } else if (response.status === 401) {
//             throw new Error('Invalid username or password');
//         } else {
//             throw new Error('Failed to login');
//         }
//     })
//     .then(data => {
//         // alert("Iniciaste sesion yupii"); // Muestra el mensaje de éxito
//         window.location.href = '../Html/home_intranet.html'; // Redirigir en caso de éxito
//     })
//     .catch(error => {
//         alert(error.message); // Mostrar mensaje de error
//         console.error('Error:', error);
//     });
// });

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
        if (response.ok) {
            return response.text();
        } else if (response.status === 401) {
            throw new Error('Invalid username or password');
        } else {
            throw new Error('Failed to login');
        }
    })
    .then(() => {
        // Después del login exitoso, obtenemos los datos de la sesión
        return fetch('http://localhost:8080/proyecto/user/sessionInfo', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            credentials: 'include',  // Asegura que las cookies sean enviadas
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('No session information available');
        }
        return response.json(); // Retorna los datos de la sesión en formato JSON
    })
    .then(sessionData => {
        // Verifica que los datos de la sesión estén completos
        console.log("Datos de la sesión recibidos:", sessionData);

        // Verifica que los datos esenciales existan
        if (sessionData.userRut && sessionData.username && sessionData.lastName && sessionData.role && sessionData.email && sessionData.phone) {
            console.log("Todos los datos de sesión están presentes.");

            // Almacena los datos en localStorage
            localStorage.setItem('sessionData', JSON.stringify(sessionData));

            // Verifica que los datos estén guardados correctamente
            console.log("Datos almacenados en localStorage:", localStorage.getItem('sessionData'));

            // Mostrar un mensaje de progreso
            alert("¡Inicio de sesión exitoso! Los datos de sesión se han guardado.");

            // Redirige a la página deseada
            window.location.href = '../Html/home_intranet.html';
        } else {
            alert("Faltan datos en la sesión.");
            console.error("Datos incompletos en la sesión:", sessionData);
        }
    })
    .catch(error => {
        alert(error.message);
        console.error('Error:', error);
    });
});
