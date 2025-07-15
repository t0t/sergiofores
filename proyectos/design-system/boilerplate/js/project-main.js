/**
 * JAVASCRIPT ESPECÍFICO DEL PROYECTO
 * 
 * ⚠️ REGLAS IMPORTANTES:
 * 1. Los scripts del sistema base ya están cargados (claude-navigation.js, etc.)
 * 2. Solo añadir funcionalidades específicas del proyecto
 * 3. Seguir principios del sistema de diseño atómico
 * 4. Código limpio, comentado y mantenible
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Proyecto iniciado con Sistema de Diseño Sergio Forés');
    
    // Inicializar funcionalidades específicas del proyecto
    initProjectFeatures();
    
    // Configurar eventos específicos
    setupProjectEvents();
});

/**
 * Inicializar características específicas del proyecto
 */
function initProjectFeatures() {
    // Ejemplo: Configurar componentes específicos
    setupCustomComponents();
    
    // Ejemplo: Inicializar animaciones específicas
    setupCustomAnimations();
}

/**
 * Configurar eventos específicos del proyecto
 */
function setupProjectEvents() {
    // Ejemplo: Manejar formularios específicos
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Ejemplo: Configurar interacciones específicas
    setupCustomInteractions();
}

/**
 * Configurar componentes personalizados
 */
function setupCustomComponents() {
    // Aquí van los componentes específicos del proyecto
    // Ejemplo:
    // const customComponent = document.querySelector('.custom-component');
    // if (customComponent) {
    //     // Lógica del componente
    // }
}

/**
 * Configurar animaciones personalizadas
 */
function setupCustomAnimations() {
    // Configurar animaciones respetando las variables CSS del sistema
    // Usar var(--duration-base), var(--ease-in-out), etc.
}

/**
 * Configurar interacciones personalizadas
 */
function setupCustomInteractions() {
    // Ejemplo: Hover effects, clicks específicos, etc.
    // Siempre respetar las variables de timing del sistema
}

/**
 * Manejar el formulario de contacto con validación accesible
 */
function handleContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = {
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        mensaje: formData.get('mensaje')
    };
    
    // Limpiar errores previos
    clearFormErrors(form);
    
    // Validación con mensajes accesibles
    const errors = validateContactForm(data);
    
    if (errors.length > 0) {
        displayFormErrors(form, errors);
        // Enfocar el primer campo con error
        const firstErrorField = form.querySelector('.has-error');
        if (firstErrorField) {
            firstErrorField.focus();
        }
        return;
    }
    
    // Mostrar estado de carga
    setFormLoadingState(form, true);
    
    // Simular envío (reemplazar con lógica real)
    setTimeout(() => {
        console.log('Datos del formulario:', data);
        setFormLoadingState(form, false);
        showFormStatus(form, 'Mensaje enviado correctamente', 'success');
        
        // Limpiar formulario
        form.reset();
        clearFormErrors(form);
    }, 2000);
}

/**
 * Validar datos del formulario de contacto
 */
function validateContactForm(data) {
    const errors = [];
    
    if (!data.nombre || data.nombre.trim().length < 2) {
        errors.push({
            field: 'nombre',
            message: 'El nombre debe tener al menos 2 caracteres'
        });
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push({
            field: 'email',
            message: 'Por favor, introduce un email válido'
        });
    }
    
    if (!data.mensaje || data.mensaje.trim().length < 10) {
        errors.push({
            field: 'mensaje',
            message: 'El mensaje debe tener al menos 10 caracteres'
        });
    }
    
    if (data.mensaje && data.mensaje.length > 500) {
        errors.push({
            field: 'mensaje',
            message: 'El mensaje no puede exceder 500 caracteres'
        });
    }
    
    return errors;
}

/**
 * Validar formato de email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Mostrar errores en el formulario
 */
function displayFormErrors(form, errors) {
    errors.forEach(error => {
        const field = form.querySelector(`#${error.field}`);
        const errorElement = form.querySelector(`#${error.field}-error`);
        
        if (field && errorElement) {
            field.classList.add('has-error');
            field.setAttribute('aria-invalid', 'true');
            errorElement.textContent = error.message;
            errorElement.classList.add('is-visible');
        }
    });
}

/**
 * Limpiar errores del formulario
 */
function clearFormErrors(form) {
    const errorFields = form.querySelectorAll('.has-error');
    const errorElements = form.querySelectorAll('.form__error.is-visible');
    
    errorFields.forEach(field => {
        field.classList.remove('has-error');
        field.setAttribute('aria-invalid', 'false');
    });
    
    errorElements.forEach(element => {
        element.textContent = '';
        element.classList.remove('is-visible');
    });
}

/**
 * Mostrar estado de carga en formulario
 */
function setFormLoadingState(form, isLoading) {
    const submitButton = form.querySelector('button[type="submit"]');
    const statusElement = form.querySelector('#submit-status');
    
    if (isLoading) {
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        submitButton.textContent = 'Enviando...';
        
        if (statusElement) {
            statusElement.textContent = 'Enviando mensaje...';
            statusElement.className = 'form__status is-loading';
        }
    } else {
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        submitButton.textContent = 'Enviar';
    }
}

/**
 * Mostrar estado del formulario
 */
function showFormStatus(form, message, type) {
    const statusElement = form.querySelector('#submit-status');
    
    if (statusElement) {
        statusElement.textContent = message;
        statusElement.className = `form__status is-${type}`;
        
        // Auto-limpiar después de 5 segundos
        setTimeout(() => {
            statusElement.textContent = '';
            statusElement.className = 'form__status';
        }, 5000);
    }
}

/**
 * Mostrar mensajes al usuario
 */
function showMessage(message, type = 'info') {
    // Crear elemento de mensaje usando clases del sistema de diseño
    const messageEl = document.createElement('div');
    messageEl.className = `message message--${type}`;
    messageEl.textContent = message;
    
    // Añadir al DOM
    document.body.appendChild(messageEl);
    
    // Auto-remover después de 3 segundos
    setTimeout(() => {
        messageEl.remove();
    }, 3000);
}

/**
 * Utilidad para debounce (evitar múltiples ejecuciones)
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Utilidad para throttle (limitar frecuencia de ejecución)
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Exportar funciones si es necesario para testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initProjectFeatures,
        setupProjectEvents,
        handleContactForm,
        showMessage,
        debounce,
        throttle
    };
}