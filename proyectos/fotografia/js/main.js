/**
 * SERGIO FORÉS - FOTOGRAFÍA
 * Main JavaScript Module
 * 
 * Sistema completo de galería fotográfica con:
 * - Filtrado por categorías
 * - Lightbox modal responsive
 * - Navegación por teclado
 * - Optimización de performance
 */

class PhotoGallery {
    constructor() {
        this.currentFilter = 'all';
        this.currentPhoto = null;
        this.currentIndex = 0;
        this.filteredPhotos = [];
        this.isLightboxOpen = false;
        
        this.init();
    }

    /**
     * Inicialización del sistema
     */
    init() {
        console.log('🎯 Inicializando Galería Fotográfica...');
        
        // Inicializar componentes
        this.initGallery();
        this.initFilters();
        this.initLightbox();
        this.initKeyboardNavigation();
        this.initScrollEffects();
        this.initScrollToTop();
        this.initFooter();
        
        // Renderizar contenido inicial
        this.renderGallery();
        this.updateFilterCounts();
        
        console.log('✅ Galería inicializada correctamente');
        console.log(`📊 ${PHOTOGRAPHY_DATA.length} fotografías cargadas`);
        console.log(`🏷️ ${Object.keys(CATEGORIES).length} categorías disponibles`);
    }

    /**
     * Inicialización de la galería principal
     */
    initGallery() {
        this.galleryGrid = document.getElementById('gallery-grid');
        
        if (!this.galleryGrid) {
            console.error('❌ Elemento gallery-grid no encontrado');
            return;
        }

        // Configurar intersection observer para lazy loading
        this.initLazyLoading();
    }

    /**
     * Inicialización del sistema de filtros
     */
    initFilters() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = btn.dataset.filter;
                this.setFilter(filter);
            });
        });
    }

    /**
     * Inicialización del lightbox modal
     */
    initLightbox() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = this.lightbox.querySelector('.lightbox-image');
        
        // Botones de navegación
        this.lightboxClose = this.lightbox.querySelector('.lightbox-close');
        this.lightboxPrev = this.lightbox.querySelector('.lightbox-prev');
        this.lightboxNext = this.lightbox.querySelector('.lightbox-next');
        
        // Event listeners
        this.lightboxClose.addEventListener('click', () => this.closeLightbox());
        this.lightboxPrev.addEventListener('click', () => this.showPreviousPhoto());
        this.lightboxNext.addEventListener('click', () => this.showNextPhoto());
        
        // Cerrar al hacer click en el fondo
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });
    }

    /**
     * Inicialización de navegación por teclado
     */
    initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!this.isLightboxOpen) return;
            
            switch (e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.showPreviousPhoto();
                    break;
                case 'ArrowRight':
                    this.showNextPhoto();
                    break;
            }
        });
    }

    /**
     * Inicialización de efectos de scroll
     */
    initScrollEffects() {
        const header = document.querySelector('.header');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        });
    }

    /**
     * Inicialización del botón scroll to top
     */
    initScrollToTop() {
        this.scrollToTopBtn = document.getElementById('scrollToTop');
        
        if (!this.scrollToTopBtn) {
            console.error('❌ Elemento scrollToTop no encontrado');
            return;
        }
        
        // Mostrar/ocultar botón según scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY > 300;
            this.scrollToTopBtn.classList.toggle('visible', scrolled);
        });
        
        // Click event para volver arriba
        this.scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Accesibilidad: Enter y Space
        this.scrollToTopBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }

    /**
     * Inicialización de lazy loading
     */
    initLazyLoading() {
        if ('IntersectionObserver' in window) {
            this.imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        this.imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px'
            });
        }
    }

    /**
     * Carga lazy de imágenes
     */
    loadImage(img) {
        const src = img.dataset.src;
        if (src) {
            img.src = src;
            img.addEventListener('load', () => {
                img.parentElement.classList.remove('loading');
            });
        }
    }

    /**
     * Renderización de la galería
     */
    renderGallery() {
        const photos = this.getFilteredPhotos();
        
        if (photos.length === 0) {
            this.renderEmptyState();
            return;
        }
        
        const galleryHTML = photos.map((photo, index) => 
            this.createPhotoCard(photo, index)
        ).join('');
        
        this.galleryGrid.innerHTML = galleryHTML;
        
        // Configurar lazy loading para las nuevas imágenes
        if (this.imageObserver) {
            this.galleryGrid.querySelectorAll('img[data-src]').forEach(img => {
                this.imageObserver.observe(img);
            });
        }
        
        // Agregar event listeners a las tarjetas
        this.galleryGrid.querySelectorAll('.photo-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                this.openLightbox(index);
            });
            
            // Accesibilidad: Enter y Space
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.openLightbox(index);
                }
            });
        });
    }

    /**
     * Creación de tarjeta de fotografía
     */
    createPhotoCard(photo, index) {
        return `
            <article class="photo-card loading" tabindex="0" role="button" aria-label="Ver ${photo.title}">
                <img class="photo-image" 
                     data-src="${photo.path}" 
                     alt="${photo.title}"
                     loading="lazy">
                <div class="photo-info">
                    <h3 class="photo-title">${photo.title}</h3>
                    <div class="photo-meta">
                        <span class="photo-location">${photo.location}</span>
                    </div>
                    <p class="photo-description">${photo.description}</p>
                </div>
            </article>
        `;
    }

    /**
     * Estado vacío cuando no hay resultados
     */
    renderEmptyState() {
        this.galleryGrid.innerHTML = `
            <div class="empty-state">
                <h3>No se encontraron fotografías</h3>
                <p>Intenta con otro filtro o categoría</p>
            </div>
        `;
    }

    /**
     * Obtiene fotografías filtradas
     */
    getFilteredPhotos() {
        this.filteredPhotos = DataUtils.getByCategory(this.currentFilter);
        return this.filteredPhotos;
    }

    /**
     * Establece filtro activo
     */
    setFilter(filter) {
        this.currentFilter = filter;
        
        // Actualizar UI de filtros
        this.filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        // Animar transición
        this.galleryGrid.classList.add('loading');
        
        setTimeout(() => {
            this.renderGallery();
            this.galleryGrid.classList.remove('loading');
        }, 150);
        
        console.log(`🔍 Filtro aplicado: ${filter} (${this.getFilteredPhotos().length} fotos)`);
    }

    /**
     * Actualiza contadores en los filtros
     */
    updateFilterCounts() {
        this.filterButtons.forEach(btn => {
            const filter = btn.dataset.filter;
            const count = CATEGORIES[filter].count();
            
            if (count > 0) {
                btn.innerHTML = `${CATEGORIES[filter].name} <span class="count">(${count})</span>`;
            }
        });
    }

    /**
     * Abre el lightbox
     */
    openLightbox(index) {
        this.currentIndex = index;
        this.currentPhoto = this.filteredPhotos[index];
        this.isLightboxOpen = true;
        
        this.updateLightboxContent();
        this.lightbox.classList.add('active');
        
        // Prevent scroll en body
        document.body.style.overflow = 'hidden';
        
        // Focus management
        this.lightboxClose.focus();
    }

    /**
     * Cierra el lightbox
     */
    closeLightbox() {
        this.lightbox.classList.remove('active');
        this.isLightboxOpen = false;
        
        // Restore scroll
        document.body.style.overflow = '';
        
        // Return focus to gallery
        const activeCard = this.galleryGrid.children[this.currentIndex];
        if (activeCard) {
            activeCard.focus();
        }
    }

    /**
     * Muestra fotografía anterior
     */
    showPreviousPhoto() {
        this.currentIndex = this.currentIndex > 0 ? 
            this.currentIndex - 1 : 
            this.filteredPhotos.length - 1;
        
        this.currentPhoto = this.filteredPhotos[this.currentIndex];
        this.updateLightboxContent();
    }

    /**
     * Muestra fotografía siguiente
     */
    showNextPhoto() {
        this.currentIndex = this.currentIndex < this.filteredPhotos.length - 1 ? 
            this.currentIndex + 1 : 
            0;
        
        this.currentPhoto = this.filteredPhotos[this.currentIndex];
        this.updateLightboxContent();
    }

    /**
     * Actualiza contenido del lightbox
     */
    updateLightboxContent() {
        if (!this.currentPhoto) return;
        
        this.lightboxImage.src = this.currentPhoto.path;
        this.lightboxImage.alt = this.currentPhoto.title;
    }

    /**
     * Inicializa el footer con año dinámico
     */
    initFooter() {
        const currentYearElement = document.getElementById('current-year');
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear();
        }
    }

    /**
     * Formatea fecha para visualización
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

/**
 * Utilidades de performance
 */
class PerformanceUtils {
    static measureLoadTime() {
        const startTime = performance.now();
        
        window.addEventListener('load', () => {
            const loadTime = performance.now() - startTime;
            console.log(`⚡ Tiempo de carga: ${loadTime.toFixed(2)}ms`);
        });
    }
    
    static initServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('✅ Service Worker registrado:', registration.scope);
                })
                .catch(error => {
                    console.log('❌ Service Worker falló:', error);
                });
        }
    }
}

/**
 * Inicialización cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM cargado, inicializando aplicación...');
    
    // Inicializar galería principal
    window.photoGallery = new PhotoGallery();
    
    // Utilidades de performance
    PerformanceUtils.measureLoadTime();
    PerformanceUtils.initServiceWorker();
    
    // Analytics básico
    console.log('📊 Estadísticas de la galería:', DataUtils.getStats());
});

/**
 * Error handling global
 */
window.addEventListener('error', (e) => {
    console.error('❌ Error en la aplicación:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('❌ Promise rechazada:', e.reason);
});