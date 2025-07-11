/**
 * SERGIO FORÉS - FOTOGRAFÍA
 * Final Visual Update - Descripciones Auténticas Completas
 * 
 * Actualización final con descripciones reales basadas en análisis visual directo
 */

const fs = require('fs');
const path = require('path');

class FinalVisualUpdate {
    constructor() {
        this.baseDir = path.dirname(__dirname);
        this.galleryDataPath = path.join(this.baseDir, 'js', 'gallery-data.js');
        
        // Descripciones completamente reales basadas en análisis visual directo
        this.realDescriptions = {
            'flujo-humano': {
                description: "Una cubitera de hielo transparente sostenida contra el cielo, con los cubos parcialmente derretidos creando formas orgánicas dentro del molde rectangular. Un estudio de transformación material donde el hielo se convierte en escultura efímera entre los dedos.",
                category: 'abstracts',
                tags: ['hielo', 'transformación', 'transparencia', 'formas orgánicas', 'efímero']
            },
            
            'simultaneidad-pura': {
                description: "Un niño de espaldas, sentado en posición contemplativa sobre un lecho de piedras blancas junto a un arroyo. La camiseta a rayas y la luz dorada del atardecer filtrada entre los árboles crean una atmósfera de paz infantil en conexión directa con la naturaleza.",
                category: 'portraits',
                tags: ['infancia', 'naturaleza', 'contemplación', 'arroyo', 'luz dorada', 'piedras']
            },
            
            'logos-fotografico': {
                description: "Una pequeña figura con chaqueta oscura camina hacia el mar en una playa al atardecer. Las olas suaves llegan a la orilla mientras el cielo se tiñe de colores cálidos. Un momento de soledad contemplativa frente a la inmensidad del océano, con huellas en la arena húmeda que marcan el tránsito.",
                category: 'landscapes',
                tags: ['playa', 'atardecer', 'soledad', 'océano', 'huellas', 'contemplación']
            },
            
            'campo-infinito': {
                description: "Una figura sentada tras los barrotes de una silla de madera blanca, como si explorara el espacio liminal entre la contención y la libertad. La luz natural crea un diálogo íntimo con las sombras, mientras las manos sostienen un dispositivo que conecta con mundos invisibles.",
                category: 'portraits',
                tags: ['intimidad', 'luz natural', 'espacios liminales', 'tecnología', 'contemplación']
            },
            
            'dialogo-silencioso': {
                description: "Un niño pequeño en camiseta a rayas absorto en la lectura sobre una superficie de madera. Un pato de goma amarillo reposa en el suelo, testigo silencioso de este momento de concentración pura. La luz lateral revela la textura del papel floral que decora el fondo.",
                category: 'portraits',
                tags: ['infancia', 'lectura', 'concentración', 'luz natural', 'objetos cotidianos']
            },
            
            'quantum-fotografico': {
                description: "Una composición en blanco y negro que captura a una figura agachada en la arena junto al mar, con su sombra proyectándose como un segundo personaje en la escena. Las huellas en la arena crean un patrón temporal que habla del paso y la permanencia.",
                category: 'abstracts',
                tags: ['sombras', 'arena', 'mar', 'blanco y negro', 'temporalidad']
            },
            
            'momento-decisivo-1': {
                description: "Un niño de espaldas juega al fútbol en un patio urbano, con su sombra definida proyectándose sobre el suelo de cemento. El momento captura la espontaneidad del juego infantil en el espacio público, con elementos geométricos que estructuran la composición.",
                category: 'street',
                tags: ['infancia', 'juego', 'fútbol', 'sombras', 'espacio urbano']
            },
            
            'expresion-autentica': {
                description: "Una mano sostiene un pequeño avión de madera contra un cielo cálido y suave. El gesto evoca sueños de vuelo y libertad, mientras la luz dorada envuelve tanto la mano como el objeto en una atmósfera de posibilidad infinita.",
                category: 'experimental',
                tags: ['manos', 'avión', 'cielo', 'sueños', 'libertad', 'luz dorada']
            }
        };
    }

    /**
     * Actualiza con las descripciones finales y auténticas
     */
    async updateFinalDescriptions() {
        console.log('🎯 Aplicando actualización final con descripciones auténticas...');
        
        try {
            // Leer archivo actual
            const currentContent = fs.readFileSync(this.galleryDataPath, 'utf8');
            
            // Extraer PHOTOGRAPHY_DATA
            const dataMatch = currentContent.match(/const PHOTOGRAPHY_DATA = (\[[\s\S]*?\]);/);
            if (!dataMatch) {
                throw new Error('No se pudo encontrar PHOTOGRAPHY_DATA');
            }
            
            const photographyData = JSON.parse(dataMatch[1]);
            
            // Actualizar con descripciones reales
            const finalData = photographyData.map(photo => {
                const realData = this.realDescriptions[photo.id];
                
                if (realData) {
                    return {
                        ...photo,
                        description: realData.description,
                        category: realData.category,
                        tags: realData.tags
                    };
                }
                
                return photo;
            });
            
            // Escribir archivo final
            this.writeFinalGalleryData(finalData);
            
            console.log('✅ Descripciones finales aplicadas exitosamente');
            return {
                success: true,
                updated: Object.keys(this.realDescriptions).length
            };
            
        } catch (error) {
            console.error('❌ Error en actualización final:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Escribe el archivo final de gallery-data.js
     */
    writeFinalGalleryData(photographyData) {
        // Estadísticas actualizadas
        const categoryStats = {};
        photographyData.forEach(photo => {
            categoryStats[photo.category] = (categoryStats[photo.category] || 0) + 1;
        });
        
        const fileContent = `/**
 * SERGIO FORÉS - FOTOGRAFÍA
 * Gallery Data Structure
 * 
 * Datos finales con descripciones auténticas basadas en análisis visual directo
 * Cada descripción refleja exactamente lo que muestra la fotografía
 * Última actualización: ${new Date().toISOString()}
 */

// Datos de la colección fotográfica
const PHOTOGRAPHY_DATA = ${JSON.stringify(photographyData, null, 4)};

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
        description: "Exploraciones del rostro humano y momentos íntimos",
        count: () => PHOTOGRAPHY_DATA.filter(p => p.category === 'portraits').length
    },
    landscapes: {
        name: "Paisajes",
        description: "Geografías externas y encuentros con la naturaleza",
        count: () => PHOTOGRAPHY_DATA.filter(p => p.category === 'landscapes').length
    },
    abstracts: {
        name: "Abstractas",
        description: "Forma, luz, textura y composiciones conceptuales",
        count: () => PHOTOGRAPHY_DATA.filter(p => p.category === 'abstracts').length
    },
    street: {
        name: "Urbanas",
        description: "La vida cotidiana y el espacio público",
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
    description: "Una colección de momentos significativos capturados a través del lente, con descripciones auténticas que reflejan exactamente lo que muestran las imágenes",
    author: "Sergio Forés",
    website: "https://sergiofores.github.io",
    created: "2023",
    updated: "${new Date().toISOString().split('T')[0]}",
    version: "2.0.0",
    totalPhotographs: () => PHOTOGRAPHY_DATA.length,
    featuredCount: () => PHOTOGRAPHY_DATA.filter(p => p.featured).length,
    categoriesDistribution: ${JSON.stringify(categoryStats, null, 8)}
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
    },

    /**
     * Obtiene fotografías por tags
     */
    getByTags: (tags) => {
        const searchTags = Array.isArray(tags) ? tags : [tags];
        return PHOTOGRAPHY_DATA.filter(photo =>
            searchTags.some(tag => 
                photo.tags.some(photoTag => 
                    photoTag.toLowerCase().includes(tag.toLowerCase())
                )
            )
        );
    },

    /**
     * Obtiene tags únicos de toda la colección
     */
    getAllTags: () => {
        const allTags = new Set();
        PHOTOGRAPHY_DATA.forEach(photo => {
            photo.tags.forEach(tag => allTags.add(tag));
        });
        return Array.from(allTags).sort();
    }
};

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PHOTOGRAPHY_DATA,
        CATEGORIES,
        PROJECT_META,
        DataUtils
    };
}`;

        fs.writeFileSync(this.galleryDataPath, fileContent);
        
        console.log(`📄 Archivo finalizado: ${path.relative(this.baseDir, this.galleryDataPath)}`);
        console.log(`🎯 ${Object.keys(this.realDescriptions).length} fotografías con descripciones auténticas`);
        
        // Mostrar estadísticas finales
        console.log('\n📊 DISTRIBUCIÓN FINAL POR CATEGORÍAS:');
        Object.entries(categoryStats).forEach(([category, count]) => {
            console.log(`   ${category}: ${count} fotografías`);
        });
        
        console.log('\n✨ FOTOGRAFÍAS CON DESCRIPCIONES AUTÉNTICAS:');
        Object.keys(this.realDescriptions).forEach(id => {
            const title = id.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
            console.log(`   📸 ${title}`);
        });
    }
}

/**
 * Función principal
 */
async function main() {
    console.log('🎨 SERGIO FORÉS - ACTUALIZACIÓN FINAL DE DESCRIPCIONES');
    console.log('====================================================');
    
    const updater = new FinalVisualUpdate();
    const result = await updater.updateFinalDescriptions();
    
    if (result.success) {
        console.log('\n🎉 ¡Galería finalizada con descripciones auténticas!');
        console.log(`✨ ${result.updated} fotografías tienen descripciones que reflejan exactamente su contenido`);
        console.log('\n🚀 La galería está lista para una experiencia auténtica');
        console.log('📱 Abre index.html en tu navegador para ver el resultado');
        process.exit(0);
    } else {
        console.error('\n💥 Error en la finalización:', result.error);
        process.exit(1);
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    main();
}

module.exports = FinalVisualUpdate;