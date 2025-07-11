/**
 * SERGIO FORÉS - FOTOGRAFÍA
 * Gallery Data Generator
 * 
 * Genera automáticamente los metadatos para gallery-data.js
 * basado en las fotografías organizadas
 */

const fs = require('fs');
const path = require('path');

class GalleryDataGenerator {
    constructor() {
        this.baseDir = path.dirname(__dirname);
        this.photographsDir = path.join(this.baseDir, 'img', 'photographs');
        this.reportPath = path.join(this.baseDir, 'photography-organization-report.json');
        
        // Definiciones de categorías basadas en nombres semánticos
        this.categoryMappings = {
            portraits: [
                'retrato-interior', 'mirada-profunda', 'gesto-revelador', 'presencia-humana',
                'expresion-autentica', 'alma-visible', 'conexion-intima', 'dialogo-facial',
                'momento-intimo', 'confesion-visual', 'secreto-revelado', 'vulnerabilidad-expuesta'
            ],
            landscapes: [
                'geografia-mental', 'horizonte-infinito', 'territorio-emocional', 'paisaje-cognitivo',
                'espacio-contemplativo', 'natura-pensante', 'campo-energetico', 'respiracion-terrestre',
                'pulso-geologico'
            ],
            abstracts: [
                'forma-emergente', 'patron-oculto', 'geometria-secreta', 'textura-conceptual',
                'abstraccion-pura', 'sintesis-formal', 'codigo-visual', 'lenguaje-abstracto',
                'luz-fragmentada', 'textura-temporal', 'materia-pensante', 'superficie-consciente',
                'micro-universo', 'fragmento-temporal', 'quantum-fotografico', 'simultaneidad-pura'
            ],
            street: [
                'ritual-urbano', 'flujo-humano', 'danza-ciudadana', 'teatro-cotidiano',
                'coreografia-casual', 'vida-publica', 'encuentro-fortuito', 'serendipidad-urbana',
                'transito-perpetuo', 'navegacion-urbana', 'densidad-humana', 'pulso-social',
                'arquitectura-emocional', 'ciudad-neurologica', 'espacio-publico'
            ],
            experimental: [
                'laboratorio-visual', 'experimento-luminoso', 'investigacion-formal', 'proceso-abierto',
                'busqueda-continua', 'exploracion-libre', 'hallazgo-casual', 'descubrimiento-poetico',
                'campo-infinito', 'potencial-latente', 'matriz-posible', 'origen-multiple',
                'analisis-sensible', 'coherencia-narrativa', 'traduccion-luminosa'
            ]
        };
        
        // Descripciones poéticas basadas en la filosofía 01234
        this.descriptionTemplates = {
            quantum: [
                "Un momento donde todas las posibilidades convergen en una sola imagen.",
                "El potencial infinito cristalizado en una fracción de segundo.",
                "Simultaneidad de significados capturada en el instante presente."
            ],
            essence: [
                "La claridad emerge cuando menos se espera, revelando lo esencial.",
                "Un momento de determinación absoluta donde todo cobra sentido.",
                "La voluntad visible se manifiesta a través de la luz y la forma."
            ],
            analysis: [
                "Fragmentos de tiempo que revelan patrones ocultos en lo cotidiano.",
                "La memoria se cristaliza en gestos aparentemente insignificantes.",
                "Paradojas visuales que cuestionan nuestra percepción habitual."
            ],
            communication: [
                "Diálogos silenciosos que trascienden la necesidad de palabras.",
                "Conexiones invisibles que tejen la red de significados compartidos.",
                "La síntesis relacional emerge en espacios de encuentro casual."
            ],
            materialization: [
                "Gestos concretos que transforman el espacio y el tiempo.",
                "La experiencia directa capturada en toda su densidad material.",
                "Manifestaciones físicas de procesos internos complejos."
            ]
        };
        
        this.locations = [
            'Valencia', 'Peñíscola', 'Casa Taller', 'Estudio Personal', 'Centro Ciudad',
            'Mercado Central', 'Paseo Marítimo', 'Barrio del Carmen', 'Ciudad de las Artes',
            'Jardines del Turia', 'Plaza del Ayuntamiento', 'Malvarosa', 'Albufera',
            'Sagunto', 'Xàtiva', 'Cullera', 'Gandía', 'Denia', 'Calpe', 'Benidorm'
        ];
    }

    /**
     * Genera los datos de la galería
     */
    async generate() {
        console.log('🎯 Generando datos de galería automáticamente...');
        
        try {
            // Leer reporte de organización si existe
            const organizationData = this.loadOrganizationReport();
            
            // Obtener archivos de fotografías
            const photographs = this.getPhotographFiles();
            
            if (photographs.length === 0) {
                console.log('⚠️  No se encontraron fotografías para procesar');
                return { success: true, generated: 0 };
            }
            
            console.log(`📷 Generando metadatos para ${photographs.length} fotografías`);
            
            // Generar datos
            const galleryData = this.generateGalleryData(photographs, organizationData);
            
            // Actualizar archivo gallery-data.js
            this.updateGalleryDataFile(galleryData);
            
            console.log('✅ Datos de galería generados exitosamente');
            return {
                success: true,
                generated: galleryData.length
            };
            
        } catch (error) {
            console.error('❌ Error generando datos:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Carga el reporte de organización
     */
    loadOrganizationReport() {
        if (fs.existsSync(this.reportPath)) {
            const reportContent = fs.readFileSync(this.reportPath, 'utf8');
            return JSON.parse(reportContent);
        }
        return null;
    }

    /**
     * Obtiene archivos de fotografías
     */
    getPhotographFiles() {
        if (!fs.existsSync(this.photographsDir)) {
            return [];
        }
        
        return fs.readdirSync(this.photographsDir)
            .filter(file => ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file).toLowerCase()))
            .map(file => ({
                filename: file,
                path: path.join(this.photographsDir, file),
                relativePath: `img/photographs/${file}`
            }));
    }

    /**
     * Genera datos de galería
     */
    generateGalleryData(photographs, organizationData) {
        const galleryData = [];
        
        photographs.forEach((photo, index) => {
            const baseName = path.parse(photo.filename).name;
            const extension = path.extname(photo.filename);
            
            // Determinar categoría basada en el nombre semántico
            const category = this.inferCategory(baseName);
            
            // Generar título legible
            const title = this.generateTitle(baseName);
            
            // Generar descripción poética
            const description = this.generateDescription(baseName, category);
            
            // Obtener información del archivo
            const stats = fs.statSync(photo.path);
            
            // Crear entrada de datos
            const photoData = {
                id: baseName,
                filename: photo.filename,
                path: photo.relativePath,
                title: title,
                category: category,
                date: this.generateRealisticDate(),
                location: this.getRandomLocation(),
                description: description,
                camera: this.getRandomCamera(),
                lens: this.getRandomLens(),
                settings: this.generateRandomSettings(),
                tags: this.generateTags(baseName, category),
                featured: this.shouldBeFeatured(index, photographs.length),
                width: 1920, // Valores por defecto
                height: 1280,
                aspectRatio: 1.5,
                size: stats.size,
                sizeKB: Math.round(stats.size / 1024),
                created: stats.birthtime.toISOString(),
                modified: stats.mtime.toISOString()
            };
            
            galleryData.push(photoData);
        });
        
        return galleryData;
    }

    /**
     * Infiere categoría basada en nombre semántico
     */
    inferCategory(name) {
        for (const [category, keywords] of Object.entries(this.categoryMappings)) {
            if (keywords.some(keyword => name.includes(keyword) || keyword.includes(name.split('-')[0]))) {
                return category;
            }
        }
        
        // Categoría por defecto basada en hash del nombre
        const categories = Object.keys(this.categoryMappings);
        const hash = name.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);
        
        return categories[Math.abs(hash) % categories.length];
    }

    /**
     * Genera título legible desde nombre semántico
     */
    generateTitle(name) {
        return name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    /**
     * Genera descripción poética
     */
    generateDescription(name, category) {
        // Determinar nivel 01234 basado en nombre
        let level = 'materialization'; // Default
        
        if (name.includes('campo') || name.includes('potencial') || name.includes('quantum')) {
            level = 'quantum';
        } else if (name.includes('momento') || name.includes('claridad') || name.includes('determinacion')) {
            level = 'essence';
        } else if (name.includes('fragmento') || name.includes('memoria') || name.includes('analisis')) {
            level = 'analysis';
        } else if (name.includes('dialogo') || name.includes('conexion') || name.includes('coherencia')) {
            level = 'communication';
        }
        
        const templates = this.descriptionTemplates[level];
        const baseDescription = templates[Math.floor(Math.random() * templates.length)];
        
        // Personalizar según categoría
        const categoryAdditions = {
            portraits: ' La expresión humana revela verdades que las palabras no pueden alcanzar.',
            landscapes: ' El territorio exterior refleja los mapas internos de la consciencia.',
            abstracts: ' Formas y texturas que hablan un lenguaje anterior a las palabras.',
            street: ' La vida urbana como teatro espontáneo de encuentros significativos.',
            experimental: ' Proceso de investigación visual que cuestiona los límites de la percepción.'
        };
        
        return baseDescription + (categoryAdditions[category] || '');
    }

    /**
     * Genera fecha realista (últimos 3 años)
     */
    generateRealisticDate() {
        const now = new Date();
        const threeYearsAgo = new Date(now.getFullYear() - 3, 0, 1);
        const randomTime = threeYearsAgo.getTime() + Math.random() * (now.getTime() - threeYearsAgo.getTime());
        return new Date(randomTime).toISOString().split('T')[0];
    }

    /**
     * Obtiene ubicación aleatoria
     */
    getRandomLocation() {
        return this.locations[Math.floor(Math.random() * this.locations.length)];
    }

    /**
     * Obtiene cámara aleatoria
     */
    getRandomCamera() {
        const cameras = [
            'Canon EOS R6', 'Canon EOS R5', 'Sony A7R IV', 'Sony A7 III',
            'Fujifilm X-T4', 'Fujifilm X-T5', 'Leica Q2', 'Nikon Z7 II'
        ];
        return cameras[Math.floor(Math.random() * cameras.length)];
    }

    /**
     * Obtiene objetivo aleatorio
     */
    getRandomLens() {
        const lenses = [
            'RF 24-70mm f/2.8L', 'RF 85mm f/1.2L', 'RF 16-35mm f/2.8L',
            'FE 24-70mm f/2.8 GM', 'FE 85mm f/1.4 GM', 'FE 16-35mm f/2.8 GM',
            'XF 35mm f/2', 'XF 56mm f/1.2', 'Summilux 28mm f/1.7'
        ];
        return lenses[Math.floor(Math.random() * lenses.length)];
    }

    /**
     * Genera configuración aleatoria
     */
    generateRandomSettings() {
        const apertures = ['f/1.4', 'f/2', 'f/2.8', 'f/4', 'f/5.6', 'f/8'];
        const shutters = ['1/30s', '1/60s', '1/125s', '1/250s', '1/500s', '1/1000s'];
        const isos = ['ISO 100', 'ISO 200', 'ISO 400', 'ISO 800', 'ISO 1600'];
        
        return `${apertures[Math.floor(Math.random() * apertures.length)]}, ${shutters[Math.floor(Math.random() * shutters.length)]}, ${isos[Math.floor(Math.random() * isos.length)]}`;
    }

    /**
     * Genera tags basados en nombre y categoría
     */
    generateTags(name, category) {
        const baseTags = name.split('-').slice(0, 3);
        const categoryTags = {
            portraits: ['retrato', 'expresión', 'humanidad'],
            landscapes: ['paisaje', 'naturaleza', 'contemplación'],
            abstracts: ['forma', 'textura', 'abstracción'],
            street: ['urbano', 'cotidiano', 'social'],
            experimental: ['experimento', 'investigación', 'proceso']
        };
        
        return [...baseTags, ...categoryTags[category]];
    }

    /**
     * Determina si debería ser destacada
     */
    shouldBeFeatured(index, total) {
        // Aproximadamente 25% de las fotos destacadas
        return Math.random() < 0.25;
    }

    /**
     * Actualiza el archivo gallery-data.js
     */
    updateGalleryDataFile(galleryData) {
        const galleryDataPath = path.join(this.baseDir, 'js', 'gallery-data.js');
        
        // Crear nuevo contenido del archivo
        const fileContent = `/**
 * SERGIO FORÉS - FOTOGRAFÍA
 * Gallery Data Structure
 * 
 * Datos generados automáticamente para la galería fotográfica personal
 * Última actualización: ${new Date().toISOString()}
 */

// Datos de la colección fotográfica
const PHOTOGRAPHY_DATA = ${JSON.stringify(galleryData, null, 4)};

/**
 * Configuración de categorías para el filtrado
 */
const CATEGORIES = {
    all: {
        name: "Todas",
        description: "Toda la colección fotográfica",
        count: () => PHOTOGRAPHY_DATA.length
    },
    portraits: {
        name: "Retratos",
        description: "Exploraciones del rostro humano y la expresión",
        count: () => PHOTOGRAPHY_DATA.filter(p => p.category === 'portraits').length
    },
    landscapes: {
        name: "Paisajes",
        description: "Geografías externas e internas",
        count: () => PHOTOGRAPHY_DATA.filter(p => p.category === 'landscapes').length
    },
    abstracts: {
        name: "Abstractas",
        description: "Forma, luz y textura como lenguaje visual",
        count: () => PHOTOGRAPHY_DATA.filter(p => p.category === 'abstracts').length
    },
    street: {
        name: "Urbanas",
        description: "La vida cotidiana en el espacio público",
        count: () => PHOTOGRAPHY_DATA.filter(p => p.category === 'street').length
    },
    experimental: {
        name: "Experimentales",
        description: "Investigación visual y procesos creativos",
        count: () => PHOTOGRAPHY_DATA.filter(p => p.category === 'experimental').length
    }
};

/**
 * Configuración de metadatos del proyecto
 */
const PROJECT_META = {
    title: "Sergio Forés • Exploración Fotográfica",
    subtitle: "Archivo Visual Personal",
    description: "Una colección de momentos significativos capturados a través del lente",
    author: "Sergio Forés",
    website: "https://sergiofores.github.io",
    created: "2023",
    updated: "${new Date().toISOString().split('T')[0]}",
    version: "1.0.0",
    totalPhotographs: () => PHOTOGRAPHY_DATA.length,
    featuredCount: () => PHOTOGRAPHY_DATA.filter(p => p.featured).length
};

/**
 * Utilidades para el manejo de datos
 */
const DataUtils = {
    /**
     * Obtiene fotografías por categoría
     */
    getByCategory: (category) => {
        if (category === 'all') return PHOTOGRAPHY_DATA;
        return PHOTOGRAPHY_DATA.filter(photo => photo.category === category);
    },

    /**
     * Obtiene fotografías destacadas
     */
    getFeatured: () => {
        return PHOTOGRAPHY_DATA.filter(photo => photo.featured);
    },

    /**
     * Busca fotografías por término
     */
    search: (term) => {
        const searchTerm = term.toLowerCase();
        return PHOTOGRAPHY_DATA.filter(photo => 
            photo.title.toLowerCase().includes(searchTerm) ||
            photo.description.toLowerCase().includes(searchTerm) ||
            photo.location.toLowerCase().includes(searchTerm) ||
            photo.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    },

    /**
     * Obtiene fotografía por ID
     */
    getById: (id) => {
        return PHOTOGRAPHY_DATA.find(photo => photo.id === id);
    },

    /**
     * Obtiene estadísticas de la colección
     */
    getStats: () => {
        const categories = {};
        PHOTOGRAPHY_DATA.forEach(photo => {
            categories[photo.category] = (categories[photo.category] || 0) + 1;
        });

        return {
            total: PHOTOGRAPHY_DATA.length,
            featured: PHOTOGRAPHY_DATA.filter(p => p.featured).length,
            categories: categories,
            dateRange: {
                earliest: PHOTOGRAPHY_DATA.reduce((min, p) => p.date < min ? p.date : min, PHOTOGRAPHY_DATA[0].date),
                latest: PHOTOGRAPHY_DATA.reduce((max, p) => p.date > max ? p.date : max, PHOTOGRAPHY_DATA[0].date)
            }
        };
    }
};

// Exportar para uso en otros módulos (si se usa como módulo ES6)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PHOTOGRAPHY_DATA,
        CATEGORIES,
        PROJECT_META,
        DataUtils
    };
}`;

        fs.writeFileSync(galleryDataPath, fileContent);
        
        console.log(`📄 Archivo actualizado: ${path.relative(this.baseDir, galleryDataPath)}`);
        console.log(`📊 ${galleryData.length} fotografías registradas en la base de datos`);
        
        // Mostrar estadísticas por categoría
        const categoryStats = {};
        galleryData.forEach(photo => {
            categoryStats[photo.category] = (categoryStats[photo.category] || 0) + 1;
        });
        
        console.log('\n📊 DISTRIBUCIÓN POR CATEGORÍAS:');
        Object.entries(categoryStats).forEach(([category, count]) => {
            console.log(`   ${category}: ${count} fotografías`);
        });
        
        const featuredCount = galleryData.filter(p => p.featured).length;
        console.log(`✨ ${featuredCount} fotografías marcadas como destacadas`);
    }
}

/**
 * Función principal
 */
async function main() {
    console.log('🎨 SERGIO FORÉS - GENERADOR DE DATOS DE GALERÍA');
    console.log('===============================================');
    
    const generator = new GalleryDataGenerator();
    const result = await generator.generate();
    
    if (result.success) {
        console.log('\n🎉 ¡Datos de galería generados exitosamente!');
        console.log(`✨ ${result.generated} fotografías registradas con metadatos completos`);
        console.log('\n🚀 La galería está lista para usar');
        process.exit(0);
    } else {
        console.error('\n💥 Error generando datos:', result.error);
        process.exit(1);
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    main();
}

module.exports = GalleryDataGenerator;