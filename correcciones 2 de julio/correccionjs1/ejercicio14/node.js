// server.js

// traemos el aparato de express para usarlo
const express = require('express');
// esto es para laburar con las rutas de los archivos
const path = require('path');

const app = express();
// definimos el puerto donde va a correr el servidor, el 3000 si no hay otro
const PORT = process.env.PORT || 3000;

// middlewares
// un middleware para que el servidor entienda el formato json, una pavada
app.use(express.json());
// le decimos a express que la carpeta 'public' tiene los archivos que se ven en la web
app.use(express.static(path.join(__dirname, 'public')));

// acá armamos la ruta que va a recibir los datos para laburar
app.post('/reverse-data', (req, res) => {
  // de todo el choclo que nos llega, sacamos el 'data' que es lo que nos importa
  const { data } = req.body;

  // por las dudas, chequeamos que lo que llegó sea un array
  if (!Array.isArray(data)) {
    return res.status(400).json({ error: 'el dato enviado no es un array' });
  }

  // un avisito en la consola para saber que entró algo nuevo
  console.log('--- nueva petición ---');
  // mostramos en la terminal qué nos mandó el pibe desde la página
  console.log('datos recibidos del cliente:', data);

  // hacemos una copia y damos vuelta el array con el reverse()
  const reversedData = [...data].reverse();

  // mostramos cómo quedó el coso este ya dado vuelta
  console.log('datos invertidos para enviar:', reversedData);

  // le mandamos de vuelta al navegador el dato original y el invertido
  res.json({ originalData: data, reversedData: reversedData });
});


// ponemos el servidor a listenear, a la espera de que alguien se conecte
app.listen(PORT, () => {
  // avisamos en la terminal que el boliche ya está abierto
  console.log(`servidor corriendo en http://localhost:${PORT}`);
});