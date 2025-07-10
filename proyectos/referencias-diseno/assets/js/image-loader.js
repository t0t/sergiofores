/**
 * Sistema de Carga de Imágenes con Skeleton Loaders
 * Lazy loading inteligente con estados de carga elegantes
 */

class ImageLoader {
    constructor() {
        this.loadedImages = new Set();
        this.errorImages = new Set();
        
        this.init();
    }

    init() {
        this.enhanceExistingImages();
    }

    enhanceExistingImages() {
        const images = document.querySelectorAll('.reference-image');
        
        images.forEach(img => {
            // Añadir animación de carga suave a imágenes existentes
            this.addImageEnhancements(img);
        });
    }

    addImageEnhancements(img) {
        // Añadir efecto de fade-in si la imagen no está cargada
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease-out';
            
            img.addEventListener('load', () => {
                img.style.opacity = '1';
                this.addShimmerEffect(img);
            }, { once: true });

            img.addEventListener('error', () => {
                this.handleImageError(img);
            }, { once: true });
        } else if (img.naturalWidth > 0) {
            // Imagen ya cargada, añadir efecto inmediato
            setTimeout(() => {
                this.addShimmerEffect(img);
            }, 100);
        }
    }

    loadImage(img) {
        const container = img.closest('.reference-image-container');
        const skeleton = container?.querySelector('.image-skeleton');
        const originalSrc = img.src;
        
        // Crear nueva imagen para precargar
        const tempImage = new Image();
        
        tempImage.onload = () => {
            // Imagen cargada exitosamente
            setTimeout(() => {
                img.classList.remove('loading');
                img.classList.add('loaded');
                img.removeAttribute('data-loading');
                
                if (skeleton) {
                    skeleton.style.opacity = '0';
                    setTimeout(() => {
                        if (skeleton.parentNode) {
                            skeleton.parentNode.removeChild(skeleton);
                        }
                    }, 300);
                }
                
                this.loadedImages.add(originalSrc);
                this.animateImageLoad(img);
                
            }, Math.random() * 300 + 200); // Simular tiempo de carga variable
        };

        tempImage.onerror = () => {
            // Error al cargar imagen
            this.handleImageError(img, container, skeleton);
        };

        // Simular progreso de carga
        this.simulateProgress(skeleton);
        
        // Iniciar carga
        tempImage.src = originalSrc;
    }

    simulateProgress(skeleton) {
        if (!skeleton) return;
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                clearInterval(interval);
                return;
            }
            
            // Efecto visual de progreso
            skeleton.style.backgroundPosition = `${-200 + (progress * 2)}% 0`;
        }, 100);
    }

    handleImageError(img) {
        console.warn('Error al cargar imagen:', img.src);
        
        // Mostrar placeholder de error simple
        img.style.opacity = '0.3';
        img.style.filter = 'grayscale(100%)';
        img.alt = 'Error al cargar imagen';
        
        this.errorImages.add(img.src);
        
        // Mostrar notificación si está disponible
        if (window.toast) {
            window.toast.error('Error al cargar una imagen', {
                duration: 3000
            });
        }
    }

    animateImageLoad(img) {
        // Efecto de reveal desde abajo
        img.style.transform = 'translateY(20px)';
        img.style.opacity = '0';
        
        setTimeout(() => {
            img.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            img.style.transform = 'translateY(0)';
            img.style.opacity = '1';
        }, 50);
        
        // Efecto de shimmer al cargar
        this.addShimmerEffect(img);
    }

    addShimmerEffect(img) {
        // Efecto de brillo sutil en la imagen
        const originalTransition = img.style.transition;
        
        img.style.transition = 'filter 0.3s ease';
        img.style.filter = 'brightness(1.1) contrast(1.05)';
        
        setTimeout(() => {
            img.style.filter = '';
            setTimeout(() => {
                img.style.transition = originalTransition;
            }, 300);
        }, 300);
    }

    // Método para recargar imágenes con error
    retryFailedImages() {
        const images = document.querySelectorAll('.reference-image');
        let retryCount = 0;
        
        images.forEach(img => {
            if (this.errorImages.has(img.src)) {
                // Restaurar imagen
                img.style.opacity = '1';
                img.style.filter = '';
                
                // Reintentar carga
                const newSrc = img.src;
                img.src = '';
                setTimeout(() => {
                    img.src = newSrc;
                    retryCount++;
                }, 100);
                
                this.errorImages.delete(img.src);
            }
        });
        
        if (window.toast && retryCount > 0) {
            window.toast.info(`Reintentando cargar ${retryCount} imágenes...`);
        }
    }

    // Usar el sistema de toast global si está disponible
    showToast(message, type = 'info') {
        if (window.toast) {
            window.toast[type](message);
        } else {
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    }

    // Precargar imágenes específicas
    preloadImages(urls) {
        urls.forEach(url => {
            if (!this.loadedImages.has(url)) {
                const img = new Image();
                img.onload = () => this.loadedImages.add(url);
                img.src = url;
            }
        });
    }

    // Obtener estadísticas
    getStats() {
        return {
            loaded: this.loadedImages.size,
            errors: this.errorImages.size,
            total: document.querySelectorAll('.reference-image').length
        };
    }

    // Destructor para cleanup
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.loadedImages.clear();
        this.errorImages.clear();
    }
}

// ===== INICIALIZACIÓN AUTOMÁTICA =====

let imageLoader = null;

document.addEventListener('DOMContentLoaded', () => {
    imageLoader = new ImageLoader();
    
    // Exponer globalmente para debug
    window.imageLoader = imageLoader;
});

// Export para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageLoader;
}