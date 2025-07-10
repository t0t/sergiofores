const puppeteer = require('puppeteer');
const path = require('path');

async function debugCSSVars() {
    const browser = await puppeteer.launch({ 
        headless: false, 
        defaultViewport: { width: 1200, height: 800 }
    });
    
    const page = await browser.newPage();
    
    try {
        const filePath = `file://${path.resolve(__dirname, 'index.html')}`;
        await page.goto(filePath, { waitUntil: 'networkidle0' });
        
        await page.waitForSelector('.reference-card', { timeout: 5000 });
        
        const cssInfo = await page.evaluate(() => {
            const firstCard = document.querySelector('.reference-card');
            const exploreBtn = firstCard.querySelector('.reference-link');
            const favoriteBtn = firstCard.querySelector('.favorite-btn');
            
            // Simular hover para mostrar botones
            firstCard.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            
            const exploreStyles = exploreBtn ? window.getComputedStyle(exploreBtn) : null;
            const favoriteStyles = favoriteBtn ? window.getComputedStyle(favoriteBtn) : null;
            
            const rootStyles = window.getComputedStyle(document.documentElement);
            
            return {
                cssVars: {
                    spaceMd: rootStyles.getPropertyValue('--space-md'),
                    spaceSm: rootStyles.getPropertyValue('--space-sm')
                },
                explore: exploreStyles ? {
                    top: exploreStyles.top,
                    right: exploreStyles.right,
                    transform: exploreStyles.transform,
                    position: exploreStyles.position
                } : null,
                favorite: favoriteStyles ? {
                    top: favoriteStyles.top,
                    right: favoriteStyles.right,
                    transform: favoriteStyles.transform,
                    position: favoriteStyles.position
                } : null
            };
        });
        
        console.log('📐 Variables CSS:');
        console.log(`   --space-md: ${cssInfo.cssVars.spaceMd}`);
        console.log(`   --space-sm: ${cssInfo.cssVars.spaceSm}`);
        
        console.log('\n🔗 Estilos del botón EXPLORAR:');
        if (cssInfo.explore) {
            console.log(`   top: ${cssInfo.explore.top}`);
            console.log(`   right: ${cssInfo.explore.right}`);
            console.log(`   transform: ${cssInfo.explore.transform}`);
            console.log(`   position: ${cssInfo.explore.position}`);
        }
        
        console.log('\n❤️ Estilos del botón FAVORITO:');
        if (cssInfo.favorite) {
            console.log(`   top: ${cssInfo.favorite.top}`);
            console.log(`   right: ${cssInfo.favorite.right}`);
            console.log(`   transform: ${cssInfo.favorite.transform}`);
            console.log(`   position: ${cssInfo.favorite.position}`);
        }
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await browser.close();
    }
}

debugCSSVars();