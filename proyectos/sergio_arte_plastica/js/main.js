// Lazy loading para optimización
const images = document.querySelectorAll('.artwork-image');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            // Simular carga de imagen real cuando tengamos las imágenes
            img.style.opacity = '1';
            observer.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// Smooth scroll para navegación
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

// Header scroll behavior (consistente con design system)
let lastScrollY = window.scrollY;
let ticking = false;

function updateHeader() {
    const currentScrollY = window.scrollY;
    const header = document.querySelector('.header');
    
    // Hide/show logic
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    
    // Background transparency effect
    if (currentScrollY > 50) {
        header.style.backgroundColor = 'rgba(254, 254, 254, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.backgroundColor = 'rgba(254, 254, 254, 0.95)';
        header.style.backdropFilter = 'blur(12px)';
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
});

// Parallax sutil en scroll con detección responsive
window.addEventListener('scroll', () => {
    // Detectar si es móvil
    const isMobile = window.innerWidth <= 768;
    
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.artwork-image');
    
    parallaxElements.forEach((element, index) => {
        // Reducir efecto en móvil para mejor performance
        const multiplier = isMobile ? -0.02 : -0.1;
        const rate = scrolled * multiplier * (index % 2 === 0 ? 1 : -1);
        element.style.transform = `translateY(${rate}px)`;
    });
});