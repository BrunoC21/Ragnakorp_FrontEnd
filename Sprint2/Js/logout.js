function logout() {
    fetch('http://localhost:8080/user/logout', {
        method: 'POST',
        credentials: 'include'  // Importante para enviar la cookie de sesión
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '../Html/login.html';  // Redirigir al login tras el logout
        } else {
            console.error('Error al cerrar sesión');
        }
    });
}
