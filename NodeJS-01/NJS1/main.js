const tiempo = require('./tiempo'); // se importa la funciones del archivo tiempo para usarla  mas abajo para decir el tiempo actual
const calculo = require('./calculo'); //se importa la funciones del archivo calculo para usarla  mas abajo para calcular
const saludo = require('./saludo'); //se importa la funciones del archivo saludo para usarla  mas abajo para saludar

console.log(saludo.saludar('Profe')); // se usa la funcion saludar para el nombre profe
console.log('Hora actual:', tiempo.obtenerHoraActual()); //se usa la funcion de obtener tiempo para saber la hora
console.log('Suma:', calculo.sumar(5, 3)); // se usa la funcion suma para los numeros 5 y 3
console.log('Multiplicación:', calculo.multiplicar(4, 6)); // se sua la funcion multiplicacion para los numeros 4 y 6