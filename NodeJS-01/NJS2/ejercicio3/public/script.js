let h1Creado = false;
const textoOriginal = "Hola DOM";
const colorOriginal = "white";
const imagenOriginal = "img1.jpeg";
const imagenAlternativa = "img2.jpeg";
const tamañoOriginal = 300;
const tamañoAlternativo = 150; // no pongo comentarios porq es el mismo codigo que el punto 2

const boton = document.getElementById("botonUnico");

boton.addEventListener("click", agregarH1);
boton.addEventListener("dblclick", cambiarTexto);
boton.addEventListener("mouseenter", cambiarColor);
boton.addEventListener("contextmenu", cambiarImagen);

function agregarH1() {
  if (!h1Creado) {
    const h1 = document.createElement("h1");
    h1.textContent = textoOriginal;
    h1.id = "h1dinamico";
    h1.style.color = "white";
    document.getElementById("contenedor").appendChild(h1);
    h1Creado = true;
  }
}

function cambiarTexto() {
  const h1 = document.getElementById("h1dinamico");
  if (h1) {
    h1.textContent = "Chau DOM";
  }
}

function cambiarColor() {
  const h1 = document.getElementById("h1dinamico");
  if (h1) {
    h1.style.color = getRandomColor();
  }
}

function cambiarImagen(event) {
  event.preventDefault();
  const img = document.getElementById("imagen");
  img.style.display = "block";
  img.src = (img.src.includes(imagenOriginal)) ? imagenAlternativa : imagenOriginal;
}

function cambiarTamaño() {
  const img = document.getElementById("imagen");
  if (img.style.display === "block") {
    img.style.maxWidth = (img.style.maxWidth === tamañoOriginal + "px") ? tamañoAlternativo + "px" : tamañoOriginal + "px";
  }
}

function getRandomColor() {
  const letras = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letras[Math.floor(Math.random() * 16)];
  }
  return color;
}

let teclaGPresionada = false;

document.addEventListener('keydown', function(event) {
  if (event.key.toLowerCase() === 'g') {
    teclaGPresionada = true;
  }
});

document.addEventListener('keyup', function(event) {
  if (event.key.toLowerCase() === 'g') {
    teclaGPresionada = false;
  }
});

boton.addEventListener('click', function() {
  if (teclaGPresionada) {
    cambiarTamaño();
  }
});

//"Contar hijos"
document.getElementById('contarHijos').addEventListener('click', () => {
  const cantidad = document.body.children.length;
  document.getElementById('resultado').textContent = `El body tiene ${cantidad} elementos hijos.`;
});
