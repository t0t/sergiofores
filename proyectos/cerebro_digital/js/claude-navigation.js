/**
 * NAVEGACIÓN ACTIVA INTELIGENTE - CUMPLIMIENTO CLAUDE.md
 * Sistema avanzado que cumple estrictamente con reglas definidas
 * 
 * CARACTERÍSTICAS CRÍTICAS:
 * ✅ Intersection Observer para detectar secciones visibles
 * ✅ Clear active states cuando scroll < 100px
 * ✅ Logo click behavior que limpia estados automáticamente  
 * ✅ Smooth scrolling con offset pixel-perfect para header
 */

class ClaudeNavigation {
    constructor(options = {}) {
        this.config = {
            headerSelector: '.pageheader, .header-master, .header',
            navLinksSelector: '.menu__link, .header__nav-link, .dropdown__link',
            logoSelector: '.pageheader__logo, .logo',
            activeClass: 'menu__link--active',
            scrollTopClass: 'scroll-top',
            logoResetClass: 'logo-reset',
            clearThreshold: 100,
            headerOffsetProperty: '--nav-height-offset',
            smoothScrollDuration: 800,
            scrollOffsetBuffer: 0, // Pixel perfect sin buffer
            ...options
        };
        
        this.header = document.querySelector(this.config.headerSelector);
        this.navLinks = document.querySelectorAll(this.config.navLinksSelector);
        this.logo = document.querySelector(this.config.logoSelector);
        this.sections = [];
        this.observer = null;
        this.lastActiveSection = null;
        
        this.init();
    }
    
    init() {
        if (!this.header || !this.navLinks.length) {
            console.warn('ClaudeNavigation: Required elements not found');
            return;
        }
        
        this.setupSections();
        this.setupIntersectionObserver();
        this.setupEventListeners();
        this.handleScrollPosition();
        
        console.log('ClaudeNavigation: Initialized with CLAUDE.md compliance');
        this.debugOffset();
    }
    
    setupSections() {
        // Extraer secciones basadas en href de navegación
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const sectionId = href.substring(1);
                const section = document.getElementById(sectionId);
                if (section) {
                    this.sections.push({
                        id: sectionId,
                        element: section,
                        navLink: link
                    });
                }
            }
        });
        
        console.log(`ClaudeNavigation: Found ${this.sections.length} sections`);
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px', // Activar cuando esté en el tercio superior
            threshold: [0, 0.25, 0.5, 0.75, 1]
        };
        
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            observerOptions
        );
        
        // Observar todas las secciones
        this.sections.forEach(section => {
            this.observer.observe(section.element);
        });
    }
    
    handleIntersection(entries) {
        const scrollY = window.pageYOffset;
        
        // Si estamos cerca del top, limpiar todos los estados
        if (scrollY < this.config.clearThreshold) {
            this.clearAllActiveStates();
            return;
        }
        
        // Encontrar la sección más visible
        let mostVisibleSection = null;
        let maxVisibility = 0;
        
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > maxVisibility) {
                maxVisibility = entry.intersectionRatio;
                mostVisibleSection = this.sections.find(
                    section => section.element === entry.target
                );
            }
        });
        
        // Activar la sección más visible
        if (mostVisibleSection && mostVisibleSection !== this.lastActiveSection) {
            this.setActiveSection(mostVisibleSection);
        }
    }
    
    setActiveSection(activeSection) {
        // Limpiar estados previos
        this.clearAllActiveStates();
        
        // Activar nueva sección
        if (activeSection && activeSection.navLink) {
            activeSection.navLink.classList.add(this.config.activeClass);
            this.lastActiveSection = activeSection;
            
            console.log(`ClaudeNavigation: Activated section "${activeSection.id}"`);
        }
    }
    
    clearAllActiveStates() {
        this.navLinks.forEach(link => {
            link.classList.remove(this.config.activeClass);
        });
        this.lastActiveSection = null;
    }
    
    closeAllSubmenus() {
        // Cerrar todos los submenus abiertos
        const dropdownItems = document.querySelectorAll('.menu__item--dropdown');
        dropdownItems.forEach(item => {
            item.classList.remove('menu__item--open');
        });
        
        // También cerrar menu móvil si está abierto
        const mobileMenu = document.querySelector('.menu--mobile-toggle');
        if (mobileMenu) {
            mobileMenu.classList.remove('menu--open');
        }
        
        console.log('ClaudeNavigation: All submenus closed');
    }
    
    setupEventListeners() {
        // Scroll detection para clear states
        let scrollTimer = null;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                this.handleScrollPosition();
            }, 10);
        }, { passive: true });
        
        // Logo click behavior - CUMPLIMIENTO CLAUDE.md
        if (this.logo) {
            this.logo.addEventListener('click', (e) => {
                const href = this.logo.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    // Si es un enlace a sección específica, hacer smooth scroll
                    if (href === '#hero') {
                        this.handleLogoClick();
                    } else {
                        this.smoothScrollToSection(href.substring(1));
                    }
                } else {
                    e.preventDefault();
                    this.handleLogoClick();
                }
            });
        }
        
        // Smooth scrolling para enlaces de navegación
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    this.smoothScrollToSection(href.substring(1));
                    
                    // Cerrar submenus si el enlace está dentro de uno
                    this.closeAllSubmenus();
                }
            });
        });
    }
    
    handleScrollPosition() {
        const scrollY = window.pageYOffset;
        
        // Toggle scroll-top class según threshold
        if (scrollY < this.config.clearThreshold) {
            document.body.classList.add(this.config.scrollTopClass);
            this.clearAllActiveStates();
        } else {
            document.body.classList.remove(this.config.scrollTopClass);
        }
    }
    
    handleLogoClick() {
        // Logo click behavior - limpiar navegación y ir al hero
        document.body.classList.add(this.config.logoResetClass);
        this.clearAllActiveStates();
        
        // Smooth scroll to hero section (top)
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            // Scroll to hero with minimal offset since it's at the top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Fallback to top if no hero section
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Limpiar clase después de la animación
        setTimeout(() => {
            document.body.classList.remove(this.config.logoResetClass);
        }, this.config.smoothScrollDuration);
        
        console.log('ClaudeNavigation: Logo click - scrolled to hero and cleared all states');
    }
    
    smoothScrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        // Obtener offset del header desde CSS
        const headerOffset = this.getHeaderOffset();
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
        const targetPosition = sectionTop - headerOffset;
        
        // Smooth scroll con offset perfecto
        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
        });
        
        console.log(`ClaudeNavigation: Scrolling to ${sectionId} with ${headerOffset}px offset`);
    }
    
    getHeaderOffset() {
        // Obtener altura exacta del pageheader desde CSS
        const rootStyles = getComputedStyle(document.documentElement);
        
        // Calcular height exacto: var(--space-xl) * 2 = 48px * 2 = 96px
        const spaceXl = parseFloat(rootStyles.getPropertyValue('--space-xl'));
        if (spaceXl && !isNaN(spaceXl)) {
            // Convertir rem a px (1rem = 16px por defecto)
            const spaceXlPx = spaceXl * 16; // 3rem * 16 = 48px
            const exactHeaderHeight = spaceXlPx * 2; // 48px * 2 = 96px
            return exactHeaderHeight; // Sin buffer - pixel perfect
        }
        
        // Fallback: usar CSS variable nav-height-offset si existe
        const cssOffset = rootStyles.getPropertyValue(this.config.headerOffsetProperty).replace('px', '').trim();
        if (cssOffset && !isNaN(parseFloat(cssOffset))) {
            return parseFloat(cssOffset);
        }
        
        // Fallback: medir la altura real del header
        if (this.header) {
            const headerHeight = this.header.getBoundingClientRect().height;
            return Math.ceil(headerHeight); // Sin buffer para pixel perfect
        }
        
        // Fallback final: altura teórica exacta
        return 96; // calc(var(--space-xl) * 2) = 96px
    }
    
    // Método público para control externo
    activateSection(sectionId) {
        const targetSection = this.sections.find(section => section.id === sectionId);
        if (targetSection) {
            this.setActiveSection(targetSection);
        }
    }
    
    // Debug function para verificar offset
    debugOffset() {
        const offset = this.getHeaderOffset();
        const headerHeight = this.header ? this.header.getBoundingClientRect().height : 'N/A';
        const spaceXl = getComputedStyle(document.documentElement).getPropertyValue('--space-xl');
        
        console.log(`ClaudeNavigation Debug (Pixel Perfect):
        - Header element: ${this.header ? 'Found' : 'Not found'}
        - Header actual height: ${headerHeight}px
        - CSS --space-xl: ${spaceXl}
        - Calculated offset: ${offset}px (should be 96px)
        - Buffer applied: ${this.config.scrollOffsetBuffer}px (0 for pixel perfect)`);
    }
    
    // Destructor para cleanup
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        
        // Remover event listeners
        this.navLinks.forEach(link => {
            link.replaceWith(link.cloneNode(true));
        });
        
        if (this.logo) {
            this.logo.replaceWith(this.logo.cloneNode(true));
        }
        
        console.log('ClaudeNavigation: Destroyed');
    }
}

// Auto-inicialización
document.addEventListener('DOMContentLoaded', () => {
    if (!window.claudeNavigation) {
        window.claudeNavigation = new ClaudeNavigation();
    }
});

// Export para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ClaudeNavigation;
}