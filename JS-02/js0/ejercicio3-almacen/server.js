const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let personas = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/guardar', (req, res) => {
  const { nombre, apellido, edad, nacimiento, sexo, documento, estadoCivil, nacionalidad, telefono, mail, hijos } = req.body;

  console.log('Datos recibidos:', req.body); // enviar mensaje si recibe todo

  if (!nombre || !apellido || !edad || !nacimiento || !sexo || !documento || !estadoCivil || !nacionalidad || !telefono || !mail) {
    return res.json({ success: false, mensaje: 'Todos los campos son obligatorios' }); // para q si o si se llenen todos los campos
  }

  personas.push({ nombre, apellido });
  res.json({ success: true, mensaje: 'Persona guardada correctamente', personas }); // mostrar cuanso salio todo bien
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
