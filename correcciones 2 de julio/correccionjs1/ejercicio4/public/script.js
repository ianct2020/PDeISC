// public/script.js

// nos aseguramos de que todo el html se haya cargado antes de ejecutar el script.
document.addEventListener('DOMContentLoaded', () => {
    // acá agarramos todos los elementos del html con los que vamos a laburar.

    // los tres formularios
    const formNumeros = document.getElementById('form-numeros');
    const formMensajes = document.getElementById('form-mensajes');
    const formClientes = document.getElementById('form-clientes');

    // los campos para escribir (inputs)
    const inputNumero = document.getElementById('input-numero');
    const inputMensaje = document.getElementById('input-mensaje');
    const inputCliente = document.getElementById('input-cliente');

    // los botones para sacar el primer elemento (los que disparan el shift())
    const btnQuitarNumero = document.getElementById('btn-quitar-numero');
    const btnQuitarMensaje = document.getElementById('btn-quitar-mensaje');
    const btnAtenderCliente = document.getElementById('btn-atender-cliente');

    // las listas (ul y ol) donde vamos a mostrar los datos que se van cargando.
    const listaNumeros = document.getElementById('lista-numeros');
    const listaMensajes = document.getElementById('lista-mensajes');
    const listaClientes = document.getElementById('lista-clientes');
    
    // el div de la alerta personalizada, para mostrar errores o avisos.
    const alertaDiv = document.getElementById('alerta-personalizada');
    const alertaMensaje = document.getElementById('alerta-mensaje');

    // esta función se encarga de dibujar los datos en la pantalla.
    // le pasás el elemento de la lista (ul/ol) y los datos, y te actualiza el html.
    const renderizarLista = (listaElement, datos, esOrdenada = false) => {
        listaElement.innerHTML = ''; // primero, borramos todo lo que había para no duplicar.
        if (datos.length === 0) {
            listaElement.innerHTML = '<li class="vacio">la lista está vacía</li>';
            return; // si no hay datos, mostramos un mensajito y listo.
        }
        // si hay datos, recorremos el array y creamos un 'li' por cada elemento.
        datos.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            listaElement.appendChild(li); // lo agregamos a la lista en el html.
        });
    };
    
    // ---- funciones de alerta ---- //
    // función para hacer visible la alerta con un mensaje.
    const mostrarAlerta = (mensaje) => {
        alertaMensaje.textContent = mensaje;
        alertaDiv.classList.remove('oculto'); // le sacamos la clase que la oculta.
    };
    
    // función para esconder la alerta. la ponemos en 'window' para poder llamarla desde el html.
    window.ocultarAlerta = () => {
        alertaDiv.classList.add('oculto'); // le ponemos la clase que la hace invisible.
    };

    // ---- lógica de comunicación con el backend (fetch) ---- //
    
    // una función genérica para agregar elementos. es 'async' porque usa 'await' para esperar la respuesta del fetch.
    const agregarElemento = async (tipo, valor, inputElement, listaElement, esOrdenada = false) => {
        console.log(`[navegador] intentando agregar a '${tipo}':`, valor); // log para la consola del navegador.
        try {
            // usamos fetch para mandarle los datos al servidor, a la ruta '/agregar'.
            const respuesta = await fetch('/agregar', {
                method: 'POST', // el método tiene que ser post.
                headers: { 'content-type': 'application/json' }, // le avisamos que le mandamos json.
                body: JSON.stringify({ tipo, valor }), // convertimos nuestro objeto js a un string json.
            });

            const resultado = await respuesta.json(); // convertimos la respuesta del servidor (que es json) a un objeto js.
            
            // si el servidor nos dijo que hubo un problema, generamos un error.
            if (!resultado.exito) {
                throw new Error(resultado.mensaje);
            }
            
            console.log(`[navegador] respuesta del servidor (agregar):`, resultado); // otro log para ver qué nos mandó el server.
            renderizarLista(listaElement, resultado.datosActualizados, esOrdenada); // actualizamos la vista con los nuevos datos.
            inputElement.value = ''; // limpiamos el campo de texto.
            inputElement.focus(); // dejamos el cursor listo para escribir de nuevo.
            ocultarAlerta(); // por si había una alerta de error, la escondemos.

        } catch (error) {
            // si algo falla en el 'try' (la red, el servidor, etc.), lo agarramos acá.
            console.error('error al agregar:', error.message);
            mostrarAlerta(error.message); // y mostramos el error en nuestra alerta personalizada.
        }
    };
    
    // función parecida a la anterior, pero para procesar (quitar) elementos.
    const procesarPrimerElemento = async (tipo, listaElement, esOrdenada = false) => {
        console.log(`[navegador] intentando procesar primer elemento de '${tipo}'`);
        try {
            // le pegamos a la ruta '/procesar' del servidor.
            const respuesta = await fetch('/procesar', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ tipo }), // acá solo mandamos el tipo, no un valor.
            });

            const resultado = await respuesta.json();
            
            if (!resultado.exito) {
                 throw new Error(resultado.mensaje);
            }

            console.log(`[navegador] respuesta del servidor (procesar):`, resultado);
            
            // mostramos una alerta copada de que todo salió bien, diciendo qué se eliminó.
            mostrarAlerta(`elemento procesado: "${resultado.elementoEliminado}"`);
            
            // actualizamos la lista en la pantalla para que se vea que el elemento ya no está.
            renderizarLista(listaElement, resultado.datosActualizados, esOrdenada);

        } catch (error) {
            console.error('error al procesar:', error.message);
            mostrarAlerta(error.message);
        }
    };

    // acá es donde le decimos al javascript qué hacer cuando el usuario hace algo (un click, un envío de form).

    // 1. números
    formNumeros.addEventListener('submit', (e) => {
        e.preventDefault(); // esto frena el comportamiento por defecto del form, que es recargar la página. clave.
        const valor = inputNumero.value.trim(); // agarramos el valor del input y le sacamos espacios en blanco.
        // validación del lado del cliente: que no esté vacío y que sea un número.
        if (valor === '' || isNaN(valor)) {
            mostrarAlerta('error: debes ingresar un valor numérico.');
            return; // si no pasa la validación, cortamos la ejecución acá.
        }
        agregarElemento('numeros', valor, inputNumero, listaNumeros); // si todo ok, llamamos a la función para agregarlo.
    });

    // cuando se hace click en el botón de quitar número.
    btnQuitarNumero.addEventListener('click', () => {
        procesarPrimerElemento('numeros', listaNumeros);
    });

    // 2. mensajes (la lógica es casi idéntica, solo cambian las validaciones)
    formMensajes.addEventListener('submit', (e) => {
        e.preventDefault();
        const valor = inputMensaje.value.trim();
        // validación: que el mensaje no esté vacío.
        if (valor === '') {
            mostrarAlerta('error: el mensaje no puede estar vacío.');
            return;
        }
        // validación: que no sea un número puro, para que tenga un poco más de sentido.
        if (!isNaN(valor)) {
            mostrarAlerta('error: un mensaje de chat no debería ser solo un número.');
            return;
        }
        agregarElemento('mensajes', valor, inputMensaje, listaMensajes);
    });

    btnQuitarMensaje.addEventListener('click', () => {
        procesarPrimerElemento('mensajes', listaMensajes);
    });
    
    // 3. clientes (misma lógica otra vez)
    formClientes.addEventListener('submit', (e) => {
        e.preventDefault();
        const valor = inputCliente.value.trim();
        // validación: que el nombre no esté vacío.
        if (valor === '') {
            mostrarAlerta('error: el nombre del cliente no puede estar vacío.');
            return;
        }
        // validación: que el nombre no sea solo un número.
         if (!isNaN(valor)) {
            mostrarAlerta('error: el nombre de un cliente no puede ser un número.');
            return;
        }
        agregarElemento('clientes', valor, inputCliente, listaClientes, true);
    });

    btnAtenderCliente.addEventListener('click', () => {
        procesarPrimerElemento('clientes', listaClientes, true);
    });

});