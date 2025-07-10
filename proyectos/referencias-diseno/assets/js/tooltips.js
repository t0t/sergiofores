/**
 * Sistema de Tooltips Inteligentes
 * Tooltips adaptativos con posicionamiento automático
 */

class TooltipSystem {
    constructor() {
        this.tooltips = new Map();
        this.activeTooltip = null;
        this.hideDelay = 100;
        this.showDelay = 300;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.scanAndInitialize();
        
        console.log('💬 Sistema de tooltips inicializado');
    }

    setupEventListeners() {
        // Event delegation para tooltips dinámicos
        document.addEventListener('mouseenter', (e) => {
            const tooltip = this.findTooltipElement(e.target);
            if (tooltip) {
                this.showTooltip(tooltip, e);
            }
        }, true);

        document.addEventListener('mouseleave', (e) => {
            const tooltip = this.findTooltipElement(e.target);
            if (tooltip) {
                this.hideTooltip(tooltip);
            }
        }, true);

        // Ocultar tooltip al hacer scroll
        document.addEventListener('scroll', () => {
            if (this.activeTooltip) {
                this.hideTooltip(this.activeTooltip.element);
            }
        }, { passive: true });

        // Responsive: ocultar tooltips en móvil
        window.addEventListener('resize', () => {
            if (window.innerWidth < 768 && this.activeTooltip) {
                this.hideTooltip(this.activeTooltip.element);
            }
        });
    }

    // Polyfill para closest() que funciona en todos los navegadores
    findTooltipElement(element) {
        while (element && element !== document) {
            if (element.hasAttribute && element.hasAttribute('data-tooltip')) {
                return element;
            }
            element = element.parentElement;
        }
        return null;
    }

    scanAndInitialize() {
        // Buscar elementos con data-tooltip y configurarlos
        const elements = document.querySelectorAll('[data-tooltip]');
        elements.forEach(element => {
            this.initializeTooltip(element);
        });
    }

    initializeTooltip(element) {
        if (this.tooltips.has(element)) return;

        const config = this.parseTooltipConfig(element);
        
        // Crear contenedor del tooltip
        const tooltipContent = document.createElement('div');
        tooltipContent.className = 'tooltip-content';
        tooltipContent.innerHTML = this.createTooltipHTML(config);
        
        // Añadir al DOM
        element.appendChild(tooltipContent);
        element.classList.add('tooltip');
        
        // Aplicar clases de configuración
        if (config.position) {
            element.classList.add(`tooltip-${config.position}`);
        }
        
        if (config.variant) {
            element.classList.add(`tooltip-${config.variant}`);
        }

        if (config.extended) {
            element.classList.add('tooltip-extended');
        }

        // Guardar referencia
        this.tooltips.set(element, {
            content: tooltipContent,
            config: config,
            showTimeout: null,
            hideTimeout: null
        });
    }

    parseTooltipConfig(element) {
        const text = element.getAttribute('data-tooltip');
        const position = element.getAttribute('data-tooltip-position') || 'top';
        const variant = element.getAttribute('data-tooltip-variant') || 'default';
        const title = element.getAttribute('data-tooltip-title');
        const description = element.getAttribute('data-tooltip-description');
        const delay = parseInt(element.getAttribute('data-tooltip-delay')) || this.showDelay;
        const hideDelay = parseInt(element.getAttribute('data-tooltip-hide-delay')) || this.hideDelay;

        return {
            text,
            title,
            description,
            position,
            variant,
            delay,
            hideDelay,
            extended: !!(title || description)
        };
    }

    createTooltipHTML(config) {
        if (config.extended) {
            return `
                ${config.title ? `<div class="tooltip-title">${config.title}</div>` : ''}
                ${config.description ? `<div class="tooltip-description">${config.description}</div>` : ''}
                ${config.text && !config.description ? config.text : ''}
            `;
        } else {
            return config.text || '';
        }
    }

    showTooltip(element, event) {
        // Saltarse en móviles
        if (window.innerWidth < 768) return;

        const tooltipData = this.tooltips.get(element);
        if (!tooltipData) return;

        // Cancelar hide pendiente
        if (tooltipData.hideTimeout) {
            clearTimeout(tooltipData.hideTimeout);
            tooltipData.hideTimeout = null;
        }

        // Programar show con delay
        tooltipData.showTimeout = setTimeout(() => {
            this.displayTooltip(element, tooltipData);
        }, tooltipData.config.delay);
    }

    displayTooltip(element, tooltipData) {
        // Ocultar tooltip activo anterior
        if (this.activeTooltip && this.activeTooltip.element !== element) {
            this.hideTooltip(this.activeTooltip.element, true);
        }

        const { content, config } = tooltipData;
        
        // Posicionamiento inteligente
        this.positionTooltip(element, content, config);
        
        // Mostrar
        content.style.opacity = '1';
        content.style.visibility = 'visible';
        
        // Marcar como activo
        this.activeTooltip = { element, tooltipData };

        // Añadir animación de entrada
        content.style.transform = this.getShowTransform(config.position);
    }

    positionTooltip(element, content, config) {
        const rect = element.getBoundingClientRect();
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        // Resetear posicionamiento
        content.style.transform = '';
        content.style.top = '';
        content.style.bottom = '';
        content.style.left = '';
        content.style.right = '';

        // Medir tooltip
        content.style.opacity = '0';
        content.style.visibility = 'visible';
        const tooltipRect = content.getBoundingClientRect();
        content.style.opacity = '';
        content.style.visibility = '';

        // Determinar mejor posición
        const bestPosition = this.calculateBestPosition(rect, tooltipRect, viewport, config.position);
        
        // Aplicar posición
        this.applyTooltipPosition(element, content, bestPosition);
    }

    calculateBestPosition(elementRect, tooltipRect, viewport, preferredPosition) {
        const margin = 10;
        const positions = ['top', 'bottom', 'left', 'right'];
        
        // Calcular espacios disponibles
        const spaces = {
            top: elementRect.top - margin,
            bottom: viewport.height - elementRect.bottom - margin,
            left: elementRect.left - margin,
            right: viewport.width - elementRect.right - margin
        };

        // Verificar si la posición preferida cabe
        const fits = {
            top: spaces.top >= tooltipRect.height,
            bottom: spaces.bottom >= tooltipRect.height,
            left: spaces.left >= tooltipRect.width,
            right: spaces.right >= tooltipRect.width
        };

        // Si la posición preferida cabe, usarla
        if (fits[preferredPosition]) {
            return preferredPosition;
        }

        // Buscar la mejor alternativa
        return positions.find(pos => fits[pos]) || preferredPosition;
    }

    applyTooltipPosition(element, content, position) {
        // Limpiar clases de posición anteriores
        element.classList.remove('tooltip-top', 'tooltip-bottom', 'tooltip-left', 'tooltip-right');
        
        // Aplicar nueva posición
        element.classList.add(`tooltip-${position}`);
    }

    // Método auxiliar para obtener el contenedor del tooltip
    getTooltipContainer(element) {
        return element.querySelector('.tooltip-content');
    }

    getShowTransform(position) {
        const transforms = {
            top: 'translateX(-50%) translateY(-4px)',
            bottom: 'translateX(-50%) translateY(4px)',
            left: 'translateY(-50%) translateX(-4px)',
            right: 'translateY(-50%) translateX(4px)'
        };
        return transforms[position] || transforms.top;
    }

    hideTooltip(element, immediate = false) {
        const tooltipData = this.tooltips.get(element);
        if (!tooltipData) return;

        // Cancelar show pendiente
        if (tooltipData.showTimeout) {
            clearTimeout(tooltipData.showTimeout);
            tooltipData.showTimeout = null;
        }

        const delay = immediate ? 0 : tooltipData.config.hideDelay;

        // Programar hide
        tooltipData.hideTimeout = setTimeout(() => {
            const { content } = tooltipData;
            
            content.style.opacity = '0';
            content.style.visibility = 'hidden';
            content.style.transform = '';

            // Limpiar referencia activa
            if (this.activeTooltip && this.activeTooltip.element === element) {
                this.activeTooltip = null;
            }
        }, delay);
    }

    // API pública para crear tooltips dinámicamente
    addTooltip(element, options) {
        if (typeof options === 'string') {
            element.setAttribute('data-tooltip', options);
        } else {
            element.setAttribute('data-tooltip', options.text || '');
            if (options.position) element.setAttribute('data-tooltip-position', options.position);
            if (options.variant) element.setAttribute('data-tooltip-variant', options.variant);
            if (options.title) element.setAttribute('data-tooltip-title', options.title);
            if (options.description) element.setAttribute('data-tooltip-description', options.description);
            if (options.delay) element.setAttribute('data-tooltip-delay', options.delay.toString());
        }

        this.initializeTooltip(element);
        return this;
    }

    removeTooltip(element) {
        if (this.tooltips.has(element)) {
            const tooltipData = this.tooltips.get(element);
            
            // Limpiar timeouts
            if (tooltipData.showTimeout) clearTimeout(tooltipData.showTimeout);
            if (tooltipData.hideTimeout) clearTimeout(tooltipData.hideTimeout);
            
            // Remover del DOM
            if (tooltipData.content.parentNode) {
                tooltipData.content.parentNode.removeChild(tooltipData.content);
            }
            
            // Limpiar clases
            element.classList.remove('tooltip', 'tooltip-top', 'tooltip-bottom', 'tooltip-left', 'tooltip-right', 'tooltip-extended');
            
            // Remover atributos
            element.removeAttribute('data-tooltip');
            element.removeAttribute('data-tooltip-position');
            element.removeAttribute('data-tooltip-variant');
            element.removeAttribute('data-tooltip-title');
            element.removeAttribute('data-tooltip-description');
            
            // Limpiar referencia
            this.tooltips.delete(element);
        }
        return this;
    }

    // Actualizar tooltip existente
    updateTooltip(element, options) {
        this.removeTooltip(element);
        this.addTooltip(element, options);
        return this;
    }

    // Destructor para cleanup
    destroy() {
        this.tooltips.forEach((data, element) => {
            this.removeTooltip(element);
        });
        this.tooltips.clear();
        this.activeTooltip = null;
    }
}

// ===== INICIALIZACIÓN AUTOMÁTICA =====

let tooltipSystem = null;

document.addEventListener('DOMContentLoaded', () => {
    tooltipSystem = new TooltipSystem();
    
    // Exponer globalmente para uso fácil
    window.tooltips = tooltipSystem;
});

// Export para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TooltipSystem;
}