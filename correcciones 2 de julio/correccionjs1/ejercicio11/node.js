// server.js

// acá traemos express, que es el framework que vamos a usar para el servidor.
const express = require('express');
// también traemos 'path' para manejar las rutas de los archivos más fácil.
const path = require('path');
// creamos la aplicación de express.
const app = express();
// definimos el puerto donde va a correr nuestro servidor, el 3000 en este caso.
const port = 3000;

// middleware: esto es para que nuestro servidor entienda los datos json que nos manda el front.
app.use(express.json());

// acá le decimos a express que la carpeta public tiene los archivos que el navegador necesita (html, css, js).
app.use(express.static(path.join(__dirname, 'public')));

// esta es la ruta a la que le pega el front para guardar cosas. es un método post.
app.post('/guardar', (req, res) => {
  // mostramos en la consola del servidor lo que nos llegó.
  console.log('✅ datos recibidos en el servidor:', req.body);

  // nos fijamos qué tipo de dato nos llegó para dar una respuesta más clara.
  let tipodato = 'desconocido';
  if (req.body.hasownproperty('numero')) tipodato = 'número';
  if (req.body.hasownproperty('palabra')) tipodato = 'palabra';
  if (req.body.hasownproperty('usuario')) tipodato = 'usuario';

  // le mandamos una respuesta al front para que sepa que recibimos todo joya.
  res.status(200).json({
    status: 'ok',
    mensaje: `${tipodato} guardado correctamente en el servidor.`,
    datosrecibidos: req.body
  });
});

// y acá levantamos el servidor. va a empezar a escuchar en el puerto que definimos.
app.listen(port, () => {
  console.log(`🚀 servidor corriendo en http://localhost:${port}`);
});