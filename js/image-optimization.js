/**
 * IMAGE OPTIMIZATION JAVASCRIPT
 * Performance enhancements for Sergio Forés Portfolio
 * 
 * Features:
 * - WebP support detection
 * - Lazy loading with Intersection Observer
 * - Progressive image loading
 * - Performance monitoring
 */

class ImageOptimizer {
    constructor() {
        this.supportsWebP = false;
        this.observer = null;
        this.init();
    }

    async init() {
        // Detect WebP support
        await this.detectWebPSupport();
        
        // Set up lazy loading
        this.setupLazyLoading();
        
        // Set up intersection observer for animations
        this.setupIntersectionObserver();
        
        // Monitor performance
        this.monitorPerformance();
    }

    // WebP Support Detection
    async detectWebPSupport() {
        try {
            const webpData = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
            const img = new Image();
            
            return new Promise((resolve) => {
                img.onload = img.onerror = () => {
                    this.supportsWebP = img.width === 2;
                    document.documentElement.classList.toggle('webp', this.supportsWebP);
                    document.documentElement.classList.toggle('no-webp', !this.supportsWebP);
                    resolve(this.supportsWebP);
                };
                img.src = webpData;
            });
        } catch (error) {
            console.warn('WebP detection failed:', error);
            this.supportsWebP = false;
            document.documentElement.classList.add('no-webp');
        }
    }

    // Lazy Loading Setup
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        this.observer.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });

            // Observe all lazy loading images
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            lazyImages.forEach(img => this.observer.observe(img));
        } else {
            // Fallback for browsers without Intersection Observer
            this.loadAllImages();
        }
    }

    // Load individual image
    loadImage(img) {
        const picture = img.closest('picture');
        
        if (picture) {
            // Handle picture element with WebP sources
            const sources = picture.querySelectorAll('source');
            sources.forEach(source => {
                if (source.dataset.srcset) {
                    source.srcset = source.dataset.srcset;
                }
            });
        }

        // Load the image
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }

        // Handle loading state
        img.addEventListener('load', () => {
            img.classList.add('loaded');
            
            // Performance measurement
            if ('performance' in window) {
                const loadTime = performance.now();
                console.log(`Image loaded: ${img.alt || img.src} in ${loadTime.toFixed(2)}ms`);
            }
        });

        img.addEventListener('error', () => {
            console.warn('Failed to load image:', img.src);
            img.classList.add('error');
        });
    }

    // Fallback: load all images
    loadAllImages() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => this.loadImage(img));
    }

    // Intersection Observer for animations
    setupIntersectionObserver() {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    // Optional: unobserve after animation
                    // animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe project cards for fade-in animation
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => animationObserver.observe(card));
    }

    // Performance Monitoring
    monitorPerformance() {
        if ('PerformanceObserver' in window) {
            try {
                // Monitor Largest Contentful Paint
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    console.log('LCP:', lastEntry.startTime.toFixed(2) + 'ms');
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

                // Monitor First Input Delay
                const fidObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        console.log('FID:', entry.processingStart - entry.startTime + 'ms');
                    });
                });
                fidObserver.observe({ entryTypes: ['first-input'] });

                // Monitor Cumulative Layout Shift
                const clsObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    let cls = 0;
                    entries.forEach(entry => {
                        if (!entry.hadRecentInput) {
                            cls += entry.value;
                        }
                    });
                    console.log('CLS:', cls.toFixed(4));
                });
                clsObserver.observe({ entryTypes: ['layout-shift'] });

            } catch (error) {
                console.warn('Performance monitoring setup failed:', error);
            }
        }
    }

    // Preload critical images
    preloadCriticalImages() {
        const criticalImages = [
            'img/proceso-cognitivo.webp',
            'img/sergio-dev.webp',
            'img/sergio-arte-plastica.webp'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            link.type = 'image/webp';
            document.head.appendChild(link);
        });
    }

    // Resource cleanup
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.imageOptimizer = new ImageOptimizer();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Resume optimizations if needed
        console.log('Page visible - resuming optimizations');
    }
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageOptimizer;
}