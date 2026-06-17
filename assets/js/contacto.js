// ======================
// FORMULARIO CONTACTO
// ======================

const formContacto = document.getElementById('formContacto');

if (formContacto) {

    // Elementos del formulario
    const nombre = document.getElementById('nombreContacto');
    const email = document.getElementById('emailContacto');
    const telefono = document.getElementById('telefonoContacto');
    const asunto = document.getElementById('asuntoContacto');
    const mensaje = document.getElementById('mensajeContacto');
    const terminos = document.getElementById('terminosContacto');

    // Elementos de error
    const errorNombre = document.getElementById('errorNombre');
    const errorEmail = document.getElementById('errorEmail');
    const errorTelefono = document.getElementById('errorTelefono');
    const errorAsunto = document.getElementById('errorAsunto');
    const errorMensaje = document.getElementById('errorMensaje');
    const errorTerminos = document.getElementById('errorTerminos');

    // Mensajes
    const mensajeExito = document.getElementById('mensajeExito');
    const mensajeErrorGlobal = document.getElementById('mensajeErrorGlobal');

    // Botón enviar
    const btnEnviar = document.getElementById('btnEnviarContacto');

    // ======================
    // VALIDACIONES
    // ======================

    function validarNombre() {
        const nombreLimpio = nombre.value.trim();
        if (nombreLimpio.length < 3) {
            mostrarError(errorNombre, 'El nombre debe tener al menos 3 caracteres');
            return false;
        }
        if (!/^[a-záéíóúñ\s]+$/i.test(nombreLimpio)) {
            mostrarError(errorNombre, 'El nombre solo debe contener letras y espacios');
            return false;
        }
        ocultarError(errorNombre);
        return true;
    }

    function validarEmail() {
        const emailLimpio = email.value.trim();
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(emailLimpio)) {
            mostrarError(errorEmail, 'Por favor ingresa un correo válido');
            return false;
        }
        ocultarError(errorEmail);
        return true;
    }

    function validarTelefono() {
        const telefonoLimpio = telefono.value.trim();
        const regexTelefono = /^[\d\s\-\+\(\)]{7,}$/;
        if (!regexTelefono.test(telefonoLimpio)) {
            mostrarError(errorTelefono, 'Por favor ingresa un teléfono válido');
            return false;
        }
        ocultarError(errorTelefono);
        return true;
    }

    function validarAsunto() {
        if (asunto.value === '') {
            mostrarError(errorAsunto, 'Por favor selecciona un asunto');
            return false;
        }
        ocultarError(errorAsunto);
        return true;
    }

    function validarMensaje() {
        const mensajeLimpio = mensaje.value.trim();
        if (mensajeLimpio.length < 10) {
            mostrarError(errorMensaje, 'El mensaje debe tener al menos 10 caracteres');
            return false;
        }
        if (mensajeLimpio.length > 1000) {
            mostrarError(errorMensaje, 'El mensaje no puede exceder 1000 caracteres');
            return false;
        }
        ocultarError(errorMensaje);
        return true;
    }

    function validarTerminos() {
        if (!terminos.checked) {
            mostrarError(errorTerminos, 'Debes aceptar los términos');
            return false;
        }
        ocultarError(errorTerminos);
        return true;
    }

    function mostrarError(elemento, texto) {
        elemento.textContent = texto;
        elemento.classList.remove('d-none');
    }

    function ocultarError(elemento) {
        elemento.classList.add('d-none');
        elemento.textContent = '';
    }

    // ======================
    // VALIDACIÓN EN TIEMPO REAL
    // ======================

    nombre.addEventListener('blur', validarNombre);
    email.addEventListener('blur', validarEmail);
    telefono.addEventListener('blur', validarTelefono);
    asunto.addEventListener('change', validarAsunto);
    mensaje.addEventListener('blur', validarMensaje);
    terminos.addEventListener('change', validarTerminos);

    // ======================
    // ENVÍO DEL FORMULARIO
    // ======================

    formContacto.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validar todos los campos
        const valido =
            validarNombre() &&
            validarEmail() &&
            validarTelefono() &&
            validarAsunto() &&
            validarMensaje() &&
            validarTerminos();

        if (!valido) {
            mostrarError(
                mensajeErrorGlobal,
                'Por favor completa todos los campos correctamente'
            );
            mensajeErrorGlobal.classList.remove('d-none');
            mensajeExito.classList.add('d-none');
            return;
        }

        // Preparar datos
        const datosContacto = {
            nombre: nombre.value.trim(),
            email: email.value.trim(),
            telefono: telefono.value.trim(),
            asunto: asunto.value,
            mensaje: mensaje.value.trim(),
            fecha: new Date().toISOString(),
            estado: 'pendiente'
        };

        // Guardar en localStorage (para propósitos de demostración)
        const contactos = JSON.parse(localStorage.getItem('contactos')) || [];
        contactos.push(datosContacto);
        localStorage.setItem('contactos', JSON.stringify(contactos));

        // Aquí iría la llamada a una API real
        console.log('Datos de contacto:', datosContacto);

        // Mostrar éxito
        mensajeExito.classList.remove('d-none');
        mensajeErrorGlobal.classList.add('d-none');

        // Limpiar formulario
        formContacto.reset();

        // Ocultar mensaje de éxito después de 5 segundos
        setTimeout(() => {
            mensajeExito.classList.add('d-none');
        }, 50000);

        // Desactivar botón temporalmente
        btnEnviar.disabled = true;
        btnEnviar.innerHTML = '<i class="fa-solid fa-check me-2"></i>Enviado';

        setTimeout(() => {
            btnEnviar.disabled = false;
            btnEnviar.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i>Enviar Mensaje';
        }, 3000);
    });

}