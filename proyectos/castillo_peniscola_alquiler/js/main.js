// Alert de desarrollo al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    alert('🚧 Alquiler en Desarrollo\n\nEste servicio de alquiler vacacional está actualmente en desarrollo. Las propiedades mostradas son de demostración. Próximamente estará disponible con propiedades reales y sistema de reservas.\n\n¡Gracias por tu interés!');
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

// Efecto parallax suave en el hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Efecto de aparición escalonada
window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.feature-card, .apartamento-detail');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});