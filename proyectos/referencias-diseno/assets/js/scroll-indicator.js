/**
 * Scroll Navigation System
 * Indicador de scroll y botón scroll to top que se alternan según la posición
 */

class ScrollNavigation {
    constructor() {
        this.indicator = null;
        this.scrollToTop = null;
        this.indicatorVisible = true;
        this.scrollToTopVisible = false;
        this.showScrollToTopThreshold = 400; // px para mostrar scroll to top
        this.hideIndicatorThreshold = 200; // px para ocultar indicador
        this.lastScrollY = 0;
        
        this.init();
    }

    init() {
        this.indicator = document.querySelector('.scroll-indicator');
        this.scrollToTop = document.querySelector('.scroll-to-top');
        
        if (!this.indicator || !this.scrollToTop) {
            return;
        }

        this.setupEventListeners();
        this.checkInitialState();
    }

    setupEventListeners() {
        // Scroll listener con throttle
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
            }, 16); // ~60fps
        }, { passive: true });


        // Click en scroll to top
        this.scrollToTop.addEventListener('click', () => {
            this.scrollToTopAction();
        });

        // Listener para resize
        window.addEventListener('resize', () => {
            this.checkVisibility();
        });

        // Intersection Observer para detectar cuando llegar al final
        this.setupIntersectionObserver();
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Calcular progreso del scroll
        const scrollProgress = currentScrollY / (documentHeight - windowHeight);
        
        // Lógica para scroll indicator (se oculta cuando scrolleamos)
        const shouldHideIndicator = currentScrollY > this.hideIndicatorThreshold || 
                                   scrollProgress > 0.8 || 
                                   documentHeight <= windowHeight + 100;

        if (shouldHideIndicator && this.indicatorVisible) {
            this.hideIndicator();
        } else if (!shouldHideIndicator && !this.indicatorVisible) {
            this.showIndicator();
        }

        // Lógica para scroll to top (aparece cuando scrolleamos suficiente)
        const shouldShowScrollToTop = currentScrollY > this.showScrollToTopThreshold && 
                                     documentHeight > windowHeight + 200;

        if (shouldShowScrollToTop && !this.scrollToTopVisible) {
            this.showScrollToTop();
        } else if (!shouldShowScrollToTop && this.scrollToTopVisible) {
            this.hideScrollToTop();
        }

        this.lastScrollY = currentScrollY;
    }

    setupIntersectionObserver() {
        // Observar el footer para ocultar el indicador cuando sea visible
        const footer = document.querySelector('.footer');
        if (!footer) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.hideIndicator();
                } else if (window.scrollY < this.hideIndicatorThreshold) {
                    this.showIndicator();
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        observer.observe(footer);
    }

    checkInitialState() {
        // Verificar si hay contenido suficiente para mostrar el indicador
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        if (documentHeight <= windowHeight + 100) {
            this.hideIndicator();
            this.hideScrollToTop();
        } else {
            this.showIndicator();
        }
    }

    showIndicator() {
        if (this.indicatorVisible) return;
        
        this.indicatorVisible = true;
        this.indicator.classList.remove('hidden');
        this.indicator.setAttribute('aria-hidden', 'false');
    }

    hideIndicator() {
        if (!this.indicatorVisible) return;
        
        this.indicatorVisible = false;
        this.indicator.classList.add('hidden');
        this.indicator.setAttribute('aria-hidden', 'true');
    }

    showScrollToTop() {
        if (this.scrollToTopVisible) return;
        
        this.scrollToTopVisible = true;
        this.scrollToTop.classList.add('visible');
        this.scrollToTop.classList.remove('hidden');
        this.scrollToTop.setAttribute('aria-hidden', 'false');
        this.scrollToTop.removeAttribute('tabindex');
    }

    hideScrollToTop() {
        if (!this.scrollToTopVisible) return;
        
        this.scrollToTopVisible = false;
        this.scrollToTop.classList.remove('visible');
        this.scrollToTop.classList.add('hidden');
        this.scrollToTop.setAttribute('aria-hidden', 'true');
        this.scrollToTop.setAttribute('tabindex', '-1');
    }

    scrollToTopAction() {
        // Scroll suave al inicio de la página
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    }


    checkVisibility() {
        // Re-evaluar visibilidad en resize
        this.checkInitialState();
        this.handleScroll();
    }

    // Métodos públicos para control externo
    forceHideIndicator() {
        this.hideIndicator();
    }

    forceShowIndicator() {
        this.showIndicator();
    }

    forceHideScrollToTop() {
        this.hideScrollToTop();
    }

    forceShowScrollToTop() {
        this.showScrollToTop();
    }

    toggleIndicator() {
        if (this.indicatorVisible) {
            this.hideIndicator();
        } else {
            this.showIndicator();
        }
    }

    destroy() {
        // Cleanup de event listeners
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.checkVisibility);
    }
}

// ===== INICIALIZACIÓN AUTOMÁTICA =====

let scrollNavigation = null;

document.addEventListener('DOMContentLoaded', () => {
    scrollNavigation = new ScrollNavigation();
    
    // Exponer globalmente para debug
    window.scrollNavigation = scrollNavigation;
});

// Export para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScrollNavigation;
}