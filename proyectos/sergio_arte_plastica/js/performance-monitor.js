/**
 * SERGIO ARTE PLÁSTICA - Performance Monitor
 * Monitoreo de rendimiento en tiempo real
 */

class PerformanceMonitor {
    constructor() {
        this.metrics = {
            imageLoadTimes: [],
            totalLoadTime: 0,
            galleryLoadTime: 0
        };
        this.init();
    }

    init() {
        this.startMonitoring();
        this.monitorImageLoads();
        this.reportMetrics();
    }

    startMonitoring() {
        this.metrics.startTime = performance.now();
        
        // Monitorear Web Vitals
        if ('web-vital' in window) {
            this.measureWebVitals();
        }
        
        // Listener para cuando termine la carga
        window.addEventListener('load', () => {
            this.metrics.totalLoadTime = performance.now() - this.metrics.startTime;
            console.log(`📊 Tiempo total de carga: ${Math.round(this.metrics.totalLoadTime)}ms`);
        });
    }

    monitorImageLoads() {
        const images = document.querySelectorAll('.artwork-image, .carousel-image');
        let loadedImages = 0;
        const totalImages = images.length;

        images.forEach((img, index) => {
            const startTime = performance.now();
            
            const onLoad = () => {
                const loadTime = performance.now() - startTime;
                this.metrics.imageLoadTimes.push(loadTime);
                loadedImages++;
                
                console.log(`🖼️ Imagen ${index + 1}/${totalImages} cargada: ${Math.round(loadTime)}ms`);
                
                if (loadedImages === totalImages) {
                    this.calculateImageMetrics();
                }
            };

            if (img.complete) {
                onLoad();
            } else {
                img.addEventListener('load', onLoad);
                img.addEventListener('error', () => {
                    console.warn(`❌ Error cargando imagen: ${img.src}`);
                });
            }
        });
    }

    calculateImageMetrics() {
        const { imageLoadTimes } = this.metrics;
        
        if (imageLoadTimes.length > 0) {
            const average = imageLoadTimes.reduce((a, b) => a + b, 0) / imageLoadTimes.length;
            const slowest = Math.max(...imageLoadTimes);
            const fastest = Math.min(...imageLoadTimes);
            
            console.log('📈 MÉTRICAS DE IMÁGENES:');
            console.log(`   • Total imágenes: ${imageLoadTimes.length}`);
            console.log(`   • Tiempo promedio: ${Math.round(average)}ms`);
            console.log(`   • Más rápida: ${Math.round(fastest)}ms`);
            console.log(`   • Más lenta: ${Math.round(slowest)}ms`);
            
            // Advertencias de performance
            if (average > 500) {
                console.warn('⚠️ Tiempo promedio de carga alto. Considera optimizar imágenes.');
            }
            
            if (slowest > 1000) {
                console.warn('⚠️ Algunas imágenes tardan más de 1 segundo. Revisa tamaños.');
            }
        }
    }

    measureWebVitals() {
        // Largest Contentful Paint (LCP)
        if (typeof PerformanceObserver !== 'undefined') {
            try {
                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    const lcp = lastEntry.startTime;
                    
                    console.log(`📊 LCP: ${Math.round(lcp)}ms`);
                    
                    if (lcp > 2500) {
                        console.warn('⚠️ LCP alto. Objetivo: < 2500ms');
                    } else {
                        console.log('✅ LCP dentro del objetivo');
                    }
                });
                
                observer.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                console.log('ℹ️ Performance Observer no disponible');
            }
        }
    }

    reportMetrics() {
        // Reportar métricas después de 3 segundos
        setTimeout(() => {
            console.log('\n🎨 REPORTE FINAL DE PERFORMANCE:');
            console.log('=====================================');
            console.log(`⏱️ Tiempo total: ${Math.round(this.metrics.totalLoadTime)}ms`);
            console.log(`🖼️ Imágenes cargadas: ${this.metrics.imageLoadTimes.length}`);
            
            if (typeof GALLERY_DATA !== 'undefined') {
                console.log(`📊 Obras en galería: ${GALLERY_DATA.length}`);
                
                // Contar por categoría
                const categories = {};
                GALLERY_DATA.forEach(artwork => {
                    categories[artwork.category] = (categories[artwork.category] || 0) + 1;
                });
                
                console.log('📋 Por categoría:', categories);
            }
            
            // Consejos de optimización
            this.displayOptimizationTips();
            
        }, 3000);
    }

    displayOptimizationTips() {
        const tips = [];
        
        if (this.metrics.totalLoadTime > 2000) {
            tips.push('⚡ Considera implementar lazy loading para imágenes');
        }
        
        if (this.metrics.imageLoadTimes.length > 10) {
            tips.push('🎯 Reduce el número de imágenes visibles inicialmente');
        }
        
        if (tips.length > 0) {
            console.log('\n💡 CONSEJOS DE OPTIMIZACIÓN:');
            tips.forEach(tip => console.log(`   ${tip}`));
        } else {
            console.log('\n✅ ¡Performance excelente!');
        }
    }

    // Método público para obtener métricas
    getMetrics() {
        return {
            ...this.metrics,
            averageImageLoad: this.metrics.imageLoadTimes.length > 0 
                ? this.metrics.imageLoadTimes.reduce((a, b) => a + b, 0) / this.metrics.imageLoadTimes.length 
                : 0
        };
    }
}

// Inicializar automáticamente en desarrollo
if (window.location.protocol === 'file:' || window.location.hostname === 'localhost') {
    document.addEventListener('DOMContentLoaded', () => {
        window.performanceMonitor = new PerformanceMonitor();
    });
}

// Exportar para uso manual
window.PerformanceMonitor = PerformanceMonitor;