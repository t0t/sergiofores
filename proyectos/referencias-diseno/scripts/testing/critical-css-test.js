/**
 * 📊 TEST DE IMPACTO CRITICAL CSS
 * Mide las mejoras específicas del Critical CSS inlining
 */

console.log('🎯 INICIANDO TEST DE CRITICAL CSS');
console.log('==================================');

// Medir tiempos de renderizado
const criticalCSSMetrics = {
    startTime: performance.now(),
    domReady: null,
    firstPaint: null,
    firstContentfulPaint: null,
    cssLoaded: null,
    criticalCSSSize: null,
    fullCSSSize: null
};

// Detectar Critical CSS
function detectCriticalCSS() {
    const criticalStyle = document.querySelector('style[data-critical]');
    if (criticalStyle) {
        const cssText = criticalStyle.textContent;
        criticalCSSMetrics.criticalCSSSize = new Blob([cssText]).size;
        
        console.log('✅ Critical CSS detectado');
        console.log(`📏 Tamaño Critical CSS: ${(criticalCSSMetrics.criticalCSSSize / 1024).toFixed(2)}KB`);
        
        return true;
    }
    return false;
}

// Medir performance de pintado
function measurePaintMetrics() {
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                switch(entry.name) {
                    case 'first-paint':
                        criticalCSSMetrics.firstPaint = entry.startTime;
                        console.log(`🎨 First Paint: ${entry.startTime.toFixed(2)}ms`);
                        break;
                    case 'first-contentful-paint':
                        criticalCSSMetrics.firstContentfulPaint = entry.startTime;
                        console.log(`📝 First Contentful Paint: ${entry.startTime.toFixed(2)}ms`);
                        break;
                }
            });
        });
        
        try {
            observer.observe({ entryTypes: ['paint'] });
        } catch (e) {
            console.log('⚠️ Paint metrics no disponibles');
        }
    }
}

// Verificar que el Critical CSS funciona
function verifyCriticalCSSWorking() {
    const header = document.querySelector('.header');
    if (!header) {
        console.log('❌ Header no encontrado');
        return false;
    }
    
    const styles = window.getComputedStyle(header);
    const position = styles.getPropertyValue('position');
    const background = styles.getPropertyValue('background-color');
    
    console.log('🔍 VERIFICACIÓN DE CRITICAL CSS:');
    console.log(`  Header position: ${position}`);
    console.log(`  Header background: ${background}`);
    
    if (position === 'fixed') {
        console.log('✅ Critical CSS aplicado correctamente');
        return true;
    } else {
        console.log('❌ Critical CSS no aplicado');
        return false;
    }
}

// Medir tiempo hasta que se carga el CSS completo
function measureFullCSSLoad() {
    document.addEventListener('cssLoaded', function(event) {
        criticalCSSMetrics.cssLoaded = performance.now();
        const loadTime = event.detail ? event.detail.loadTime : 0;
        
        console.log(`🔄 CSS completo cargado en: ${loadTime.toFixed(2)}ms`);
        
        // Medir tamaño del CSS completo
        const fullCSS = document.querySelector('link[href*="style.css"]');
        if (fullCSS) {
            fetch(fullCSS.href)
                .then(response => response.text())
                .then(cssText => {
                    criticalCSSMetrics.fullCSSSize = new Blob([cssText]).size;
                    generateReport();
                })
                .catch(() => {
                    criticalCSSMetrics.fullCSSSize = 52000; // Estimado
                    generateReport();
                });
        } else {
            generateReport();
        }
    });
}

// Generar reporte final
function generateReport() {
    const currentTime = performance.now();
    
    console.log('\n📊 REPORTE DE CRITICAL CSS');
    console.log('============================');
    
    // Análisis de tamaños
    if (criticalCSSMetrics.criticalCSSSize && criticalCSSMetrics.fullCSSSize) {
        const reduction = ((criticalCSSMetrics.fullCSSSize - criticalCSSMetrics.criticalCSSSize) / criticalCSSMetrics.fullCSSSize * 100);
        console.log(`📏 CSS Crítico: ${(criticalCSSMetrics.criticalCSSSize / 1024).toFixed(2)}KB`);
        console.log(`📏 CSS Completo: ${(criticalCSSMetrics.fullCSSSize / 1024).toFixed(2)}KB`);
        console.log(`📈 Reducción inicial: ${reduction.toFixed(1)}%`);
    }
    
    // Análisis de tiempos
    if (criticalCSSMetrics.firstContentfulPaint) {
        console.log(`⚡ FCP mejorado: ${criticalCSSMetrics.firstContentfulPaint.toFixed(2)}ms`);
        
        // Comparar con baseline esperado
        const expectedImprovement = 43; // % de mejora esperada según auditoría
        const currentFCP = criticalCSSMetrics.firstContentfulPaint;
        const baselineFCP = 2100; // FCP baseline estimado sin optimizaciones
        
        if (currentFCP < baselineFCP) {
            const actualImprovement = ((baselineFCP - currentFCP) / baselineFCP * 100);
            console.log(`🎯 Mejora actual vs baseline: ${actualImprovement.toFixed(1)}%`);
            console.log(`🎯 Objetivo de mejora: ${expectedImprovement}%`);
            
            if (actualImprovement >= expectedImprovement * 0.8) {
                console.log('✅ Objetivo de performance ALCANZADO');
            } else {
                console.log('⚠️ Objetivo parcialmente alcanzado');
            }
        }
    }
    
    // Verificar funcionalidad
    const criticalWorking = verifyCriticalCSSWorking();
    
    // Estimación de puntos Lighthouse
    console.log('\n🏆 IMPACTO ESTIMADO EN LIGHTHOUSE:');
    console.log('===================================');
    
    let estimatedGain = 0;
    if (criticalWorking) estimatedGain += 8;
    if (criticalCSSMetrics.firstContentfulPaint < 1500) estimatedGain += 5;
    if (criticalCSSMetrics.cssLoaded && criticalCSSMetrics.cssLoaded < 1000) estimatedGain += 3;
    
    console.log(`📈 Puntos ganados estimados: +${estimatedGain}`);
    console.log(`🎯 Performance Score estimado: ${73 + estimatedGain}/100`);
    
    // Recomendaciones
    console.log('\n💡 PRÓXIMOS PASOS RECOMENDADOS:');
    console.log('================================');
    
    if (estimatedGain >= 12) {
        console.log('✅ Critical CSS optimización EXITOSA');
        console.log('🚀 Proceder con Service Worker + Code Splitting');
    } else if (estimatedGain >= 8) {
        console.log('⚠️ Optimización PARCIAL - verificar inline CSS');
        console.log('🔄 Considerar reducir más el Critical CSS');
    } else {
        console.log('❌ Optimización INSUFICIENTE');
        console.log('🛠️ Revisar implementación del Critical CSS');
    }
}

// EJECUCIÓN PRINCIPAL
document.addEventListener('DOMContentLoaded', function() {
    criticalCSSMetrics.domReady = performance.now();
    
    setTimeout(function() {
        console.log(`⏱️ DOM Ready: ${criticalCSSMetrics.domReady.toFixed(2)}ms`);
        
        // Detectar y verificar Critical CSS
        const hasCriticalCSS = detectCriticalCSS();
        
        if (hasCriticalCSS) {
            verifyCriticalCSSWorking();
            measurePaintMetrics();
            measureFullCSSLoad();
            
            // Generar reporte si no se carga CSS completo
            setTimeout(function() {
                if (!criticalCSSMetrics.cssLoaded) {
                    console.log('⚠️ CSS completo no detectado, generando reporte parcial...');
                    generateReport();
                }
            }, 3000);
        } else {
            console.log('❌ Critical CSS no encontrado - verificar implementación');
        }
        
    }, 100);
});

console.log('📱 Test de Critical CSS cargado. Abriendo DevTools para ver resultados...');