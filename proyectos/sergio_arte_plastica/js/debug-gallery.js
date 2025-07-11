/**
 * SERGIO ARTE PLÁSTICA - Debug Gallery
 * Script de diagnóstico para debugging en tiempo real
 */

// Solo ejecutar en el navegador
if (typeof window !== 'undefined') {
    
    // Función de debug que se puede ejecutar en DevTools
    window.debugGallery = function() {
        console.group('🎨 GALLERY DEBUG');
        
        // 1. Verificar GALLERY_DATA
        console.log('📊 GALLERY_DATA:', typeof window.GALLERY_DATA, window.GALLERY_DATA?.length || 'undefined');
        
        // 2. Verificar elementos DOM
        const btnSeeMore = document.getElementById('btnSeeMore');
        const modal = document.getElementById('galleryModal');
        const carouselTrack = document.getElementById('carouselTrack');
        const slides = carouselTrack?.querySelectorAll('.carousel-slide');
        
        console.log('🔲 Modal element:', modal ? 'Found' : 'NOT FOUND');
        console.log('🎯 btnSeeMore:', btnSeeMore ? 'Found' : 'NOT FOUND');
        console.log('🎠 carouselTrack:', carouselTrack ? 'Found' : 'NOT FOUND');
        console.log('📸 Slides count:', slides?.length || 0);
        
        // 3. Verificar event listeners
        if (btnSeeMore) {
            const events = getEventListeners(btnSeeMore);
            console.log('🎧 btnSeeMore events:', Object.keys(events));
        }
        
        // 4. Verificar app global
        if (window.app) {
            const galleryModal = window.app.getComponent('galleryModal');
            console.log('🏗️ App Gallery Modal:', galleryModal ? 'Initialized' : 'NOT FOUND');
            
            if (galleryModal) {
                console.log('   - Slides:', galleryModal.slides?.length || 0);
                console.log('   - isOpen:', galleryModal.isOpen);
                console.log('   - currentSlide:', galleryModal.currentSlide);
            }
        }
        
        // 5. Test manual del modal
        console.log('🧪 Testing modal open...');
        if (btnSeeMore) {
            btnSeeMore.click();
            setTimeout(() => {
                const isModalOpen = modal?.classList.contains('active');
                console.log('🔓 Modal opened:', isModalOpen ? 'YES' : 'NO');
                
                if (isModalOpen) {
                    // Cerrar modal
                    const closeBtn = document.getElementById('modalClose');
                    if (closeBtn) {
                        closeBtn.click();
                        console.log('🔒 Modal closed');
                    }
                }
            }, 500);
        }
        
        console.groupEnd();
    };
    
    // Auto-ejecutar al cargar
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            console.log('🚀 Debug script loaded. Run debugGallery() in console for detailed analysis.');
        }, 1000);
    });
    
    // Test continuo
    window.testGalleryNavigation = function() {
        const modal = document.getElementById('galleryModal');
        const prevBtn = document.getElementById('carouselPrev');
        const nextBtn = document.getElementById('carouselNext');
        
        if (!modal?.classList.contains('active')) {
            console.log('❌ Modal not open. Open modal first.');
            return;
        }
        
        console.group('🎠 NAVIGATION TEST');
        
        // Test navigation
        let testCount = 0;
        const maxTests = 3;
        
        function testNavigation() {
            if (testCount >= maxTests) {
                console.log('✅ Navigation test completed');
                console.groupEnd();
                return;
            }
            
            const currentSlide = document.querySelector('.carousel-slide.active');
            const slideNumber = Array.from(document.querySelectorAll('.carousel-slide')).indexOf(currentSlide) + 1;
            
            console.log(`🎯 Current slide: ${slideNumber}`);
            
            // Click next
            if (nextBtn) {
                nextBtn.click();
                testCount++;
                
                setTimeout(() => {
                    const newSlide = document.querySelector('.carousel-slide.active');
                    const newSlideNumber = Array.from(document.querySelectorAll('.carousel-slide')).indexOf(newSlide) + 1;
                    console.log(`➡️ After next: ${newSlideNumber}`);
                    
                    testNavigation();
                }, 300);
            }
        }
        
        testNavigation();
    };
}

// Agregar estilos para debug visual
if (typeof document !== 'undefined') {
    const debugStyles = `
        .debug-highlight {
            outline: 2px solid red !important;
            outline-offset: 2px !important;
        }
        
        .debug-info {
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 10px;
            font-family: monospace;
            z-index: 9999;
            font-size: 12px;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = debugStyles;
    document.head.appendChild(style);
}