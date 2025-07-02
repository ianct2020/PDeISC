const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Lista temporal en memoria
let usuarios = [];

// Ruta POST para agregar usuario
app.post('/enviar', (req, res) => {
  const { usr, pass } = req.body;

  if (!usr || !pass) {
    return res.json({ success: false, mensaje: 'Faltan datos' });
  }

  if (usr.length < 3 || pass.length < 6) {
    return res.json({ success: false, mensaje: 'Usuario debe tener al menos 3 caracteres y la contraseña al menos 6.' });
  }

  usuarios.push({ usr });
  return res.json({ success: true, mensaje: 'Usuario registrado correctamente', personas: usuarios });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
