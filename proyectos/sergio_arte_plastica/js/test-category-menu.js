/**
 * SERGIO ARTE PLÁSTICA - Test Category Menu
 * Test específico para el menú de categorías
 */

const fs = require('fs');

class CategoryMenuTest {
    constructor() {
        this.results = [];
    }

    async runTests() {
        console.log('🎯 TESTING CATEGORY MENU\n');
        console.log('========================\n');

        await this.testCategoryDefinitions();
        await this.testMenuGeneration();
        await this.testFilterLogic();
        await this.testCSSStyles();
        
        this.printResults();
    }

    async testCategoryDefinitions() {
        console.log('📁 Test 1: Verificando definición de categorías...');
        
        try {
            const jsContent = await fs.promises.readFile('./js/main.js', 'utf8');
            
            // Verificar que las categorías están definidas
            const hasCategories = jsContent.includes("this.categories = {");
            const hasAllCategory = jsContent.includes("'all': { name: 'Todas las Obras'");
            const hasOilCategory = jsContent.includes("'oil': { name: 'Óleos sobre Lino'");
            const has3DCategory = jsContent.includes("'3dprinting': { name: 'Impresión 3D'");
            const hasDrawingCategory = jsContent.includes("'drawing': { name: 'Dibujos'");
            
            if (hasCategories && hasAllCategory && hasOilCategory && has3DCategory && hasDrawingCategory) {
                console.log('  ✅ Todas las categorías definidas correctamente');
                this.results.push({ test: 'Category Definitions', status: 'PASS', details: '4 categorías definidas' });
            } else {
                console.log('  ❌ Definiciones de categorías incompletas');
                this.results.push({ test: 'Category Definitions', status: 'FAIL', details: 'Categorías faltantes' });
            }
        } catch (error) {
            console.log(`  ❌ Error: ${error.message}`);
            this.results.push({ test: 'Category Definitions', status: 'FAIL', details: error.message });
        }
    }

    async testMenuGeneration() {
        console.log('🔧 Test 2: Verificando generación de menú...');
        
        try {
            const jsContent = await fs.promises.readFile('./js/main.js', 'utf8');
            
            // Verificar métodos necesarios
            const hasCreateCategoryMenu = jsContent.includes('createCategoryMenu()');
            const hasFilterByCategory = jsContent.includes('filterByCategory(category)');
            const hasMenuHTML = jsContent.includes('category-nav');
            const hasEventListeners = jsContent.includes("btn.addEventListener('click'");
            
            if (hasCreateCategoryMenu && hasFilterByCategory && hasMenuHTML && hasEventListeners) {
                console.log('  ✅ Generación de menú implementada');
                this.results.push({ test: 'Menu Generation', status: 'PASS', details: 'Métodos presentes' });
            } else {
                console.log('  ❌ Generación de menú incompleta');
                this.results.push({ test: 'Menu Generation', status: 'FAIL', details: 'Métodos faltantes' });
            }
        } catch (error) {
            console.log(`  ❌ Error: ${error.message}`);
            this.results.push({ test: 'Menu Generation', status: 'FAIL', details: error.message });
        }
    }

    async testFilterLogic() {
        console.log('🔍 Test 3: Verificando lógica de filtrado...');
        
        try {
            const jsContent = await fs.promises.readFile('./js/main.js', 'utf8');
            
            // Verificar filtrado
            const hasFilterLogic = jsContent.includes('this.slides = Array.from(this.allSlides).filter');
            const hasDisplayToggle = jsContent.includes("slide.style.display = this.slides.includes(slide) ? 'flex' : 'none'");
            const hasSlideReset = jsContent.includes('this.currentSlide = 0');
            const hasIndicatorUpdate = jsContent.includes('this.createIndicators()');
            
            if (hasFilterLogic && hasDisplayToggle && hasSlideReset && hasIndicatorUpdate) {
                console.log('  ✅ Lógica de filtrado implementada');
                this.results.push({ test: 'Filter Logic', status: 'PASS', details: 'Filtrado funcional' });
            } else {
                console.log('  ❌ Lógica de filtrado incompleta');
                this.results.push({ test: 'Filter Logic', status: 'FAIL', details: 'Lógica faltante' });
            }
        } catch (error) {
            console.log(`  ❌ Error: ${error.message}`);
            this.results.push({ test: 'Filter Logic', status: 'FAIL', details: error.message });
        }
    }

    async testCSSStyles() {
        console.log('🎨 Test 4: Verificando estilos CSS...');
        
        try {
            // Verificar que el archivo CSS existe
            const cssExists = fs.existsSync('./css/category-menu.css');
            
            if (cssExists) {
                const cssContent = await fs.promises.readFile('./css/category-menu.css', 'utf8');
                
                // Verificar clases principales
                const hasCategoryMenu = cssContent.includes('.category-menu');
                const hasCategoryNav = cssContent.includes('.category-nav');
                const hasCategoryBtn = cssContent.includes('.category-btn');
                const hasActiveState = cssContent.includes('.category-btn.active');
                const hasResponsive = cssContent.includes('@media (max-width: 768px)');
                const hasAnimations = cssContent.includes('@keyframes fadeInCategory');
                
                if (hasCategoryMenu && hasCategoryNav && hasCategoryBtn && hasActiveState && hasResponsive && hasAnimations) {
                    console.log('  ✅ Estilos CSS completos');
                    this.results.push({ test: 'CSS Styles', status: 'PASS', details: 'Estilos completos con responsive' });
                } else {
                    console.log('  ⚠️ Algunos estilos CSS faltantes');
                    this.results.push({ test: 'CSS Styles', status: 'PARTIAL', details: 'Estilos parciales' });
                }
            } else {
                console.log('  ❌ Archivo CSS no encontrado');
                this.results.push({ test: 'CSS Styles', status: 'FAIL', details: 'Archivo CSS faltante' });
            }
        } catch (error) {
            console.log(`  ❌ Error: ${error.message}`);
            this.results.push({ test: 'CSS Styles', status: 'FAIL', details: error.message });
        }
    }

    printResults() {
        console.log('\n📋 RESUMEN DE TESTS CATEGORY MENU:');
        console.log('==================================');
        
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
            console.log('\n🎉 ¡Category Menu implementado correctamente!');
            console.log('El menú de categorías debería funcionar en el modal.');
        } else {
            console.log('\n⚠️ Hay problemas que requieren atención.');
        }
        
        console.log('\n🔍 INSTRUCCIONES DE TEST MANUAL:');
        console.log('1. Abrir http://localhost:8000');
        console.log('2. Hacer clic en "Ver Más Obras"'); 
        console.log('3. Verificar que aparece menú con: Todas las Obras | Óleos sobre Lino | Impresión 3D | Dibujos');
        console.log('4. Probar cada categoría y verificar filtrado');
        console.log('5. Verificar navegación con flechas dentro de cada categoría');
    }
}

// ===== CLI INTERFACE =====
if (require.main === module) {
    const tester = new CategoryMenuTest();
    const command = process.argv[2];
    
    switch (command) {
        case 'run':
        case 'test':
            tester.runTests();
            break;
        default:
            console.log(`
🎯 SERGIO ARTE PLÁSTICA - Category Menu Test

Comandos disponibles:
  node js/test-category-menu.js run   - Ejecutar tests
  node js/test-category-menu.js test  - Ejecutar tests

Tests incluidos:
  ✅ Definición de categorías
  ✅ Generación de menú 
  ✅ Lógica de filtrado
  ✅ Estilos CSS
            `);
    }
}

module.exports = CategoryMenuTest;