/**
 * SERGIO ARTE PLÁSTICA - Portfolio Web
 * Arquitectura modular y profesional
 */

// ===== UTILITIES =====
const Utils = {
    /**
     * Debounce function para optimizar eventos de scroll
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Throttle con requestAnimationFrame para scroll
     */
    throttleRaf(func) {
        let ticking = false;
        return function(...args) {
            if (!ticking) {
                requestAnimationFrame(() => {
                    func.apply(this, args);
                    ticking = false;
                });
                ticking = true;
            }
        };
    },

    /**
     * Detectar dispositivo móvil
     */
    isMobile() {
        return window.innerWidth <= 768;
    }
};

// ===== HEADER CONTROLLER =====
class HeaderController {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScrollY = window.scrollY;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateHeader(); // Estado inicial
    }

    bindEvents() {
        const throttledUpdate = Utils.throttleRaf(() => this.updateHeader());
        window.addEventListener('scroll', throttledUpdate);
    }

    updateHeader() {
        const currentScrollY = window.scrollY;
        
        // Hide/show logic
        if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
            this.header.classList.add('hidden');
        } else {
            this.header.classList.remove('hidden');
        }
        
        // Transparencia según scroll
        if (currentScrollY < 50) {
            this.header.classList.add('transparent');
            this.header.classList.remove('solid');
        } else {
            this.header.classList.remove('transparent');
            this.header.classList.add('solid');
        }
        
        this.lastScrollY = currentScrollY;
    }
}

// ===== NAVIGATION MENU =====
class NavigationMenu {
    constructor() {
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.isOpen = false;
        
        this.init();
    }

    init() {
        if (!this.menuToggle || !this.navMenu) return;
        this.bindEvents();
    }

    bindEvents() {
        // Toggle menu
        this.menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });

        // Cerrar menu al hacer click en enlaces
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(() => this.close(), 150);
            });
        });

        // Cerrar con click fuera
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !e.target.closest('.nav-menu') && 
                !e.target.closest('.menu-toggle')) {
                this.close();
            }
        });

        // Navegación por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
                this.menuToggle.focus();
            }
        });

        this.menuToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggle();
            }
        });
    }

    open() {
        this.isOpen = true;
        this.menuToggle.classList.add('active');
        this.navMenu.classList.add('active');
        this.menuToggle.setAttribute('aria-label', 'Cerrar menú');
        this.menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.isOpen = false;
        this.menuToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.menuToggle.setAttribute('aria-label', 'Abrir menú');
        this.menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }
}

// ===== SMOOTH SCROLL =====
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleClick.bind(this));
        });
    }

    handleClick(e) {
        e.preventDefault();
        const target = document.querySelector(e.currentTarget.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// ===== PARALLAX EFFECTS DISABLED =====
// Parallax eliminado para las cartografías de la conciencia
class ParallaxController {
    constructor() {
        // Parallax deshabilitado completamente
    }

    init() {
        // Sin efectos de parallax
    }

    updateParallax() {
        // Sin efectos de parallax
    }
}

// ===== IMAGE LAZY LOADING =====
class LazyImageLoader {
    constructor() {
        this.images = document.querySelectorAll('.artwork-image');
        this.init();
    }

    init() {
        if (this.images.length === 0) return;

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '1';
                    observer.unobserve(img);
                }
            });
        });

        this.images.forEach(img => observer.observe(img));
    }
}

// ===== GALLERY MODAL =====
class GalleryModal {
    constructor() {
        this.modal = document.getElementById('galleryModal');
        this.btnSeeMore = document.getElementById('btnSeeMore');
        this.modalClose = document.getElementById('modalClose');
        this.carouselTrack = document.getElementById('carouselTrack');
        this.carouselPrev = document.getElementById('carouselPrev');
        this.carouselNext = document.getElementById('carouselNext');
        this.carouselIndicators = document.getElementById('carouselIndicators');
        this.modalTitle = document.getElementById('modalTitle');
        
        this.slides = [];
        this.currentSlide = 0;
        this.isOpen = false;
        this.galleryData = [];
        this.allSlides = []; // Todas las slides sin filtrar
        this.currentCategory = 'all'; // Categoría actualmente mostrada
        
        this.categories = {
            'all': { name: 'Todas las Obras', filter: () => true },
            'oil': { name: 'Óleos sobre Lino', filter: (artwork) => artwork.path.includes('oil/') },
            '3dprinting': { name: 'Impresión 3D', filter: (artwork) => artwork.path.includes('3dprinting/') },
            'drawing': { name: 'Dibujos', filter: (artwork) => artwork.path.includes('drawing/') }
        };
        
        this.init();
    }

    init() {
        if (!this.modal) return;
        
        // Esperar a que el carousel se genere dinámicamente
        this.waitForCarousel();
        this.bindEvents();
    }

    waitForCarousel() {
        // Escuchar el evento cuando el carousel esté listo
        window.addEventListener('carouselReady', (e) => {
            console.log(`🎠 Carousel ready event received: ${e.detail.slideCount} slides`);
            this.refreshSlides();
        });
        
        // Verificar inmediatamente por si ya está disponible
        if (typeof window.GALLERY_DATA !== 'undefined' && window.GALLERY_DATA.length > 0) {
            this.galleryData = window.GALLERY_DATA;
            setTimeout(() => this.refreshSlides(), 100);
        }
    }

    refreshSlides() {
        this.allSlides = this.carouselTrack?.querySelectorAll('.carousel-slide') || [];
        
        if (this.allSlides.length > 0) {
            this.createCategoryMenu();
            this.filterByCategory('all'); // Mostrar todas por defecto
            console.log(`🎠 Gallery Modal initialized with ${this.allSlides.length} slides`);
        } else {
            console.log('⏳ Waiting for slides to be generated...');
            // Si no hay slides, intentar de nuevo en un momento
            setTimeout(() => this.refreshSlides(), 200);
        }
    }

    createCategoryMenu() {
        if (!this.modalTitle) return;
        
        // Crear menú de categorías
        const categoryMenu = document.createElement('div');
        categoryMenu.className = 'category-menu';
        categoryMenu.innerHTML = `
            <nav class="category-nav" role="tablist">
                ${Object.entries(this.categories).map(([key, category]) => `
                    <button 
                        class="category-btn ${key === 'all' ? 'active' : ''}" 
                        data-category="${key}"
                        role="tab"
                        aria-controls="gallery-${key}"
                        aria-selected="${key === 'all' ? 'true' : 'false'}"
                    >
                        ${category.name}
                    </button>
                `).join('')}
            </nav>
        `;
        
        // Reemplazar título con menú
        this.modalTitle.innerHTML = '';
        this.modalTitle.appendChild(categoryMenu);
        
        // Añadir event listeners
        categoryMenu.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.getAttribute('data-category');
                this.filterByCategory(category);
            });
        });
    }

    filterByCategory(category) {
        this.currentCategory = category;
        
        // Actualizar botones activos
        this.modal.querySelectorAll('.category-btn').forEach(btn => {
            const isActive = btn.getAttribute('data-category') === category;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
        
        // Filtrar slides
        if (category === 'all') {
            this.slides = Array.from(this.allSlides);
        } else {
            this.slides = Array.from(this.allSlides).filter(slide => {
                const img = slide.querySelector('img');
                return img && img.src.includes(`/${category}/`);
            });
        }
        
        // Mostrar/ocultar slides
        this.allSlides.forEach(slide => {
            slide.style.display = this.slides.includes(slide) ? 'flex' : 'none';
        });
        
        // Reinicializar carousel
        this.currentSlide = 0;
        this.createIndicators();
        this.goToSlide(0);
        
        console.log(`🎯 Filtered to ${category}: ${this.slides.length} obras`);
    }

    createIndicators() {
        if (!this.carouselIndicators) return;
        
        this.carouselIndicators.innerHTML = '';
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
            indicator.setAttribute('aria-label', `Ir a obra ${index + 1} de ${this.slides.length}`);
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.carouselIndicators.appendChild(indicator);
        });
    }

    bindEvents() {
        // Controles principales
        this.btnSeeMore?.addEventListener('click', () => this.open());
        this.modalClose?.addEventListener('click', () => this.close());
        this.modal.querySelector('.modal-overlay')?.addEventListener('click', () => this.close());
        
        // Navegación
        this.carouselPrev?.addEventListener('click', () => this.prevSlide());
        this.carouselNext?.addEventListener('click', () => this.nextSlide());
        
        // Teclado
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Touch/swipe
        this.setupTouchNavigation();
    }

    open() {
        this.isOpen = true;
        this.modal.classList.add('active');
        this.modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => this.modalClose?.focus(), 400);
    }

    close() {
        this.isOpen = false;
        this.modal.classList.remove('active');
        this.modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        this.btnSeeMore?.focus();
    }

    goToSlide(index) {
        if (index < 0 || index >= this.slides.length) return;

        // Limpiar estado actual de TODAS las slides
        this.allSlides.forEach(slide => slide.classList.remove('active', 'prev'));
        const indicators = this.carouselIndicators?.querySelectorAll('.carousel-indicator');
        indicators?.forEach(indicator => indicator.classList.remove('active'));

        // Activar nuevo estado solo en slides filtradas
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
        }
        
        if (indicators && indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        this.currentSlide = index;
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    handleKeyboard(e) {
        if (!this.isOpen) return;
        
        switch(e.key) {
            case 'Escape':
                this.close();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.prevSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextSlide();
                break;
        }
    }

    setupTouchNavigation() {
        let startX = 0;
        let startY = 0;
        
        this.carouselTrack?.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        this.carouselTrack?.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Solo swipe horizontal > 50px
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                diffX > 0 ? this.nextSlide() : this.prevSlide();
            }
            
            startX = startY = 0;
        }, { passive: true });
    }
}

// ===== APPLICATION INITIALIZATION =====
class PortfolioApp {
    constructor() {
        this.components = new Map();
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeComponents();
        });
    }

    initializeComponents() {
        // Inicializar todos los componentes
        this.components.set('header', new HeaderController());
        this.components.set('navigation', new NavigationMenu());
        this.components.set('smoothScroll', new SmoothScroll());
        this.components.set('parallax', new ParallaxController());
        this.components.set('lazyLoader', new LazyImageLoader());
        this.components.set('galleryModal', new GalleryModal());

        console.log('🎨 Portfolio Sergio Forés initialized');
    }

    getComponent(name) {
        return this.components.get(name);
    }
}

// ===== INITIALIZE APPLICATION =====
const app = new PortfolioApp();

// Export para testing/debugging
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioApp, HeaderController, NavigationMenu, GalleryModal };
}