console.log('script.js cargado');

// Función para verificar si una cadena contiene solo letras y espacios
function esSoloLetras(str) {
    return /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/.test(str);
}

// Función para verificar si un valor es un número
function esNumero(valor) {
    return /^[0-9]+$/.test(valor);
}

// Parte 1: Multiplicar Números por 3
let numeros = [];
const ingresarNumeroInput = document.getElementById('ingresarNumero');
const guardarNumeroBtn = document.getElementById('guardarNumero');
const mostrarMultiplicadosBtn = document.getElementById('mostrarMultiplicados');
const reiniciarNumerosBtn = document.getElementById('reiniciarNumeros');
const resultadoMultiplicacionDiv = document.getElementById('resultadoMultiplicacion');
const numerosGuardadosParrafo = document.getElementById('numerosGuardados');

guardarNumeroBtn.addEventListener('click', () => {
    const numero = ingresarNumeroInput.value;
    if (numero !== "" && esNumero(numero)) {
        numeros.push(parseInt(numero));
        console.log('Número guardado:', numero);
        numerosGuardadosParrafo.textContent = `Números ingresados: ${numeros.join('; ')}`;
        ingresarNumeroInput.value = '';
    } else if (!esNumero(numero) && numero !== "") {
        console.log('Por favor, ingresa solo números.');
        alert('Por favor, ingresa solo números.');
    } else {
        console.log('Por favor, ingresa un número.');
        alert('Por favor, ingresa un número.');
    }
});

mostrarMultiplicadosBtn.addEventListener('click', () => {
    if (numeros.length > 0) {
        const multiplicados = numeros.map(numero => numero * 3);
        console.log('Números multiplicados por 3:', multiplicados);
        resultadoMultiplicacionDiv.innerHTML = multiplicados.map((resultado, index) => {
            return `<p>El ${numeros[index]} multiplicado por 3 es igual a ${resultado}</p>`;
        }).join('');
    } else {
        console.log('No hay números para multiplicar.');
        resultadoMultiplicacionDiv.textContent = 'No hay números para multiplicar.';
    }
});

reiniciarNumerosBtn.addEventListener('click', () => {
    numeros = [];
    numerosGuardadosParrafo.textContent = 'Números ingresados: ';
    resultadoMultiplicacionDiv.textContent = '';
    console.log('Array de números reiniciado:', numeros);
});

// Parte 2: Convertir Nombres a Mayúsculas
let nombres = [];
const ingresarNombreInput = document.getElementById('ingresarNombre');
const guardarNombreBtn = document.getElementById('guardarNombre');
const convertirMayusculasBtn = document.getElementById('convertirMayusculas');
const reiniciarNombresBtn = document.getElementById('reiniciarNombres');
const resultadoMayusculasDiv = document.getElementById('resultadoMayusculas');
const nombresGuardadosParrafo = document.getElementById('nombresGuardados');

guardarNombreBtn.addEventListener('click', () => {
    const nombre = ingresarNombreInput.value.trim();
    if (nombre !== "" && esSoloLetras(nombre)) {
        nombres.push(nombre);
        console.log('Nombre guardado:', nombre);
        nombresGuardadosParrafo.textContent = `Nombres ingresados: ${nombres.join('; ')}`;
        ingresarNombreInput.value = '';
    } else if (!esSoloLetras(nombre) && nombre !== "") {
        console.log('Por favor, ingresa solo letras y espacios.');
        alert('Por favor, ingresa solo letras y espacios.');
    } else {
        console.log('Por favor, ingresa un nombre.');
        alert('Por favor, ingresa un nombre.');
    }
});

convertirMayusculasBtn.addEventListener('click', () => {
    if (nombres.length > 0) {
        const nombresEnMayusculas = nombres.map(nombre => nombre.toUpperCase());
        console.log('Nombres en mayúsculas:', nombresEnMayusculas);
        resultadoMayusculasDiv.textContent = `Nombres ingresados en mayúsculas: ${nombresEnMayusculas.join('; ')}`;
    } else {
        console.log('No hay nombres para convertir.');
        resultadoMayusculasDiv.textContent = 'No hay nombres para convertir.';
    }
});

reiniciarNombresBtn.addEventListener('click', () => {
    nombres = [];
    nombresGuardadosParrafo.textContent = 'Nombres ingresados: ';
    resultadoMayusculasDiv.textContent = '';
    console.log('Array de nombres reiniciado:', nombres);
});

// Parte 3: Agregar IVA a Precios
let precios = [];
const ingresarPrecioInput = document.getElementById('ingresarPrecio');
const guardarPrecioBtn = document.getElementById('guardarPrecio');
const calcularIVABtn = document.getElementById('calcularIVA');
const reiniciarPreciosBtn = document.getElementById('reiniciarPrecios');
const resultadoIVADiv = document.getElementById('resultadoIVA');
const preciosGuardadosParrafo = document.getElementById('preciosGuardados');

guardarPrecioBtn.addEventListener('click', () => {
    const precio = ingresarPrecioInput.value;
    if (precio !== "" && !isNaN(parseFloat(precio)) && isFinite(precio)) {
        precios.push(parseFloat(precio));
        console.log('Precio guardado:', precio);
        preciosGuardadosParrafo.textContent = `Precios ingresados: ${precios.join('; ')}`;
        ingresarPrecioInput.value = '';
    } else {
        console.log('Por favor, ingresa un precio válido.');
        alert('Por favor, ingresa un precio válido.');
    }
});

calcularIVABtn.addEventListener('click', () => {
    if (precios.length > 0) {
        const preciosConIVA = precios.map(precio => {
            const iva = precio * 0.21;
            const precioConIVA = precio + iva;
            return `${precio}$ con el IVA incluido ${precioConIVA.toFixed(2)}$`;
        });
        console.log('Precios con IVA:', preciosConIVA);
        resultadoIVADiv.innerHTML = preciosConIVA.map(resultado => `<p>${resultado}</p>`).join('');
    } else {
        console.log('No hay precios para calcular el IVA.');
        resultadoIVADiv.textContent = 'No hay precios para calcular el IVA.';
    }
});

reiniciarPreciosBtn.addEventListener('click', () => {
    precios = [];
    preciosGuardadosParrafo.textContent = 'Precios ingresados: ';
    resultadoIVADiv.textContent = '';
    console.log('Array de precios reiniciado:', precios);
});