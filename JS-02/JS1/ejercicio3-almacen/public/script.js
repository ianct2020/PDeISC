// Cargar días, meses y años
window.addEventListener("DOMContentLoaded", () => {
    const diaSelect = document.getElementById("dia");
    const mesSelect = document.getElementById("mes");
    const anioSelect = document.getElementById("anio");
    const nacionalidadSelect = document.getElementById("nacionalidad");
  
    // Días
    for (let i = 1; i <= 31; i++) {
      const op = document.createElement("option");
      op.value = i;
      op.textContent = i;
      diaSelect.appendChild(op);
    }
  
    // Meses
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    meses.forEach((mes, i) => {
      const op = document.createElement("option");
      op.value = i + 1;
      op.textContent = mes;
      mesSelect.appendChild(op);
    });
  
    // Años
    for (let i = 2024; i >= 1920; i--) {
      const op = document.createElement("option");
      op.value = i;
      op.textContent = i;
      anioSelect.appendChild(op);
    }
  
    // Nacionalidades
    const paises = ["Argentina", "Brasil", "Chile", "Uruguay", "Paraguay", "Bolivia", "Perú", "Ecuador", "Colombia", "Venezuela", "México", "Estados Unidos", "Canadá", "España", "Francia", "Alemania", "Italia", "Reino Unido", "Japón", "China", "India", "Australia", "Sudáfrica"]

    paises.forEach(pais => {
      const op = document.createElement("option");
      op.value = pais;
      op.textContent = pais;
      nacionalidadSelect.appendChild(op);
    });
  });
  
  // Prevenir que Enter envíe el formulario
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
  
  function guardarPersona(e) {
    e.preventDefault();
  
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const edadInput = document.getElementById("edad");
    const edad = parseInt(edadInput.value.trim(), 10);
  
    const anioNacimiento = parseInt(document.getElementById("anio").value);
    const mesNacimiento = parseInt(document.getElementById("mes").value);
    const diaNacimiento = parseInt(document.getElementById("dia").value);
  
    // Calcular edad según fecha de nacimiento
    const hoy = new Date();
    let edadCalculada = hoy.getFullYear() - anioNacimiento;
    const mesActual = hoy.getMonth() + 1;
    const diaActual = hoy.getDate();
  
    if (mesNacimiento > mesActual || (mesNacimiento === mesActual && diaNacimiento > diaActual)) {
      edadCalculada--;
    }
  
    // Comparar la edad ingresada con la calculada
    if (isNaN(edad) || edad !== edadCalculada) {
      const confirmar = confirm(`Según la fecha de nacimiento usted tiene ${edadCalculada} años. ¿Desea usar esta edad?`);
      if (confirmar) {
        document.getElementById("edad").value = edadCalculada;
      } else {
        return mostrarError("Por favor, corrija la edad o la fecha de nacimiento.");
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
  
    const mensaje = document.getElementById("mensaje");
  
    // Validaciones JS extra
    if (!/^[A-Za-z\s]+$/.test(nombre)) return mostrarError("Nombre inválido");
    if (!/^[A-Za-z\s]+$/.test(apellido)) return mostrarError("Apellido inválido");
    if (isNaN(edad) || edad < 1 || edad > 110) return mostrarError("Edad inválida (debe ser entre 1 y 110)");
    if (!/^[A-Za-z\s]+$/.test(nacionalidad)) return mostrarError("Nacionalidad inválida");
    if (isNaN(hijos) || hijos < 0 || hijos > 20) return mostrarError("Cantidad de hijos inválida");
    if (!/^\d{8,10}$/.test(telefono)) return mostrarError("Teléfono inválido");
    if (!/^\d{6,}$/.test(dni)) return mostrarError("DNI inválido");
    if (!email.includes("@")) return mostrarError("Email inválido");
  
    // Crear persona
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
  
    // Mostrar en consola
    console.log("Persona guardada:", persona);
  
    // Mostrar en listado visual
    const lista = document.getElementById("listado");
    const item = document.createElement("li");
    item.textContent = `${nombre} ${apellido}`;
    lista.appendChild(item);
  
    // Mostrar mensaje
    mostrarExito("Persona guardada con éxito");
  
    // Resetear formulario
    document.getElementById("formulario").reset();
  }
  
  function mostrarExito(msg) {
    const mensaje = document.getElementById("mensaje");
    mensaje.textContent = msg;
    mensaje.style.color = "green";
  }
  
  function mostrarError(msg) {
    const mensaje = document.getElementById("mensaje");
    mensaje.textContent = msg;
    mensaje.style.color = "red";
  }
  