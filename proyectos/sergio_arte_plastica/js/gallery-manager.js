/**
 * SERGIO ARTE PLÁSTICA - Gallery Manager
 * Script maestro para gestión completa de la galería
 */

const { 
    ImageUtils, 
    ImageRenamer, 
    ImageOptimizer, 
    GalleryGenerator 
} = require('./image-utils');

const { 
    LazyLoadingGenerator, 
    WebPGenerator, 
    PerformanceAnalyzer 
} = require('./performance-optimizer');

const fs = require('fs');
const path = require('path');

// ===== MANAGER PRINCIPAL =====
class GalleryManager {
    constructor() {
        this.imageRenamer = new ImageRenamer();
        this.imageOptimizer = new ImageOptimizer();
        this.galleryGenerator = new GalleryGenerator();
        this.lazyLoadingGenerator = new LazyLoadingGenerator();
        this.webpGenerator = new WebPGenerator();
        this.performanceAnalyzer = new PerformanceAnalyzer();
        
        this.processLog = [];
    }

    /**
     * PROCESO COMPLETO: Desde imágenes en archivo hasta galería optimizada
     */
    async processCompleteGallery() {
        console.log('🎨 INICIANDO PROCESO COMPLETO DE GALERÍA\n');
        console.log('=====================================\n');
        
        try {
            // 1. Organización inicial
            await this.step1_InitialSetup();
            
            // 2. Renombrado inteligente
            await this.step2_RenameImages();
            
            // 3. Optimización de imágenes
            await this.step3_OptimizeImages();
            
            // 4. Generación de formatos modernos
            await this.step4_GenerateModernFormats();
            
            // 5. Creación de datos de galería
            await this.step5_GenerateGalleryData();
            
            // 6. Implementación de lazy loading
            await this.step6_SetupLazyLoading();
            
            // 7. Análisis final de performance
            await this.step7_PerformanceAnalysis();
            
            // 8. Integración con HTML
            await this.step8_IntegrateWithHTML();
            
            this.printFinalSummary();
            
        } catch (error) {
            console.error('❌ Error en el proceso:', error);
            this.saveErrorLog(error);
        }
    }

    async step1_InitialSetup() {
        console.log('📁 PASO 1: Configuración inicial\n');
        
        // Crear directorios necesarios
        const dirs = [
            './images/obras/oil',
            './images/obras/ink', 
            './images/obras/drawing',
            './images/obras/3dprinting',
            './images/thumbnails',
            './images/webp'
        ];
        
        for (const dir of dirs) {
            if (!fs.existsSync(dir)) {
                await fs.promises.mkdir(dir, { recursive: true });
                console.log(`✅ Directorio creado: ${dir}`);
            }
        }
        
        // Mover imágenes del archivo a categorías apropiadas
        await this.categorizeArchiveImages();
        
        this.logStep('Configuración inicial completada');
    }

    async categorizeArchiveImages() {
        const archiveDir = './images/archive';
        if (!fs.existsSync(archiveDir)) return;
        
        const files = await fs.promises.readdir(archiveDir);
        const imageFiles = files.filter(file => 
            ['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase())
        );
        
        console.log(`📦 Categorizando ${imageFiles.length} imágenes del archivo...`);
        
        for (const file of imageFiles) {
            const category = this.determineCategory(file);
            const sourcePath = path.join(archiveDir, file);
            const targetPath = path.join('./images/obras', category, file);
            
            try {
                await fs.promises.rename(sourcePath, targetPath);
                console.log(`  ✅ ${file} → ${category}/`);
            } catch (error) {
                console.log(`  ⚠️  No se pudo mover ${file}: ${error.message}`);
            }
        }
    }

    determineCategory(filename) {
        const name = filename.toLowerCase();
        
        if (name.includes('3d') || name.includes('print') || name.includes('escultura')) {
            return '3dprinting';
        }
        if (name.includes('tinta') || name.includes('ink') || name.includes('caligrafia')) {
            return 'ink';
        }
        if (name.includes('dibujo') || name.includes('sketch') || name.includes('drawing')) {
            return 'drawing';
        }
        
        // Por defecto, óleo
        return 'oil';
    }

    async step2_RenameImages() {
        console.log('\n🏷️  PASO 2: Renombrado inteligente\n');
        
        await this.imageRenamer.renameAllImages();
        this.logStep('Renombrado completado');
    }

    async step3_OptimizeImages() {
        console.log('\n🎨 PASO 3: Optimización de imágenes\n');
        
        await this.imageOptimizer.optimizeAllImages();
        this.logStep('Optimización completada');
    }

    async step4_GenerateModernFormats() {
        console.log('\n🚀 PASO 4: Generación de formatos modernos\n');
        
        await this.webpGenerator.generateWebPVersions();
        this.logStep('Formatos modernos generados');
    }

    async step5_GenerateGalleryData() {
        console.log('\n📊 PASO 5: Generación de datos de galería\n');
        
        await this.galleryGenerator.generateGalleryData();
        this.logStep('Datos de galería generados');
    }

    async step6_SetupLazyLoading() {
        console.log('\n⚡ PASO 6: Configuración de lazy loading\n');
        
        await this.lazyLoadingGenerator.writeLazyLoadingFile();
        this.logStep('Lazy loading configurado');
    }

    async step7_PerformanceAnalysis() {
        console.log('\n📈 PASO 7: Análisis de performance\n');
        
        await this.performanceAnalyzer.analyzePerformance();
        this.logStep('Análisis de performance completado');
    }

    async step8_IntegrateWithHTML() {
        console.log('\n🔗 PASO 8: Integración con HTML\n');
        
        await this.updateHTMLWithNewGallery();
        this.logStep('Integración HTML completada');
    }

    async updateHTMLWithNewGallery() {
        // Leer datos de galería generados
        const galleryData = require('./gallery-data.js');
        
        // Generar HTML para la galería principal (3 obras destacadas)
        const featuredArtworks = galleryData.slice(0, 3);
        const galleryHTML = featuredArtworks.map(artwork => `
                <article class="artwork">
                    <picture>
                        <source srcset="images/${artwork.path.replace(/\.(jpg|jpeg|png)$/i, '.webp')}" type="image/webp">
                        <img src="images/${artwork.path}" alt="${artwork.title}" class="artwork-image" loading="lazy">
                    </picture>
                </article>`).join('');
        
        // Generar HTML para la modal con todas las obras
        const modalHTML = galleryData.map((artwork, index) => `
                    <div class="carousel-slide${index === 0 ? ' active' : ''}">
                        <picture>
                            <source srcset="images/${artwork.path.replace(/\.(jpg|jpeg|png)$/i, '.webp')}" type="image/webp">
                            <img src="images/${artwork.path}" alt="${artwork.title}" class="carousel-image">
                        </picture>
                        <div class="carousel-info">
                            <h3>${artwork.title}</h3>
                            <p>${artwork.technique}, ${artwork.dimensions} • ${artwork.year}</p>
                        </div>
                    </div>`).join('');
        
        console.log(`✅ HTML generado para ${galleryData.length} obras`);
        console.log('📝 Fragmentos HTML guardados en gallery-fragments.html');
        
        // Guardar fragmentos para integración manual
        const fragments = `<!-- FRAGMENTO GALERÍA PRINCIPAL -->
<div class="gallery-grid">
${galleryHTML}
</div>

<!-- FRAGMENTO MODAL CAROUSEL -->
<div class="carousel-track" id="carouselTrack">
${modalHTML}
</div>

<!-- SCRIPT DE INICIALIZACIÓN -->
<script>
// Datos de galería disponibles globalmente
window.GALLERY_DATA = ${JSON.stringify(galleryData, null, 2)};

// Inicializar contador de indicadores
const indicatorsContainer = document.getElementById('carouselIndicators');
if (indicatorsContainer) {
    indicatorsContainer.innerHTML = '';
    for (let i = 0; i < ${galleryData.length}; i++) {
        const indicator = document.createElement('button');
        indicator.className = 'carousel-indicator' + (i === 0 ? ' active' : '');
        indicator.setAttribute('data-slide', i);
        indicatorsContainer.appendChild(indicator);
    }
}
</script>`;
        
        await fs.promises.writeFile('./gallery-fragments.html', fragments);
    }

    logStep(message) {
        this.processLog.push({
            timestamp: new Date().toISOString(),
            message: message
        });
    }

    printFinalSummary() {
        console.log('\n🎉 PROCESO COMPLETADO EXITOSAMENTE!\n');
        console.log('=====================================\n');
        
        console.log('📋 RESUMEN DEL PROCESO:');
        this.processLog.forEach((log, index) => {
            console.log(`${index + 1}. ✅ ${log.message}`);
        });
        
        console.log('\n📁 ARCHIVOS GENERADOS:');
        console.log('  • gallery-data.js - Datos de galería para JavaScript');
        console.log('  • gallery-data.json - Datos de galería en JSON');
        console.log('  • gallery-fragments.html - Fragmentos HTML para integrar');
        console.log('  • lazy-loading.js - Sistema de carga perezosa');
        console.log('  • webp-support.js - Soporte para formato WebP');
        console.log('  • performance-report.html - Reporte de rendimiento');
        
        console.log('\n🚀 PRÓXIMOS PASOS:');
        console.log('  1. Revisar gallery-fragments.html');
        console.log('  2. Integrar fragmentos en index.html');
        console.log('  3. Incluir scripts generados en el HTML');
        console.log('  4. Probar funcionamiento en navegador');
        console.log('  5. Revisar performance-report.html para optimizaciones');
        
        console.log('\n🎨 ¡Tu galería está lista para impresionar!\n');
    }

    async saveErrorLog(error) {
        const errorLog = {
            timestamp: new Date().toISOString(),
            error: error.message,
            stack: error.stack,
            processLog: this.processLog
        };
        
        await fs.promises.writeFile('./error-log.json', JSON.stringify(errorLog, null, 2));
        console.log('📝 Log de errores guardado en error-log.json');
    }

    /**
     * MÉTODOS INDIVIDUALES para ejecutar pasos específicos
     */
    
    async quickOptimize() {
        console.log('⚡ Optimización rápida iniciada...\n');
        await this.imageOptimizer.optimizeAllImages();
        await this.performanceAnalyzer.analyzePerformance();
        console.log('✅ Optimización rápida completada');
    }

    async updateGalleryData() {
        console.log('📊 Actualizando datos de galería...\n');
        await this.galleryGenerator.generateGalleryData();
        await this.updateHTMLWithNewGallery();
        console.log('✅ Datos de galería actualizados');
    }

    async performanceAudit() {
        console.log('📈 Iniciando auditoría de performance...\n');
        await this.performanceAnalyzer.analyzePerformance();
        console.log('✅ Auditoría completada - Revisa performance-report.html');
    }
}

// ===== EXPORTACIÓN Y CLI =====
module.exports = GalleryManager;

// CLI para ejecución desde línea de comandos
if (require.main === module) {
    const manager = new GalleryManager();
    const command = process.argv[2];
    
    switch (command) {
        case 'full':
            manager.processCompleteGallery();
            break;
        case 'optimize':
            manager.quickOptimize();
            break;
        case 'update':
            manager.updateGalleryData();
            break;
        case 'audit':
            manager.performanceAudit();
            break;
        default:
            console.log(`
🎨 SERGIO ARTE PLÁSTICA - Gallery Manager

Comandos disponibles:
  node js/gallery-manager.js full      - Proceso completo de galería
  node js/gallery-manager.js optimize  - Optimización rápida
  node js/gallery-manager.js update    - Actualizar datos de galería
  node js/gallery-manager.js audit     - Auditoría de performance

Ejemplos:
  npm run gallery:full
  npm run gallery:optimize
  npm run gallery:update
  npm run gallery:audit
            `);
    }
}