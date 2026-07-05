document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario-contacto');
    const tuNombre = document.getElementById('nombre');
    const tuApellido = document.getElementById('apellido');
    const tuPais = document.getElementById('pais');
    const tuProvincia = document.getElementById('provincia');
    
    const emailUsuario = document.getElementById('email-usuario');
    const emailDominio = document.getElementById('email-dominio');
    const emailCompleto = document.getElementById('email-completo');
    
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
            mostrarEstadoCampo(tuNombre, false, 'Por favor, ingresá tu nombre.');
            formularioValido = false;
        } else {
            mostrarEstadoCampo(tuNombre, true);
        }

        if (tuApellido.value.trim() === '') {
            mostrarEstadoCampo(tuApellido, false, 'Por favor, ingresá tu apellido.');
            formularioValido = false;
        } else {
            mostrarEstadoCampo(tuApellido, true);
        }

        if (tuPais.value.trim() === '') {
            mostrarEstadoCampo(tuPais, false, 'Por favor, ingresá tu país.');
            formularioValido = false;
        } else {
            mostrarEstadoCampo(tuPais, true);
        }

        if (tuProvincia.value.trim() === '') {
            mostrarEstadoCampo(tuProvincia, false, 'Por favor, ingresá tu provincia.');
            formularioValido = false;
        } else {
            mostrarEstadoCampo(tuProvincia, true);
        }

        const usuario = emailUsuario.value.trim();
        const dominio = emailDominio.value;
        const correoUnificado = usuario + dominio;

        if (usuario === '') {
            mostrarEstadoCampo(emailUsuario, false, 'El correo electrónico es obligatorio.');
            formularioValido = false;
        } else if (!esCorreoValido(correoUnificado)) {
            mostrarEstadoCampo(emailUsuario, false, 'Ingresá un correo válido.');
            formularioValido = false;
        } else {
            mostrarEstadoCampo(emailUsuario, true);
            emailCompleto.value = correoUnificado;
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