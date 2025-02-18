// Selectores
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

// Configuración de imágenes por sección
const sectionImages = {
    'desarrollo-web': [
        '/images/t0t-sergiofores-main.jpg',
        '/images/t0t-sergiofores-main.jpg'
    ],
    'exploracion': [
        '/images/o1234-home.jpg'
    ],
    'arte': [
        '/images/t0t-sergiofores-art.jpg'
    ],
    'laboratorio': [
        '/images/t0t-sergiofores-dev2.png',
        '/images/t0t-sergiofores-dev.jpg'
    ]
};

// Estado actual de las imágenes
const imageState = new Map();

// Rotación de imágenes
const initImageRotation = () => {
    $$('.project-section').forEach(section => {
        const sectionId = section.id;
        const image = section.querySelector('img');
        imageState.set(sectionId, 0);

        if (image && sectionImages[sectionId]) {
            image.addEventListener('click', () => {
                let currentIndex = imageState.get(sectionId);
                currentIndex = (currentIndex + 1) % sectionImages[sectionId].length;
                imageState.set(sectionId, currentIndex);
                
                // Transición suave
                image.style.opacity = '0';
                setTimeout(() => {
                    image.src = sectionImages[sectionId][currentIndex];
                    image.style.opacity = '1';
                }, 300);
            });
        }
    });
};

// Scroll suave
const initSmoothScroll = () => {
    $$('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = $(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Cerrar menú móvil si está abierto
                $('.nav-menu')?.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
};

// WhatsApp seguro
const getWhatsAppNumber = () => {
    const parts = ['34', '619', '549', '032'];
    return parts.join('');
};

// WhatsApp
const initWhatsApp = () => {
    $('#whatsappButton')?.addEventListener('click', () => {
        const number = getWhatsAppNumber();
        window.open(`https://wa.me/${number}`, '_blank');
        showAlert('Redirigiendo a WhatsApp...');
    });
};

// Sistema de alertas
const showAlert = (message, duration = 3000) => {
    const alert = $('#customAlert');
    if (alert) {
        alert.textContent = message;
        alert.hidden = false;
        
        setTimeout(() => {
            alert.style.opacity = '0';
            setTimeout(() => {
                alert.hidden = true;
                alert.style.opacity = '1';
            }, 300);
        }, duration);
    }
};

// Lazy loading de imágenes
const initLazyLoading = () => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });

    $$('img[data-src]').forEach(img => imageObserver.observe(img));
};

// Actualizar año automáticamente
const updateYear = () => {
    document.getElementById('year').textContent = new Date().getFullYear();
};

// Inicialización
const init = () => {
    initImageRotation();
    initSmoothScroll();
    initWhatsApp();
    initLazyLoading();
    updateYear();
    
    // Mostrar alerta inicial
    setTimeout(() => {
        showAlert('EN DESARROLLO');
    }, 1000);
};

// Cargar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
