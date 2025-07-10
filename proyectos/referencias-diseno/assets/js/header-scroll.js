/**
 * Header Scroll Behavior - Professional hide/show header
 * Comportamiento suave y profesional del header al hacer scroll
 */

class HeaderScrollBehavior {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScrollY = 0;
        this.scrollThreshold = 10; // Pixels para activar el cambio
        this.hideThreshold = 80;   // Pixels para ocultar header
        this.isScrolling = false;
        
        this.init();
    }

    init() {
        if (!this.header) {
            console.warn('Header no encontrado');
            return;
        }

        this.bindEvents();
        this.updateHeaderHeight();
        
        console.log('🎯 Header scroll behavior inicializado');
    }

    bindEvents() {
        // Scroll con throttling para performance
        window.addEventListener('scroll', this.throttle(() => {
            this.handleScroll();
        }, 16)); // ~60fps

        // Resize para ajustar altura
        window.addEventListener('resize', this.throttle(() => {
            this.updateHeaderHeight();
        }, 250));

        // Touch para móviles (mejor experiencia)
        let touchStartY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            const touchY = e.touches[0].clientY;
            const touchDelta = touchStartY - touchY;
            
            // Si el usuario desliza hacia arriba (scroll down), ocultar header más rápido
            if (touchDelta > 30 && window.scrollY > this.hideThreshold) {
                this.hideHeader();
            }
            // Si desliza hacia abajo (scroll up), mostrar header
            else if (touchDelta < -30) {
                this.showHeader();
            }
        }, { passive: true });
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
        const scrollDelta = Math.abs(currentScrollY - this.lastScrollY);

        // Solo actuar si el scroll es significativo
        if (scrollDelta < this.scrollThreshold) {
            return;
        }

        // Añadir clase 'scrolled' cuando haya scroll
        this.toggleScrolledState(currentScrollY > 20);

        // Lógica de hide/show
        if (currentScrollY <= this.hideThreshold) {
            // Cerca del top, siempre mostrar
            this.showHeader();
        } else {
            // Más abajo, mostrar/ocultar según dirección
            if (scrollDirection === 'down' && currentScrollY > this.lastScrollY + this.scrollThreshold) {
                this.hideHeader();
            } else if (scrollDirection === 'up' && currentScrollY < this.lastScrollY - this.scrollThreshold) {
                this.showHeader();
            }
        }

        this.lastScrollY = currentScrollY;
    }

    showHeader() {
        this.header.classList.remove('hidden');
        this.header.setAttribute('aria-hidden', 'false');
    }

    hideHeader() {
        this.header.classList.add('hidden');
        this.header.setAttribute('aria-hidden', 'true');
    }

    toggleScrolledState(isScrolled) {
        this.header.classList.toggle('scrolled', isScrolled);
    }

    updateHeaderHeight() {
        // Ajustar el padding-top del body según la altura real del header
        const headerHeight = this.header.offsetHeight;
        document.body.style.paddingTop = `${headerHeight + 20}px`;
    }

    // Utility: Throttle function para performance
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Método público para forzar mostrar header
    forceShow() {
        this.showHeader();
        this.lastScrollY = window.scrollY;
    }

    // Método público para forzar ocultar header
    forceHide() {
        this.hideHeader();
        this.lastScrollY = window.scrollY;
    }

    // Destructor para cleanup
    destroy() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.updateHeaderHeight);
        document.body.style.paddingTop = '';
        this.header.classList.remove('hidden', 'scrolled');
        this.header.removeAttribute('aria-hidden');
    }
}

// ===== INICIALIZACIÓN =====

let headerScrollBehavior = null;

document.addEventListener('DOMContentLoaded', () => {
    headerScrollBehavior = new HeaderScrollBehavior();
    
    // Exponer globalmente para debug/control
    window.headerScroll = headerScrollBehavior;
});

// Prevenir flash inicial
document.documentElement.style.scrollBehavior = 'smooth';

// Export para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeaderScrollBehavior;
}