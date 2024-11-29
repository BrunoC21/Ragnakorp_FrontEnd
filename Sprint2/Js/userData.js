// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Recuperar los datos almacenados en el localStorage
    const sessionData = JSON.parse(localStorage.getItem("sessionData"));
    
    if (sessionData) {
        // Si los datos existen en el localStorage, mostrarlos en el div correspondiente
        const sessionDiv = document.getElementById("sessionData");

        const role = sessionData.role;
        const formattedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

        // Crear un contenido para mostrar los datos
        sessionDiv.innerHTML = `
            <h3>${sessionData.username} ${sessionData.lastName}</h3>
            <h3>${formattedRole}</h3>
            <h3>${sessionData.email}</h3>
            <h3>+56${sessionData.phone}</h3>
            <br>
            <a href="editarPerfil.html" class="EditPerfil">Editar perfil</a>
        `;


        if (sessionData.userBio) {
            document.querySelector(".biografia").innerHTML = `
                <h2>Biografía</h2>
                <p>${sessionData.userBio}</p>
            `;
        } else {
            document.querySelector(".biografia").innerHTML = `
                <h2>Biografía</h2>
                <p>No configurada</p>
            `;
        }
    } else {
        // Si no hay datos en el localStorage, mostrar un mensaje de error
        const sessionDiv = document.getElementById("sessionData");
        sessionDiv.innerHTML = "<p>No se ha encontrado información de sesión.</p>";
    }
});



window.onload = function() {
    cargarProyectos(); // Agregar la función para cargar los proyectos
    cargarProyectosCreados();

    const sessionData = JSON.parse(localStorage.getItem("sessionData"));

    const rol = sessionData.role;
    switch(rol) {
        case "ADMIN":
            document.querySelector(".noticias").style.display = "none";
            document.querySelector(".proyectos").style.display = "none";
            document.querySelector(".postulaciones").style.display = "none";
            break;
        case "DESARROLLADOR":
            // ADMIN y DESARROLLADOR ven todas las páginas
            console.log("Rol ADMIN o DESARROLLADOR, se muestra todo.");
            document.querySelector(".postulaciones").style.display = "none";
            break;

        case "ADMINISTRATIVE":
            // ADMINISTRATIVE no ve Estadísticas ni Administración de usuarios
            console.log("Rol ADMINISTRATIVE, ocultando Estadísticas y Administración de usuarios.");
            document.querySelector(".postulaciones").style.display = "none";
            break;

        case "INVESTIGADOR":
            // INVESTIGADOR no ve Estadísticas, Administración de usuarios ni Historial de cambios
            console.log("Rol INVESTIGADOR, ocultando Estadísticas, Administración de usuarios y Historial.");
            break;

        case "ESTUDIANTE":
            // ESTUDIANTE no ve Estadísticas, Administración de usuarios, ni Historial de cambios
            console.log("Rol ESTUDIANTE, ocultando Estadísticas, postulaciones, Administración de usuarios y Historial.");
            document.querySelector(".noticias").style.display = "none";
            document.querySelector(".proyectos").style.display = "none";
            break;

        default:
            console.log("Rol desconocido:", rol);
    }
    
}
// Función para cargar los proyectos del usuario
const cargarProyectos = async () => {
    const sessionData = JSON.parse(localStorage.getItem("sessionData"));

    try {
        const peticion = await fetch("http://localhost:8080/proyecto/userProj/myproj", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sessionData: {
                    userRut: sessionData.userRut // Asegúrate de que `sessionData` tiene esta clave
                }
            })
        });

        if (!peticion.ok) throw new Error("Error al obtener las postulaciones");

        const postulaciones = await peticion.json();

        // Filtrar por estado "Aprobado"
        const postulacionesAprobadas = postulaciones.filter(
            (postulacion) => postulacion.postulationStatus === "Aprobada"
        );

        let contenidoPostulaciones = "";
        for (let postulacion of postulacionesAprobadas) {
            contenidoPostulaciones += `
                - ${postulacion.postulationProject}<br>
            `;
        }        

        if (contenidoPostulaciones) {
            document.querySelector(".postulaciones").innerHTML = `
                <h2>Postulaciones aprobadas</h2>
                <p>${contenidoPostulaciones}</p>
            `;
        } else {
            document.querySelector(".postulaciones").innerHTML = `
                <h2>Postulaciones aprobadas</h2>
                <p>No hay postulaciones aprobadas para mostrar.</p>
            `;
        }
    } catch (error) {
        console.error(error);
        document.querySelector(".postulaciones").innerHTML = `
            <h2>Postulaciones aprobadas</h2>
            <p>No hay postulaciones</p>
        `;
    }
};

const cargarProyectosCreados = async () => {
    const sessionData = JSON.parse(localStorage.getItem("sessionData"));

    try {
        const peticion = await fetch("http://localhost:8080/proyecto/userProj/myprojCreate", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sessionData: {
                    userRut: sessionData.userRut // Asegúrate de que `sessionData` tiene esta clave
                }
            })
        });

        if (!peticion.ok) throw new Error("Error al obtener los proyectos");

        const proyectos = await peticion.json();

        let contenidoProyectos = "";
        for (let proyecto of proyectos) {
            contenidoProyectos += `
                - ${proyecto.projName}<br>
            `;
        }        

        if (contenidoProyectos) {
            document.querySelector(".proyectos").innerHTML = `
                <h2>Proyectos Creados</h2>
                <p>${contenidoProyectos}</p>
            `;
        } else {
            document.querySelector(".proyectos").innerHTML = `
                <h2>Proyectos Creados</h2>
                <p>No hay proyectos para mostrar.</p>
            `;
        }
    } catch (error) {
        console.error(error);
        document.querySelector(".proyectos").innerHTML = `
            <h2>Proyectos Creados</h2>
            <p>No hay proyectos</p>
        `;
    }
}
