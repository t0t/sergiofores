// Año dinámico
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Generar carousel dinámicamente con todas las obras
document.addEventListener('DOMContentLoaded', function() {
    if (typeof GALLERY_DATA !== 'undefined') {
        const carouselTrack = document.getElementById('carouselTrack');
        
        if (carouselTrack && GALLERY_DATA.length > 0) {
            // Limpiar contenido existente
            carouselTrack.innerHTML = '';
            
            // Hacer GALLERY_DATA disponible globalmente
            window.GALLERY_DATA = GALLERY_DATA;
            
            // Generar slides
            GALLERY_DATA.forEach((artwork, index) => {
                const slide = document.createElement('div');
                slide.className = 'carousel-slide' + (index === 0 ? ' active' : '');
                slide.innerHTML = `
                    <img src="images/${artwork.path}" alt="${artwork.title}" class="carousel-image">
                    <div class="carousel-info">
                        <h3>${artwork.title}</h3>
                        <p>${artwork.technique}, ${artwork.dimensions} • ${artwork.year}</p>
                    </div>
                `;
                carouselTrack.appendChild(slide);
            });
            
            console.log(`✅ Galería cargada: ${GALLERY_DATA.length} obras`);
            
            // Notificar que el carousel está listo
            window.dispatchEvent(new CustomEvent('carouselReady', { 
                detail: { slideCount: GALLERY_DATA.length } 
            }));
        }
    }
});