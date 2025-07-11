/**
 * SERGIO FORÉS - FOTOGRAFÍA
 * Semantic Renamer for Photography Collection
 * 
 * Sistema especializado para renombrar fotografías con nombres poéticos y significativos
 * Basado en la filosofía 01234 y la exploración visual personal
 */

const fs = require('fs');
const path = require('path');

class PhotographySemanticRenamer {
    constructor() {
        this.sourceDir = path.join(__dirname, '../img/photographs');
        this.renamedFiles = [];
        this.errors = [];
        
        // Nombres semánticos organizados por categorías fotográficas
        this.semanticNames = {
            // NIVEL 0 - Campo Cuántico: Potencial y posibilidades
            quantum: [
                'campo-infinito', 'potencial-latente', 'matriz-posible',
                'reservorio-visual', 'simultaneidad-pura', 'origen-multiple'
            ],
            
            // NIVEL 1 - Esencia: Claridad y determinación
            essence: [
                'momento-decisivo', 'claridad-absoluta', 'presencia-esencial',
                'determinacion-luminosa', 'voluntad-visible', 'logos-fotografico'
            ],
            
            // NIVEL 2 - Análisis: Fragmentación y memoria
            analysis: [
                'fragmento-temporal', 'memoria-cristalizada', 'paradoja-visual',
                'dualidad-expuesta', 'matiz-revelador', 'diferencia-sutil'
            ],
            
            // NIVEL 3 - Comunicación: Relación y contexto
            communication: [
                'dialogo-silencioso', 'red-invisible', 'conexion-intuitiva',
                'sintesis-relacional', 'tejido-contextual', 'puente-visual'
            ],
            
            // NIVEL 4 - Materialización: Acción y resultado
            materialization: [
                'gesto-concreto', 'accion-cristalizada', 'resultado-tangible',
                'manifestacion-fisica', 'experiencia-directa', 'presencia-material'
            ],
            
            // Categorías temáticas específicas
            portraits: [
                'retrato-interior', 'mirada-profunda', 'gesto-revelador',
                'presencia-humana', 'expresion-autentica', 'alma-visible',
                'conexion-intima', 'dialogo-facial', 'humanidad-expuesta'
            ],
            
            landscapes: [
                'geografia-mental', 'horizonte-infinito', 'territorio-emocional',
                'paisaje-cognitivo', 'espacio-contemplativo', 'natura-pensante',
                'campo-energetico', 'respiracion-terrestre', 'pulso-geologico'
            ],
            
            abstracts: [
                'forma-emergente', 'patron-oculto', 'geometria-secreta',
                'textura-conceptual', 'abstraccion-pura', 'sintesis-formal',
                'codigo-visual', 'lenguaje-abstracto', 'metamorfosis-formal'
            ],
            
            street: [
                'ritual-urbano', 'flujo-humano', 'danza-ciudadana',
                'teatro-cotidiano', 'coreografia-casual', 'vida-publica',
                'encuentro-fortuito', 'serendipidad-urbana', 'pulso-social'
            ],
            
            experimental: [
                'laboratorio-visual', 'experimento-luminoso', 'investigacion-formal',
                'proceso-abierto', 'busqueda-continua', 'exploracion-libre',
                'hallazgo-casual', 'descubrimiento-poetico', 'innovacion-visual'
            ],
            
            intimate: [
                'momento-intimo', 'confesion-visual', 'secreto-revelado',
                'vulnerabilidad-expuesta', 'verdad-fotografica', 'honestidad-brutal',
                'transparencia-emocional', 'desnudez-conceptual', 'autenticidad-pura'
            ]
        };
        
        this.usedNames = new Set();
        this.categoryMapping = new Map();
    }

    /**
     * Ejecuta el renombrado semántico
     */
    async rename() {
        console.log('🎯 Iniciando renombrado semántico de fotografías...');
        
        try {
            const files = this.findPhotographs();
            
            if (files.length === 0) {
                console.log('⚠️  No se encontraron fotografías para renombrar');
                return { success: true, processed: 0 };
            }
            
            console.log(`📷 Encontradas ${files.length} fotografías`);
            
            // Analizar y categorizar archivos
            this.analyzeFiles(files);
            
            // Renombrar archivos
            await this.processRenaming(files);
            
            // Generar reporte
            this.generateReport();
            
            console.log('✅ Renombrado semántico completado');
            return {
                success: true,
                processed: this.renamedFiles.length,
                errors: this.errors.length
            };
            
        } catch (error) {
            console.error('❌ Error durante el renombrado:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Encuentra archivos de fotografía
     */
    findPhotographs() {
        if (!fs.existsSync(this.sourceDir)) {
            console.log(`📁 Creando directorio: ${this.sourceDir}`);
            fs.mkdirSync(this.sourceDir, { recursive: true });
            return [];
        }
        
        const files = fs.readdirSync(this.sourceDir)
            .filter(file => {
                const ext = path.extname(file).toLowerCase();
                return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
            })
            .map(file => path.join(this.sourceDir, file));
        
        return files;
    }

    /**
     * Analiza archivos para categorización inteligente
     */
    analyzeFiles(files) {
        console.log('🔍 Analizando fotografías para categorización...');
        
        files.forEach(filePath => {
            const filename = path.basename(filePath).toLowerCase();
            const category = this.inferCategory(filename);
            this.categoryMapping.set(filePath, category);
        });
    }

    /**
     * Infiere categoría basada en el nombre del archivo
     */
    inferCategory(filename) {
        const keywords = {
            portraits: ['retrato', 'portrait', 'cara', 'face', 'persona', 'people', 'gente'],
            landscapes: ['paisaje', 'landscape', 'mountain', 'sea', 'mar', 'cielo', 'sky', 'natura'],
            abstracts: ['abstract', 'forma', 'pattern', 'textura', 'texture', 'color'],
            street: ['street', 'calle', 'urban', 'urbano', 'ciudad', 'city', 'gente'],
            experimental: ['exp', 'test', 'prueba', 'experimental', 'lab'],
            intimate: ['intimate', 'personal', 'privado', 'close', 'cerca']
        };
        
        for (const [category, terms] of Object.entries(keywords)) {
            if (terms.some(term => filename.includes(term))) {
                return category;
            }
        }
        
        // Categoría por defecto basada en distribución
        const categories = Object.keys(this.semanticNames).filter(cat => 
            !['quantum', 'essence', 'analysis', 'communication', 'materialization'].includes(cat)
        );
        
        return categories[Math.floor(Math.random() * categories.length)];
    }

    /**
     * Procesa el renombrado de archivos
     */
    async processRenaming(files) {
        console.log('✏️  Iniciando renombrado de archivos...');
        
        for (const filePath of files) {
            try {
                const newName = await this.generateSemanticName(filePath);
                const newPath = path.join(this.sourceDir, newName);
                
                // Renombrar archivo
                fs.renameSync(filePath, newPath);
                
                const originalName = path.basename(filePath);
                this.renamedFiles.push({
                    original: originalName,
                    semantic: newName,
                    category: this.categoryMapping.get(filePath),
                    path: newPath
                });
                
                console.log(`📸 ${originalName} → ${newName}`);
                
            } catch (error) {
                this.errors.push({
                    file: path.basename(filePath),
                    error: error.message
                });
                console.error(`❌ Error renombrando ${filePath}:`, error.message);
            }
        }
    }

    /**
     * Genera nombre semántico basado en categoría
     */
    async generateSemanticName(filePath) {
        const category = this.categoryMapping.get(filePath);
        const extension = path.extname(filePath);
        
        // Intentar obtener nombre de la categoría específica
        let namePool = this.semanticNames[category] || [];
        
        // Si la categoría está agotada, usar nombres de niveles 01234
        if (namePool.length === 0 || this.areAllNamesUsed(namePool)) {
            namePool = [
                ...this.semanticNames.quantum,
                ...this.semanticNames.essence,
                ...this.semanticNames.analysis,
                ...this.semanticNames.communication,
                ...this.semanticNames.materialization
            ];
        }
        
        // Seleccionar nombre único
        let attempts = 0;
        let semanticName;
        
        do {
            if (attempts === 0) {
                // Primer intento: nombre aleatorio de la pool
                const availableNames = namePool.filter(name => !this.usedNames.has(name));
                if (availableNames.length > 0) {
                    const randomIndex = Math.floor(Math.random() * availableNames.length);
                    semanticName = availableNames[randomIndex];
                } else {
                    // Fallback si todos están usados
                    semanticName = `${namePool[Math.floor(Math.random() * namePool.length)]}-${attempts + 1}`;
                }
            } else {
                // Intentos posteriores: agregar sufijo
                const baseName = namePool[Math.floor(Math.random() * namePool.length)];
                semanticName = `${baseName}-${attempts}`;
            }
            attempts++;
        } while (this.usedNames.has(semanticName) && attempts < 50);
        
        // Fallback extremo
        if (attempts >= 50) {
            semanticName = `fotografia-${Date.now()}`;
        }
        
        this.usedNames.add(semanticName);
        return `${semanticName}${extension}`;
    }

    /**
     * Verifica si todos los nombres de una pool están usados
     */
    areAllNamesUsed(namePool) {
        return namePool.every(name => this.usedNames.has(name));
    }

    /**
     * Genera reporte del renombrado
     */
    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                totalRenamed: this.renamedFiles.length,
                totalErrors: this.errors.length,
                categoriesUsed: [...new Set(this.renamedFiles.map(f => f.category))]
            },
            files: this.renamedFiles,
            errors: this.errors,
            categoryDistribution: this.getCategoryDistribution()
        };
        
        const reportPath = path.join(__dirname, '../semantic-renaming-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        
        console.log('\n📊 REPORTE DE RENOMBRADO SEMÁNTICO');
        console.log('=====================================');
        console.log(`📸 Fotografías renombradas: ${report.summary.totalRenamed}`);
        console.log(`❌ Errores: ${report.summary.totalErrors}`);
        console.log(`🏷️  Categorías utilizadas: ${report.summary.categoriesUsed.join(', ')}`);
        console.log(`📄 Reporte guardado: ${reportPath}`);
        
        // Mostrar distribución por categorías
        console.log('\n📊 DISTRIBUCIÓN POR CATEGORÍAS:');
        Object.entries(report.categoryDistribution).forEach(([category, count]) => {
            console.log(`   ${category}: ${count} fotografías`);
        });
    }

    /**
     * Obtiene distribución por categorías
     */
    getCategoryDistribution() {
        const distribution = {};
        this.renamedFiles.forEach(file => {
            distribution[file.category] = (distribution[file.category] || 0) + 1;
        });
        return distribution;
    }
}

/**
 * Función principal
 */
async function main() {
    const renamer = new PhotographySemanticRenamer();
    const result = await renamer.rename();
    
    if (result.success) {
        console.log('\n🎉 ¡Renombrado semántico completado!');
        console.log(`✨ ${result.processed} fotografías ahora tienen nombres poéticos`);
        process.exit(0);
    } else {
        console.error('\n💥 Error durante el renombrado:', result.error);
        process.exit(1);
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    main();
}

module.exports = PhotographySemanticRenamer;