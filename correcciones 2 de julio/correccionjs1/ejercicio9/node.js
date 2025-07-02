// server.js

//  acá nos traemos la librería express, que es la que nos ayuda a montar el servidor.
const express = require('express');
// y acá nos traemos 'path', una herramienta de node para laburar con las rutas de los archivos.
const path = require('path');

// creamos nuestra aplicación con express.
const app = express();
// definimos el puerto donde va a correr nuestro servidor. el 3000 es un clásico.
const port = 3000;

// esto es un 'middleware'. le dice a express que entienda los datos en formato json que nos van a llegar del navegador.
app.use(express.json());

// este es otro middleware. sirve para que express muestre los archivos estáticos (html, css, js del cliente) que están en la carpeta 'public'.
app.use(express.static(path.join(__dirname, 'public')));

// acá definimos una ruta. cuando el navegador haga un pedido 'post' a '/guardar', se ejecuta esto.
app.post('/guardar', (req, res) => {
  // 'req.body' es donde express nos deja los datos que mandó el cliente. lo guardamos en una variable.
  const datosrecibidos = req.body;

  // mostramos un mensajito en la consola del servidor para ver que todo llegó bien. un golazo para debuggear.
  console.log('✅ datos recibidos en el servidor:');
  console.log(datosrecibidos);

  // nos fijamos si los datos tienen la pinta que esperamos, para dar un mensaje más copado.
  if (datosrecibidos.tipo && datosrecibidos.datos) {
    console.log(`se procesaron ${datosrecibidos.datos.length} elementos de tipo "${datosrecibidos.tipo}".`);
  }

  // le mandamos una respuesta al navegador para que sepa que recibimos todo okey.
  // el status 200 significa que todo salió bien.
  res.status(200).json({
    status: 'ok',
    message: 'datos recibidos y procesados en el servidor con éxito.',
    recibido: datosrecibidos
  });
});

// acá le decimos a nuestra app que se ponga a escuchar en el puerto que definimos antes.
app.listen(port, () => {
  // y un mensajito en la consola para saber que el servidor ya está andando.
  console.log(`🚀 servidor corriendo en http://localhost:${port}`);
});