/**
 * SERGIO ARTE PLÁSTICA - Random Hero Background
 * Sistema de imagen aleatoria para el hero
 */

class RandomHero {
    constructor() {
        this.heroSection = null;
        this.galleryData = [];
        this.currentArtwork = null;
        this.preloadedImages = new Map();
        
        this.init();
    }

    init() {
        // Esperar a que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.heroSection = document.querySelector('.hero-section');
        
        if (!this.heroSection) {
            console.warn('🚨 Hero section not found');
            return;
        }

        // Esperar a que GALLERY_DATA esté disponible
        this.waitForGalleryData();
    }

    waitForGalleryData() {
        if (typeof window.GALLERY_DATA !== 'undefined' && window.GALLERY_DATA.length > 0) {
            this.galleryData = window.GALLERY_DATA;
            this.setRandomBackground();
        } else {
            // Verificar cada 100ms hasta que esté disponible
            setTimeout(() => this.waitForGalleryData(), 100);
        }
    }

    setRandomBackground() {
        if (this.galleryData.length === 0) {
            console.warn('🚨 No gallery data available for random hero');
            return;
        }

        // Seleccionar imagen aleatoria
        const randomIndex = Math.floor(Math.random() * this.galleryData.length);
        const selectedArtwork = this.galleryData[randomIndex];
        
        this.currentArtwork = selectedArtwork;
        
        // Construir URL de la imagen
        const imageUrl = `images/${selectedArtwork.path}`;
        
        // Precargar imagen para evitar flicker
        this.preloadImage(imageUrl).then(() => {
            // Aplicar background
            this.heroSection.style.backgroundImage = `url('${imageUrl}')`;
            
            console.log(`🎨 Hero aleatorio: "${selectedArtwork.title}" (${selectedArtwork.year})`);
            
            // Disparar evento personalizado
            window.dispatchEvent(new CustomEvent('heroImageChanged', {
                detail: {
                    artwork: selectedArtwork,
                    imageUrl: imageUrl
                }
            }));
        }).catch(error => {
            console.warn(`🚨 Error loading hero image: ${error.message}`);
            this.fallbackToDefault();
        });
    }

    preloadImage(url) {
        return new Promise((resolve, reject) => {
            // Verificar si ya está precargada
            if (this.preloadedImages.has(url)) {
                resolve(this.preloadedImages.get(url));
                return;
            }

            const img = new Image();
            
            img.onload = () => {
                this.preloadedImages.set(url, img);
                resolve(img);
            };
            
            img.onerror = () => {
                reject(new Error(`Failed to load image: ${url}`));
            };
            
            img.src = url;
        });
    }

    fallbackToDefault() {
        // Fallback a la imagen por defecto si hay error
        const defaultImage = 'images/obras/oil/arqueologia-temporal.jpg';
        this.heroSection.style.backgroundImage = `url('${defaultImage}')`;
        console.log('🔄 Fallback to default hero image');
    }

    // Método público para cambiar manualmente
    changeRandomImage() {
        this.setRandomBackground();
    }

    // Getter para obtener la obra actual
    getCurrentArtwork() {
        return this.currentArtwork;
    }

    // Método para obtener estadísticas
    getStats() {
        return {
            totalImages: this.galleryData.length,
            preloadedImages: this.preloadedImages.size,
            currentArtwork: this.currentArtwork?.title || 'None'
        };
    }
}

// Inicializar automáticamente
const randomHero = new RandomHero();

// Exportar para uso en otros scripts
if (typeof window !== 'undefined') {
    window.randomHero = randomHero;
}

// Función global para debugging
if (typeof window !== 'undefined') {
    window.changeHeroImage = () => randomHero.changeRandomImage();
    window.getHeroStats = () => randomHero.getStats();
}

// Exportar para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RandomHero;
}