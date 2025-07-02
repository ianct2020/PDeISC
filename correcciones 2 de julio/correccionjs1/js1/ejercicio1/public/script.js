
document.addEventListener('domcontentloaded', () => {

  // agarramos las cosas del html para poder usarlas acá en el javascript.
  const forms = document.querySelectorAll('form');
  const alertelement = document.getElementById('custom-alert');

  // esta es la función que maneja esa alerta  que aparece arriba.
  const showalert = (message, iserror = false) => {
    alertelement.textContent = message;
    // le sacamos y ponemos clases de css para que cambie de color y aparezca.
    alertelement.classList.remove('hidden', 'success', 'error');
    alertelement.classList.add(iserror ? 'error' : 'success');

    // para que no quede ahí, la hacemos desaparecer después de 3 segundos.
    setTimeout(() => {
      alertelement.classList.add('hidden');
    }, 3000);
  };

  // esta se encarga de refrescar la lista en la pantalla para que se vea el dato nuevo.
  const updateui = (type, dataarray) => {
    // buscamos el lugar donde mostrar el resultado según el tipo de dato.
    const displayelement = document.getElementById(`resultado-${type}s`); // ej: resultado-frutas
    if (displayelement) {
      // metemos el array formateado para que se vea lindo.
      displayelement.textContent = `[${dataarray.join(', ')}]`;
    }
  };

  // esta es la función más importante, la que "habla" con el servidor.
  const senddata = async (type, value) => {
    // un log para nosotros, para ver en la consola del navegador qué estamos por mandar.
    console.log(`[frontend] enviando al servidor: tipo=${type}, valor=${value}`);

    // un try...catch por si se corta internet o el server está caído, para que la página no quede muerta.
    try {
      // acá pasa la magia. le pegamos al '/guardar' del backend con el método post.
      const response = await fetch('/guardar', {
        method: 'post',
        headers: {
          // le avisamos que le estamos mandando un json, para que sepa.
          'content-type': 'application/json',
        },
        // convertimos nuestro objeto de js a un texto en formato json porque así viaja por la red.
        body: json.stringify({ type, value }),
      });

      // la respuesta del server también es json, la convertimos de nuevo a un objeto para poder usarla.
      const result = await response.json();
      console.log('[frontend] respuesta del servidor:', result);

      // el servidor nos dice si salió todo bien o no.
      if (result.success) {
        // si nos dio el ok, mostramos la alerta de éxito.
        showalert(result.message, false);
        // y actualizamos la lista en la pantalla con los datos frescos que nos devolvió el server.
        updateui(type, result.data);
      } else {
        // si el server nos retó por algo, mostramos ese reto en la alerta de error.
        showalert(result.message, true);
      }
    } catch (error) {
      console.error('[frontend] error de red o al contactar el servidor:', error);
      showalert('uh, no me pude conectar con el servidor. probá después.', true);
    }
  };


  // le ponemos un "espía" a cada formulario para cachar cuando el usuario le da a 'agregar'.
  forms.forEach(form => {
    form.addEventListener('submit', (event) => {
      // esta línea es fundamental, frena la recarga de la página que hacen los formularios por defecto.
      event.preventDefault();

      const input = form.querySelector('input');
      // sacamos el 'data-type' que pusimos en el html para saber qué estamos mandando.
      const type = form.dataset.type;
      // agarramos el valor del input y le sacamos los espacios de los costados por las dudas.
      const value = input.value.trim();

      //  validación en el frontend (la que ve el usuario al toque)
      // antes de mandar cualquier cosa al servidor, chequeamos acá nomás, si el dato tiene sentido.
      if (!value) {
        showalert('che, te olvidaste de escribir algo.', true);
        return; // cortamos acá y no seguimos.
      }
      
      if(input.type === 'text' && input.pattern){
          const regex = new RegExp(input.pattern);
          if(!regex.test(value)){
              showalert(input.title || 'el formato del texto no es válido.', true);
              return;
          }
      }

      // si todo parece estar bien, llamamos a la función que lo manda para el fondo.
      senddata(type, value);
      // limpiamos el campo para que el usuario pueda escribir otra cosa.
      input.value = '';
    });
  });

});