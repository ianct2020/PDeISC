document.getElementById("botonContarHijos").addEventListener("click", function() {
    // Seleccionamos el contenedor
    const contenedor = document.getElementById("contenedor");
    
    // Contamos el número de hijos del contenedor
    const numeroDeHijos = contenedor.children.length;
    
    // Mostramos el número de hijos
    alert("Número de hijos: " + numeroDeHijos);
  });
  