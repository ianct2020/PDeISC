// Sección Números
let numeros = [];
const numeroInput = document.getElementById('numeroInput');
const numerosIngresadosSpan = document.getElementById('numerosIngresados');
const numerosFiltradosSpan = document.getElementById('numerosFiltrados');
const errorNumero = document.getElementById('errorNumero');

function agregarNumero() {
    errorNumero.textContent = '';
    const valor = numeroInput.value;
    const numero = parseInt(valor);
    const nuevosNumeros = [...numeros].filter(n => true); // Simulación de "agregar" con filter
    if (!isNaN(numero)) {
        nuevosNumeros.push(numero);
        numeros = nuevosNumeros;
        console.log('Número agregado:', numero);
        console.log('Números actuales:', numeros);
        actualizarNumerosIngresados();
        numeroInput.value = '';
    } else {
        errorNumero.textContent = 'Ingrese un número válido.';
        console.log('Error: Ingrese un número válido.');
    }
}

function mostrarNumerosMayores10() {
    const mayoresDe10 = numeros.filter(num => num > 10);
    numerosFiltradosSpan.textContent = mayoresDe10.join(', ');
    console.log('Números mayores a 10:', mayoresDe10);
}

function reiniciarNumeros() {
    const eliminados = numeros.filter(n => true); // Simulación de "eliminar todo" con filter
    numeros = [];
    numerosIngresadosSpan.textContent = '';
    numerosFiltradosSpan.textContent = '';
    console.log('Números eliminados:', eliminados);
    console.log('Números actuales:', numeros);
}

function actualizarNumerosIngresados() {
    numerosIngresadosSpan.textContent = numeros.join(', ');
}

// Sección Palabras
let palabras = [];
const palabraInput = document.getElementById('palabraInput');
const palabrasIngresadasSpan = document.getElementById('palabrasIngresadas');
const palabrasFiltradasSpan = document.getElementById('palabrasFiltradas');
const errorPalabra = document.getElementById('errorPalabra');

function agregarPalabra() {
    errorPalabra.textContent = '';
    const palabra = palabraInput.value.trim();
    const nuevasPalabras = [...palabras].filter(p => true); // Simulación de "agregar" con filter
    if (palabra && /^[a-zA-Z]+$/.test(palabra)) {
        nuevasPalabras.push(palabra);
        palabras = nuevasPalabras;
        console.log('Palabra agregada:', palabra);
        console.log('Palabras actuales:', palabras);
        actualizarPalabrasIngresadas();
        palabraInput.value = '';
    } else {
        errorPalabra.textContent = 'Ingrese solo letras.';
        console.log('Error: Ingrese solo letras.');
    }
}

function mostrarPalabrasLargas() {
    const palabrasLargas = palabras.filter(palabra => palabra.length > 5);
    palabrasFiltradasSpan.textContent = palabrasLargas.join(', ');
    console.log('Palabras con más de 5 letras:', palabrasLargas);
}

function reiniciarPalabras() {
    const eliminadas = palabras.filter(p => true); // Simulación de "eliminar todo" con filter
    palabras = [];
    palabrasIngresadasSpan.textContent = '';
    palabrasFiltradasSpan.textContent = '';
    console.log('Palabras eliminadas:', eliminadas);
    console.log('Palabras actuales:', palabras);
}

function actualizarPalabrasIngresadas() {
    palabrasIngresadasSpan.textContent = palabras.join(', ');
}

// Sección Usuarios
let usuarios = [];
const nombreUsuarioInput = document.getElementById('nombreUsuarioInput');
const activoCheckbox = document.getElementById('activoCheckbox');
const usuariosIngresadosSpan = document.getElementById('usuariosIngresados');
const usuariosActivosSpan = document.getElementById('usuariosActivos');
const errorUsuario = document.getElementById('errorUsuario');

function agregarUsuario() {
    errorUsuario.textContent = '';
    const nombre = nombreUsuarioInput.value.trim();
    const activo = activoCheckbox.checked;
    const nuevosUsuarios = [...usuarios].filter(u => true); // Simulación de "agregar" con filter
    if (nombre && /^[a-zA-Z]+$/.test(nombre)) {
        const usuario = { nombre: nombre, activo: activo };
        nuevosUsuarios.push(usuario);
        usuarios = nuevosUsuarios;
        console.log('Usuario agregado:', usuario);
        console.log('Usuarios actuales:', usuarios);
        actualizarUsuariosIngresados();
        nombreUsuarioInput.value = '';
        activoCheckbox.checked = false;
    } else {
        errorUsuario.textContent = 'Ingrese solo letras para el nombre.';
        console.log('Error: Ingrese solo letras para el nombre.');
    }
}

function mostrarUsuariosActivos() {
    const usuariosActivos = usuarios.filter(usuario => usuario.activo).map(usuario => usuario.nombre);
    usuariosActivosSpan.textContent = usuariosActivos.join(', ');
    console.log('Usuarios activos:', usuariosActivos);
}

function reiniciarUsuarios() {
    const eliminados = usuarios.filter(u => true); // Simulación de "eliminar todo" con filter
    usuarios = [];
    usuariosIngresadosSpan.textContent = '';
    usuariosActivosSpan.textContent = '';
    console.log('Usuarios eliminados:', eliminados);
    console.log('Usuarios actuales:', usuarios);
}

function actualizarUsuariosIngresados() {
    usuariosIngresadosSpan.textContent = usuarios.map(user => `${user.nombre} (${user.activo ? 'Activo' : 'Inactivo'})`).join(', ');
}