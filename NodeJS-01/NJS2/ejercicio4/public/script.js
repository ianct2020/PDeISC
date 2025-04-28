const crearBtn = document.getElementById('crearEnlaces'); // estos 4 buscan por id y despues los igualan a constantes,
//  osea las constantes tienen el contenido de lo que se busco
const enlacesDiv = document.getElementById('enlaces');
const botonesDiv = document.getElementById('botonesModificar');
const resultadosDiv = document.getElementById('resultados');

let urls = [
  { texto: "Google", href: "https://www.google.com" },
  { texto: "YouTube", href: "https://www.youtube.com" },
  { texto: "Facebook", href: "https://www.facebook.com" },
  { texto: "Twitter", href: "https://www.twitter.com" },
  { texto: "Instagram", href: "https://www.instagram.com" } // en estas 5 se asigna a cada palabra un link, 
  // al apretar  la palabra te lleva al link q esta a la derecha
];

let nuevasUrls = [
  "https://www.wikipedia.org",
  "https://www.netflix.com",
  "https://www.reddit.com",
  "https://www.github.com",
  "https://www.spotify.com"
]; // las url que reemplazan las otras

crearBtn.addEventListener('click', function() { // aca es como que "escucha" a ver cuando haces click en el boton
  enlacesDiv.innerHTML = "";
  botonesDiv.innerHTML = "";
  resultadosDiv.innerHTML = ""; //iguala estos 'div' a nada 

  urls.forEach((info, index) => {
    const enlace = document.createElement('a'); 
    enlace.textContent = info.texto; 
    enlace.href = info.href;
    enlace.target = "_blank";
    enlace.id = `enlace${index}`;
    enlacesDiv.appendChild(enlace);

    const botonModificar = document.createElement('button');
    botonModificar.textContent = `Modificar ${info.texto}`;
    botonModificar.addEventListener('click', function() {
      modificarEnlace(index); 
    });
    botonesDiv.appendChild(botonModificar);  // Esto estaba fuera del lugar, se mueve dentro del forEach
  });
});

function modificarEnlace(index) {
  const enlace = document.getElementById(`enlace${index}`); // busca el enlace en la lista
  if (enlace) {
    const viejoHref = enlace.href;
    let nuevaHref = nuevasUrls[index]; // se reemplaza

    // Aseguramos que tenga https://
    if (!nuevaHref.startsWith('https://')) {
      nuevaHref = 'https://' + nuevaHref; 
    }

    enlace.href = nuevaHref; // se cambia el enlace
    const resultado = document.createElement('div');
    resultado.innerHTML = `<strong>${enlace.textContent}</strong>: cambiado de <span style="color:#03ffea;">${viejoHref}</span> a <span style="color:#03ffea;">${nuevaHref}</span>`;
    resultadosDiv.appendChild(resultado); // se muestra el cambio que se hizo por ejemplo :Facebook: cambiado de https://www.facebook.com/ a https://www.reddit.com
  }
}
