// Sistema de observación de scroll mejorado
const createObserver = (className, options = {}) => {
    const defaultOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        ...options
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, defaultOptions);

    document.querySelectorAll(`.${className}`).forEach(el => {
        observer.observe(el);
    });
};

// Navegación suave
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

// Control de videos para performance
const setupVideoControl = () => {
    const videos = document.querySelectorAll('video');
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play().catch(e => console.log('Video autoplay failed:', e));
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });

    videos.forEach(video => {
        videoObserver.observe(video);
    });
};

// Header dinámico
const setupDynamicHeader = () => {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            header.style.borderColor = 'rgba(255, 107, 53, 0.3)';
        } else {
            header.style.backgroundColor = 'rgba(26, 26, 26, 0.9)';
            header.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }
        
        lastScrollY = currentScrollY;
    });
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    createObserver('fade-in');
    createObserver('reveal', { threshold: 0.2 });
    setupVideoControl();
    setupDynamicHeader();

    // Delay para efectos secuenciales
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach((el, index) => {
            setTimeout(() => {
                el.style.transitionDelay = `${index * 0.1}s`;
            }, index * 50);
        });
    }, 500);
});

// Preload de audio para mejor UX
document.querySelectorAll('audio').forEach(audio => {
    audio.addEventListener('loadstart', () => {
        console.log(`Loading audio: ${audio.querySelector('source').src}`);
    });
});