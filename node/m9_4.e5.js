// IMPORTAMOS EL MÓDULO HTTP PARA CREAR UN SERVIDOR WEB
import { createServer } from 'node:http';

// CREAMOS EL HTML CON TABLA ESTILIZADA EN NEGRO Y ROJO
const html = `
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #000;
        color: #f00;
        text-align: center;
        margin-top: 50px;
      }
      table {
        margin: 0 auto;
        border-collapse: collapse;
        background-color: #111;
        color: #f00;
      }
      th, td {
        border: 2px solid #f00;
        padding: 10px 20px;
      }
      th {
        background-color: #222;
        color: #f00;
      }
    </style>
  <body>
    <h3>RESULTADOS DE LAS OPERACIONES</h3>
    <table>
      <tr><th>OPERACIÓN</th><th>RESULTADO</th></tr>
      <tr><td>5 + 3</td><td>${5 + 3}</td></tr>
      <tr><td>8 - 6</td><td>${8 - 6}</td></tr>
      <tr><td>3 * 11</td><td>${3 * 11}</td></tr>
      <tr><td>30 / 5</td><td>${30 / 5}</td></tr>
    </table>
`;

// CREAMOS EL SERVIDOR QUE RESPONDE CON EL HTML
const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' }); // INDICAMOS QUE ES HTML
  res.end(html); // ENVIAMOS EL HTML COMO RESPUESTA
});

// INICIAMOS EL SERVIDOR EN PUERTO 3000
server.listen(3000, () => {
  console.log('SERVIDOR ESCUCHANDO EN http://localhost:3000');
});
