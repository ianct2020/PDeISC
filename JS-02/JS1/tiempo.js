function obtenerHoraActual() { // se crea la funcion para la hora
  return new Date().toLocaleTimeString(); // devuelve la hora
}
module.exports = { obtenerHoraActual }; // se habilita para q se pueda acceder desde otros archivos