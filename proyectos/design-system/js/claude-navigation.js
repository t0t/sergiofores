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
            headerSelector: 'header',
            navLinksSelector: '.header__nav-link',
            logoSelector: '.logo',
            activeClass: 'active',
            scrollTopClass: 'scroll-top',
            logoResetClass: 'logo-reset',
            clearThreshold: 100,
            headerOffsetProperty: '--nav-height-offset',
            smoothScrollDuration: 800,
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
                e.preventDefault();
                this.handleLogoClick();
            });
        }
        
        // Smooth scrolling para enlaces de navegación
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    this.smoothScrollToSection(href.substring(1));
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
        // Logo click behavior - limpiar navegación y ir al top
        document.body.classList.add(this.config.logoResetClass);
        this.clearAllActiveStates();
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Limpiar clase después de la animación
        setTimeout(() => {
            document.body.classList.remove(this.config.logoResetClass);
        }, this.config.smoothScrollDuration);
        
        console.log('ClaudeNavigation: Logo click - cleared all states');
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
        // Leer offset desde CSS variables - CUMPLIMIENTO CLAUDE.md
        const rootStyles = getComputedStyle(document.documentElement);
        const cssOffset = parseInt(rootStyles.getPropertyValue(this.config.headerOffsetProperty));
        
        // Fallback a medición DOM si no existe la variable
        if (cssOffset && !isNaN(cssOffset)) {
            return cssOffset;
        }
        
        return this.header ? this.header.getBoundingClientRect().height : 80;
    }
    
    // Método público para control externo
    activateSection(sectionId) {
        const targetSection = this.sections.find(section => section.id === sectionId);
        if (targetSection) {
            this.setActiveSection(targetSection);
        }
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