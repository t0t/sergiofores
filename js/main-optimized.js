/**
 * SERGIO FORÉS PORTFOLIO - MAIN OPTIMIZED
 * Versión consolidada y optimizada para producción
 * Elimina redundancias y mejora performance
 */

// ===== HEADER & NAVIGATION =====
class PortfolioManager {
    constructor() {
        this.header = document.querySelector('.header');
        this.navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
        this.sections = ['sergio', 'sistema01234', 'cerebro', 'playground'];
        this.currentSection = '';
        this.lastScrollTop = 0;
        this.ticking = false;
        
        this.init();
    }
    
    init() {
        this.setupScrollHandler();
        this.setupSmoothScrolling();
        this.setupIntersectionObserver();
        this.setupMobileMenu();
        this.setupBackToTop();
        this.setupLogoClick();
        this.updateFooterYear();
        this.optimizeImages();
    }
    
    // ===== SCROLL HANDLER =====
    setupScrollHandler() {
        const updateHeader = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollThreshold = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-scroll-threshold'));
            
            // Header transparente/opaco según scroll
            if (scrollTop > scrollThreshold) {
                this.header?.classList.add('scrolled');
            } else {
                this.header?.classList.remove('scrolled');
            }
            
            this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            this.ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                requestAnimationFrame(updateHeader);
                this.ticking = true;
            }
        });
    }
    
    // ===== SMOOTH SCROLLING =====
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const headerHeight = this.header?.getBoundingClientRect().height || 
                        parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height-offset'));
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight + 1;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ===== NAVIGATION ACTIVE STATE =====
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            const clearThreshold = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height-offset'));
            if (window.scrollY < clearThreshold) {
                this.clearActiveStates();
                return;
            }
            
            let maxRatio = 0;
            let activeSection = '';
            
            entries.forEach(entry => {
                if (entry.intersectionRatio > maxRatio) {
                    maxRatio = entry.intersectionRatio;
                    activeSection = entry.target.id;
                }
            });
            
            const minRatio = 0.1; // Keep as constant - this is a percentage threshold
            if (maxRatio > minRatio && activeSection) {
                this.updateActiveLink(activeSection);
            }
        }, {
            rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height-offset'))}px 0px -40% 0px`,
            threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0] // Keep as constants - these are percentage thresholds
        });
        
        this.sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) observer.observe(section);
        });
        
        // Clear active states when at top
        window.addEventListener('scroll', () => {
            const clearThreshold = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height-offset'));
            if (window.scrollY < clearThreshold) this.clearActiveStates();
        });
    }
    
    updateActiveLink(sectionId) {
        if (this.currentSection === sectionId) return;
        
        this.currentSection = sectionId;
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    clearActiveStates() {
        this.navLinks.forEach(link => link.classList.remove('active'));
        this.currentSection = '';
    }
    
    // ===== MOBILE MENU =====
    setupMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const mainNav = document.getElementById('mainNav');
        
        if (menuToggle && mainNav) {
            menuToggle.addEventListener('click', () => {
                mainNav.classList.toggle('open');
                menuToggle.classList.toggle('open');
            });
            
            mainNav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mainNav.classList.remove('open');
                    menuToggle.classList.remove('open');
                });
            });
        }
    }
    
    // ===== BACK TO TOP =====
    setupBackToTop() {
        const backToTopButton = document.getElementById('backToTop');
        
        if (!backToTopButton) {
            return;
        }
        
        // Función para mostrar/ocultar el botón
        const toggleBackToTop = () => {
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            const showThreshold = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--space-300px')) || 300;
            
            if (scrollPosition > showThreshold) {
                backToTopButton.classList.add('visible');
                backToTopButton.setAttribute('aria-hidden', 'false');
            } else {
                backToTopButton.classList.remove('visible');
                backToTopButton.setAttribute('aria-hidden', 'true');
            }
        };
        
        // Click handler para scroll to top
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ 
                top: 0, 
                behavior: 'smooth' 
            });
            
            // Clear active navigation states when going to top
            this.clearActiveStates();
        });
        
        // Agregar event listener de scroll
        window.addEventListener('scroll', toggleBackToTop, { passive: true });
        
        // Llamada inicial para establecer estado correcto
        toggleBackToTop();
        
    }
    
    // ===== LOGO CLICK =====
    setupLogoClick() {
        const logoLink = document.querySelector('.logo-link');
        if (logoLink) {
            logoLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                this.clearActiveStates();
            });
        }
    }
    
    // ===== FOOTER YEAR =====
    updateFooterYear() {
        const currentYearSpan = document.getElementById('currentYear');
        if (currentYearSpan) {
            currentYearSpan.textContent = new Date().getFullYear();
        }
    }
    
    // ===== IMAGE OPTIMIZATION =====
    optimizeImages() {
        // Mostrar todos los project cards inmediatamente
        const projectCards = document.querySelectorAll('.project-card');
        const opacityFull = getComputedStyle(document.documentElement).getPropertyValue('--opacity-full') || '1';
        
        projectCards.forEach(card => {
            card.classList.add('in-view');
            card.style.opacity = opacityFull;
            card.style.transform = 'translateY(0)';
        });
        
        // Quitar filtros blur de todas las imágenes
        const allImages = document.querySelectorAll('.project-screenshot img, img[loading="lazy"]');
        const opacityFull = getComputedStyle(document.documentElement).getPropertyValue('--opacity-full') || '1';
        
        allImages.forEach(img => {
            img.style.filter = 'none';
            img.style.transform = 'none';
            img.style.opacity = opacityFull;
            img.classList.remove('lazy-loading');
            img.classList.add('loaded');
        });
    }
}

// ===== CURSOR PERSONALIZADO (Solo Desktop) =====
class CustomCursor {
    constructor() {
        // Solo activar en desktop
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
        
        this.cursor = null;
        this.isVisible = false;
        this.init();
    }
    
    init() {
        this.createCursor();
        this.setupEventListeners();
    }
    
    createCursor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);
    }
    
    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            if (this.cursor) {
                this.cursor.style.left = e.clientX + 'px';
                this.cursor.style.top = e.clientY + 'px';
            }
        });
        
        const opacityFull = getComputedStyle(document.documentElement).getPropertyValue('--opacity-full') || '1';
        const opacityHidden = getComputedStyle(document.documentElement).getPropertyValue('--opacity-hidden') || '0';
        
        document.addEventListener('mouseenter', () => {
            if (this.cursor) this.cursor.style.opacity = opacityFull;
        });
        
        document.addEventListener('mouseleave', () => {
            if (this.cursor) this.cursor.style.opacity = opacityHidden;
        });
        
        // Hover effects only for functional elements
        document.addEventListener('mouseover', (e) => {
            if (!this.cursor) return;
            
            if (e.target.matches('a, button, .logo, .project-card') || e.target.closest('.project-card')) {
                this.cursor.classList.add('hover');
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (!this.cursor) return;
            
            if (e.target.matches('a, button, .logo, .project-card') || e.target.closest('.project-card')) {
                this.cursor.classList.remove('hover');
            }
        });
    }
}

// ===== VIDEO OPTIMIZER SIMPLIFICADO =====
class VideoOptimizer {
    constructor() {
        this.video = document.querySelector('.hero-video');
        if (this.video) this.init();
    }
    
    init() {
        // Configuración básica
        this.video.muted = true;
        this.video.playsInline = true;
        
        // Intentar reproducir
        const playDelay = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--duration-instant')) || 100;
        setTimeout(() => {
            this.video.play().catch(() => {
                // Si falla, mostrar fallback
                this.showFallback();
            });
        }, playDelay);
        
        // Pausar video cuando no es visible (performance)
        window.addEventListener('scroll', () => {
            const rect = this.video.getBoundingClientRect();
            const isVisible = rect.bottom >= 0 && rect.top <= window.innerHeight;
            
            if (isVisible && this.video.paused) {
                this.video.play().catch(() => {});
            } else if (!isVisible && !this.video.paused) {
                this.video.pause();
            }
        });
    }
    
    showFallback() {
        const fallback = document.querySelector('.hero-video-fallback');
        if (fallback) {
            fallback.style.display = 'block';
            this.video.style.display = 'none';
        }
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar componentes principales
    window.portfolioManager = new PortfolioManager();
    window.customCursor = new CustomCursor();
    window.videoOptimizer = new VideoOptimizer();
    
    // Forzar visibilidad inmediata (elimina loading delays)
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('.header');
    const opacityFull = getComputedStyle(document.documentElement).getPropertyValue('--opacity-full') || '1';
    
    if (header) {
        header.style.opacity = opacityFull;
        header.style.transform = 'translateY(0)';
    }
    
    sections.forEach(section => {
        section.style.opacity = opacityFull;
        section.style.transform = 'translateY(0) scale(1)';
        section.style.filter = 'blur(0px)';
    });
});

// ===== PERFORMANCE MONITORING =====
if ('PerformanceObserver' in window) {
    try {
        const observer = new PerformanceObserver((list) => {
            // Monitor performance silently (no console logs in production)
        });
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
    } catch (error) {
        // Silent fail
    }
}