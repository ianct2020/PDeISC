// nos aseguramos de que todo el documento html esté cargado antes de empezar a ejecutar el javascript.
document.addEventListener('DOMContentLoaded', () => {

    // arrays para almacenar los datos en la memoria del navegador.
    const animales = [];
    const listaDeCompras = [];
    const arrayParaVaciar = [];

    // guardamos en variables los elementos del html con los que vamos a interactuar.
    // es una buena práctica para no tener que buscarlos a cada rato.
    
    // sección animales
    const formAnimales = document.getElementById('form-animales');
    const inputAnimal = document.getElementById('input-animal');
    const btnPopAnimal = document.getElementById('btn-pop-animal');
    const listaAnimalesDisplay = document.getElementById('lista-animales');

    // sección compras
    const formCompras = document.getElementById('form-compras');
    const inputProducto = document.getElementById('input-producto');
    const btnPopCompras = document.getElementById('btn-pop-compras');
    const listaComprasDisplay = document.getElementById('lista-compras');
    
    // sección vaciar array
    const formVaciar = document.getElementById('form-vaciar');
    const inputElemento = document.getElementById('input-elemento');
    const btnVaciarArray = document.getElementById('btn-vaciar-array');
    const listaVaciarDisplay = document.getElementById('lista-vaciar');
    
    // alerta
    const alertaDiv = document.getElementById('alerta');


    /**
     * esta función se encarga de mostrar las alertas personalizadas en la pantalla.
     * @param {string} mensaje - el texto a mostrar.
     * @param {string} tipo - 'error' o 'exito'.
     */
    function mostrarAlerta(mensaje, tipo) {
        // le ponemos el texto que queremos mostrar.
        alertaDiv.textContent = mensaje;
        // le cambiamos las clases para que se vea y tenga el color correcto (rojo para error, verde para éxito).
        alertaDiv.className = `alerta ${tipo} mostrar`;

        // hacemos que la alerta desaparezca sola después de 3 segundos.
        setTimeout(() => {
            alertaDiv.classList.remove('mostrar');
        }, 3000);
    }
    
    /**
     * una función para mostrar en la pantalla cómo está el array en cada momento.
     * @param {htmlelement} displayelement - el div donde se mostrará la lista.
     * @param {array<string>} array - el array de datos.
     */
    function actualizarVista(displayElement, array) {
        // si el array está vacío, avisamos.
        if (array.length === 0) {
            displayElement.textContent = `la lista está vacía.`;
        } else {
            // si tiene cosas, las juntamos con una coma y un espacio y las mostramos.
            displayElement.textContent = array.join(', ');
        }
        // también lo mostramos en la consola del navegador para ir viendo .
        console.log(`[navegador] estado de ${displayElement.id}: [${array.join(', ')}]`);
    }

    /**
     * esta es la función que se comunica con nuestro servidor usando fetch.
     * @param {string} tipo - identificador del array (ej: 'animales').
     * @param {array<string>} data - el array actualizado.
     * @param {string} [eliminado] - el elemento que fue eliminado (opcional).
     */
    async function enviarAlServidor(tipo, data, eliminado = null) {
        try {
            // hacemos el pedido post a la ruta '/guardar' del servidor.
            const response = await fetch('/guardar', {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                },
                // convertimos nuestro objeto de javascript a un string de json para poder mandarlo.
                body: JSON.stringify({ tipo, data, eliminado }),
            });
            // esperamos la respuesta del servidor y la convertimos a un objeto.
            const result = await response.json();
            console.log(`[navegador] respuesta del servidor:`, result.message);
        } catch (error) {
            // si hay algún problema con la conexión, lo mostramos en la consola.
            console.error('[navegador] error al enviar datos al servidor:', error);
            mostrarAlerta('no se pudo conectar con el servidor.', 'error');
        }
    }
    

    // 1. animales
    // "escuchamos" el evento 'submit' del formulario de animales.
    formAnimales.addEventListener('submit', (e) => {
        // frenamos el comportamiento normal del formulario, que es recargar la página.
        e.preventDefault();
        // agarramos el valor del input y le sacamos los espacios de los costados.
        const nuevoAnimal = inputAnimal.value.trim();

        // chequeamos que lo que escribió el usuario cumpla con nuestras reglas.
        if (!/^[a-za-z\s]{3,}$/.test(nuevoAnimal)) {
            mostrarAlerta('el nombre del animal debe tener al menos 3 letras y no contener números.', 'error');
            return;
        }
        
        // si está todo bien, lo metemos en nuestro array de animales.
        animales.push(nuevoAnimal);
        // actualizamos lo que se ve en la pantalla.
        actualizarVista(listaAnimalesDisplay, animales);
        // le mandamos el array actualizado al servidor.
        enviarAlServidor('animales', animales);
        // limpiamos el campo de texto.
        inputAnimal.value = '';
        // hacemos foco en el input para que sea más cómodo seguir agregando.
        inputAnimal.focus();
    });

    // escuchamos el clic en el botón para eliminar el último animal.
    btnPopAnimal.addEventListener('click', () => {
        // nos fijamos si hay algo para sacar, si no, avisamos y no hacemos nada.
        if (animales.length === 0) {
            mostrarAlerta('no hay animales en la lista para eliminar.', 'error');
            return;
        }
        //  el método pop() saca el último elemento del array y nos lo devuelve.
        const animalEliminado = animales.pop();
        mostrarAlerta(`animal eliminado: "${animalEliminado}"`, 'exito');
        actualizarVista(listaAnimalesDisplay, animales);
        enviarAlServidor('animales', animales, animalEliminado);
    });

    // 2. lista de compras
    formCompras.addEventListener('submit', (e) => {
        e.preventDefault();
        const nuevoProducto = inputProducto.value.trim();

        // la misma validación que antes pero para productos.
        if (nuevoProducto.length < 2 || !/[a-za-z]/.test(nuevoProducto)) {
            mostrarAlerta('el producto debe tener al menos 2 caracteres y contener alguna letra.', 'error');
            return;
        }

        listaDeCompras.push(nuevoProducto);
        actualizarVista(listaComprasDisplay, listaDeCompras);
        enviarAlServidor('listaDeCompras', listaDeCompras);
        inputProducto.value = '';
        inputProducto.focus();
    });
    
    btnPopCompras.addEventListener('click', () => {
        if (listaDeCompras.length === 0) {
            mostrarAlerta('la lista de compras está vacía.', 'error');
            return;
        }
        // usamos pop() de nuevo, esta vez para la lista de compras.
        const productoEliminado = listaDeCompras.pop();
        mostrarAlerta(`producto quitado: "${productoEliminado}"`, 'exito');
        console.log(`[navegador] el método pop() devolvió: ${productoEliminado}`);
        actualizarVista(listaComprasDisplay, listaDeCompras);
        enviarAlServidor('listaDeCompras', listaDeCompras, productoEliminado);
    });

    // 3. vaciar array con while
    formVaciar.addEventListener('submit', (e) => {
        e.preventDefault();
        const nuevoElemento = inputElemento.value.trim();
        
        // validación para el campo genérico.
        if (nuevoElemento.length < 2 || !/[a-za-z]/.test(nuevoElemento)) {
            mostrarAlerta('el elemento debe tener al menos 2 caracteres y contener alguna letra.', 'error');
            return;
        }

        arrayParaVaciar.push(nuevoElemento);
        actualizarVista(listaVaciarDisplay, arrayParaVaciar);
        enviarAlServidor('arrayParaVaciar', arrayParaVaciar);
        inputElemento.value = '';
        inputElemento.focus();
    });

    btnVaciarArray.addEventListener('click', () => {
        if (arrayParaVaciar.length === 0) {
            mostrarAlerta('el array ya está vacío.', 'error');
            return;
        }
        
        let elementosEliminados = [];
        // este bucle se va a repetir mientras el array tenga por lo menos un elemento.
        while (arrayParaVaciar.length > 0) {
            // en cada vuelta, sacamos el último elemento con pop() y lo guardamos.
            const elementoEliminado = arrayParaVaciar.pop();
            elementosEliminados.push(elementoEliminado);
            console.log(`[navegador] vaciando... se eliminó: ${elementoEliminado}`);
        }
        
        mostrarAlerta(`array vaciado. se eliminaron: ${elementosEliminados.join(', ')}`, 'exito');
        actualizarVista(listaVaciarDisplay, arrayParaVaciar);
        // mandamos el array vacío al servidor para que sepa.
        enviarAlServidor('arrayParaVaciar', arrayParaVaciar, `vaciado completo. último elemento: ${elementosEliminados[0]}`);
    });
});