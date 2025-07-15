/**
 * MAIN.JS - SINGLE ENTRY POINT
 * Sistema de Diseño Sergio Forés - Boilerplate
 * 
 * ⚠️ REGLA ARQUITECTÓNICA CRÍTICA: SINGLE ENTRY POINT
 * Este es el ÚNICO archivo JavaScript que debe importarse en index.html
 * Consolida todo el sistema de scripts en un solo punto de entrada
 * 
 * ORDEN DE CARGA OPTIMIZADO:
 * 1. Core Navigation - Funcionalidad básica de navegación
 * 2. Header Scroll - Comportamiento dinámico del header
 * 3. Smooth Scroll - Navegación suave entre secciones
 * 4. Dropdown Component - Funcionalidad de menús desplegables
 * 5. Theme Switcher - Sistema de cambio de tema
 * 6. WhatsApp Contact - Integración de contacto
 * 7. Project Main - Scripts específicos del proyecto
 */

// ==========================================================================
// CONFIGURACIÓN GLOBAL Y UTILIDADES
// ==========================================================================

// Configuración global del sistema
window.BOILERPLATE_CONFIG = {
    version: '1.0.0',
    debug: false,
    performance: true
};

// Utilidad para logging con control de debug
function debugLog(message, data = null) {
    if (window.BOILERPLATE_CONFIG.debug) {
        console.log(`[BOILERPLATE] ${message}`, data || '');
    }
}

// Utilidad para timing de performance
function performanceStart(label) {
    if (window.BOILERPLATE_CONFIG.performance) {
        performance.mark(`${label}-start`);
    }
}

function performanceEnd(label) {
    if (window.BOILERPLATE_CONFIG.performance) {
        performance.mark(`${label}-end`);
        performance.measure(label, `${label}-start`, `${label}-end`);
    }
}

// ==========================================================================
// MÓDULO 1: CORE NAVIGATION
// ==========================================================================

/**
 * Sistema de navegación básico
 * Manejo de menú móvil y navegación principal
 */
const CoreNavigation = {
    init() {
        performanceStart('core-navigation');
        debugLog('Inicializando Core Navigation');
        
        this.setupMobileMenu();
        this.setupSmoothScrollLinks();
        
        performanceEnd('core-navigation');
    },

    setupMobileMenu() {
        const menuToggle = document.querySelector('.menu__toggle');
        const menu = document.querySelector('.menu--mobile-toggle');
        
        if (menuToggle && menu) {
            menuToggle.addEventListener('click', () => {
                menu.classList.toggle('menu--open');
                menuToggle.setAttribute('aria-expanded', 
                    menu.classList.contains('menu--open'));
            });
        }
    },

    setupSmoothScrollLinks() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
};

// ==========================================================================
// MÓDULO 2: HEADER SCROLL
// ==========================================================================

/**
 * Comportamiento dinámico del header
 * Cambios de estilo según scroll
 */
const HeaderScroll = {
    init() {
        performanceStart('header-scroll');
        debugLog('Inicializando Header Scroll');
        
        this.header = document.querySelector('.pageheader--dynamic');
        if (!this.header) return;
        
        this.setupScrollListener();
        
        performanceEnd('header-scroll');
    },

    setupScrollListener() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateHeaderState();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    },

    updateHeaderState() {
        const scrolled = window.scrollY > 50;
        this.header.classList.toggle('pageheader--scrolled', scrolled);
    }
};

// ==========================================================================
// MÓDULO 3: DROPDOWN COMPONENT
// ==========================================================================

/**
 * Funcionalidad de menús desplegables
 * Manejo de hover y teclado
 */
const DropdownComponent = {
    init() {
        performanceStart('dropdown-component');
        debugLog('Inicializando Dropdown Component');
        
        this.setupDropdowns();
        
        performanceEnd('dropdown-component');
    },

    setupDropdowns() {
        const dropdowns = document.querySelectorAll('.menu__item--dropdown');
        
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.menu__link');
            const submenu = dropdown.querySelector('.menu__submenu');
            
            if (link && submenu) {
                // Keyboard navigation
                link.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        dropdown.classList.toggle('menu__item--open');
                    }
                });
                
                // Close on outside click
                document.addEventListener('click', (e) => {
                    if (!dropdown.contains(e.target)) {
                        dropdown.classList.remove('menu__item--open');
                    }
                });
            }
        });
    }
};

// ==========================================================================
// MÓDULO 4: THEME SWITCHER
// ==========================================================================

/**
 * Sistema de cambio de tema
 * Light/Dark mode toggle
 */
const ThemeSwitcher = {
    init() {
        performanceStart('theme-switcher');
        debugLog('Inicializando Theme Switcher');
        
        this.button = document.querySelector('.theme-switcher__btn');
        if (!this.button) return;
        
        this.setupThemeToggle();
        this.loadSavedTheme();
        
        performanceEnd('theme-switcher');
    },

    setupThemeToggle() {
        this.button.addEventListener('click', () => {
            this.toggleTheme();
        });
    },

    toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        debugLog(`Theme switched to: ${newTheme}`);
    },

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
};

// ==========================================================================
// MÓDULO 5: WHATSAPP CONTACT
// ==========================================================================

/**
 * Integración de contacto WhatsApp
 * Botones y enlaces de contacto
 */
const WhatsAppContact = {
    init() {
        performanceStart('whatsapp-contact');
        debugLog('Inicializando WhatsApp Contact');
        
        this.setupWhatsAppLinks();
        
        performanceEnd('whatsapp-contact');
    },

    setupWhatsAppLinks() {
        const whatsappLinks = document.querySelectorAll('[data-whatsapp]');
        
        whatsappLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const message = link.getAttribute('data-whatsapp') || 'Hola';
                this.openWhatsApp(message);
            });
        });
    },

    openWhatsApp(message) {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    }
};

// ==========================================================================
// MÓDULO 6: BACK TO TOP
// ==========================================================================

/**
 * Botón "Volver arriba"
 * Aparece/desaparece según scroll
 */
const BackToTop = {
    init() {
        performanceStart('back-to-top');
        debugLog('Inicializando Back to Top');
        
        this.button = document.querySelector('.back-to-top');
        if (!this.button) return;
        
        this.setupScrollToggle();
        this.setupClickHandler();
        
        performanceEnd('back-to-top');
    },

    setupScrollToggle() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const visible = window.scrollY > 300;
                    this.button.classList.toggle('back-to-top--visible', visible);
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    },

    setupClickHandler() {
        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
};

// ==========================================================================
// MÓDULO 7: PROJECT MAIN
// ==========================================================================

/**
 * Scripts específicos del proyecto
 * Personalizaciones y funcionalidades únicas
 */
const ProjectMain = {
    init() {
        performanceStart('project-main');
        debugLog('Inicializando Project Main');
        
        // Agregar funcionalidades específicas del proyecto aquí
        this.setupCustomFeatures();
        
        performanceEnd('project-main');
    },

    setupCustomFeatures() {
        // Placeholder para funcionalidades específicas del proyecto
        debugLog('Project-specific features initialized');
    }
};

// ==========================================================================
// INICIALIZACIÓN DEL SISTEMA
// ==========================================================================

/**
 * Inicialización principal del sistema
 * Se ejecuta cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', () => {
    performanceStart('system-init');
    debugLog('Iniciando sistema de scripts');
    
    // Inicializar todos los módulos en orden
    CoreNavigation.init();
    HeaderScroll.init();
    DropdownComponent.init();
    ThemeSwitcher.init();
    WhatsAppContact.init();
    BackToTop.init();
    ProjectMain.init();
    
    performanceEnd('system-init');
    debugLog('Sistema de scripts inicializado correctamente');
    
    // Mostrar métricas de performance si está habilitado
    if (window.BOILERPLATE_CONFIG.performance) {
        setTimeout(() => {
            const measures = performance.getEntriesByType('measure');
            console.table(measures.map(m => ({
                name: m.name,
                duration: `${m.duration.toFixed(2)}ms`
            })));
        }, 100);
    }
});

/**
 * ==========================================================================
 * NOTAS DE IMPLEMENTACIÓN SINGLE ENTRY POINT
 * ==========================================================================
 * 
 * VENTAJAS DEL SINGLE ENTRY POINT:
 * ✅ Un solo HTTP request para JavaScript
 * ✅ Control total del orden de inicialización
 * ✅ Eliminación de dependencias duplicadas
 * ✅ Mejor rendimiento y caching
 * ✅ Sistema de debugging centralizado
 * ✅ Métricas de performance integradas
 * 
 * ARQUITECTURA MODULAR:
 * - Cada módulo es independiente pero coordinado
 * - Inicialización secuencial controlada
 * - Sistema de logging y debugging unificado
 * - Performance monitoring integrado
 * 
 * EXTENSIBILIDAD:
 * - Nuevos módulos se añaden al final del archivo
 * - Se incluyen en la secuencia de inicialización
 * - Mantienen la estructura modular establecida
 */