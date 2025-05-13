let palabras = [];
let perroIngresado = false;
const maxPalabras = 5;
const palabraInput = document.getElementById('palabraInput');
const palabraError = document.getElementById('palabraError');
const palabrasIngresadasSpan = document.getElementById('palabrasIngresadas');
const revelarPalabraBtn = document.getElementById('revelarPalabraBtn');
const posicionPalabraParrafo = document.getElementById('posicionPalabra');
const multiplesPerroParrafo = document.getElementById('multiplesPerro');

console.log('Ejercicio 1: Script cargado.');

function agregarPalabra() {
    const palabra = palabraInput.value.trim();
    if (!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(palabra)) {
        palabraError.textContent = 'Por favor, ingresa solo letras.';
        return;
    }
    const palabraLower = palabra.toLowerCase();
    if (palabraLower.length === 0) {
        palabraError.textContent = 'Debes ingresar al menos una letra.';
        return;
    }
    if (palabras.length < maxPalabras) {
        if (palabraLower === 'perro' && !perroIngresado) {
            perroIngresado = true;
        } else if (palabraLower === 'perro' && perroIngresado) {
            multiplesPerroParrafo.textContent = 'La palabra "perro" ya fue ingresada.';
        }
        palabras.push(palabraLower);
        console.log('Ejercicio 1 - Palabra guardada:', palabraLower);
        console.log('Ejercicio 1 - Palabras actuales:', palabras);
        palabrasIngresadasSpan.textContent = 'Palabras ingresadas: ' + palabras.join(', ');
        palabraInput.value = '';
        palabraError.textContent = '';
        if (palabras.length === maxPalabras) {
            if (!perroIngresado) {
                palabraError.textContent = 'Debes ingresar la palabra "perro" antes de completar las 5 palabras.';
                palabras.pop();
                console.log('Ejercicio 1 - Error: "perro" no ingresado. Última palabra eliminada.', palabras);
                palabrasIngresadasSpan.textContent = 'Palabras ingresadas: ' + palabras.join(', ');
            } else {
                revelarPalabraBtn.disabled = false;
                const perroCount = palabras.filter(p => p === 'perro').length;
                if (perroCount > 1) {
                    multiplesPerroParrafo.textContent = `La palabra "perro" se ingresó ${perroCount} veces.`;
                } else {
                    multiplesPerroParrafo.textContent = '';
                }
            }
        }
    }
}

function revelarPosicionPalabra() {
    if (perroIngresado) {
        let indices = [];
        let index = palabras.indexOf('perro');
        while (index !== -1) {
            indices.push(index + 1);
            index = palabras.indexOf('perro', index + 1);
        }
        if (indices.length > 0) {
            posicionPalabraParrafo.textContent = `La palabra "perro" se encuentra en las posiciones: ${indices.join(', ')}`;
            console.log('Ejercicio 1 - Posición(es) de "perro":', indices);
        } else {
            posicionPalabraParrafo.textContent = 'La palabra "perro" no se encontró.';
            console.log('Ejercicio 1 - Error: "perro" no encontrado en el array.');
        }
    } else {
        palabraError.textContent = 'Primero debes ingresar la palabra "perro" y completar las 5 palabras.';
    }
}

function reiniciarEjercicio1() {
    palabras = [];
    perroIngresado = false;
    palabraInput.value = '';
    palabraError.textContent = '';
    palabrasIngresadasSpan.textContent = 'Palabras ingresadas: ';
    revelarPalabraBtn.disabled = true;
    posicionPalabraParrafo.textContent = '';
    multiplesPerroParrafo.textContent = '';
    console.log('Ejercicio 1 - Reiniciado.');
}

// Ejercicio 2
let numeros = [];
let cincuentaIngresado = false;
const maxNumeros = 5;
const numeroInput = document.getElementById('numeroInput');
const numeroError = document.getElementById('numeroError');
const numerosIngresadosSpan = document.getElementById('numerosIngresados');
const revelarNumeroBtn = document.getElementById('revelarNumeroBtn2');
const posicionNumeroParrafo = document.getElementById('posicionNumero');

console.log('Ejercicio 2: Script cargado.');

function agregarNumero() {
    const numero = parseInt(numeroInput.value);
    if (isNaN(numero)) {
        numeroError.textContent = 'Por favor, ingresa un número válido.';
        return;
    }
    if (numeros.length < maxNumeros) {
        if (numero === 50) {
            cincuentaIngresado = true;
        }
        numeros.push(numero);
        console.log('Ejercicio 2 - Número guardado:', numero);
        console.log('Ejercicio 2 - Números actuales:', numeros);
        numerosIngresadosSpan.textContent = 'Números ingresados: ' + numeros.join(', ');
        numeroInput.value = '';
        numeroError.textContent = '';
        if (numeros.length === maxNumeros) {
            if (!cincuentaIngresado) {
                numeroError.textContent = 'Debes ingresar el número 50 antes de completar los 5 números.';
                numeros.pop();
                console.log('Ejercicio 2 - Error: 50 no ingresado. Último número eliminado.', numeros);
                numerosIngresadosSpan.textContent = 'Números ingresados: ' + numeros.join(', ');
            } else {
                revelarNumeroBtn.disabled = false;
            }
        }
    }
}

function revelarPosicionNumero() {
    if (cincuentaIngresado) {
        let indices = [];
        let index = numeros.indexOf(50);
        while (index !== -1) {
            indices.push(index + 1);
            index = numeros.indexOf(50, index + 1);
        }
        if (indices.length > 0) {
            posicionNumeroParrafo.textContent = `El número 50 se encuentra en las posiciones: ${indices.join(', ')}`;
            console.log('Ejercicio 2 - Posición(es) del 50:', indices);
        } else {
            posicionNumeroParrafo.textContent = 'El número 50 no se encontró.';
            console.log('Ejercicio 2 - Error: 50 no encontrado en el array.');
        }
    } else {
        numeroError.textContent = 'Primero debes ingresar el número 50 y completar los 5 números.';
    }
}

function reiniciarEjercicio2() {
    numeros = [];
    cincuentaIngresado = false;
    numeroInput.value = '';
    numeroError.textContent = '';
    numerosIngresadosSpan.textContent = 'Números ingresados: ';
    revelarNumeroBtn.disabled = true;
    posicionNumeroParrafo.textContent = '';
    console.log('Ejercicio 2 - Reiniciado.');
}

// Ejercicio 3
let ciudades = [];
const maxCiudades = 5;
const ciudadInput = document.getElementById('ciudadInput');
const ciudadError = document.getElementById('ciudadError');
const ciudadesIngresadasSpan = document.getElementById('ciudadesIngresadas');
const buscarMadridBtn = document.getElementById('buscarMadridBtn');
const resultadoMadridParrafo = document.getElementById('resultadoMadrid');

console.log('Ejercicio 3: Script cargado.');

function agregarCiudad() {
    const ciudad = ciudadInput.value.trim();
    if (!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(ciudad)) {
        ciudadError.textContent = 'Por favor, ingresa solo letras.';
        return;
    }
    if (ciudad.length < 3) {
        ciudadError.textContent = 'La ciudad debe tener al menos 3 letras.';
        return;
    }
    if (ciudades.length < maxCiudades) {
        ciudades.push(ciudad.toLowerCase());
        console.log('Ejercicio 3 - Ciudad guardada:', ciudad.toLowerCase());
        console.log('Ejercicio 3 - Ciudades actuales:', ciudades);
        ciudadesIngresadasSpan.textContent = 'Ciudades ingresadas: ' + ciudades.join(', ');
        ciudadInput.value = '';
        ciudadError.textContent = '';
        if (ciudades.length === maxCiudades) {
            buscarMadridBtn.disabled = false;
        }
    }
}

function buscarMadrid() {
    let indices = [];
    let index = ciudades.indexOf('madrid');
    while (index !== -1) {
        indices.push(index + 1);
        index = ciudades.indexOf('madrid', index + 1);
    }
    if (indices.length > 0) {
        resultadoMadridParrafo.textContent = `La ciudad de "Madrid" se encuentra en las posiciones: ${indices.join(', ')}`;
        console.log('Ejercicio 3 - Posición(es) de "Madrid":', indices);
    } else {
        resultadoMadridParrafo.textContent = 'La ciudad de "Madrid" no se encontró en la lista.';
        console.log('Ejercicio 3 - "Madrid" no encontrado en el array.');
    }
}

function reiniciarEjercicio3() {
    ciudades = [];
    ciudadInput.value = '';
    ciudadError.textContent = '';
    ciudadesIngresadasSpan.textContent = 'Ciudades ingresadas: ';
    buscarMadridBtn.disabled = true;
    resultadoMadridParrafo.textContent = '';
    console.log('Ejercicio 3 - Reiniciado.');
}