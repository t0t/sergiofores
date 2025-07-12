/**
 * RESPONSIVE MENU COMPONENT
 * Componente modular para navegación responsive
 * Maneja estado abierto/cerrado y interacciones móvil
 */

class ResponsiveMenu {
    constructor(options = {}) {
        // Configuración con valores por defecto
        this.config = {
            toggleButtonId: 'menuToggle',
            menuId: 'mainNav',
            openClass: 'open',
            bodyLockClass: 'menu-open',
            closeOnLinkClick: true,
            closeOnOutsideClick: true,
            breakpoint: 768, // px
            ...options
        };
        
        this.toggleButton = null;
        this.menu = null;
        this.isOpen = false;
        this.isMobile = false;
        
        this.init();
    }
    
    init() {
        this.findElements();
        if (this.toggleButton && this.menu) {
            this.setupEventListeners();
            this.checkBreakpoint();
        }
    }
    
    findElements() {
        this.toggleButton = document.getElementById(this.config.toggleButtonId);
        this.menu = document.getElementById(this.config.menuId);
        
        if (!this.toggleButton) {
            console.warn(`ResponsiveMenu: Toggle button with id "${this.config.toggleButtonId}" not found`);
        }
        if (!this.menu) {
            console.warn(`ResponsiveMenu: Menu with id "${this.config.menuId}" not found`);
        }
    }
    
    setupEventListeners() {
        // Toggle button click
        this.toggleButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggle();
        });
        
        // Close menu when clicking on links (mobile)
        if (this.config.closeOnLinkClick) {
            this.menu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (this.isMobile && this.isOpen) {
                        this.close();
                    }
                });
            });
        }
        
        // Close menu when clicking outside (mobile)
        if (this.config.closeOnOutsideClick) {
            document.addEventListener('click', (e) => {
                if (this.isOpen && !this.menu.contains(e.target) && !this.toggleButton.contains(e.target)) {
                    this.close();
                }
            });
        }
        
        // Close menu on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
        
        // Handle resize
        window.addEventListener('resize', () => {
            this.checkBreakpoint();
        });
    }
    
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    open() {
        this.menu.classList.add(this.config.openClass);
        this.toggleButton.classList.add(this.config.openClass);
        
        // Update ARIA attributes
        this.toggleButton.setAttribute('aria-expanded', 'true');
        this.menu.setAttribute('aria-hidden', 'false');
        
        // Lock body scroll on mobile
        if (this.isMobile) {
            document.body.classList.add(this.config.bodyLockClass);
        }
        
        this.isOpen = true;
        
        // Emit custom event
        document.dispatchEvent(new CustomEvent('menuOpen', {
            detail: { component: 'ResponsiveMenu' }
        }));
    }
    
    close() {
        this.menu.classList.remove(this.config.openClass);
        this.toggleButton.classList.remove(this.config.openClass);
        
        // Update ARIA attributes
        this.toggleButton.setAttribute('aria-expanded', 'false');
        this.menu.setAttribute('aria-hidden', 'true');
        
        // Unlock body scroll
        document.body.classList.remove(this.config.bodyLockClass);
        
        this.isOpen = false;
        
        // Emit custom event
        document.dispatchEvent(new CustomEvent('menuClose', {
            detail: { component: 'ResponsiveMenu' }
        }));
    }
    
    checkBreakpoint() {
        const wasIsMobile = this.isMobile;
        this.isMobile = window.innerWidth < this.config.breakpoint;
        
        // Si cambiamos de móvil a desktop, cerrar menú
        if (wasIsMobile && !this.isMobile && this.isOpen) {
            this.close();
        }
        
        // Actualizar ARIA attributes según el contexto
        if (this.isMobile) {
            this.toggleButton.setAttribute('aria-expanded', this.isOpen ? 'true' : 'false');
            this.menu.setAttribute('aria-hidden', this.isOpen ? 'false' : 'true');
        } else {
            this.toggleButton.removeAttribute('aria-expanded');
            this.menu.removeAttribute('aria-hidden');
        }
    }
    
    // Método para forzar cierre del menú
    forceClose() {
        if (this.isOpen) {
            this.close();
        }
    }
    
    // Método para cambiar configuración dinámicamente
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
    }
    
    // Método para destruir el componente
    destroy() {
        if (this.toggleButton) {
            this.toggleButton.removeEventListener('click', this.toggle);
        }
        
        document.removeEventListener('click', this.close);
        document.removeEventListener('keydown', this.close);
        window.removeEventListener('resize', this.checkBreakpoint);
        
        // Cleanup classes
        document.body.classList.remove(this.config.bodyLockClass);
        if (this.menu) {
            this.menu.classList.remove(this.config.openClass);
        }
        if (this.toggleButton) {
            this.toggleButton.classList.remove(this.config.openClass);
        }
    }
}

// Export para módulos ES6 o definición global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResponsiveMenu;
} else {
    window.ResponsiveMenu = ResponsiveMenu;
}