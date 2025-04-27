function mostrarDatos(event) {
  event.preventDefault(); // Evitar recargar la página

  const nombre = document.getElementById('nombre').value;
  const edad = document.getElementById('edad').value;
  const email = document.getElementById('email').value;
  const genero = document.querySelector('input[name="genero"]:checked')?.value || '';
  const pais = document.getElementById('pais').value;

  const intereses = [];
  if (document.getElementById('deporte').checked) intereses.push('Deporte');
  if (document.getElementById('musica').checked) intereses.push('Música');
  if (document.getElementById('viajes').checked) intereses.push('Viajes');

  const resultado = document.getElementById('resultado');
  
  resultado.innerHTML = `
    <h2>Datos Registrados:</h2>
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Edad:</strong> ${edad}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Género:</strong> ${genero}</p>
    <p><strong>País:</strong> ${pais}</p>
    <p><strong>Intereses:</strong> ${intereses.length ? intereses.join(', ') : 'Ninguno'}</p>
  `;
}
