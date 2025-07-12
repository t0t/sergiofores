/**
 * SMOOTH SCROLLING COMPONENT
 * Componente modular para scroll suave y navegación activa
 * Maneja anchors, intersection observer y estados activos
 */

class SmoothScrolling {
    constructor(options = {}) {
        // Configuración con valores por defecto
        this.config = {
            headerSelector: '.header',
            navLinksSelector: '.main-nav a[href^="#"]',
            allLinksSelector: 'a[href^="#"]',
            sections: [], // Se auto-detectan si está vacío
            activeClass: 'active',
            headerOffsetProperty: '--nav-height-offset',
            clearThresholdProperty: '--nav-height-offset',
            observerRootMargin: '-80px 0px -40% 0px',
            observerThreshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
            minIntersectionRatio: 0.1,
            ...options
        };
        
        this.header = null;
        this.navLinks = [];
        this.sections = [];
        this.currentSection = '';
        this.observer = null;
        
        this.init();
    }
    
    init() {
        this.findElements();
        this.setupSmoothScrolling();
        this.setupIntersectionObserver();
        this.setupScrollMonitoring();
    }
    
    findElements() {
        // Encontrar header
        this.header = document.querySelector(this.config.headerSelector);
        
        // Encontrar nav links
        this.navLinks = Array.from(document.querySelectorAll(this.config.navLinksSelector));
        
        // Auto-detectar secciones si no se especificaron
        if (this.config.sections.length === 0) {
            this.navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const sectionId = href.substring(1);
                    const section = document.getElementById(sectionId);
                    if (section) {
                        this.sections.push(section);
                    }
                }
            });
        } else {
            // Usar secciones especificadas
            this.sections = this.config.sections
                .map(id => document.getElementById(id))
                .filter(Boolean);
        }
    }
    
    setupSmoothScrolling() {
        // Aplicar smooth scrolling a todos los enlaces anchor
        document.querySelectorAll(this.config.allLinksSelector).forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                
                // Solo procesar enlaces internos
                if (!href || !href.startsWith('#')) return;
                
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    this.scrollToElement(target);
                }
            });
        });
    }
    
    scrollToElement(element) {
        const headerOffset = this.getHeaderOffset();
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Emit custom event
        document.dispatchEvent(new CustomEvent('smoothScroll', {
            detail: { 
                component: 'SmoothScrolling',
                target: element,
                targetId: element.id
            }
        }));
    }
    
    getHeaderOffset() {
        // Priorizar CSS custom property para consistencia
        const offsetProperty = getComputedStyle(document.documentElement)
            .getPropertyValue(this.config.headerOffsetProperty);
        const cssOffset = parseInt(offsetProperty);
        
        if (cssOffset) {
            return cssOffset;
        }
        
        // Fallback: medir header real
        if (this.header) {
            return this.header.getBoundingClientRect().height;
        }
        
        // Último fallback
        return 80;
    }
    
    setupIntersectionObserver() {
        const headerOffset = this.getHeaderOffset();
        
        this.observer = new IntersectionObserver((entries) => {
            const clearThreshold = this.getClearThreshold();
            
            // Limpiar estados activos si estamos cerca del top
            if (window.scrollY < clearThreshold) {
                this.clearActiveStates();
                return;
            }
            
            // Encontrar la sección con mayor ratio de intersección
            let maxRatio = 0;
            let activeSection = '';
            
            entries.forEach(entry => {
                if (entry.intersectionRatio > maxRatio) {
                    maxRatio = entry.intersectionRatio;
                    activeSection = entry.target.id;
                }
            });
            
            // Actualizar estado activo si supera el mínimo
            if (maxRatio > this.config.minIntersectionRatio && activeSection) {
                this.updateActiveLink(activeSection);
            }
        }, {
            rootMargin: this.config.observerRootMargin,
            threshold: this.config.observerThreshold
        });
        
        // Observar todas las secciones
        this.sections.forEach(section => {
            this.observer.observe(section);
        });
    }
    
    setupScrollMonitoring() {
        // Monitor adicional para limpiar estados activos en el top
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const clearThreshold = this.getClearThreshold();
                    if (window.scrollY < clearThreshold) {
                        this.clearActiveStates();
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
    
    getClearThreshold() {
        const thresholdProperty = getComputedStyle(document.documentElement)
            .getPropertyValue(this.config.clearThresholdProperty);
        return parseInt(thresholdProperty) || 100;
    }
    
    updateActiveLink(sectionId) {
        if (this.currentSection === sectionId) return;
        
        this.currentSection = sectionId;
        
        // Actualizar clases activas
        this.navLinks.forEach(link => {
            link.classList.remove(this.config.activeClass);
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add(this.config.activeClass);
            }
        });
        
        // Emit custom event
        document.dispatchEvent(new CustomEvent('navigationUpdate', {
            detail: { 
                component: 'SmoothScrolling',
                activeSection: sectionId
            }
        }));
    }
    
    clearActiveStates() {
        this.navLinks.forEach(link => {
            link.classList.remove(this.config.activeClass);
        });
        this.currentSection = '';
        
        // Emit custom event
        document.dispatchEvent(new CustomEvent('navigationClear', {
            detail: { component: 'SmoothScrolling' }
        }));
    }
    
    // Método público para scrollear a una sección específica
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            this.scrollToElement(section);
        }
    }
    
    // Método para actualizar configuración
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        
        // Re-inicializar observer si cambió configuración relevante
        if (newConfig.observerRootMargin || newConfig.observerThreshold) {
            this.observer?.disconnect();
            this.setupIntersectionObserver();
        }
    }
    
    // Método para destruir el componente
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        
        // Remove event listeners (estos se agregan dinámicamente, no se pueden remover así)
        // Los event listeners se limpian automáticamente al disconnect del observer
        
        this.clearActiveStates();
    }
}

// Export para módulos ES6 o definición global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmoothScrolling;
} else {
    window.SmoothScrolling = SmoothScrolling;
}