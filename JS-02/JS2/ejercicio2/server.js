const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/guardar', (req, res) => {
  const { animales, compras } = req.body;
  console.log("📥 Animales recibidos:", animales);
  console.log("🛒 Compras recibidas:", compras);
  res.json({ mensaje: "Datos guardados correctamente" });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
