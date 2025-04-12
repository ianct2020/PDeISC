// este programa tambien hace calculos, pero usando funciones
//se crea la funcion ,con dos partes, a y b, y despues abajo se pone lo que se va
// a hacer con estos dos caracteres, en el primer caso sumar. asi que
// al final se llama a la funcion con los a y b que se quiere usar en cada caso

// función para sumar dos números
function sumar(a, b) {
  return a + b;
}

// función para restar dos números
function restar(a, b) {
  return a - b;
}

// función para multiplicar dos números
function multiplicar(a, b) {
  return a * b;
}

// función para dividir dos números
function dividir(a, b) {
  return a / b;
}

// mostrar resultados usando las funciones
console.log("Suma (4 + 5): " + sumar(4, 5));
console.log("Resta (3 - 6): " + restar(3, 6));
console.log("Multiplicación (2 * 7): " + multiplicar(2, 7));
console.log("División (20 / 4): " + dividir(20, 4));
