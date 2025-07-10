const puppeteer = require('puppeteer');
const path = require('path');

async function examineProject() {
    const browser = await puppeteer.launch({ 
        headless: false, 
        defaultViewport: { width: 1200, height: 800 }
    });
    
    const page = await browser.newPage();
    
    try {
        // Cargar la página local
        const filePath = `file://${path.resolve(__dirname, 'index.html')}`;
        await page.goto(filePath, { waitUntil: 'networkidle0' });
        
        console.log('📄 Página cargada');
        
        // Esperar a que se carguen los elementos
        await page.waitForSelector('.reference-card', { timeout: 5000 });
        
        // Examinar el posicionamiento de los botones
        const buttonPositions = await page.evaluate(() => {
            const cards = document.querySelectorAll('.reference-card');
            const results = [];
            
            cards.forEach((card, index) => {
                if (index < 3) { // Solo examinar las primeras 3 cards
                    const image = card.querySelector('.reference-image');
                    const button = card.querySelector('.reference-link');
                    
                    if (image && button) {
                        const imageRect = image.getBoundingClientRect();
                        const buttonRect = button.getBoundingClientRect();
                        
                        results.push({
                            cardIndex: index,
                            imageWidth: imageRect.width,
                            imageHeight: imageRect.height,
                            imageTop: imageRect.top,
                            imageRight: imageRect.right,
                            buttonTop: buttonRect.top,
                            buttonRight: buttonRect.right,
                            buttonWidth: buttonRect.width,
                            buttonHeight: buttonRect.height,
                            isButtonVisible: button.style.opacity !== '0',
                            buttonCenterY: buttonRect.top + buttonRect.height / 2,
                            imageCenterY: imageRect.top + imageRect.height / 2,
                            isButtonCutOff: buttonRect.right > imageRect.right || buttonRect.left < imageRect.left
                        });
                    }
                }
            });
            
            return results;
        });
        
        console.log('🔍 Análisis de posicionamiento:');
        buttonPositions.forEach(pos => {
            console.log(`\nCard ${pos.cardIndex}:`);
            console.log(`  Imagen: ${pos.imageWidth}x${pos.imageHeight}`);
            console.log(`  Botón: ${pos.buttonWidth}x${pos.buttonHeight}`);
            console.log(`  Centro imagen Y: ${pos.imageCenterY.toFixed(1)}`);
            console.log(`  Centro botón Y: ${pos.buttonCenterY.toFixed(1)}`);
            console.log(`  Diferencia centrado: ${Math.abs(pos.imageCenterY - pos.buttonCenterY).toFixed(1)}px`);
            console.log(`  ¿Botón cortado?: ${pos.isButtonCutOff ? '❌ SÍ' : '✅ NO'}`);
            console.log(`  Botón derecha: ${pos.buttonRight.toFixed(1)}px`);
            console.log(`  Imagen derecha: ${pos.imageRight.toFixed(1)}px`);
        });
        
        // Hacer hover en la primera card para ver el botón
        await page.hover('.reference-card:first-child');
        await page.waitForTimeout(500);
        
        // Tomar screenshot
        await page.screenshot({ 
            path: 'layout-analysis.png',
            fullPage: false
        });
        
        console.log('\n📸 Screenshot guardado como layout-analysis.png');
        
        // Verificar estilos CSS aplicados
        const buttonStyles = await page.evaluate(() => {
            const button = document.querySelector('.reference-link');
            if (button) {
                const styles = window.getComputedStyle(button);
                return {
                    position: styles.position,
                    top: styles.top,
                    right: styles.right,
                    transform: styles.transform,
                    width: styles.width,
                    height: styles.height,
                    opacity: styles.opacity
                };
            }
            return null;
        });
        
        console.log('\n🎨 Estilos CSS aplicados al botón:');
        console.log(buttonStyles);
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await browser.close();
    }
}

examineProject();