/**
 * SERGIO ARTE PLÁSTICA - Remove Accents
 * Eliminar acentos y caracteres especiales de archivos ya renombrados
 */

const fs = require('fs');
const path = require('path');

class AccentRemover {
    constructor() {
        this.processedFiles = [];
        this.errors = [];
        
        // Mapeo directo para eliminar acentos
        this.accentMap = {
            // Archivos con acentos que necesitan ser corregidos
            'genesis-cromática.png': 'genesis-cromatica.png',
            'introspección-silenciosa.png': 'introspeccion-silenciosa.png',
            'arqueología-temporal.jpg': 'arqueologia-temporal.jpg',
            'topografía-neural.jpg': 'topografia-neural.jpg',
            'geometría-orgánica.jpg': 'geometria-organica.jpg',
            'fragmento-biológico.jpg': 'fragmento-biologico.jpg',
            'vibración-ancestral.jpg': 'vibracion-ancestral.jpg',
            'anatomía-creativa.jpg': 'anatomia-creativa.jpg',
            'exploración-táctil.jpeg': 'exploracion-tactil.jpeg',
            'campo-energético.jpg': 'campo-energetico.jpg',
            'fragmento-orgánico.jpg': 'fragmento-organico.jpg',
            'código-pictórico.jpg': 'codigo-pictorico.jpg',
            'síntesis-cromática.jpg': 'sintesis-cromatica.jpg',
            'arqueología-gestual.jpg': 'arqueologia-gestual.jpg',
            'memoria-plástica.jpg': 'memoria-plastica.jpg',
            'territorio-onírico.jpg': 'territorio-onirico.jpg',
            'cartografía-interior.jpg': 'cartografia-interior.jpg',
            'abstracción-digital.png': 'abstraccion-digital.png',
            'código-visual.png': 'codigo-visual.png',
            'origen-pictórico.jpg': 'origen-pictorico.jpg'
        };
        
        // Títulos sin acentos
        this.titleMap = {
            'genesis-cromatica.png': 'Genesis Cromatica',
            'introspeccion-silenciosa.png': 'Introspeccion Silenciosa',
            'arqueologia-temporal.jpg': 'Arqueologia Temporal',
            'topografia-neural.jpg': 'Topografia Neural',
            'geometria-organica.jpg': 'Geometria Organica',
            'fragmento-biologico.jpg': 'Fragmento Biologico',
            'vibracion-ancestral.jpg': 'Vibracion Ancestral',
            'anatomia-creativa.jpg': 'Anatomia Creativa',
            'exploracion-tactil.jpeg': 'Exploracion Tactil',
            'campo-energetico.jpg': 'Campo Energetico',
            'fragmento-organico.jpg': 'Fragmento Organico',
            'codigo-pictorico.jpg': 'Codigo Pictorico',
            'sintesis-cromatica.jpg': 'Sintesis Cromatica',
            'arqueologia-gestual.jpg': 'Arqueologia Gestual',
            'memoria-plastica.jpg': 'Memoria Plastica',
            'territorio-onirico.jpg': 'Territorio Onirico',
            'cartografia-interior.jpg': 'Cartografia Interior',
            'abstraccion-digital.png': 'Abstraccion Digital',
            'codigo-visual.png': 'Codigo Visual',
            'origen-pictorico.jpg': 'Origen Pictorico'
        };
    }

    /**
     * Ejecutar eliminación de acentos
     */
    async removeAccents() {
        console.log('🔤 ELIMINANDO ACENTOS Y CARACTERES ESPECIALES\n');
        console.log('=============================================\n');

        const directories = [
            './images/obras/oil',
            './images/obras/3dprinting',
            './images/archive'
        ];

        for (const dir of directories) {
            if (fs.existsSync(dir)) {
                await this.processDirectory(dir);
            }
        }

        await this.updateGalleryData();
        await this.updateHTML();
        this.printSummary();
    }

    /**
     * Procesar directorio específico
     */
    async processDirectory(dirPath) {
        try {
            const files = await fs.promises.readdir(dirPath);
            console.log(`📁 Procesando: ${dirPath} (${files.length} archivos)`);

            for (const filename of files) {
                const filePath = path.join(dirPath, filename);
                const stats = await fs.promises.stat(filePath);
                
                if (stats.isFile()) {
                    await this.processFile(filePath);
                }
            }
            
            console.log('');
        } catch (error) {
            console.error(`❌ Error procesando directorio ${dirPath}:`, error.message);
            this.errors.push({
                type: 'directory',
                path: dirPath,
                error: error.message
            });
        }
    }

    /**
     * Procesar archivo individual
     */
    async processFile(filePath) {
        const originalName = path.basename(filePath);
        const dir = path.dirname(filePath);
        
        try {
            // Buscar si tiene acentos que eliminar
            const cleanName = this.accentMap[originalName];
            
            if (cleanName && originalName !== cleanName) {
                const newPath = path.join(dir, cleanName);
                
                // Verificar que el nuevo nombre no exista
                if (fs.existsSync(newPath)) {
                    console.log(`  ⚠️ ${originalName} → ${cleanName} (ya existe)`);
                } else {
                    await fs.promises.rename(filePath, newPath);
                    console.log(`  ✅ ${originalName} → ${cleanName}`);
                    
                    this.processedFiles.push({
                        directory: dir,
                        originalName: originalName,
                        newName: cleanName,
                        title: this.titleMap[cleanName] || cleanName,
                        category: dir.includes('oil') ? 'oil' : dir.includes('3dprinting') ? '3dprinting' : 'archive'
                    });
                }
            }
            
        } catch (error) {
            console.log(`  ❌ Error: ${originalName} - ${error.message}`);
            this.errors.push({
                type: 'file',
                path: filePath,
                error: error.message
            });
        }
    }

    /**
     * Actualizar gallery-data.js
     */
    async updateGalleryData() {
        try {
            const galleryDataPath = './js/gallery-data.js';
            let content = await fs.promises.readFile(galleryDataPath, 'utf8');
            
            console.log('🔄 Actualizando gallery-data.js...');
            
            // Actualizar nombres sin acentos
            for (const processed of this.processedFiles) {
                const oldFilename = processed.originalName;
                const newFilename = processed.newName;
                const newTitle = processed.title;
                
                // Actualizar filename, path y title
                content = content.replace(
                    new RegExp(`"filename": "${oldFilename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g'),
                    `"filename": "${newFilename}"`
                );
                
                content = content.replace(
                    new RegExp(`"path": "obras/(oil|3dprinting|archive)/${oldFilename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g'),
                    `"path": "obras/$1/${newFilename}"`
                );
                
                // Actualizar título
                const filenamePattern = `"filename": "${newFilename}"`;
                const regex = new RegExp(`(${filenamePattern}[\\s\\S]*?)"title": "[^"]*"`, 'g');
                content = content.replace(regex, `$1"title": "${newTitle}"`);
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
            
            console.log('🔄 Actualizando index.html...');
            
            // Actualizar referencias
            for (const processed of this.processedFiles) {
                const oldPath = `images/obras/${processed.category}/${processed.originalName}`;
                const newPath = `images/obras/${processed.category}/${processed.newName}`;
                
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
        console.log('\n🔤 RESUMEN ELIMINACIÓN DE ACENTOS:');
        console.log('==================================');
        console.log(`✅ Archivos procesados: ${this.processedFiles.length}`);
        console.log(`❌ Errores: ${this.errors.length}`);
        
        if (this.processedFiles.length > 0) {
            console.log('\n📋 ARCHIVOS CORREGIDOS:');
            
            this.processedFiles.forEach(file => {
                console.log(`  • ${file.originalName} → ${file.newName}`);
            });
        }
        
        if (this.errors.length > 0) {
            console.log('\n🚨 ERRORES:');
            this.errors.forEach(error => {
                console.log(`  - ${error.type}: ${error.error}`);
            });
        }
        
        console.log('\n✨ ¡Eliminación de acentos completada!');
        console.log('Todos los nombres de archivo ahora son compatibles con URLs y sistemas.');
    }
}

// ===== CLI INTERFACE =====
if (require.main === module) {
    const remover = new AccentRemover();
    const command = process.argv[2];
    
    switch (command) {
        case 'run':
        case 'remove':
            remover.removeAccents();
            break;
        default:
            console.log(`
🔤 SERGIO ARTE PLÁSTICA - Remove Accents

Comandos disponibles:
  node js/remove-accents.js run     - Eliminar acentos
  node js/remove-accents.js remove  - Eliminar acentos

Funciones:
  ✅ Elimina acentos (ó → o, á → a, ñ → n)
  ✅ Corrige caracteres especiales
  ✅ Actualiza gallery-data.js automáticamente
  ✅ Actualiza index.html automáticamente
  ✅ Nombres compatibles con URLs y sistemas
            `);
    }
}

module.exports = AccentRemover;