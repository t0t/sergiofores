/**
 * SERGIO ARTE PLÁSTICA - Clean Duplicates
 * Eliminar archivos duplicados que quedaron sueltos
 */

const fs = require('fs');
const path = require('path');

class DuplicateCleaner {
    constructor() {
        this.deletedFiles = [];
        this.errors = [];
        
        // Archivos duplicados que están correctamente organizados en subcarpetas
        this.duplicateFiles = [
            '.ds_store-1',
            '3955c791-b166-42b0-aa5b-065b6cbc2dc0-1.jpg', // ya está en 3dprinting/topografia-neural.jpg
            '87368654_498661417692348_2165792891719385088_o.jpg', // ya está en 3dprinting/estructura-algoritmica.jpg
            'autoocultamiento.png', // ya está en oil/introspeccion-silenciosa.png
            'beraja.png', // ya está en oil/turbulencia-esencial.png
            'composicion-2911.png', // ya está en oil/resonancia-primordial.png
            'composicion-291224.png', // ya está en oil/flujo-temporal.png
            'img_0864-1.jpg', // ya está en 3dprinting/fragmento-biologico.jpg
            'img_0869-1.jpg', // ya está en 3dprinting/tejido-molecular.jpg
            'img_0943-1.jpg', // ya está en 3dprinting/geometria-organica.jpg
            'img_7883-1.jpg', // ya está en 3dprinting/sedimento-digital.jpg
            'img_8631-1.jpg', // ya está en 3dprinting/paisaje-micro.jpg
            'luz-2.png', // ya está en oil/epifania-luminosa.png
            'mente-acustica-literal-1.png', // ya está en oil/sinestesia-cognitiva.png
            'proceso-2.png', // ya está en oil/metamorfosis-interior.png
            'proceso-3.png', // ya está en oil/genesis-cromatica.png
            'shejina.png', // ya está en oil/presencia-divina.png
            'tres-1.png' // ya está en oil/triada-existencial.png
        ];
    }

    /**
     * Limpiar duplicados
     */
    async cleanDuplicates() {
        console.log('🧹 LIMPIANDO ARCHIVOS DUPLICADOS\n');
        console.log('================================\n');

        const obrasDir = './images/obras';
        
        console.log('📁 Eliminando archivos duplicados de /obras/...');
        
        for (const filename of this.duplicateFiles) {
            const filePath = path.join(obrasDir, filename);
            
            if (fs.existsSync(filePath)) {
                try {
                    await fs.promises.unlink(filePath);
                    console.log(`  ✅ Eliminado: ${filename}`);
                    this.deletedFiles.push(filename);
                } catch (error) {
                    console.log(`  ❌ Error eliminando ${filename}: ${error.message}`);
                    this.errors.push({
                        type: 'file',
                        path: filePath,
                        error: error.message
                    });
                }
            } else {
                console.log(`  ➡️ ${filename} (no existe)`);
            }
        }
        
        this.printSummary();
        await this.verifyStructure();
    }

    /**
     * Verificar estructura final
     */
    async verifyStructure() {
        console.log('\n📊 VERIFICANDO ESTRUCTURA FINAL:');
        console.log('===============================');
        
        const categories = {
            'oil': './images/obras/oil',
            '3dprinting': './images/obras/3dprinting', 
            'drawing': './images/obras/drawing',
            'ink': './images/obras/ink',
            'archive': './images/archive',
            'gallery': './images/gallery',
            'videos': './images/videos'
        };
        
        let totalFiles = 0;
        
        for (const [category, dir] of Object.entries(categories)) {
            if (fs.existsSync(dir)) {
                const files = await fs.promises.readdir(dir);
                const imageFiles = files.filter(f => 
                    f.match(/\.(jpg|jpeg|png|webp|gif)$/i)
                );
                
                console.log(`  📂 ${category}: ${imageFiles.length} archivos`);
                totalFiles += imageFiles.length;
                
                // Mostrar primeros archivos como ejemplo
                if (imageFiles.length > 0) {
                    const sample = imageFiles.slice(0, 3);
                    sample.forEach(file => {
                        console.log(`     • ${file}`);
                    });
                    if (imageFiles.length > 3) {
                        console.log(`     ... y ${imageFiles.length - 3} más`);
                    }
                }
            } else {
                console.log(`  📂 ${category}: No existe`);
            }
        }
        
        // Verificar que no queden archivos sueltos
        const obrasDir = './images/obras';
        const looseFiles = await fs.promises.readdir(obrasDir);
        const looseImages = looseFiles.filter(f => 
            f.match(/\.(jpg|jpeg|png|webp|gif)$/i)
        );
        
        console.log(`\n  📊 TOTAL ARCHIVOS: ${totalFiles}`);
        console.log(`  🔍 ARCHIVOS SUELTOS: ${looseImages.length}`);
        
        if (looseImages.length > 0) {
            console.log('  ⚠️ Archivos sueltos encontrados:');
            looseImages.forEach(file => console.log(`     • ${file}`));
        } else {
            console.log('  ✅ No hay archivos sueltos - Estructura perfecta');
        }
    }

    /**
     * Imprimir resumen
     */
    printSummary() {
        console.log('\n🧹 RESUMEN DE LIMPIEZA:');
        console.log('======================');
        console.log(`✅ Archivos eliminados: ${this.deletedFiles.length}`);
        console.log(`❌ Errores: ${this.errors.length}`);
        
        if (this.deletedFiles.length > 0) {
            console.log('\n📋 ARCHIVOS ELIMINADOS:');
            this.deletedFiles.forEach(file => {
                console.log(`  • ${file}`);
            });
        }
        
        if (this.errors.length > 0) {
            console.log('\n🚨 ERRORES:');
            this.errors.forEach(error => {
                console.log(`  - ${error.type}: ${error.error}`);
            });
        }
        
        console.log('\n✨ ¡Limpieza completada!');
        console.log('La estructura está ahora perfectamente organizada.');
    }
}

// ===== CLI INTERFACE =====
if (require.main === module) {
    const cleaner = new DuplicateCleaner();
    const command = process.argv[2];
    
    switch (command) {
        case 'run':
        case 'clean':
            cleaner.cleanDuplicates();
            break;
        default:
            console.log(`
🧹 SERGIO ARTE PLÁSTICA - Clean Duplicates

Comandos disponibles:
  node js/clean-duplicates.js run    - Limpiar duplicados
  node js/clean-duplicates.js clean  - Limpiar duplicados

Funciones:
  ✅ Elimina archivos duplicados de /obras/
  ✅ Mantiene versiones organizadas en subcarpetas
  ✅ Verifica estructura final
  ✅ Reporta estadísticas completas
            `);
    }
}

module.exports = DuplicateCleaner;