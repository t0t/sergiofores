// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Cerrar menú móvil si está abierto
            const hamburger = document.querySelector('.nav-hamburger');
            const navLinks = document.querySelector('.nav-links');
            if (hamburger && navLinks && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('nav-open');
                hamburger.setAttribute('aria-expanded', 'false');
                console.log('🔗 Menú cerrado por click en enlace');
            }
            
            // Smooth scroll
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header show/hide on scroll + Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinkElements = document.querySelectorAll('.nav-links a');
const navContainer = document.querySelector('header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const header = document.querySelector('header');
    
    // Add scrolled class for backdrop effect
    if (currentScrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Show/hide header based on scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide header
        navContainer.classList.add('nav-hidden');
    } else {
        // Scrolling up - show header
        navContainer.classList.remove('nav-hidden');
    }
    
    lastScrollY = currentScrollY;
    
    // Active navigation link highlighting
    let current = '';
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinkElements.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallaxSpeed = 0.5;
    
    if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// Intersection Observer for fade-in animations
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

// Apply animation to cards and sections
document.querySelectorAll('.paradigma-card, .metodologia-item, .herramienta-category, .area, .colaboracion-cta').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add smooth hover effects for herramienta tags
document.querySelectorAll('.herramienta').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add dynamic animation to creative element on scroll
const creativeElement = document.querySelector('.creative-element');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroHeight = hero.offsetHeight;
    
    if (scrolled < heroHeight) {
        const rotation = scrolled * 0.5;
        creativeElement.style.transform = `rotate(${rotation}deg)`;
    }
});

// Typewriter effect implementation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    element.style.borderRight = '2px solid var(--tech-primary)';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Blinking cursor effect
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    type();
}

// Performance optimization: debounce scroll events
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

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    // Consolidate scroll handlers here if needed
}, 10);

// Back to Top Button functionality
const backToTopButton = document.getElementById('backToTop');

function toggleBackToTopButton() {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
}

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', debounce(toggleBackToTopButton, 100));

// Mobile Navigation Toggle - VARIABLES GLOBALES
let navHamburger = document.querySelector('.nav-hamburger');
let navLinks = document.querySelector('.nav-links');
const body = document.body;

function toggleMobileNav() {
    console.log('🔄 toggleMobileNav ejecutado');
    
    if (!navHamburger || !navLinks) {
        console.error('❌ Variables no definidas:', navHamburger, navLinks);
        return;
    }
    
    navHamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.classList.toggle('nav-open');
    
    // Update aria-expanded attribute
    const isExpanded = navHamburger.classList.contains('active');
    navHamburger.setAttribute('aria-expanded', isExpanded);
    
    console.log('✅ Estado del menú:', isExpanded ? 'ABIERTO' : 'CERRADO');
}

// Estos event listeners se configurarán en DOMContentLoaded

// Add loading state management and initialize typewriter
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');
    
    // Initialize mobile navigation - FORZAR BÚSQUEDA EN DOM
    navHamburger = document.querySelector('.nav-hamburger');
    navLinks = document.querySelector('.nav-links');
    
    if (navHamburger && navLinks) {
        // Event listener para abrir/cerrar menú
        navHamburger.addEventListener('click', toggleMobileNav);
        
        // Event listener para enlaces ya manejado en smooth scroll global
        
        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!navHamburger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
                navHamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('nav-open');
                navHamburger.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close mobile nav on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navHamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('nav-open');
                navHamburger.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navHamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('nav-open');
                navHamburger.setAttribute('aria-expanded', 'false');
            }
        });
        
        console.log('✅ Menú hamburguesa inicializado correctamente');
    } else {
        console.error('❌ No se encontró el botón hamburguesa o nav-links');
        console.error('hamburger:', navHamburger, 'navLinks:', navLinks);
    }
    
    // Initialize typewriter effect on hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
    
    // Initialize back to top button visibility
    toggleBackToTopButton();
    
    // Initialize any additional animations or effects
    setTimeout(() => {
        document.querySelectorAll('.paradigma-card, .metodologia-item, .herramienta-category').forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
        });
    }, 100);
    
    // Add touch support for mobile interactions
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-enabled');
    }
});