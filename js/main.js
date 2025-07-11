// Header transparente y hide/show según scroll - FUNCIONALIDAD COMPLETA
const header = document.querySelector('.header');
let lastScrollTop = 0;
let ticking = false;

function updateHeader() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Header transparente/opaco según scroll
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide/show header según dirección del scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down - ocultar header
        header.classList.add('hidden');
        console.log('🔽 HEADER OCULTO - Scroll down:', scrollTop);
    } else if (scrollTop < lastScrollTop) {
        // Scrolling up - mostrar header
        header.classList.remove('hidden');
        console.log('🔼 HEADER VISIBLE - Scroll up:', scrollTop);
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
});

// Lazy loading deshabilitado para carga inmediata
// const cards = document.querySelectorAll('.project-card');

// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.style.opacity = '1';
//             entry.target.style.transform = 'translateY(0)';
//         }
//     });
// });

// cards.forEach(card => {
//     card.style.opacity = '0';
//     card.style.transform = 'translateY(20px)';
//     card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
//     observer.observe(card);
// });

// Smooth scrolling para navegación con offset preciso para header fijo
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Cálculo pixel perfect del offset para ocultar completamente el video
            const headerHeight = document.querySelector('.header').offsetHeight || 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight + 69;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Actualizar estados dinámicamente
const updateProjectStatus = () => {
    const statusElements = document.querySelectorAll('.project-status');
    const now = new Date();
    
    statusElements.forEach(status => {
        // Animación sutil para estados activos
        if (status.classList.contains('status-active')) {
            setInterval(() => {
                status.style.opacity = status.style.opacity === '0.5' ? '1' : '0.5';
            }, 2000);
        }
    });
};

updateProjectStatus();

// Navigation Active State Management - ELEGANT INTERSECTION OBSERVER SOLUTION
class NavigationManager {
    constructor() {
        this.currentSection = '';
        this.navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
        this.sections = ['sergio', 'sistema01234', 'cerebro', 'playground'];
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupClickHandlers();
        this.setupScrollListener();
    }
    
    setupIntersectionObserver() {
        // Create observer with better settings for real-time navigation
        const observer = new IntersectionObserver((entries) => {
            // Check if we're at the very top first
            if (window.scrollY < 100) {
                this.clearActiveStates();
                console.log('🔝 At top - clearing all active states');
                return;
            }
            
            // Find the section with the largest intersection ratio
            let maxRatio = 0;
            let activeSection = '';
            
            entries.forEach(entry => {
                if (entry.intersectionRatio > maxRatio) {
                    maxRatio = entry.intersectionRatio;
                    activeSection = entry.target.id;
                }
            });
            
            // Update active state if we have any meaningful intersection
            if (maxRatio > 0.1 && activeSection) {
                this.updateActiveLink(activeSection);
                console.log('🎯 Section active:', activeSection, 'ratio:', maxRatio.toFixed(2));
            }
        }, {
            // Reduced root margin for better detection
            rootMargin: '-80px 0px -40% 0px',
            threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0]
        });
        
        // Observe all navigation sections
        this.sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                observer.observe(section);
                console.log('👀 Observing section:', sectionId);
            } else {
                console.warn('❌ Section not found:', sectionId);
            }
        });
    }
    
    setupClickHandlers() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Immediate visual feedback
                const targetId = link.getAttribute('href').substring(1);
                this.updateActiveLink(targetId);
                
                // Let the Intersection Observer handle the rest after scroll
            });
        });
    }
    
    updateActiveLink(sectionId) {
        if (this.currentSection === sectionId) return; // Avoid unnecessary updates
        
        this.currentSection = sectionId;
        
        // Update active states
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href === `#${sectionId}`) {
                link.classList.add('active');
                console.log('✅ Menu item activated:', link.textContent, 'for section:', sectionId);
            }
        });
    }
    
    setupScrollListener() {
        // Additional scroll listener to handle top detection
        window.addEventListener('scroll', () => {
            if (window.scrollY < 100) {
                this.clearActiveStates();
            }
        });
    }
    
    clearActiveStates() {
        // Remove all active states
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        this.currentSection = '';
    }
}

// Initialize the elegant navigation system
document.addEventListener('DOMContentLoaded', () => {
    const navManager = new NavigationManager();
    // Make navManager globally accessible for logo click
    window.navManager = navManager;
    // Start with no active states when page loads
    navManager.clearActiveStates();
});

// Back to Top Button functionality
const backToTopButton = document.getElementById('backToTop');

function toggleBackToTopButton() {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
}

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    toggleBackToTopButton();
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        menuToggle.classList.toggle('open');
    });

    // Close menu when a nav link is clicked
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('open');
            menuToggle.classList.remove('open');
        });
    });
}

// Initialize on load
toggleBackToTopButton();

// Dynamic year in footer
document.addEventListener('DOMContentLoaded', () => {
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
// ===== PERFORMANCE OPTIMIZATIONS =====
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
        console.log('🚀 Image Optimizer initializing...');
        
        // CRITICAL FIX: Remove blur from all images immediately
        this.fixBlurredImages();
        
        // Detect WebP support
        await this.detectWebPSupport();
        
        // Set up lazy loading
        this.setupLazyLoading();
        
        // Set up intersection observer for animations
        this.setupIntersectionObserver();
        
        // Setup logo scroll to top
        this.setupLogoScrollToTop();
        
        // Monitor performance
        this.monitorPerformance();
        
        console.log('✅ Image Optimizer ready!');
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
        
        // CRITICAL FIX: Remove blur immediately for production
        this.removeBlurFilter(img);
        
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
            
            // CRITICAL FIX: Ensure blur is completely removed on load
            this.removeBlurFilter(img);
            
            // Performance measurement
            if ('performance' in window) {
                const loadTime = performance.now();
                console.log(`✅ Image loaded: ${img.alt || img.src} in ${loadTime.toFixed(2)}ms`);
            }
        });

        img.addEventListener('error', () => {
            console.warn('❌ Failed to load image:', img.src);
            img.classList.add('error');
            
            // CRITICAL FIX: Remove blur even on error
            this.removeBlurFilter(img);
        });
    }

    // CRITICAL FIX: Remove blur filter from images
    removeBlurFilter(img) {
        // Force remove filter and transform
        img.style.filter = 'none';
        img.style.transform = 'none';
        img.style.opacity = '1';
        
        // Remove lazy loading class if present
        img.classList.remove('lazy-loading');
        
        // Add loaded class
        img.classList.add('loaded');
        
        console.log(`🔧 Blur removed from: ${img.alt || img.src}`);
    }
    
    // Fallback: load all images
    loadAllImages() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            this.removeBlurFilter(img);
            this.loadImage(img);
        });
    }

    // Intersection Observer eliminado - mejor UX y performance
    setupIntersectionObserver() {
        // Mostrar todos los project cards inmediatamente
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.classList.add('in-view');
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }

    // Setup logo scroll to top functionality
    setupLogoScrollToTop() {
        const logoLink = document.querySelector('.logo-link');
        if (logoLink) {
            logoLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                // Desactivar estados active del menú directamente
                const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                console.log('🏠 Logo clicked - All nav states cleared');
            });
        }
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

    // Preload critical images - Adaptive Strategy (Fixed Chrome Warnings)
    async preloadCriticalImages() {
        const criticalImages = [
            { webp: 'img/sergio-arte-plastica.webp', fallback: 'img/sergio-arte-plastica.jpg', priority: 'high' },
            { webp: 'img/proceso-cognitivo.webp', fallback: 'img/proceso-cognitivo.jpg', priority: 'medium' },
            { webp: 'img/sergio-dev.webp', fallback: 'img/sergio-dev.jpg', priority: 'medium' }
        ];

        for (const img of criticalImages) {
            try {
                // Test if WebP exists before preloading
                await this.testImageExists(img.webp);
                this.createPreloadLink(img.webp, 'image/webp');
            } catch {
                // Fallback to JPG if WebP doesn't exist (prevents 404 preloads)
                this.createPreloadLink(img.fallback, 'image/jpeg');
            }
        }
    }

    // Test if image resource exists
    async testImageExists(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => reject(false);
            img.src = url;
        });
    }

    // Create preload link element
    createPreloadLink(href, type) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = href;
        link.type = type;
        document.head.appendChild(link);
    }

    // CRITICAL FIX: Remove blur from all images immediately
    fixBlurredImages() {
        console.log('🔧 Fixing blurred images...');
        
        // Find all potentially blurred images
        const allImages = document.querySelectorAll('.project-screenshot img, img[loading="lazy"]');
        
        allImages.forEach((img, index) => {
            this.removeBlurFilter(img);
            console.log(`🔧 Fixed image ${index + 1}: ${img.alt || 'No alt'}`);
        });
        
        console.log(`✅ Fixed ${allImages.length} images`);
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