console.log("Script cargado (Modificado con Reiniciar)");


let letras = [];
const formLetras = document.getElementById('formLetras');
const inputLetra = document.getElementById('inputLetra');
const letrasIngresadasDiv = document.getElementById('letrasIngresadas');
const letrasEliminadasDiv = document.getElementById('letrasEliminadas');

function agregarLetra() {
    console.log("Función agregarLetra() llamada");
    const letra = inputLetra.value;
    if (letras.length < 5 && /^[a-zA-Z]+$/.test(letra)) {
        letras.splice(letras.length, 0, letra); // Usando splice para agregar al final
        console.log("Letra agregada:", letra, "Array actual:", letras);
        actualizarLetrasIngresadas();
        inputLetra.value = '';
    } else if (letras.length >= 5) {
        alert("Ya ingresaste el máximo de 5 letras.");
    } else if (!/^[a-zA-Z]+$/.test(letra)) {
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

function reiniciarEjercicio1() {
    console.log("Función reiniciarEjercicio1() llamada");
    letras = [];
    letrasIngresadasDiv.textContent = '';
    letrasEliminadasDiv.textContent = '';
    formLetras.reset();
    console.log("Ejercicio 1 reiniciado. Array letras:", letras);
}

formLetras.addEventListener('submit', function(event) {
    event.preventDefault();
});


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
    const nombre = inputNombreInicial.value;
    if (nombresInicialesArray.length < 3 && /^[a-zA-Z\s]+$/.test(nombre)) {
        nombresInicialesArray.splice(nombresInicialesArray.length, 0, nombre); // Usando splice para agregar al final
        console.log("Nombre inicial agregado:", nombre, "Array actual:", nombresInicialesArray);
        actualizarNombresIniciales();
        inputNombreInicial.value = '';
    } else if (nombresInicialesArray.length >= 3) {
        alert("Ya ingresaste el máximo de 3 nombres iniciales.");
    } else if (!/^[a-zA-Z\s]+$/.test(nombre)) {
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
    const nuevoNombre = inputNuevoNombre.value;
    if (nombresInicialesArray.length === 3 && nombresMostrados && /^[a-zA-Z\s]+$/.test(nuevoNombre)) {
        nombresInicialesArray.splice(1, 0, nuevoNombre); // Usando splice para insertar
        console.log("Nombre insertado:", nuevoNombre, "Array resultante:", nombresInicialesArray);
        nombresResultantesDiv.textContent = "Nombres resultantes: " + nombresInicialesArray.join(', ');
        inputNuevoNombre.value = '';
        formNuevoNombre.reset();
    } else if (nombresInicialesArray.length < 3) {
        alert("Por favor, ingresa los 3 nombres iniciales primero.");
    } else if (!nombresMostrados) {
        alert("Por favor, haz clic en 'Mostrar Nombres' primero.");
    } else if (!/^[a-zA-Z\s]+$/.test(nuevoNombre)) {
        alert("Por favor, ingresa un nombre válido.");
    }
}

function reiniciarEjercicio2() {
    console.log("Función reiniciarEjercicio2() llamada");
    nombresInicialesArray = [];
    nombresInicialesDiv.textContent = '';
    nombresResultantesDiv.textContent = '';
    nombresMostrados = false;
    formNombresIniciales.reset();
    formNuevoNombre.reset();
    console.log("Ejercicio 2 reiniciado. Array nombresInicialesArray:", nombresInicialesArray);
}

formNombresIniciales.addEventListener('submit', function(event) {
    event.preventDefault();
});

formNuevoNombre.addEventListener('submit', function(event) {
    event.preventDefault();
});


let elementosInicialesArray = [];
const formElementosIniciales = document.getElementById('formElementosIniciales');
const inputElementoInicial = document.getElementById('inputElementoInicial');
const elementosInicialesDiv = document.getElementById('elementosIniciales');
const formReemplazarElementos = document.getElementById('formReemplazarElementos');
const inputReemplazo1 = document.getElementById('inputReemplazo1');
const inputReemplazo2 = document.getElementById('inputReemplazo2');
const elementosResultantesDiv = document.getElementById('elementosResultantes');
let elementosAgregados = 0;

function agregarElementoInicial() {
    console.log("Función agregarElementoInicial() llamada");
    const elemento = inputElementoInicial.value;
    if (elementosInicialesArray.length < 5) {
        elementosInicialesArray.splice(elementosInicialesArray.length, 0, elemento); // Usando splice para agregar al final
        console.log("Elemento inicial agregado:", elemento, "Array actual:", elementosInicialesArray);
        actualizarElementosIniciales();
        inputElementoInicial.value = '';
        elementosAgregados++;
    } else {
        alert("Ya ingresaste el máximo de 5 elementos iniciales.");
    }
}

function actualizarElementosIniciales() {
    elementosInicialesDiv.textContent = "Elementos ingresados: " + elementosInicialesArray.join(', ');
}

function reemplazarElementos() {
    console.log("Función reemplazarElementos() llamada");
    const reemplazo1 = inputReemplazo1.value;
    const reemplazo2 = inputReemplazo2.value;
    if (elementosInicialesArray.length === 5) {
        const eliminados = elementosInicialesArray.splice(2, 2, reemplazo1, reemplazo2);
        console.log("Elementos eliminados:", eliminados, "Elementos agregados:", [reemplazo1, reemplazo2], "Array resultante:", elementosInicialesArray);
        elementosResultantesDiv.textContent = "Elementos resultantes: " + elementosInicialesArray.join(', ');
        formReemplazarElementos.reset();
    } else {
        alert("Por favor, ingresa los 5 elementos iniciales primero.");
    }
}

function reiniciarEjercicio3() {
    console.log("Función reiniciarEjercicio3() llamada");
    elementosInicialesArray = [];
    elementosInicialesDiv.textContent = '';
    elementosResultantesDiv.textContent = '';
    formElementosIniciales.reset();
    formReemplazarElementos.reset();
    elementosAgregados = 0;
    console.log("Ejercicio 3 reiniciado. Array elementosInicialesArray:", elementosInicialesArray);
}

formElementosIniciales.addEventListener('submit', function(event) {
    event.preventDefault();
});

formReemplazarElementos.addEventListener('submit', function(event) {
    event.preventDefault();
});