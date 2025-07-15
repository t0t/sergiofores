/**
 * SMOOTH SCROLL NAVIGATION
 * Sistema de navegación suave con offset para header sticky
 * 
 * ⚠️ CARACTERÍSTICAS:
 * - Scroll suave para enlaces internos
 * - Offset automático para header sticky
 * - Performance optimizada con throttle
 * - Accessible navigation
 */

class SmoothScrollNavigation {
    constructor() {
        this.header = null;
        this.scrollOffset = 20; // Respiración extra en px
        this.init();
    }

    init() {
        // Esperar a que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.header = document.querySelector('.pageheader');
        this.setupSmoothScroll();
        this.setupBackToTop();
    }

    /**
     * Configurar smooth scroll para enlaces internos
     */
    setupSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });
    }

    /**
     * Manejar el click en enlaces internos
     */
    handleSmoothScroll(e) {
        e.preventDefault();
        
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (!targetElement) {
            console.warn(`Elemento no encontrado: ${targetId}`);
            return;
        }

        const headerHeight = this.getHeaderHeight();
        const offsetPosition = this.calculateScrollPosition(targetElement, headerHeight);
        
        this.scrollToPosition(offsetPosition);
        
        // Actualizar URL sin recargar página
        this.updateURL(targetId);
        
        // Mejorar accesibilidad
        this.focusTarget(targetElement);
    }

    /**
     * Obtener altura del header
     */
    getHeaderHeight() {
        if (!this.header) return 0;
        
        const styles = window.getComputedStyle(this.header);
        const height = this.header.offsetHeight;
        const marginTop = parseInt(styles.marginTop) || 0;
        const marginBottom = parseInt(styles.marginBottom) || 0;
        
        return height + marginTop + marginBottom;
    }

    /**
     * Calcular posición de scroll con offset
     */
    calculateScrollPosition(targetElement, headerHeight) {
        const elementPosition = targetElement.getBoundingClientRect().top;
        const currentScroll = window.pageYOffset;
        const totalOffset = headerHeight + this.scrollOffset;
        
        return elementPosition + currentScroll - totalOffset;
    }

    /**
     * Scroll suave a la posición calculada
     */
    scrollToPosition(position) {
        window.scrollTo({
            top: Math.max(0, position), // Evitar scroll negativo
            behavior: 'smooth'
        });
    }

    /**
     * Actualizar URL en el historial
     */
    updateURL(targetId) {
        if (history.pushState) {
            history.pushState(null, null, targetId);
        }
    }

    /**
     * Mejorar accesibilidad enfocando el elemento target
     */
    focusTarget(targetElement) {
        // Hacer el elemento focusable temporalmente si no lo es
        const originalTabIndex = targetElement.getAttribute('tabindex');
        
        if (!targetElement.hasAttribute('tabindex')) {
            targetElement.setAttribute('tabindex', '-1');
        }
        
        // Enfocar el elemento
        targetElement.focus();
        
        // Restaurar tabindex original después de un tiempo
        setTimeout(() => {
            if (originalTabIndex === null) {
                targetElement.removeAttribute('tabindex');
            } else {
                targetElement.setAttribute('tabindex', originalTabIndex);
            }
        }, 1000);
    }

    /**
     * Configurar botón Back to Top
     */
    setupBackToTop() {
        const backToTopBtn = document.querySelector('.back-to-top');
        
        if (!backToTopBtn) {
            this.createBackToTopButton();
            return;
        }

        // Remover onclick inline si existe
        backToTopBtn.removeAttribute('onclick');
        
        // Configurar event listeners modernos
        backToTopBtn.addEventListener('click', () => this.scrollToTop());
        
        // Mostrar/ocultar según scroll con throttle para performance
        const throttledScrollHandler = this.throttle(() => {
            this.toggleBackToTopVisibility();
        }, 100);
        
        window.addEventListener('scroll', throttledScrollHandler);
        
        // Estado inicial
        this.toggleBackToTopVisibility();
    }

    /**
     * Crear botón back to top si no existe
     */
    createBackToTopButton() {
        const button = document.createElement('button');
        button.className = 'back-to-top';
        button.setAttribute('aria-label', 'Volver arriba');
        button.innerHTML = `
            <svg class="icon icon--sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" style="transform: rotate(-90deg);">
                <polyline points="9,18 15,12 9,6" />
            </svg>
        `;
        
        document.body.appendChild(button);
        
        // Configurar eventos
        button.addEventListener('click', () => this.scrollToTop());
        
        const throttledScrollHandler = this.throttle(() => {
            this.toggleBackToTopVisibility();
        }, 100);
        
        window.addEventListener('scroll', throttledScrollHandler);
        this.toggleBackToTopVisibility();
    }

    /**
     * Scroll to top suave
     */
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    /**
     * Mostrar/ocultar botón back to top
     */
    toggleBackToTopVisibility() {
        const backToTopBtn = document.querySelector('.back-to-top');
        if (!backToTopBtn) return;
        
        const scrollThreshold = 300; // Usar variable CSS si está disponible
        const isVisible = window.pageYOffset > scrollThreshold;
        
        // Usar clases en lugar de style directo para mejor CSS control
        if (isVisible) {
            backToTopBtn.classList.add('back-to-top--visible');
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.classList.remove('back-to-top--visible');
            backToTopBtn.style.display = 'none';
        }
    }

    /**
     * Throttle utility para performance
     */
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
        }
    }
}

// Inicializar automáticamente
const smoothScrollNav = new SmoothScrollNavigation();

// Exportar para testing si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmoothScrollNavigation;
}