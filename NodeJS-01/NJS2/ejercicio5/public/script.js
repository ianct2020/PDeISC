const contenedor = document.getElementById('contenedor');//se iguala el documento con id contenedor a contenedor

function agregarParrafo() { // se crea la funcion
  contenedor.innerHTML += `<p style="color:#03ffea;">Un párrafo se define como una unidad de sentido que da forma a un texto. Es una unidad visual puesto que es fácilmente reconocible por el lector como una porción de texto constituido por un conjunto de oraciones, pero además es una unidad de sentido porque en él se expone una idea que se desarrolla de principio a fin.</p>`;
} // gracias a la funcion innerhtml, podemos agregar codigo en html directamente aca

function agregarImagen() { // se crea la funcion
  contenedor.innerHTML += `<img src="img1.jpeg" alt="Imagen dinámica" style="margin:10px;">`;
} // gracias a la funcion innerhtml, podemos agregar codigo en html directamente aca

function agregarLista() { // se crea la funcion
  contenedor.innerHTML += ` 
    <ul style="list-style:none; padding:0;">
      <li style="color:#03ffea;">ronaldo</li>
      <li style="color:#03ffea;">messi</li>
      <li style="color:#03ffea;">neymar</li>
    </ul>
  `; // gracias a la funcion innerhtml, podemos agregar codigo en html directamente aca
}

function agregarTabla() { // se crea la funcion
  contenedor.innerHTML += `
    <table border="1" style="margin:auto; border-collapse:collapse; color:#03ffea;">
      <tr>
        <th>Nombre</th><th>Edad</th>
      </tr>
      <tr>
        <td>pedro</td><td>22</td>
      </tr>
      <tr>
        <td>juan</td><td>25</td>
      </tr>
    </table>
  `; // gracias a la funcion innerhtml, podemos agregar codigo en html directamente aca
}

function agregarVideo() { // se crea la funcion
  contenedor.innerHTML += `
    <video width="300" height="200" controls style="margin-top:10px;">
      <source src="video.mp4" type="video/mp4">
      Tu navegador no soporta la etiqueta de video.
    </video>
  `; // gracias a la funcion innerhtml, podemos agregar codigo en html directamente aca
}

