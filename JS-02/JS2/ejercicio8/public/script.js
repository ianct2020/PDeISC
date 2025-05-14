document.addEventListener('DOMContentLoaded', () => {
    
    function esSoloLetras(str) { //check
        return /^[a-zA-Z\s]*$/.test(str);
    }

   
    const palabrasForm = document.getElementById('palabras-form');
    const palabraInput = document.getElementById('palabra-input');
    const guardarPalabraBtn = document.getElementById('guardar-palabra-btn');
    const comprobarAdminBtn = document.getElementById('comprobar-admin-btn');
    const reiniciarAdminBtn = document.getElementById('reiniciar-admin-btn');
    const resultadoAdminDiv = document.getElementById('resultado-admin');
    const erroresAdminDiv = document.getElementById('errores-admin');
    const listaPalabrasUl = document.getElementById('lista-palabras');
    let palabras = [];
    let palabrasGuardadas = 0;

    guardarPalabraBtn.addEventListener('click', () => {
        const nuevaPalabra = palabraInput.value.trim();
        if (nuevaPalabra) { //check
            if (esSoloLetras(nuevaPalabra)) {
                palabras.push(nuevaPalabra);
                const li = document.createElement('li');
                li.textContent = nuevaPalabra;
                listaPalabrasUl.appendChild(li);
                palabraInput.value = '';
                palabrasGuardadas++;
                console.log('Palabra guardada:', nuevaPalabra, 'Array:', palabras);
                if (palabrasGuardadas === 5) {
                    comprobarAdminBtn.disabled = false;
                    guardarPalabraBtn.disabled = true;
                }
                erroresAdminDiv.textContent = '';
            } else {
                erroresAdminDiv.textContent = 'Por favor, ingresa solo letras y espacios.';
                console.log('Intento fallido: Se ingresaron caracteres no válidos en la palabra.');
            }
        } else {
            erroresAdminDiv.textContent = 'Por favor, ingresa una palabra.';
        }
    });

    comprobarAdminBtn.addEventListener('click', () => {
        if (palabras.includes('admin')) {
            resultadoAdminDiv.textContent = '¡La palabra "admin" está presente en el array!';
        } else {
            resultadoAdminDiv.textContent = 'La palabra "admin" no se encontró en el array.';
        }
        console.log('Resultado de comprobar "admin":', palabras.includes('admin'));
    });

    reiniciarAdminBtn.addEventListener('click', () => { //reinciiar formulario
        palabras = [];
        palabrasGuardadas = 0;
        listaPalabrasUl.innerHTML = '';
        resultadoAdminDiv.textContent = '';
        erroresAdminDiv.textContent = '';
        palabraInput.value = '';
        guardarPalabraBtn.disabled = false;
        comprobarAdminBtn.disabled = true;
        console.log('Sección 1 reiniciada. Array:', palabras);
    });

    // esta verde?
    const coloresForm = document.getElementById('colores-form');
    const colorInput = document.getElementById('color-input');
    const guardarColorBtn = document.getElementById('guardar-color-btn');
    const comprobarVerdeBtn = document.getElementById('comprobar-verde-btn');
    const reiniciarVerdeBtn = document.getElementById('reiniciar-verde-btn');
    const resultadoVerdeDiv = document.getElementById('resultado-verde');
    const erroresVerdeDiv = document.getElementById('errores-verde');
    const listaColoresUl = document.getElementById('lista-colores');
    let colores = [];
    let coloresGuardados = 0;

    guardarColorBtn.addEventListener('click', () => {
        const nuevoColor = colorInput.value.trim();
        if (nuevoColor) {
            if (esSoloLetras(nuevoColor)) {
                colores.push(nuevoColor);
                const li = document.createElement('li');
                li.textContent = nuevoColor;
                listaColoresUl.appendChild(li);
                colorInput.value = '';
                coloresGuardados++;
                console.log('Color guardado:', nuevoColor, 'Array:', colores);
                if (coloresGuardados === 5) {
                    comprobarVerdeBtn.disabled = false;
                    guardarColorBtn.disabled = true;
                }
                erroresVerdeDiv.textContent = '';
            } else {//checkkk
                erroresVerdeDiv.textContent = 'Por favor, ingresa solo letras y espacios para el color.';
                console.log('Intento fallido: Se ingresaron caracteres no válidos en el color.');
            }
        } else {
            erroresVerdeDiv.textContent = 'Por favor, ingresa un color.';
        }
    });

    comprobarVerdeBtn.addEventListener('click', () => { //esta o no esta
        if (colores.includes('verde')) {
            resultadoVerdeDiv.textContent = '¡El color "verde" está presente en el array!';
        } else {
            resultadoVerdeDiv.textContent = 'El color "verde" no se encontró en el array.';
        }
        console.log('Resultado de comprobar "verde":', colores.includes('verde'));
    });

    reiniciarVerdeBtn.addEventListener('click', () => { //reiniciar formulario
        colores = [];
        coloresGuardados = 0;
        listaColoresUl.innerHTML = '';
        resultadoVerdeDiv.textContent = '';
        erroresVerdeDiv.textContent = '';
        colorInput.value = '';
        guardarColorBtn.disabled = false;
        comprobarVerdeBtn.disabled = true;
        console.log('Sección 2 reiniciada. Array:', colores);
    });

    // numeross
    const numerosForm = document.getElementById('numeros-form');
    const numeroInput = document.getElementById('numero-input');
    const guardarNumeroBtn = document.getElementById('guardar-numero-btn');
    const reiniciarNumerosBtn = document.getElementById('reiniciar-numeros-btn');
    const resultadoNumeroDiv = document.getElementById('resultado-numero');
    const erroresNumeroDiv = document.getElementById('errores-numero');
    const listaNumerosUl = document.getElementById('lista-numeros');
    let numeros = [];
    let numerosGuardados = 0;

    guardarNumeroBtn.addEventListener('click', () => { //checckk
        const nuevoNumero = numeroInput.value.trim();
        if (nuevoNumero) {
            if (!isNaN(nuevoNumero) && !isNaN(parseFloat(nuevoNumero))) {
                if (numeros.includes(nuevoNumero)) {
                    const confirmar = confirm(`El número "${nuevoNumero}" ya existe. ¿Desea agregarlo de nuevo?`);
                    if (confirmar) {
                        numeros.push(nuevoNumero);
                        const li = document.createElement('li');
                        li.textContent = nuevoNumero;
                        listaNumerosUl.appendChild(li);
                        numeroInput.value = '';
                        numerosGuardados++;
                        console.log('Número (duplicado) guardado:', nuevoNumero, 'Array:', numeros);
                    } else {
                        resultadoNumeroDiv.textContent = `El número "${nuevoNumero}" ya existe y no se agregó nuevamente.`;
                        console.log('Intento de agregar duplicado cancelado:', nuevoNumero);
                    }
                } else {
                    numeros.push(nuevoNumero);
                    const li = document.createElement('li');
                    li.textContent = nuevoNumero;
                    listaNumerosUl.appendChild(li);
                    numeroInput.value = '';
                    numerosGuardados++;
                    console.log('Número guardado:', nuevoNumero, 'Array:', numeros);
                }

                if (numerosGuardados === 5) {
                    guardarNumeroBtn.disabled = true;
                }
                erroresNumeroDiv.textContent = '';
            } else {
                erroresNumeroDiv.textContent = 'Por favor, ingresa solo números.';
                console.log('Intento fallido: Se ingresaron caracteres no numéricos.');
            }
        } else {
            erroresNumeroDiv.textContent = 'Por favor, ingresa un número.';
        }
    });
//reiniciar formulario
    reiniciarNumerosBtn.addEventListener('click', () => {
        numeros = [];
        numerosGuardados = 0;
        listaNumerosUl.innerHTML = '';
        resultadoNumeroDiv.textContent = '';
        erroresNumeroDiv.textContent = '';
        numeroInput.value = '';
        guardarNumeroBtn.disabled = false;
        console.log('Sección 3 reiniciada. Array:', numeros);
    });
});