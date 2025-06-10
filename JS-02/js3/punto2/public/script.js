// asegurar dom cargado 
document.addEventListener('DOMContentLoaded', () => {

    // referencias dom
    // ingreso de números
    const numeroInput = document.getElementById('numeroInput');
    const agregarBtn = document.getElementById('agregarBtn');
    const listaNumerosIngresados = document.getElementById('listaNumerosIngresados');
    const contadorIngresados = document.getElementById('contadorIngresados');
    const guardarIngresoBtn = document.getElementById('guardarIngresoBtn');

    // cargar y filtrar
    const archivoInput = document.getElementById('archivoInput');
    const resultadosArea = document.getElementById('resultadosArea');
    const utilesCount = document.getElementById('utilesCount');
    const noUtilesCount = document.getElementById('noUtilesCount');
    const porcentajeUtiles = document.getElementById('porcentajeUtiles');
    const listaNumerosFiltrados = document.getElementById('listaNumerosFiltrados');
    const guardarFiltroBtn = document.getElementById('guardarFiltroBtn');
    const mensajeError = document.getElementById('mensajeError');

    // variables de estado 
    let numerosIngresados = [];
    let numerosFiltrados = [];

    // funciones ingreso de números

    /* agrega un número a la lista de ingresados
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

    /* actualiza con la lista de números ingresados.
     */
    const actualizarListaIngresados = () => {
        listaNumerosIngresados.innerHTML = ''; // limpia la lista
        numerosIngresados.forEach(num => {
            const li = document.createElement('li');
            li.textContent = num;
            listaNumerosIngresados.appendChild(li);
        });

        // actualiza el contador
        contadorIngresados.textContent = numerosIngresados.length;

        // habilita o deshabilita el botón de guardar
        if (numerosIngresados.length >= 10 && numerosIngresados.length <= 20) {
            guardarIngresoBtn.disabled = false;
        } else {
            guardarIngresoBtn.disabled = true;
        }
    };
    
    /*genera y descarga un archivo .txt con los números ingresados.
     */
    const guardarArchivoIngresados = () => {
        const contenido = numerosIngresados.join('\n');
        descargarArchivo(contenido, 'numeros_ingresados.txt');
    };

    //funciones cargar y filtrar

    /**
      maneja la selección de un archivo por el usuario.
      @param {Event} event  el evento de cambio del input de archivo
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
     * procesa el contenido de texto del archivo, filtra y muestra los resultados.
     * @param {string} contenido - el contenido de texto del archivo.
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
                 // filtra si el primer y último caracter son iguales
                if (numStr.charAt(0) === numStr.charAt(numStr.length - 1)) {
                    numerosUtiles.push(Number(numStr));
                } else {
                    numerosNoUtiles.push(Number(numStr));
                }
            }
        });
        
        // ordena los números  ascendente
        numerosUtiles.sort((a, b) => a - b);
        numerosFiltrados = numerosUtiles; // guarda para la descarga

        actualizarResultadosUI(numerosUtiles, numerosNoUtiles);
    };
    
    /**
     * actualiza la UI con los resultados del filtrado.
     * @param {number[]} utiles - array de números útiles.
     * @param {number[]} noUtiles - array de números no útiles.
     */
    const actualizarResultadosUI = (utiles, noUtiles) => {
        resultadosArea.classList.remove('hidden');
        mensajeError.classList.add('hidden'); // oculta errores previos

        // actualiza contadores
        utilesCount.textContent = utiles.length;
        noUtilesCount.textContent = noUtiles.length;

        // calcula y muestra el porcentaje
        const total = utiles.length + noUtiles.length;
        const porcentaje = total > 0 ? ((utiles.length / total) * 100).toFixed(2) : 0;
        porcentajeUtiles.textContent = `${porcentaje}%`;

        // muestra la lista de números filtrados
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
     * genera y descarga un archivo .txt con los números filtrados.
     */
    const guardarArchivoFiltrado = () => {
        const contenido = numerosFiltrados.join('\n');
        descargarArchivo(contenido, 'numeros_filtrados.txt');
    };


    // --- Funciones de Utilidad ---
    
    /**
     * función genérica para crear y descargar un archivo.
     * @param {string} contenido - contenido del archivo.
     * @param {string} nombreArchivo - nombre para el archivo descargado.
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
     * muestra un mensaje de error temporalmente.
     * @param {string} texto  el mensaje de error a mostrar.
     */
    const mostrarError = (texto) => {
        mensajeError.textContent = texto;
        mensajeError.classList.remove('hidden');
        setTimeout(() => {
            mensajeError.classList.add('hidden');
        }, 3000); // el mensaje desaparece después de 3 segundos
    };

    //  asignación Eventos 
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
