#!/usr/bin/env node

/**
 * SERGIO ARTE PLÁSTICA - CLI Test Random Hero
 * Test del sistema de hero aleatorio desde línea de comandos
 */

const GALLERY_DATA = require('./js/gallery-data.js');

function testRandomSelection(iterations = 5) {
    console.log('🎨 TESTING RANDOM HERO SELECTION\n');
    console.log('=================================\n');
    
    console.log(`📊 DATOS DISPONIBLES:`);
    console.log(`  • Total obras: ${GALLERY_DATA.length}`);
    console.log(`  • Óleos: ${GALLERY_DATA.filter(a => a.path.includes('oil/')).length}`);
    console.log(`  • 3D Printing: ${GALLERY_DATA.filter(a => a.path.includes('3dprinting/')).length}`);
    console.log(`  • Dibujos: ${GALLERY_DATA.filter(a => a.path.includes('drawing/')).length}`);
    
    console.log(`\n🎲 SIMULACIÓN DE ${iterations} RECARGAS:\n`);
    
    const selections = [];
    
    for (let i = 1; i <= iterations; i++) {
        const randomIndex = Math.floor(Math.random() * GALLERY_DATA.length);
        const artwork = GALLERY_DATA[randomIndex];
        
        selections.push(artwork);
        
        console.log(`${i}. "${artwork.title}"`);
        console.log(`   📁 ${artwork.path}`);
        console.log(`   🎨 ${artwork.technique} (${artwork.year})`);
        console.log('');
    }
    
    // Verificar diversidad
    const uniqueSelections = new Set(selections.map(s => s.id));
    const diversityPercentage = Math.round((uniqueSelections.size / selections.length) * 100);
    
    console.log(`📈 ANÁLISIS:`);
    console.log(`  • Selecciones únicas: ${uniqueSelections.size}/${selections.length}`);
    console.log(`  • Diversidad: ${diversityPercentage}%`);
    
    if (diversityPercentage >= 80) {
        console.log(`  ✅ Excelente diversidad aleatoria`);
    } else if (diversityPercentage >= 60) {
        console.log(`  ⚠️ Diversidad aceptable`);
    } else {
        console.log(`  ❌ Baja diversidad - posible problema`);
    }
    
    console.log(`\n🌐 PARA PROBAR EN NAVEGADOR:`);
    console.log(`  1. Abrir http://localhost:8000`);
    console.log(`  2. Recargar página (Cmd+R) varias veces`);
    console.log(`  3. Observar cambios en imagen de fondo del hero`);
    console.log(`  4. En DevTools: testRandomHero() para análisis completo`);
    console.log(`  5. En DevTools: changeHeroImage() para cambio manual`);
}

function showCommands() {
    console.log(`
🎨 SERGIO ARTE PLÁSTICA - Random Hero Test

Comandos disponibles:
  node test-random-hero.js test [n]  - Simular n recargas (default: 5)
  node test-random-hero.js info      - Mostrar información del dataset
  node test-random-hero.js stats     - Estadísticas de las obras

Ejemplos:
  node test-random-hero.js test 10   - Simular 10 recargas
  node test-random-hero.js info      - Ver info del dataset
    `);
}

function showInfo() {
    console.log('📊 DATASET INFORMATION\n');
    console.log('======================\n');
    
    GALLERY_DATA.forEach((artwork, index) => {
        console.log(`${index + 1}. ${artwork.title}`);
        console.log(`   📁 ${artwork.path}`);
        console.log(`   🎨 ${artwork.technique}`);
        console.log(`   📅 ${artwork.year}`);
        console.log(`   📐 ${artwork.dimensions}`);
        console.log('');
    });
}

function showStats() {
    console.log('📈 DATASET STATISTICS\n');
    console.log('=====================\n');
    
    const byTechnique = {};
    const byYear = {};
    const byCategory = {};
    
    GALLERY_DATA.forEach(artwork => {
        // Por técnica
        byTechnique[artwork.technique] = (byTechnique[artwork.technique] || 0) + 1;
        
        // Por año
        byYear[artwork.year] = (byYear[artwork.year] || 0) + 1;
        
        // Por categoría (basado en path)
        if (artwork.path.includes('oil/')) {
            byCategory['Óleos'] = (byCategory['Óleos'] || 0) + 1;
        } else if (artwork.path.includes('3dprinting/')) {
            byCategory['Impresión 3D'] = (byCategory['Impresión 3D'] || 0) + 1;
        } else if (artwork.path.includes('drawing/')) {
            byCategory['Dibujos'] = (byCategory['Dibujos'] || 0) + 1;
        }
    });
    
    console.log('🎨 POR TÉCNICA:');
    Object.entries(byTechnique).forEach(([technique, count]) => {
        console.log(`  • ${technique}: ${count} obras`);
    });
    
    console.log('\n📅 POR AÑO:');
    Object.entries(byYear).sort((a, b) => b[0] - a[0]).forEach(([year, count]) => {
        console.log(`  • ${year}: ${count} obras`);
    });
    
    console.log('\n📁 POR CATEGORÍA:');
    Object.entries(byCategory).forEach(([category, count]) => {
        console.log(`  • ${category}: ${count} obras`);
    });
    
    console.log(`\n📊 TOTALES:`);
    console.log(`  • Total obras: ${GALLERY_DATA.length}`);
    console.log(`  • Años span: ${Math.min(...GALLERY_DATA.map(a => a.year))} - ${Math.max(...GALLERY_DATA.map(a => a.year))}`);
}

// CLI Interface
const command = process.argv[2];
const param = process.argv[3];

switch (command) {
    case 'test':
        const iterations = param ? parseInt(param) : 5;
        testRandomSelection(iterations);
        break;
    case 'info':
        showInfo();
        break;
    case 'stats':
        showStats();
        break;
    default:
        showCommands();
}