const url = require('url');

const miURL = 'http://localhost:3000/productos?categoria=ropa&color=rojo';
const resultado = url.parse(miURL, true);

console.log('Host:', resultado.host);
console.log('Pathname:', resultado.pathname);
console.log('Query:', resultado.query);
console.log('Parámetro "categoria":', resultado.query.categoria);