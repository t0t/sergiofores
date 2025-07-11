/**
 * SERGIO ARTE PLÁSTICA - Test Random Hero
 * Test del sistema de hero aleatorio
 */

class RandomHeroTest {
    constructor() {
        this.results = [];
    }

    async runTests() {
        console.log('🎨 TESTING RANDOM HERO\n');
        console.log('=======================\n');

        await this.testHeroElement();
        await this.testGalleryDataAvailability();
        await this.testRandomHeroClass();
        await this.testImagePreloading();
        await this.testImageChange();
        
        this.printResults();
    }

    async testHeroElement() {
        console.log('🔍 Test 1: Verificando elemento hero...');
        
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            console.log('  ✅ Hero section encontrado');
            
            // Verificar estilos de background
            const backgroundImage = heroSection.style.backgroundImage;
            const hasBackground = backgroundImage && backgroundImage !== 'none' && backgroundImage !== '';
            
            console.log(`  • Background image: ${hasBackground ? 'SET' : 'NOT SET'}`);
            if (hasBackground) {
                console.log(`  • URL: ${backgroundImage}`);
            }
            
            this.results.push({
                test: 'Hero Element',
                status: hasBackground ? 'PASS' : 'FAIL',
                details: `Background: ${hasBackground ? 'CONFIGURED' : 'MISSING'}`
            });
        } else {
            console.log('  ❌ Hero section no encontrado');
            this.results.push({
                test: 'Hero Element',
                status: 'FAIL',
                details: 'Hero section missing'
            });
        }
    }

    async testGalleryDataAvailability() {
        console.log('📊 Test 2: Verificando GALLERY_DATA...');
        
        const hasGalleryData = typeof window.GALLERY_DATA !== 'undefined';
        const dataCount = hasGalleryData ? window.GALLERY_DATA.length : 0;
        
        console.log(`  • GALLERY_DATA disponible: ${hasGalleryData ? 'YES' : 'NO'}`);
        console.log(`  • Número de obras: ${dataCount}`);
        
        if (hasGalleryData && dataCount > 0) {
            // Verificar que las imágenes tienen rutas válidas
            const validImages = window.GALLERY_DATA.filter(artwork => 
                artwork.path && artwork.path.includes('obras/')
            );
            console.log(`  • Imágenes válidas: ${validImages.length}/${dataCount}`);
            
            this.results.push({
                test: 'Gallery Data',
                status: validImages.length > 0 ? 'PASS' : 'FAIL',
                details: `${validImages.length} valid images`
            });
        } else {
            this.results.push({
                test: 'Gallery Data',
                status: 'FAIL',
                details: 'No gallery data available'
            });
        }
    }

    async testRandomHeroClass() {
        console.log('🏗️ Test 3: Verificando clase RandomHero...');
        
        const hasRandomHero = typeof window.randomHero !== 'undefined';
        
        if (hasRandomHero) {
            console.log('  ✅ RandomHero class inicializada');
            
            // Verificar métodos
            const hasChangeMethod = typeof window.randomHero.changeRandomImage === 'function';
            const hasGetCurrentMethod = typeof window.randomHero.getCurrentArtwork === 'function';
            const hasStatsMethod = typeof window.randomHero.getStats === 'function';
            
            console.log(`  • changeRandomImage: ${hasChangeMethod ? 'OK' : 'MISSING'}`);
            console.log(`  • getCurrentArtwork: ${hasGetCurrentMethod ? 'OK' : 'MISSING'}`);
            console.log(`  • getStats: ${hasStatsMethod ? 'OK' : 'MISSING'}`);
            
            if (hasStatsMethod) {
                const stats = window.randomHero.getStats();
                console.log(`  • Stats: ${JSON.stringify(stats)}`);
            }
            
            this.results.push({
                test: 'RandomHero Class',
                status: (hasChangeMethod && hasGetCurrentMethod && hasStatsMethod) ? 'PASS' : 'PARTIAL',
                details: `Methods: ${[hasChangeMethod, hasGetCurrentMethod, hasStatsMethod].filter(Boolean).length}/3`
            });
        } else {
            console.log('  ❌ RandomHero class no encontrada');
            this.results.push({
                test: 'RandomHero Class',
                status: 'FAIL',
                details: 'Class not initialized'
            });
        }
    }

    async testImagePreloading() {
        console.log('🖼️ Test 4: Verificando precarga de imágenes...');
        
        if (typeof window.randomHero !== 'undefined') {
            const stats = window.randomHero.getStats();
            const preloadedCount = stats.preloadedImages || 0;
            
            console.log(`  • Imágenes precargadas: ${preloadedCount}`);
            console.log(`  • Obra actual: ${stats.currentArtwork}`);
            
            this.results.push({
                test: 'Image Preloading',
                status: preloadedCount > 0 ? 'PASS' : 'FAIL',
                details: `${preloadedCount} images preloaded`
            });
        } else {
            this.results.push({
                test: 'Image Preloading',
                status: 'FAIL',
                details: 'RandomHero not available'
            });
        }
    }

    async testImageChange() {
        console.log('🔄 Test 5: Probando cambio de imagen...');
        
        if (typeof window.changeHeroImage === 'function') {
            const heroSection = document.querySelector('.hero-section');
            
            if (heroSection) {
                const initialBackground = heroSection.style.backgroundImage;
                console.log('  • Background inicial registrado');
                
                // Cambiar imagen
                window.changeHeroImage();
                
                // Esperar un momento para el cambio
                setTimeout(() => {
                    const newBackground = heroSection.style.backgroundImage;
                    const hasChanged = newBackground !== initialBackground;
                    
                    console.log(`  • Imagen cambió: ${hasChanged ? 'YES' : 'NO'}`);
                    console.log(`  • Nueva imagen: ${newBackground}`);
                    
                    this.results.push({
                        test: 'Image Change',
                        status: hasChanged ? 'PASS' : 'PARTIAL',
                        details: `Background ${hasChanged ? 'changed' : 'same'}`
                    });
                }, 1000);
            } else {
                this.results.push({
                    test: 'Image Change',
                    status: 'FAIL',
                    details: 'Hero section not found'
                });
            }
        } else {
            console.log('  ❌ changeHeroImage function no disponible');
            this.results.push({
                test: 'Image Change',
                status: 'FAIL',
                details: 'Function not available'
            });
        }
    }

    printResults() {
        setTimeout(() => {
            console.log('\n📋 RESUMEN DE TESTS RANDOM HERO:');
            console.log('=================================');
            
            let passed = 0;
            let failed = 0;
            let partial = 0;
            
            this.results.forEach(result => {
                const icon = result.status === 'PASS' ? '✅' : result.status === 'PARTIAL' ? '⚠️' : '❌';
                console.log(`${icon} ${result.test}: ${result.status} (${result.details})`);
                
                if (result.status === 'PASS') passed++;
                else if (result.status === 'FAIL') failed++;
                else partial++;
            });
            
            console.log(`\n📊 ESTADÍSTICAS:`);
            console.log(`  • Pasados: ${passed}`);
            console.log(`  • Parciales: ${partial}`);
            console.log(`  • Fallidos: ${failed}`);
            
            if (failed === 0) {
                console.log('\n🎉 ¡Random Hero funcionando correctamente!');
                console.log('Cada recarga de página mostrará una imagen diferente.');
            } else {
                console.log('\n⚠️ Hay problemas que requieren atención.');
            }
            
            console.log('\n🔍 COMANDOS DE DEBUG DISPONIBLES:');
            console.log('• changeHeroImage() - Cambiar imagen del hero');
            console.log('• getHeroStats() - Ver estadísticas del sistema');
            console.log('• window.randomHero.getCurrentArtwork() - Ver obra actual');
        }, 1500);
    }
}

// Auto-ejecutar en el navegador
if (typeof window !== 'undefined') {
    window.testRandomHero = function() {
        const tester = new RandomHeroTest();
        tester.runTests();
    };
    
    // Auto-ejecutar después de un delay para que todo esté cargado
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            console.log('🎨 Random Hero Test loaded. Run testRandomHero() in console for analysis.');
        }, 3000);
    });
}

module.exports = RandomHeroTest;