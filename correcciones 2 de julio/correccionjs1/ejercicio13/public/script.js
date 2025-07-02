// public/script.js

// nos aseguramos de que toda la página esté cargada antes de empezar 
document.addEventListener('DOMContentLoaded', () => {
    // --- estado de la aplicación (acá vamos a guardar toda la data que meta el usuario) ---
    const state = {
        numeros: [],
        palabras: [],
        personas: []
    };

    // --- selectores del dom (acá agarramos todos los elementos del html para poder manipularlos después) ---
    // formularios
    const formNumeros = document.getElementById('form-numeros');
    const formPalabras = document.getElementById('form-palabras');
    const formPersonas = document.getElementById('form-personas');
    
    // inputs
    const inputNumero = document.getElementById('input-numero');
    const inputPalabra = document.getElementById('input-palabra');
    const inputNombre = document.getElementById('input-nombre');
    const inputEdad = document.getElementById('input-edad');

    // contenedores de listas
    const listaNumerosDiv = document.getElementById('lista-numeros');
    const listaPalabrasDiv = document.getElementById('lista-palabras');
    const listaPersonasDiv = document.getElementById('lista-personas');
    
    // botones de ordenar
    const btnOrdenarNumeros = document.getElementById('btn-ordenar-numeros');
    const btnOrdenarPalabras = document.getElementById('btn-ordenar-palabras');
    const btnOrdenarPersonas = document.getElementById('btn-ordenar-personas');

    // alerta
    const customAlert = document.getElementById('custom-alert');

    // --- funciones de utilidad ---

    /**
     * esta es la función para mostrar esa alerta fachera que pusimos arriba
     */
    const showAlert = (message, type = 'error') => {
        // le ponemos el texto que nos pasaron
        customAlert.textContent = message;
        // le cambiamos la clase para que se vea y tenga el color correcto
        customAlert.className = `alert ${type}`;
        
        // y con esto hacemos que la alerta desaparezca sola después de 3 segundos
        setTimeout(() => {
            customAlert.className = 'alert hidden';
        }, 3000);
    };
    
    /**
     * esta es la función que se encarga de mandar los datos al servidor con el fetch
     */
    const enviarAlBackend = async (data) => {
        try {
            // acá preparamos y mandamos la petición post al backend
            const response = await fetch('/guardar', {
                method: 'POST',
                headers: {
                    // le avisamos al servidor que le estamos mandando un json, importante esto
                    'Content-Type': 'application/json'
                },
                // convertimos nuestro objeto de javascript a texto json para poder mandarlo
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('error al conectar con el servidor');
            }
            // recibimos la respuesta del servidor y la convertimos de nuevo a un objeto
            const result = await response.json();
            // la mostramos en la consola del navegador para ver qué onda
            console.log('respuesta del servidor:', result);
            showAlert('datos enviados y guardados en el servidor', 'success');
        } catch (error) {
            console.error('error en fetch:', error);
            showAlert(error.message, 'error');
        }
    };



    // esta función dibuja los números en la pantalla
    const renderNumeros = () => {
        listaNumerosDiv.innerHTML = state.numeros.join(', ');
    };

    // esta para las palabras
    const renderPalabras = () => {
        listaPalabrasDiv.innerHTML = state.palabras.join(', ');
    };

    // y esta para las personas, un poquito más compleja para que se vea linda
    const renderPersonas = () => {
        listaPersonasDiv.innerHTML = state.personas
            .map(p => `${p.nombre} (${p.edad} años)`)
            .join('<br>');
    };


    //formulario de números
    // acá estamos atentos a cuando el usuario manda el formulario de los números
    formNumeros.addEventListener('submit', (e) => {
        // con esto frenamos el comportamiento normal del formulario para que no se recargue la página
        e.preventDefault();
        // agarramos el valor del input y le sacamos los espacios de los costados
        const valor = inputNumero.value.trim();

        // validación: que no manden el campo vacío
        if (valor === '') {
            showAlert('el campo de número no puede estar vacío');
            return;
        }
        // y acá que sea un número y no cualquier verdura
        if (isNaN(valor)) {
            showAlert('por favor, ingresá solo números');
            return;
        }

        const numero = parseFloat(valor);
        // si está todo bien, metemos el número en nuestro array de números
        state.numeros.push(numero);
        // llamamos a la función que actualiza la lista en la pantalla
        renderNumeros();
        // mostramos en la consola del navegador cómo va quedando el array
        console.log('números actuales (consola navegador):', state.numeros);
        // limpiamos el campo de texto para que pueda escribir otro número
        inputNumero.value = '';
        // y dejamos el cursor ahí listo para que siga escribiendo
        inputNumero.focus();
    });

    // formulario de palabras (la misma lógica que con los números)
    formPalabras.addEventListener('submit', (e) => {
        e.preventDefault();
        const palabra = inputPalabra.value.trim();

        // validación
        if (palabra === '') {
            showAlert('el campo de palabra no puede estar vacío');
            return;
        }
        // esta expresión regular verifica que solo se metan letras y espacios
        if (!/^[a-zA-Z\s]+$/.test(palabra)) {
            showAlert('por favor, ingresá solo letras en el campo de palabra');
            return;
        }

        state.palabras.push(palabra);
        renderPalabras();
        console.log('palabras actuales (consola navegador):', state.palabras);
        inputPalabra.value = '';
        inputPalabra.focus();
    });

    // 3. formulario de personas
    formPersonas.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = inputNombre.value.trim();
        const edad = inputEdad.value.trim();

        // validación
        if (nombre === '' || edad === '') {
            showAlert('ambos campos (nombre y edad) son obligatorios');
            return;
        }
        if (!/^[a-zA-Z\s]+$/.test(nombre)) {
            showAlert('el nombre solo puede contener letras');
            return;
        }
        if (isNaN(edad) || parseFloat(edad) <= 0) {
            showAlert('la edad debe ser un número positivo');
            return;
        }
        
        // creamos el objeto persona con su nombre y edad
        const persona = { nombre, edad: parseInt(edad, 10) };
        state.personas.push(persona);
        renderPersonas();
        console.log('personas actuales (consola navegador):', state.personas);
        inputNombre.value = '';
        inputEdad.value = '';
        inputNombre.focus();
    });



    // ordenar números
    // acá listeneamos cuando hacen clic en el botón de ordenar números
    btnOrdenarNumeros.addEventListener('click', () => {
        // nos fijamos que haya al menos dos cosas para ordenar, sino no tiene gracia
        if (state.numeros.length < 2) {
            showAlert('necesitás al menos dos números para ordenar');
            return;
        }
        // con esta función de flecha le decimos que ordene los números de menor a mayor
        state.numeros.sort((a, b) => a - b);
        renderNumeros();
        console.log('números ordenados (consola navegador):', state.numeros);
        // una vez ordenado, llamamos a la función que manda todo para el servidor
        enviarAlBackend({ tipo: 'numerosOrdenados', datos: state.numeros });
    });

    // ordenar palabras
    btnOrdenarPalabras.addEventListener('click', () => {
        if (state.palabras.length < 2) {
            showAlert('necesitás al menos dos palabras para ordenar');
            return;
        }
        // para las palabras es más fácil, el sort solito ya las ordena alfabéticamente
        state.palabras.sort();
        renderPalabras();
        console.log('palabras ordenadas (consola navegador):', state.palabras);
        enviarAlBackend({ tipo: 'palabrasOrdenadas', datos: state.palabras });
    });

    // ordenar personas por edad
    btnOrdenarPersonas.addEventListener('click', () => {
        if (state.personas.length < 2) {
            showAlert('necesitás al menos dos personas para ordenar');
            return;
        }
        // y para los objetos le decimos que compare por la edad de cada uno
        state.personas.sort((a, b) => a.edad - b.edad);
        renderPersonas();
        console.log('personas ordenadas por edad (consola navegador):', state.personas);
        enviarAlBackend({ tipo: 'personasOrdenadasPorEdad', datos: state.personas });
    });
});