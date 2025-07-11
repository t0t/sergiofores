/**
 * SERGIO ARTE PLÁSTICA - File Normalizer
 * Utilidad para renombrar archivos y normalizar extensiones
 */

const fs = require('fs');
const path = require('path');

class FileNormalizer {
    constructor() {
        this.processedFiles = [];
        this.errors = [];
        this.extensionMap = {
            // Normalizar todas las extensiones de imagen a minúsculas
            '.JPG': '.jpg',
            '.JPEG': '.jpeg', 
            '.PNG': '.png',
            '.WEBP': '.webp',
            '.GIF': '.gif',
            '.BMP': '.bmp',
            '.TIFF': '.tiff',
            '.SVG': '.svg',
            
            // Videos
            '.MOV': '.mov',
            '.MP4': '.mp4',
            '.AVI': '.avi',
            '.WEBM': '.webm'
        };
        
        this.namingRules = {
            // Reglas de limpieza de nombres
            invalidChars: /[^a-zA-Z0-9\-_\.]/g,
            multipleSpaces: /\s+/g,
            multipleDashes: /-+/g,
            multipleUnderscores: /_+/g,
            leadingTrailing: /^[-_\s]+|[-_\s]+$/g
        };
    }

    /**
     * Normalizar todos los archivos en los directorios especificados
     */
    async normalizeAllFiles() {
        console.log('🔧 INICIANDO NORMALIZACIÓN DE ARCHIVOS\n');
        console.log('=====================================\n');

        const directories = [
            './images/obras',
            './images/obras/oil',
            './images/obras/ink', 
            './images/obras/3dprinting',
            './images/obras/drawing',
            './images/gallery',
            './images/archive',
            './images/videos'
        ];

        for (const dir of directories) {
            if (fs.existsSync(dir)) {
                await this.normalizeDirectory(dir);
            }
        }

        this.printSummary();
        await this.generateReport();
    }

    /**
     * Normalizar archivos en un directorio específico
     */
    async normalizeDirectory(dirPath) {
        try {
            const files = await fs.promises.readdir(dirPath);
            console.log(`📁 Procesando: ${dirPath} (${files.length} archivos)`);

            for (const filename of files) {
                const filePath = path.join(dirPath, filename);
                const stats = await fs.promises.stat(filePath);
                
                // Solo procesar archivos (no directorios)
                if (stats.isFile()) {
                    await this.normalizeFile(filePath);
                }
            }
            
            console.log(''); // Línea en blanco entre directorios
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
     * Normalizar un archivo específico
     */
    async normalizeFile(filePath) {
        const originalName = path.basename(filePath);
        const dir = path.dirname(filePath);
        
        try {
            // 1. Normalizar extensión
            const normalizedExt = this.normalizeExtension(originalName);
            
            // 2. Limpiar nombre de archivo
            const cleanedName = this.cleanFileName(normalizedExt);
            
            // 3. Aplicar convenciones específicas del proyecto
            const finalName = this.applyProjectConventions(cleanedName, dir);
            
            // Solo renombrar si hay cambios
            if (originalName !== finalName) {
                const newPath = path.join(dir, finalName);
                
                // Verificar que el nuevo nombre no exista
                if (fs.existsSync(newPath)) {
                    const uniqueName = this.generateUniqueName(newPath);
                    await fs.promises.rename(filePath, uniqueName);
                    console.log(`  ✅ ${originalName} → ${path.basename(uniqueName)} (único)`);
                } else {
                    await fs.promises.rename(filePath, newPath);
                    console.log(`  ✅ ${originalName} → ${finalName}`);
                }
                
                this.processedFiles.push({
                    directory: dir,
                    originalName: originalName,
                    newName: finalName,
                    changes: this.analyzeChanges(originalName, finalName)
                });
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
     * Normalizar extensión de archivo
     */
    normalizeExtension(filename) {
        const ext = path.extname(filename);
        const name = path.parse(filename).name;
        
        // Buscar extensión normalizada
        const normalizedExt = this.extensionMap[ext] || ext.toLowerCase();
        
        return `${name}${normalizedExt}`;
    }

    /**
     * Limpiar nombre de archivo
     */
    cleanFileName(filename) {
        const ext = path.extname(filename);
        let name = path.parse(filename).name;
        
        // Aplicar reglas de limpieza
        name = name
            .replace(this.namingRules.invalidChars, '-')  // Caracteres inválidos → guión
            .replace(this.namingRules.multipleSpaces, '-') // Múltiples espacios → guión
            .replace(this.namingRules.multipleDashes, '-') // Múltiples guiones → uno
            .replace(this.namingRules.multipleUnderscores, '_') // Múltiples underscores → uno
            .replace(this.namingRules.leadingTrailing, '') // Quitar guiones/espacios inicio/fin
            .toLowerCase(); // Todo a minúsculas
        
        return `${name}${ext}`;
    }

    /**
     * Aplicar convenciones específicas del proyecto
     */
    applyProjectConventions(filename, directory) {
        const ext = path.extname(filename);
        let name = path.parse(filename).name;
        
        // Convenciones según directorio
        if (directory.includes('oil')) {
            if (!name.startsWith('oleo-') && !this.isSpecialArtwork(name)) {
                name = `oleo-${name}`;
            }
        } else if (directory.includes('ink')) {
            if (!name.startsWith('tinta-')) {
                name = `tinta-${name}`;
            }
        } else if (directory.includes('3dprinting')) {
            if (!name.startsWith('escultura-') && !this.isComposition(name)) {
                name = `escultura-${name}`;
            }
        } else if (directory.includes('drawing')) {
            if (!name.startsWith('dibujo-')) {
                name = `dibujo-${name}`;
            }
        }
        
        // Mapeo de nombres específicos conocidos
        name = this.mapSpecificNames(name);
        
        return `${name}${ext}`;
    }

    /**
     * Verificar si es una obra especial que no necesita prefijo
     */
    isSpecialArtwork(name) {
        const specialNames = [
            'autoocultamiento', 'beraja', 'shejina', 'luz2', 'tres1',
            'proceso2', 'proceso3', 'menteacusticaliteral1',
            'cuadroarenaoxido'
        ];
        return specialNames.includes(name.toLowerCase().replace(/[-_]/g, ''));
    }

    /**
     * Verificar si es una composición numerada
     */
    isComposition(name) {
        return /^(composicion|comp|img)[-_]?\d+/.test(name.toLowerCase());
    }

    /**
     * Mapear nombres específicos a versiones mejoradas
     */
    mapSpecificNames(name) {
        const nameMap = {
            'cuadroarenaoxido': 'cuadro-arena-oxido',
            'menteacusticaliteral1': 'mente-acustica-literal-1',
            'autoocultamiento': 'autoocultamiento',
            'beraja': 'beraja',
            'proceso3': 'proceso-3',
            'proceso2': 'proceso-2',
            'luz2': 'luz-2',
            'tres1': 'tres-1',
            'shejina': 'shejina',
            '2911a': 'composicion-2911',
            '291224a': 'composicion-291224'
        };
        
        const cleanName = name.toLowerCase().replace(/[-_]/g, '');
        return nameMap[cleanName] || name;
    }

    /**
     * Generar nombre único si ya existe
     */
    generateUniqueName(filePath) {
        const dir = path.dirname(filePath);
        const ext = path.extname(filePath);
        const name = path.parse(filePath).name;
        
        let counter = 1;
        let uniquePath;
        
        do {
            uniquePath = path.join(dir, `${name}-${counter}${ext}`);
            counter++;
        } while (fs.existsSync(uniquePath));
        
        return uniquePath;
    }

    /**
     * Analizar qué cambios se hicieron
     */
    analyzeChanges(originalName, newName) {
        const changes = [];
        
        if (originalName !== newName) {
            const originalExt = path.extname(originalName);
            const newExt = path.extname(newName);
            
            if (originalExt !== newExt) {
                changes.push(`Extensión: ${originalExt} → ${newExt}`);
            }
            
            const originalBasename = path.parse(originalName).name;
            const newBasename = path.parse(newName).name;
            
            if (originalBasename !== newBasename) {
                changes.push(`Nombre: ${originalBasename} → ${newBasename}`);
            }
        }
        
        return changes;
    }

    /**
     * Imprimir resumen del proceso
     */
    printSummary() {
        console.log('\n📊 RESUMEN DE NORMALIZACIÓN:');
        console.log('=====================================');
        console.log(`✅ Archivos procesados: ${this.processedFiles.length}`);
        console.log(`❌ Errores: ${this.errors.length}`);
        
        if (this.processedFiles.length > 0) {
            console.log('\n📋 CAMBIOS REALIZADOS:');
            
            // Agrupar por tipo de cambio
            const extensionChanges = this.processedFiles.filter(f => 
                f.changes.some(c => c.startsWith('Extensión:'))
            ).length;
            
            const nameChanges = this.processedFiles.filter(f => 
                f.changes.some(c => c.startsWith('Nombre:'))
            ).length;
            
            console.log(`  • Extensiones normalizadas: ${extensionChanges}`);
            console.log(`  • Nombres limpiados: ${nameChanges}`);
        }
        
        if (this.errors.length > 0) {
            console.log('\n🚨 ERRORES:');
            this.errors.forEach(error => {
                console.log(`  - ${error.path}: ${error.error}`);
            });
        }
        
        console.log('\n🎨 ¡Normalización completada!');
    }

    /**
     * Generar reporte detallado
     */
    async generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                totalProcessed: this.processedFiles.length,
                totalErrors: this.errors.length,
                extensionChanges: this.processedFiles.filter(f => 
                    f.changes.some(c => c.startsWith('Extensión:'))
                ).length,
                nameChanges: this.processedFiles.filter(f => 
                    f.changes.some(c => c.startsWith('Nombre:'))
                ).length
            },
            processedFiles: this.processedFiles,
            errors: this.errors,
            extensionMap: this.extensionMap
        };

        await fs.promises.writeFile(
            './file-normalization-report.json', 
            JSON.stringify(report, null, 2)
        );
        
        console.log('📄 Reporte guardado en: file-normalization-report.json');
    }

    /**
     * Previsualizar cambios sin aplicarlos
     */
    async previewChanges() {
        console.log('👁️ PREVISUALIZACIÓN DE CAMBIOS (sin aplicar)\n');
        
        const directories = [
            './images/obras', './images/obras/oil', './images/obras/ink', 
            './images/obras/3dprinting', './images/gallery', './images/archive'
        ];

        for (const dir of directories) {
            if (fs.existsSync(dir)) {
                const files = await fs.promises.readdir(dir);
                console.log(`📁 ${dir}:`);
                
                files.forEach(filename => {
                    const normalizedExt = this.normalizeExtension(filename);
                    const cleanedName = this.cleanFileName(normalizedExt);
                    const finalName = this.applyProjectConventions(cleanedName, dir);
                    
                    if (filename !== finalName) {
                        console.log(`  🔄 ${filename} → ${finalName}`);
                    } else {
                        console.log(`  ✓ ${filename} (sin cambios)`);
                    }
                });
                console.log('');
            }
        }
    }
}

// ===== CLI INTERFACE =====
if (require.main === module) {
    const normalizer = new FileNormalizer();
    const command = process.argv[2];
    
    switch (command) {
        case 'preview':
            normalizer.previewChanges();
            break;
        case 'normalize':
        case 'run':
            normalizer.normalizeAllFiles();
            break;
        default:
            console.log(`
🔧 SERGIO ARTE PLÁSTICA - File Normalizer

Comandos disponibles:
  node js/file-normalizer.js preview    - Previsualizar cambios
  node js/file-normalizer.js normalize  - Aplicar normalización
  node js/file-normalizer.js run        - Aplicar normalización

Ejemplos:
  npm run files:preview
  npm run files:normalize

Funciones:
  ✅ Normalizar extensiones (.JPG → .jpg, .JPEG → .jpeg)
  ✅ Limpiar nombres de archivo (espacios, caracteres especiales)
  ✅ Aplicar convenciones del proyecto (prefijos por categoría)
  ✅ Evitar duplicados (genera nombres únicos)
  ✅ Mapear nombres artísticos específicos
  ✅ Generar reporte detallado
            `);
    }
}

module.exports = FileNormalizer;