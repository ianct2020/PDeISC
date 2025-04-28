let h1Creado = false; // se
const textoOriginal = "Hola DOM";
const colorOriginal = "white";
const imagenOriginal = "img1.jpeg";
const imagenAlternativa = "img2.jpeg";
const tamañoOriginal = 300;
const tamañoAlternativo = 150;

const boton = document.getElementById("botonUnico");

boton.addEventListener("click", agregarH1); // en todas estas 4 lineas se vincula un evento 
// (click , q el mouse entre ahi ,etc), a una funcion, es decir cuando se hace
//  click se activa la funcion agregarh1 por ejemplo.
boton.addEventListener("dblclick", cambiarTexto);
boton.addEventListener("mouseenter", cambiarColor);
boton.addEventListener("contextmenu", cambiarImagen); 

function agregarH1() { // se crea la funcion
  if (!h1Creado) {
    const h1 = document.createElement("h1"); // se crea h1 y se guarda en la cons h1
    h1.textContent = textoOriginal; // se iguala el contenido de h1 al texto original "const textoOriginal = "Hola DOM";"
    h1.id = "h1dinamico"; // ahora el id de h1 seria h1dinamico
    h1.style.color = "white"; //color de el texto h1 blanco
    document.getElementById("contenedor").appendChild(h1); //se busca el elemento contenedor segun el id con "getelementbyid"
    //y se agrega a la pagina con el appendchild
    h1Creado = true; // esto es para q no se cree mas de una ves si se ejecuta de nuevo la funcion agregarh1
  }
}

function cambiarTexto() { //se crea la funcion
  const h1 = document.getElementById("h1dinamico"); // se busca h1dinamico, para guardarlo en h1
  if (h1) {
    h1.textContent = "Chau DOM"; // se cambia el contenido  por chau dom 
  }
}

function cambiarColor() { //se crea la funcion
  const h1 = document.getElementById("h1dinamico");   // se busca h1dinamico, para guardarlo en h1
  if (h1) {
    h1.style.color = getRandomColor(); // se cambia el color de el texto h1 con la funcion getramdomcolor
  }
}

function cambiarImagen(event) { //se crea la funcion
  event.preventDefault(); // hace que no se abra el menú del click derecho
  const img = document.getElementById("imagen"); // se busca imagen, para guardarlo en img
  img.style.display = "block"; // solo si la imagen se esta mostrando
  img.src = (img.src.includes(imagenOriginal)) ? imagenAlternativa : imagenOriginal; // se alterna, si hay una imagen se pone la otra y viceversa
}

function cambiarTamaño() { //se crea la funcion
  const img = document.getElementById("imagen"); // se busca imagen, para guardarlo en img
  if (img.style.display === "block") { // solo si la imagen se esta mostrando
    img.style.maxWidth = (img.style.maxWidth === tamañoOriginal + "px") ? tamañoAlternativo + "px" : tamañoOriginal + "px";
  } // si hay un tamano se cambia al otro
}

function getRandomColor() { //se crea la funcion
  const letras = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letras[Math.floor(Math.random() * 16)];
  }
  return color; // para hacer un color aleatorio se hace 6 veces este proceso:
  // primero se agregan las letras y los numeros , despues con el for se agrega 
  // una letra y despues un numero aleatiroo, y asi 6 veces hasta llegar a que haya algo asi: a1b2c3
}
let teclaGPresionada = false; // se declara como falsa para saber cuando se presiona 

document.addEventListener('keydown', function(event) {
  if (event.key.toLowerCase() === 'g') { //es como decirle que preste atencion a ver si se presiona la letra g 
    // y cuando pasa se cambia :
    //(keydown =tecal baja-presionada)
    teclaGPresionada = true;// de falso a verdadero
  }
});

document.addEventListener('keyup', function(event) { // esto es para saber si se solto la tecla (key up=tecla arriba)
  if (event.key.toLowerCase() === 'g') {
    teclaGPresionada = false;// cuando sabe q se solto vuelve a falso de nuevo
  }
});

boton.addEventListener('click', function() {
  if (teclaGPresionada) {
    cambiarTamaño(); // si sabe que la teclagpresionada es verdadero y ademas se hace click se ejecuta
    //  la funcion cambair tamano
  }
});
