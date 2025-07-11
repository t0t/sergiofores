/**
 * SERGIO ARTE PLÁSTICA - Semantic Renamer
 * Renombrado semántico y artístico de todas las obras
 */

const fs = require('fs');
const path = require('path');

class SemanticRenamer {
    constructor() {
        this.renamedFiles = [];
        this.errors = [];
        
        // Mapeo semántico completo de nombres artísticos únicos
        this.semanticMap = {
            // === ÓLEOS SOBRE LINO BELGA ===
            'mente-acustica-literal-1.png': 'sinestesia-cognitiva.png',
            'oleo-291224a.png': 'flujo-temporal.png', 
            'tres-1.png': 'triada-existencial.png',
            'proceso-3.png': 'genesis-cromatica.png',
            'proceso-2.png': 'metamorfosis-interior.png',
            'oleo-2911a.png': 'resonancia-primordial.png',
            'luz-2.png': 'epifania-luminosa.png',
            'autoocultamiento.png': 'introspeccion-silenciosa.png',
            'beraja.png': 'turbulencia-esencial.png', 
            'shejina.png': 'presencia-divina.png',
            'cuadro-arena-oxido.jpg': 'arqueologia-temporal.jpg',
            
            // === IMPRESIÓN 3D - VOLUMETRÍAS EXPERIMENTALES ===
            'escultura-3955c791-b166-42b0-aa5b-065b6cbc2dc0.jpg': 'topografia-neural.jpg',
            'escultura-87368654_498661417692348_2165792891719385088_o.jpg': 'estructura-algoritmica.jpg',
            'escultura-bg1.png': 'matriz-generativa.png',
            'img_0864-1.jpg': 'fragmento-biologico.jpg',
            'img_0869-1.jpg': 'tejido-molecular.jpg',
            'img_0943-1.jpg': 'geometria-organica.jpg',
            'img_7883-1.jpg': 'sedimento-digital.jpg', 
            'img_8631-1.jpg': 'paisaje-micro.jpg',
            
            // === ARCHIVO - OBRAS HISTÓRICAS Y EXPERIMENTALES ===
            '15995801610_b5f5c1cc9c_o.jpg': 'cosmos-interior.jpg',
            '5565562880_ccbf906149_o.jpg': 'territorio-mental.jpg',
            '8883340966_889ef73caf_o.jpg': 'vibracion-ancestral.jpg',
            'croquis-modelo.jpg': 'anatomia-creativa.jpg',
            'img_0442-1.jpeg': 'exploracion-tactil.jpeg',
            'img_0464-1.jpg': 'proceso-emergente.jpg',
            'img_0466-1.jpg': 'materia-pensante.jpg',
            'img_0474-1.jpeg': 'gesto-primordial.jpeg',
            'img_0726-1.jpg': 'laboratorio-visual.jpg',
            'img_0793-1.jpg': 'textura-temporal.jpg',
            'img_0794-1.jpg': 'superficie-consciente.jpg',
            'img_0853-1.jpg': 'campo-energetico.jpg',
            'img_0856-1.jpg': 'registro-sensorial.jpg',
            'img_0864-1.jpg': 'fragmento-organico.jpg',
            'img_0870-1.jpg': 'espacio-liminal.jpg',
            'img_0877-1.jpg': 'huella-cognitiva.jpg',
            'img_0943-1.jpg': 'forma-emergente.jpg',
            'img_1587-1.jpg': 'intervalo-creativo.jpg',
            'img_1619-1.jpg': 'ritmo-visual.jpg',
            'img_2121-1.jpg': 'codigo-pictorico.jpg',
            'img_2134-1.jpg': 'sintesis-cromatica.jpg',
            'img_2135-1.jpg': 'densidad-emocional.jpg',
            'img_2141-1.jpg': 'arqueologia-gestual.jpg',
            'img_2142-1.jpg': 'memoria-plastica.jpg',
            'img_2144-1.jpg': 'territorio-onirico.jpg',
            'img_2145-1.jpg': 'cartografia-interior.jpg',
            'img_5366-1.png': 'abstraccion-digital.png',
            'img_5367-1.png': 'codigo-visual.png',
            'obra002.jpg': 'origen-pictorico.jpg',
            'project3.jpg': 'experimento-3.jpg',
            'retrato-sergio.png': 'autorretrato-artista.png',
            'sol-painting.jpg': 'luminosidad-esencial.jpg',
            'tumblr_ntv4wdy1hn1u45omzo1_1280-1.jpeg': 'archivo-digital.jpeg'
        };
        
        // Títulos artísticos correspondientes
        this.titleMap = {
            'sinestesia-cognitiva.png': 'Sinestesia Cognitiva',
            'flujo-temporal.png': 'Flujo Temporal',
            'triada-existencial.png': 'Triada Existencial',
            'genesis-cromatica.png': 'Genesis Cromatica',
            'metamorfosis-interior.png': 'Metamorfosis Interior',
            'resonancia-primordial.png': 'Resonancia Primordial',
            'epifania-luminosa.png': 'Epifania Luminosa', 
            'introspeccion-silenciosa.png': 'Introspeccion Silenciosa',
            'turbulencia-esencial.png': 'Turbulencia Esencial',
            'presencia-divina.png': 'Presencia Divina',
            'arqueologia-temporal.jpg': 'Arqueologia Temporal',
            'topografia-neural.jpg': 'Topografia Neural',
            'estructura-algoritmica.jpg': 'Estructura Algoritmica',
            'matriz-generativa.png': 'Matriz Generativa',
            'fragmento-biologico.jpg': 'Fragmento Biologico',
            'tejido-molecular.jpg': 'Tejido Molecular',
            'geometria-organica.jpg': 'Geometria Organica',
            'sedimento-digital.jpg': 'Sedimento Digital',
            'paisaje-micro.jpg': 'Paisaje Micro',
            
            // Títulos para archivo
            'cosmos-interior.jpg': 'Cosmos Interior',
            'territorio-mental.jpg': 'Territorio Mental',
            'vibracion-ancestral.jpg': 'Vibracion Ancestral',
            'anatomia-creativa.jpg': 'Anatomia Creativa',
            'exploracion-tactil.jpeg': 'Exploracion Tactil',
            'proceso-emergente.jpg': 'Proceso Emergente',
            'materia-pensante.jpg': 'Materia Pensante',
            'gesto-primordial.jpeg': 'Gesto Primordial',
            'laboratorio-visual.jpg': 'Laboratorio Visual',
            'textura-temporal.jpg': 'Textura Temporal',
            'superficie-consciente.jpg': 'Superficie Consciente',
            'campo-energetico.jpg': 'Campo Energetico',
            'registro-sensorial.jpg': 'Registro Sensorial',
            'fragmento-organico.jpg': 'Fragmento Organico',
            'espacio-liminal.jpg': 'Espacio Liminal',
            'huella-cognitiva.jpg': 'Huella Cognitiva',
            'forma-emergente.jpg': 'Forma Emergente',
            'intervalo-creativo.jpg': 'Intervalo Creativo',
            'ritmo-visual.jpg': 'Ritmo Visual',
            'codigo-pictorico.jpg': 'Codigo Pictorico',
            'sintesis-cromatica.jpg': 'Sintesis Cromatica',
            'densidad-emocional.jpg': 'Densidad Emocional',
            'arqueologia-gestual.jpg': 'Arqueologia Gestual',
            'memoria-plastica.jpg': 'Memoria Plastica',
            'territorio-onirico.jpg': 'Territorio Onirico',
            'cartografia-interior.jpg': 'Cartografia Interior',
            'abstraccion-digital.png': 'Abstraccion Digital',
            'codigo-visual.png': 'Codigo Visual',
            'origen-pictorico.jpg': 'Origen Pictorico',
            'experimento-3.jpg': 'Experimento III',
            'autorretrato-artista.png': 'Autorretrato del Artista',
            'luminosidad-esencial.jpg': 'Luminosidad Esencial',
            'archivo-digital.jpeg': 'Archivo Digital'
        };
    }

    /**
     * Ejecutar renombrado semántico completo
     */
    async renameAllFiles() {
        console.log('🎨 INICIANDO RENOMBRADO SEMÁNTICO\n');
        console.log('=====================================\n');

        const directories = [
            './images/obras/oil',
            './images/obras/3dprinting',
            './images/archive'
        ];

        for (const dir of directories) {
            if (fs.existsSync(dir)) {
                await this.renameDirectory(dir);
            }
        }

        await this.updateGalleryData();
        await this.updateHTML();
        this.printSummary();
        await this.generateReport();
    }

    /**
     * Renombrar archivos en directorio específico
     */
    async renameDirectory(dirPath) {
        try {
            const files = await fs.promises.readdir(dirPath);
            console.log(`📁 Procesando: ${dirPath} (${files.length} archivos)`);

            for (const filename of files) {
                const filePath = path.join(dirPath, filename);
                const stats = await fs.promises.stat(filePath);
                
                if (stats.isFile()) {
                    await this.renameFile(filePath);
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
     * Renombrar archivo individual
     */
    async renameFile(filePath) {
        const originalName = path.basename(filePath);
        const dir = path.dirname(filePath);
        
        try {
            // Buscar mapeo semántico
            const semanticName = this.semanticMap[originalName];
            
            if (semanticName && originalName !== semanticName) {
                const newPath = path.join(dir, semanticName);
                
                // Verificar que el nuevo nombre no exista
                if (fs.existsSync(newPath)) {
                    console.log(`  ⚠️ ${originalName} → ${semanticName} (ya existe)`);
                } else {
                    await fs.promises.rename(filePath, newPath);
                    console.log(`  ✅ ${originalName} → ${semanticName}`);
                    
                    this.renamedFiles.push({
                        directory: dir,
                        originalName: originalName,
                        newName: semanticName,
                        title: this.titleMap[semanticName] || semanticName,
                        category: dir.includes('oil') ? 'oil' : dir.includes('3dprinting') ? '3dprinting' : 'archive'
                    });
                }
            } else {
                console.log(`  ➡️ ${originalName} (sin cambios)`);
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
     * Actualizar gallery-data.js con nuevos nombres
     */
    async updateGalleryData() {
        try {
            const galleryDataPath = './js/gallery-data.js';
            let content = await fs.promises.readFile(galleryDataPath, 'utf8');
            
            console.log('🔄 Actualizando gallery-data.js...');
            
            // Crear nuevos datos con nombres semánticos
            for (const renamed of this.renamedFiles) {
                const oldFilename = renamed.originalName;
                const newFilename = renamed.newName;
                const newTitle = renamed.title;
                
                // Actualizar filename, path y title
                content = content.replace(
                    new RegExp(`"filename": "${oldFilename}"`, 'g'),
                    `"filename": "${newFilename}"`
                );
                
                content = content.replace(
                    new RegExp(`"path": "obras/(oil|3dprinting)/${oldFilename}"`, 'g'),
                    `"path": "obras/$1/${newFilename}"`
                );
                
                // Actualizar título con nombre artístico
                const oldTitlePattern = `"title": "[^"]*"`;
                const filenamePattern = `"filename": "${newFilename}"`;
                
                // Buscar el título correspondiente al filename actualizado
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
     * Actualizar index.html con nuevos nombres
     */
    async updateHTML() {
        try {
            const htmlPath = './index.html';
            let content = await fs.promises.readFile(htmlPath, 'utf8');
            
            console.log('🔄 Actualizando index.html...');
            
            // Actualizar referencias en galería principal
            for (const renamed of this.renamedFiles) {
                const oldPath = `images/obras/${renamed.category}/${renamed.originalName}`;
                const newPath = `images/obras/${renamed.category}/${renamed.newName}`;
                
                content = content.replace(
                    new RegExp(oldPath, 'g'),
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
     * Imprimir resumen del renombrado
     */
    printSummary() {
        console.log('\n🎨 RESUMEN DE RENOMBRADO SEMÁNTICO:');
        console.log('=====================================');
        console.log(`✅ Archivos renombrados: ${this.renamedFiles.length}`);
        console.log(`❌ Errores: ${this.errors.length}`);
        
        if (this.renamedFiles.length > 0) {
            console.log('\n📋 NUEVOS NOMBRES ARTÍSTICOS:');
            
            // Agrupar por categoría
            const oilWorks = this.renamedFiles.filter(f => f.category === 'oil');
            const printWorks = this.renamedFiles.filter(f => f.category === '3dprinting');
            const archiveWorks = this.renamedFiles.filter(f => f.category === 'archive');
            
            if (oilWorks.length > 0) {
                console.log('\n  🎨 ÓLEOS SOBRE LINO BELGA:');
                oilWorks.forEach(work => {
                    console.log(`    • ${work.title} (${work.newName})`);
                });
            }
            
            if (printWorks.length > 0) {
                console.log('\n  🔬 IMPRESIÓN 3D:');
                printWorks.forEach(work => {
                    console.log(`    • ${work.title} (${work.newName})`);
                });
            }
            
            if (archiveWorks.length > 0) {
                console.log('\n  📁 ARCHIVO HISTÓRICO:');
                archiveWorks.forEach(work => {
                    console.log(`    • ${work.title} (${work.newName})`);
                });
            }
        }
        
        if (this.errors.length > 0) {
            console.log('\n🚨 ERRORES:');
            this.errors.forEach(error => {
                console.log(`  - ${error.type}: ${error.error}`);
            });
        }
        
        console.log('\n🌟 ¡Renombrado semántico completado!');
        console.log('Las obras ahora tienen nombres únicos y significativos.');
    }

    /**
     * Generar reporte detallado
     */
    async generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                totalRenamed: this.renamedFiles.length,
                totalErrors: this.errors.length,
                oilWorks: this.renamedFiles.filter(f => f.category === 'oil').length,
                printWorks: this.renamedFiles.filter(f => f.category === '3dprinting').length,
                archiveWorks: this.renamedFiles.filter(f => f.category === 'archive').length
            },
            semanticMapping: this.semanticMap,
            titleMapping: this.titleMap,
            renamedFiles: this.renamedFiles,
            errors: this.errors
        };

        await fs.promises.writeFile(
            './semantic-renaming-report.json', 
            JSON.stringify(report, null, 2)
        );
        
        console.log('📄 Reporte guardado en: semantic-renaming-report.json');
    }

    /**
     * Previsualizar cambios semánticos
     */
    async previewChanges() {
        console.log('👁️ PREVISUALIZACIÓN DE RENOMBRADO SEMÁNTICO\n');
        
        const directories = ['./images/obras/oil', './images/obras/3dprinting', './images/archive'];

        for (const dir of directories) {
            if (fs.existsSync(dir)) {
                const files = await fs.promises.readdir(dir);
                console.log(`📁 ${dir}:`);
                
                files.forEach(filename => {
                    const semanticName = this.semanticMap[filename];
                    const title = this.titleMap[semanticName];
                    
                    if (semanticName && filename !== semanticName) {
                        console.log(`  🎨 ${filename} → ${semanticName}`);
                        console.log(`     📝 Título: "${title}"`);
                    } else {
                        console.log(`  ➡️ ${filename} (sin cambios)`);
                    }
                });
                console.log('');
            }
        }
    }
}

// ===== CLI INTERFACE =====
if (require.main === module) {
    const renamer = new SemanticRenamer();
    const command = process.argv[2];
    
    switch (command) {
        case 'preview':
            renamer.previewChanges();
            break;
        case 'rename':
        case 'run':
            renamer.renameAllFiles();
            break;
        default:
            console.log(`
🎨 SERGIO ARTE PLÁSTICA - Semantic Renamer

Comandos disponibles:
  node js/semantic-renamer.js preview  - Previsualizar renombrado
  node js/semantic-renamer.js rename   - Aplicar renombrado semántico
  node js/semantic-renamer.js run      - Aplicar renombrado semántico

Características:
  ✅ Nombres únicos y significativos para cada obra
  ✅ Títulos artísticos descriptivos y poéticos
  ✅ Actualización automática de gallery-data.js
  ✅ Actualización automática de index.html
  ✅ Preservación de categorías (oil/3dprinting)
  ✅ Reporte detallado del proceso

Mapeo semántico:
  🎨 Óleos: Sinestesia Cognitiva, Flujo Temporal, Tríada Existencial...
  🔬 3D: Topografía Neural, Estructura Algorítmica, Matriz Generativa...
            `);
    }
}

module.exports = SemanticRenamer;