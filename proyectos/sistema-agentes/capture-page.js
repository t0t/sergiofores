const puppeteer = require('puppeteer');
const path = require('path');

async function captureWebpage() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Configurar viewport para desktop
    await page.setViewport({
        width: 1200,
        height: 800,
        deviceScaleFactor: 1
    });
    
    // Cargar la página local
    const filePath = `file://${path.resolve(__dirname, 'index.html')}`;
    console.log(`Capturando: ${filePath}`);
    
    try {
        await page.goto(filePath, { waitUntil: 'networkidle0' });
        
        // Esperar a que los iconos de Lucide se carguen
        await page.waitForFunction(() => {
            return window.lucide && typeof window.lucide.createIcons === 'function';
        }, { timeout: 5000 });
        
        // Capturar screenshot
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const screenshotPath = `screenshot-${timestamp}.png`;
        
        await page.screenshot({
            path: screenshotPath,
            fullPage: true
        });
        
        console.log(`✅ Captura guardada: ${screenshotPath}`);
        
    } catch (error) {
        console.error('❌ Error al capturar:', error.message);
    } finally {
        await browser.close();
    }
}

captureWebpage();