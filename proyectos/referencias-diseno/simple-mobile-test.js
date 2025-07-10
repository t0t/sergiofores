const puppeteer = require('puppeteer');
const path = require('path');

async function simpleMobileTest() {
    const browser = await puppeteer.launch({ 
        headless: false, 
        defaultViewport: { width: 375, height: 667 }
    });
    
    const page = await browser.newPage();
    
    try {
        const filePath = `file://${path.resolve(__dirname, 'index.html')}`;
        await page.goto(filePath, { waitUntil: 'networkidle0' });
        
        console.log('📱 Probando menú móvil básico...');
        
        // Verificar elementos principales
        const elements = await page.evaluate(() => {
            return {
                hamburger: !!document.querySelector('.mobile-menu-toggle'),
                menu: !!document.querySelector('.nav-filters'),
                overlay: !!document.querySelector('.mobile-menu-overlay'),
                filters: document.querySelectorAll('.nav-filter').length
            };
        });
        
        console.log('🔍 Elementos encontrados:', elements);
        
        // Verificar estado inicial
        const initialState = await page.evaluate(() => {
            const toggle = document.querySelector('.mobile-menu-toggle');
            const menu = document.querySelector('.nav-filters');
            const hamburgerDisplay = window.getComputedStyle(toggle).display;
            const menuVisible = menu.classList.contains('active');
            
            return {
                hamburgerVisible: hamburgerDisplay !== 'none',
                menuOpen: menuVisible
            };
        });
        
        console.log('⚡ Estado inicial:', initialState);
        
        // Click en hamburguesa
        await page.click('.mobile-menu-toggle');
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Verificar estado después del click
        const afterClick = await page.evaluate(() => {
            const menu = document.querySelector('.nav-filters');
            const overlay = document.querySelector('.mobile-menu-overlay');
            const toggle = document.querySelector('.mobile-menu-toggle');
            
            return {
                menuOpen: menu.classList.contains('active'),
                overlayOpen: overlay.classList.contains('active'),
                toggleActive: toggle.classList.contains('active')
            };
        });
        
        console.log('🎯 Después del click:', afterClick);
        
        console.log('\n✅ Test básico completado');
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await browser.close();
    }
}

simpleMobileTest();