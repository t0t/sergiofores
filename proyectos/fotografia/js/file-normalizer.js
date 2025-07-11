/**
 * SERGIO FORÉS - FOTOGRAFÍA
 * File Normalizer for Photography Collection
 * 
 * Adaptado del sistema desarrollado para sergio_arte_plastica
 * Especializado para organización de fotografías personales
 */

const fs = require('fs');
const path = require('path');

class PhotographyFileNormalizer {
    constructor() {
        this.sourceDir = path.join(__dirname, '../images');
        this.targetDir = path.join(__dirname, '../img');
        this.photographsDir = path.join(this.targetDir, 'photographs');
        
        this.validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.raw', '.dng'];
        this.preferredExtension = '.jpg';
        
        this.processedFiles = [];
        this.errors = [];
        
        this.photographyNames = [
            // Retratos y personas
            'encuentro-silencioso', 'retrato-contemplativo', 'mirada-interior', 
            'gesto-espontaneo', 'presencia-ausente', 'dialogo-visual',
            'expresion-intima', 'momento-suspendido', 'conexion-humana',
            
            // Paisajes y naturaleza
            'horizonte-infinito', 'luz-primera', 'territorio-mental',
            'paisaje-interior', 'geografia-emocional', 'espacio-liminal',
            'atmosfera-densa', 'campo-energetico', 'ritmo-natural',
            
            // Urbano y arquitectura
            'geometria-urbana', 'ritual-cotidiano', 'flujo-ciudadano',
            'arquitectura-emocional', 'transito-perpetuo', 'ciudad-neurologica',
            'espacio-publico', 'densidad-humana', 'navegacion-urbana',
            
            // Abstractas y experimentales
            'luz-fragmentada', 'textura-temporal', 'materia-pensante',
            'forma-emergente', 'patron-oculto', 'resonancia-visual',
            'sintesis-cromatica', 'vibracion-silenciosa', 'codigo-secreto',
            
            // Objetos y detalles
            'objeto-familiar', 'detalle-revelador', 'superficie-consciente',
            'micro-universo', 'arqueologia-domestica', 'huella-temporal',
            'memoria-material', 'registro-tactil', 'evidencia-poetica',
            
            // Proceso y experimentación
            'laboratorio-visual', 'proceso-abierto', 'investigacion-formal',
            'experimento-cotidiano', 'busqueda-continua', 'exploracion-libre',
            'descubrimiento-casual', 'hallazgo-fortuito', 'serendipidad-visual'
        ];
        
        this.usedNames = new Set();
    }

    /**
     * Ejecuta el proceso completo de normalización
     */
    async normalize() {
        console.log('🎯 Iniciando normalización de fotografías...');
        
        try {
            this.createDirectories();
            await this.scanAndProcessFiles();
            this.generateReport();
            
            console.log('✅ Normalización completada exitosamente');
            return {
                success: true,
                processed: this.processedFiles.length,
                errors: this.errors.length
            };
            
        } catch (error) {
            console.error('❌ Error durante la normalización:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Crea directorios necesarios
     */
    createDirectories() {
        const dirs = [this.targetDir, this.photographsDir];
        
        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
                console.log(`📁 Directorio creado: ${dir}`);
            }
        });
    }

    /**
     * Escanea y procesa todos los archivos
     */
    async scanAndProcessFiles() {
        const files = this.findImageFiles();
        
        if (files.length === 0) {
            console.log('⚠️  No se encontraron archivos de imagen para procesar');
            return;
        }
        
        console.log(`📷 Encontradas ${files.length} fotografías para procesar`);
        
        for (const file of files) {
            try {
                await this.processFile(file);
            } catch (error) {
                this.errors.push({
                    file: file,
                    error: error.message
                });
                console.error(`❌ Error procesando ${file}:`, error.message);
            }
        }
    }

    /**
     * Encuentra archivos de imagen en el directorio fuente
     */
    findImageFiles() {
        const files = [];
        
        const scanDirectory = (dir) => {
            if (!fs.existsSync(dir)) return;
            
            const items = fs.readdirSync(dir);
            
            items.forEach(item => {
                const itemPath = path.join(dir, item);
                const stat = fs.statSync(itemPath);
                
                if (stat.isDirectory()) {
                    scanDirectory(itemPath);
                } else {
                    const ext = path.extname(item).toLowerCase();
                    if (this.validExtensions.includes(ext)) {
                        files.push(itemPath);
                    }
                }
            });
        };
        
        scanDirectory(this.sourceDir);
        return files;
    }

    /**
     * Procesa un archivo individual
     */
    async processFile(filePath) {
        const originalName = path.basename(filePath);
        const extension = path.extname(filePath).toLowerCase();
        
        // Generar nombre semántico
        const semanticName = this.generateSemanticName();
        
        // Determinar extensión final
        const finalExtension = this.normalizeExtension(extension);
        const finalName = `${semanticName}${finalExtension}`;
        
        // Ruta de destino
        const targetPath = path.join(this.photographsDir, finalName);
        
        // Copiar archivo
        fs.copyFileSync(filePath, targetPath);
        
        // Registrar procesamiento
        this.processedFiles.push({
            original: originalName,
            semantic: finalName,
            originalPath: filePath,
            finalPath: targetPath,
            size: fs.statSync(targetPath).size
        });
        
        console.log(`📸 ${originalName} → ${finalName}`);
    }

    /**
     * Genera nombre semántico único
     */
    generateSemanticName() {
        let attempts = 0;
        let name;
        
        do {
            if (attempts === 0) {
                // Primer intento: nombre aleatorio de la lista
                const randomIndex = Math.floor(Math.random() * this.photographyNames.length);
                name = this.photographyNames[randomIndex];
            } else {
                // Intentos posteriores: agregar sufijo numérico
                const baseName = this.photographyNames[Math.floor(Math.random() * this.photographyNames.length)];
                name = `${baseName}-${attempts}`;
            }
            attempts++;
        } while (this.usedNames.has(name) && attempts < 100);
        
        if (attempts >= 100) {
            // Fallback: timestamp
            name = `fotografia-${Date.now()}`;
        }
        
        this.usedNames.add(name);
        return name;
    }

    /**
     * Normaliza extensión de archivo
     */
    normalizeExtension(extension) {
        const normalizations = {
            '.jpeg': '.jpg',
            '.JPEG': '.jpg',
            '.JPG': '.jpg',
            '.PNG': '.png',
            '.png': '.png',
            '.WEBP': '.webp',
            '.webp': '.webp',
            '.HEIC': '.jpg', // Convertir HEIC a JPG
            '.heic': '.jpg',
            '.RAW': '.jpg', // RAW files converted to JPG
            '.raw': '.jpg',
            '.DNG': '.jpg',
            '.dng': '.jpg'
        };
        
        return normalizations[extension] || this.preferredExtension;
    }

    /**
     * Genera reporte del procesamiento
     */
    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                totalProcessed: this.processedFiles.length,
                totalErrors: this.errors.length,
                totalSize: this.processedFiles.reduce((sum, file) => sum + file.size, 0)
            },
            files: this.processedFiles,
            errors: this.errors,
            directories: {
                source: this.sourceDir,
                target: this.photographsDir
            }
        };
        
        const reportPath = path.join(__dirname, '../file-normalization-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        
        console.log('\n📊 REPORTE DE NORMALIZACIÓN');
        console.log('================================');
        console.log(`📷 Fotografías procesadas: ${report.summary.totalProcessed}`);
        console.log(`❌ Errores: ${report.summary.totalErrors}`);
        console.log(`💾 Tamaño total: ${this.formatFileSize(report.summary.totalSize)}`);
        console.log(`📄 Reporte guardado: ${reportPath}`);
        
        if (this.errors.length > 0) {
            console.log('\n⚠️  ERRORES ENCONTRADOS:');
            this.errors.forEach(error => {
                console.log(`   ${error.file}: ${error.error}`);
            });
        }
    }

    /**
     * Formatea tamaño de archivo
     */
    formatFileSize(bytes) {
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let unitIndex = 0;
        
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }
        
        return `${size.toFixed(2)} ${units[unitIndex]}`;
    }
}

/**
 * Función principal para ejecutar desde línea de comandos
 */
async function main() {
    const normalizer = new PhotographyFileNormalizer();
    const result = await normalizer.normalize();
    
    if (result.success) {
        console.log('\n🎉 ¡Normalización completada exitosamente!');
        process.exit(0);
    } else {
        console.error('\n💥 Error durante la normalización:', result.error);
        process.exit(1);
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    main();
}

module.exports = PhotographyFileNormalizer;