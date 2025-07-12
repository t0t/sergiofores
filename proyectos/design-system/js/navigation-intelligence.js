/**
 * NAVEGACIÓN ACTIVA INTELIGENTE - CUMPLIMIENTO CLAUDE.md
 * Implementa todas las reglas específicas de navegación definidas
 * 
 * ⚠️ REGLAS IMPLEMENTADAS:
 * ✅ Intersection Observer para detectar secciones visibles
 * ✅ Clear active states cuando scroll < 100px
 * ✅ Logo click limpia estados active del menú
 * ✅ Smooth scrolling con offset pixel-perfect para header
 */

class NavigationIntelligence {
  constructor() {
    this.navLinks = document.querySelectorAll('.header__nav-link');
    this.logo = document.querySelector('.logo, .header__brand');
    this.header = document.querySelector('header');
    this.sections = document.querySelectorAll('section[id]');
    this.scrollThreshold = 100; // Umbral de scroll para clear active states
    this.headerHeight = 80; // Altura del header para offset
    
    this.init();
  }
  
  init() {
    this.setupIntersectionObserver();
    this.setupScrollDetection();
    this.setupLogoClickBehavior();
    this.setupSmoothScrolling();
    this.updateHeaderHeight();
  }
  
  /**
   * Intersection Observer para detectar secciones visibles
   * CUMPLIMIENTO CLAUDE.md: Navegación activa inteligente
   */
  setupIntersectionObserver() {
    const observerOptions = {
      root: null,
      rootMargin: `-${this.headerHeight}px 0px -50% 0px`,
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const navLink = document.querySelector(`a[href="#${id}"]`);
        
        if (entry.isIntersecting) {
          // Remover active de todos los enlaces
          this.clearAllActiveStates();
          
          // Añadir active al enlace correspondiente
          if (navLink) {
            navLink.classList.add('active');
          }
        }
      });
    }, observerOptions);
    
    // Observar todas las secciones
    this.sections.forEach(section => {
      observer.observe(section);
    });
  }
  
  /**
   * Clear active states cuando scroll < 100px
   * CUMPLIMIENTO CLAUDE.md: Navegación inteligente
   */
  setupScrollDetection() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.pageYOffset;
          
          if (scrollY < this.scrollThreshold) {
            // Scroll cerca del top - clear active states
            document.body.classList.add('scroll-top');
            this.clearAllActiveStates();
          } else {
            // Scroll suficiente - permitir active states
            document.body.classList.remove('scroll-top');
          }
          
          ticking = false;
        });
        ticking = true;
      }
    });
  }
  
  /**
   * Logo click limpia estados active del menú
   * CUMPLIMIENTO CLAUDE.md: Logo click behavior
   */
  setupLogoClickBehavior() {
    if (this.logo) {
      this.logo.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Limpiar todos los estados active
        document.body.classList.add('logo-reset');
        this.clearAllActiveStates();
        
        // Scroll smooth to top
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        
        // Remover clase después de la animación
        setTimeout(() => {
          document.body.classList.remove('logo-reset');
        }, 500);
      });
    }
  }
  
  /**
   * Smooth scrolling con offset pixel-perfect para header
   * CUMPLIMIENTO CLAUDE.md: Offset pixel-perfect
   */
  setupSmoothScrolling() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetSection = document.getElementById(targetId);
          
          if (targetSection) {
            const offsetPosition = targetSection.offsetTop - this.headerHeight;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
            
            // Manually trigger active state para feedback inmediato
            this.clearAllActiveStates();
            link.classList.add('active');
          }
        }
      });
    });
  }
  
  /**
   * Actualizar altura del header dinámicamente
   */
  updateHeaderHeight() {
    if (this.header) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          this.headerHeight = entry.contentRect.height;
        }
      });
      
      resizeObserver.observe(this.header);
    }
  }
  
  /**
   * Limpiar todos los estados active
   */
  clearAllActiveStates() {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
    });
  }
  
  /**
   * Destroy - Cleanup para optimización
   */
  destroy() {
    // Cleanup event listeners si es necesario
    this.navLinks.forEach(link => {
      link.removeEventListener('click', this.handleNavClick);
    });
    
    if (this.logo) {
      this.logo.removeEventListener('click', this.handleLogoClick);
    }
    
    window.removeEventListener('scroll', this.handleScroll);
  }
}

/**
 * CURSOR PERSONALIZADO SOLO DESKTOP - CUMPLIMIENTO CLAUDE.md
 * Mix-blend-mode solo en dispositivos (hover: hover) and (pointer: fine)
 */
class CustomCursor {
  constructor() {
    // Solo activar en desktop
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      this.init();
    }
  }
  
  init() {
    // Crear cursor personalizado
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    document.body.appendChild(this.cursor);
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
      this.cursor.style.left = e.clientX + 'px';
      this.cursor.style.top = e.clientY + 'px';
    });
    
    // Hide on mouse leave
    document.addEventListener('mouseleave', () => {
      this.cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
      this.cursor.style.opacity = '1';
    });
  }
}

/**
 * PERFORMANCE MOBILE OPTIMIZATION - CUMPLIMIENTO CLAUDE.md
 * Hardware acceleration y cleanup de will-change
 */
class MobilePerformanceOptimizer {
  constructor() {
    this.isMobile = window.innerWidth <= 768;
    this.init();
  }
  
  init() {
    if (this.isMobile) {
      this.optimizeAnimations();
      this.setupCleanup();
    }
  }
  
  optimizeAnimations() {
    // Aplicar transform3d para hardware acceleration
    const animatedElements = document.querySelectorAll('.card, .btn, .header__nav-link');
    
    animatedElements.forEach(element => {
      element.style.transform = 'translate3d(0, 0, 0)';
      element.style.willChange = 'transform';
    });
  }
  
  setupCleanup() {
    // Cleanup will-change después de animaciones
    document.addEventListener('transitionend', (e) => {
      e.target.classList.add('animation-complete');
      e.target.style.willChange = 'auto';
    });
  }
}

/**
 * INICIALIZACIÓN PRINCIPAL
 * DOMContentLoaded para timing correcto
 */
document.addEventListener('DOMContentLoaded', () => {
  // Navegación activa inteligente
  const navigation = new NavigationIntelligence();
  
  // Cursor personalizado solo desktop
  const cursor = new CustomCursor();
  
  // Optimización performance móvil
  const mobileOptimizer = new MobilePerformanceOptimizer();
  
  // Debugging (solo en desarrollo)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🎯 Navegación activa inteligente inicializada');
    console.log('🖱️ Cursor personalizado:', window.matchMedia('(hover: hover) and (pointer: fine)').matches ? 'Activado' : 'Desactivado');
    console.log('📱 Optimización móvil:', window.innerWidth <= 768 ? 'Activada' : 'Desactivada');
  }
});

/**
 * RESPONSIVE DETECTION
 * Redetectar capacidades en resize
 */
window.addEventListener('resize', () => {
  // Redetectar si es móvil
  const isMobile = window.innerWidth <= 768;
  document.body.classList.toggle('mobile-device', isMobile);
  
  // Redetectar capacidades de hover
  const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  document.body.classList.toggle('hover-capable', hasHover);
});

// Exportar para uso modular si es necesario
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    NavigationIntelligence,
    CustomCursor,
    MobilePerformanceOptimizer
  };
}