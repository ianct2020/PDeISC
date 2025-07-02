// script.js
// esperamos a que se cargue todo el html antes de empezar 
document.addEventListener('DOMContentLoaded', () => {

    // en este array vamos a ir guardando los numeritos para la suma
    let numerosParaSuma = [];
    // este otro para guardar los de la multiplicación
    let numerosParaMultiplicacion = [];
    // y este para los objetos de los productos
    let productosParaPrecio = [];

    // --- acá agarramos todos los elementos del html para poder manipularlos después ---
    // la cajita de la alerta
    const alertContainer = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');
    const alertClose = document.getElementById('alert-close');

    // el formulario de la suma
    const formSuma = document.getElementById('form-suma');
    const inputSuma = document.getElementById('input-suma');
    const btnAddSuma = document.getElementById('btn-add-suma');
    const listaSuma = document.getElementById('lista-suma');
    const resultadoSuma = document.getElementById('resultado-suma');

    // el formulario de la multiplicación
    const formMultiplicacion = document.getElementById('form-multiplicacion');
    const inputMultiplicacion = document.getElementById('input-multiplicacion');
    const btnAddMultiplicacion = document.getElementById('btn-add-multiplicacion');
    const listaMultiplicacion = document.getElementById('lista-multiplicacion');
    const resultadoMultiplicacion = document.getElementById('resultado-multiplicacion');
    
    // el formulario de los precios
    const formPrecios = document.getElementById('form-precios');
    const inputPrecio = document.getElementById('input-precio');
    const btnAddPrecio = document.getElementById('btn-add-precio');
    const listaPrecios = document.getElementById('lista-precios');
    const resultadoPrecios = document.getElementById('resultado-precios');


    // esta es la función para mostrar la alerta fachera
    const showAlert = (message, type = 'error') => {
        alertMessage.textContent = message;
        alertContainer.className = `alert ${type} show`;
    };

    // y esta para esconderla cuando ya no la necesitamos
    const hideAlert = () => {
        alertContainer.classList.remove('show');
    };
    
    // una función genérica para meter un ítem nuevo en la lista que se ve en pantalla
    const addItemToList = (item, listElement) => {
        const li = document.createElement('li');
        li.textContent = item;
        listElement.appendChild(li);
    };

    // la función que se encarga de mandar todo al servidor usando fetch
    const sendDataToServer = async (payload) => {
        try {
            // el llamado a la ruta /guardar del backend
            const response = await fetch('/guardar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            // mostramos en la consola del navegador la respuesta que nos dio el servidor
            console.log('✅ respuesta del servidor:', data);
        } catch (error) {
            // por si se rompe la conexión con el servidor, avisamos acá
            console.error('❌ error al enviar datos al servidor:', error);
            showAlert('no se pudo conectar con el servidor');
        }
    };



    // le damos vida a la crucecita para cerrar la alerta
    alertClose.addEventListener('click', hideAlert);

    // cuando el pibe hace click en 'agregar' para la suma
    btnAddSuma.addEventListener('click', () => {
        const valor = inputSuma.value;
        // nos fijamos si el campo está vacío o si no metió un número, por las dudas
        if (valor === '' || isNaN(parseFloat(valor))) {
            showAlert('por favor, ingresa un número válido');
            return;
        }
        const numero = parseFloat(valor);
        // metemos el número en nuestro array de sumas
        numerosParaSuma.push(numero);
        // lo mostramos en la lista de la página
        addItemToList(numero, listaSuma);
        // limpiamos el campo de texto para que pueda agregar otro
        inputSuma.value = '';
        inputSuma.focus();
        hideAlert();
    });

    // cuando manda el formulario de la suma para calcular
    formSuma.addEventListener('submit', (e) => {
        // esto frena el comportamiento normal del form para que no se recargue la página
        e.preventDefault(); 
        // chequeamos que haya puesto por lo menos dos números, sino no tiene gracia :(
        if (numerosParaSuma.length < 2) {
            showAlert('debes agregar al menos 2 números para sumar');
            return;
        }
        
        // el reduce para sumar todo
        const total = numerosParaSuma.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
        
        // mostramos el resultado en pantalla
        resultadoSuma.textContent = total;
        // y también lo mostramos en la consola del navegador
        console.log('suma - datos:', numerosParaSuma, 'resultado:', total);
        
        // llamamos a la función que manda la data al servidor
        sendDataToServer({
            operacion: 'suma',
            datos: numerosParaSuma,
            resultado: total
        });
        hideAlert();
    });

    // cuando aprieta el botón de agregar en la parte de multiplicar
    btnAddMultiplicacion.addEventListener('click', () => {
        const valor = inputMultiplicacion.value;
        if (valor === '' || isNaN(parseFloat(valor))) {
            showAlert('por favor, ingresa un número válido');
            return;
        }
        const numero = parseFloat(valor);
        numerosParaMultiplicacion.push(numero);
        addItemToList(numero, listaMultiplicacion);
        inputMultiplicacion.value = '';
        inputMultiplicacion.focus();
        hideAlert();
    });

    // cuando manda el formulario para que se multiplique todo
    formMultiplicacion.addEventListener('submit', (e) => {
        e.preventDefault();
        if (numerosParaMultiplicacion.length < 2) {
            showAlert('debes agregar al menos 2 números para multiplicar');
            return;
        }

        // de nuevo el reduce, pero esta vez empieza en 1 porque es una multiplicación
        const total = numerosParaMultiplicacion.reduce((acumulador, valorActual) => acumulador * valorActual, 1);
        
        resultadoMultiplicacion.textContent = total;
        console.log('multiplicación - datos:', numerosParaMultiplicacion, 'resultado:', total);
        
        sendDataToServer({
            operacion: 'multiplicacion',
            datos: numerosParaMultiplicacion,
            resultado: total
        });
        hideAlert();
    });

    // cuando agrega un producto nuevo
    btnAddPrecio.addEventListener('click', () => {
        const valor = inputPrecio.value;
        if (valor === '' || isNaN(parseFloat(valor)) || parseFloat(valor) < 0) {
            showAlert('por favor, ingresa un precio numérico válido y positivo');
            return;
        }
        const precio = parseFloat(valor);
        // acá creamos el objeto para cada producto con su precio
        const producto = {
            nombre: `producto #${productosParaPrecio.length + 1}`,
            precio: precio
        };
        productosParaPrecio.push(producto);
        addItemToList(`producto #${productosParaPrecio.length} - precio: $${precio.toFixed(2)}`, listaPrecios);
        inputPrecio.value = '';
        inputPrecio.focus();
        hideAlert();
    });

    // cuando quiere calcular el total de los precios
    formPrecios.addEventListener('submit', (e) => {
        e.preventDefault();
        if (productosParaPrecio.length < 2) {
            showAlert('debes agregar al menos 2 productos para sumar sus precios');
            return;
        }

        // de nuevo el reduce, pero esta vez suma la propiedad 'precio' de cada objeto
        const total = productosParaPrecio.reduce((acumulador, productoActual) => acumulador + productoActual.precio, 0);
        
        resultadoPrecios.textContent = total.toFixed(2);
        console.log('precios - datos:', productosParaPrecio, 'resultado:', total.toFixed(2));
        
        sendDataToServer({
            operacion: 'suma_precios',
            datos: productosParaPrecio,
            resultado: total
        });
        hideAlert();
    });
});