document.addEventListener('DOMContentLoaded', () => {
    // Sección 1: Saludo de Nombres
    const formNombres = document.getElementById('formNombres');
    const nombreInputs = [document.getElementById('nombre1'), document.getElementById('nombre2'), document.getElementById('nombre3')];
    const errorNombres = [document.getElementById('errorNombre1'), document.getElementById('errorNombre2'), document.getElementById('errorNombre3')];
    const agregarNombreBtn = document.getElementById('agregarNombre');
    const saludarNombresBtn = document.getElementById('saludarNombres');
    const reiniciarNombresBtn = document.getElementById('reiniciarNombres');
    const outputNombresDiv = document.getElementById('outputNombres');
    const consoleNombresDiv = document.getElementById('consoleNombres');
    let nombres = [];

    function validarCampo(input, errorSpan) {
        if (!input.checkValidity()) {
            errorSpan.textContent = input.validationMessage;
            return false;
        }
        errorSpan.textContent = '';
        return true;
    }

    agregarNombreBtn.addEventListener('click', () => {
        let todosValidos = true;
        nombreInputs.forEach((input, index) => {
            if (!validarCampo(input, errorNombres[index])) {
                todosValidos = false;
            }
        });

        if (todosValidos) {
            nombres = nombreInputs.map(input => input.value);
            console.log('Nombres ingresados:', nombres);
            consoleNombresDiv.textContent = `Nombres ingresados: ${nombres.join(', ')}`;
            saludarNombresBtn.disabled = false;
        } else {
            console.log('Error: Por favor, complete todos los nombres correctamente.');
            consoleNombresDiv.textContent = 'Error: Por favor, complete todos los nombres correctamente.';
        }
    });

    saludarNombresBtn.addEventListener('click', () => {
        if (nombres.length === 3) {
            let saludoPartes = [];
            nombres.forEach((nombre, index) => {
                if (index < nombres.length - 2) {
                    saludoPartes.push(`${nombre},`);
                } else if (index === nombres.length - 2) {
                    saludoPartes.push(`${nombre} y`);
                } else {
                    saludoPartes.push(nombre);
                }
            });
            const saludo = `Hola ${saludoPartes.join(' ')}, gracias por visitar mi página.`;
            outputNombresDiv.textContent = saludo;
            console.log('Saludo:', saludo);
            formNombres.reset();
            nombres = [];
            saludarNombresBtn.disabled = true;
            consoleNombresDiv.textContent = '';
        } else {
            console.log('Error: Debes ingresar 3 nombres antes de saludar.');
            consoleNombresDiv.textContent = 'Error: Debes ingresar 3 nombres antes de saludar.';
        }
    });

    reiniciarNombresBtn.addEventListener('click', () => {
        nombreInputs.forEach(input => input.value = '');
        errorNombres.forEach(error => error.textContent = '');
        nombres = [];
        outputNombresDiv.textContent = '';
        consoleNombresDiv.textContent = '';
        saludarNombresBtn.disabled = true;
        console.log('Sección de nombres reiniciada.');
    });

    // Sección 2: Duplicar Números
    const formNumeros = document.getElementById('formNumeros');
    const numeroInputs = [document.getElementById('numero1'), document.getElementById('numero2'), document.getElementById('numero3')];
    const errorNumeros = [document.getElementById('errorNumero1'), document.getElementById('errorNumero2'), document.getElementById('errorNumero3')];
    const agregarNumeroBtn = document.getElementById('agregarNumero');
    const duplicarNumerosBtn = document.getElementById('duplicarNumeros');
    const reiniciarNumerosBtn2 = document.getElementById('reiniciarNumeros');
    const outputNumerosDiv = document.getElementById('outputNumeros');
    const consoleNumerosDiv = document.getElementById('consoleNumeros');
    let numeros = [];

    agregarNumeroBtn.addEventListener('click', () => {
        let todosValidos = true;
        numeroInputs.forEach((input, index) => {
            if (!validarCampo(input, errorNumeros[index])) {
                todosValidos = false;
            }
        });

        if (todosValidos) {
            numeros = numeroInputs.map(input => parseInt(input.value));
            console.log('Números ingresados:', numeros);
            consoleNumerosDiv.textContent = `Números ingresados: ${numeros.join(', ')}`;
            duplicarNumerosBtn.disabled = false;
        } else {
            console.log('Error: Por favor, complete todos los números.');
            consoleNumerosDiv.textContent = 'Error: Por favor, complete todos los números.';
        }
    });

    duplicarNumerosBtn.addEventListener('click', () => {
        if (numeros.length === 3) {
            let outputTextArray = [];
            numeros.forEach(num => {
                const doble = num * 2;
                outputTextArray.push(`${num} duplicado = ${doble}`);
            });
            outputNumerosDiv.innerHTML = outputTextArray.join('<br>');
            console.log('Números duplicados:', numeros.map(num => `${num} duplicado = ${num * 2}`));
            formNumeros.reset();
            numeros = [];
            duplicarNumerosBtn.disabled = true;
            consoleNumerosDiv.textContent = '';
        } else {
            console.log('Error: Debes ingresar 3 números antes de duplicar.');
            consoleNumerosDiv.textContent = 'Error: Debes ingresar 3 números antes de duplicar.';
        }
    });

    reiniciarNumerosBtn2.addEventListener('click', () => {
        numeroInputs.forEach(input => input.value = '');
        errorNumeros.forEach(error => error.textContent = '');
        numeros = [];
        outputNumerosDiv.textContent = '';
        consoleNumerosDiv.textContent = '';
        duplicarNumerosBtn.disabled = true;
        console.log('Sección de números reiniciada.');
    });

    // Sección 3: Mostrar Nombres y Edades
    const formData = document.getElementById('formData');
    const nombrePersonaInput = document.getElementById('nombrePersona');
    const edadPersonaInput = document.getElementById('edadPersona');
    const errorNombrePersona = document.getElementById('errorNombrePersona');
    const errorEdadPersona = document.getElementById('errorEdadPersona');
    const agregarPersonaBtn = document.getElementById('agregarPersona');
    const mostrarDatosBtn = document.getElementById('mostrarDatos');
    const reiniciarDatosBtn = document.getElementById('reiniciarDatos');
    const outputDatosDiv = document.getElementById('outputDatos');
    const consoleDatosDiv = document.getElementById('consoleDatos');
    let personas = [];
    const personaInputs = [
        { input: nombrePersonaInput, error: errorNombrePersona },
        { input: edadPersonaInput, error: errorEdadPersona }
    ];

    agregarPersonaBtn.addEventListener('click', () => {
        let todosValidos = true;
        personaInputs.forEach(item => {
            if (!validarCampo(item.input, item.error)) {
                todosValidos = false;
            }
        });

        if (todosValidos) {
            const nombre = nombrePersonaInput.value;
            const edad = parseInt(edadPersonaInput.value);
            personas.push({ nombre, edad });
            console.log('Persona agregada:', { nombre, edad });
            const aniosTexto = edad <= 1 ? 'año' : 'años';
            consoleDatosDiv.textContent = `Persona agregada: ${nombre}, ${edad} ${aniosTexto}.`;
            mostrarDatosBtn.disabled = false;
            formData.reset();
        } else {
            console.log('Error: Por favor, complete el nombre y la edad correctamente.');
            consoleDatosDiv.textContent = 'Error: Por favor, complete el nombre y la edad correctamente.';
        }
    });

    mostrarDatosBtn.addEventListener('click', () => {
        if (personas.length > 0) {
            // Ejemplo de uso de filter(): Filtrar personas con edad mayor a 0 (todos en este caso)
            const personasFiltradas = personas.filter(persona => persona.edad > 0);
            let outputTextArray = [];
            personasFiltradas.forEach(persona => {
                const anios = persona.edad <= 1 ? 'año' : 'años';
                outputTextArray.push(`${persona.nombre} tiene ${persona.edad} ${anios}.`);
            });
            outputDatosDiv.innerHTML = outputTextArray.join('<br>');
            console.log('Datos de personas:', personas);
        } else {
            console.log('Error: No hay personas para mostrar.');
            consoleDatosDiv.textContent = 'Error: No hay personas para mostrar.';
        }
    });

    reiniciarDatosBtn.addEventListener('click', () => {
        personaInputs.forEach(item => {
            item.input.value = '';
            item.error.textContent = '';
        });
        personas = [];
        outputDatosDiv.textContent = '';
        consoleDatosDiv.textContent = '';
        mostrarDatosBtn.disabled = true;
        console.log('Sección de datos reiniciada.');
    });
});