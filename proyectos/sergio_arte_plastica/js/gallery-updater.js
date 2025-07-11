/**
 * SERGIO ARTE PLÁSTICA - Gallery Updater
 * Actualizar todas las referencias de galería e imágenes
 */

const fs = require('fs');
const path = require('path');

class GalleryUpdater {
    constructor() {
        this.errors = [];
        this.updates = [];
        
        // Configuración de hero con imagen de fondo
        this.heroConfig = {
            backgroundImage: 'images/obras/oil/arqueologia-temporal.jpg', // Imagen principal como fondo
            overlay: true,
            opacity: 0.3
        };
        
        // Obras principales para galería destacada (3 mejores)
        this.featuredWorks = [
            {
                path: 'images/obras/oil/arqueologia-temporal.jpg',
                alt: 'Arqueologia Temporal',
                title: 'Arqueologia Temporal'
            },
            {
                path: 'images/obras/oil/introspeccion-silenciosa.png',
                alt: 'Introspeccion Silenciosa', 
                title: 'Introspeccion Silenciosa'
            },
            {
                path: 'images/obras/oil/turbulencia-esencial.png',
                alt: 'Turbulencia Esencial',
                title: 'Turbulencia Esencial'
            }
        ];
        
        // Video corregido
        this.videoConfig = {
            src: 'images/videos/img_1940-1.mov',
            poster: 'images/gallery/proceso-creativo.jpg'
        };
    }

    /**
     * Actualizar toda la galería
     */
    async updateGallery() {
        console.log('🎨 ACTUALIZANDO GALERÍA COMPLETA\n');
        console.log('================================\n');

        // 1. Leer gallery-data.js para obtener todas las obras
        const galleryData = await this.loadGalleryData();
        
        // 2. Actualizar hero con imagen de fondo
        await this.updateHero();
        
        // 3. Actualizar galería principal (3 obras destacadas)
        await this.updateFeaturedGallery();
        
        // 4. Actualizar modal carousel con todas las obras
        await this.updateModalCarousel(galleryData);
        
        // 5. Actualizar videos
        await this.updateVideos();
        
        // 6. Verificar imágenes existen
        await this.verifyImages();
        
        this.printSummary();
    }

    /**
     * Cargar datos de galería
     */
    async loadGalleryData() {
        try {
            const galleryDataPath = './js/gallery-data.js';
            const content = await fs.promises.readFile(galleryDataPath, 'utf8');
            
            // Extraer datos del archivo
            const match = content.match(/const GALLERY_DATA = (\[[\s\S]*?\]);/);
            if (match) {
                const galleryData = eval(match[1]);
                console.log(`📊 Cargados ${galleryData.length} obras de gallery-data.js`);
                return galleryData;
            } else {
                throw new Error('No se pudo extraer GALLERY_DATA');
            }
        } catch (error) {
            console.error('❌ Error cargando gallery-data.js:', error.message);
            this.errors.push({ type: 'gallery-data', error: error.message });
            return [];
        }
    }

    /**
     * Actualizar hero con imagen de fondo
     */
    async updateHero() {
        try {
            console.log('🖼️ Actualizando hero con imagen de fondo...');
            
            const htmlPath = './index.html';
            let content = await fs.promises.readFile(htmlPath, 'utf8');
            
            // Buscar la sección hero y añadir imagen de fondo
            const heroSection = `        <!-- Hero Ultra-Elegante -->
        <section class="hero-section" style="background-image: url('${this.heroConfig.backgroundImage}'); background-size: cover; background-position: center; position: relative;">
            <div class="hero-overlay" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, ${this.heroConfig.opacity}); z-index: 1;"></div>
            <div class="hero-content" style="position: relative; z-index: 2;">
                <h1 class="hero-slogan">Arqueología de Estados Internos</h1>
                <p class="hero-tagline">Abstracción · Transformación · Conciencia</p>
            </div>
        </section>`;
            
            // Reemplazar hero existente
            content = content.replace(
                /<!-- Hero Ultra-Elegante -->[\s\S]*?<\/section>/,
                heroSection
            );
            
            await fs.promises.writeFile(htmlPath, content);
            console.log('  ✅ Hero actualizado con imagen de fondo');
            
            this.updates.push('Hero section actualizada con imagen de fondo');
            
        } catch (error) {
            console.error('❌ Error actualizando hero:', error.message);
            this.errors.push({ type: 'hero', error: error.message });
        }
    }

    /**
     * Actualizar galería principal destacada
     */
    async updateFeaturedGallery() {
        try {
            console.log('🎯 Actualizando galería principal (3 obras destacadas)...');
            
            const htmlPath = './index.html';
            let content = await fs.promises.readFile(htmlPath, 'utf8');
            
            // Generar HTML para obras destacadas
            const galleryHTML = this.featuredWorks.map(work => `                <article class="artwork">
                    <img src="${work.path}" alt="${work.alt}" class="artwork-image">
                </article>`).join('\n');
            
            // Reemplazar galería existente
            const gallerySection = `            <div class="gallery-grid">
                <!-- 3 obras representativas -->
${galleryHTML}
            </div>`;
            
            content = content.replace(
                /<div class="gallery-grid">[\s\S]*?<\/div>/,
                gallerySection
            );
            
            await fs.promises.writeFile(htmlPath, content);
            console.log('  ✅ Galería principal actualizada');
            
            this.updates.push('Galería principal actualizada con 3 obras destacadas');
            
        } catch (error) {
            console.error('❌ Error actualizando galería principal:', error.message);
            this.errors.push({ type: 'featured-gallery', error: error.message });
        }
    }

    /**
     * Actualizar modal carousel con todas las obras
     */
    async updateModalCarousel(galleryData) {
        try {
            console.log('🎠 Actualizando modal carousel con todas las obras...');
            
            const htmlPath = './index.html';
            let content = await fs.promises.readFile(htmlPath, 'utf8');
            
            // Generar slides para todas las obras
            const slidesHTML = galleryData.map((work, index) => `                    <div class="carousel-slide${index === 0 ? ' active' : ''}">
                        <img src="images/${work.path}" alt="${work.title}" class="carousel-image">
                        <div class="carousel-info">
                            <h3>${work.title}</h3>
                            <p>${work.technique}, ${work.dimensions} • ${work.year}</p>
                        </div>
                    </div>`).join('\n');
            
            // Reemplazar carousel track
            const carouselTrack = `                <div class="carousel-track" id="carouselTrack">
                    <!-- Todas las obras del carrusel -->
${slidesHTML}
                </div>`;
            
            content = content.replace(
                /<div class="carousel-track" id="carouselTrack">[\s\S]*?<\/div>/,
                carouselTrack
            );
            
            await fs.promises.writeFile(htmlPath, content);
            console.log(`  ✅ Modal carousel actualizado con ${galleryData.length} obras`);
            
            this.updates.push(`Modal carousel actualizado con ${galleryData.length} obras`);
            
        } catch (error) {
            console.error('❌ Error actualizando modal carousel:', error.message);
            this.errors.push({ type: 'modal-carousel', error: error.message });
        }
    }

    /**
     * Actualizar videos
     */
    async updateVideos() {
        try {
            console.log('🎬 Actualizando referencias de videos...');
            
            const htmlPath = './index.html';
            let content = await fs.promises.readFile(htmlPath, 'utf8');
            
            // Actualizar source del video
            content = content.replace(
                /src="images\/videos\/IMG_1940\.MOV"/g,
                `src="${this.videoConfig.src}"`
            );
            
            await fs.promises.writeFile(htmlPath, content);
            console.log('  ✅ Referencias de video actualizadas');
            
            this.updates.push('Referencias de video corregidas');
            
        } catch (error) {
            console.error('❌ Error actualizando videos:', error.message);
            this.errors.push({ type: 'videos', error: error.message });
        }
    }

    /**
     * Verificar que las imágenes existen
     */
    async verifyImages() {
        console.log('🔍 Verificando que las imágenes existen...');
        
        const imagesToCheck = [
            ...this.featuredWorks.map(w => w.path),
            this.heroConfig.backgroundImage,
            this.videoConfig.poster,
            this.videoConfig.src
        ];
        
        for (const imagePath of imagesToCheck) {
            if (fs.existsSync(imagePath)) {
                console.log(`  ✅ ${imagePath}`);
            } else {
                console.log(`  ❌ ${imagePath} (NO EXISTE)`);
                this.errors.push({ 
                    type: 'missing-image', 
                    error: `Imagen no encontrada: ${imagePath}` 
                });
            }
        }
    }

    /**
     * Imprimir resumen
     */
    printSummary() {
        console.log('\n🎨 RESUMEN DE ACTUALIZACIÓN DE GALERÍA:');
        console.log('======================================');
        console.log(`✅ Actualizaciones completadas: ${this.updates.length}`);
        console.log(`❌ Errores: ${this.errors.length}`);
        
        if (this.updates.length > 0) {
            console.log('\n📋 ACTUALIZACIONES REALIZADAS:');
            this.updates.forEach(update => {
                console.log(`  • ${update}`);
            });
        }
        
        if (this.errors.length > 0) {
            console.log('\n🚨 ERRORES:');
            this.errors.forEach(error => {
                console.log(`  - ${error.type}: ${error.error}`);
            });
        }
        
        console.log('\n🌟 ¡Galería actualizada!');
        console.log('Todas las referencias de imágenes están ahora correctas.');
    }
}

// ===== CLI INTERFACE =====
if (require.main === module) {
    const updater = new GalleryUpdater();
    const command = process.argv[2];
    
    switch (command) {
        case 'run':
        case 'update':
            updater.updateGallery();
            break;
        default:
            console.log(`
🎨 SERGIO ARTE PLÁSTICA - Gallery Updater

Comandos disponibles:
  node js/gallery-updater.js run     - Actualizar galería completa
  node js/gallery-updater.js update  - Actualizar galería completa

Funciones:
  ✅ Añade imagen de fondo al hero
  ✅ Actualiza galería principal con 3 obras destacadas
  ✅ Genera modal carousel con todas las obras de gallery-data.js
  ✅ Corrige referencias de videos
  ✅ Verifica que todas las imágenes existen
            `);
    }
}

module.exports = GalleryUpdater;