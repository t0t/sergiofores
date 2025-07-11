/**
 * SERGIO FORÉS - FOTOGRAFÍA
 * Photography Collection Organizer
 * 
 * Sistema unificado para normalizar, renombrar y organizar la colección fotográfica
 * Adapta las mejores prácticas del proyecto sergio_arte_plastica
 */

const fs = require('fs');
const path = require('path');

class PhotographyOrganizer {
    constructor() {
        this.baseDir = path.dirname(__dirname); // /fotografia
        this.sourceDir = path.join(this.baseDir, 'img');
        this.targetDir = path.join(this.baseDir, 'img', 'photographs');
        this.backupDir = path.join(this.baseDir, 'img', 'originals');
        
        this.validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.JPG', '.JPEG', '.PNG', '.HEIC'];
        this.processedFiles = [];
        this.errors = [];
        this.usedNames = new Set();
        
        // Nombres semánticos inspirados en la filosofía 01234 y fotografía contemplativa
        this.semanticNames = [
            // Nivel 0 - Campo Cuántico (Potencial infinito)
            'campo-infinito', 'potencial-latente', 'matriz-posible', 'simultaneidad-pura',
            'reservorio-visual', 'origen-multiple', 'quantum-fotografico', 'posibilidad-abierta',
            
            // Nivel 1 - Esencia (Claridad y determinación)  
            'momento-decisivo', 'claridad-absoluta', 'presencia-esencial', 'determinacion-luminosa',
            'voluntad-visible', 'logos-fotografico', 'esencia-capturada', 'blueprint-visual',
            
            // Nivel 2 - Análisis (Fragmentación y memoria)
            'fragmento-temporal', 'memoria-cristalizada', 'paradoja-visual', 'dualidad-expuesta',
            'matiz-revelador', 'diferencia-sutil', 'analisis-sensible', 'procesamiento-visual',
            
            // Nivel 3 - Comunicación (Relación y contexto)
            'dialogo-silencioso', 'red-invisible', 'conexion-intuitiva', 'sintesis-relacional',
            'tejido-contextual', 'puente-visual', 'traduccion-luminosa', 'coherencia-narrativa',
            
            // Nivel 4 - Materialización (Acción y resultado)
            'gesto-concreto', 'accion-cristalizada', 'resultado-tangible', 'manifestacion-fisica',
            'experiencia-directa', 'presencia-material', 'funcionamiento-real', 'operacion-exitosa',
            
            // Temáticas fotográficas específicas
            'retrato-interior', 'mirada-profunda', 'gesto-revelador', 'presencia-humana',
            'expresion-autentica', 'alma-visible', 'conexion-intima', 'dialogo-facial',
            'geografia-mental', 'horizonte-infinito', 'territorio-emocional', 'paisaje-cognitivo',
            'espacio-contemplativo', 'natura-pensante', 'campo-energetico', 'respiracion-terrestre',
            'forma-emergente', 'patron-oculto', 'geometria-secreta', 'textura-conceptual',
            'abstraccion-pura', 'sintesis-formal', 'codigo-visual', 'lenguaje-abstracto',
            'ritual-urbano', 'flujo-humano', 'danza-ciudadana', 'teatro-cotidiano',
            'coreografia-casual', 'vida-publica', 'encuentro-fortuito', 'serendipidad-urbana',
            'laboratorio-visual', 'experimento-luminoso', 'investigacion-formal', 'proceso-abierto',
            'busqueda-continua', 'exploracion-libre', 'hallazgo-casual', 'descubrimiento-poetico',
            'momento-intimo', 'confesion-visual', 'secreto-revelado', 'vulnerabilidad-expuesta',
            'verdad-fotografica', 'honestidad-brutal', 'transparencia-emocional', 'desnudez-conceptual',
            'luz-fragmentada', 'textura-temporal', 'materia-pensante', 'superficie-consciente',
            'micro-universo', 'arqueologia-domestica', 'huella-temporal', 'memoria-material',
            'objeto-familiar', 'detalle-revelador', 'registro-tactil', 'evidencia-poetica',
            'transito-perpetuo', 'navegacion-urbana', 'densidad-humana', 'pulso-social',
            'arquitectura-emocional', 'ciudad-neurologica', 'espacio-publico', 'flujo-ciudadano'
        ];
    }

    /**
     * Ejecuta el proceso completo de organización
     */
    async organize() {
        console.log('🎯 Iniciando organización de colección fotográfica...');
        console.log(`📁 Directorio fuente: ${this.sourceDir}`);
        console.log(`📁 Directorio destino: ${this.targetDir}`);
        
        try {
            // Preparar directorios
            this.createDirectories();
            
            // Buscar archivos de imagen
            const imageFiles = this.findImageFiles();
            
            if (imageFiles.length === 0) {
                console.log('⚠️  No se encontraron archivos de imagen para organizar');
                return { success: true, processed: 0 };
            }
            
            console.log(`📷 Encontradas ${imageFiles.length} fotografías para procesar`);
            
            // Procesar cada archivo
            for (const filePath of imageFiles) {
                await this.processImage(filePath);
            }
            
            // Generar reporte
            this.generateReport();
            
            console.log('✅ Organización completada exitosamente');
            return {
                success: true,
                processed: this.processedFiles.length,
                errors: this.errors.length
            };
            
        } catch (error) {
            console.error('❌ Error durante la organización:', error);
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
        const dirs = [this.targetDir, this.backupDir];
        
        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
                console.log(`📁 Directorio creado: ${path.relative(this.baseDir, dir)}`);
            }
        });
    }

    /**
     * Encuentra archivos de imagen, excluyendo subdirectorios ya organizados
     */
    findImageFiles() {
        const files = [];
        
        if (!fs.existsSync(this.sourceDir)) {
            return files;
        }
        
        const items = fs.readdirSync(this.sourceDir);
        
        items.forEach(item => {
            const itemPath = path.join(this.sourceDir, item);
            const stat = fs.statSync(itemPath);
            
            // Solo procesar archivos, no subdirectorios
            if (stat.isFile()) {
                const ext = path.extname(item);
                if (this.validExtensions.includes(ext)) {
                    // Excluir el thumbnail del proyecto
                    if (item !== 'fotografia.jpg') {
                        files.push(itemPath);
                    }
                }
            }
        });
        
        return files;
    }

    /**
     * Procesa una imagen individual
     */
    async processImage(filePath) {
        try {
            const originalName = path.basename(filePath);
            const extension = path.extname(filePath).toLowerCase();
            
            // Generar nombre semántico único
            const semanticName = this.generateSemanticName();
            const normalizedExtension = this.normalizeExtension(extension);
            const finalName = `${semanticName}${normalizedExtension}`;
            
            // Rutas finales
            const targetPath = path.join(this.targetDir, finalName);
            const backupPath = path.join(this.backupDir, originalName);
            
            // Backup del archivo original
            fs.copyFileSync(filePath, backupPath);
            
            // Copiar con nombre semántico
            fs.copyFileSync(filePath, targetPath);
            
            // Eliminar archivo original del directorio raíz
            fs.unlinkSync(filePath);
            
            // Registrar procesamiento
            const stats = fs.statSync(targetPath);
            this.processedFiles.push({
                original: originalName,
                semantic: finalName,
                originalPath: filePath,
                targetPath: targetPath,
                backupPath: backupPath,
                size: stats.size,
                sizeKB: Math.round(stats.size / 1024),
                processed: new Date().toISOString()
            });
            
            console.log(`📸 ${originalName} → ${finalName} (${this.formatFileSize(stats.size)})`);
            
        } catch (error) {
            this.errors.push({
                file: path.basename(filePath),
                error: error.message
            });
            console.error(`❌ Error procesando ${filePath}:`, error.message);
        }
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
                const randomIndex = Math.floor(Math.random() * this.semanticNames.length);
                name = this.semanticNames[randomIndex];
            } else {
                // Intentos posteriores: agregar sufijo numérico
                const baseName = this.semanticNames[Math.floor(Math.random() * this.semanticNames.length)];
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
            '.HEIC': '.jpg', // HEIC se mantiene como JPG para compatibilidad web
            '.heic': '.jpg'
        };
        
        return normalizations[extension] || extension.toLowerCase();
    }

    /**
     * Genera reporte detallado
     */
    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            project: 'Sergio Forés - Fotografía',
            summary: {
                totalProcessed: this.processedFiles.length,
                totalErrors: this.errors.length,
                totalSize: this.processedFiles.reduce((sum, file) => sum + file.size, 0),
                averageSize: this.processedFiles.length > 0 ? 
                    Math.round(this.processedFiles.reduce((sum, file) => sum + file.size, 0) / this.processedFiles.length) : 0
            },
            directories: {
                source: path.relative(this.baseDir, this.sourceDir),
                target: path.relative(this.baseDir, this.targetDir),
                backup: path.relative(this.baseDir, this.backupDir)
            },
            files: this.processedFiles,
            errors: this.errors,
            nextSteps: [
                'Revisar fotografías en img/photographs/',
                'Actualizar gallery-data.js con metadatos',
                'Optimizar imágenes si es necesario',
                'Probar la galería en navegador'
            ]
        };
        
        const reportPath = path.join(this.baseDir, 'photography-organization-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        
        console.log('\n📊 REPORTE DE ORGANIZACIÓN');
        console.log('==========================');
        console.log(`📷 Fotografías procesadas: ${report.summary.totalProcessed}`);
        console.log(`❌ Errores: ${report.summary.totalErrors}`);
        console.log(`💾 Tamaño total: ${this.formatFileSize(report.summary.totalSize)}`);
        console.log(`📊 Tamaño promedio: ${this.formatFileSize(report.summary.averageSize)}`);
        console.log(`📁 Organizadas en: ${report.directories.target}`);
        console.log(`🔒 Backup en: ${report.directories.backup}`);
        console.log(`📄 Reporte: photography-organization-report.json`);
        
        if (this.errors.length > 0) {
            console.log('\n⚠️  ERRORES ENCONTRADOS:');
            this.errors.forEach(error => {
                console.log(`   ${error.file}: ${error.error}`);
            });
        }
        
        console.log('\n🎯 PRÓXIMOS PASOS:');
        report.nextSteps.forEach((step, index) => {
            console.log(`   ${index + 1}. ${step}`);
        });
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
 * Función principal
 */
async function main() {
    console.log('🎨 SERGIO FORÉS - ORGANIZADOR DE FOTOGRAFÍAS');
    console.log('============================================');
    
    const organizer = new PhotographyOrganizer();
    const result = await organizer.organize();
    
    if (result.success) {
        console.log('\n🎉 ¡Organización completada exitosamente!');
        console.log(`✨ ${result.processed} fotografías ahora tienen nombres semánticos y están organizadas`);
        console.log('\n📝 Recuerda actualizar gallery-data.js con los metadatos de tus fotografías');
        process.exit(0);
    } else {
        console.error('\n💥 Error durante la organización:', result.error);
        process.exit(1);
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    main();
}

module.exports = PhotographyOrganizer;