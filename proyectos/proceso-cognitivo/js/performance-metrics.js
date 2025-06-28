// ==========================================
// SISTEMA DE MÉTRICAS DE PERFORMANCE
// ==========================================

class PerformanceMetrics {
    constructor() {
        this.metrics = {
            timing: {},
            resources: [],
            vitals: {},
            customMetrics: {}
        };
        
        this.observers = [];
        this.init();
    }
    
    init() {
        // Métricas de timing básicas
        this.collectNavigationTiming();
        
        // Observer para recursos
        this.observeResources();
        
        // Core Web Vitals si están disponibles
        this.observeWebVitals();
        
        // Observer para long tasks
        this.observeLongTasks();
        
        // Custom metrics
        this.startCustomMetrics();
        
        console.log('📊 Performance Metrics System initialized');
    }
    
    collectNavigationTiming() {
        if (performance.timing) {
            const timing = performance.timing;
            this.metrics.timing = {
                domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
                loadComplete: timing.loadEventEnd - timing.navigationStart,
                firstPaint: this.getFirstPaint(),
                firstContentfulPaint: this.getFirstContentfulPaint()
            };
        }
    }
    
    getFirstPaint() {
        const paint = performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint');
        return paint ? paint.startTime : null;
    }
    
    getFirstContentfulPaint() {
        const paint = performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint');
        return paint ? paint.startTime : null;
    }
    
    observeResources() {
        if ('PerformanceObserver' in window) {
            const resourceObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    this.metrics.resources.push({
                        name: entry.name,
                        type: entry.initiatorType,
                        duration: entry.duration,
                        size: entry.transferSize || 0,
                        startTime: entry.startTime
                    });
                }
            });
            
            resourceObserver.observe({ entryTypes: ['resource'] });
            this.observers.push(resourceObserver);
        }
    }
    
    observeWebVitals() {
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint (LCP)
            try {
                const lcpObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        this.metrics.vitals.lcp = entry.startTime;
                    }
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
                this.observers.push(lcpObserver);
            } catch (e) {
                console.log('LCP observer not supported');
            }
            
            // First Input Delay (FID)
            try {
                const fidObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        this.metrics.vitals.fid = entry.processingStart - entry.startTime;
                    }
                });
                fidObserver.observe({ entryTypes: ['first-input'] });
                this.observers.push(fidObserver);
            } catch (e) {
                console.log('FID observer not supported');
            }
            
            // Cumulative Layout Shift (CLS)
            this.trackCLS();
        }
    }
    
    trackCLS() {
        let clsValue = 0;
        let clsEntries = [];
        
        try {
            const clsObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsEntries.push(entry);
                        clsValue += entry.value;
                    }
                }
                this.metrics.vitals.cls = clsValue;
            });
            
            clsObserver.observe({ entryTypes: ['layout-shift'] });
            this.observers.push(clsObserver);
        } catch (e) {
            console.log('CLS observer not supported');
        }
    }
    
    observeLongTasks() {
        if ('PerformanceObserver' in window) {
            try {
                const longTaskObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.duration > 50) {
                            console.warn(`⚠️ Long task detected: ${entry.duration.toFixed(2)}ms`);
                            this.metrics.customMetrics.longTasks = (this.metrics.customMetrics.longTasks || 0) + 1;
                        }
                    }
                });
                
                longTaskObserver.observe({ entryTypes: ['longtask'] });
                this.observers.push(longTaskObserver);
            } catch (e) {
                console.log('Long task observer not supported');
            }
        }
    }
    
    startCustomMetrics() {
        // Métricas de memoria
        this.trackMemoryUsage();
        
        // Métricas de multimedia
        this.trackMultimediaLoading();
        
        // Métricas de interacción
        this.trackUserInteractions();
    }
    
    trackMemoryUsage() {
        if (performance.memory) {
            setInterval(() => {
                this.metrics.customMetrics.memory = {
                    used: performance.memory.usedJSHeapSize,
                    total: performance.memory.totalJSHeapSize,
                    limit: performance.memory.jsHeapSizeLimit
                };
            }, 5000);
        }
    }
    
    trackMultimediaLoading() {
        // Track video loading performance
        document.querySelectorAll('video').forEach((video, index) => {
            video.addEventListener('loadstart', () => {
                this.metrics.customMetrics[`video_${index}_loadstart`] = performance.now();
            });
            
            video.addEventListener('canplaythrough', () => {
                const startTime = this.metrics.customMetrics[`video_${index}_loadstart`];
                if (startTime) {
                    this.metrics.customMetrics[`video_${index}_duration`] = performance.now() - startTime;
                    console.log(`🎬 Video ${index} loaded in ${this.metrics.customMetrics[`video_${index}_duration`].toFixed(2)}ms`);
                }
            });
        });
        
        // Track audio loading performance
        document.querySelectorAll('audio').forEach((audio, index) => {
            audio.addEventListener('loadstart', () => {
                this.metrics.customMetrics[`audio_${index}_loadstart`] = performance.now();
            });
            
            audio.addEventListener('canplaythrough', () => {
                const startTime = this.metrics.customMetrics[`audio_${index}_loadstart`];
                if (startTime) {
                    this.metrics.customMetrics[`audio_${index}_duration`] = performance.now() - startTime;
                    console.log(`🎵 Audio ${index} loaded in ${this.metrics.customMetrics[`audio_${index}_duration`].toFixed(2)}ms`);
                }
            });
        });
    }
    
    trackUserInteractions() {
        let interactionCount = 0;
        
        ['click', 'scroll', 'keydown'].forEach(eventType => {
            document.addEventListener(eventType, () => {
                interactionCount++;
                this.metrics.customMetrics.totalInteractions = interactionCount;
            }, { passive: true });
        });
        
        // Track scroll performance
        let scrollStartTime = null;
        let scrollTimeout = null;
        
        window.addEventListener('scroll', () => {
            if (!scrollStartTime) {
                scrollStartTime = performance.now();
            }
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrollDuration = performance.now() - scrollStartTime;
                if (scrollDuration > 16) { // More than one frame
                    console.warn(`⚠️ Slow scroll detected: ${scrollDuration.toFixed(2)}ms`);
                }
                scrollStartTime = null;
            }, 100);
        }, { passive: true });
    }
    
    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            metrics: this.metrics,
            recommendations: this.getRecommendations()
        };
        
        return report;
    }
    
    getRecommendations() {
        const recommendations = [];
        
        // Check LCP
        if (this.metrics.vitals.lcp > 2500) {
            recommendations.push('⚠️ LCP is poor (>2.5s). Consider optimizing largest content element.');
        } else if (this.metrics.vitals.lcp > 2000) {
            recommendations.push('🔶 LCP needs improvement (>2s). Consider image optimization.');
        }
        
        // Check FID
        if (this.metrics.vitals.fid > 100) {
            recommendations.push('⚠️ FID is poor (>100ms). Consider reducing JavaScript execution time.');
        }
        
        // Check CLS
        if (this.metrics.vitals.cls > 0.25) {
            recommendations.push('⚠️ CLS is poor (>0.25). Consider stabilizing layout.');
        } else if (this.metrics.vitals.cls > 0.1) {
            recommendations.push('🔶 CLS needs improvement (>0.1). Consider reducing layout shifts.');
        }
        
        // Check memory usage
        if (this.metrics.customMetrics.memory) {
            const memoryUsage = this.metrics.customMetrics.memory.used / this.metrics.customMetrics.memory.total;
            if (memoryUsage > 0.8) {
                recommendations.push('⚠️ High memory usage detected. Consider optimizing resource usage.');
            }
        }
        
        // Check long tasks
        if (this.metrics.customMetrics.longTasks > 5) {
            recommendations.push('⚠️ Multiple long tasks detected. Consider breaking up JavaScript execution.');
        }
        
        return recommendations;
    }
    
    logReport() {
        const report = this.generateReport();
        
        console.group('📊 Performance Report');
        console.log('🔍 Core Web Vitals:', this.metrics.vitals);
        console.log('⏱️ Timing Metrics:', this.metrics.timing);
        console.log('💾 Resource Count:', this.metrics.resources.length);
        console.log('🎯 Custom Metrics:', this.metrics.customMetrics);
        
        if (report.recommendations.length > 0) {
            console.log('💡 Recommendations:');
            report.recommendations.forEach(rec => console.log(rec));
        } else {
            console.log('✅ All metrics look good!');
        }
        
        console.groupEnd();
        
        return report;
    }
    
    cleanup() {
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers = [];
        console.log('🧹 Performance observers cleaned up');
    }
}

// Auto-initialize performance metrics
const performanceMetrics = new PerformanceMetrics();

// Generate report after page load
window.addEventListener('load', () => {
    setTimeout(() => {
        performanceMetrics.logReport();
    }, 3000); // Wait 3 seconds after load to get complete metrics
});

// Export para debugging
window.PerformanceMetrics = performanceMetrics;

export default PerformanceMetrics;