// server.js

// el 'path' nos ayuda a manejar las rutas de los archivos, para no hacer lío.
const express = require('express');
const path = require('path');

// creamos nuestra aplicación con express.
const app = express();
// le decimos que vamos a laburar en el puerto 3000.

const PORT = process.env.PORT || 3000;

// interpretar el cuerpo de las peticiones POST en formato JSON
app.use(express.json());
// (HTML, CSS, JS) desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

//ruta para recibir los datos del frontend
app.post('/guardar', (req, res) => {
  // mostramos en la consola del servidor los datos que llegaron
  console.log('✅ Datos recibidos en el servidor:');
  console.log(req.body);

  // mensaje de éxito
  res.status(200).json({ 
    status: 'ok', 
    message: 'Datos recibidos correctamente en el servidor.' 
  });
});

// iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});