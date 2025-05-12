console.log("main.js cargado");

// Función genérica para actualizar el span con los elementos usando reduce
const actualizarElementosSpan = (spanElement, array) => {
    spanElement.textContent = array.reduce((acc, curr, index) => acc + curr + (index < array.length - 1 ? ', ' : ''), '');
};

// Función genérica para validar si un input está vacío
const validarInputNoVacio = (inputValue) => inputValue.trim() !== '';

// 1) Suma de elementos (números y palabras)
const inputNumeroPalabra = document.getElementById('numeroPalabra');
const guardarNumeroPalabraBtn = document.getElementById('guardarNumeroPalabra');
const sumarElementosBtn = document.getElementById('sumarElementos');
const reiniciarElementosBtn = document.getElementById('reiniciarElementos');
const palabrasIngresadasSpan = document.getElementById('palabrasIngresadas');
const sumaPalabrasSpan = document.getElementById('sumaPalabras');
const numerosIngresadosSpan = document.getElementById('numerosIngresados');
const sumaNumerosSpan = document.getElementById('sumaNumeros');

let palabras = [];
let numeros = [];

guardarNumeroPalabraBtn.addEventListener('click', () => {
    const valor = inputNumeroPalabra.value.trim();
    if (!validarInputNoVacio(valor)) {
        console.log('Error: No se ingresó ningún valor.');
        return;
    }

    const esNumero = !isNaN(valor);
    if (!esNumero) {
        palabras.push(valor);
        actualizarElementosSpan(palabrasIngresadasSpan, palabras);
        console.log(`Palabra "${valor}" guardada. Palabras: ${palabras}`);
    } else {
        numeros.push(Number(valor));
        actualizarElementosSpan(numerosIngresadosSpan, numeros);
        console.log(`Número "${valor}" guardado. Números: ${numeros}`);
    }
    inputNumeroPalabra.value = '';
});

sumarElementosBtn.addEventListener('click', () => {
    const sumaPalabras = palabras.reduce((acc, palabra) => acc + palabra, '');
    sumaPalabrasSpan.textContent = sumaPalabras;
    console.log(`Suma de palabras: ${sumaPalabras}`);

    const sumaNumeros = numeros.reduce((acc, numero) => acc + numero, 0);
    sumaNumerosSpan.textContent = sumaNumeros;
    console.log(`Suma de números: ${sumaNumeros}`);
});

reiniciarElementosBtn.addEventListener('click', () => {
    palabras = [];
    numeros = [];
    actualizarElementosSpan(palabrasIngresadasSpan, palabras);
    sumaPalabrasSpan.textContent = '';
    actualizarElementosSpan(numerosIngresadosSpan, numeros);
    sumaNumerosSpan.textContent = '';
    console.log('Se reiniciaron los elementos (números y palabras).');
});

// 2) Multiplicación de enteros
const inputEntero = document.getElementById('entero');
const guardarEnteroBtn = document.getElementById('guardarEntero');
const multiplicarEnterosBtn = document.getElementById('multiplicarEnteros');
const reiniciarEnterosBtn = document.getElementById('reiniciarEnteros');
const enterosIngresadosSpan = document.getElementById('enterosIngresados');
const resultadoMultiplicacionP = document.getElementById('resultadoMultiplicacion');

let enteros = [];

guardarEnteroBtn.addEventListener('click', () => {
    const valor = inputEntero.value.trim();
    if (!/^-?\d+$/.test(valor)) {
        console.log('Error: Ingrese un número entero válido.');
        return;
    }
    enteros.push(Number(valor));
    actualizarElementosSpan(enterosIngresadosSpan, enteros);
    console.log(`Entero "${valor}" guardado. Enteros: ${enteros}`);
    inputEntero.value = '';
});

multiplicarEnterosBtn.addEventListener('click', () => {
    if (enteros.length === 0) {
        resultadoMultiplicacionP.textContent = 'No hay números para multiplicar.';
        console.log('No hay números para multiplicar.');
        return;
    }
    const producto = enteros.reduce((acc, numero) => acc * numero, 1);
    resultadoMultiplicacionP.textContent = `La multiplicación de ${enteros.reduce((acc, curr, index) => acc + curr + (index < enteros.length - 1 ? ',' : ''), '')} resulta en ${producto}`;
    console.log(`La multiplicación de ${enteros.join(' * ')} = ${producto}`);
});

reiniciarEnterosBtn.addEventListener('click', () => {
    enteros = [];
    actualizarElementosSpan(enterosIngresadosSpan, enteros);
    resultadoMultiplicacionP.textContent = '';
    console.log('Se reiniciaron los enteros.');
});

// 3) Suma de precios
const inputPrecio = document.getElementById('precio');
const guardarPrecioBtn = document.getElementById('guardarPrecio');
const sumarPreciosBtn = document.getElementById('sumarPrecios');
const reiniciarPreciosBtn = document.getElementById('reiniciarPrecios');
const preciosIngresadosSpan = document.getElementById('preciosIngresados');
const totalPreciosP = document.getElementById('totalPrecios');

let precios = [];

guardarPrecioBtn.addEventListener('click', () => {
    const valor = inputPrecio.value.trim();
    if (!/^-?\d+(\.\d+)?$/.test(valor)) {
        console.log('Error: Ingrese un precio válido.');
        return;
    }
    precios.push(Number(valor));
    actualizarElementosSpan(preciosIngresadosSpan, precios);
    console.log(`Precio "${valor}" guardado. Precios: ${precios}`);
    inputPrecio.value = '';
});

sumarPreciosBtn.addEventListener('click', () => {
    if (precios.length === 0) {
        totalPreciosP.textContent = 'No hay precios para sumar.';
        console.log('No hay precios para sumar.');
        return;
    }
    const total = precios.reduce((acc, precio) => acc + precio, 0);
    totalPreciosP.textContent = `La suma de los precios ingresados es: ${precios.reduce((acc, curr, index) => acc + curr + (index < precios.length - 1 ? ' + ' : ''), '')} = ${total.toFixed(2)}`;
    console.log(`La suma de los precios (${precios.join(' + ')}) = ${total.toFixed(2)}`);
});

reiniciarPreciosBtn.addEventListener('click', () => {
    precios = [];
    actualizarElementosSpan(preciosIngresadosSpan, precios);
    totalPreciosP.textContent = '';
    console.log('Se reiniciaron los precios.');
});