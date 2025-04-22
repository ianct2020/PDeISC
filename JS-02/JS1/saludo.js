function saludar(nombre) { // se crea la funcion
  return `Hola, ${nombre}! Bienvenido a Node.js`; //devuelve el mensaje con el la variante que se definio
  //  como nombre cuando se llama a la funcion saludar
  
}
module.exports = { saludar }; // se habilita  ala funcion saludar para q se pueda acceder desde otros archivos