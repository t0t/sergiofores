let slideIndex = 1;
let currentVideo = null;

function openLightbox() {
    document.getElementById('lightbox').style.display = 'block';
    document.body.style.overflow = 'hidden';
    showSlides(slideIndex);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Pausar todos los videos al cerrar
    const videos = lightbox.getElementsByTagName('video');
    Array.from(videos).forEach(video => {
        video.pause();
    });
}

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function toSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName('slide');
    
    // Validar índice
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    // Pausar video actual si existe
    if (currentVideo) {
        currentVideo.pause();
    }

    // Ocultar todas las slides
    Array.from(slides).forEach(slide => {
        slide.style.display = 'none';
    });

    // Mostrar y preparar la slide actual
    const currentSlide = slides[slideIndex - 1];
    currentSlide.style.display = 'block';

    // Manejar video en la slide actual
    currentVideo = currentSlide.querySelector('video');
    if (currentVideo) {
        // Asegurarse de que el video esté cargado
        if (currentVideo.readyState === 0) {
            currentVideo.load();
        }
        
        // Actualizar controles y atributos
        currentVideo.controls = true;
        currentVideo.style.maxWidth = '100%';
        currentVideo.style.height = 'auto';
    }

    // Actualizar descripción
    updateDescription(slideIndex);
}

function updateDescription(index) {
    const currentSlide = document.getElementsByClassName('slide')[index - 1];
    const video = currentSlide.querySelector('video');
    
    if (video) {
        const title = video.getAttribute('data-title') || '';
        const description = video.getAttribute('data-description') || '';
        
        const descriptionContainer = currentSlide.querySelector('.video-description');
        if (descriptionContainer) {
            descriptionContainer.innerHTML = `
                <h3>${title}</h3>
                <p>${description}</p>
            `;
        }
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');

    // Cerrar con Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });

    // Navegación con flechas
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                changeSlide(-1);
            } else if (e.key === 'ArrowRight') {
                changeSlide(1);
            }
        }
    });

    // Cerrar al hacer click fuera
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Prevenir cierre al hacer click en el contenido
    const modalContent = lightbox.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});
