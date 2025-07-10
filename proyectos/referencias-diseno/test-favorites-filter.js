const puppeteer = require('puppeteer');
const path = require('path');

async function testFavoritesFilter() {
    const browser = await puppeteer.launch({ 
        headless: false, 
        defaultViewport: { width: 1200, height: 800 }
    });
    
    const page = await browser.newPage();
    
    try {
        const filePath = `file://${path.resolve(__dirname, 'index.html')}`;
        await page.goto(filePath, { waitUntil: 'networkidle0' });
        
        console.log('🔍 Probando filtro de favoritos...');
        
        // Verificar que existe el filtro de favoritos
        const favoritesFilter = await page.evaluate(() => {
            const filter = document.querySelector('.nav-filter[data-filter="favorites"]');
            return filter ? filter.textContent.trim() : null;
        });
        
        console.log(`📋 Filtro de favoritos encontrado: "${favoritesFilter}"`);
        
        // Verificar que no hay contador de favoritos
        const counterExists = await page.evaluate(() => {
            return !!document.querySelector('.favorites-count');
        });
        
        console.log(`📊 Contador de favoritos eliminado: ${!counterExists}`);
        
        // Añadir algunos favoritos
        await page.evaluate(() => {
            const firstCard = document.querySelector('.reference-card');
            const favoriteBtn = firstCard.querySelector('.favorite-btn');
            if (favoriteBtn) favoriteBtn.click();
        });
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Probar el filtro de favoritos
        await page.click('.nav-filter[data-filter="favorites"]');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Verificar que solo se muestran favoritos
        const visibleCards = await page.evaluate(() => {
            const cards = document.querySelectorAll('.reference-card');
            let visibleCount = 0;
            cards.forEach(card => {
                const style = window.getComputedStyle(card);
                if (style.display !== 'none' && style.opacity !== '0') {
                    visibleCount++;
                }
            });
            return visibleCount;
        });
        
        console.log(`👁️ Cards visibles con filtro favoritos: ${visibleCards}`);
        
        // Volver a mostrar todos
        await page.click('.nav-filter[data-filter="all"]');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const allVisibleCards = await page.evaluate(() => {
            const cards = document.querySelectorAll('.reference-card');
            let visibleCount = 0;
            cards.forEach(card => {
                const style = window.getComputedStyle(card);
                if (style.display !== 'none' && style.opacity !== '0') {
                    visibleCount++;
                }
            });
            return visibleCount;
        });
        
        console.log(`👁️ Cards visibles con filtro "todos": ${allVisibleCards}`);
        
        console.log('\n✅ Test del filtro de favoritos completado');
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await browser.close();
    }
}

testFavoritesFilter();