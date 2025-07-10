const puppeteer = require('puppeteer');
const path = require('path');

async function debugStructure() {
    const browser = await puppeteer.launch({ 
        headless: false, 
        defaultViewport: { width: 1200, height: 800 }
    });
    
    const page = await browser.newPage();
    
    try {
        const filePath = `file://${path.resolve(__dirname, 'index.html')}`;
        await page.goto(filePath, { waitUntil: 'networkidle0' });
        
        console.log('📄 Analizando estructura HTML de la primera card...');
        
        await page.waitForSelector('.reference-card', { timeout: 5000 });
        
        const structure = await page.evaluate(() => {
            const firstCard = document.querySelector('.reference-card');
            
            function getElementInfo(element, level = 0) {
                if (!element) return null;
                
                const indent = '  '.repeat(level);
                const tagName = element.tagName.toLowerCase();
                const classes = element.className ? `.${element.className.split(' ').join('.')}` : '';
                const styles = window.getComputedStyle(element);
                const position = styles.position;
                const top = styles.top;
                const right = styles.right;
                
                let info = `${indent}${tagName}${classes}`;
                if (position !== 'static') {
                    info += ` [pos:${position} top:${top} right:${right}]`;
                }
                
                return {
                    info,
                    children: Array.from(element.children).map(child => getElementInfo(child, level + 1))
                };
            }
            
            return getElementInfo(firstCard);
        });
        
        function printStructure(node) {
            if (!node) return;
            console.log(node.info);
            if (node.children) {
                node.children.forEach(printStructure);
            }
        }
        
        printStructure(structure);
        
        // También mostrar donde están los botones específicamente
        const buttonInfo = await page.evaluate(() => {
            const firstCard = document.querySelector('.reference-card');
            const exploreBtn = firstCard.querySelector('.reference-link');
            const favoriteBtn = firstCard.querySelector('.favorite-btn');
            
            function getParentChain(element) {
                const chain = [];
                let current = element;
                while (current && current !== document.body) {
                    chain.push({
                        tag: current.tagName.toLowerCase(),
                        classes: current.className,
                        position: window.getComputedStyle(current).position
                    });
                    current = current.parentElement;
                }
                return chain;
            }
            
            return {
                explore: exploreBtn ? getParentChain(exploreBtn) : null,
                favorite: favoriteBtn ? getParentChain(favoriteBtn) : null
            };
        });
        
        console.log('\n🔗 Cadena de padres del botón EXPLORAR:');
        if (buttonInfo.explore) {
            buttonInfo.explore.forEach((parent, i) => {
                console.log(`  ${i}: ${parent.tag}.${parent.classes.replace(/\s+/g, '.')} [${parent.position}]`);
            });
        }
        
        console.log('\n❤️ Cadena de padres del botón FAVORITO:');
        if (buttonInfo.favorite) {
            buttonInfo.favorite.forEach((parent, i) => {
                console.log(`  ${i}: ${parent.tag}.${parent.classes.replace(/\s+/g, '.')} [${parent.position}]`);
            });
        }
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await browser.close();
    }
}

debugStructure();