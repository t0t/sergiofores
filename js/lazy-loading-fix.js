/**
 * LAZY LOADING FIX - OPTIMIZED IMPLEMENTATION
 * Sergio Forés Portfolio - Performance Engineer Solution
 * 
 * Fixes permanent blur issue in lazy loading implementation
 * Ensures smooth blur-to-clear transitions
 * Cross-browser compatibility
 * Performance-optimized image loading
 */

class LazyLoadingFix {
    constructor() {
        this.imageLoadedCount = 0;
        this.totalImages = 0;
        this.loadingQueue = new Set();
        this.failedImages = new Set();
        this.performanceMetrics = {
            startTime: performance.now(),
            imageLoadTimes: [],
            blurTransitionTimes: []
        };
        
        this.init();
    }

    init() {
        console.group('🚀 LAZY LOADING FIX - INITIALIZING');
        console.log('Fixing permanent blur issue...');
        
        // Remove any existing broken lazy loading
        this.cleanupExistingLazyLoading();
        
        // Setup optimized intersection observer
        this.setupOptimizedLazyLoading();
        
        // Setup immediate loading for critical images
        this.loadCriticalImages();
        
        // Monitor performance
        this.setupPerformanceMonitoring();
        
        console.log(`✅ Initialized - ${this.totalImages} images detected`);
        console.groupEnd();
    }

    cleanupExistingLazyLoading() {
        // Remove blur from all images that might be stuck
        const blurredImages = document.querySelectorAll('.project-screenshot img[loading="lazy"]');
        
        blurredImages.forEach((img, index) => {
            // Force remove blur immediately
            img.style.filter = 'none';
            img.style.transform = 'none';
            img.classList.remove('lazy-loading');
            
            console.log(`🧹 Cleaned image ${index + 1}: ${img.alt || 'No alt'}`);
        });
    }

    setupOptimizedLazyLoading() {
        if (!('IntersectionObserver' in window)) {
            console.warn('IntersectionObserver not supported - loading all images immediately');
            this.loadAllImagesImmediately();
            return;
        }

        // Create optimized intersection observer
        this.lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImageWithTransition(entry.target);
                    this.lazyImageObserver.unobserve(entry.target);
                }
            });
        }, {
            // Load images 200px before they enter viewport
            rootMargin: '200px 0px',
            threshold: 0.01
        });

        // Find all lazy images and setup loading
        const lazyImages = document.querySelectorAll('.project-screenshot img');
        this.totalImages = lazyImages.length;

        lazyImages.forEach((img, index) => {
            // Only apply lazy loading to images not in critical area
            if (this.isCriticalImage(img, index)) {
                this.loadImageImmediately(img);
            } else {
                this.setupImageForLazyLoading(img);
                this.lazyImageObserver.observe(img);
            }
        });
    }

    isCriticalImage(img, index) {
        // First 3 images are considered critical (above fold)
        if (index < 3) return true;
        
        // Images in first section are critical
        const firstSection = document.querySelector('.projects-grid');
        if (firstSection && firstSection.contains(img)) {
            const sectionImages = firstSection.querySelectorAll('img');
            return Array.from(sectionImages).indexOf(img) < 3;
        }
        
        return false;
    }

    setupImageForLazyLoading(img) {
        // Store original src if not already stored
        if (!img.dataset.originalSrc) {
            img.dataset.originalSrc = img.src;
        }
        
        // Create placeholder if src is not a data URL
        if (!img.src.startsWith('data:')) {
            img.src = this.createPlaceholderDataURL(400, 250);
        }
        
        // Add loading class for CSS styling
        img.classList.add('lazy-loading');
        
        // Apply initial blur with CSS transition
        img.style.transition = 'filter 0.5s ease-out, transform 0.5s ease-out';
        img.style.filter = 'blur(10px)';
        img.style.transform = 'scale(1.05)';
    }

    loadImageWithTransition(img) {
        const startTime = performance.now();
        this.loadingQueue.add(img);
        
        console.log(`📸 Loading image: ${img.alt || img.dataset.originalSrc}`);
        
        // Create new image element to preload
        const tempImage = new Image();
        
        // Setup load handlers
        tempImage.onload = () => {
            this.handleImageLoadSuccess(img, tempImage, startTime);
        };
        
        tempImage.onerror = () => {
            this.handleImageLoadError(img, startTime);
        };
        
        // Handle timeout (slow networks)
        const timeoutId = setTimeout(() => {
            if (this.loadingQueue.has(img)) {
                console.warn(`⏰ Image loading timeout: ${img.alt}`);
                this.handleImageLoadError(img, startTime);
            }
        }, 10000); // 10 second timeout
        
        // Store timeout ID for cleanup
        img.dataset.timeoutId = timeoutId;
        
        // Start loading
        const srcToLoad = img.dataset.originalSrc || img.src;
        tempImage.src = srcToLoad;
    }

    handleImageLoadSuccess(img, tempImage, startTime) {
        const loadTime = performance.now() - startTime;
        
        // Clear timeout
        if (img.dataset.timeoutId) {
            clearTimeout(parseInt(img.dataset.timeoutId));
            delete img.dataset.timeoutId;
        }
        
        // Update src
        img.src = tempImage.src;
        
        // Start transition to clear
        const transitionStart = performance.now();
        
        // Remove blur and scale with smooth transition
        requestAnimationFrame(() => {
            img.style.filter = 'none';
            img.style.transform = 'none';
            img.classList.remove('lazy-loading');
            img.classList.add('loaded');
            
            // Track transition completion
            img.addEventListener('transitionend', () => {
                const transitionTime = performance.now() - transitionStart;
                this.performanceMetrics.blurTransitionTimes.push(transitionTime);
                console.log(`✨ Transition completed in ${transitionTime.toFixed(2)}ms`);
            }, { once: true });
        });
        
        this.loadingQueue.delete(img);
        this.imageLoadedCount++;
        this.performanceMetrics.imageLoadTimes.push(loadTime);
        
        console.log(`✅ Image loaded in ${loadTime.toFixed(2)}ms: ${img.alt || 'No alt'}`);
        console.log(`📊 Progress: ${this.imageLoadedCount}/${this.totalImages} images loaded`);
        
        // Trigger load complete check
        if (this.imageLoadedCount === this.totalImages) {
            this.onAllImagesLoaded();
        }
    }

    handleImageLoadError(img, startTime) {
        const loadTime = performance.now() - startTime;
        
        // Clear timeout
        if (img.dataset.timeoutId) {
            clearTimeout(parseInt(img.dataset.timeoutId));
            delete img.dataset.timeoutId;
        }
        
        console.error(`❌ Failed to load image: ${img.alt || img.dataset.originalSrc}`);
        
        // Remove blur even on error
        img.style.filter = 'none';
        img.style.transform = 'none';
        img.classList.remove('lazy-loading');
        img.classList.add('error');
        
        // Add error placeholder
        img.alt = `${img.alt || 'Image'} (failed to load)`;
        
        this.loadingQueue.delete(img);
        this.failedImages.add(img);
        this.imageLoadedCount++; // Count as processed
        
        if (this.imageLoadedCount === this.totalImages) {
            this.onAllImagesLoaded();
        }
    }

    loadImageImmediately(img) {
        console.log(`⚡ Loading critical image immediately: ${img.alt}`);
        
        // Remove any lazy loading artifacts
        img.style.filter = 'none';
        img.style.transform = 'none';
        img.classList.remove('lazy-loading');
        img.classList.add('critical');
        
        // Ensure high priority loading
        img.loading = 'eager';
        img.decoding = 'sync';
        
        this.imageLoadedCount++;
    }

    loadCriticalImages() {
        // Preload critical images for better LCP
        const criticalImageUrls = [
            'img/proceso-cognitivo.jpg',
            'img/sergio-dev.jpg', 
            'img/sergio-arte-plastica.webp'
        ];
        
        criticalImageUrls.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = url;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }

    loadAllImagesImmediately() {
        // Fallback for browsers without IntersectionObserver
        const allImages = document.querySelectorAll('.project-screenshot img');
        
        allImages.forEach(img => {
            this.loadImageImmediately(img);
        });
        
        console.log('🔄 Fallback: All images loaded immediately');
    }

    createPlaceholderDataURL(width, height) {
        // Create a simple colored placeholder
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        
        // Create gradient placeholder
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#f3f4f6');
        gradient.addColorStop(1, '#e5e7eb');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        return canvas.toDataURL('image/png', 0.1);
    }

    setupPerformanceMonitoring() {
        // Monitor Core Web Vitals impact
        if ('PerformanceObserver' in window) {
            try {
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    console.log(`📊 LCP: ${lastEntry.startTime.toFixed(2)}ms`);
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (error) {
                console.warn('Performance monitoring setup failed:', error);
            }
        }
    }

    onAllImagesLoaded() {
        const totalTime = performance.now() - this.performanceMetrics.startTime;
        
        console.group('🎉 ALL IMAGES LOADED');
        console.log(`⏱️ Total loading time: ${totalTime.toFixed(2)}ms`);
        console.log(`✅ Successfully loaded: ${this.imageLoadedCount - this.failedImages.size}`);
        console.log(`❌ Failed to load: ${this.failedImages.size}`);
        
        if (this.performanceMetrics.imageLoadTimes.length > 0) {
            const avgLoadTime = this.performanceMetrics.imageLoadTimes.reduce((a, b) => a + b) / this.performanceMetrics.imageLoadTimes.length;
            console.log(`📈 Average load time: ${avgLoadTime.toFixed(2)}ms`);
        }
        
        if (this.performanceMetrics.blurTransitionTimes.length > 0) {
            const avgTransitionTime = this.performanceMetrics.blurTransitionTimes.reduce((a, b) => a + b) / this.performanceMetrics.blurTransitionTimes.length;
            console.log(`✨ Average transition time: ${avgTransitionTime.toFixed(2)}ms`);
        }
        
        console.log('🚀 Lazy loading optimization complete!');
        console.groupEnd();
        
        // Cleanup
        this.cleanup();
    }

    cleanup() {
        if (this.lazyImageObserver) {
            this.lazyImageObserver.disconnect();
        }
        
        // Clear any remaining timeouts
        document.querySelectorAll('img[data-timeout-id]').forEach(img => {
            clearTimeout(parseInt(img.dataset.timeoutId));
            delete img.dataset.timeoutId;
        });
    }

    // Public API for manual intervention
    forceLoadAll() {
        console.log('🔧 Force loading all remaining images...');
        
        const stillLoading = document.querySelectorAll('.project-screenshot img.lazy-loading');
        stillLoading.forEach(img => {
            this.loadImageWithTransition(img);
        });
    }

    getStatus() {
        return {
            total: this.totalImages,
            loaded: this.imageLoadedCount,
            failed: this.failedImages.size,
            loading: this.loadingQueue.size,
            isComplete: this.imageLoadedCount === this.totalImages
        };
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure other scripts have run
    setTimeout(() => {
        window.lazyLoadingFix = new LazyLoadingFix();
        
        // Make manual controls available
        window.forceLoadAllImages = () => window.lazyLoadingFix.forceLoadAll();
        window.getLazyLoadingStatus = () => window.lazyLoadingFix.getStatus();
        
        console.log('💡 Manual controls available:');
        console.log('  window.forceLoadAllImages() - Force load all remaining images');
        console.log('  window.getLazyLoadingStatus() - Get loading status');
    }, 100);
});

// Handle visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && window.lazyLoadingFix) {
        console.log('👁️ Page visible - checking lazy loading status');
        
        const status = window.lazyLoadingFix.getStatus();
        if (!status.isComplete) {
            console.log(`⚡ Auto-loading remaining ${status.total - status.loaded} images`);
            window.lazyLoadingFix.forceLoadAll();
        }
    }
});