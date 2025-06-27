/**
 * MOBILE PERFORMANCE ENHANCER
 * Script de optimización avanzada para mobile UX
 * Implementa lazy loading robusto, error handling y preload optimization
 */

class MobilePerformanceEnhancer {
    constructor() {
        this.imageObserver = null;
        this.preloadedImages = new Set();
        this.failedImages = new Set();
        this.loadingImages = new Map();
        this.performanceMetrics = {
            totalImages: 0,
            loadedImages: 0,
            failedImages: 0,
            avgLoadTime: 0,
            webpSupport: this.detectWebPSupport()
        };
        
        this.init();
    }

    // Detectar soporte WebP para conditional loading
    detectWebPSupport() {
        return new Promise((resolve) => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }

    // Inicializar sistema de performance mobile
    init() {
        this.setupIntersectionObserver();
        this.preloadCriticalImages();
        this.setupErrorHandling();
        this.monitorPerformance();
        
        console.log('🚀 Mobile Performance Enhancer initialized');
    }

    // Configurar Intersection Observer para lazy loading eficiente
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '50px 0px 200px 0px', // Preload antes de que sea visible
            threshold: 0.1
        };

        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImageOptimized(entry.target);
                    this.imageObserver.unobserve(entry.target);
                }
            });
        }, options);

        // Observar todas las imágenes lazy
        this.observeImages();
    }

    // Observar imágenes para lazy loading
    observeImages() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            this.imageObserver.observe(img);
            this.performanceMetrics.totalImages++;
        });
    }

    // Carga optimizada de imagen con error handling
    async loadImageOptimized(img) {
        const startTime = performance.now();
        const originalSrc = img.src;
        
        try {
            // Añadir clase loading para transiciones suaves
            img.classList.add('loading');
            
            // Crear imagen temporal para preload
            const tempImage = new Image();
            
            await new Promise((resolve, reject) => {
                tempImage.onload = () => {
                    const loadTime = performance.now() - startTime;
                    this.updatePerformanceMetrics(loadTime, true);
                    
                    // Transición suave al cargar
                    img.src = tempImage.src;
                    img.classList.remove('loading');
                    img.classList.add('loaded');
                    
                    resolve();
                };
                
                tempImage.onerror = () => {
                    this.handleImageError(img, originalSrc);
                    reject(new Error(`Failed to load: ${originalSrc}`));
                };
                
                tempImage.src = originalSrc;
            });
            
        } catch (error) {
            console.warn('Image load failed:', error);
        }
    }

    // Manejo robusto de errores de imágenes
    handleImageError(img, failedSrc) {
        this.failedImages.add(failedSrc);
        this.performanceMetrics.failedImages++;
        
        // Remover clases de loading
        img.classList.remove('loading');
        img.classList.add('error');
        
        // Fallback a placeholder o imagen por defecto
        const fallbackSrc = this.generateFallbackImage(img);
        if (fallbackSrc && fallbackSrc !== failedSrc) {
            img.src = fallbackSrc;
            console.log(`🔄 Fallback applied for: ${failedSrc} → ${fallbackSrc}`);
        } else {
            // Si no hay fallback, mostrar placeholder SVG
            img.src = this.generatePlaceholderSVG(img.alt);
            console.log(`📷 Placeholder generated for: ${failedSrc}`);
        }
    }

    // Generar fallback inteligente
    generateFallbackImage(img) {
        const src = img.src;
        
        // Si falla WebP, intentar JPG/PNG
        if (src.includes('.webp')) {
            const jpgFallback = src.replace('.webp', '.jpg');
            const pngFallback = src.replace('.webp', '.png');
            
            // Retornar JPG si existe, sino PNG
            return jpgFallback;
        }
        
        return null;
    }

    // Generar placeholder SVG dinámico
    generatePlaceholderSVG(altText = 'Image') {
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
                <rect width="400" height="300" fill="#f3f4f6"/>
                <rect x="150" y="100" width="100" height="100" rx="50" fill="#d1d5db"/>
                <text x="200" y="220" text-anchor="middle" font-family="system-ui" font-size="14" fill="#6b7280">
                    ${altText}
                </text>
            </svg>
        `;
        
        return `data:image/svg+xml;base64,${btoa(svg)}`;
    }

    // Precargar imágenes críticas above-the-fold
    preloadCriticalImages() {
        const criticalImages = document.querySelectorAll('img[data-preload="true"], .hero img, .project-card:nth-child(-n+3) img');
        
        criticalImages.forEach(img => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = img.src;
            
            document.head.appendChild(link);
            this.preloadedImages.add(img.src);
        });
        
        console.log(`⚡ Preloaded ${criticalImages.length} critical images`);
    }

    // Configurar error handling global
    setupErrorHandling() {
        // Error handling para imágenes que fallan al cargar
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                this.handleImageError(e.target, e.target.src);
            }
        }, true);
    }

    // Monitorear métricas de performance
    monitorPerformance() {
        // Observer para Core Web Vitals
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'largest-contentful-paint') {
                        console.log(`📊 LCP: ${entry.startTime.toFixed(2)}ms`);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }

        // Report de performance cada 30 segundos
        setInterval(() => {
            this.generatePerformanceReport();
        }, 30000);
    }

    // Actualizar métricas de performance
    updatePerformanceMetrics(loadTime, success) {
        if (success) {
            this.performanceMetrics.loadedImages++;
            const currentAvg = this.performanceMetrics.avgLoadTime;
            const loadedCount = this.performanceMetrics.loadedImages;
            
            this.performanceMetrics.avgLoadTime = 
                (currentAvg * (loadedCount - 1) + loadTime) / loadedCount;
        } else {
            this.performanceMetrics.failedImages++;
        }
    }

    // Generar reporte de performance
    generatePerformanceReport() {
        const metrics = this.performanceMetrics;
        const successRate = ((metrics.loadedImages / metrics.totalImages) * 100).toFixed(1);
        
        const report = {
            timestamp: new Date().toISOString(),
            total_images: metrics.totalImages,
            loaded_images: metrics.loadedImages,
            failed_images: metrics.failedImages,
            success_rate: `${successRate}%`,
            avg_load_time: `${metrics.avgLoadTime.toFixed(2)}ms`,
            webp_support: metrics.webpSupport,
            preloaded_images: this.preloadedImages.size,
            performance_score: this.calculatePerformanceScore()
        };

        console.log('📈 Mobile Performance Report:', report);
        
        // Enviar métricas si hay analytics configurado
        if (window.gtag) {
            window.gtag('event', 'image_performance', {
                success_rate: parseFloat(successRate),
                avg_load_time: metrics.avgLoadTime,
                failed_images: metrics.failedImages
            });
        }

        return report;
    }

    // Calcular score de performance
    calculatePerformanceScore() {
        const metrics = this.performanceMetrics;
        const successRate = (metrics.loadedImages / metrics.totalImages) * 100;
        const avgLoadTime = metrics.avgLoadTime;
        
        if (successRate >= 95 && avgLoadTime <= 500) return 'EXCELLENT';
        if (successRate >= 90 && avgLoadTime <= 1000) return 'GOOD';
        if (successRate >= 80 && avgLoadTime <= 2000) return 'NEEDS_IMPROVEMENT';
        return 'POOR';
    }

    // Añadir estilos CSS para transiciones suaves
    injectPerformanceCSS() {
        const css = `
            img.loading {
                opacity: 0.6;
                filter: blur(2px);
                transition: all 0.3s ease-out;
            }
            
            img.loaded {
                opacity: 1;
                filter: blur(0px);
            }
            
            img.error {
                opacity: 0.8;
                border: 2px dashed #d1d5db;
                background: #f9fafb;
            }
            
            @media (prefers-reduced-motion: reduce) {
                img.loading,
                img.loaded {
                    transition: none;
                }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }

    // API pública para obtener métricas
    getMetrics() {
        return this.performanceMetrics;
    }

    // API pública para forzar reporte
    forceReport() {
        return this.generatePerformanceReport();
    }
}

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.mobilePerformanceEnhancer = new MobilePerformanceEnhancer();
    });
} else {
    window.mobilePerformanceEnhancer = new MobilePerformanceEnhancer();
}

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobilePerformanceEnhancer;
}