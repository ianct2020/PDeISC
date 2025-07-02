const express = require('express');
// el 'path' nos ayuda a manejar las rutas de los archivos, para no hacer lío.
const path = require('path');
// creamos nuestra aplicación con express.
const app = express();
// le decimos que vamos a laburar en el puerto 3000.
const port = 3000;

//  middlewares (cosas que se ejecutan en el medio) 

// esto es clave para que express entienda el json que le manda el frontend desde el fetch.
app.use(express.json());
// con esto le decimos a express que la carpeta 'public' tiene los archivos que ve la gente (html, css, etc.).
app.use(express.static(path.join(__dirname, 'public')));

//  "base de datos" en memoria 
// acá guardamos los datos mientras el server está prendido.
// arranca todo vacío.
const datos = {
  frutas: [],
  amigos: [],
  numeros: []
};

// --- rutas de la api ---

// este es el único camino (endpoint) que escucha nuestro backend. todo llega por acá con el método post.
app.post('/guardar', (req, res) => {
  // desarmamos el objeto que nos llega para laburar más cómodos.
  const { type, value } = req.body;

  // dejamos una marquita en la consola del servidor para ver qué nos llegó. re útil para buscar errores.
  console.log(`[servidor] recibida petición para guardar: tipo=${type}, valor=${value}`);

  //  validación en el backend (la que importa de verdad, por seguridad) 
  // por si las moscas, chequeamos que nos hayan mandado todo lo necesario.
  if (!type || value === undefined) {
    console.error('[servidor] error: faltan datos en la petición.');
    return res.status(400).json({ success: false, message: 'petición inválida. faltan datos.' });
  }

  // usamos un try...catch por si alguna validación falla.
  try {
    // un switch para ver qué tipo de dato es y qué hacemos con él.
    switch (type) {
      case 'fruta':
        // acá nos fijamos si el dato es una avivada o si está todo ok.
        if (typeof value !== 'string' || value.length < 3) {
          throw new Error('el nombre de la fruta debe tener al menos 3 letras.');
        }
        if (!/^[a-zá-ñ\s]+$/i.test(value)) {
            throw new Error('el nombre de la fruta solo puede contener letras.');
        }
        // si pasó la prueba, lo mandamos al array.
        datos.frutas.push(value);
        console.log('[servidor] fruta guardada. array actual:', datos.frutas);
        // si salió todo joya, le devolvemos al frontend un 'ok' y los datos actualizados.
        res.json({ success: true, message: '¡fruta guardada!', data: datos.frutas });
        break;

      case 'amigo':
         if (typeof value !== 'string' || value.length < 3) {
          throw new Error('el nombre del amigo debe tener al menos 3 letras.');
        }
        if (!/^[a-zá-ñ\s]+$/i.test(value)) {
            throw new Error('el nombre del amigo solo puede contener letras.');
        }
        datos.amigos.push(value);
        console.log('[servidor] amigo guardado. array actual:', datos.amigos);
        res.json({ success: true, message: '¡amigo agregado!', data: datos.amigos });
        break;

      case 'numero':
        // acá la corrección: 'number' debe ser 'Number' con mayúscula.
        const numero = Number(value);
        // acá la corrección: 'isnan' debe ser 'isNaN'.
        if (isNaN(numero)) {
          // acá la corrección: 'error' debe ser 'Error' para crear un objeto de error.
          throw new Error('el valor ingresado no es un número válido.');
        }
        // si el array está vacío, el último número es 0. si no, es el último que haya.
        const ultimonumero = datos.numeros[datos.numeros.length - 1] || 0;
        if (numero <= ultimonumero) {
          throw new Error(`el número debe ser mayor que el último (${ultimonumero}).`);
        }
        datos.numeros.push(numero);
        console.log('[servidor] número guardado. array actual:', datos.numeros);
        res.json({ success: true, message: '¡número guardado!', data: datos.numeros });
        break;

      default:
        // por si mandan cualquier verdura.
        throw new Error('tipo de dato no reconocido.');
    }
  } catch (error) {
    // si alguna validación de arriba falló, el 'throw' nos manda para acá.
    console.error(`[servidor] error de validación: ${error.message}`);
    // le mandamos al frontend un 400 (bad request) y el porqué.
    res.status(400).json({ success: false, message: error.message });
  }
});

// --- iniciar servidor ---
// acá prendemos el motor, ponemos el servidor a """""escuchar""""" en el puerto que le dijimos.
app.listen(port, () => {
  console.log(`[servidor] corriendo en http://localhost:${port}`);
});