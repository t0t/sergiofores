/**
 * SERGIO ARTE PLÁSTICA - Debug Category Menu
 * Debug específico para identificar por qué no aparece el menú
 */

class CategoryDebugger {
    constructor() {
        this.results = [];
    }

    async runDebug() {
        console.log('🔍 DEBUGGING CATEGORY MENU\n');
        console.log('===========================\n');

        await this.checkDOMElements();
        await this.checkJavaScriptExecution();
        await this.checkEventFlow();
        await this.testModalOpen();
        
        this.printResults();
    }

    async checkDOMElements() {
        console.log('🔲 Debug 1: Verificando elementos DOM...');
        
        const modalTitle = document.getElementById('modalTitle');
        const btnSeeMore = document.getElementById('btnSeeMore');
        const modal = document.getElementById('galleryModal');
        
        console.log(`  • modalTitle: ${modalTitle ? 'FOUND' : 'NOT FOUND'}`);
        console.log(`  • btnSeeMore: ${btnSeeMore ? 'FOUND' : 'NOT FOUND'}`);
        console.log(`  • modal: ${modal ? 'FOUND' : 'NOT FOUND'}`);
        
        if (modalTitle) {
            console.log(`  • modalTitle innerHTML: "${modalTitle.innerHTML}"`);
            console.log(`  • modalTitle children: ${modalTitle.children.length}`);
        }
        
        this.results.push({
            test: 'DOM Elements',
            status: (modalTitle && btnSeeMore && modal) ? 'PASS' : 'FAIL',
            details: `modalTitle: ${modalTitle ? 'OK' : 'MISSING'}`
        });
    }

    async checkJavaScriptExecution() {
        console.log('🔧 Debug 2: Verificando ejecución JavaScript...');
        
        // Verificar si el app global existe
        const appExists = typeof window.app !== 'undefined';
        console.log(`  • window.app: ${appExists ? 'EXISTS' : 'NOT FOUND'}`);
        
        // Verificar si GalleryModal está inicializada
        let galleryModal = null;
        if (appExists) {
            galleryModal = window.app.getComponent('galleryModal');
            console.log(`  • galleryModal component: ${galleryModal ? 'INITIALIZED' : 'NOT FOUND'}`);
            
            if (galleryModal) {
                console.log(`  • galleryModal.allSlides: ${galleryModal.allSlides?.length || 0}`);
                console.log(`  • galleryModal.categories: ${Object.keys(galleryModal.categories || {}).length}`);
            }
        }
        
        // Verificar GALLERY_DATA
        const galleryDataExists = typeof window.GALLERY_DATA !== 'undefined';
        console.log(`  • window.GALLERY_DATA: ${galleryDataExists ? `${window.GALLERY_DATA.length} items` : 'NOT FOUND'}`);
        
        this.results.push({
            test: 'JavaScript Execution',
            status: (appExists && galleryModal && galleryDataExists) ? 'PASS' : 'FAIL',
            details: `app: ${appExists}, modal: ${!!galleryModal}, data: ${galleryDataExists}`
        });
    }

    async checkEventFlow() {
        console.log('📡 Debug 3: Verificando flujo de eventos...');
        
        // Simular el evento carouselReady
        console.log('  • Simulando evento carouselReady...');
        
        window.dispatchEvent(new CustomEvent('carouselReady', { 
            detail: { slideCount: window.GALLERY_DATA?.length || 0 } 
        }));
        
        // Esperar un momento y verificar
        setTimeout(() => {
            const modalTitle = document.getElementById('modalTitle');
            const hasCategoryMenu = modalTitle?.querySelector('.category-menu');
            
            console.log(`  • Category menu created: ${hasCategoryMenu ? 'YES' : 'NO'}`);
            
            if (hasCategoryMenu) {
                const buttons = hasCategoryMenu.querySelectorAll('.category-btn');
                console.log(`  • Category buttons: ${buttons.length}`);
                buttons.forEach((btn, i) => {
                    console.log(`    - Button ${i + 1}: "${btn.textContent.trim()}"`);
                });
            }
            
            this.results.push({
                test: 'Event Flow',
                status: hasCategoryMenu ? 'PASS' : 'FAIL',
                details: `Category menu: ${hasCategoryMenu ? 'CREATED' : 'NOT CREATED'}`
            });
        }, 100);
    }

    async testModalOpen() {
        console.log('🔓 Debug 4: Probando apertura de modal...');
        
        const btnSeeMore = document.getElementById('btnSeeMore');
        const modal = document.getElementById('galleryModal');
        
        if (!btnSeeMore || !modal) {
            console.log('  ❌ Elementos necesarios no encontrados');
            return;
        }
        
        // Simular click en "Ver Más Obras"
        console.log('  • Simulando click en "Ver Más Obras"...');
        btnSeeMore.click();
        
        setTimeout(() => {
            const isModalOpen = modal.classList.contains('active');
            console.log(`  • Modal abierto: ${isModalOpen ? 'YES' : 'NO'}`);
            
            if (isModalOpen) {
                const modalTitle = document.getElementById('modalTitle');
                const categoryMenu = modalTitle?.querySelector('.category-menu');
                
                console.log(`  • Category menu visible: ${categoryMenu ? 'YES' : 'NO'}`);
                
                if (categoryMenu) {
                    const rect = categoryMenu.getBoundingClientRect();
                    console.log(`  • Menu dimensions: ${rect.width}x${rect.height}`);
                    console.log(`  • Menu position: ${rect.top}, ${rect.left}`);
                }
                
                // Cerrar modal
                const closeBtn = document.getElementById('modalClose');
                if (closeBtn) {
                    setTimeout(() => closeBtn.click(), 1000);
                }
            }
            
            this.results.push({
                test: 'Modal Open Test',
                status: (isModalOpen && categoryMenu) ? 'PASS' : 'FAIL',
                details: `Modal: ${isModalOpen}, Menu: ${!!categoryMenu}`
            });
        }, 500);
    }

    printResults() {
        setTimeout(() => {
            console.log('\n📋 RESUMEN DEBUG CATEGORY MENU:');
            console.log('=================================');
            
            this.results.forEach(result => {
                const icon = result.status === 'PASS' ? '✅' : '❌';
                console.log(`${icon} ${result.test}: ${result.status} (${result.details})`);
            });
            
            const passed = this.results.filter(r => r.status === 'PASS').length;
            const total = this.results.length;
            
            console.log(`\n📊 RESULTADO: ${passed}/${total} tests pasados`);
            
            if (passed < total) {
                console.log('\n🔧 POSIBLES SOLUCIONES:');
                console.log('1. Verificar que main.js se carga después de gallery-data.js');
                console.log('2. Verificar que el evento DOMContentLoaded se ejecuta correctamente');
                console.log('3. Verificar que no hay errores JavaScript en la consola');
                console.log('4. Verificar que el CSS category-menu.css se está cargando');
            }
        }, 2000);
    }
}

// Auto-ejecutar si estamos en el navegador
if (typeof window !== 'undefined') {
    window.debugCategoryMenu = function() {
        const debugger = new CategoryDebugger();
        debugger.runDebug();
    };
    
    // Auto-ejecutar después de DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            console.log('🔍 Category Menu Debugger loaded. Run debugCategoryMenu() in console.');
        }, 2000);
    });
}

module.exports = CategoryDebugger;