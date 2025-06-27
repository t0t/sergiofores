// ===================================
// LANDING 01234 - MAIN JAVASCRIPT
// Interacciones contemplativas y animaciones suaves
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SMOOTH SCROLLING =====
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ===== SCROLL REVEAL ANIMATIONS =====
    function initScrollReveal() {
        const observerOptions = {
            threshold: 0.15,
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
        
        // Elementos que se animan al aparecer
        const animatedElements = document.querySelectorAll(`
            .card,
            .level,
            .lab-card,
            .section__header,
            .profile__content,
            .book__content
        `);
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            observer.observe(element);
        });
    }
    
    // ===== NAVIGATION SCROLL EFFECT =====
    function initNavigationEffects() {
        const nav = document.querySelector('.nav');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Auto-hide navigation: desaparece al bajar, reaparece al subir
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Bajando - ocultar nav
                nav.style.transform = 'translateY(-100%)';
            } else {
                // Subiendo - mostrar nav
                nav.style.transform = 'translateY(0)';
            }
            
            // Cambiar opacidad del nav según scroll
            if (currentScrollY > 100) {
                nav.style.backgroundColor = 'rgba(247, 245, 243, 0.95)';
            } else {
                nav.style.backgroundColor = 'rgba(247, 245, 243, 0.9)';
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    // ===== HERO TITLE ANIMATION =====
    function initHeroAnimation() {
        const heroTitle = document.querySelector('.hero__title');
        const heroSubtitle = document.querySelector('.hero__subtitle');
        const heroCta = document.querySelector('.hero__cta');
        
        if (heroTitle) {
            // Animación de aparición escalonada
            setTimeout(() => {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 200);
            
            setTimeout(() => {
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
            }, 500);
            
            setTimeout(() => {
                heroCta.style.opacity = '1';
                heroCta.style.transform = 'translateY(0)';
            }, 800);
            
            // Estilos iniciales
            [heroTitle, heroSubtitle, heroCta].forEach(element => {
                if (element) {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(30px)';
                    element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                }
            });
        }
    }
    
    // ===== LEVEL HOVER EFFECTS =====
    function initLevelEffects() {
        const levels = document.querySelectorAll('.level');
        
        levels.forEach(level => {
            level.addEventListener('mouseenter', function() {
                // Efecto de color suave en hover
                const levelNumber = this.querySelector('.level__number');
                if (levelNumber) {
                    levelNumber.style.transform = 'scale(1.1)';
                    levelNumber.style.transition = 'transform 0.3s ease-out';
                }
            });
            
            level.addEventListener('mouseleave', function() {
                const levelNumber = this.querySelector('.level__number');
                if (levelNumber) {
                    levelNumber.style.transform = 'scale(1)';
                }
            });
        });
    }
    
    // ===== QUANTUM SPIRAL INTERACTION =====
    function initQuantumSpiral() {
        const spiral = document.querySelector('.quantum-spiral');
        
        if (spiral) {
            spiral.addEventListener('mouseenter', function() {
                const rings = this.querySelectorAll('.spiral-ring');
                rings.forEach(ring => {
                    ring.style.animationPlayState = 'paused';
                });
            });
            
            spiral.addEventListener('mouseleave', function() {
                const rings = this.querySelectorAll('.spiral-ring');
                rings.forEach(ring => {
                    ring.style.animationPlayState = 'running';
                });
            });
        }
    }
    
    // ===== CARD HOVER PARALLAX =====
    function initCardParallax() {
        const cards = document.querySelectorAll('.card, .lab-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', function() {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }
    
    // ===== PROGRESSIVE CONTENT LOADING =====
    function initProgressiveLoading() {
        // Simula carga progresiva de secciones siguiendo el patrón 01234
        const sections = ['#cerebro', '#sistema', '#sobre-mi', '#libro', '#laboratorio'];
        
        sections.forEach((sectionId, index) => {
            const section = document.querySelector(sectionId);
            if (section) {
                section.style.opacity = '0';
                section.style.transform = 'translateY(50px)';
                section.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
                
                // Delay progresivo basado en el flujo 01234
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 1000 + (index * 200));
            }
        });
    }
    
    // ===== ACCESSIBILITY HELPERS =====
    function initAccessibility() {
        // Detectar preferencia de movimiento reducido
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            // Deshabilitar animaciones complejas
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Focus visible para navegación por teclado
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-navigation');
        });
    }
    
    // ===== PERFORMANCE MONITORING =====
    function initPerformanceOptimizations() {
        // Lazy loading para elementos pesados
        if ('IntersectionObserver' in window) {
            const lazyElements = document.querySelectorAll('[data-lazy]');
            const lazyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        element.classList.add('loaded');
                        lazyObserver.unobserve(element);
                    }
                });
            });
            
            lazyElements.forEach(element => {
                lazyObserver.observe(element);
            });
        }
    }
    
    // ===== INITIALIZATION =====
    function init() {
        console.log('🧠 Iniciando CEREBRO DIGITAL 01234...');
        
        initSmoothScrolling();
        initScrollReveal();
        initNavigationEffects();
        initHeroAnimation();
        initLevelEffects();
        initQuantumSpiral();
        initCardParallax();
        initProgressiveLoading();
        initAccessibility();
        initPerformanceOptimizations();
        
        console.log('✅ Sistemas cognitivos activados - Nivel 4 materializado');
    }
    
    // Ejecutar inicialización
    init();
    
    // ===== ERROR HANDLING =====
    window.addEventListener('error', function(e) {
        console.warn('⚠️ Error en el sistema cognitivo:', e.error);
    });
    
});

// ===== COGNITIVE DEBUGGING =====
// Función de debug que sigue la filosofía 01234
function debugCognitive() {
    return {
        nivel0: 'Potencial infinito cargado ∞',
        nivel1: 'Determinación aplicada ✓',
        nivel2: 'Refinamiento en proceso...',
        nivel3: 'Conexiones establecidas 🔗',
        nivel4: 'Materialización completada 🎯'
    };
}