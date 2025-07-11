/**
 * SERGIO ARTE PLÁSTICA - Gallery Scanner
 * Script simplificado para generar datos de galería
 */

const fs = require('fs');
const path = require('path');

class GalleryScanner {
    constructor() {
        this.artworks = [];
        this.categories = {
            'oil': 'Óleo sobre lino belga',
            'ink': 'Tinta sobre papel japonés',
            '3dprinting': 'Impresión 3D',
            'drawing': 'Dibujo y bocetos'
        };
    }

    async scanAllArtworks() {
        console.log('🖼️ Escaneando galería de obras...\n');
        
        const scannedFiles = new Set(); // Evitar duplicados

        // Escanear solo subdirectorios organizados
        for (const category of Object.keys(this.categories)) {
            const categoryPath = `./images/obras/${category}`;
            if (fs.existsSync(categoryPath)) {
                await this.scanDirectory(categoryPath, category, scannedFiles);
            }
        }

        // Si no hay subdirectorios, escanear directorio principal
        if (this.artworks.length === 0) {
            await this.scanDirectory('./images/obras', 'oil', scannedFiles);
        }

        // Ordenar por categoría y luego por nombre
        this.artworks.sort((a, b) => {
            if (a.category !== b.category) {
                return a.category.localeCompare(b.category);
            }
            return a.title.localeCompare(b.title);
        });

        console.log(`✅ Total obras únicas encontradas: ${this.artworks.length}\n`);
        return this.artworks;
    }

    async scanDirectory(dirPath, category = 'oil', scannedFiles = new Set()) {
        try {
            const files = fs.readdirSync(dirPath);
            const imageFiles = files.filter(file => 
                ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file).toLowerCase())
            );

            console.log(`📁 ${dirPath}: ${imageFiles.length} imágenes`);

            for (const filename of imageFiles) {
                // Evitar duplicados por nombre de archivo
                if (!scannedFiles.has(filename.toLowerCase())) {
                    const artwork = this.createArtworkData(filename, dirPath, category);
                    this.artworks.push(artwork);
                    scannedFiles.add(filename.toLowerCase());
                    console.log(`  • ${artwork.title}`);
                }
            }
        } catch (error) {
            console.log(`❌ Error escaneando ${dirPath}: ${error.message}`);
        }
    }

    createArtworkData(filename, dirPath, category) {
        const name = path.parse(filename).name;
        const relativePath = path.relative('./images', path.join(dirPath, filename)).replace(/\\/g, '/');
        
        return {
            id: name.toLowerCase().replace(/[^a-z0-9]/g, ''),
            filename: filename,
            path: relativePath,
            title: this.generateTitle(name),
            technique: this.categories[category] || this.categories.oil,
            year: this.extractYear(name),
            dimensions: this.generateDimensions(category),
            category: category
        };
    }

    generateTitle(name) {
        // Mapeo específico para títulos más elegantes
        const titleMap = {
            'cuadroarenaoxido': 'Cuadro Arena Óxido',
            'autoocultamiento': 'Autoocultamiento',
            'beraja': 'Beraja',
            'proceso3': 'Proceso III',
            'proceso2': 'Proceso II',
            'luz2': 'Luz II',
            'tres1': 'Tres I',
            'shejina': 'Shejina',
            'menteacusticaliteral1': 'Mente Acústica Literal I',
            '2911a': 'Composición 2911',
            '291224a': 'Composición 291224'
        };

        const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
        
        if (titleMap[cleanName]) {
            return titleMap[cleanName];
        }

        // Convertir nombre de archivo a título elegante
        return name
            .replace(/^(oleo|tinta|escultura|dibujo)[-_]/i, '')
            .replace(/img[-_]?/i, 'Composición ')
            .split(/[-_]/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    extractYear(name) {
        const yearMatch = name.match(/20\d{2}/);
        return yearMatch ? parseInt(yearMatch[0]) : 2024;
    }

    generateDimensions(category) {
        const dimensionsByCategory = {
            'oil': '120 × 90 cm',
            'ink': '70 × 50 cm', 
            '3dprinting': '15 × 15 × 20 cm',
            'drawing': '50 × 70 cm'
        };
        return dimensionsByCategory[category] || '100 × 80 cm';
    }

    async generateGalleryFiles() {
        const galleryData = await this.scanAllArtworks();

        // Generar archivo JavaScript
        const jsContent = `/**
 * SERGIO ARTE PLÁSTICA - Gallery Data
 * Generado automáticamente
 */

const GALLERY_DATA = ${JSON.stringify(galleryData, null, 2)};

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GALLERY_DATA;
}

// Disponible globalmente en el navegador
if (typeof window !== 'undefined') {
    window.GALLERY_DATA = GALLERY_DATA;
}`;

        await fs.promises.writeFile('./js/gallery-data.js', jsContent);
        console.log('✅ Archivo gallery-data.js generado');

        // Generar archivo JSON
        const jsonData = {
            metadata: {
                generated: new Date().toISOString(),
                totalArtworks: galleryData.length,
                categories: this.getCategoryCounts(galleryData)
            },
            artworks: galleryData
        };

        await fs.promises.writeFile('./gallery-data.json', JSON.stringify(jsonData, null, 2));
        console.log('✅ Archivo gallery-data.json generado');

        // Generar fragmentos HTML
        await this.generateHTMLFragments(galleryData);

        return galleryData;
    }

    getCategoryCounts(artworks) {
        const counts = {};
        artworks.forEach(artwork => {
            counts[artwork.technique] = (counts[artwork.technique] || 0) + 1;
        });
        return counts;
    }

    async generateHTMLFragments(galleryData) {
        // Seleccionar 3 obras destacadas - las más representativas del trabajo
        const featuredIds = ['cuadroarenaoxido', 'autoocultamiento', 'beraja'];
        const featuredArtworks = featuredIds.map(id => 
            galleryData.find(art => art.id === id)
        ).filter(Boolean);
        
        // Si no encontramos las específicas, tomar las primeras 3 óleos
        if (featuredArtworks.length < 3) {
            const oilWorks = galleryData.filter(art => art.category === 'oil').slice(0, 3);
            featuredArtworks.push(...oilWorks.slice(featuredArtworks.length));
        }
        
        // HTML para galería principal
        const galleryHTML = featuredArtworks.map(artwork => `
                <article class="artwork">
                    <img src="images/${artwork.path}" alt="${artwork.title}" class="artwork-image">
                </article>`).join('');

        // HTML para modal con todas las obras
        const modalHTML = galleryData.map((artwork, index) => `
                    <div class="carousel-slide${index === 0 ? ' active' : ''}">
                        <img src="images/${artwork.path}" alt="${artwork.title}" class="carousel-image">
                        <div class="carousel-info">
                            <h3>${artwork.title}</h3>
                            <p>${artwork.technique}, ${artwork.dimensions} • ${artwork.year}</p>
                        </div>
                    </div>`).join('');

        const fragments = `<!-- GALERÍA PRINCIPAL (3 obras destacadas) -->
<div class="gallery-grid">
${galleryHTML}
</div>

<!-- MODAL CAROUSEL (todas las obras: ${galleryData.length}) -->
<div class="carousel-track" id="carouselTrack">
${modalHTML}
</div>

<!-- SCRIPT DE DATOS -->
<script>
// Datos de galería disponibles globalmente
window.GALLERY_DATA = ${JSON.stringify(galleryData, null, 2)};

// Generar indicadores dinámicamente
document.addEventListener('DOMContentLoaded', function() {
    const indicatorsContainer = document.getElementById('carouselIndicators');
    if (indicatorsContainer) {
        indicatorsContainer.innerHTML = '';
        for (let i = 0; i < ${galleryData.length}; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator' + (i === 0 ? ' active' : '');
            indicator.setAttribute('data-slide', i);
            indicatorsContainer.appendChild(indicator);
        }
    }
});
</script>`;

        await fs.promises.writeFile('./gallery-fragments.html', fragments);
        console.log('✅ Fragmentos HTML generados');
        console.log(`📊 Galería: ${featuredArtworks.length} obras destacadas`);
        console.log(`📊 Modal: ${galleryData.length} obras totales`);
    }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
    const scanner = new GalleryScanner();
    scanner.generateGalleryFiles().then(() => {
        console.log('\n🎨 ¡Datos de galería generados exitosamente!');
        console.log('\n📁 Archivos creados:');
        console.log('  • js/gallery-data.js');
        console.log('  • gallery-data.json');
        console.log('  • gallery-fragments.html');
        console.log('\n🔗 Próximo paso: Integrar fragmentos en index.html');
    }).catch(error => {
        console.error('❌ Error:', error.message);
    });
}

module.exports = GalleryScanner;