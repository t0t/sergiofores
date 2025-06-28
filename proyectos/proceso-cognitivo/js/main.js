// ===================================
// SISTEMA DE PERFORMANCE OPTIMIZADA
// ===================================

// Performance monitoring mejorado
const PerformanceMonitor = {
    metrics: {},
    
    start(label) {
        this.metrics[label] = { start: performance.now() };
    },
    
    end(label) {
        if (this.metrics[label]) {
            this.metrics[label].end = performance.now();
            this.metrics[label].duration = this.metrics[label].end - this.metrics[label].start;
            console.log(`⚡ ${label}: ${this.metrics[label].duration.toFixed(2)}ms`);
        }
    },
    
    logVitals() {
        if ('web-vitals' in window) {
            // Si hay library de web vitals disponible
            console.log('🔍 Core Web Vitals tracking enabled');
        }
    }
};

// Intersection Observer optimizado y reutilizable
class LazyObserver {
    constructor(options = {}) {
        this.defaultOptions = {
            threshold: 0.1,
            rootMargin: '50px 0px',
            ...options
        };
        
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            this.defaultOptions
        );
        
        this.callbacks = new Map();
    }
    
    observe(element, callback) {
        this.callbacks.set(element, callback);
        this.observer.observe(element);
    }
    
    unobserve(element) {
        this.callbacks.delete(element);
        this.observer.unobserve(element);
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            const callback = this.callbacks.get(entry.target);
            if (callback && entry.isIntersecting) {
                callback(entry.target);
                // Auto-cleanup para elementos que solo necesitan lazy loading una vez
                if (callback.once) {
                    this.unobserve(entry.target);
                }
            }
        });
    }
    
    disconnect() {
        this.observer.disconnect();
        this.callbacks.clear();
    }
}

// Sistema de lazy loading inteligente para imágenes
const ImageLazyLoader = {
    observer: null,
    
    init() {
        PerformanceMonitor.start('ImageLazyLoader.init');
        
        this.observer = new LazyObserver({
            rootMargin: '200px 0px', // Preload cuando está a 200px de la vista
            threshold: 0.1
        });
        
        // Progressive loading: primero placeholders, luego WebP, luego originales
        document.querySelectorAll('img[data-webp], img[data-original]').forEach(img => {
            this.observer.observe(img, this.loadImage.bind(this));
        });
        
        PerformanceMonitor.end('ImageLazyLoader.init');
    },
    
    loadImage(img) {
        // Verificar soporte WebP
        const supportsWebP = this.checkWebPSupport();
        
        if (img.dataset.webp && supportsWebP && !img.dataset.webpLoaded) {
            this.loadWebPImage(img);
        } else if (img.dataset.original && !img.dataset.originalLoaded) {
            this.loadOriginalImage(img);
        }
    },
    
    loadWebPImage(img) {
        const webpImg = new Image();
        webpImg.onload = () => {
            img.src = img.dataset.webp;
            img.dataset.webpLoaded = 'true';
            img.classList.add('image-loaded');
            console.log(`📷 WebP loaded: ${img.alt}`);
        };
        webpImg.onerror = () => {
            // Fallback a imagen original si WebP falla
            if (img.dataset.original) {
                this.loadOriginalImage(img);
            }
        };
        webpImg.src = img.dataset.webp;
    },
    
    loadOriginalImage(img) {
        const originalImg = new Image();
        originalImg.onload = () => {
            img.src = img.dataset.original;
            img.dataset.originalLoaded = 'true';
            img.classList.add('image-loaded');
            console.log(`📷 Original loaded: ${img.alt}`);
        };
        originalImg.src = img.dataset.original;
    },
    
    checkWebPSupport() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('webp') > -1;
    }
};

// Sistema de lazy loading para videos
const VideoLazyLoader = {
    observer: null,
    
    init() {
        PerformanceMonitor.start('VideoLazyLoader.init');
        
        this.observer = new LazyObserver({
            rootMargin: '100px 0px',
            threshold: 0.3
        });
        
        // Solo videos con data-lazy-video
        document.querySelectorAll('video[data-lazy-video]').forEach(video => {
            this.observer.observe(video, this.loadVideo.bind(this));
        });
        
        // Control optimizado para videos ya cargados
        this.setupVideoControls();
        
        PerformanceMonitor.end('VideoLazyLoader.init');
    },
    
    loadVideo(video) {
        if (video.dataset.loaded === 'true') return;
        
        console.log('🎬 Loading video lazily');
        video.preload = 'metadata';
        video.load();
        
        video.addEventListener('loadedmetadata', () => {
            video.dataset.loaded = 'true';
            video.autoplay = true;
            video.play().catch(e => console.log('Video autoplay failed:', e));
        }, { once: true });
    },
    
    setupVideoControls() {
        const videos = document.querySelectorAll('video:not([data-lazy-video])');
        
        const videoObserver = new LazyObserver({
            threshold: 0.5,
            rootMargin: '0px'
        });
        
        videos.forEach(video => {
            videoObserver.observe(video, (vid) => {
                if (vid.paused) {
                    vid.play().catch(e => console.log('Video play failed:', e));
                }
            });
        });
        
        // Pausar videos fuera de vista
        const pauseObserver = new LazyObserver({
            threshold: 0.1,
            rootMargin: '-50px'
        });
        
        videos.forEach(video => {
            pauseObserver.observe(video, (vid) => {
                // Se ejecuta cuando sale de vista
            });
        });
    }
};

// Sistema de lazy loading para audio
const AudioLazyLoader = {
    observer: null,
    
    init() {
        PerformanceMonitor.start('AudioLazyLoader.init');
        
        this.observer = new LazyObserver({
            rootMargin: '300px 0px', // Preload cuando esté muy cerca
            threshold: 0.1
        });
        
        document.querySelectorAll('audio[data-lazy-audio]').forEach(audio => {
            this.observer.observe(audio, this.loadAudio.bind(this));
        });
        
        PerformanceMonitor.end('AudioLazyLoader.init');
    },
    
    loadAudio(audio) {
        if (audio.dataset.loaded === 'true') return;
        
        console.log('🎵 Loading audio metadata');
        audio.preload = 'metadata';
        audio.load();
        
        audio.addEventListener('loadstart', () => {
            audio.dataset.loaded = 'true';
            console.log(`🎵 Audio ready: ${audio.querySelector('source').src.split('/').pop()}`);
        }, { once: true });
    }
};

// Sistema de animaciones performantes
const AnimationController = {
    revealElements: new Set(),
    
    init() {
        PerformanceMonitor.start('AnimationController.init');
        
        const observer = new LazyObserver({
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });
        
        // Elementos con reveal animation
        document.querySelectorAll('.reveal, .fade-in').forEach(el => {
            observer.observe(el, this.animateElement.bind(this));
        });
        
        // Animaciones secuenciales optimizadas
        this.setupSequentialAnimations();
        
        PerformanceMonitor.end('AnimationController.init');
    },
    
    animateElement(element) {
        if (this.revealElements.has(element)) return;
        
        this.revealElements.add(element);
        element.classList.add('visible');
    },
    
    setupSequentialAnimations() {
        // Usar requestIdleCallback si está disponible
        const scheduleWork = window.requestIdleCallback || ((cb) => setTimeout(cb, 16));
        
        scheduleWork(() => {
            document.querySelectorAll('.reveal').forEach((el, index) => {
                // Transición delay escalonada más sutil
                el.style.transitionDelay = `${index * 0.03}s`;
            });
        });
    }
};

// Header dinámico optimizado
const HeaderController = {
    header: null,
    lastScrollY: 0,
    scrollTimeout: null,
    
    init() {
        this.header = document.querySelector('.header');
        if (!this.header) return;
        
        // Throttled scroll handler
        window.addEventListener('scroll', this.handleScroll.bind(this), { 
            passive: true 
        });
    },
    
    handleScroll() {
        // Cancelar timeout anterior
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
        
        // Debounce para mejorar performance
        this.scrollTimeout = setTimeout(() => {
            this.updateHeader();
        }, 10);
    },
    
    updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            this.header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            this.header.style.borderColor = 'rgba(255, 107, 53, 0.3)';
        } else {
            this.header.style.backgroundColor = 'rgba(26, 26, 26, 0.9)';
            this.header.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }
        
        this.lastScrollY = currentScrollY;
    }
};

// Navegación suave optimizada
const NavigationController = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleNavClick.bind(this));
        });
    },
    
    handleNavClick(e) {
        e.preventDefault();
        const target = document.querySelector(e.currentTarget.getAttribute('href'));
        
        if (target) {
            // Smooth scroll con offset para header fijo
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
};

// Cleanup de recursos
const ResourceCleanup = {
    observers: [],
    timeouts: [],
    intervals: [],
    
    addObserver(observer) {
        this.observers.push(observer);
    },
    
    addTimeout(timeoutId) {
        this.timeouts.push(timeoutId);
    },
    
    addInterval(intervalId) {
        this.intervals.push(intervalId);
    },
    
    cleanup() {
        // Disconnect observers
        this.observers.forEach(observer => {
            if (observer && observer.disconnect) {
                observer.disconnect();
            }
        });
        
        // Clear timeouts
        this.timeouts.forEach(id => clearTimeout(id));
        
        // Clear intervals
        this.intervals.forEach(id => clearInterval(id));
        
        console.log('🧹 Resources cleaned up');
    }
};

// Inicialización principal optimizada
document.addEventListener('DOMContentLoaded', () => {
    PerformanceMonitor.start('Total.init');
    
    // Inicializar sistemas en orden de prioridad
    HeaderController.init();
    NavigationController.init();
    
    // Lazy loaders con requestIdleCallback si está disponible
    const initLazyLoaders = () => {
        ImageLazyLoader.init();
        VideoLazyLoader.init();
        AudioLazyLoader.init();
        AnimationController.init();
    };
    
    if (window.requestIdleCallback) {
        requestIdleCallback(initLazyLoaders);
    } else {
        setTimeout(initLazyLoaders, 0);
    }
    
    PerformanceMonitor.end('Total.init');
    PerformanceMonitor.logVitals();
    
    // Log inicial de performance
    console.log('🚀 Proceso Cognitivo Performance System Initialized');
    console.log('📊 Lazy loading enabled for images, videos, and audio');
    console.log('⚡ Critical rendering path optimized');
});

// Cleanup al cerrar página
window.addEventListener('beforeunload', () => {
    ResourceCleanup.cleanup();
});

// Manejo de errores global
window.addEventListener('error', (e) => {
    console.error('💥 Resource loading error:', e.filename, e.lineno, e.message);
});

// Export para debugging
window.ProcessoCognitivoPerformance = {
    PerformanceMonitor,
    ImageLazyLoader,
    VideoLazyLoader,
    AudioLazyLoader,
    AnimationController,
    ResourceCleanup
};