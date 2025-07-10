/**
 * Sistema de Menú Móvil Responsive
 * Funcionalidad profesional para navegación en dispositivos móviles
 */

class MobileMenu {
    constructor() {
        this.isOpen = false;
        this.menuToggle = null;
        this.navFilters = null;
        this.overlay = null;
        
        this.init();
    }

    init() {
        this.createElements();
        this.setupEventListeners();
        this.setupMediaQuery();
    }

    createElements() {
        // Obtener elementos existentes
        this.menuToggle = document.querySelector('.mobile-menu-toggle');
        this.navFilters = document.querySelector('.nav-filters');
        
        // Crear overlay si no existe
        if (!document.querySelector('.mobile-menu-overlay')) {
            this.overlay = document.createElement('div');
            this.overlay.className = 'mobile-menu-overlay';
            document.body.appendChild(this.overlay);
        } else {
            this.overlay = document.querySelector('.mobile-menu-overlay');
        }
    }

    setupEventListeners() {
        // Toggle del menú
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMenu();
            });
        }

        // Click en overlay para cerrar
        if (this.overlay) {
            this.overlay.addEventListener('click', () => {
                this.closeMenu();
            });
        }

        // Click en filtros para cerrar menú
        if (this.navFilters) {
            this.navFilters.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-filter')) {
                    // Pequeño delay para que se vea la selección
                    setTimeout(() => {
                        this.closeMenu();
                    }, 200);
                }
            });
        }

        // Escape key para cerrar
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });

        // Resize handler
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024 && this.isOpen) {
                this.closeMenu();
            }
        });

        // Scroll para cerrar en móvil
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (this.isOpen && window.innerWidth <= 1024) {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    this.closeMenu();
                }, 150);
            }
        });
    }

    setupMediaQuery() {
        // Media query listener para cambios de viewport
        const mediaQuery = window.matchMedia('(max-width: 1024px)');
        
        const handleMediaChange = (e) => {
            if (!e.matches && this.isOpen) {
                // Si salimos del modo móvil, cerrar menú
                this.closeMenu();
            }
        };

        mediaQuery.addListener(handleMediaChange);
        handleMediaChange(mediaQuery); // Ejecutar una vez al inicio
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        if (this.isOpen) return;

        this.isOpen = true;
        
        // Actualizar clases
        this.menuToggle?.classList.add('active');
        this.navFilters?.classList.add('active');
        this.overlay?.classList.add('active');
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
        
        // Actualizar aria
        this.menuToggle?.setAttribute('aria-expanded', 'true');
        this.menuToggle?.setAttribute('aria-label', 'Cerrar menú de navegación');
        
        // Focus management
        this.trapFocus();
    }

    closeMenu() {
        if (!this.isOpen) return;

        this.isOpen = false;
        
        // Actualizar clases
        this.menuToggle?.classList.remove('active');
        this.navFilters?.classList.remove('active');
        this.overlay?.classList.remove('active');
        
        // Restaurar scroll del body
        document.body.style.overflow = '';
        
        // Actualizar aria
        this.menuToggle?.setAttribute('aria-expanded', 'false');
        this.menuToggle?.setAttribute('aria-label', 'Abrir menú de navegación');
        
        // Devolver focus al toggle
        this.menuToggle?.focus();
    }

    trapFocus() {
        if (!this.navFilters) return;

        const focusableElements = this.navFilters.querySelectorAll(
            'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Focus en el primer elemento
        setTimeout(() => {
            firstElement.focus();
        }, 100);

        // Trap focus
        const trapFocusHandler = (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };

        document.addEventListener('keydown', trapFocusHandler);

        // Cleanup cuando se cierre el menú
        const cleanup = () => {
            document.removeEventListener('keydown', trapFocusHandler);
        };

        // Store cleanup function para uso posterior
        this.cleanup = cleanup;
    }

    // Métodos públicos para control externo
    isMenuOpen() {
        return this.isOpen;
    }

    forceClose() {
        this.closeMenu();
    }

    forceOpen() {
        this.openMenu();
    }

    destroy() {
        // Cleanup de event listeners y elementos
        if (this.cleanup) {
            this.cleanup();
        }
        
        if (this.overlay && this.overlay.parentNode) {
            this.overlay.parentNode.removeChild(this.overlay);
        }
        
        document.body.style.overflow = '';
    }
}

// ===== INICIALIZACIÓN AUTOMÁTICA =====

let mobileMenu = null;

document.addEventListener('DOMContentLoaded', () => {
    mobileMenu = new MobileMenu();
    
    // Exponer globalmente para debug
    window.mobileMenu = mobileMenu;
});

// Export para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileMenu;
}