// Navegación lateral activa
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

function updateActiveNav() {
    const scrollPos = window.scrollY + 150;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const correspondingLink = document.querySelector(`a[href="#${section.id}"]`);
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// Smooth scrolling para navegación
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 120;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Efectos interactivos para formas geométricas
const geoShapes = document.querySelectorAll('.geo-shape');
geoShapes.forEach(shape => {
    shape.addEventListener('mouseenter', () => {
        shape.style.transform = 'scale(1.2) rotate(5deg)';
    });
    
    shape.addEventListener('mouseleave', () => {
        shape.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Animación de aparición para componentes
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a elementos
const animatedElements = document.querySelectorAll('.component-example, .color-swatch, .type-sample');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});