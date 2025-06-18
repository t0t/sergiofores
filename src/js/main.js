// Configuración de imágenes por proyecto
const PROJECT_IMAGES = {
    'desarrollo-web': [
        '/images/t0t-sergiofores-main.jpg',
        '/images/t0t-sergiofores-dev.jpg'
    ],
    'arte': [
        '/images/t0t-sergiofores-art.jpg'
    ],
    'laboratorio': [
        '/images/t0t-sergiofores-dev2.png',
        '/images/t0t-sergiofores-dev.jpg'
    ]
};

// Estado global
const AppState = {
    imageState: new Map(),
    observers: new Map()
};

// Utilidades
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Inicializar rotación de imágenes en proyectos
const initImageRotation = () => {
    document.querySelectorAll('.project-card').forEach(card => {
        const cardId = card.id;
        const image = card.querySelector('.project-image');
        
        if (!image || !PROJECT_IMAGES[cardId]) return;
        
        AppState.imageState.set(cardId, 0);
        
        // Añadir indicador si hay múltiples imágenes
        if (PROJECT_IMAGES[cardId].length > 1) {
            const indicator = document.createElement('div');
            indicator.className = 'image-indicator';
            indicator.textContent = `${AppState.imageState.get(cardId) + 1}/${PROJECT_IMAGES[cardId].length}`;
            card.appendChild(indicator);
            
            image.style.cursor = 'pointer';
            image.addEventListener('click', () => handleImageRotation(cardId, image, card));
        }
    });
};

// Manejar rotación de imágenes
const handleImageRotation = (cardId, image, card) => {
    const images = PROJECT_IMAGES[cardId];
    if (images.length <= 1) return;
    
    let currentIndex = AppState.imageState.get(cardId);
    currentIndex = (currentIndex + 1) % images.length;
    AppState.imageState.set(cardId, currentIndex);
    
    // Transición suave
    image.style.opacity = '0.5';
    
    setTimeout(() => {
        image.src = images[currentIndex];
        image.style.opacity = '1';
        
        // Actualizar indicador
        const indicator = card.querySelector('.image-indicator');
        if (indicator) {
            indicator.textContent = `${currentIndex + 1}/${images.length}`;
        }
    }, 200);
};

// Scroll suave para navegación
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar?.offsetHeight || 80;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                updateActiveNavLink(targetId);
            }
        });
    });
};

// Actualizar enlace activo en navegación
const updateActiveNavLink = (activeId) => {
    document.querySelectorAll('.navbar-links a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
    });
};

// Detectar sección activa durante scroll
const initScrollSpy = () => {
    const sections = document.querySelectorAll('section[id]');
    
    if (!sections.length) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '-80px 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateActiveNavLink(entry.target.id);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
    AppState.observers.set('scrollSpy', observer);
};

// WhatsApp - número seguro
const getWhatsAppNumber = () => ['34', '619', '549', '032'].join('');

// Inicializar WhatsApp
const initWhatsApp = () => {
    const whatsappBtn = document.getElementById('whatsappButton');
    if (!whatsappBtn) return;
    
    whatsappBtn.addEventListener('click', () => {
        const number = getWhatsAppNumber();
        window.open(`https://wa.me/${number}`, '_blank');
        showAlert('Redirigiendo a WhatsApp...', 2000);
    });
};

// Sistema de alertas mejorado
const showAlert = (message, duration = 3000) => {
    let alert = document.getElementById('customAlert');
    
    if (!alert) {
        alert = document.createElement('div');
        alert.id = 'customAlert';
        alert.className = 'custom-alert';
        alert.hidden = true;
        document.body.appendChild(alert);
    }
    
    alert.innerHTML = `<span>${message}</span>`;
    alert.hidden = false;
    
    setTimeout(() => {
        alert.style.opacity = '0';
        setTimeout(() => {
            alert.hidden = true;
            alert.style.opacity = '1';
        }, 300);
    }, duration);
};

// Lazy loading de imágenes
const initLazyLoading = () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if (!('IntersectionObserver' in window) || !images.length) return;
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    AppState.observers.set('lazyLoading', imageObserver);
};

// Actualizar año automáticamente
const updateYear = () => {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
};

// Inicializar Mermaid si está disponible
const initMermaid = () => {
    if (typeof mermaid === 'undefined') return;
    
    try {
        mermaid.initialize({
            startOnLoad: true,
            securityLevel: 'loose',
            theme: 'default',
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true
            }
        });
    } catch (error) {
        console.warn('Error inicializando Mermaid:', error);
    }
};

// Manejo de errores de imágenes
const initImageErrorHandling = () => {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn(`Error cargando imagen: ${this.src}`);
        });
    });
};

// Limpiar recursos al salir
const cleanup = () => {
    AppState.observers.forEach(observer => observer.disconnect());
    AppState.observers.clear();
};

// Inicialización principal
const init = () => {
    try {
        // Funciones core
        initSmoothScroll();
        initScrollSpy();
        initWhatsApp();
        updateYear();
        
        // Funciones de mejora
        initImageRotation();
        initLazyLoading();
        initImageErrorHandling();
        initMermaid();
        
        // Cleanup al salir
        window.addEventListener('beforeunload', cleanup);
        
        console.log('Portfolio Sergio Forés - Inicializado correctamente');
    } catch (error) {
        console.error('Error en inicialización:', error);
    }
};

// Cargar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
