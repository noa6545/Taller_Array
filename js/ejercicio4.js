let listadoCita = [];

// Bloquear fechas anteriores en el selector del calendario al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const hoy = obtenerFechaActual();
    document.getElementById("fechaCita").setAttribute("min", hoy);

    // Manejar el evento submit del formulario desde JS
    const formulario = document.getElementById("consulta");
    formulario.addEventListener("submit", agregarCita);
});

// Función auxiliar para obtener la fecha de hoy en formato YYYY-MM-DD (hora local)
function obtenerFechaActual() {
    const fecha = new Date();
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
}

function agregarCita(evento) {
    evento.preventDefault(); // Evita que la página se recargue al enviar

    let fechaCita = document.getElementById("fechaCita").value.trim();
    let nombreMascota = document.getElementById("nombreMascota").value.trim();
    let tipoMascota = document.getElementById("tipoMascota").value;
    let razaMascota = document.getElementById("razaMascota").value.trim();
    let edadMascota = document.getElementById("edadMascota").value.trim();
    let tipoConsulta = document.getElementById("tipoConsulta").value;

    // Limpiar marcas de error previas
    const campos = ["fechaCita", "nombreMascota", "tipoMascota", "razaMascota", "edadMascota", "tipoConsulta"];
    campos.forEach(id => document.getElementById(id).classList.remove("is-invalid"));

    // 1. Validar que ningún campo esté vacío
    if (fechaCita === "") {
        alert("Por favor ingrese la fecha de la cita 😊");
        document.getElementById("fechaCita").classList.add("is-invalid");
        return;
    }

    // 2. Validar que la fecha no sea anterior a la fecha actual
    if (fechaCita < obtenerFechaActual()) {
        alert("La fecha de la cita no puede ser anterior a hoy 📅⚠️");
        document.getElementById("fechaCita").classList.add("is-invalid");
        return;
    }

    if (nombreMascota === "") {
        alert("Por favor ingrese el nombre de la mascota 😊");
        document.getElementById("nombreMascota").classList.add("is-invalid");
        return;
    }

    // 3. Validar lista desplegable de tipo de mascota
    if (tipoMascota === "") {
        alert("Por favor seleccione un tipo de mascota válido");
        document.getElementById("tipoMascota").classList.add("is-invalid");
        return;
    }

    if (razaMascota === "") {
        alert("Por favor ingrese la raza de la mascota 😊");
        document.getElementById("razaMascota").classList.add("is-invalid");
        return;
    }

    // 4. Validar que la edad sea un número válido (0 o mayor)
    if (edadMascota === "" || isNaN(edadMascota) || Number(edadMascota) < 0) {
        alert("Por favor ingrese una edad válida (0 o mayor) ⚠️");
        document.getElementById("edadMascota").classList.add("is-invalid");
        return;
    }

    // 5. Validar lista desplegable de tipo de consulta
    if (tipoConsulta === "") {
        alert("Por favor seleccione un tipo de consulta válido");
        document.getElementById("tipoConsulta").classList.add("is-invalid");
        return;
    }

    // 6. Validar si ya existe una cita para la misma mascota en la misma fecha
    let citaDuplicada = listadoCita.some(
        cita => cita.itemnombreMascota.toLowerCase() === nombreMascota.toLowerCase() && cita.itemfechaCita === fechaCita
    );

    if (citaDuplicada) {
        alert(`La mascota ${nombreMascota} ya tiene una cita registrada para el ${fechaCita} ⚠️`);
        document.getElementById("nombreMascota").classList.add("is-invalid");
        return;
    }

    // Guardar información y limpiar formulario
    listadoCita.push({
        itemfechaCita: fechaCita,
        itemnombreMascota: nombreMascota,
        itemtipoMascota: tipoMascota,
        itemrazaMascota: razaMascota,
        itemedadMascota: Number(edadMascota),
        itemtipoConsulta: tipoConsulta
    });

    document.getElementById("consulta").reset();
    alert("Se ha guardado tu información 😉👍");

    mostrarCita();
}

function mostrarCita() {
    let tabla = document.getElementById("tabla");
    tabla.innerHTML = "";

    for (let i = 0; i < listadoCita.length; i++) {
        tabla.innerHTML += `
        <tr>
            <td>${listadoCita[i].itemfechaCita}</td>
            <td>${listadoCita[i].itemnombreMascota}</td>
            <td>${listadoCita[i].itemtipoMascota}</td>
            <td>${listadoCita[i].itemrazaMascota}</td>
            <td>${listadoCita[i].itemedadMascota} año(s)</td>
            <td>${listadoCita[i].itemtipoConsulta}</td>
        </tr>`;
    }

    document.getElementById("Citas").innerText = listadoCita.length;
}
