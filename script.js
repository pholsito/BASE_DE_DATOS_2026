const PASSWORD = "1234";

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
let admin = false;

// LOGIN
function login() {
    let pass = document.getElementById("password").value;

    if (pass === PASSWORD) {
        admin = true;
        document.getElementById("adminPanel").style.display = "block";
        mostrarTareas();
    } else {
        alert("Contraseña incorrecta");
    }
}

// VOLVER INICIO
function irInicio() {
    document.getElementById("adminPanel").style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// GUARDAR
function guardar() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

// AGREGAR TAREA COMPLETA
function agregarTarea() {
    let titulo = document.getElementById("titulo").value;
    let semana = document.getElementById("semana").value;
    let tarea = document.getElementById("tarea").value;
    let link = document.getElementById("link").value;
    let imagen = document.getElementById("imagen").value;
    let archivo = document.getElementById("archivo").files[0];

    let nueva = { titulo, semana, tarea, link, imagen };

    if (archivo) {
        let reader = new FileReader();

        reader.onload = function(e) {
            nueva.archivo = e.target.result;

            tareas.push(nueva);
            guardar();
            mostrarTareas();
        };

        reader.readAsDataURL(archivo);
    } else {
        tareas.push(nueva);
        guardar();
        mostrarTareas();
    }
}

// ELIMINAR
function eliminar(i) {
    if (!admin) return;

    if (confirm("¿Eliminar tarea?")) {
        tareas.splice(i, 1);
        guardar();
        mostrarTareas();
    }
}

// MOSTRAR
function mostrarTareas() {
    let cont = document.getElementById("contenedor");
    cont.innerHTML = "";

    tareas.forEach((t, i) => {
        cont.innerHTML += `
        <div class="tarea">
            ${t.imagen ? `<img src="${t.imagen}">` : ""}
            <div class="contenido">
                <h3>${t.titulo}</h3>
                <p>${t.semana} - ${t.tarea}</p>

                ${t.archivo ? `<a href="${t.archivo}" target="_blank">📂 Ver archivo</a>` : ""}
                ${t.link ? `<a href="${t.link}" target="_blank">🔗 Ver link</a>` : ""}

                ${admin ? `<button class="btnEliminar" onclick="eliminar(${i})">Eliminar</button>` : ""}
            </div>
        </div>
        `;
    });
}

mostrarTareas();