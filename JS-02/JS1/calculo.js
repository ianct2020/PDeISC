function sumar(a, b) { // funcion nombre y entre parentesis lo q vas a sumar
  return a + b; //devolver lo mismo  q se puso arriba pero con un + en el medio, para indicarle q se va a sumar
}
function multiplicar(a, b) { // funcion nombre y entre parentesis lo q vas a multiplicar
  return a * b; //devolver lo mismo  q se puso arriba pero con un * en el medio, para indicarle q se va a multiplicar
}
module.exports = { sumar, multiplicar }; //con module export indicas que se puede acceder desde otros archivos a las funciones sumar y multiplicar