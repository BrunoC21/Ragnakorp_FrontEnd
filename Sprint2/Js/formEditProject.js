window.onload = function () {
    recuperarProyecto();
};

function recuperarProyecto() {
    const proyecto = JSON.parse(localStorage.getItem("proyectoEdit"));
    console.log("Proyecto recuperado:", proyecto);

    if (proyecto) {
        // rellenar campos
        document.getElementById("titulo").value = proyecto.projName;
        document.getElementById("inversion").value = proyecto.projBudget;
        document.getElementById("categoria").value = proyecto.projCategory;
        document.getElementById("fecha").value = proyecto.projStartDate;
        document.getElementById("address").value = proyecto.projAddress;
        document.getElementById("latitude").value = proyecto.projLat;
        document.getElementById("longitude").value = proyecto.projLong;
        document.getElementById("requerimientos").value = proyecto.projRequirementsPostulation;

    } else {
        console.log("No hay datos en localSotrage");
    }
}