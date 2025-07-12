/**
 * UI INTERACTIONS COMPONENT
 * Componente modular para interacciones generales de UI
 * Maneja header scroll, cursor personalizado, optimizaciones de imagen, etc.
 */

class UIInteractions {
    constructor(options = {}) {
        // Configuración con valores por defecto
        this.config = {
            headerSelector: '.header',
            scrolledClass: 'scrolled',
            scrollThresholdProperty: '--nav-scroll-threshold',
            enableCustomCursor: true,
            cursorSelector: '.custom-cursor',
            cursorHoverClass: 'hover',
            enableImageOptimization: true,
            projectCardsSelector: '.project-card',
            optimizeOnInit: true,
            ...options
        };
        
        this.header = null;
        this.customCursor = null;
        this.lastScrollTop = 0;
        this.ticking = false;
        
        this.init();
    }
    
    init() {
        this.findElements();
        this.setupHeaderScroll();
        
        if (this.config.enableCustomCursor) {
            this.setupCustomCursor();
        }
        
        if (this.config.enableImageOptimization && this.config.optimizeOnInit) {
            this.optimizeImages();
        }
        
        this.setupGeneralInteractions();
    }
    
    findElements() {
        this.header = document.querySelector(this.config.headerSelector);
    }
    
    setupHeaderScroll() {
        if (!this.header) return;
        
        const updateHeader = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollThreshold = this.getScrollThreshold();
            
            // Header transparente/opaco según scroll
            if (scrollTop > scrollThreshold) {
                this.header.classList.add(this.config.scrolledClass);
            } else {
                this.header.classList.remove(this.config.scrolledClass);
            }
            
            this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            this.ticking = false;
            
            // Emit custom event
            document.dispatchEvent(new CustomEvent('headerScroll', {
                detail: { 
                    component: 'UIInteractions',
                    scrollTop,
                    isScrolled: scrollTop > scrollThreshold
                }
            }));
        };
        
        // Optimized scroll handler
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                requestAnimationFrame(updateHeader);
                this.ticking = true;
            }
        }, { passive: true });
    }
    
    getScrollThreshold() {
        const thresholdProperty = getComputedStyle(document.documentElement)
            .getPropertyValue(this.config.scrollThresholdProperty);
        return parseInt(thresholdProperty) || 100;
    }
    
    setupCustomCursor() {
        // Solo activar en desktop con hover capability
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            return;
        }
        
        this.createCustomCursor();
        this.setupCursorEvents();
    }
    
    createCustomCursor() {
        // Buscar cursor existente o crear nuevo
        this.customCursor = document.querySelector('.custom-cursor');
        
        if (!this.customCursor) {
            this.customCursor = document.createElement('div');
            this.customCursor.className = 'custom-cursor';
            document.body.appendChild(this.customCursor);
        }
    }
    
    setupCursorEvents() {
        if (!this.customCursor) return;
        
        // Seguir movimiento del mouse
        document.addEventListener('mousemove', (e) => {
            this.customCursor.style.left = e.clientX + 'px';
            this.customCursor.style.top = e.clientY + 'px';
        });
        
        // Hover en enlaces - cambiar a cyan
        document.querySelectorAll('a, button, .nav-links a, .project-card').forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.customCursor.classList.add('hover-link');
            });
            
            element.addEventListener('mouseleave', () => {
                this.customCursor.classList.remove('hover-link');
            });
        });
        
        // Hover effects para elementos interactivos
        const interactiveSelectors = 'a, button, .logo, .project-card, [role=\"button\"]';
        
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches(interactiveSelectors) || e.target.closest(interactiveSelectors)) {
                this.customCursor.classList.add(this.config.cursorHoverClass);
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (e.target.matches(interactiveSelectors) || e.target.closest(interactiveSelectors)) {
                this.customCursor.classList.remove(this.config.cursorHoverClass);
            }
        });
    }
    
    optimizeImages() {
        // Optimizar project cards
        const projectCards = document.querySelectorAll(this.config.projectCardsSelector);
        projectCards.forEach(card => {
            card.classList.add('in-view');
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
        
        // Optimizar imágenes lazy
        const lazyImages = document.querySelectorAll('img[loading=\"lazy\"], .lazy-loading');
        lazyImages.forEach(img => {
            img.style.filter = 'none';
            img.style.transform = 'none';
            img.style.opacity = '1';
            img.classList.remove('lazy-loading');
            img.classList.add('loaded');
        });
        
        // Emit custom event
        document.dispatchEvent(new CustomEvent('imagesOptimized', {
            detail: { component: 'UIInteractions' }
        }));
    }
    
    setupGeneralInteractions() {
        // Logo click handler
        const logoLink = document.querySelector('.logo-link, .logo');
        if (logoLink) {
            logoLink.addEventListener('click', (e) => {
                if (logoLink.getAttribute('href') === '#inicio' || logoLink.getAttribute('href') === '#') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    
                    // Clear navigation states
                    document.dispatchEvent(new CustomEvent('logoClick', {
                        detail: { component: 'UIInteractions' }
                    }));
                }
            });
        }
        
        // Update footer year
        this.updateFooterYear();
        
        // Force visibility for critical elements
        this.forceVisibility();
    }
    
    updateFooterYear() {
        const currentYearSpan = document.getElementById('currentYear');
        if (currentYearSpan) {
            currentYearSpan.textContent = new Date().getFullYear();
        }
    }
    
    forceVisibility() {
        // Forzar visibilidad inmediata para elementos críticos
        const criticalElements = document.querySelectorAll('section, .header');
        
        criticalElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
            element.style.filter = 'blur(0px)';
        });
    }
    
    // Método público para trigger manual de optimización de imágenes
    triggerImageOptimization() {
        this.optimizeImages();
    }
    
    // Método para mostrar/ocultar cursor personalizado
    toggleCustomCursor(show = true) {
        if (!this.customCursor) return;
        
        this.customCursor.style.display = show ? 'block' : 'none';
    }
    
    // Método para actualizar configuración
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
    }
    
    // Método para destruir el componente
    destroy() {
        // Remove custom cursor
        if (this.customCursor && this.customCursor.parentNode) {
            this.customCursor.parentNode.removeChild(this.customCursor);
        }
        
        // Remove event listeners
        window.removeEventListener('scroll', this.setupHeaderScroll);
        document.removeEventListener('mousemove', this.setupCursorEvents);
        document.removeEventListener('mouseenter', this.setupCursorEvents);
        document.removeEventListener('mouseleave', this.setupCursorEvents);
        document.removeEventListener('mouseover', this.setupCursorEvents);
        document.removeEventListener('mouseout', this.setupCursorEvents);
        
        // Clean up header classes
        if (this.header) {
            this.header.classList.remove(this.config.scrolledClass);
        }
    }
}

// Export para módulos ES6 o definición global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIInteractions;
} else {
    window.UIInteractions = UIInteractions;
}