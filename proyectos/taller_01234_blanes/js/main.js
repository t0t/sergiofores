// Alert de desarrollo al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        showAlert('development', 'Taller en Desarrollo', 'Este taller vivencial está actualmente en fase de planificación y desarrollo. Próximamente estará disponible la información completa y el sistema de reservas. ¡Gracias por tu interés!');
    }, 1000);
});

// Animaciones de entrada
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación del hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Sistema de Alert Elegante
function showAlert(type, title, message) {
    const overlay = document.getElementById('alertOverlay');
    const icon = document.getElementById('alertIcon');
    const titleEl = document.getElementById('alertTitle');
    const messageEl = document.getElementById('alertMessage');
    
    // Configurar contenido
    titleEl.textContent = title;
    messageEl.textContent = message;
    
    // Configurar icono y estilo según tipo
    icon.className = `alert-icon ${type}`;
    switch(type) {
        case 'development':
            icon.textContent = '🚧';
            break;
        case 'info':
            icon.textContent = 'ℹ️';
            break;
        case 'warning':
            icon.textContent = '⚠️';
            break;
        default:
            icon.textContent = '📢';
    }
    
    // Mostrar alert
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideAlert() {
    const overlay = document.getElementById('alertOverlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Cerrar alert al hacer clic en el overlay
document.getElementById('alertOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'alertOverlay') {
        hideAlert();
    }
});

// Cerrar alert con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hideAlert();
    }
});