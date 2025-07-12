/**
 * PORTFOLIO APP - COORDINADOR PRINCIPAL
 * Sistema modular que coordina todos los componentes JavaScript
 * Implementa arquitectura de componentes reutilizables
 */

class PortfolioApp {
    constructor(options = {}) {
        // Configuración global
        this.config = {
            enableScrollToTop: true,
            enableResponsiveMenu: true,
            enableSmoothScrolling: true,
            enableUIInteractions: true,
            enableVideoOptimizer: true,
            enableCustomCursor: true,
            autoInit: true,
            debug: false,
            ...options
        };
        
        // Componentes registrados
        this.components = {
            scrollToTop: null,
            responsiveMenu: null,
            smoothScrolling: null,
            uiInteractions: null,
            videoOptimizer: null
        };
        
        // Estado de la aplicación
        this.isInitialized = false;
        this.activeComponents = [];
        
        if (this.config.autoInit) {
            this.init();
        }
    }
    
    init() {
        if (this.isInitialized) {
            this.log('App already initialized');
            return;
        }
        
        this.log('Initializing Portfolio App...');
        
        // Verificar disponibilidad de componentes
        this.checkDependencies();
        
        // Inicializar componentes según configuración
        this.initializeComponents();
        
        // Setup event listeners globales
        this.setupGlobalEvents();
        
        this.isInitialized = true;
        this.log('Portfolio App initialized successfully');
        
        // Emit event de inicialización completa
        document.dispatchEvent(new CustomEvent('portfolioAppReady', {
            detail: { 
                app: this,
                components: this.activeComponents
            }
        }));
    }
    
    checkDependencies() {
        const requiredClasses = [];
        
        if (this.config.enableScrollToTop && typeof ScrollToTop === 'undefined') {
            requiredClasses.push('ScrollToTop');
        }
        if (this.config.enableResponsiveMenu && typeof ResponsiveMenu === 'undefined') {
            requiredClasses.push('ResponsiveMenu');
        }
        if (this.config.enableSmoothScrolling && typeof SmoothScrolling === 'undefined') {
            requiredClasses.push('SmoothScrolling');
        }
        if (this.config.enableUIInteractions && typeof UIInteractions === 'undefined') {
            requiredClasses.push('UIInteractions');
        }
        
        if (requiredClasses.length > 0) {
            console.warn('PortfolioApp: Missing dependencies:', requiredClasses);
        }
    }
    
    initializeComponents() {
        // ScrollToTop Component - CORREGIDO: usa variable CSS
        if (this.config.enableScrollToTop && typeof ScrollToTop !== 'undefined') {
            try {
                this.components.scrollToTop = new ScrollToTop({
                    showThresholdProperty: '--space-300px',
                    visibleClass: 'visible'
                });
                this.activeComponents.push('scrollToTop');
                this.log('ScrollToTop component initialized');
            } catch (error) {
                console.error('Failed to initialize ScrollToTop:', error);
            }
        }
        
        // ResponsiveMenu Component
        if (this.config.enableResponsiveMenu && typeof ResponsiveMenu !== 'undefined') {
            try {
                this.components.responsiveMenu = new ResponsiveMenu({
                    toggleButtonId: 'menuToggle',
                    menuId: 'mainNav',
                    closeOnLinkClick: true
                });
                this.activeComponents.push('responsiveMenu');
                this.log('ResponsiveMenu component initialized');
            } catch (error) {
                console.error('Failed to initialize ResponsiveMenu:', error);
            }
        }
        
        // SmoothScrolling Component
        if (this.config.enableSmoothScrolling && typeof SmoothScrolling !== 'undefined') {
            try {
                this.components.smoothScrolling = new SmoothScrolling({
                    sections: ['sergio', 'sistema01234', 'cerebro', 'playground'],
                    activeClass: 'active'
                });
                this.activeComponents.push('smoothScrolling');
                this.log('SmoothScrolling component initialized');
            } catch (error) {
                console.error('Failed to initialize SmoothScrolling:', error);
            }
        }
        
        // UIInteractions Component
        if (this.config.enableUIInteractions && typeof UIInteractions !== 'undefined') {
            try {
                this.components.uiInteractions = new UIInteractions({
                    enableCustomCursor: this.config.enableCustomCursor,
                    optimizeOnInit: true
                });
                this.activeComponents.push('uiInteractions');
                this.log('UIInteractions component initialized');
            } catch (error) {
                console.error('Failed to initialize UIInteractions:', error);
            }
        }
        
        // VideoOptimizer (legacy compatibility)
        if (this.config.enableVideoOptimizer) {
            this.initializeVideoOptimizer();
        }
    }
    
    initializeVideoOptimizer() {
        const video = document.querySelector('.hero-video');
        if (!video) return;
        
        try {
            // Configuración básica de video
            video.muted = true;
            video.playsInline = true;
            
            // Intentar reproducir con delay
            setTimeout(() => {
                video.play().catch(() => {
                    this.showVideoFallback(video);
                });
            }, 100);
            
            // Pausar video cuando no es visible (performance)
            const handleVideoVisibility = () => {
                const rect = video.getBoundingClientRect();
                const isVisible = rect.bottom >= 0 && rect.top <= window.innerHeight;
                
                if (isVisible && video.paused) {
                    video.play().catch(() => {});
                } else if (!isVisible && !video.paused) {
                    video.pause();
                }
            };
            
            window.addEventListener('scroll', handleVideoVisibility, { passive: true });
            
            this.activeComponents.push('videoOptimizer');
            this.log('VideoOptimizer initialized');
            
        } catch (error) {
            console.error('Failed to initialize VideoOptimizer:', error);
        }
    }
    
    showVideoFallback(video) {
        const fallback = document.querySelector('.hero-video-fallback');
        if (fallback) {
            fallback.style.display = 'block';
            video.style.display = 'none';
        }
    }
    
    setupGlobalEvents() {
        // Coordinar componentes mediante eventos personalizados
        
        // Cuando se hace scroll to top, limpiar navegación
        document.addEventListener('scrollToTop', () => {
            if (this.components.smoothScrolling) {
                this.components.smoothScrolling.clearActiveStates();
            }
        });
        
        // Cuando se hace click en logo, limpiar navegación
        document.addEventListener('logoClick', () => {
            if (this.components.smoothScrolling) {
                this.components.smoothScrolling.clearActiveStates();
            }
        });
        
        // Cerrar menú móvil en scroll (opcional)
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            // Si scroll rápido hacia abajo, cerrar menú móvil
            if (scrollTop > lastScrollTop + 100 && this.components.responsiveMenu) {
                this.components.responsiveMenu.forceClose();
            }
            
            lastScrollTop = scrollTop;
        }, { passive: true });
    }
    
    // Métodos públicos para control de componentes
    
    getComponent(name) {
        return this.components[name] || null;
    }
    
    isComponentActive(name) {
        return this.activeComponents.includes(name);
    }
    
    enableComponent(name) {
        this.config[`enable${name.charAt(0).toUpperCase() + name.slice(1)}`] = true;
        
        // Re-inicializar si es necesario
        if (!this.isComponentActive(name)) {
            this.initializeComponents();
        }
    }
    
    disableComponent(name) {
        const component = this.components[name];
        if (component && typeof component.destroy === 'function') {
            component.destroy();
            this.components[name] = null;
            this.activeComponents = this.activeComponents.filter(c => c !== name);
        }
    }
    
    // Método para reinicializar toda la app
    reinitialize(newConfig = {}) {
        this.destroy();
        this.config = { ...this.config, ...newConfig };
        this.isInitialized = false;
        this.init();
    }
    
    // Método para debugging
    getStatus() {
        return {
            isInitialized: this.isInitialized,
            activeComponents: this.activeComponents,
            config: this.config,
            components: Object.keys(this.components).reduce((acc, key) => {
                acc[key] = this.components[key] !== null;
                return acc;
            }, {})
        };
    }
    
    // Logger condicional
    log(message, ...args) {
        if (this.config.debug) {
            console.log(`[PortfolioApp] ${message}`, ...args);
        }
    }
    
    // Destruir toda la aplicación
    destroy() {
        Object.keys(this.components).forEach(key => {
            const component = this.components[key];
            if (component && typeof component.destroy === 'function') {
                component.destroy();
            }
        });
        
        this.components = {};
        this.activeComponents = [];
        this.isInitialized = false;
        
        this.log('Portfolio App destroyed');
    }
}

// Auto-inicialización cuando el DOM esté listo
if (typeof document !== 'undefined') {
    const initApp = () => {
        // Verificar si ya existe una instancia global
        if (!window.portfolioApp) {
            window.portfolioApp = new PortfolioApp({
                debug: false // Cambiar a true para debugging
            });
        }
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
}

// Export para módulos ES6 o definición global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
} else {
    window.PortfolioApp = PortfolioApp;
}