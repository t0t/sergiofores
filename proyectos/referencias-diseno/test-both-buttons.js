const puppeteer = require('puppeteer');
const path = require('path');

async function analyzeButtons() {
    const browser = await puppeteer.launch({ 
        headless: false, 
        defaultViewport: { width: 1200, height: 800 }
    });
    
    const page = await browser.newPage();
    
    try {
        // Cargar la página local
        const filePath = `file://${path.resolve(__dirname, 'index.html')}`;
        await page.goto(filePath, { waitUntil: 'networkidle0' });
        
        console.log('📄 Página cargada - Analizando ambos botones');
        
        // Esperar a que se carguen los elementos
        await page.waitForSelector('.reference-card', { timeout: 5000 });
        
        // Hacer hover en las primeras 3 cards para activar los botones
        const buttonPositions = await page.evaluate(() => {
            const cards = document.querySelectorAll('.reference-card');
            const results = [];
            
            cards.forEach((card, index) => {
                if (index < 3) { // Solo las primeras 3 cards
                    // Simular hover para activar botones
                    card.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
                    
                    const image = card.querySelector('.reference-image');
                    const exploreBtn = card.querySelector('.reference-link');
                    const favoriteBtn = card.querySelector('.favorite-btn');
                    
                    const cardData = {
                        cardIndex: index,
                        image: null,
                        exploreBtn: null,
                        favoriteBtn: null
                    };
                    
                    if (image) {
                        const imageRect = image.getBoundingClientRect();
                        cardData.image = {
                            width: imageRect.width,
                            height: imageRect.height,
                            top: imageRect.top,
                            right: imageRect.right,
                            centerY: imageRect.top + imageRect.height / 2
                        };
                    }
                    
                    if (exploreBtn) {
                        const btnRect = exploreBtn.getBoundingClientRect();
                        cardData.exploreBtn = {
                            width: btnRect.width,
                            height: btnRect.height,
                            top: btnRect.top,
                            right: btnRect.right,
                            centerY: btnRect.top + btnRect.height / 2,
                            centerX: btnRect.left + btnRect.width / 2,
                            visible: window.getComputedStyle(exploreBtn).opacity !== '0'
                        };
                    }
                    
                    if (favoriteBtn) {
                        const btnRect = favoriteBtn.getBoundingClientRect();
                        cardData.favoriteBtn = {
                            width: btnRect.width,
                            height: btnRect.height,
                            top: btnRect.top,
                            right: btnRect.right,
                            centerY: btnRect.top + btnRect.height / 2,
                            centerX: btnRect.left + btnRect.width / 2,
                            visible: window.getComputedStyle(favoriteBtn).opacity !== '0'
                        };
                    }
                    
                    results.push(cardData);
                }
            });
            
            return results;
        });
        
        console.log('🔍 Análisis de posicionamiento de ambos botones:');
        buttonPositions.forEach(card => {
            console.log(`\n=== CARD ${card.cardIndex} ===`);
            
            if (card.image) {
                console.log(`📸 Imagen: ${card.image.width.toFixed(1)}x${card.image.height.toFixed(1)}`);
                console.log(`   Centro Y: ${card.image.centerY.toFixed(1)}px`);
            }
            
            if (card.exploreBtn) {
                console.log(`🔗 Botón Explorar:`);
                console.log(`   Tamaño: ${card.exploreBtn.width}x${card.exploreBtn.height}`);
                console.log(`   Centro: X=${card.exploreBtn.centerX.toFixed(1)}, Y=${card.exploreBtn.centerY.toFixed(1)}`);
                console.log(`   Visible: ${card.exploreBtn.visible ? '✅ SÍ' : '❌ NO'}`);
            }
            
            if (card.favoriteBtn) {
                console.log(`❤️  Botón Favorito:`);
                console.log(`   Tamaño: ${card.favoriteBtn.width}x${card.favoriteBtn.height}`);
                console.log(`   Centro: X=${card.favoriteBtn.centerX.toFixed(1)}, Y=${card.favoriteBtn.centerY.toFixed(1)}`);
                console.log(`   Visible: ${card.favoriteBtn.visible ? '✅ SÍ' : '❌ NO'}`);
            }
            
            // Comparar alineación
            if (card.exploreBtn && card.favoriteBtn) {
                const yDiff = Math.abs(card.exploreBtn.centerY - card.favoriteBtn.centerY);
                const xDistance = Math.abs(card.exploreBtn.centerX - card.favoriteBtn.centerX);
                
                console.log(`📐 Alineación:`);
                console.log(`   Diferencia Y: ${yDiff.toFixed(1)}px ${yDiff < 2 ? '✅ ALINEADOS' : '❌ DESALINEADOS'}`);
                console.log(`   Distancia X: ${xDistance.toFixed(1)}px`);
            }
            
            if (card.image && card.exploreBtn) {
                const imageDiff = Math.abs(card.image.centerY - card.exploreBtn.centerY);
                console.log(`   Diff con imagen: ${imageDiff.toFixed(1)}px`);
            }
        });
        
        // Tomar screenshot para evidencia visual
        await page.screenshot({ 
            path: 'buttons-analysis.png',
            fullPage: false
        });
        
        console.log('\n📸 Screenshot guardado como buttons-analysis.png');
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await browser.close();
    }
}

analyzeButtons();