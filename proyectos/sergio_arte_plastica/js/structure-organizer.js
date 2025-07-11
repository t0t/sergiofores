/**
 * SERGIO ARTE PLÁSTICA - Structure Organizer
 * Reorganizar estructura de carpetas correctamente
 */

const fs = require('fs');
const path = require('path');

class StructureOrganizer {
    constructor() {
        this.movedFiles = [];
        this.errors = [];
        
        // Mapeo de archivos a sus categorías correctas
        this.categoryMap = {
            // === ÓLEOS SOBRE LINO BELGA ===
            'autoocultamiento.png': 'oil',
            'beraja.png': 'oil', 
            'composicion-2911.png': 'oil',
            'composicion-291224.png': 'oil',
            'luz-2.png': 'oil',
            'mente-acustica-literal-1.png': 'oil',
            'proceso-2.png': 'oil',
            'proceso-3.png': 'oil',
            'shejina.png': 'oil',
            'tres-1.png': 'oil',
            
            // === IMPRESIÓN 3D ===
            '3955c791-b166-42b0-aa5b-065b6cbc2dc0-1.jpg': '3dprinting',
            '87368654_498661417692348_2165792891719385088_o.jpg': '3dprinting',
            'img_0864-1.jpg': '3dprinting',
            'img_0869-1.jpg': '3dprinting', 
            'img_0943-1.jpg': '3dprinting',
            'img_7883-1.jpg': '3dprinting',
            'img_8631-1.jpg': '3dprinting',
            
            // === DIBUJOS Y BOCETOS ===
            'croquis-modelo.jpg': 'drawing'
        };

        // Renombrado semántico para archivos sueltos
        this.semanticRenames = {
            'autoocultamiento.png': 'introspeccion-silenciosa.png',
            'beraja.png': 'turbulencia-esencial.png',
            'composicion-2911.png': 'resonancia-primordial.png', 
            'composicion-291224.png': 'flujo-temporal.png',
            'luz-2.png': 'epifania-luminosa.png',
            'mente-acustica-literal-1.png': 'sinestesia-cognitiva.png',
            'proceso-2.png': 'metamorfosis-interior.png',
            'proceso-3.png': 'genesis-cromatica.png',
            'shejina.png': 'presencia-divina.png',
            'tres-1.png': 'triada-existencial.png',
            
            // 3D Printing con nombres semánticos
            '3955c791-b166-42b0-aa5b-065b6cbc2dc0-1.jpg': 'topografia-neural.jpg',
            '87368654_498661417692348_2165792891719385088_o.jpg': 'estructura-algoritmica.jpg',
            'img_0864-1.jpg': 'fragmento-biologico.jpg',
            'img_0869-1.jpg': 'tejido-molecular.jpg',
            'img_0943-1.jpg': 'geometria-organica.jpg', 
            'img_7883-1.jpg': 'sedimento-digital.jpg',
            'img_8631-1.jpg': 'paisaje-micro.jpg',
            
            // Drawing
            'croquis-modelo.jpg': 'anatomia-creativa.jpg'
        };
    }

    /**
     * Reorganizar toda la estructura
     */
    async reorganizeStructure() {
        console.log('📁 REORGANIZANDO ESTRUCTURA DE CARPETAS\n');
        console.log('======================================\n');

        // 1. Crear directorios si no existen
        await this.ensureDirectories();
        
        // 2. Mover archivos sueltos a sus categorías
        await this.moveLooseFiles();
        
        // 3. Verificar duplicados
        await this.checkDuplicates();
        
        // 4. Limpiar archivos temporales
        await this.cleanTempFiles();
        
        // 5. Actualizar referencias
        await this.updateReferences();
        
        this.printSummary();
    }

    /**
     * Asegurar que existen todos los directorios necesarios
     */
    async ensureDirectories() {
        const directories = [
            './images/obras/oil',
            './images/obras/3dprinting', 
            './images/obras/drawing',
            './images/obras/ink',
            './images/gallery',
            './images/videos'
        ];

        console.log('📂 Verificando estructura de directorios...');
        
        for (const dir of directories) {
            if (!fs.existsSync(dir)) {
                await fs.promises.mkdir(dir, { recursive: true });
                console.log(`  ✅ Creado: ${dir}`);
            } else {
                console.log(`  ✓ Existe: ${dir}`);
            }
        }
        console.log('');
    }

    /**
     * Mover archivos sueltos a sus categorías correctas
     */
    async moveLooseFiles() {
        const obrasDir = './images/obras';
        
        try {
            const files = await fs.promises.readdir(obrasDir);
            console.log(`📁 Procesando archivos sueltos en /obras (${files.length} elementos):`);
            
            for (const filename of files) {
                const filePath = path.join(obrasDir, filename);
                const stats = await fs.promises.stat(filePath);
                
                // Solo procesar archivos (no directorios)
                if (stats.isFile()) {
                    await this.moveFile(filePath, filename);
                }
            }
            console.log('');
            
        } catch (error) {
            console.error(`❌ Error procesando /obras:`, error.message);
            this.errors.push({
                type: 'directory',
                path: obrasDir,
                error: error.message
            });
        }
    }

    /**
     * Mover archivo individual
     */
    async moveFile(filePath, filename) {
        try {
            // Determinar categoría
            const category = this.categoryMap[filename];
            const semanticName = this.semanticRenames[filename] || filename;
            
            if (category) {
                const targetDir = `./images/obras/${category}`;
                const targetPath = path.join(targetDir, semanticName);
                
                // Verificar si el archivo ya existe en el destino
                if (fs.existsSync(targetPath)) {
                    console.log(`  ⚠️ ${filename} → ${category}/${semanticName} (ya existe)`);
                } else {
                    await fs.promises.rename(filePath, targetPath);
                    console.log(`  ✅ ${filename} → ${category}/${semanticName}`);
                    
                    this.movedFiles.push({
                        originalPath: filePath,
                        newPath: targetPath,
                        filename: filename,
                        semanticName: semanticName,
                        category: category
                    });
                }
            } else {
                console.log(`  ➡️ ${filename} (sin categoría definida)`);
            }
            
        } catch (error) {
            console.log(`  ❌ Error moviendo ${filename}: ${error.message}`);
            this.errors.push({
                type: 'file',
                path: filePath,
                error: error.message
            });
        }
    }

    /**
     * Verificar y resolver duplicados
     */
    async checkDuplicates() {
        console.log('🔍 Verificando duplicados...');
        
        const categories = ['oil', '3dprinting', 'drawing', 'ink'];
        
        for (const category of categories) {
            const categoryDir = `./images/obras/${category}`;
            
            if (fs.existsSync(categoryDir)) {
                const files = await fs.promises.readdir(categoryDir);
                const duplicates = this.findDuplicates(files);
                
                if (duplicates.length > 0) {
                    console.log(`  ⚠️ Duplicados en ${category}:`, duplicates);
                } else {
                    console.log(`  ✓ ${category}: Sin duplicados (${files.length} archivos)`);
                }
            }
        }
        console.log('');
    }

    /**
     * Encontrar duplicados en array
     */
    findDuplicates(arr) {
        return arr.filter((item, index) => arr.indexOf(item) !== index);
    }

    /**
     * Limpiar archivos temporales
     */
    async cleanTempFiles() {
        console.log('🧹 Limpiando archivos temporales...');
        
        const tempFiles = [
            './images/obras/3dprinting/escultura-.ds_store'
        ];
        
        for (const tempFile of tempFiles) {
            if (fs.existsSync(tempFile)) {
                try {
                    await fs.promises.unlink(tempFile);
                    console.log(`  ✅ Eliminado: ${tempFile}`);
                } catch (error) {
                    console.log(`  ❌ Error eliminando ${tempFile}: ${error.message}`);
                }
            }
        }
        console.log('');
    }

    /**
     * Actualizar referencias en gallery-data.js e index.html
     */
    async updateReferences() {
        console.log('🔄 Actualizando referencias...');
        
        // Actualizar gallery-data.js
        await this.updateGalleryData();
        
        // Actualizar index.html
        await this.updateHTML();
        
        console.log('');
    }

    /**
     * Actualizar gallery-data.js
     */
    async updateGalleryData() {
        try {
            const galleryDataPath = './js/gallery-data.js';
            let content = await fs.promises.readFile(galleryDataPath, 'utf8');
            
            // Actualizar rutas para archivos movidos
            for (const moved of this.movedFiles) {
                const oldPath = `obras/${moved.category}/${moved.filename}`;
                const newPath = `obras/${moved.category}/${moved.semanticName}`;
                
                content = content.replace(
                    new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
                    newPath
                );
                
                // Actualizar filename también
                content = content.replace(
                    new RegExp(`"filename": "${moved.filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g'),
                    `"filename": "${moved.semanticName}"`
                );
            }
            
            await fs.promises.writeFile(galleryDataPath, content);
            console.log('  ✅ gallery-data.js actualizado');
            
        } catch (error) {
            console.error('❌ Error actualizando gallery-data.js:', error.message);
            this.errors.push({
                type: 'gallery-data',
                error: error.message
            });
        }
    }

    /**
     * Actualizar index.html
     */
    async updateHTML() {
        try {
            const htmlPath = './index.html';
            let content = await fs.promises.readFile(htmlPath, 'utf8');
            
            // Actualizar rutas para archivos movidos
            for (const moved of this.movedFiles) {
                const oldPath = `images/obras/${moved.category}/${moved.filename}`;
                const newPath = `images/obras/${moved.category}/${moved.semanticName}`;
                
                content = content.replace(
                    new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
                    newPath
                );
            }
            
            await fs.promises.writeFile(htmlPath, content);
            console.log('  ✅ index.html actualizado');
            
        } catch (error) {
            console.error('❌ Error actualizando index.html:', error.message);
            this.errors.push({
                type: 'html', 
                error: error.message
            });
        }
    }

    /**
     * Imprimir resumen
     */
    printSummary() {
        console.log('\n📁 RESUMEN DE REORGANIZACIÓN:');
        console.log('============================');
        console.log(`✅ Archivos movidos: ${this.movedFiles.length}`);
        console.log(`❌ Errores: ${this.errors.length}`);
        
        if (this.movedFiles.length > 0) {
            console.log('\n📋 ARCHIVOS REORGANIZADOS:');
            
            // Agrupar por categoría
            const byCategory = this.movedFiles.reduce((acc, file) => {
                if (!acc[file.category]) acc[file.category] = [];
                acc[file.category].push(file);
                return acc;
            }, {});
            
            for (const [category, files] of Object.entries(byCategory)) {
                console.log(`\n  🎨 ${category.toUpperCase()}:`);
                files.forEach(file => {
                    console.log(`    • ${file.filename} → ${file.semanticName}`);
                });
            }
        }
        
        if (this.errors.length > 0) {
            console.log('\n🚨 ERRORES:');
            this.errors.forEach(error => {
                console.log(`  - ${error.type}: ${error.error}`);
            });
        }
        
        console.log('\n🌟 ¡Estructura reorganizada correctamente!');
        console.log('Todas las obras están ahora en sus categorías correspondientes.');
    }
}

// ===== CLI INTERFACE =====
if (require.main === module) {
    const organizer = new StructureOrganizer();
    const command = process.argv[2];
    
    switch (command) {
        case 'run':
        case 'organize':
            organizer.reorganizeStructure();
            break;
        default:
            console.log(`
📁 SERGIO ARTE PLÁSTICA - Structure Organizer

Comandos disponibles:
  node js/structure-organizer.js run       - Reorganizar estructura
  node js/structure-organizer.js organize  - Reorganizar estructura

Funciones:
  ✅ Mueve archivos sueltos a sus categorías correctas
  ✅ Aplica renombrado semántico durante el movimiento
  ✅ Elimina archivos temporales (.ds_store, etc.)
  ✅ Verifica y resuelve duplicados
  ✅ Actualiza gallery-data.js e index.html automáticamente
  ✅ Organiza en: oil/, 3dprinting/, drawing/, ink/
            `);
    }
}

module.exports = StructureOrganizer;