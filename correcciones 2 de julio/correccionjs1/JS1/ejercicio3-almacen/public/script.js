// cargar días, meses y años
window.addEventListener("DOMContentLoaded", () => {
    const diaSelect = document.getElementById("dia"); // seleccionar dia
    const mesSelect = document.getElementById("mes"); //seleccionar mes
    const anioSelect = document.getElementById("anio"); //seleccionar anio
    const nacionalidadSelect = document.getElementById("nacionalidad"); // seleccionar nacionalidad
  
    // días
    for (let i = 1; i <= 31; i++) { // q aparexcan del 1 al 31
      const op = document.createElement("option"); // definimos como opciones
      op.value = i; //igualamos op a la i asi cuando se selecciona un dia se guarda
      op.textContent = i;
      diaSelect.appendChild(op); //guardamos
    }
  
    // meses
    const meses = [ //agregamos los meses que van a aparecer en las opciones
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    meses.forEach((mes, i) => { // se guardan los meses
      const op = document.createElement("option");//se pone como opcion
      op.value = i + 1;
      op.textContent = mes;
      mesSelect.appendChild(op); //guardado
    });
  
    // anios
    for (let i = 2024; i >= 1920; i--) { // entre esos valores se puede seleccionar
      const op = document.createElement("option"); // se pone como opcion
      op.value = i;
      op.textContent = i;
      anioSelect.appendChild(op); //guardado
    }
  
    // nacionalidades , opciones disponinibles
    const paises = ["Argentina", "Brasil", "Chile", "Uruguay", "Paraguay", "Bolivia", "Perú", "Ecuador", "Colombia", "Venezuela", "México", "Estados Unidos", "Canadá", "España", "Francia", "Alemania", "Italia", "Reino Unido", "Japón", "China", "India", "Australia", "Sudáfrica"]

    paises.forEach(pais => {
      const op = document.createElement("option"); //se pone como opcion
      op.value = pais;
      op.textContent = pais;
      nacionalidadSelect.appendChild(op); // se guarda
    });
  });
  
  // para q enter no lo envie sino q pase al siguiente 
  document.addEventListener("keydown", function (e) {
    const form = document.getElementById("formulario");
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
      const inputs = Array.from(form.querySelectorAll("input, select"));
      const idx = inputs.indexOf(document.activeElement);
      if (idx !== -1 && idx < inputs.length - 1) {
        inputs[idx + 1].focus();
      }
    }
  });
  
  function guardarPersona(e) { // se crea la funcion 
    e.preventDefault();
  
    const nombre = document.getElementById("nombre").value.trim(); //guardado
    const apellido = document.getElementById("apellido").value.trim(); //guardado
    const edadInput = document.getElementById("edad"); //guardado 
    const edad = parseInt(edadInput.value.trim(), 10); //guardado
  
    const anioNacimiento = parseInt(document.getElementById("anio").value); //guardado
    const mesNacimiento = parseInt(document.getElementById("mes").value); //guardado
    const diaNacimiento = parseInt(document.getElementById("dia").value); //guardado
  
    // calcular edad según fecha de nacimiento para asegurar 
    const hoy = new Date();
    let edadCalculada = hoy.getFullYear() - anioNacimiento;
    const mesActual = hoy.getMonth() + 1;
    const diaActual = hoy.getDate();
  
    if (mesNacimiento > mesActual || (mesNacimiento === mesActual && diaNacimiento > diaActual)) {
      edadCalculada--;
    }
  
    // comparar la edad ingresada con la calculada
    if (isNaN(edad) || edad !== edadCalculada) { // se usa la funcion para verificar cuando la edad ingresada y la fecha de nacimiento no coinciden
      const confirmar = confirm(`Según la fecha de nacimiento usted tiene ${edadCalculada} años. ¿Desea usar esta edad?`);
      if (confirmar) {
        document.getElementById("edad").value = edadCalculada; //verificar si son iguales
      } else {
        return mostrarError("Por favor, corrija la edad o la fecha de nacimiento."); // si no acepta la persona lo anima a corregir la fecha o la edad
      }
    }
  
    const dia = document.getElementById("dia").value;
    const mes = document.getElementById("mes").value;
    const anio = document.getElementById("anio").value;
    const sexo = document.getElementById("sexo").value;
    const dni = document.getElementById("dni").value.trim();
    const estado_civil = document.getElementById("estado_civil").value;
    const nacionalidad = document.getElementById("nacionalidad").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const email = document.getElementById("email").value.trim();
    const hijos = parseInt(document.getElementById("hijos").value.trim(), 10);
  // guarda todo
    const mensaje = document.getElementById("mensaje");
  
    // Validaciones JS extra
    if (!/^[A-Za-z\s]+$/.test(nombre)) return mostrarError("Nombre inválido"); // para q no se pongan numeros
    if (!/^[A-Za-z\s]+$/.test(apellido)) return mostrarError("Apellido inválido");  // para q no se pongan numeros
    if (isNaN(edad) || edad < 1 || edad > 110) return mostrarError("Edad inválida (debe ser entre 1 y 110)"); //para q no se pongan numero irrisorios
    if (!/^[A-Za-z\s]+$/.test(nacionalidad)) return mostrarError("Nacionalidad inválida"); //para q no se pongan numeros
    if (isNaN(hijos) || hijos < 0 || hijos > 20) return mostrarError("Cantidad de hijos inválida"); //nadie tiene 0 hijos o mas de 20
    if (!/^\d{8,10}$/.test(telefono)) return mostrarError("Teléfono inválido"); // para q no se pongan letras
    if (!/^\d{6,}$/.test(dni)) return mostrarError("DNI inválido");//paran q no se pongan letras
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return mostrarError("Email inválido"); // verificar mail

  
    // crear persona
    const persona = {
      nombre,
      apellido,
      edad,
      fechaNacimiento: `${dia}/${mes}/${anio}`,
      sexo,
      dni,
      estado_civil,
      nacionalidad,
      telefono,
      email,
      hijos
    };
  
    // mostrar en consola
    console.log("Persona guardada:", persona);
  
    // mostrar en listado visual
    const lista = document.getElementById("listado");
    const item = document.createElement("li");
    item.textContent = `${nombre} ${apellido}`;
    lista.appendChild(item);
  
    // mostrar mensaje si salio bien
    mostrarExito("Persona guardada con éxito");
  
    // resetear formulario cuando ya se termino
    document.getElementById("formulario").reset();
  }
  
  function mostrarExito(msg) { // si sale bien se muestra esto
    const mensaje = document.getElementById("mensaje");
    mensaje.textContent = msg;
    mensaje.style.color = "green";
  }
  
  function mostrarError(msg) { // si sale mal se muestra esto
    const mensaje = document.getElementById("mensaje");
    mensaje.textContent = msg;
    mensaje.style.color = "red";
  }
  