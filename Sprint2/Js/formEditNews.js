let boton = document.getElementById('btnEditar');
boton.addEventListener("click", evento => {
    evento.preventDefault(); // Previene el envío del formulario
    recuperarNoticia();
});


