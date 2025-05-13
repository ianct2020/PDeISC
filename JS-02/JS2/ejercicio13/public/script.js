document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente cargado y analizado. ¡Modo Hacker Activado!');

    // --- Sección 1: Ordenar Números ---
    const inputNumero = document.getElementById('inputNumero');
    const btnAgregarNumero = document.getElementById('btnAgregarNumero');
    const btnOrdenarNumeros = document.getElementById('btnOrdenarNumeros');
    const btnReiniciarNumeros = document.getElementById('btnReiniciarNumeros');
    const listaNumerosIngresados = document.getElementById('listaNumerosIngresados');
    const listaNumerosOrdenados = document.getElementById('listaNumerosOrdenados');

    let numeros = [];
    const MAX_NUMEROS = 5;

    btnAgregarNumero.addEventListener('click', () => {
        console.log('Botón "Agregar Número" presionado.');
        const valorNumero = inputNumero.value.trim();

        if (valorNumero === '') {
            alert('Por favor, ingresa un número.');
            console.warn('Intento de agregar número vacío.');
            return;
        }

        if (numeros.length >= MAX_NUMEROS) {
            alert(`No puedes agregar más de ${MAX_NUMEROS} números.`);
            console.warn(`Intento de agregar más de ${MAX_NUMEROS} números.`);
            inputNumero.value = '';
            return;
        }

        const numero = parseFloat(valorNumero);

        numeros.push(numero);
        console.log(`Número agregado: ${numero}. Array actual: [${numeros.join(', ')}]`);
        actualizarListaVisual(listaNumerosIngresados, numeros, "números");
        inputNumero.value = '';
        inputNumero.focus();
        listaNumerosOrdenados.innerHTML = '';
        if (listaNumerosOrdenados.children.length === 0 && numeros.length > 0) { // Mostrar placeholder si está vacía después de agregar
             actualizarListaVisual(listaNumerosOrdenados, [], "números ordenados");
        }
    });

    btnOrdenarNumeros.addEventListener('click', () => {
        console.log('Botón "Ordenar Números" presionado.');
        if (numeros.length === 0) {
            alert('No hay números para ordenar.');
            console.warn('Intento de ordenar un array de números vacío.');
            return;
        }

        const numerosParaOrdenar = [...numeros];
        numerosParaOrdenar.sort((a, b) => a - b);

        console.log(`Números ordenados: [${numerosParaOrdenar.join(', ')}]. Array original sin cambios: [${numeros.join(', ')}]`);
        actualizarListaVisual(listaNumerosOrdenados, numerosParaOrdenar, "números ordenados");
    });

    btnReiniciarNumeros.addEventListener('click', () => {
        console.log('Botón "Reiniciar Números" presionado.');
        numeros = [];
        actualizarListaVisual(listaNumerosIngresados, numeros, "números");
        actualizarListaVisual(listaNumerosOrdenados, [], "números ordenados");
        inputNumero.value = '';
        console.log('Lista de números reiniciada.');
    });

    // --- Sección 2: Ordenar Palabras ---
    const inputPalabra = document.getElementById('inputPalabra');
    const btnAgregarPalabra = document.getElementById('btnAgregarPalabra');
    const btnOrdenarPalabras = document.getElementById('btnOrdenarPalabras');
    const btnReiniciarPalabras = document.getElementById('btnReiniciarPalabras');
    const listaPalabrasIngresadas = document.getElementById('listaPalabrasIngresadas');
    const listaPalabrasOrdenadas = document.getElementById('listaPalabrasOrdenadas');

    let palabras = [];
    const MAX_PALABRAS = 5;
    const regexSoloLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;


    btnAgregarPalabra.addEventListener('click', () => {
        console.log('Botón "Agregar Palabra" presionado.');
        const palabra = inputPalabra.value.trim();

        if (palabra === '') {
            alert('Por favor, ingresa una palabra.');
            console.warn('Intento de agregar palabra vacía.');
            return;
        }

        if (!regexSoloLetras.test(palabra)) {
            alert('La palabra solo debe contener letras y espacios.');
            console.warn(`Intento de agregar palabra con caracteres no permitidos: "${palabra}"`);
            inputPalabra.value = '';
            return;
        }

        if (palabras.length >= MAX_PALABRAS) {
            alert(`No puedes agregar más de ${MAX_PALABRAS} palabras.`);
            console.warn(`Intento de agregar más de ${MAX_PALABRAS} palabras.`);
            inputPalabra.value = '';
            return;
        }

        palabras.push(palabra);
        console.log(`Palabra agregada: "${palabra}". Array actual: ["${palabras.join('", "')}"]`);
        actualizarListaVisual(listaPalabrasIngresadas, palabras, "palabras");
        inputPalabra.value = '';
        inputPalabra.focus();
        listaPalabrasOrdenadas.innerHTML = '';
        if (listaPalabrasOrdenadas.children.length === 0 && palabras.length > 0) {
             actualizarListaVisual(listaPalabrasOrdenadas, [], "palabras ordenadas");
        }
    });

    btnOrdenarPalabras.addEventListener('click', () => {
        console.log('Botón "Ordenar Palabras" presionado.');
        if (palabras.length === 0) {
            alert('No hay palabras para ordenar.');
            console.warn('Intento de ordenar un array de palabras vacío.');
            return;
        }
        const palabrasParaOrdenar = [...palabras];
        palabrasParaOrdenar.sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));


        console.log(`Palabras ordenadas: ["${palabrasParaOrdenar.join('", "')}"]. Array original: ["${palabras.join('", "')}"]`);
        actualizarListaVisual(listaPalabrasOrdenadas, palabrasParaOrdenar, "palabras ordenadas");
    });

    btnReiniciarPalabras.addEventListener('click', () => {
        console.log('Botón "Reiniciar Palabras" presionado.');
        palabras = [];
        actualizarListaVisual(listaPalabrasIngresadas, palabras, "palabras");
        actualizarListaVisual(listaPalabrasOrdenadas, [], "palabras ordenadas");
        inputPalabra.value = '';
        console.log('Lista de palabras reiniciada.');
    });


    // --- Sección 3: Ordenar Objetos (Personas por Edad) ---
    const inputNombrePersona = document.getElementById('inputNombrePersona');
    const inputEdadPersona = document.getElementById('inputEdadPersona');
    const btnAgregarPersona = document.getElementById('btnAgregarPersona');
    const btnOrdenarPersonas = document.getElementById('btnOrdenarPersonas');
    const btnReiniciarPersonas = document.getElementById('btnReiniciarPersonas');
    const listaPersonasIngresadas = document.getElementById('listaPersonasIngresadas');
    const listaPersonasOrdenadas = document.getElementById('listaPersonasOrdenadas');

    let personas = [];

    btnAgregarPersona.addEventListener('click', () => {
        console.log('Botón "Agregar Persona" presionado.');
        const nombre = inputNombrePersona.value.trim();
        const edadValue = inputEdadPersona.value.trim();

        if (nombre === '' || edadValue === '') {
            alert('Por favor, ingresa nombre y edad.');
            console.warn('Intento de agregar persona con campos vacíos.');
            return;
        }

        if (!regexSoloLetras.test(nombre)) {
            alert('El nombre solo debe contener letras y espacios.');
            console.warn(`Intento de agregar nombre con caracteres no permitidos: "${nombre}"`);
            inputNombrePersona.value = '';
            return;
        }

        const edad = parseInt(edadValue, 10);

        if (isNaN(edad) || edad < 0) {
            alert('Por favor, ingresa una edad válida (número entero no negativo).');
            console.warn(`Intento de agregar edad inválida: "${edadValue}"`);
            inputEdadPersona.value = '';
            return;
        }

        const nuevaPersona = { nombre, edad };
        personas.push(nuevaPersona);
        console.log(`Persona agregada: ${JSON.stringify(nuevaPersona)}. Array actual: ${JSON.stringify(personas)}`);
        actualizarListaPersonasVisual(listaPersonasIngresadas, personas, "personas");
        inputNombrePersona.value = '';
        inputEdadPersona.value = '';
        inputNombrePersona.focus();
        listaPersonasOrdenadas.innerHTML = '';
        if (listaPersonasOrdenadas.children.length === 0 && personas.length > 0) {
            actualizarListaPersonasVisual(listaPersonasOrdenadas, [], "personas ordenadas");
        }
    });

    btnOrdenarPersonas.addEventListener('click', () => {
        console.log('Botón "Ordenar Personas por Edad" presionado.');
        if (personas.length === 0) {
            alert('No hay personas para ordenar.');
            console.warn('Intento de ordenar un array de personas vacío.');
            return;
        }

        const personasParaOrdenar = [...personas];
        personasParaOrdenar.sort((a, b) => a.edad - b.edad);

        console.log(`Personas ordenadas por edad: ${JSON.stringify(personasParaOrdenar)}. Array original: ${JSON.stringify(personas)}`);
        actualizarListaPersonasVisual(listaPersonasOrdenadas, personasParaOrdenar, "personas ordenadas");
    });

    btnReiniciarPersonas.addEventListener('click', () => {
        console.log('Botón "Reiniciar Personas" presionado.');
        personas = [];
        actualizarListaPersonasVisual(listaPersonasIngresadas, personas, "personas");
        actualizarListaPersonasVisual(listaPersonasOrdenadas, [], "personas ordenadas");
        inputNombrePersona.value = '';
        inputEdadPersona.value = '';
        console.log('Lista de personas reiniciada.');
    });


    // --- Funciones Auxiliares para actualizar el DOM ---
    // Modifiqué un poco para que el placeholder sea más claro
    function actualizarListaVisual(ulElement, array, tipoElementoSingular) {
        ulElement.innerHTML = '';
        if (array.length === 0) {
            const li = document.createElement('li');
            li.textContent = `No hay ${tipoElementoSingular} para mostrar.`;
            if (ulElement.id.includes("Ordenad")) { // Si es una lista de "ordenados"
                 li.textContent = `Presiona "Ordenar" para ver los ${tipoElementoSingular} aquí.`;
                 if ( (ulElement.id.includes("Numeros") && numeros.length === 0) ||
                      (ulElement.id.includes("Palabras") && palabras.length === 0) ||
                      (ulElement.id.includes("Personas") && personas.length === 0)
                 ) {
                    li.textContent = `No hay ${tipoElementoSingular} para mostrar.`;
                 }
            }
            ulElement.appendChild(li);
        } else {
            array.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                ulElement.appendChild(li);
                // console.log(`Elemento "${item}" agregado visualmente a la lista ${ulElement.id}.`);
            });
        }
    }

    function actualizarListaPersonasVisual(ulElement, arrayPersonas, tipoElementoSingular) {
        ulElement.innerHTML = '';
        if (arrayPersonas.length === 0) {
            const li = document.createElement('li');
             li.textContent = `No hay ${tipoElementoSingular} para mostrar.`;
            if (ulElement.id.includes("Ordenad")) { // Si es una lista de "ordenados"
                 li.textContent = `Presiona "Ordenar" para ver las ${tipoElementoSingular} aquí.`;
                  if (personas.length === 0) { // Si no hay personas ingresadas, no tiene sentido el mensaje de ordenar
                     li.textContent = `No hay ${tipoElementoSingular} para mostrar.`;
                  }
            }
            ulElement.appendChild(li);
        } else {
            arrayPersonas.forEach(persona => {
                const li = document.createElement('li');
                li.textContent = `Nombre: ${persona.nombre}, Edad: ${persona.edad}`;
                ulElement.appendChild(li);
                // console.log(`Persona "${persona.nombre}, Edad: ${persona.edad}" agregada visualmente a la lista ${ulElement.id}.`);
            });
        }
    }

    // Inicializar listas vacías al cargar con los placeholders correctos
    actualizarListaVisual(listaNumerosIngresados, numeros, "números");
    actualizarListaVisual(listaNumerosOrdenados, [], "números ordenados");
    actualizarListaVisual(listaPalabrasIngresadas, palabras, "palabras");
    actualizarListaVisual(listaPalabrasOrdenadas, [], "palabras ordenadas");
    actualizarListaPersonasVisual(listaPersonasIngresadas, personas, "personas");
    actualizarListaPersonasVisual(listaPersonasOrdenadas, [], "personas ordenadas");

});