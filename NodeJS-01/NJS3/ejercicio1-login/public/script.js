function mostrarDatos(event) {
  event.preventDefault(); // evitar recargar la página

  const contrasena = document.getElementById('contrasena').value;
  const email = document.getElementById('email').value;

  alert(
    `Datos ingresados:\n` +
    `Contraseña: ${contrasena}\n` +
    `Email: ${email}`
  );
}
