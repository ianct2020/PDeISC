let h1Creado = false;
const textoOriginal = "Hola DOM";
const colorOriginal = "#000000";
const imagenOriginal = "img1.jpeg";
const imagenAlternativa = "img2.jpeg";
const tamañoOriginal = 300;
const tamañoAlternativo = 150;

function agregarH1() { //se crea la funcion para agregar texto
  if (!h1Creado) {
    const h1 = document.createElement("h1"); //se crea y vincula
    h1.textContent = textoOriginal;
    h1.id = "h1dinamico"; // se le pone un id
    h1.style.color = "white"; //color del texto
    document.getElementById("contenedor").appendChild(h1); //se busca el elemento contenedor segun el id con "getelementbyid"
    //y se agrega a la pagina con el appendchild
    h1Creado = true; // esto es para q no se cree mas de una ves si se ejecuta de nuevo la funcion agregarh1
  }
}

function eliminarH1() { //se crea la funcion para eliminar el texto 
  const h1 = document.getElementById("h1dinamico"); // se busca h1dinamico, para guardarlo en h1
  if (h1) {
    h1.remove();        // si detecta que se creo el h1 lo borra con el h1.remove
    h1Creado = false;
  }
}

function cambiarTexto() { //se crea la funcion 
  const h1 = document.getElementById("h1dinamico"); // se busca h1dinamico, para guardarlo en h1
  if (h1) {
    h1.textContent = "Chau DOM"; // se cambia el contenido  por chau dom 
  }
}

function restaurarTexto() {  //se crea la funcion 
  const h1 = document.getElementById("h1dinamico"); // se busca h1dinamico, para guardarlo en h1
  if (h1) {
    h1.textContent = textoOriginal; // con el 'texto original' q se creo antes se iguala al h1 para que quede lo  q estaba al principio
  }
}

function cambiarColor() { //se crea la funcion 
  const h1 = document.getElementById("h1dinamico"); // se busca h1dinamico, para guardarlo en h1
  if (h1) {
    h1.style.color = getRandomColor(); // se cambia el color de el texto h1 con la funcion getramdomcolor
  }
}

function restaurarColor() { //se crea la funcion 
  const h1 = document.getElementById("h1dinamico");  // se busca h1dinamico, para guardarlo en h1
  if (h1) {
    h1.style.color = colorOriginal; // con el colororiginal guardado antes se vuelve a por defecto 
  }
}

function agregarImagen() { //se crea la funcion 
  const img = document.getElementById("imagen"); // se busca imagen, para guardarlo en img
  img.style.display = "block"; // configuracion para que la imagen se vea bien
  img.src = imagenOriginal; // se establece que img es imagen original
  img.style.maxWidth = tamañoOriginal + "px"; //se configura para q la imagen no sobrepase el maxwidth (tamano maximo)
} //y despues se suma el tamano original de la iamgen a px

function quitarImagen() { //se crea la funcion 
  const img = document.getElementById("imagen"); // se busca imagen, para guardarlo en img
  img.style.display = "none"; // se remueve la imagen igualando el estilo a none (nada)
}

function cambiarImagen() { //se crea la funcion 
  const img = document.getElementById("imagen"); // se busca imagen, para guardarlo en img
  if (img.style.display === "block") { // solo si la imagen se esta mostrando
    img.src = (img.src.includes(imagenOriginal)) ? imagenAlternativa : imagenOriginal; // se alterna, si hay una imagen se pone la otra y viceversa
  } 
}

function restaurarImagen() { //se crea la funcion 
  const img = document.getElementById("imagen"); // se busca imagen, para guardarlo en img
  if (img.style.display === "block") {  // solo si la imagen se esta mostrando
    img.src = imagenOriginal; // se iguala la fuente o origen de la imagen original para restaurar la que estaba por defecto
  }
}

function cambiarTamaño() { //se crea la funcion 
  const img = document.getElementById("imagen"); // se busca imagen, para guardarlo en img
  if (img.style.display === "block") { // solo si la imagen se esta mostrando
    img.style.maxWidth = (img.style.maxWidth === tamañoOriginal + "px") ? tamañoAlternativo + "px" : tamañoOriginal + "px";
  } // si hay un tamano se cambia al otro
}

function restaurarTamaño() { //se crea la funcion 
  const img = document.getElementById("imagen");  // se busca imagen, para guardarlo en img
  if (img.style.display === "block") { // solo si la imagen se esta mostrando
    img.style.maxWidth = tamañoOriginal + "px"; // se le asigna el tamano original, para mostrarlo asi
  }
}

function getRandomColor() { //se crea la funcion 
  const letras = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letras[Math.floor(Math.random() * 16)];
  } // para hacer un color aleatorio se hace 6 veces este proceso:
  // primero se agregan las letras y los numeros , despues con el for se agrega 
  // una letra y despues un numero aleatiroo, y asi 6 veces hasta llegar a que haya algo asi: a1b2c3
  return color;
}
