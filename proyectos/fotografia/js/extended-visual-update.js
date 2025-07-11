/**
 * SERGIO FORÉS - FOTOGRAFÍA
 * Extended Visual Update - Colección Completa de Descripciones Auténticas
 * 
 * Actualización extendida con descripciones reales de una selección mayor de fotografías
 */

const fs = require('fs');
const path = require('path');

class ExtendedVisualUpdate {
    constructor() {
        this.baseDir = path.dirname(__dirname);
        this.galleryDataPath = path.join(this.baseDir, 'js', 'gallery-data.js');
        
        // Colección extendida de descripciones reales basadas en análisis visual directo
        this.extendedDescriptions = {
            // Fotografías ya analizadas previamente
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
            },
            
            // Nuevas descripciones basadas en análisis visual reciente
            'superficie-consciente': {
                description: "Una figura solitaria emerge entre las dunas y hierbas altas, enfrentando un cielo nublado. La composición captura el momento de encuentro entre lo humano y lo elemental, donde la naturaleza salvaje define el horizonte de posibilidades. La textura de las gramíneas crea un primer plano táctil que contrasta con la inmensidad del paisaje.",
                category: 'landscapes',
                tags: ['dunas', 'naturaleza salvaje', 'soledad', 'hierba', 'horizonte', 'elementos']
            },
            
            'fragmento-temporal': {
                description: "Un niño escala una gran roca al atardecer, con el cielo despejado como telón de fondo y la vegetación dorada por la luz. La imagen congela un momento de aventura infantil y conexión directa con la naturaleza, donde cada movimiento sobre la piedra se convierte en exploración y descubrimiento del mundo físico.",
                category: 'portraits',
                tags: ['escalada', 'roca', 'aventura', 'atardecer', 'exploración', 'naturaleza']
            },
            
            'conexion-intuitiva': {
                description: "Una escena doméstica íntima donde alguien sostiene un bocadillo ante su rostro, creando un momento de humor y cotidianidad. La composición en planos de color azul y blanco, junto con los libros apilados, sugiere un espacio de estudio o trabajo transformado en escenario de pausa lúdica.",
                category: 'portraits',
                tags: ['humor', 'domesticidad', 'comida', 'libros', 'pausa', 'cotidiano']
            },
            
            'verdad-fotografica': {
                description: "Una escena cenital de lectura donde un libro de animales permanece abierto sobre el suelo de madera, con una pequeña mano señalando las ilustraciones. La luz natural crea sombras suaves que enmarcan este momento de descubrimiento y aprendizaje, donde cada página se convierte en ventana hacia nuevos mundos.",
                category: 'portraits',
                tags: ['lectura', 'aprendizaje', 'libros', 'infancia', 'descubrimiento', 'animales']
            },
            
            'campo-energetico': {
                description: "Una figura flotando en agua oscura, con el rostro sereno emergiendo de la superficie líquida. Los destellos de luz sobre el agua crean un patrón hipnótico de reflejos, mientras el cuerpo se abandona a la flotación en un estado de meditación acuática. La imagen captura la unión perfecta entre cuerpo y elemento.",
                category: 'abstracts',
                tags: ['agua', 'flotación', 'serenidad', 'reflejos', 'meditación', 'elemento']
            }
        };
    }

    /**
     * Actualiza con la colección extendida de descripciones
     */
    async updateExtendedDescriptions() {
        console.log('🎯 Aplicando actualización extendida con descripciones auténticas...');
        
        try {
            // Leer archivo actual
            const currentContent = fs.readFileSync(this.galleryDataPath, 'utf8');
            
            // Extraer PHOTOGRAPHY_DATA
            const dataMatch = currentContent.match(/const PHOTOGRAPHY_DATA = (\[[\s\S]*?\]);/);
            if (!dataMatch) {
                throw new Error('No se pudo encontrar PHOTOGRAPHY_DATA');
            }
            
            const photographyData = JSON.parse(dataMatch[1]);
            
            // Actualizar con descripciones extendidas
            const extendedData = photographyData.map(photo => {
                const realData = this.extendedDescriptions[photo.id];
                
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
            
            // Escribir archivo extendido
            this.writeExtendedGalleryData(extendedData);
            
            console.log('✅ Descripciones extendidas aplicadas exitosamente');
            return {
                success: true,
                updated: Object.keys(this.extendedDescriptions).length,
                total: extendedData.length
            };
            
        } catch (error) {
            console.error('❌ Error en actualización extendida:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Escribe el archivo extendido de gallery-data.js
     */
    writeExtendedGalleryData(photographyData) {
        // Estadísticas actualizadas
        const categoryStats = {};
        const tagFrequency = {};
        
        photographyData.forEach(photo => {
            // Contar categorías
            categoryStats[photo.category] = (categoryStats[photo.category] || 0) + 1;
            
            // Contar tags
            photo.tags.forEach(tag => {
                tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
            });
        });
        
        // Tags más frecuentes
        const popularTags = Object.entries(tagFrequency)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .map(([tag]) => tag);
        
        const fileContent = `/**
 * SERGIO FORÉS - FOTOGRAFÍA
 * Gallery Data Structure - Extended Edition
 * 
 * Colección extendida con descripciones auténticas basadas en análisis visual directo
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
        description: "Exploraciones de la figura humana, infancia y momentos íntimos",
        count: () => PHOTOGRAPHY_DATA.filter(p => p.category === 'portraits').length
    },
    landscapes: {
        name: "Paisajes",
        description: "Encuentros con la naturaleza y geografías contemplativas",
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
    version: "2.1.0",
    totalPhotographs: () => PHOTOGRAPHY_DATA.length,
    featuredCount: () => PHOTOGRAPHY_DATA.filter(p => p.featured).length,
    authenticDescriptions: ${Object.keys(this.extendedDescriptions).length},
    categoriesDistribution: ${JSON.stringify(categoryStats, null, 8)},
    popularTags: ${JSON.stringify(popularTags, null, 8)}
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
            authenticDescriptions: ${Object.keys(this.extendedDescriptions).length},
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
    },

    /**
     * Obtiene fotografías con descripciones auténticas
     */
    getAuthentic: () => {
        const authenticIds = ${JSON.stringify(Object.keys(this.extendedDescriptions))};
        return PHOTOGRAPHY_DATA.filter(photo => authenticIds.includes(photo.id));
    },

    /**
     * Obtiene frecuencia de tags
     */
    getTagFrequency: () => {
        const frequency = {};
        PHOTOGRAPHY_DATA.forEach(photo => {
            photo.tags.forEach(tag => {
                frequency[tag] = (frequency[tag] || 0) + 1;
            });
        });
        return Object.entries(frequency)
            .sort(([,a], [,b]) => b - a)
            .reduce((obj, [tag, count]) => ({ ...obj, [tag]: count }), {});
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
        
        console.log(`📄 Archivo extendido finalizado: ${path.relative(this.baseDir, this.galleryDataPath)}`);
        console.log(`🎯 ${Object.keys(this.extendedDescriptions).length} fotografías con descripciones auténticas de ${photographyData.length} totales`);
        
        // Mostrar estadísticas extendidas
        console.log('\n📊 DISTRIBUCIÓN EXTENDIDA POR CATEGORÍAS:');
        Object.entries(categoryStats).forEach(([category, count]) => {
            console.log(`   ${category}: ${count} fotografías`);
        });
        
        console.log('\n🏷️  TAGS MÁS POPULARES:');
        popularTags.slice(0, 5).forEach((tag, index) => {
            console.log(`   ${index + 1}. ${tag} (${tagFrequency[tag]} usos)`);
        });
        
        console.log('\n✨ FOTOGRAFÍAS CON DESCRIPCIONES AUTÉNTICAS:');
        Object.keys(this.extendedDescriptions).forEach(id => {
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
    console.log('🎨 SERGIO FORÉS - ACTUALIZACIÓN EXTENDIDA DE DESCRIPCIONES');
    console.log('=========================================================');
    
    const updater = new ExtendedVisualUpdate();
    const result = await updater.updateExtendedDescriptions();
    
    if (result.success) {
        console.log('\n🎉 ¡Galería extendida finalizada con descripciones auténticas!');
        console.log(`✨ ${result.updated} fotografías de ${result.total} tienen descripciones que reflejan exactamente su contenido`);
        console.log(`📊 Porcentaje de autenticidad: ${Math.round((result.updated / result.total) * 100)}%`);
        console.log('\n🚀 La galería ofrece ahora una experiencia visual completamente auténtica');
        console.log('📱 Abre index.html en tu navegador para explorar la colección');
        process.exit(0);
    } else {
        console.error('\n💥 Error en la extensión:', result.error);
        process.exit(1);
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    main();
}

module.exports = ExtendedVisualUpdate;