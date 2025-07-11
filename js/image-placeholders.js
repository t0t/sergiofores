// Image Placeholders Manager
class ImagePlaceholderManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupProjectCardPlaceholders();
        this.setupImageLoadingHandlers();
    }
    
    setupProjectCardPlaceholders() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach((card, index) => {
            // Añadir clase loading inicialmente
            card.classList.add('loading');
            
            // Determinar tipo de proyecto para placeholder específico
            const href = card.getAttribute('href') || '';
            let type = 'default';
            
            if (href.includes('arte') || href.includes('fotografia')) {
                type = 'art';
            } else if (href.includes('sergio-dev') || href.includes('cerebro')) {
                type = 'tech';
            } else if (href.includes('01234') || href.includes('cognitivo')) {
                type = 'cognitive';
            }
            
            card.setAttribute('data-type', type);
            
            console.log(`Project card ${index} setup with type: ${type}`);
        });
    }
    
    setupImageLoadingHandlers() {
        const images = document.querySelectorAll('.project-screenshot img');
        
        images.forEach((img, index) => {
            const card = img.closest('.project-card');
            const screenshot = img.closest('.project-screenshot');
            
            // Añadir clase loading al screenshot
            if (screenshot) {
                screenshot.classList.add('loading');
            }
            
            // Handler para cuando la imagen se carga
            const handleImageLoad = () => {
                console.log(`Image ${index} loaded successfully`);
                
                // Añadir clase loaded a la imagen
                img.classList.add('loaded');
                
                // Remover loading del screenshot y card
                if (screenshot) {
                    screenshot.classList.remove('loading');
                }
                if (card) {
                    card.classList.remove('loading');
                }
                
                // Fade in suave
                img.style.opacity = '1';
            };
            
            // Handler para errores de carga
            const handleImageError = () => {
                console.warn(`Image ${index} failed to load:`, img.src);
                
                // Mantener placeholder pero cambiar estilo
                if (screenshot) {
                    screenshot.classList.add('error');
                    screenshot.style.background = 'linear-gradient(135deg, #ff7675 0%, #e17055 100%)';
                }
                
                // Añadir ícono de error
                if (!screenshot.querySelector('.error-icon')) {
                    const errorIcon = document.createElement('div');
                    errorIcon.className = 'error-icon';
                    errorIcon.innerHTML = '⚠️';
                    errorIcon.style.cssText = `
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        font-size: 2rem;
                        z-index: 2;
                    `;
                    screenshot.appendChild(errorIcon);
                }
            };
            
            // Verificar si la imagen ya está cargada (cache)
            if (img.complete && img.naturalHeight !== 0) {
                handleImageLoad();
            } else {
                // Configurar event listeners
                img.addEventListener('load', handleImageLoad);
                img.addEventListener('error', handleImageError);
                
                // Timeout de seguridad (10 segundos)
                setTimeout(() => {
                    if (!img.classList.contains('loaded')) {
                        console.warn(`Image ${index} loading timeout`);
                        handleImageError();
                    }
                }, 10000);
            }
        });
    }
    
    // Método público para forzar recarga de placeholders
    refresh() {
        // Limpiar clases existentes
        document.querySelectorAll('.project-card').forEach(card => {
            card.classList.remove('loading');
        });
        
        document.querySelectorAll('.project-screenshot').forEach(screenshot => {
            screenshot.classList.remove('loading', 'error');
        });
        
        // Reinicializar
        this.init();
    }
    
    // Método para simular loading (para testing)
    simulateLoading(duration = 3000) {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => {
            card.classList.add('loading');
            setTimeout(() => {
                card.classList.remove('loading');
            }, duration);
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.imagePlaceholderManager = new ImagePlaceholderManager();
    console.log('Image Placeholder Manager initialized');
});

// También inicializar si el DOM ya está listo
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    window.imagePlaceholderManager = new ImagePlaceholderManager();
    console.log('Image Placeholder Manager initialized (DOM already ready)');
}

// Reinicializar después del loading screen
document.addEventListener('loadingComplete', () => {
    if (window.imagePlaceholderManager) {
        setTimeout(() => {
            window.imagePlaceholderManager.refresh();
        }, 500);
    }
});