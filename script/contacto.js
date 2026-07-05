document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario-contacto');
    const tuNombre = document.getElementById('nombre');
    const tuApellido = document.getElementById('apellido');
    
    const email = document.getElementById('email-usuario');
    
    const asunto = document.getElementById('asunto');
    const tuMensaje = document.getElementById('descripcion');
    const terminos = document.getElementById('invalidCheck');

    const mostrarEstadoCampo = (input, esValido, mensaje = '') => {
        const contenedorPadre = input.parentNode;
        const textoError = contenedorPadre.querySelector('.mensaje-feedback') || contenedorPadre.querySelector('.texto-error');
        
        if (esValido) {
            input.classList.remove('campo-error');
            input.classList.add('campo-correcto');

            if (textoError) {
                textoError.innerText = '';
                textoError.classList.remove('error-texto');
            }
        } else {
            input.classList.add('campo-error');
            input.classList.remove('campo-correcto');
            if (textoError) {
                textoError.innerText = mensaje;
                textoError.classList.add('error-texto');
            }
        }
    };

    const esCorreoValido = (correo) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(correo);
    };

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        let formularioValido = true;

        if (tuNombre.value.trim() === '') {
            mostrarEstadoCampo(tuNombre, false, 'Por favor, ingrese su nombre.');
            formularioValido = false;
        } else {
            mostrarEstadoCampo(tuNombre, true);
        }

        if (tuApellido.value.trim() === '') {
            mostrarEstadoCampo(tuApellido, false, 'Por favor, ingrese su apellido.');
            formularioValido = false;
        } else {
            mostrarEstadoCampo(tuApellido, true);
        }

        const correo = email.value.trim();

        if (correo === '') {
            mostrarEstadoCampo(email, false, 'El correo electrónico es obligatorio.');
            formularioValido = false;
        } else if (!esCorreoValido(correo)) {
            mostrarEstadoCampo(email, false, 'Ingresá un correo válido.');
            formularioValido = false;
        } else {
            mostrarEstadoCampo(email, true);
        }

        if (asunto.value === '') {
            mostrarEstadoCampo(asunto, false, 'Por favor, seleccioná un asunto.');
            formularioValido = false;
        } else {
            mostrarEstadoCampo(asunto, true);
        }

        if (tuMensaje.value.trim() === '') {
            mostrarEstadoCampo(tuMensaje, false, 'Por favor, ingresá tu mensaje.');
            formularioValido = false;
        } else {
            mostrarEstadoCampo(tuMensaje, true);
        }

        if (!terminos.checked) {
            mostrarEstadoCampo(terminos, false, 'Debés aceptar los términos y condiciones.');
            formularioValido = false;
        } else {
            mostrarEstadoCampo(terminos, true);
        }

        if (formularioValido) {
            formulario.submit(); 
        }
    });
});