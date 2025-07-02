// server.js

// acá traemos el paquete de express para usarlo
const express = require('express');
// esto es para laburar con las rutas de los archivos
const path = require('path');
// creamos la aplicación de express
const app = express();
// le decimos en qué puerto tiene que andar el servidor
const PORT = 3000;

// este coso hace que express entienda los json que le mandamos desde el front
app.use(express.json());

// con esto le decimos que la carpeta public tiene todos los archivos que se ven en la página
app.use(express.static(path.join(__dirname, 'public')));

// acá armamos la ruta /guardar para cuando nos mandan datos
app.post('/guardar', (req, res) => {
  // un titulito para que se vea prolijo en la consola del servidor
  console.log('--- datos recibidos en el servidor ---');
  // acá mostramos en la consola del servidor lo que nos llegó, la data en crudo
  console.log(req.body);
  console.log('------------------------------------');
  
  // le respondemos al front que estuvo todo joya y le devolvemos un mensajito
  res.status(200).json({ 
    message: 'datos recibidos correctamente en el servidor',
    dataRecibida: req.body 
  });
});

// acá ponemos a andar el servidor
app.listen(PORT, () => {
  // y avisamos en la consola que ya está todo listo para usar
  console.log(`servidor corriendo en http://localhost:${PORT}`);
});