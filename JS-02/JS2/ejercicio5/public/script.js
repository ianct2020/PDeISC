console.log("Script cargado");

// Ejercicio 1: Eliminar letras
let letras = [];
const formLetras = document.getElementById('formLetras');
const inputLetra = document.getElementById('inputLetra');
const letrasIngresadasDiv = document.getElementById('letrasIngresadas');
const letrasEliminadasDiv = document.getElementById('letrasEliminadas');

function agregarLetra() {
    console.log("Función agregarLetra() llamada");
    if (letras.length < 5 && inputLetra.value.match(/^[a-zA-Z]+$/)) {
        letras.push(inputLetra.value);
        console.log("Letra agregada:", inputLetra.value, "Array actual:", letras);
        actualizarLetrasIngresadas();
        inputLetra.value = '';
    } else if (letras.length >= 5) {
        alert("Ya ingresaste el máximo de 5 letras.");
    } else {
        alert("Por favor, ingresa solo letras.");
    }
}

function actualizarLetrasIngresadas() {
    letrasIngresadasDiv.textContent = "Letras ingresadas: " + letras.join(', ');
}

function eliminarDosLetras() {
    console.log("Función eliminarDosLetras() llamada");
    if (letras.length >= 2) {
        const eliminadas = letras.splice(0, 2);
        console.log("Letras eliminadas:", eliminadas, "Array restante:", letras);
        letrasEliminadasDiv.textContent = "Letras eliminadas: " + eliminadas.join(', ');
        actualizarLetrasIngresadas();
    } else {
        alert("No hay suficientes letras para eliminar (se necesitan al menos 2).");
    }
}

formLetras.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita la recarga de la página al enviar el formulario
});

// Ejercicio 2: Insertar nombre
let nombresInicialesArray = [];
const formNombresIniciales = document.getElementById('formNombresIniciales');
const inputNombreInicial = document.getElementById('inputNombreInicial');
const nombresInicialesDiv = document.getElementById('nombresIniciales');
const formNuevoNombre = document.getElementById('formNuevoNombre');
const inputNuevoNombre = document.getElementById('inputNuevoNombre');
const nombresResultantesDiv = document.getElementById('nombresResultantes');
let nombresMostrados = false;

function agregarNombreInicial() {
    console.log("Función agregarNombreInicial() llamada");
    if (nombresInicialesArray.length < 3 && inputNombreInicial.value.match(/^[a-zA-Z\s]+$/)) {
        nombresInicialesArray.push(inputNombreInicial.value);
        console.log("Nombre inicial agregado:", inputNombreInicial.value, "Array actual:", nombresInicialesArray);
        actualizarNombresIniciales();
        inputNombreInicial.value = '';
    } else if (nombresInicialesArray.length >= 3) {
        alert("Ya ingresaste el máximo de 3 nombres iniciales.");
    } else {
        alert("Por favor, ingresa solo nombres.");
    }
}

function actualizarNombresIniciales() {
    nombresInicialesDiv.textContent = "Nombres ingresados: " + nombresInicialesArray.join(', ');
}

function mostrarNombres() {
    console.log("Función mostrarNombres() llamada");
    if (nombresInicialesArray.length === 3) {
        nombresResultantesDiv.textContent = "Nombres iniciales: " + nombresInicialesArray.join(', ');
        nombresMostrados = true;
    } else {
        alert("Por favor, ingresa los 3 nombres iniciales primero.");
    }
}

function insertarNombre() {
    console.log("Función insertarNombre() llamada");
    if (nombresInicialesArray.length === 3 && nombresMostrados && inputNuevoNombre.value.match(/^[a-zA-Z\s]+$/)) {
        const nuevoNombre = inputNuevoNombre.value;
        nombresInicialesArray.splice(1, 0, nuevoNombre);
        console.log("Nombre insertado:", nuevoNombre, "Array resultante:", nombresInicialesArray);
        nombresResultantesDiv.textContent = "Nombres resultantes: " + nombresInicialesArray.join(', ');
        inputNuevoNombre.value = '';
        formNuevoNombre.reset();
    } else if (nombresInicialesArray.length < 3) {
        alert("Por favor, ingresa los 3 nombres iniciales primero.");
    } else if (!nombresMostrados) {
        alert("Por favor, haz clic en 'Mostrar Nombres' primero.");
    } else {
        alert("Por favor, ingresa un nombre válido.");
    }
}

formNombresIniciales.addEventListener('submit', function(event) {
    event.preventDefault();
});

formNuevoNombre.addEventListener('submit', function(event) {
    event.preventDefault();
});

// Ejercicio 3: Reemplazar elementos
let elementosInicialesArray = [];
const formElementosIniciales = document.getElementById('formElementosIniciales');
const inputElementoInicial = document.getElementById('inputElementoInicial');
const elementosInicialesDiv = document.getElementById('elementosIniciales');
const formReemplazarElementos = document.getElementById('formReemplazarElementos');
const inputReemplazo1 = document.getElementById('inputReemplazo1');
const inputReemplazo2 = document.getElementById('inputReemplazo2');
const elementosResultantesDiv = document.getElementById('elementosResultantes');

function agregarElementoInicial() {
    console.log("Función agregarElementoInicial() llamada");
    if (elementosInicialesArray.length < 5) {
        elementosInicialesArray.push(inputElementoInicial.value);
        console.log("Elemento inicial agregado:", inputElementoInicial.value, "Array actual:", elementosInicialesArray);
        actualizarElementosIniciales();
        inputElementoInicial.value = '';
    } else {
        alert("Ya ingresaste el máximo de 5 elementos iniciales.");
    }
}

function actualizarElementosIniciales() {
    elementosInicialesDiv.textContent = "Elementos ingresados: " + elementosInicialesArray.join(', ');
}

function reemplazarElementos() {
    console.log("Función reemplazarElementos() llamada");
    if (elementosInicialesArray.length === 5) {
        const reemplazo1 = inputReemplazo1.value;
        const reemplazo2 = inputReemplazo2.value;
        const eliminados = elementosInicialesArray.splice(2, 2, reemplazo1, reemplazo2);
        console.log("Elementos eliminados:", eliminados, "Elementos agregados:", [reemplazo1, reemplazo2], "Array resultante:", elementosInicialesArray);
        elementosResultantesDiv.textContent = "Elementos resultantes: " + elementosInicialesArray.join(', ');
        formReemplazarElementos.reset();
    } else {
        alert("Por favor, ingresa los 5 elementos iniciales primero.");
    }
}

formElementosIniciales.addEventListener('submit', function(event) {
    event.preventDefault();
});

formReemplazarElementos.addEventListener('submit', function(event) {
    event.preventDefault();
});