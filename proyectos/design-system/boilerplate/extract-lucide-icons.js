/**
 * EXTRACT-LUCIDE-ICONS.JS - Extractor real de iconos Lucide
 * ========================================================
 * 
 * Script que extrae los paths reales de los iconos desde node_modules/lucide
 * y genera SVGs optimizados con stroke-width 2px para totboilerplate
 */

const fs = require('fs');
const path = require('path');

// Iconos necesarios para totboilerplate
const ICONOS_NECESARIOS = [
    'heart', 'sparkles', 'code', 'house', 'user', 'mail', 'github', 'linkedin',
    'settings', 'search', 'star', 'bookmark', 'bell', 'calendar', 'clock',
    'folder', 'camera', 'map-pin', 'phone', 'message-circle', 'download', 'upload', 'share'
];

/**
 * Extrae el contenido del path de un icono desde node_modules
 */
function extraerIconPath(iconName) {
    try {
        const iconPath = path.join(__dirname, 'node_modules', 'lucide', 'dist', 'esm', 'icons', `${iconName}.js`);
        
        if (fs.existsSync(iconPath)) {
            const content = fs.readFileSync(iconPath, 'utf8');
            
            // Buscar el patrón del path en el array: d: "path_data"
            const pathMatch = content.match(/d:\s*"([^"]+)"/);
            if (pathMatch) {
                return pathMatch[1];
            }
        }
        
        console.warn(`⚠️ No encontrado: ${iconName}`);
        return null;
    } catch (error) {
        console.error(`❌ Error extrayendo ${iconName}:`, error.message);
        return null;
    }
}

/**
 * Genera SVG completo con path extraído
 */
function generarSVGCompleto(iconName, pathData, strokeWidth = 2) {
    if (!pathData) return null;
    
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-${iconName}">
  <path d="${pathData}" />
</svg>`;
}

/**
 * Procesa y genera todos los iconos
 */
function extraerIconos() {
    const outputDir = path.join(__dirname, '../totboilerplate/assets/icons');
    
    // Crear directorio si no existe
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    console.log('🎯 Extrayendo iconos desde Lucide...');
    
    let exitosos = 0;
    let fallidos = 0;
    
    ICONOS_NECESARIOS.forEach(iconName => {
        const pathData = extraerIconPath(iconName);
        
        if (pathData) {
            // Generar versión con stroke-width 2px para iconos grandes
            const svg = generarSVGCompleto(iconName, pathData, 2);
            const fileName = `${iconName}.svg`;
            const filePath = path.join(outputDir, fileName);
            
            fs.writeFileSync(filePath, svg);
            console.log(`✅ Extraído: ${fileName} (stroke-width: 2px)`);
            exitosos++;
        } else {
            fallidos++;
        }
    });
    
    console.log(`\n🚀 Extracción completada: ${exitosos} exitosos, ${fallidos} fallidos`);
}

// Ejecutar extracción
extraerIconos();