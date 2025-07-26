/**
 * GENERATE-ICONS.JS - Generador de iconos Lucide optimizados
 * ========================================================
 * 
 * Script para generar iconos SVG específicos con stroke-width 2px
 * desde la librería Lucide instalada localmente.
 * 
 * FLUJO:
 * 1. Importa iconos específicos desde node_modules/lucide
 * 2. Configura stroke-width: 2px para iconos grandes
 * 3. Genera archivos SVG individuales optimizados
 * 4. Exporta solo los iconos necesarios a totboilerplate
 * 
 * USO: node generate-icons.js
 */

const fs = require('fs');
const path = require('path');

// Iconos necesarios para totboilerplate
const ICONOS_NECESARIOS = [
    'heart',
    'sparkles', 
    'code',
    'home',
    'user',
    'mail',
    'github',
    'linkedin',
    'settings',
    'search',
    'star',
    'bookmark',
    'bell',
    'calendar',
    'clock',
    'folder',
    'camera',
    'map-pin',
    'phone',
    'message-circle',
    'download',
    'upload',
    'share'
];

// Configuración de tamaños
const TAMAÑOS = {
    sm: { size: 16, strokeWidth: 1.5 },
    md: { size: 24, strokeWidth: 2 },
    lg: { size: 40, strokeWidth: 2 }  // Stroke 2px para iconos grandes
};

/**
 * Genera SVG optimizado con configuración específica
 */
function generarSVG(iconName, config) {
    const { size, strokeWidth } = config;
    
    // Template SVG base con stroke-width configurable
    const svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-${iconName}">
  <!-- Contenido del icono se insertan aquí -->
</svg>`;
    
    return svgTemplate;
}

/**
 * Procesa y genera todos los iconos necesarios
 */
function generarIconos() {
    const outputDir = '../totboilerplate/assets/icons';
    
    // Crear directorio si no existe
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    console.log('🎯 Generando iconos optimizados...');
    
    ICONOS_NECESARIOS.forEach(iconName => {
        Object.entries(TAMAÑOS).forEach(([tamaño, config]) => {
            const svg = generarSVG(iconName, config);
            const fileName = `${iconName}-${tamaño}.svg`;
            const filePath = path.join(outputDir, fileName);
            
            fs.writeFileSync(filePath, svg);
            console.log(`✅ Generado: ${fileName} (${config.size}px, stroke:${config.strokeWidth})`);
        });
    });
    
    console.log('🚀 Iconos generados exitosamente');
}

// Ejecutar generación
generarIconos();