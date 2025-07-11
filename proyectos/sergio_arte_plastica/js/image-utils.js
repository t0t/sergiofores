/**
 * SERGIO ARTE PLÁSTICA - Image Management Utilities
 * Scripts para gestión completa de imágenes del portfolio
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp'); // npm install sharp

// ===== CONFIGURACIÓN =====
const CONFIG = {
    // Directorios
    IMAGES_DIR: './images',
    OBRAS_DIR: './images/obras',
    ARCHIVE_DIR: './images/archive',
    GALLERY_DIR: './images/gallery',
    
    // Dimensiones y calidad
    THUMBNAIL_SIZE: 400,
    GALLERY_SIZE: 1200,
    QUALITY: 85,
    
    // Formatos soportados
    SUPPORTED_FORMATS: ['.jpg', '.jpeg', '.png', '.webp'],
    
    // Convenciones de nomenclatura
    NAMING_PATTERNS: {
        oil: /^(oleo|oil|pintura)_/i,
        ink: /^(tinta|ink|caligrafia)_/i,
        sculpture: /^(escultura|sculpture|3d)_/i,
        drawing: /^(dibujo|drawing|sketch)_/i
    }
};

// ===== UTILIDADES BÁSICAS =====
class ImageUtils {
    /**
     * Obtener todas las imágenes de un directorio
     */
    static async getImagesFromDir(dirPath) {
        try {
            const files = await fs.promises.readdir(dirPath);
            return files.filter(file => 
                CONFIG.SUPPORTED_FORMATS.includes(path.extname(file).toLowerCase())
            );
        } catch (error) {
            console.error(`Error leyendo directorio ${dirPath}:`, error.message);
            return [];
        }
    }

    /**
     * Obtener metadatos de imagen
     */
    static async getImageMetadata(imagePath) {
        try {
            const metadata = await sharp(imagePath).metadata();
            const stats = await fs.promises.stat(imagePath);
            
            return {
                filename: path.basename(imagePath),
                width: metadata.width,
                height: metadata.height,
                format: metadata.format,
                size: stats.size,
                sizeKB: Math.round(stats.size / 1024),
                aspectRatio: Math.round((metadata.width / metadata.height) * 100) / 100,
                created: stats.birthtime,
                modified: stats.mtime
            };
        } catch (error) {
            console.error(`Error obteniendo metadatos de ${imagePath}:`, error.message);
            return null;
        }
    }

    /**
     * Generar nombre optimizado según convenciones
     */
    static generateOptimalName(filename, category = 'general') {
        const nameWithoutExt = path.parse(filename).name;
        const ext = path.parse(filename).ext.toLowerCase();
        
        // Limpiar nombre: solo letras, números y guiones
        let cleanName = nameWithoutExt
            .toLowerCase()
            .replace(/[^a-z0-9\-_]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
        
        // Añadir prefijo según categoría
        const prefixes = {
            oil: 'oleo',
            ink: 'tinta',
            sculpture: 'escultura',
            drawing: 'dibujo'
        };
        
        if (prefixes[category] && !cleanName.startsWith(prefixes[category])) {
            cleanName = `${prefixes[category]}-${cleanName}`;
        }
        
        return `${cleanName}${ext}`;
    }
}

// ===== RENOMBRADOR DE IMÁGENES =====
class ImageRenamer {
    constructor() {
        this.renamedFiles = [];
        this.errors = [];
    }

    /**
     * Renombrar todas las imágenes según convenciones
     */
    async renameAllImages() {
        console.log('🔄 Iniciando renombrado de imágenes...\n');
        
        const directories = [
            { path: CONFIG.OBRAS_DIR, category: 'general' },
            { path: path.join(CONFIG.OBRAS_DIR, 'oil'), category: 'oil' },
            { path: path.join(CONFIG.OBRAS_DIR, 'ink'), category: 'ink' },
            { path: path.join(CONFIG.OBRAS_DIR, '3dprinting'), category: 'sculpture' },
            { path: CONFIG.ARCHIVE_DIR, category: 'archive' }
        ];

        for (const dir of directories) {
            await this.renameInDirectory(dir.path, dir.category);
        }

        this.printSummary();
    }

    async renameInDirectory(dirPath, category) {
        const images = await ImageUtils.getImagesFromDir(dirPath);
        
        console.log(`📁 Procesando: ${dirPath} (${images.length} imágenes)`);
        
        for (const filename of images) {
            const oldPath = path.join(dirPath, filename);
            const newFilename = ImageUtils.generateOptimalName(filename, category);
            const newPath = path.join(dirPath, newFilename);
            
            if (filename !== newFilename) {
                try {
                    await fs.promises.rename(oldPath, newPath);
                    this.renamedFiles.push({
                        old: filename,
                        new: newFilename,
                        path: dirPath
                    });
                    console.log(`  ✅ ${filename} → ${newFilename}`);
                } catch (error) {
                    this.errors.push({
                        file: filename,
                        error: error.message
                    });
                    console.log(`  ❌ Error: ${filename} - ${error.message}`);
                }
            }
        }
    }

    printSummary() {
        console.log('\n📊 RESUMEN DE RENOMBRADO:');
        console.log(`✅ Archivos renombrados: ${this.renamedFiles.length}`);
        console.log(`❌ Errores: ${this.errors.length}`);
        
        if (this.errors.length > 0) {
            console.log('\n🚨 ERRORES:');
            this.errors.forEach(error => {
                console.log(`  - ${error.file}: ${error.error}`);
            });
        }
    }
}

// ===== OPTIMIZADOR DE IMÁGENES =====
class ImageOptimizer {
    constructor() {
        this.optimizedFiles = [];
        this.errors = [];
        this.totalSaved = 0;
    }

    /**
     * Optimizar todas las imágenes
     */
    async optimizeAllImages() {
        console.log('🎨 Iniciando optimización de imágenes...\n');
        
        const directories = [CONFIG.OBRAS_DIR, CONFIG.GALLERY_DIR];
        
        for (const dir of directories) {
            await this.optimizeDirectory(dir);
        }
        
        this.printOptimizationSummary();
    }

    async optimizeDirectory(dirPath) {
        const images = await ImageUtils.getImagesFromDir(dirPath);
        
        console.log(`📁 Optimizando: ${dirPath} (${images.length} imágenes)`);
        
        for (const filename of images) {
            await this.optimizeImage(path.join(dirPath, filename));
        }
    }

    async optimizeImage(imagePath) {
        try {
            const originalStats = await fs.promises.stat(imagePath);
            const originalSize = originalStats.size;
            
            // Crear backup
            const backupPath = `${imagePath}.backup`;
            await fs.promises.copyFile(imagePath, backupPath);
            
            // Optimizar según tipo de directorio
            const isGallery = imagePath.includes('gallery');
            const maxWidth = isGallery ? CONFIG.GALLERY_SIZE : 1200;
            
            await sharp(imagePath)
                .resize(maxWidth, null, { 
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                .jpeg({ 
                    quality: CONFIG.QUALITY,
                    progressive: true,
                    mozjpeg: true
                })
                .png({
                    quality: CONFIG.QUALITY,
                    compressionLevel: 9
                })
                .toFile(`${imagePath}.optimized`);
            
            // Reemplazar original con optimizado
            await fs.promises.rename(`${imagePath}.optimized`, imagePath);
            
            // Calcular ahorro
            const newStats = await fs.promises.stat(imagePath);
            const savedBytes = originalSize - newStats.size;
            const savedPercent = Math.round((savedBytes / originalSize) * 100);
            
            this.optimizedFiles.push({
                file: path.basename(imagePath),
                originalSize: Math.round(originalSize / 1024),
                newSize: Math.round(newStats.size / 1024),
                saved: Math.round(savedBytes / 1024),
                savedPercent
            });
            
            this.totalSaved += savedBytes;
            
            // Eliminar backup si todo salió bien
            await fs.promises.unlink(backupPath);
            
            console.log(`  ✅ ${path.basename(imagePath)} - ${savedPercent}% menos (${Math.round(savedBytes/1024)}KB ahorrados)`);
            
        } catch (error) {
            this.errors.push({
                file: path.basename(imagePath),
                error: error.message
            });
            console.log(`  ❌ Error: ${path.basename(imagePath)} - ${error.message}`);
            
            // Restaurar backup si existe
            const backupPath = `${imagePath}.backup`;
            if (fs.existsSync(backupPath)) {
                await fs.promises.rename(backupPath, imagePath);
            }
        }
    }

    printOptimizationSummary() {
        console.log('\n📊 RESUMEN DE OPTIMIZACIÓN:');
        console.log(`✅ Imágenes optimizadas: ${this.optimizedFiles.length}`);
        console.log(`💾 Espacio total ahorrado: ${Math.round(this.totalSaved / 1024 / 1024 * 100) / 100}MB`);
        console.log(`❌ Errores: ${this.errors.length}`);
        
        if (this.optimizedFiles.length > 0) {
            const avgSaved = this.optimizedFiles.reduce((acc, file) => acc + file.savedPercent, 0) / this.optimizedFiles.length;
            console.log(`📈 Reducción promedio: ${Math.round(avgSaved)}%`);
        }
    }
}

// ===== GENERADOR DE GALERÍAS =====
class GalleryGenerator {
    constructor() {
        this.artworks = [];
    }

    /**
     * Generar datos de galería para JavaScript
     */
    async generateGalleryData() {
        console.log('🖼️ Generando datos de galería...\n');
        
        await this.scanArtworks();
        await this.generateJSFile();
        await this.generateJSONFile();
        
        console.log(`✅ Galería generada con ${this.artworks.length} obras`);
    }

    async scanArtworks() {
        const oilDir = path.join(CONFIG.OBRAS_DIR, 'oil');
        const inkDir = path.join(CONFIG.OBRAS_DIR, 'ink');
        const sculpDir = path.join(CONFIG.OBRAS_DIR, '3dprinting');
        
        // Escanear cada categoría
        await this.scanCategory(oilDir, 'Óleo sobre lino belga');
        await this.scanCategory(inkDir, 'Tinta sobre papel japonés');
        await this.scanCategory(sculpDir, 'Impresión 3D');
        
        // Ordenar por fecha de modificación (más recientes primero)
        this.artworks.sort((a, b) => new Date(b.created) - new Date(a.created));
    }

    async scanCategory(dirPath, technique) {
        const images = await ImageUtils.getImagesFromDir(dirPath);
        
        for (const filename of images) {
            const imagePath = path.join(dirPath, filename);
            const metadata = await ImageUtils.getImageMetadata(imagePath);
            
            if (metadata) {
                const artwork = {
                    id: this.generateArtworkId(filename),
                    filename: filename,
                    path: path.relative('./images', imagePath).replace(/\\/g, '/'),
                    title: this.generateTitle(filename),
                    technique: technique,
                    year: this.extractYear(filename, metadata.created),
                    dimensions: this.generateDimensions(metadata),
                    ...metadata
                };
                
                this.artworks.push(artwork);
            }
        }
    }

    generateArtworkId(filename) {
        return path.parse(filename).name.toLowerCase().replace(/[^a-z0-9]/g, '');
    }

    generateTitle(filename) {
        const name = path.parse(filename).name;
        
        // Convertir nombres técnicos a títulos elegantes
        return name
            .replace(/^(oleo|tinta|escultura)-/, '')
            .split(/[-_]/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    extractYear(filename, createdDate) {
        // Intentar extraer año del nombre del archivo
        const yearMatch = filename.match(/20\d{2}/);
        if (yearMatch) return parseInt(yearMatch[0]);
        
        // Si no, usar año de creación del archivo
        return new Date(createdDate).getFullYear();
    }

    generateDimensions(metadata) {
        // Generar dimensiones realistas basadas en proporciones
        const ratio = metadata.width / metadata.height;
        
        if (ratio > 1.3) return '120 × 90 cm';
        if (ratio > 0.9) return '100 × 100 cm';
        return '90 × 120 cm';
    }

    async generateJSFile() {
        const jsContent = `/**
 * SERGIO ARTE PLÁSTICA - Gallery Data
 * Generado automáticamente - No editar manualmente
 */

const GALLERY_DATA = ${JSON.stringify(this.artworks, null, 2)};

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GALLERY_DATA;
}

// Disponible globalmente en el navegador
if (typeof window !== 'undefined') {
    window.GALLERY_DATA = GALLERY_DATA;
}
`;
        
        await fs.promises.writeFile('./js/gallery-data.js', jsContent);
        console.log('✅ Archivo gallery-data.js generado');
    }

    async generateJSONFile() {
        const jsonContent = JSON.stringify({
            metadata: {
                generated: new Date().toISOString(),
                totalArtworks: this.artworks.length,
                categories: this.getCategoryCounts()
            },
            artworks: this.artworks
        }, null, 2);
        
        await fs.promises.writeFile('./gallery-data.json', jsonContent);
        console.log('✅ Archivo gallery-data.json generado');
    }

    getCategoryCounts() {
        const counts = {};
        this.artworks.forEach(artwork => {
            counts[artwork.technique] = (counts[artwork.technique] || 0) + 1;
        });
        return counts;
    }
}

// ===== EXPORTACIÓN =====
module.exports = {
    ImageUtils,
    ImageRenamer,
    ImageOptimizer,
    GalleryGenerator,
    CONFIG
};