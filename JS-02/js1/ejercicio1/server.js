const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/guardar', (req, res) => {
  const { frutas, amigos, numeros } = req.body;
  console.log('Frutas:', frutas);
  console.log('Amigos:', amigos);
  console.log('Números:', numeros);
  res.json({ mensaje: 'Datos recibidos correctamente.' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
