/**
 * SERGIO ARTE PLÁSTICA - Portfolio Web
 * Arquitectura modular 01234
 */

// ===== UTILS =====
const Utils = {
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
        this.updateHeader();
    }

    bindEvents() {
        const throttledUpdate = Utils.throttleRaf(() => this.updateHeader());
        window.addEventListener('scroll', throttledUpdate);
    }

    updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
            this.header.classList.add('translate-y-[-100%]');
        } else {
            this.header.classList.remove('translate-y-[-100%]');
        }
        
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
        this.menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });

        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(() => this.close(), 150);
            });
        });

        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !e.target.closest('.nav-menu') && 
                !e.target.closest('.menu-toggle')) {
                this.close();
            }
        });

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
        this.navMenu.classList.remove('hidden');
        this.navMenu.classList.add('flex');
        this.menuToggle.setAttribute('aria-label', 'Cerrar menú');
        this.menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.isOpen = false;
        this.menuToggle.classList.remove('active');
        this.navMenu.classList.add('hidden');
        this.navMenu.classList.remove('flex');
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

// ===== GALLERY MODAL =====
class GalleryModal {
    constructor() {
        console.log('Initializing GalleryModal');
        
        // Verificar si los datos están disponibles
        if (window.GALLERY_DATA) {
            console.log('Gallery data found in constructor:', window.GALLERY_DATA.length, 'items');
        } else {
            console.warn('Gallery data not available in constructor');
        }
        
        // Obtener elementos del DOM
        this.modal = document.getElementById('galleryModal');
        this.modalClose = document.getElementById('modalClose');
        this.carouselTrack = document.getElementById('carouselTrack');
        this.carouselPrev = document.getElementById('carouselPrev');
        this.carouselNext = document.getElementById('carouselNext');
        this.carouselIndicators = document.getElementById('carouselIndicators');
        
        // Verificar que todos los elementos necesarios existen
        if (!this.modal) console.error('Modal element not found!');
        if (!this.carouselTrack) console.error('Carousel track not found!');
        if (!this.carouselPrev) console.error('Prev button not found!');
        if (!this.carouselNext) console.error('Next button not found!');
        if (!this.carouselIndicators) console.error('Indicators not found!');
        
        this.slides = [];
        this.currentSlide = 0;
        this.isOpen = false;
        
        this.init();
    }

    init() {
        if (!this.modal) return;
        this.bindEvents();
        this.waitForCarousel();
    }

    waitForCarousel() {
        // Si ya tenemos slides, no hacer nada
        if (this.slides && this.slides.length > 0) {
            console.log('Slides already created:', this.slides.length);
            return;
        }

        console.log('Checking for gallery data...');
        
        // Verificar si tenemos datos
        if (!window.GALLERY_DATA) {
            console.warn('Gallery data not found, retrying in 100ms...');
            setTimeout(() => this.waitForCarousel(), 100);
            return;
        }
        
        // Verificar que los datos son válidos
        if (!Array.isArray(window.GALLERY_DATA) || window.GALLERY_DATA.length === 0) {
            console.error('Invalid gallery data:', window.GALLERY_DATA);
            return;
        }

        console.log('Creating slides with', window.GALLERY_DATA.length, 'items');
        
        // Crear slides con los datos disponibles
        this.createSlides(window.GALLERY_DATA);
    }

    createSlides(data) {
        console.log('Starting slide creation with', data?.length, 'items');
        
        if (!data?.length) {
            console.error('No gallery data provided');
            return;
        }
        
        if (!this.carouselTrack) {
            console.error('Carousel track not found');
            return;
        }
        
        // Limpiar contenedor
        this.carouselTrack.innerHTML = '';
        
        // Crear cada slide individualmente
        data.forEach((item, index) => {
            console.log(`Creating slide ${index}:`, item.title);
            
            // Crear el slide
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            if (index === 0) slide.classList.add('active');
            slide.setAttribute('aria-hidden', index !== 0);
            
            // Crear la imagen
            const img = document.createElement('img');
            img.src = `images/${item.path}`;
            img.alt = item.title;
            img.className = 'carousel-image';
            
            // Crear la información
            const info = document.createElement('div');
            info.className = 'carousel-info';
            info.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.technique} · ${item.dimensions} · ${item.year}</p>
            `;
            
            // Armar el slide
            slide.appendChild(img);
            slide.appendChild(info);
            this.carouselTrack.appendChild(slide);
            
            console.log(`Slide ${index} added to DOM`);
        });
        
        // Actualizar referencias
        this.slides = Array.from(this.carouselTrack.children);
        
        // Verificar que todos los slides se crearon
        console.log('Slides created:', {
            dataLength: data.length,
            slidesInDOM: this.carouselTrack.children.length,
            slidesArray: this.slides.length
        });
        
        // Crear indicadores
        this.createIndicators(data.length);
        
        // Reinicializar iconos
        if (window.lucide) {
            window.lucide.createIcons();
        }
        
        console.log('Gallery initialization complete');
    }

    createIndicators(count) {
        console.log('Creating indicators:', count);
        
        // Limpiar contenedor
        this.carouselIndicators.innerHTML = '';
        
        // Crear cada indicador
        for (let i = 0; i < count; i++) {
            const button = document.createElement('button');
            button.className = `carousel-indicator ${i === 0 ? 'active' : ''}`;
            button.setAttribute('aria-label', `Ir a obra ${i + 1} de ${count}`);
            button.setAttribute('data-index', i);
            button.onclick = () => {
                console.log('Indicator clicked:', i);
                this.goToSlide(i);
            };
            this.carouselIndicators.appendChild(button);
        }

        console.log('Indicators created:', this.carouselIndicators.children.length);
    }

    bindEvents() {
        console.log('Binding gallery events');
        
        // Botones de navegación
        this.modalClose?.addEventListener('click', () => {
            console.log('Close button clicked');
            this.close();
        });
        
        this.carouselPrev?.addEventListener('click', () => {
            console.log('Prev button clicked');
            this.prevSlide();
        });
        
        this.carouselNext?.addEventListener('click', () => {
            console.log('Next button clicked');
            this.nextSlide();
        });
        
        // Eventos de teclado
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        this.setupTouchNavigation();

        // Delegación de eventos para obras en miniatura
        const artworks = document.querySelectorAll('.artwork');
        console.log('Found artwork thumbnails:', artworks.length);
        
        artworks.forEach((artwork, index) => {
            artwork.addEventListener('click', () => {
                console.log('Artwork clicked:', index);
                this.open();
                this.goToSlide(index);
            });
        });

        // Botón de galería completa
        const openGalleryBtn = document.getElementById('openGallery');
        if (openGalleryBtn) {
            openGalleryBtn.addEventListener('click', () => {
                console.log('Opening full gallery');
                this.open();
                this.goToSlide(0);
            });
        }
    }

    open() {
        console.log('Opening modal');
        if (!window.GALLERY_DATA) {
            console.error('GALLERY_DATA not found!');
            return;
        }
        
        // Debug: ver datos exactos
        console.log('Full gallery data:', window.GALLERY_DATA);
        
        this.isOpen = true;
        this.modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Forzar recreación de slides cada vez que se abre
        console.log('Recreating slides...');
        this.createSlides(window.GALLERY_DATA);
        this.goToSlide(0);  // Asegurar que empezamos en la primera imagen

        console.log('Modal opened, slides:', this.slides?.length);
    }

    close() {
        this.isOpen = false;
        this.modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    goToSlide(index) {
        console.log('Attempting to go to slide:', index);
        
        // Validaciones
        if (!this.slides?.length) {
            console.error('No slides available');
            return;
        }
        
        // Asegurar índice válido
        const validIndex = ((index % this.slides.length) + this.slides.length) % this.slides.length;
        console.log(`Normalized index from ${index} to ${validIndex}`);
        
        // Debug info
        console.log('Carousel state:', {
            totalSlides: this.slides.length,
            currentSlide: this.currentSlide,
            targetSlide: validIndex,
            activeSlides: this.slides.filter(s => s.classList.contains('active')).length
        });
        
        // Actualizar slides
        this.slides.forEach((slide, i) => {
            const isActive = i === validIndex;
            slide.classList.toggle('active', isActive);
            slide.setAttribute('aria-hidden', !isActive);
            slide.style.opacity = isActive ? '1' : '0';
            slide.style.zIndex = isActive ? '1' : '0';
            console.log(`Slide ${i}: ${isActive ? 'activated' : 'deactivated'}`);
        });
        
        // Actualizar indicadores
        if (this.carouselIndicators) {
            const indicators = Array.from(this.carouselIndicators.children);
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === validIndex);
                indicator.setAttribute('aria-current', i === validIndex);
            });
        }
        
        // Actualizar botones de navegación
        if (this.carouselPrev && this.carouselNext) {
            this.carouselPrev.disabled = validIndex === 0;
            this.carouselNext.disabled = validIndex === this.slides.length - 1;
            console.log('Navigation buttons updated:', {
                prev: !this.carouselPrev.disabled,
                next: !this.carouselNext.disabled
            });
        }
        
        // Actualizar estado
        this.currentSlide = validIndex;
        console.log('Slide change completed to index:', validIndex);
    }

    nextSlide() {
        console.log('Going to next slide, current:', this.currentSlide, 'total:', this.slides.length);
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        console.log('Next index:', nextIndex);
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        console.log('Going to previous slide, current:', this.currentSlide, 'total:', this.slides.length);
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        console.log('Previous index:', prevIndex);
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
        this.components.set('header', new HeaderController());
        this.components.set('navigation', new NavigationMenu());
        this.components.set('smoothScroll', new SmoothScroll());
        this.components.set('galleryModal', new GalleryModal());

        console.log('🎨 Portfolio Sergio Forés initialized');
    }

    getComponent(name) {
        return this.components.get(name);
    }
}

// Initialize application
const app = new PortfolioApp();