// Obtener el botón y el contenedor donde contamos los hijos
const botonContar = document.getElementById("botonContar");
const contenedor = document.getElementById("contenedor");
const resultado = document.getElementById("resultado");

// Función que se ejecuta cuando el botón es presionado
botonContar.addEventListener("click", function() {
  // Contamos los elementos hijos directos del contenedor
  const hijos = contenedor.children.length;
  
  // Mostramos el número de hijos en el elemento resultado
  resultado.textContent = "Número de hijos: " + hijos;
});
