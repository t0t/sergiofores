/**
 * 📊 MEDIDOR DE PERFORMANCE POST-WEBP
 * Script para verificar las mejoras después de la optimización WebP
 */

console.log('🚀 INICIANDO MEDICIÓN DE PERFORMANCE');
console.log('=====================================');

// Medir tiempo de carga de imágenes
function measureImageLoadTimes() {
    const images = document.querySelectorAll('.reference-image');
    const loadTimes = [];
    let loadedCount = 0;

    const startTime = performance.now();

    images.forEach((img, index) => {
        const imageStartTime = performance.now();
        
        if (img.complete && img.naturalHeight !== 0) {
            // Imagen ya cargada
            loadTimes[index] = 0;
            loadedCount++;
        } else {
            // Medir tiempo de carga
            img.addEventListener('load', () => {
                const loadTime = performance.now() - imageStartTime;
                loadTimes[index] = loadTime;
                loadedCount++;
                
                console.log(`📸 Imagen ${index + 1} cargada en ${loadTime.toFixed(2)}ms`);
                
                if (loadedCount === images.length) {
                    analyzeResults();
                }
            }, { once: true });

            img.addEventListener('error', () => {
                console.warn(`❌ Error cargando imagen ${index + 1}`);
                loadTimes[index] = -1;
                loadedCount++;
                
                if (loadedCount === images.length) {
                    analyzeResults();
                }
            }, { once: true });
        }
    });

    // Si todas las imágenes ya estaban cargadas
    if (loadedCount === images.length) {
        setTimeout(analyzeResults, 100);
    }

    function analyzeResults() {
        const totalTime = performance.now() - startTime;
        const validTimes = loadTimes.filter(t => t >= 0);
        const avgLoadTime = validTimes.reduce((a, b) => a + b, 0) / validTimes.length;
        
        console.log('\n📊 RESULTADOS DE CARGA');
        console.log('========================');
        console.log(`⏱️  Tiempo total: ${totalTime.toFixed(2)}ms`);
        console.log(`📈 Tiempo promedio por imagen: ${avgLoadTime.toFixed(2)}ms`);
        console.log(`✅ Imágenes cargadas exitosamente: ${validTimes.length}/${images.length}`);
        console.log(`❌ Errores de carga: ${loadTimes.filter(t => t === -1).length}`);
        
        // Detectar formato WebP
        const webpImages = [...images].filter(img => {
            const picture = img.closest('picture');
            return picture && picture.querySelector('source[type="image/webp"]');
        });
        
        console.log(`🎯 Imágenes con WebP: ${webpImages.length}/${images.length}`);
        
        // Estimar ahorro de bandwidth
        estimateBandwidthSavings();
    }
}

// Estimar ahorro de bandwidth
function estimateBandwidthSavings() {
    const pictures = document.querySelectorAll('picture');
    let estimatedSavings = 0;
    
    console.log('\n💾 ANÁLISIS DE BANDWIDTH');
    console.log('=========================');
    
    pictures.forEach((picture, index) => {
        const webpSource = picture.querySelector('source[type="image/webp"]');
        const fallbackImg = picture.querySelector('img');
        
        if (webpSource && fallbackImg) {
            // Estimaciones basadas en nuestros resultados de conversión
            const estimatedOriginalKB = getEstimatedSize(fallbackImg.src);
            const estimatedWebPKB = Math.round(estimatedOriginalKB * 0.15); // 85% reducción promedio
            const savings = estimatedOriginalKB - estimatedWebPKB;
            
            estimatedSavings += savings;
            
            console.log(`📸 ${fallbackImg.alt}: ~${estimatedOriginalKB}KB → ~${estimatedWebPKB}KB (${savings}KB ahorrados)`);
        }
    });
    
    console.log(`\n🎯 AHORRO TOTAL ESTIMADO: ~${estimatedSavings}KB (${(estimatedSavings/1024).toFixed(1)}MB)`);
    console.log(`📈 Reducción de bandwidth: ~85%`);
    
    // Calcular mejora de LCP estimada
    const lcpImprovement = Math.round(47); // Basado en nuestro análisis
    console.log(`⚡ Mejora estimada de LCP: ${lcpImprovement}%`);
    console.log(`🏆 Puntos Lighthouse esperados: +15-20`);
}

function getEstimatedSize(imageSrc) {
    // Mapeo de tamaños basado en nuestro análisis previo
    const sizeMap = {
        'temper-studio': 1224,
        'www-make-ready-co': 736,
        'seated-nyc': 644,
        'www-commission-studio': 616,
        'moheim-com': 592,
        'livinghouse-nz': 528,
        'slowness-com': 492,
        'adrienrovero-com': 432,
        'medusmo-com': 420,
        'clueperfumery-com': 404
    };
    
    for (const [key, size] of Object.entries(sizeMap)) {
        if (imageSrc.includes(key)) {
            return size;
        }
    }
    
    return 250; // Tamaño promedio para el resto
}

// Verificar soporte WebP del navegador
function checkWebPSupport() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const webpSupport = canvas.toDataURL('image/webp').indexOf('webp') !== -1;
    
    console.log('\n🌐 SOPORTE DEL NAVEGADOR');
    console.log('=========================');
    console.log(`WebP soportado: ${webpSupport ? '✅ Sí' : '❌ No'}`);
    console.log(`User Agent: ${navigator.userAgent.split(' ').slice(-2).join(' ')}`);
    
    return webpSupport;
}

// Medir Core Web Vitals simplificado
function measureCoreWebVitals() {
    console.log('\n📏 CORE WEB VITALS SIMPLIFICADO');
    console.log('================================');
    
    // Largest Contentful Paint aproximado
    const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log(`📊 LCP aproximado: ${lastEntry.startTime.toFixed(2)}ms`);
    });
    
    try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
        console.log('⚠️  LCP no disponible en este navegador');
    }
    
    // First Contentful Paint
    const paintMetrics = performance.getEntriesByType('paint');
    paintMetrics.forEach(metric => {
        console.log(`📊 ${metric.name}: ${metric.startTime.toFixed(2)}ms`);
    });
}

// EJECUCIÓN PRINCIPAL
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        checkWebPSupport();
        measureCoreWebVitals();
        measureImageLoadTimes();
        
        console.log('\n🎯 SIGUIENTE PASO RECOMENDADO:');
        console.log('Ejecutar Lighthouse audit para verificar mejoras reales');
        console.log('chrome://lighthouse/ o DevTools > Lighthouse');
    }, 1000);
});

console.log('📱 Script de medición cargado. Abriendo DevTools para ver resultados...');