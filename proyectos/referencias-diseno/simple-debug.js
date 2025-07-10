const puppeteer = require('puppeteer');
const path = require('path');

async function simpleDebug() {
    const browser = await puppeteer.launch({ 
        headless: false, 
        defaultViewport: { width: 1200, height: 800 }
    });
    
    const page = await browser.newPage();
    
    try {
        const filePath = `file://${path.resolve(__dirname, 'index.html')}`;
        await page.goto(filePath, { waitUntil: 'networkidle0' });
        
        await page.waitForSelector('.reference-card', { timeout: 5000 });
        
        const buttonInfo = await page.evaluate(() => {
            const firstCard = document.querySelector('.reference-card');
            const exploreBtn = firstCard.querySelector('.reference-link');
            const favoriteBtn = firstCard.querySelector('.favorite-btn');
            
            return {
                explore: {
                    exists: !!exploreBtn,
                    parent: exploreBtn ? exploreBtn.parentElement.className : null,
                    grandparent: exploreBtn ? exploreBtn.parentElement.parentElement.className : null
                },
                favorite: {
                    exists: !!favoriteBtn,
                    parent: favoriteBtn ? favoriteBtn.parentElement.className : null,
                    grandparent: favoriteBtn ? favoriteBtn.parentElement.parentElement.className : null
                }
            };
        });
        
        console.log('🔗 Botón EXPLORAR:');
        console.log(`   Existe: ${buttonInfo.explore.exists}`);
        console.log(`   Padre: ${buttonInfo.explore.parent}`);
        console.log(`   Abuelo: ${buttonInfo.explore.grandparent}`);
        
        console.log('\n❤️ Botón FAVORITO:');
        console.log(`   Existe: ${buttonInfo.favorite.exists}`);
        console.log(`   Padre: ${buttonInfo.favorite.parent}`);
        console.log(`   Abuelo: ${buttonInfo.favorite.grandparent}`);
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await browser.close();
    }
}

simpleDebug();