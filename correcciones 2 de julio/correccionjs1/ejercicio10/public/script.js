// public/script.js

// nos aseguramos de que todo el html se haya cargado antes de que el javascript empiece a funcionar.
document.addeventlistener('domcontentloaded', () => {

    // creamos un objeto para guardar los arrays de datos que el usuario va a ir metiendo.
    // es como el "estado" de nuestra página.
    const datos = {
        numeros: [],
        nombres: [],
        precios: []
    };

    // acá agarramos todos los elementos del html que vamos a necesitar manipular y los guardamos en variables.
    // es más prolijo y rápido que buscarlos cada vez que los necesitamos.

    // alerta personalizada
    const customalert = document.getelementbyid('custom-alert');
    const alertmessage = document.getelementbyid('alert-message');
    const alertclose = document.getelementbyid('alert-close');

    // formularios y botones de cada sección
    const formmultiplicar = document.getelementbyid('form-multiplicar');
    const inputnumero = document.getelementbyid('input-numero');
    const btnprocesarmultiplicar = document.getelementbyid('btn-procesar-multiplicar');

    const formmayusculas = document.getelementbyid('form-mayusculas');
    const inputnombre = document.getelementbyid('input-nombre');
    const btnprocesarmayusculas = document.getelementbyid('btn-procesar-mayusculas');

    const formiva = document.getelementbyid('form-iva');
    const inputprecio = document.getelementbyid('input-precio');
    const btnprocesariva = document.getelementbyid('btn-procesar-iva');

    // listas y áreas de resultados
    const listanumeros = document.getelementbyid('lista-numeros');
    const resultadomultiplicar = document.getelementbyid('resultado-multiplicar');

    const listanombres = document.getelementbyid('lista-nombres');
    const resultadomayusculas = document.getelementbyid('resultado-mayusculas');

    const listaprecios = document.getelementbyid('lista-precios');
    const resultadoiva = document.getelementbyid('resultado-iva');

    // funciones chiquitas que usamos en varios lugares para no repetir código.

    // función para mostrar nuestra alerta fachera con un mensaje.
    const showalert = (message) => {
        alertmessage.textcontent = message;
        customalert.classlist.remove('hidden');
    };

    // función para ocultar la alerta.
    const hidealert = () => {
        customalert.classlist.add('hidden');
    };

    // función para crear un 'li' y meterlo en la lista que corresponde en la pantalla.
    // esto da la sensación de tiempo real.
    const agregaritemui = (valor, listaelement) => {
        const li = document.createelement('li');
        li.textcontent = valor;
        listaelement.appendchild(li);
    };


    // si el usuario toca la 'x' de la alerta, la escondemos.
    alertclose.addeventlistener('click', hidealert);

    // 1. lógica para agregar números
    formmultiplicar.addeventlistener('submit', (e) => {
        e.preventdefault(); // evita que el formulario recargue la página.
        hidealert();
        const valor = inputnumero.value.trim(); // agarramos el valor y le sacamos espacios inútiles.

        // validación: nos fijamos que no esté vacío o que no sea un número.
        if (valor === '') {
            showalert('por favor, ingresa un número.');
            return;
        }
        if (isnan(valor)) {
            showalert('entrada inválida. solo se permiten números.');
            return;
        }

        // si pasa la validación, lo agregamos a nuestro array de datos.
        const numero = parsefloat(valor);
        datos.numeros.push(numero);
        // y lo mostramos en la lista en pantalla.
        agregaritemui(numero, listanumeros);
        console.log('[cliente] números actuales:', datos.numeros);
        // limpiamos el campo de texto y lo dejamos listo para el próximo número.
        inputnumero.value = '';
        inputnumero.focus();
    });

    // 2. lógica para agregar nombres (es muy parecida a la de números)
    formmayusculas.addeventlistener('submit', (e) => {
        e.preventdefault();
        hidealert();
        const valor = inputnombre.value.trim();

        // validación: que no esté vacío y que no tenga números.
        if (valor === '') {
            showalert('por favor, ingresa un nombre.');
            return;
        }
        if (/\d/.test(valor)) { // esto es una expresión regular para buscar dígitos.
            showalert('entrada inválida. no se permiten números en los nombres.');
            return;
        }

        datos.nombres.push(valor);
        agregaritemui(valor, listanombres);
        console.log('[cliente] nombres actuales:', datos.nombres);
        inputnombre.value = '';
        inputnombre.focus();
    });

    // 3. lógica para agregar precios (también, muy similar)
    formiva.addeventlistener('submit', (e) => {
        e.preventdefault();
        hidealert();
        const valor = inputprecio.value.trim().replace(',', '.'); // aceptamos la coma como decimal.

        // validación: que no esté vacío, que sea un número y que sea mayor a cero.
        if (valor === '') {
            showalert('por favor, ingresa un precio.');
            return;
        }
        if (isnan(valor)) {
            showalert('entrada inválida. solo se permiten precios numéricos.');
            return;
        }
        if (parsefloat(valor) <= 0) {
            showalert('el precio debe ser un número positivo.');
            return;
        }

        const precio = parsefloat(valor);
        datos.precios.push(precio);
        agregaritemui(`$${precio}`, listaprecios);
        console.log('[cliente] precios actuales:', datos.precios);
        inputprecio.value = '';
        inputprecio.focus();
    });

    
    //  se comunica con el servidor. la hacemos 'async' para usar 'await'.
    const procesardatos = async (tipo, dataarray, resultadoelement) => {
        hidealert();
        // primero, nos fijamos si hay algo para mandar.
        if (dataarray.length === 0) {
            showalert('no hay datos para procesar. agregá al menos un elemento.');
            return;
        }

        console.log(`[cliente] enviando datos al servidor para la operación '${tipo}':`, dataarray);

        // el try...catch es para atajar errores de red o si el servidor está caído.
        try {
            // acá usamos fetch() para mandar el pedido al servidor. es la forma moderna de hacer ajax.
            const response = await fetch('/guardar', {
                method: 'post', // le decimos que vamos a enviar datos.
                headers: {
                    'content-type': 'application/json' // le avisamos que los datos van en formato json.
                },
                body: json.stringify({ type: tipo, data: dataarray }) // convertimos nuestro objeto a texto json.
            });

            // si la respuesta del servidor no fue un 'ok' (ej: error 404 o 500), creamos un error.
            if (!response.ok) {
                const errordata = await response.json();
                throw new error(errordata.message || `error del servidor: ${response.statustext}`);
            }

            // esperamos la respuesta y la convertimos de json a un objeto javascript.
            const result = await response.json();
            
            if (result.success) {
                // si todo salió bien, mostramos el resultado en la pantalla.
                console.log('[cliente] resultado recibido del servidor:', result.processeddata);
                // usamos json.stringify con espacios para que se vea lindo en la etiqueta <pre>.
                resultadoelement.textcontent = json.stringify(result.processeddata, null, 2);
            } else {
                 showalert(result.message || 'ocurrió un error en el servidor.');
            }

        } catch (error) {
            // si algo falló en el 'try', lo mostramos en la consola y en nuestra alerta.
            console.error('[cliente] error en la solicitud fetch:', error);
            showalert(`error de comunicación: ${error.message}`);
        }
    };

    // finalmente, le asignamos la función 'procesardatos' a cada botón de "procesar",
    // pasándole los parámetros correctos para cada caso.
    btnprocesarmultiplicar.addeventlistener('click', () => {
        procesardatos('multiplicar', datos.numeros, resultadomultiplicar);
    });

    btnprocesarmayusculas.addeventlistener('click', () => {
        procesardatos('mayusculas', datos.nombres, resultadomayusculas);
    });

    btnprocesariva.addeventlistener('click', () => {
        procesardatos('iva', datos.precios, resultadoiva);
    });
});