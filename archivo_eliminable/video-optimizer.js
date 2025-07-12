// Optimización de video de fondo para rendimiento
class VideoOptimizer {
    constructor() {
        this.video = document.querySelector('.hero-video');
        this.container = document.querySelector('.hero-video-container');
        this.fallback = document.querySelector('.hero-video-fallback');
        this.isDisabled = false;
        
        if (this.video) {
            this.init();
        }
    }
    
    init() {
        // Solo manejar errores básicos, sin optimizaciones que puedan interferir
        this.handleVideoErrors();
    }
    
    detectDeviceCapabilities() {
        // Temporalmente deshabilitado para evitar problemas
        return;
        
        // Detectar dispositivos de baja potencia
        const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
        const isSlowConnection = navigator.connection && navigator.connection.effectiveType === 'slow-2g';
        
        if (isLowEndDevice || isSlowConnection) {
            this.disableVideo('Low-end device or slow connection detected');
            return;
        }
        
        // Detectar preferencias de usuario
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            this.disableVideo('User prefers reduced motion');
            return;
        }
    }
    
    optimizeForConnection() {
        // Temporalmente deshabilitado para evitar problemas
        return;
        
        if (!navigator.connection) return;
        
        const connection = navigator.connection;
        
        // Optimizar según tipo de conexión
        switch(connection.effectiveType) {
            case 'slow-2g':
            case '2g':
                this.disableVideo('Slow connection detected');
                break;
                
            case '3g':
                // Reducir calidad del video
                this.video.style.filter = 'blur(1px)';
                this.video.playbackRate = 0.8;
                break;
                
            case '4g':
            default:
                // Calidad completa
                break;
        }
        
        // Monitorear cambios de conectividad
        connection.addEventListener('change', () => {
            this.optimizeForConnection();
        });
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.target === this.container) {
                    if (entry.isIntersecting) {
                        this.playVideo();
                    } else {
                        this.pauseVideo();
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px 0px'
        });
        
        observer.observe(this.container);
    }
    
    handleVideoErrors() {
        this.video.addEventListener('error', (e) => {
            console.warn('Video failed to load:', e);
            this.disableVideo('Video loading failed');
        });
        
        this.video.addEventListener('stalled', () => {
            console.warn('Video stalled');
            // Intentar reproducir después de un delay
            setTimeout(() => {
                this.video.play().catch(() => {
                    this.disableVideo('Video playback failed');
                });
            }, 2000);
        });
    }
    
    optimizeForBattery() {
        if (!navigator.getBattery) return;
        
        navigator.getBattery().then(battery => {
            const checkBattery = () => {
                // Si la batería está baja, deshabilitar video
                if (battery.level < 0.2 && !battery.charging) {
                    this.disableVideo('Low battery detected');
                }
            };
            
            checkBattery();
            battery.addEventListener('levelchange', checkBattery);
            battery.addEventListener('chargingchange', checkBattery);
        });
    }
    
    playVideo() {
        if (this.video && !this.video.ended) {
            this.video.play().catch(e => {
                console.warn('Autoplay failed:', e);
                this.disableVideo('Autoplay not supported');
            });
        }
    }
    
    pauseVideo() {
        if (this.video) {
            this.video.pause();
        }
    }
    
    disableVideo(reason) {
        
        if (this.video) {
            this.video.pause();
            this.video.style.opacity = '0';
            // NO cambiar src ni display para evitar errores de recarga
        }
        
        if (this.fallback) {
            this.fallback.style.display = 'block';
        }
    }
    
    // Método público para deshabilitar video manualmente
    disable() {
        if (!this.isDisabled) {
            this.disableVideo('Manually disabled');
            this.isDisabled = true;
        }
    }
    
    // Método público para habilitar video manualmente
    enable() {
        if (this.isDisabled && this.video) {
            // Simplemente mostrar y reproducir el video existente
            this.video.style.opacity = '1';
            
            // Intentar reproducir el video que ya está cargado
            this.video.play().then(() => {
            }).catch(e => {
                console.warn('Video play failed on enable:', e);
            });
            
            this.isDisabled = false;
        }
        
        if (this.fallback) {
            this.fallback.style.display = 'none';
        }
    }
    
    // Configurar loop según formato de video
    setupConditionalLoop() {
        if (!this.video) return;
        
        let isReversed = false;
        let isWebMFormat = false;
        
        // Detectar formato de video cargado
        this.video.addEventListener('loadedmetadata', () => {
            const currentSrc = this.video.currentSrc || this.video.src;
            isWebMFormat = currentSrc.includes('.webm');
            
            
            if (isWebMFormat) {
                // WebM: Deshabilitar loop nativo para loop-reverse
                this.video.removeAttribute('loop');
            } else {
                // MP4: Mantener loop nativo
                this.video.setAttribute('loop', '');
            }
        });
        
        // Solo aplicar loop-reverse para WebM
        this.video.addEventListener('ended', () => {
            if (isWebMFormat) {
                if (!isReversed) {
                    // Reproducir hacia atrás
                    this.video.playbackRate = -1;
                    this.video.currentTime = this.video.duration;
                    this.video.play();
                    isReversed = true;
                } else {
                    // Reproducir hacia adelante
                    this.video.playbackRate = 1;
                    this.video.currentTime = 0;
                    this.video.play();
                    isReversed = false;
                }
            }
        });
        
        // Manejar cuando llega al inicio en reversa (solo WebM)
        this.video.addEventListener('timeupdate', () => {
            if (isWebMFormat && isReversed && this.video.currentTime <= 0.1) {
                this.video.playbackRate = 1;
                this.video.currentTime = 0;
                this.video.play();
                isReversed = false;
            }
        });
    }
    
}

// Inicializar optimizador cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.videoOptimizer = new VideoOptimizer();
    
    // Debug: Verificar estado del video
    const video = document.querySelector('.hero-video');
    if (video) {
        
        // Forzar reproducción después de un pequeño delay
        setTimeout(() => {
            video.play().then(() => {
            }).catch(error => {
                console.error('Video play failed:', error);
            });
        }, 1000);
        
        // Event listeners para debug
        video.addEventListener('error', (e) => console.error('Video error:', e));
    } else {
        console.error('Video element not found');
    }
});

// Gestionar video según scroll para ahorrar recursos
window.addEventListener('scroll', () => {
    if (window.videoOptimizer) {
        if (window.scrollY > window.innerHeight * 2) {
            // Deshabilitar video cuando está muy abajo
            window.videoOptimizer.disable();
        } else {
            // Rehabilitar video cuando vuelve arriba
            window.videoOptimizer.enable();
        }
    }
});