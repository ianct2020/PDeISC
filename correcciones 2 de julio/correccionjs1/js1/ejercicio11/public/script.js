// script.js
// nos aseguramos de que todo el html esté cargado antes de correr nuestro código.
document.addeventlistener('domcontentloaded', () => {

    // este es nuestro 'estado', una cajita donde guardamos los arrays con los datos que va metiendo el usuario.
    const state = {
        numeros: [],
        palabras: [],
        usuarios: []
    };

    // --- selectores del dom ---
    // acá agarramos todos los elementos del html para poder manipularlos después. es como tenerlos a mano.
    const alertadiv = document.getelementbyid('alerta-custom');

    // sección números
    const formnumeros = document.getelementbyid('form-numeros');
    const inputnumero = document.getelementbyid('input-numero');
    const btnfiltrarnumeros = document.getelementbyid('btn-filtrar-numeros');
    const listanumeros = document.getelementbyid('lista-numeros');
    const resultadonumeros = document.getelementbyid('resultado-numeros');

    // sección palabras
    const formpalabras = document.getelementbyid('form-palabras');
    const inputpalabra = document.getelementbyid('input-palabra');
    const btnfiltrarpalabras = document.getelementbyid('btn-filtrar-palabras');
    const listapalabras = document.getelementbyid('lista-palabras');
    const resultadopalabras = document.getelementbyid('resultado-palabras');

    // sección usuarios
    const formusuarios = document.getelementbyid('form-usuarios');
    const inputusuarionombre = document.getelementbyid('input-usuario-nombre');
    const inputusuarioactivo = document.getelementbyid('input-usuario-activo');
    const btnfiltrarusuarios = document.getelementbyid('btn-filtrar-usuarios');
    const listausuarios = document.getelementbyid('lista-usuarios');
    const resultadousuarios = document.getelementbyid('resultado-usuarios');


    // esta función la usamos para mostrar mensajes en pantalla más fachero que el alert() del navegador.
    const mostraralerta = (mensaje, tipo = 'error') => {
        alertadiv.textcontent = mensaje;
        alertadiv.classname = `alerta ${tipo === 'error' ? 'alerta-error' : 'alerta-exito'}`;
        alertadiv.classlist.add('mostrar');

        // después de 3 segundos, la hacemos desaparecer.
        settimeout(() => {
            alertadiv.classlist.remove('mostrar');
        }, 3000);
    };


    // esta función se encarga de"""dibujar""" las listas en la página.
    const renderizar = (datos, elementolista) => {
        elementolista.innerhtml = ''; // primero limpiamos la lista para no duplicar nada.
        datos.foreach(item => {
            const li = document.createelement('li');
            // si es un usuario (que es un objeto), lo mostramos de una forma especial.
            if (typeof item === 'object' && item !== null) {
                li.textcontent = `${item.nombre} (${item.activo ? 'activo' : 'inactivo'})`;
            } else {
                li.textcontent = item; // si no, mostramos el dato como viene.
            }
            elementolista.appendchild(li);
        });
    };

    
    // esta se comunica con nuestro server.js usando fetch. es la que manda los datos para "guardar".
    const enviardatosalbackend = async (data) => {
        try {
            const response = await fetch('/guardar', {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                },
                body: json.stringify(data), // convertimos nuestros datos a un string json.
            });

            if (!response.ok) {
                // si el servidor nos tira un error, lo mostramos.
                throw new error('error en la respuesta del servidor');
            }

            const resultado = await response.json();
            console.log('respuesta del servidor:', resultado); // mostramos la respuesta del server en la consola del navegador.
        } catch (error) {
            console.error('error al enviar datos:', error);
            mostraralerta('no se pudo conectar con el servidor.', 'error');
        }
    };


    // --- lógica y eventos: números ---
    formnumeros.addeventlistener('submit', (e) => {
        e.preventdefault(); // esto frena el comportamiento por defecto del form, que es recargar la página.
        const valor = inputnumero.value.trim(); // agarramos el valor y le sacamos espacios extra.

        // verificación: acá validamos que el usuario no mande fruta.
        if (valor === '') {
            return mostraralerta('el campo de número no puede estar vacío.');
        }
        if (isnan(valor)) {
            return mostraralerta('por favor, ingresa solo números.');
        }

        const numero = number(valor);
        state.numeros.push(numero); // lo metemos a nuestro array de números.
        renderizar(state.numeros, listanumeros); // actualizamos la lista en la pantalla.
        console.log('número agregado:', numero); // lo mostramos en la consola del navegador.
        enviardatosalbackend({ numero }); // se lo mandamos al backend.
        formnumeros.reset(); // limpiamos el campo del formulario.
        inputnumero.focus(); // dejamos el cursor listo para que escriba de nuevo.
    });

    btnfiltrarnumeros.addeventlistener('click', () => {
        //  crear un nuevo array solo con los números mayores a 10.
        const numerosfiltrados = state.numeros.filter(num => num > 10);
        renderizar(numerosfiltrados, resultadonumeros); // mostramos el resultado en su lista.
        console.log('resultado filtro de números (> 10):', numerosfiltrados);
    });


    formpalabras.addeventlistener('submit', (e) => {
        e.preventdefault();
        const palabra = inputpalabra.value.trim();

        // verificación: que no esté vacío y que sean solo letras.
        if (palabra === '') {
            return mostraralerta('el campo de palabra no puede estar vacío.');
        }
        if (!/^[a-z]+$/.test(palabra)) { // esta expresión regular valida que solo haya letras minúsculas.
            return mostraralerta('por favor, ingresa solo letras (sin números ni espacios).');
        }

        state.palabras.push(palabra);
        renderizar(state.palabras, listapalabras);
        console.log('palabra agregada:', palabra);
        enviardatosalbackend({ palabra });
        formpalabras.reset();
        inputpalabra.focus();
    });

    btnfiltrarpalabras.addeventlistener('click', () => {
        // usamos filter() de nuevo, esta vez para quedarnos con las palabras de más de 5 letras.
        const palabrasfiltradas = state.palabras.filter(p => p.length > 5);
        renderizar(palabrasfiltradas, resultadopalabras);
        console.log('resultado filtro de palabras (> 5 letras):', palabrasfiltradas);
    });


    formusuarios.addeventlistener('submit', (e) => {
        e.preventdefault();
        const nombre = inputusuarionombre.value.trim();
        const activo = inputusuarioactivo.checked; // el .checked nos devuelve true si está marcado, o false si no.

        // verificación: solo chequeamos que el nombre no esté vacío.
        if (nombre === '') {
            return mostraralerta('el nombre del usuario no puede estar vacío.');
        }

        const usuario = { nombre, activo }; // creamos el objeto de usuario.
        state.usuarios.push(usuario); // lo mandamos al array de usuarios.
        renderizar(state.usuarios, listausuarios);
        console.log('usuario agregado:', usuario);
        enviardatosalbackend({ usuario });
        formusuarios.reset();
        inputusuarionombre.focus();
    });

    btnfiltrarusuarios.addeventlistener('click', () => {
        // y el último filter(): nos quedamos solo con los usuarios que tienen la propiedad 'activo' en true.
        const usuariosfiltrados = state.usuarios.filter(user => user.activo === true);
        renderizar(usuariosfiltrados, resultadousuarios);
        console.log('resultado filtro de usuarios (activos):', usuariosfiltrados);
    });
});