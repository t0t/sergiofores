/**
 * SERGIO FORÉS PORTFOLIO - ARQUITECTURA MEJORADA
 * Versión estable con organización modular pero sin ES6 modules
 * FUNCIONA SIN SERVIDOR - ESTABLE Y MANTENIBLE
 */

// =============================================================================
// PORTFOLIO APP - NAMESPACE PRINCIPAL
// =============================================================================
window.PortfolioApp = (function() {
    'use strict';
    
    // =============================================================================
    // DOM CACHE - OPTIMIZACIÓN DE PERFORMANCE
    // =============================================================================
    const DOMCache = {
        header: null,
        backToTopButton: null,
        menuToggle: null,
        mainNav: null,
        heroVideo: null,
        currentYearSpan: null,
        
        init() {
            // Cache all DOM elements once
            this.header = document.querySelector('.header');
            this.backToTopButton = document.getElementById('backToTop');
            this.menuToggle = document.getElementById('menuToggle');
            this.mainNav = document.getElementById('mainNav');
            this.heroVideo = document.querySelector('.hero-video');
            this.currentYearSpan = document.getElementById('currentYear');
            
            console.log('✅ DOM Cache initialized');
        }
    };
    
    // =============================================================================
    // HEADER MANAGER MODULE - OPTIMIZADO
    // =============================================================================
    const HeaderManager = {
        lastScrollTop: 0,
        ticking: false,
        isAutoHideEnabled: false,
        scrollHandler: null, // Cache handler para cleanup
        
        init() {
            if (!DOMCache.header) return;
            
            this.setupScrollListener();
            console.log('✅ HeaderManager initialized');
        },
        
        setupScrollListener() {
            // Cache handler para poder hacer cleanup después
            this.scrollHandler = () => {
                if (!this.ticking) {
                    requestAnimationFrame(() => {
                        this.updateHeader();
                        this.handleVideoOptimization();
                    });
                    this.ticking = true;
                }
            };
            
            window.addEventListener('scroll', this.scrollHandler, { passive: true });
        },

        handleVideoOptimization() {
            if (window.videoOptimizer) {
                if (window.scrollY > window.innerHeight * 2) {
                    window.videoOptimizer.disable();
                } else {
                    window.videoOptimizer.enable();
                }
            }
        },
        
        updateHeader() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            this.updateTransparency(scrollTop);
            this.updateBackToTopButton(scrollTop);
            
            if (this.isAutoHideEnabled) {
                this.updateVisibility(scrollTop);
            }
            
            this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            this.ticking = false;
        },

        updateBackToTopButton(scrollTop) {
            const backToTopButton = document.getElementById('backToTop');
            if (backToTopButton) {
                if (scrollTop > 300) {
                    backToTopButton.classList.add('visible');
                } else {
                    backToTopButton.classList.remove('visible');
                }
            }
        },
        
        updateTransparency(scrollTop) {
            if (scrollTop > 50) {
                DOMCache.header.classList.add('scrolled');
            } else {
                DOMCache.header.classList.remove('scrolled');
            }
        },
        
        updateVisibility(scrollTop) {
            if (scrollTop > this.lastScrollTop && scrollTop > 100) {
                this.hide();
            } else if (scrollTop < this.lastScrollTop) {
                this.show();
            }
        },
        
        hide() {
            DOMCache.header.classList.add('hidden');
        },
        
        show() {
            DOMCache.header.classList.remove('hidden');
        },
        
        enableAutoHide() {
            this.isAutoHideEnabled = true;
        },
        
        disableAutoHide() {
            this.isAutoHideEnabled = false;
            this.show();
        },
        
        getHeight() {
            return DOMCache.header.offsetHeight || 80;
        },
        
        // Cleanup method para memory management
        destroy() {
            if (this.scrollHandler) {
                window.removeEventListener('scroll', this.scrollHandler);
                this.scrollHandler = null;
            }
        }
    };
    
    // =============================================================================
    // SMOOTH SCROLL MANAGER MODULE
    // =============================================================================
    const SmoothScrollManager = {
        offset: 10, // Offset por defecto
        
        init() {
            this.setupSmoothScrolling();
            console.log('✅ SmoothScrollManager initialized');
        },
        
        setupSmoothScrolling() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => this.handleSmoothScroll(e));
            });
        },
        
        handleSmoothScroll(e) {
            e.preventDefault();
            const target = document.querySelector(e.currentTarget.getAttribute('href'));
            if (!target) return;

            const headerHeight = HeaderManager.getHeight();
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight + this.offset;
            
            console.log('📍 Scrolling to:', target.id, 'with offset:', this.offset);

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        },
        
        setOffset(offset) {
            this.offset = offset;
            console.log('🎯 Scroll offset set to:', offset);
        },
        
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    
    // =============================================================================
    // MOBILE MENU MANAGER MODULE
    // =============================================================================
    const MobileMenuManager = {
        menuToggle: null,
        mainNav: null,
        autoCloseEnabled: false,
        
        init() {
            this.menuToggle = document.getElementById('menuToggle');
            this.mainNav = document.getElementById('mainNav');
            
            if (!this.menuToggle || !this.mainNav) return;
            
            this.setupToggleListener();
            console.log('✅ MobileMenuManager initialized');
        },
        
        setupToggleListener() {
            this.menuToggle.addEventListener('click', () => this.toggle());
        },
        
        toggle() {
            this.mainNav.classList.toggle('open');
            this.menuToggle.classList.toggle('open');
        },
        
        close() {
            this.mainNav.classList.remove('open');
            this.menuToggle.classList.remove('open');
        },
        
        enableAutoClose() {
            this.autoCloseEnabled = true;
        },
        
        disableAutoClose() {
            this.autoCloseEnabled = false;
        }
    };
    
    // =============================================================================
    // UTILITIES MANAGER MODULE
    // =============================================================================
    const UtilitiesManager = {
        init() {
            console.log('🔧 Initializing UtilitiesManager...');
            this.preserveHeroVideo();
            this.setupFooterYear();
            this.setupBackToTop();
            console.log('✅ UtilitiesManager initialized');
        },
        
        preserveHeroVideo() {
            const heroVideo = document.querySelector('.hero-video');
            if (heroVideo) {
                heroVideo.muted = true;
                heroVideo.playsInline = true;
                if (heroVideo.paused) {
                    heroVideo.play().catch(e => console.log('Hero video autoplay prevented:', e));
                }
                console.log('🎬 Hero video preserved');
            }
        },
        
        setupFooterYear() {
            const currentYearSpan = document.getElementById('currentYear');
            if (currentYearSpan) {
                currentYearSpan.textContent = new Date().getFullYear();
            }
        },
        
        setupBackToTop() {
            const backToTopButton = document.getElementById('backToTop');
            if (!backToTopButton) return;

            // Click handler
            backToTopButton.addEventListener('click', () => {
                SmoothScrollManager.scrollToTop();
            });
        }
    };
    
    // =============================================================================
    // APP CONTROLLER - ORQUESTADOR PRINCIPAL
    // =============================================================================
    const AppController = {
        async init() {
            console.log('🚀 Initializing Sergio Forés Portfolio...');
            
            // Initialize DOM cache first (OPTIMIZACIÓN)
            DOMCache.init();
            
            // Initialize modules in order
            HeaderManager.init();
            SmoothScrollManager.init();
            MobileMenuManager.init();
            UtilitiesManager.init();
            
            // Configuration
            this.configureDefaults();
            
            console.log('✅ Portfolio initialized successfully');
        },
        
        // Cleanup method para page unload
        destroy() {
            HeaderManager.destroy();
            console.log('🧹 Portfolio cleaned up');
        },
        
        configureDefaults() {
            HeaderManager.disableAutoHide(); // Header siempre visible
            MobileMenuManager.disableAutoClose(); // Menu no se cierra automáticamente
            SmoothScrollManager.setOffset(10); // Offset adicional de 10px
        },
        
        // API pública
        setScrollOffset(offset) {
            SmoothScrollManager.setOffset(offset);
        },
        
        enableHeaderAutoHide() {
            HeaderManager.enableAutoHide();
        },
        
        disableHeaderAutoHide() {
            HeaderManager.disableAutoHide();
        }
    };
    
    // =============================================================================
    // INICIALIZACIÓN
    // =============================================================================
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            await AppController.init();
        } catch (error) {
            console.error('❌ Failed to initialize portfolio:', error);
        }
    });
    
    // =============================================================================
    // PAGE LIFECYCLE MANAGEMENT
    // =============================================================================
    // Cleanup en page unload para evitar memory leaks
    window.addEventListener('beforeunload', () => {
        AppController.destroy();
    });
    
    // API pública
    return {
        DOMCache,
        HeaderManager,
        SmoothScrollManager,
        MobileMenuManager,
        UtilitiesManager,
        AppController
    };
    
})();

console.log('🎉 Sergio Forés Portfolio - Optimized Architecture Loaded!');