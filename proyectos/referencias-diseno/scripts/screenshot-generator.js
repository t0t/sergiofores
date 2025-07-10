const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Referencias web a capturar
const referencias = [
    'https://dept-of-transformation.org/library/microsolidarity',
    'https://dept-of-transformation.org/companions/prem-krishnamurthy',
    'https://2022.ccncn.eu/',
    'http://adrienrovero.com/spaces/spaces-by-year/',
    'https://creative.starbucks.com/',
    'https://apossible.com',
    'https://www.make-ready.co/',
    'https://www.commission.studio/',
    'https://flyingbisons.com/',
    'https://showandtell.agency/',
    'https://www.paulsmithsfoundation.org/',
    'https://moheim.com/',
    'https://slowness.com/',
    'https://weaintplastic.com/',
    'https://neverland.agency/',
    'https://www.birchlondon.com/info',
    'https://www.official.business/',
    'https://kimkneipp.com/',
    'https://kasama.limnia.com/',
    'https://menudurable.ca/en/',
    'https://lekhoa.com/',
    'https://www.rezo-zero.com/',
    'https://www.stewartpartners.studio/',
    'https://koraliving.com/',
    'https://starfadesinternational.com/design/',
    'https://guiacirugiacardiaca.com/',
    'https://www.aainteriordesign.com.ua/',
    'https://vitaarchitecture.com/',
    'https://www.seedlipdrinks.com/en-row/recipes/spice-and-ginger-ale/',
    'https://www.brdr-kruger.com/',
    'https://www.elastique.de/work/viega-produktinszenierung/',
    'https://yourmajesty.co/',
    'https://tenzr-preprod.rejouice.io/',
    'https://favorit.studio/',
    'https://antara.studio/',
    'https://www.megan-ross.com/',
    'https://theodore-rousseau.dk/',
    'https://www.wokine.com/',
    'https://www.thewayofcode.com/',
    // Nuevas referencias agregadas
    'https://verde.io/',
    'https://temper.studio/',
    'https://seated.nyc/',
    'https://mushstudios.co/',
    'https://livinghouse.nz/',
    'https://www.clueperfumery.com/',
    'https://www.medusmo.com/',
    'https://caladan.bio/',
    'https://www.camilarosa.net/',
    'https://www.studiolenzing.com/',
    'https://thebanshies.com/en',
    'https://www.elwyn.co/',
    'https://readymag.com/designs/5647067/',
    'https://minimal.gallery/'
];

// Función para generar nombre de archivo limpio
function generateFileName(url) {
    return url
        .replace(/^https?:\/\//, '')
        .replace(/[^a-zA-Z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase();
}

// Función para capturar screenshot
async function captureScreenshot(browser, url, outputDir) {
    const page = await browser.newPage();
    
    try {
        console.log(`📸 Capturando: ${url}`);
        
        // Configurar viewport
        await page.setViewport({
            width: 1400,
            height: 900,
            deviceScaleFactor: 1
        });
        
        // Navegar a la URL con timeout
        await page.goto(url, { 
            waitUntil: 'networkidle2', 
            timeout: 30000 
        });
        
        // Esperar un poco más para animaciones
        await page.waitForTimeout(2000);
        
        // Generar nombre de archivo
        const fileName = generateFileName(url);
        const filePath = path.join(outputDir, `${fileName}.jpg`);
        
        // Capturar screenshot
        await page.screenshot({
            path: filePath,
            type: 'jpeg',
            quality: 90,
            fullPage: false
        });
        
        console.log(`✅ Guardado: ${fileName}.jpg`);
        
        return {
            url: url,
            fileName: `${fileName}.jpg`,
            success: true
        };
        
    } catch (error) {
        console.error(`❌ Error capturando ${url}:`, error.message);
        return {
            url: url,
            fileName: null,
            success: false,
            error: error.message
        };
    } finally {
        await page.close();
    }
}

// Función principal
async function generateScreenshots() {
    // Crear directorio de screenshots
    const outputDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    console.log('🚀 Iniciando captura de screenshots...');
    console.log(`📁 Directorio de salida: ${outputDir}`);
    
    // Lanzar browser
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const results = [];
    
    // Procesar cada referencia
    for (const url of referencias) {
        const result = await captureScreenshot(browser, url, outputDir);
        results.push(result);
        
        // Pausa entre capturas
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    await browser.close();
    
    // Generar reporte
    const reporte = {
        timestamp: new Date().toISOString(),
        total: results.length,
        exitosas: results.filter(r => r.success).length,
        fallidas: results.filter(r => !r.success).length,
        resultados: results
    };
    
    // Guardar reporte
    fs.writeFileSync(
        path.join(outputDir, 'reporte-screenshots.json'),
        JSON.stringify(reporte, null, 2)
    );
    
    console.log('\\n📊 REPORTE FINAL:');
    console.log(`✅ Exitosas: ${reporte.exitosas}`);
    console.log(`❌ Fallidas: ${reporte.fallidas}`);
    console.log(`📄 Reporte guardado en: reporte-screenshots.json`);
    
    return reporte;
}

// Ejecutar si se llama directamente
if (require.main === module) {
    generateScreenshots()
        .then(() => {
            console.log('🎉 Proceso completado');
            process.exit(0);
        })
        .catch(error => {
            console.error('💥 Error fatal:', error);
            process.exit(1);
        });
}

module.exports = { generateScreenshots, captureScreenshot };