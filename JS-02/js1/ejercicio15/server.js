const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

function decodificarMensaje(mensaje) {
  let resultado = '';
  let i = 0;
  while (i < mensaje.length) {
    if (mensaje[i] === '(') {
      i++;
      let fragmento = '';
      while (i < mensaje.length && mensaje[i] !== ')') {
        fragmento += mensaje[i];
        i++;
      }
      resultado += fragmento.split('').reverse().join('');
    } else {
      resultado += mensaje[i];
    }
    i++;
  }
  return resultado;
}

app.post('/decodificar', (req, res) => {
  const { mensaje } = req.body;
  const resultado = decodificarMensaje(mensaje);
  console.log("Decodificado:", resultado);
  res.json({ resultado });
});

app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
