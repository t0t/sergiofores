/**
 * PAGEHEADER SCROLL ANIMATION - SISTEMA DE DISEÑO SERGIO FORÉS
 * 
 * Gestiona la animación del fondo del pageheader basada en el scroll.
 * Compatible con el sistema modular BEM del design system.
 * 
 * Funcionalidades:
 * - Fondo transparente cuando scroll = 0
 * - Animación hacia fondo sólido cuando scroll > altura del header
 * - Transiciones fluidas usando variables CSS del sistema
 * - Reseteo automático al recargar la página
 */

(function() {
    'use strict';
    
    // Configuración del sistema
    const CONFIG = {
        headerSelector: '.pageheader--dynamic',
        scrolledClass: 'pageheader--scrolled',
        threshold: 100, // Altura mínima para activar la animación
        throttleDelay: 16 // ~60fps para animaciones fluidas
    };
    
    // Estado del sistema
    let isScrolled = false;
    let ticking = false;
    
    /**
     * Obtiene la altura del header dinámicamente
     * @param {HTMLElement} header - Elemento header
     * @returns {number} Altura del header en píxeles
     */
    function getHeaderHeight(header) {
        return header ? header.offsetHeight : CONFIG.threshold;
    }
    
    /**
     * Actualiza el estado del header basado en la posición del scroll
     * @param {HTMLElement} header - Elemento header
     * @param {number} scrollTop - Posición actual del scroll
     */
    function updateHeaderState(header, scrollTop) {
        const headerHeight = getHeaderHeight(header);
        const shouldBeScrolled = scrollTop > headerHeight;
        
        if (shouldBeScrolled !== isScrolled) {
            isScrolled = shouldBeScrolled;
            
            if (isScrolled) {
                header.classList.add(CONFIG.scrolledClass);
            } else {
                header.classList.remove(CONFIG.scrolledClass);
            }
            
            // Dispatch custom event para otros componentes
            const event = new CustomEvent('pageheaderStateChange', {
                detail: { isScrolled, scrollTop, headerHeight }
            });
            header.dispatchEvent(event);
        }
    }
    
    /**
     * Maneja el evento de scroll con throttling
     */
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const header = document.querySelector(CONFIG.headerSelector);
                if (header) {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    updateHeaderState(header, scrollTop);
                }
                ticking = false;
            });
            ticking = true;
        }
    }
    
    /**
     * Resetea el estado del header al estado inicial
     */
    function resetHeaderState() {
        const header = document.querySelector(CONFIG.headerSelector);
        if (header) {
            header.classList.remove(CONFIG.scrolledClass);
            isScrolled = false;
            
            // Forzar el estado inicial en el próximo frame
            requestAnimationFrame(() => {
                updateHeaderState(header, 0);
            });
        }
    }
    
    /**
     * Inicializa el sistema de scroll del pageheader
     */
    function init() {
        // Resetear estado al cargar/recargar la página
        resetHeaderState();
        
        // Verificar que existe un header dinámico
        const header = document.querySelector(CONFIG.headerSelector);
        if (!header) {
            console.warn('PageHeader Scroll: No se encontró elemento con selector', CONFIG.headerSelector);
            return;
        }
        
        // Event listeners
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });
        
        // Estado inicial
        handleScroll();
        
        console.log('PageHeader Scroll initialized for:', header);
    }
    
    /**
     * Destruye los event listeners (útil para SPAs)
     */
    function destroy() {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
        resetHeaderState();
    }
    
    // Auto-inicialización cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Exponer API pública para control manual si es necesario
    window.PageHeaderScroll = {
        init,
        destroy,
        reset: resetHeaderState,
        config: CONFIG
    };
    
})();