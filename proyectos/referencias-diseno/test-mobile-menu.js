const puppeteer = require('puppeteer');
const path = require('path');

async function testMobileMenu() {
    const browser = await puppeteer.launch({ 
        headless: false, 
        defaultViewport: { width: 375, height: 667 } // iPhone SE
    });
    
    const page = await browser.newPage();
    
    try {
        const filePath = `file://${path.resolve(__dirname, 'index.html')}`;
        await page.goto(filePath, { waitUntil: 'networkidle0' });
        
        console.log('📱 Probando menú móvil...');
        
        // Verificar que el botón hamburguesa está visible
        const hamburgerVisible = await page.evaluate(() => {
            const toggle = document.querySelector('.mobile-menu-toggle');
            if (!toggle) return false;
            const style = window.getComputedStyle(toggle);
            return style.display !== 'none';
        });
        
        console.log(`🍔 Botón hamburguesa visible: ${hamburgerVisible}`);
        
        // Verificar que el menú está oculto inicialmente
        const menuHidden = await page.evaluate(() => {
            const menu = document.querySelector('.nav-filters');
            if (!menu) return false;
            const style = window.getComputedStyle(menu);
            return style.opacity === '0' || style.visibility === 'hidden';
        });
        
        console.log(`📋 Menú inicialmente oculto: ${menuHidden}`);
        
        // Click en el botón hamburguesa
        await page.click('.mobile-menu-toggle');
        await page.waitForFunction(() => {
            const menu = document.querySelector('.nav-filters');
            return menu && menu.classList.contains('active');
        }, { timeout: 2000 });
        
        // Verificar que el menú se abre
        const menuOpen = await page.evaluate(() => {
            const menu = document.querySelector('.nav-filters');
            const overlay = document.querySelector('.mobile-menu-overlay');
            const toggle = document.querySelector('.mobile-menu-toggle');
            
            return {
                menuVisible: menu && menu.classList.contains('active'),
                overlayVisible: overlay && overlay.classList.contains('active'),
                toggleActive: toggle && toggle.classList.contains('active')
            };
        });
        
        console.log('📂 Estado del menú abierto:');
        console.log(`   Menu visible: ${menuOpen.menuVisible}`);
        console.log(`   Overlay visible: ${menuOpen.overlayVisible}`);
        console.log(`   Toggle activo: ${menuOpen.toggleActive}`);
        
        // Probar filtros
        const filters = await page.evaluate(() => {
            const filterElements = document.querySelectorAll('.nav-filter');
            return Array.from(filterElements).map(el => ({
                text: el.textContent.trim(),
                visible: window.getComputedStyle(el).opacity !== '0'
            }));
        });
        
        console.log('🏷️ Filtros en el menú:');
        filters.forEach(filter => {
            console.log(`   ${filter.text}: ${filter.visible ? 'visible' : 'oculto'}`);
        });
        
        // Click en un filtro
        await page.click('.nav-filter[data-filter="portfolio"]');
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Verificar que el menú se cierra después de seleccionar
        const menuClosed = await page.evaluate(() => {
            const menu = document.querySelector('.nav-filters');
            return menu && !menu.classList.contains('active');
        });
        
        console.log(`📋 Menú se cierra tras selección: ${menuClosed}`);
        
        // Probar responsive en diferentes tamaños
        console.log('\n📏 Probando diferentes viewports...');
        
        const viewports = [
            { width: 320, height: 568, name: 'iPhone 5' },
            { width: 375, height: 667, name: 'iPhone SE' },
            { width: 414, height: 896, name: 'iPhone 11' },
            { width: 768, height: 1024, name: 'iPad' }
        ];
        
        for (const viewport of viewports) {
            await page.setViewport(viewport);
            await new Promise(resolve => setTimeout(resolve, 300));
            
            const isMenuVisible = await page.evaluate(() => {
                const toggle = document.querySelector('.mobile-menu-toggle');
                const style = window.getComputedStyle(toggle);
                return style.display !== 'none';
            });
            
            console.log(`   ${viewport.name} (${viewport.width}x${viewport.height}): ${isMenuVisible ? 'móvil' : 'desktop'}`);
        }
        
        console.log('\n✅ Test del menú móvil completado');
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await browser.close();
    }
}

testMobileMenu();