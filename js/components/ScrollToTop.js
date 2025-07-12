/**
 * SCROLL TO TOP COMPONENT
 * Componente modular para funcionalidad back-to-top
 * Maneja visibilidad y comportamiento del botón scroll to top
 */

class ScrollToTop {
    constructor(options = {}) {
        // Configuración con valores por defecto
        this.config = {
            buttonId: 'backToTop',
            showThresholdProperty: '--space-300px',
            scrollDuration: 'smooth',
            visibleClass: 'visible',
            ariaLabel: 'Volver arriba',
            ...options
        };
        
        this.button = null;
        this.isVisible = false;
        this.scrollThreshold = this.getThresholdFromCSS();
        
        this.init();
    }
    
    init() {
        this.findButton();
        if (this.button) {
            this.setupEventListeners();
            this.setInitialState();
        }
    }
    
    findButton() {
        this.button = document.getElementById(this.config.buttonId);
        if (!this.button) {
            console.warn(`ScrollToTop: Button with id "${this.config.buttonId}" not found`);
        }
    }
    
    setupEventListeners() {
        // Event listener optimizado para scroll
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateVisibility();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        // Guardar referencias bound para poder removerlas después
        this.boundScrollToTop = (e) => {
            e.preventDefault();
            this.scrollToTop();
        };
        
        this.boundUpdateVisibility = handleScroll;
        
        // Click handler para scroll to top
        this.button.addEventListener('click', this.boundScrollToTop);
        
        // Scroll listener con passive para performance
        window.addEventListener('scroll', this.boundUpdateVisibility, { passive: true });
    }
    
    updateVisibility() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        // Actualizar threshold dinámicamente por si cambia CSS
        this.scrollThreshold = this.getThresholdFromCSS();
        const shouldShow = scrollPosition > this.scrollThreshold;
        
        if (shouldShow && !this.isVisible) {
            this.show();
        } else if (!shouldShow && this.isVisible) {
            this.hide();
        }
    }
    
    show() {
        this.button.classList.add(this.config.visibleClass);
        this.button.setAttribute('aria-hidden', 'false');
        this.isVisible = true;
    }
    
    hide() {
        this.button.classList.remove(this.config.visibleClass);
        this.button.setAttribute('aria-hidden', 'true');
        this.isVisible = false;
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: this.config.scrollDuration
        });
        
        // Emitir evento personalizado para que otros componentes reaccionen
        document.dispatchEvent(new CustomEvent('scrollToTop', {
            detail: { component: 'ScrollToTop' }
        }));
    }
    
    setInitialState() {
        // Establecer estado inicial correcto
        this.updateVisibility();
    }
    
    // Obtener threshold desde CSS custom property
    getThresholdFromCSS() {
        const thresholdProperty = getComputedStyle(document.documentElement)
            .getPropertyValue(this.config.showThresholdProperty);
        const threshold = parseInt(thresholdProperty) || 300;
        return threshold;
    }
    
    // Método para cambiar configuración dinámicamente
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        this.scrollThreshold = this.getThresholdFromCSS();
    }
    
    // Método para destruir el componente
    destroy() {
        if (this.button) {
            // Crear referencia al handler bound para poder removerlo
            this.button.removeEventListener('click', this.boundScrollToTop);
        }
        window.removeEventListener('scroll', this.boundUpdateVisibility);
    }
}

// Export para módulos ES6 o definición global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScrollToTop;
} else {
    window.ScrollToTop = ScrollToTop;
}