/**
 * SERGIO ARTE PLÁSTICA - Gallery Test
 * Test básico para verificar funcionamiento de galería
 */

class GalleryTest {
    constructor() {
        this.tests = [];
        this.results = [];
    }

    async runTests() {
        console.log('🧪 INICIANDO TESTS DE GALERÍA\n');
        console.log('=============================\n');

        await this.testGalleryData();
        await this.testCarouselGeneration();
        await this.testModalFunctionality();
        await this.testImagePaths();
        
        this.printResults();
    }

    async testGalleryData() {
        console.log('📊 Test 1: Verificando GALLERY_DATA...');
        
        try {
            // Simular carga del archivo
            const galleryDataPath = './js/gallery-data.js';
            const fs = require('fs');
            const content = await fs.promises.readFile(galleryDataPath, 'utf8');
            
            // Verificar que contiene datos
            const hasData = content.includes('const GALLERY_DATA = [');
            const artworkCount = (content.match(/"title":/g) || []).length;
            
            if (hasData && artworkCount > 0) {
                console.log(`  ✅ GALLERY_DATA encontrado con ${artworkCount} obras`);
                this.results.push({ test: 'Gallery Data', status: 'PASS', details: `${artworkCount} obras` });
            } else {
                console.log('  ❌ GALLERY_DATA no válido');
                this.results.push({ test: 'Gallery Data', status: 'FAIL', details: 'Datos no encontrados' });
            }
        } catch (error) {
            console.log(`  ❌ Error: ${error.message}`);
            this.results.push({ test: 'Gallery Data', status: 'FAIL', details: error.message });
        }
    }

    async testCarouselGeneration() {
        console.log('🎠 Test 2: Verificando generación de carousel...');
        
        try {
            const fs = require('fs');
            const htmlContent = await fs.promises.readFile('./index.html', 'utf8');
            
            // Verificar que el script de generación está presente
            const hasCarouselScript = htmlContent.includes('carouselReady');
            const hasCarouselTrack = htmlContent.includes('carouselTrack');
            const hasDynamicGeneration = htmlContent.includes('GALLERY_DATA.forEach');
            
            if (hasCarouselScript && hasCarouselTrack && hasDynamicGeneration) {
                console.log('  ✅ Script de generación dinámico encontrado');
                this.results.push({ test: 'Carousel Generation', status: 'PASS', details: 'Script presente' });
            } else {
                console.log('  ❌ Script de generación no encontrado');
                this.results.push({ test: 'Carousel Generation', status: 'FAIL', details: 'Script missing' });
            }
        } catch (error) {
            console.log(`  ❌ Error: ${error.message}`);
            this.results.push({ test: 'Carousel Generation', status: 'FAIL', details: error.message });
        }
    }

    async testModalFunctionality() {
        console.log('🔲 Test 3: Verificando funcionalidad de modal...');
        
        try {
            const fs = require('fs');
            const jsContent = await fs.promises.readFile('./js/main.js', 'utf8');
            
            // Verificar que GalleryModal tiene los métodos necesarios
            const hasGalleryModal = jsContent.includes('class GalleryModal');
            const hasWaitForCarousel = jsContent.includes('waitForCarousel');
            const hasRefreshSlides = jsContent.includes('refreshSlides');
            const hasBindEvents = jsContent.includes('bindEvents');
            
            if (hasGalleryModal && hasWaitForCarousel && hasRefreshSlides && hasBindEvents) {
                console.log('  ✅ GalleryModal con funcionalidad completa');
                this.results.push({ test: 'Modal Functionality', status: 'PASS', details: 'Métodos presentes' });
            } else {
                console.log('  ❌ GalleryModal incompleto');
                this.results.push({ test: 'Modal Functionality', status: 'FAIL', details: 'Métodos faltantes' });
            }
        } catch (error) {
            console.log(`  ❌ Error: ${error.message}`);
            this.results.push({ test: 'Modal Functionality', status: 'FAIL', details: error.message });
        }
    }

    async testImagePaths() {
        console.log('🖼️ Test 4: Verificando rutas de imágenes...');
        
        try {
            const fs = require('fs');
            
            // Verificar que las imágenes principales existen
            const imagesToCheck = [
                './images/obras/oil/arqueologia-temporal.jpg',
                './images/obras/oil/introspeccion-silenciosa.png',
                './images/obras/oil/turbulencia-esencial.png'
            ];
            
            let existingImages = 0;
            
            for (const imagePath of imagesToCheck) {
                if (fs.existsSync(imagePath)) {
                    existingImages++;
                } else {
                    console.log(`  ⚠️ Imagen no encontrada: ${imagePath}`);
                }
            }
            
            if (existingImages === imagesToCheck.length) {
                console.log(`  ✅ Todas las imágenes principales encontradas (${existingImages}/${imagesToCheck.length})`);
                this.results.push({ test: 'Image Paths', status: 'PASS', details: `${existingImages}/${imagesToCheck.length} imágenes` });
            } else {
                console.log(`  ⚠️ Faltan ${imagesToCheck.length - existingImages} imágenes`);
                this.results.push({ test: 'Image Paths', status: 'PARTIAL', details: `${existingImages}/${imagesToCheck.length} imágenes` });
            }
        } catch (error) {
            console.log(`  ❌ Error: ${error.message}`);
            this.results.push({ test: 'Image Paths', status: 'FAIL', details: error.message });
        }
    }

    printResults() {
        console.log('\n📋 RESUMEN DE TESTS:');
        console.log('===================');
        
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
            console.log('\n🎉 ¡Todos los tests principales pasaron!');
            console.log('La galería debería funcionar correctamente.');
        } else {
            console.log('\n⚠️ Hay tests fallidos que requieren atención.');
        }
    }
}

// ===== CLI INTERFACE =====
if (require.main === module) {
    const tester = new GalleryTest();
    const command = process.argv[2];
    
    switch (command) {
        case 'run':
        case 'test':
            tester.runTests();
            break;
        default:
            console.log(`
🧪 SERGIO ARTE PLÁSTICA - Gallery Test

Comandos disponibles:
  node js/gallery-test.js run   - Ejecutar tests
  node js/gallery-test.js test  - Ejecutar tests

Tests incluidos:
  ✅ Verificación de GALLERY_DATA
  ✅ Generación dinámica de carousel  
  ✅ Funcionalidad de modal
  ✅ Rutas de imágenes
            `);
    }
}

module.exports = GalleryTest;