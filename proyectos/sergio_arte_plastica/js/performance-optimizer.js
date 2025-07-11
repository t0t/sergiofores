/**
 * SERGIO ARTE PLÁSTICA - Performance Optimizer
 * Scripts para optimización de rendimiento y performance
 */

const fs = require('fs');
const path = require('path');

// ===== CONFIGURACIÓN DE PERFORMANCE =====
const PERFORMANCE_CONFIG = {
    // Lazy loading
    INTERSECTION_THRESHOLD: 0.1,
    LOADING_DELAY: 100,
    
    // Image optimization
    WEBP_QUALITY: 85,
    AVIF_QUALITY: 80,
    
    // Preloading
    CRITICAL_IMAGES: 3,
    PREFETCH_IMAGES: 5,
    
    // Caching
    CACHE_VERSION: '1.0.0',
    CACHE_DURATION: 7 * 24 * 60 * 60 * 1000, // 7 días
    
    // Performance budgets
    MAX_IMAGE_SIZE: 500, // KB
    MAX_TOTAL_SIZE: 2000, // KB
    TARGET_LCP: 2500, // ms
    TARGET_FID: 100 // ms
};

// ===== GENERADOR DE LAZY LOADING =====
class LazyLoadingGenerator {
    constructor() {
        this.template = '';
    }

    /**
     * Generar código de lazy loading optimizado
     */
    generateLazyLoadingCode() {
        return `
/**
 * Lazy Loading Optimizado para Sergio Arte Plástica
 */
class OptimizedLazyLoader {
    constructor() {
        this.imageObserver = null;
        this.loadedImages = new Set();
        this.init();
    }

    init() {
        // Verificar soporte para IntersectionObserver
        if (!('IntersectionObserver' in window)) {
            this.fallbackLoad();
            return;
        }

        this.setupObserver();
        this.observeImages();
    }

    setupObserver() {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: ${PERFORMANCE_CONFIG.INTERSECTION_THRESHOLD}
        };

        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.imageObserver.unobserve(entry.target);
                }
            });
        }, options);
    }

    observeImages() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            this.imageObserver.observe(img);
        });
    }

    loadImage(img) {
        const src = img.dataset.src;
        if (!src || this.loadedImages.has(src)) return;

        // Crear nueva imagen para precargar
        const imageLoader = new Image();
        
        imageLoader.onload = () => {
            setTimeout(() => {
                img.src = src;
                img.classList.add('loaded');
                this.loadedImages.add(src);
                
                // Remover data-src después de cargar
                img.removeAttribute('data-src');
            }, ${PERFORMANCE_CONFIG.LOADING_DELAY});
        };

        imageLoader.onerror = () => {
            img.classList.add('error');
            console.warn('Error cargando imagen:', src);
        };

        imageLoader.src = src;
    }

    fallbackLoad() {
        // Fallback para navegadores sin IntersectionObserver
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    // Precargar imágenes críticas
    preloadCritical() {
        const criticalImages = document.querySelectorAll('.artwork-image:nth-child(-n+${PERFORMANCE_CONFIG.CRITICAL_IMAGES})');
        
        criticalImages.forEach(img => {
            if (img.dataset.src) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = img.dataset.src;
                document.head.appendChild(link);
            }
        });
    }
}

// CSS para efectos de carga
const lazyLoadCSS = \`
img[data-src] {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
}

img.loaded {
    opacity: 1;
}

img.error {
    opacity: 0.5;
    background: #f5f5f5;
}

@keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}
\`;

// Inyectar CSS
const style = document.createElement('style');
style.textContent = lazyLoadCSS;
document.head.appendChild(style);

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new OptimizedLazyLoader();
    });
} else {
    new OptimizedLazyLoader();
}
`;
    }

    /**
     * Escribir archivo de lazy loading
     */
    async writeLazyLoadingFile() {
        const code = this.generateLazyLoadingCode();
        await fs.promises.writeFile('./js/lazy-loading.js', code);
        console.log('✅ Archivo lazy-loading.js generado');
    }
}

// ===== OPTIMIZADOR DE IMÁGENES WEBP =====
class WebPGenerator {
    constructor() {
        this.sharp = require('sharp');
        this.convertedImages = [];
    }

    /**
     * Generar versiones WebP de todas las imágenes
     */
    async generateWebPVersions() {
        console.log('🔄 Generando versiones WebP...\n');
        
        const directories = ['./images/obras', './images/gallery'];
        
        for (const dir of directories) {
            await this.convertDirectory(dir);
        }
        
        await this.generatePictureElements();
        
        console.log(`✅ ${this.convertedImages.length} imágenes convertidas a WebP`);
    }

    async convertDirectory(dirPath) {
        const files = await fs.promises.readdir(dirPath);
        const images = files.filter(file => 
            ['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase())
        );

        for (const image of images) {
            await this.convertToWebP(path.join(dirPath, image));
        }
    }

    async convertToWebP(imagePath) {
        try {
            const outputPath = imagePath.replace(/\.(jpe?g|png)$/i, '.webp');
            
            await this.sharp(imagePath)
                .webp({ 
                    quality: PERFORMANCE_CONFIG.WEBP_QUALITY,
                    effort: 6
                })
                .toFile(outputPath);
            
            this.convertedImages.push({
                original: imagePath,
                webp: outputPath
            });
            
            console.log(`✅ ${path.basename(imagePath)} → ${path.basename(outputPath)}`);
            
        } catch (error) {
            console.error(`❌ Error convirtiendo ${imagePath}:`, error.message);
        }
    }

    /**
     * Generar elementos <picture> para soporte WebP
     */
    async generatePictureElements() {
        const template = `
/**
 * Picture Elements Generator for WebP Support
 */
function generatePictureElement(imagePath, alt, className = '') {
    const webpPath = imagePath.replace(/\.(jpe?g|png)$/i, '.webp');
    
    return \`
    <picture class="\${className}">
        <source srcset="\${webpPath}" type="image/webp">
        <source srcset="\${imagePath}" type="image/jpeg">
        <img src="\${imagePath}" alt="\${alt}" loading="lazy" class="artwork-image">
    </picture>
    \`;
}

// Función para actualizar todas las imágenes del DOM
function upgradeToWebP() {
    const images = document.querySelectorAll('img.artwork-image');
    
    images.forEach(img => {
        const picture = document.createElement('div');
        picture.innerHTML = generatePictureElement(
            img.src, 
            img.alt, 
            img.className
        );
        
        img.parentNode.replaceChild(picture.firstElementChild, img);
    });
}

// Auto-ejecutar si el navegador soporta WebP
if (window.CSS && CSS.supports('background-image', 'url("data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=")')) {
    document.addEventListener('DOMContentLoaded', upgradeToWebP);
}
`;
        
        await fs.promises.writeFile('./js/webp-support.js', template);
        console.log('✅ Archivo webp-support.js generado');
    }
}

// ===== ANALIZADOR DE PERFORMANCE =====
class PerformanceAnalyzer {
    constructor() {
        this.metrics = {};
        this.recommendations = [];
    }

    /**
     * Analizar performance actual del sitio
     */
    async analyzePerformance() {
        console.log('📊 Analizando performance...\n');
        
        await this.analyzeImageSizes();
        await this.analyzeLoadingStrategy();
        await this.generateRecommendations();
        await this.createPerformanceReport();
        
        console.log('✅ Análisis de performance completado');
    }

    async analyzeImageSizes() {
        const directories = ['./images/obras', './images/gallery'];
        let totalSize = 0;
        let imageCount = 0;
        const oversizedImages = [];

        for (const dir of directories) {
            const files = await fs.promises.readdir(dir);
            
            for (const file of files) {
                if (['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file).toLowerCase())) {
                    const filePath = path.join(dir, file);
                    const stats = await fs.promises.stat(filePath);
                    const sizeKB = Math.round(stats.size / 1024);
                    
                    totalSize += sizeKB;
                    imageCount++;
                    
                    if (sizeKB > PERFORMANCE_CONFIG.MAX_IMAGE_SIZE) {
                        oversizedImages.push({
                            file: file,
                            size: sizeKB,
                            path: dir
                        });
                    }
                }
            }
        }

        this.metrics.images = {
            totalCount: imageCount,
            totalSizeKB: totalSize,
            averageSizeKB: Math.round(totalSize / imageCount),
            oversizedCount: oversizedImages.length,
            oversizedImages
        };

        console.log(`📊 Imágenes analizadas: ${imageCount}`);
        console.log(`📦 Tamaño total: ${Math.round(totalSize / 1024)}MB`);
        console.log(`⚠️  Imágenes sobrepasadas: ${oversizedImages.length}`);
    }

    async analyzeLoadingStrategy() {
        // Simular análisis de estrategia de carga
        this.metrics.loading = {
            lazyLoadingEnabled: fs.existsSync('./js/lazy-loading.js'),
            webpSupport: fs.existsSync('./js/webp-support.js'),
            criticalImagesIdentified: PERFORMANCE_CONFIG.CRITICAL_IMAGES,
            preloadStrategy: 'critical-images-only'
        };
    }

    generateRecommendations() {
        const { images, loading } = this.metrics;
        
        // Recomendaciones basadas en análisis
        if (images.oversizedCount > 0) {
            this.recommendations.push({
                type: 'critical',
                title: 'Optimizar imágenes grandes',
                description: `${images.oversizedCount} imágenes superan ${PERFORMANCE_CONFIG.MAX_IMAGE_SIZE}KB`,
                action: 'Ejecutar ImageOptimizer.optimizeAllImages()'
            });
        }

        if (!loading.lazyLoadingEnabled) {
            this.recommendations.push({
                type: 'important',
                title: 'Implementar lazy loading',
                description: 'Las imágenes no se cargan bajo demanda',
                action: 'Ejecutar LazyLoadingGenerator.writeLazyLoadingFile()'
            });
        }

        if (!loading.webpSupport) {
            this.recommendations.push({
                type: 'improvement',
                title: 'Añadir soporte WebP',
                description: 'Formato WebP puede reducir 25-35% el tamaño',
                action: 'Ejecutar WebPGenerator.generateWebPVersions()'
            });
        }

        if (images.averageSizeKB > 300) {
            this.recommendations.push({
                type: 'improvement',
                title: 'Reducir tamaño promedio',
                description: `Tamaño promedio actual: ${images.averageSizeKB}KB`,
                action: 'Ajustar QUALITY en CONFIG a 80 o menos'
            });
        }
    }

    async createPerformanceReport() {
        const report = {
            timestamp: new Date().toISOString(),
            metrics: this.metrics,
            recommendations: this.recommendations,
            performanceBudget: {
                maxImageSize: PERFORMANCE_CONFIG.MAX_IMAGE_SIZE,
                maxTotalSize: PERFORMANCE_CONFIG.MAX_TOTAL_SIZE,
                targetLCP: PERFORMANCE_CONFIG.TARGET_LCP,
                targetFID: PERFORMANCE_CONFIG.TARGET_FID
            },
            status: this.recommendations.filter(r => r.type === 'critical').length === 0 ? 'good' : 'needs-improvement'
        };

        await fs.promises.writeFile('./performance-report.json', JSON.stringify(report, null, 2));
        
        // Generar reporte HTML
        await this.generateHTMLReport(report);
        
        console.log('📋 Reporte guardado en performance-report.json');
        console.log('🌐 Reporte HTML guardado en performance-report.html');
    }

    async generateHTMLReport(report) {
        const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Performance Report - Sergio Arte Plástica</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; margin: 2rem; background: #f9f9f9; }
        .container { max-width: 1000px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { border-bottom: 2px solid #B08D57; padding-bottom: 1rem; margin-bottom: 2rem; }
        .metric { display: flex; justify-content: space-between; padding: 1rem; margin: 0.5rem 0; background: #f5f5f5; border-radius: 4px; }
        .recommendation { padding: 1rem; margin: 1rem 0; border-left: 4px solid #B08D57; background: #fafafa; }
        .critical { border-left-color: #e74c3c; }
        .important { border-left-color: #f39c12; }
        .improvement { border-left-color: #27ae60; }
        .status-good { color: #27ae60; font-weight: bold; }
        .status-needs-improvement { color: #e74c3c; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Performance Report</h1>
            <p>Sergio Arte Plástica - ${new Date(report.timestamp).toLocaleString()}</p>
            <p class="status-${report.status.replace('-', '-')}">${report.status === 'good' ? '✅ Rendimiento Bueno' : '⚠️ Necesita Mejoras'}</p>
        </div>

        <h2>📈 Métricas</h2>
        <div class="metric">
            <span>Total de imágenes</span>
            <strong>${report.metrics.images.totalCount}</strong>
        </div>
        <div class="metric">
            <span>Tamaño total</span>
            <strong>${Math.round(report.metrics.images.totalSizeKB / 1024)}MB</strong>
        </div>
        <div class="metric">
            <span>Tamaño promedio por imagen</span>
            <strong>${report.metrics.images.averageSizeKB}KB</strong>
        </div>
        <div class="metric">
            <span>Imágenes grandes (>${PERFORMANCE_CONFIG.MAX_IMAGE_SIZE}KB)</span>
            <strong>${report.metrics.images.oversizedCount}</strong>
        </div>

        <h2>🚀 Recomendaciones</h2>
        ${report.recommendations.map(rec => `
            <div class="recommendation ${rec.type}">
                <h3>${rec.title}</h3>
                <p>${rec.description}</p>
                <code>${rec.action}</code>
            </div>
        `).join('')}

        <h2>🎯 Performance Budget</h2>
        <div class="metric">
            <span>Tamaño máximo por imagen</span>
            <strong>${report.performanceBudget.maxImageSize}KB</strong>
        </div>
        <div class="metric">
            <span>Tamaño máximo total</span>
            <strong>${Math.round(report.performanceBudget.maxTotalSize / 1024)}MB</strong>
        </div>
        <div class="metric">
            <span>LCP objetivo</span>
            <strong>${report.performanceBudget.targetLCP}ms</strong>
        </div>
    </div>
</body>
</html>
        `;

        await fs.promises.writeFile('./performance-report.html', html);
    }
}

// ===== EXPORTACIÓN =====
module.exports = {
    LazyLoadingGenerator,
    WebPGenerator,
    PerformanceAnalyzer,
    PERFORMANCE_CONFIG
};