function mostrarDatos(event) {
  event.preventDefault(); // Evitar recargar la página

  const nombre = document.getElementById('nombre').value;
  const edad = document.getElementById('edad').value;
  const email = document.getElementById('email').value;
  const genero = document.querySelector('input[name="genero"]:checked')?.value || '';
  const pais = document.getElementById('pais').value;
// todos estos son para registrar lo que ingreso el usuario
  const intereses = [];
  if (document.getElementById('deporte').checked) intereses.push('Deporte'); // si marcas alguno se marca en la pagina
  if (document.getElementById('musica').checked) intereses.push('Música');
  if (document.getElementById('viajes').checked) intereses.push('Viajes');

  const resultado = document.getElementById('resultado'); // para mostrar los resultados
  
  resultado.innerHTML = `
    <h2>Datos Registrados:</h2>
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Edad:</strong> ${edad}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Género:</strong> ${genero}</p>
    <p><strong>País:</strong> ${pais}</p>
    <p><strong>Intereses:</strong> ${intereses.length ? intereses.join(', ') : 'Ninguno'}</p>
  `;// muestra los resultados
}
