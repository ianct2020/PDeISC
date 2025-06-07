// --- Evento principal para asegurar que el DOM esté cargado ---
document.addEventListener('DOMContentLoaded', () => {

    // --- Referencias a elementos del DOM ---
    // Sección 1: Ingreso de números
    const numeroInput = document.getElementById('numeroInput');
    const agregarBtn = document.getElementById('agregarBtn');
    const listaNumerosIngresados = document.getElementById('listaNumerosIngresados');
    const contadorIngresados = document.getElementById('contadorIngresados');
    const guardarIngresoBtn = document.getElementById('guardarIngresoBtn');

    // Sección 2: Carga y filtrado
    const archivoInput = document.getElementById('archivoInput');
    const resultadosArea = document.getElementById('resultadosArea');
    const utilesCount = document.getElementById('utilesCount');
    const noUtilesCount = document.getElementById('noUtilesCount');
    const porcentajeUtiles = document.getElementById('porcentajeUtiles');
    const listaNumerosFiltrados = document.getElementById('listaNumerosFiltrados');
    const guardarFiltroBtn = document.getElementById('guardarFiltroBtn');
    const mensajeError = document.getElementById('mensajeError');

    // --- Variables de estado ---
    let numerosIngresados = [];
    let numerosFiltrados = [];

    // --- Funciones de la Sección 1: Ingreso de Números ---

    /**
     * Agrega un número a la lista de ingresados.
     */
    const agregarNumero = () => {
        const valor = numeroInput.value.trim();
        if (valor === '') {
            mostrarError("Por favor, introduce un número.");
            return;
        }

        if (numerosIngresados.length >= 20) {
            mostrarError("Ya has alcanzado el máximo de 20 números.");
            return;
        }

        const numero = Number(valor);
        numerosIngresados.push(numero);
        actualizarListaIngresados();
        numeroInput.value = '';
        numeroInput.focus();
    };

    /**
     * Actualiza la UI con la lista de números ingresados.
     */
    const actualizarListaIngresados = () => {
        listaNumerosIngresados.innerHTML = ''; // Limpia la lista
        numerosIngresados.forEach(num => {
            const li = document.createElement('li');
            li.textContent = num;
            listaNumerosIngresados.appendChild(li);
        });

        // Actualiza el contador
        contadorIngresados.textContent = numerosIngresados.length;

        // Habilita o deshabilita el botón de guardar
        if (numerosIngresados.length >= 10 && numerosIngresados.length <= 20) {
            guardarIngresoBtn.disabled = false;
        } else {
            guardarIngresoBtn.disabled = true;
        }
    };
    
    /**
     * Genera y descarga un archivo .txt con los números ingresados.
     */
    const guardarArchivoIngresados = () => {
        const contenido = numerosIngresados.join('\n');
        descargarArchivo(contenido, 'numeros_ingresados.txt');
    };

    // --- Funciones de la Sección 2: Carga y Filtrado ---

    /**
     * Maneja la selección de un archivo por el usuario.
     * @param {Event} event - El evento de cambio del input de archivo.
     */
    const manejarSeleccionArchivo = (event) => {
        const archivo = event.target.files[0];
        if (!archivo) {
            return;
        }

        if (archivo.type !== 'text/plain') {
            mostrarError("Por favor, sube un archivo con formato .txt");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const contenido = e.target.result;
            procesarContenidoArchivo(contenido);
        };
        reader.onerror = () => {
            mostrarError("Error al leer el archivo.");
        };
        reader.readAsText(archivo);
    };

    /**
     * Procesa el contenido de texto del archivo, filtra y muestra los resultados.
     * @param {string} contenido - El contenido de texto del archivo.
     */
    const procesarContenidoArchivo = (contenido) => {
        const lineas = contenido.split('\n').filter(linea => linea.trim() !== '');
        if (lineas.length === 0) {
            mostrarError("El archivo está vacío o no contiene números válidos.");
            return;
        }

        let numerosUtiles = [];
        let numerosNoUtiles = [];

        lineas.forEach(linea => {
            const numStr = linea.trim();
            if (!isNaN(numStr) && numStr.length > 0) {
                 // Filtra si el primer y último caracter son iguales
                if (numStr.charAt(0) === numStr.charAt(numStr.length - 1)) {
                    numerosUtiles.push(Number(numStr));
                } else {
                    numerosNoUtiles.push(Number(numStr));
                }
            }
        });
        
        // Ordena los números útiles de forma ascendente
        numerosUtiles.sort((a, b) => a - b);
        numerosFiltrados = numerosUtiles; // Guarda para la descarga

        actualizarResultadosUI(numerosUtiles, numerosNoUtiles);
    };
    
    /**
     * Actualiza la UI con los resultados del filtrado.
     * @param {number[]} utiles - Array de números útiles.
     * @param {number[]} noUtiles - Array de números no útiles.
     */
    const actualizarResultadosUI = (utiles, noUtiles) => {
        resultadosArea.classList.remove('hidden');
        mensajeError.classList.add('hidden'); // Oculta errores previos

        // Actualiza contadores
        utilesCount.textContent = utiles.length;
        noUtilesCount.textContent = noUtiles.length;

        // Calcula y muestra el porcentaje
        const total = utiles.length + noUtiles.length;
        const porcentaje = total > 0 ? ((utiles.length / total) * 100).toFixed(2) : 0;
        porcentajeUtiles.textContent = `${porcentaje}%`;

        // Muestra la lista de números filtrados
        listaNumerosFiltrados.innerHTML = '';
        if(utiles.length > 0) {
            utiles.forEach(num => {
                const li = document.createElement('li');
                li.textContent = num;
                listaNumerosFiltrados.appendChild(li);
            });
            guardarFiltroBtn.disabled = false;
        } else {
            listaNumerosFiltrados.innerHTML = '<li>No se encontraron números que cumplan el criterio.</li>';
            guardarFiltroBtn.disabled = true;
        }
    };
    
    /**
     * Genera y descarga un archivo .txt con los números filtrados.
     */
    const guardarArchivoFiltrado = () => {
        const contenido = numerosFiltrados.join('\n');
        descargarArchivo(contenido, 'numeros_filtrados.txt');
    };


    // --- Funciones de Utilidad ---
    
    /**
     * Función genérica para crear y descargar un archivo.
     * @param {string} contenido - Contenido del archivo.
     * @param {string} nombreArchivo - Nombre para el archivo descargado.
     */
    function descargarArchivo(contenido, nombreArchivo) {
        const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = nombreArchivo;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    /**
     * Muestra un mensaje de error temporalmente.
     * @param {string} texto - El mensaje de error a mostrar.
     */
    const mostrarError = (texto) => {
        mensajeError.textContent = texto;
        mensajeError.classList.remove('hidden');
        setTimeout(() => {
            mensajeError.classList.add('hidden');
        }, 3000); // El mensaje desaparece después de 3 segundos
    };

    // --- Asignación de Eventos ---
    agregarBtn.addEventListener('click', agregarNumero);
    numeroInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            agregarNumero();
        }
    });

    guardarIngresoBtn.addEventListener('click', guardarArchivoIngresados);
    archivoInput.addEventListener('change', manejarSeleccionArchivo);
    guardarFiltroBtn.addEventListener('click', guardarArchivoFiltrado);
});
