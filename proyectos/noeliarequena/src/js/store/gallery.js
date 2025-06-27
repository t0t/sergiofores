import { Store } from '../modules/Store.js';

// Action Types
export const SET_IMAGES = 'gallery/setImages';
export const SET_CURRENT_IMAGE = 'gallery/setCurrentImage';
export const SET_FILTER = 'gallery/setFilter';
export const TOGGLE_LIGHTBOX = 'gallery/toggleLightbox';

// Action Creators
export const setImages = Store.createAction(SET_IMAGES);
export const setCurrentImage = Store.createAction(SET_CURRENT_IMAGE);
export const setFilter = Store.createAction(SET_FILTER);
export const toggleLightbox = Store.createAction(TOGGLE_LIGHTBOX);

// Async Actions
export const loadImages = Store.createAsyncAction(
    'gallery/loadImages',
    async () => {
        // Simulated API call
        return [
            {
                id: 1,
                src: '../images/obras/artwork1.jpg',
                title: 'Artwork 1',
                alt: 'Óleo sobre lienzo de una figura femenina sentada, con un dramático juego de luces y sombras estilo claroscuro.',
                category: 'painting',
                width: 1200,
                height: 800
            },
            {
                id: 2,
                src: '../images/obras/artwork2.jpg',
                title: 'Artwork 2',
                alt: 'Escultura de un torso femenino reclinado, capturando la tensión y la calma del cuerpo.',
                category: 'sculpture',
                width: 800,
                height: 1200
            },
            {
                id: 3,
                src: '../images/obras/artwork3.jpg',
                title: 'Artwork 3',
                alt: 'Pintura al óleo de un cuerpo de mujer tumbado, donde la luz resalta la textura de la piel sobre un fondo oscuro.',
                category: 'painting',
                width: 1200,
                height: 800
            },
            {
                id: 4,
                src: '../images/obras/artwork4.jpg',
                title: 'Artwork 4',
                alt: 'Técnica mixta que representa una silueta femenina en reposo, con un fuerte contraste de claroscuro que define las formas.',
                category: 'mixed',
                width: 800,
                height: 1200
            }
        ];
    }
);

// Initial State
const initialState = {
    images: [],
    currentImage: null,
    filter: 'all',
    lightboxOpen: false,
    loading: false,
    error: null
};

// Reducer
export const galleryReducer = Store.createReducer(initialState, {
    [SET_IMAGES]: (state, action) => ({
        ...state,
        images: action.payload
    }),
    [SET_CURRENT_IMAGE]: (state, action) => ({
        ...state,
        currentImage: action.payload
    }),
    [SET_FILTER]: (state, action) => ({
        ...state,
        filter: action.payload
    }),
    [TOGGLE_LIGHTBOX]: (state) => ({
        ...state,
        lightboxOpen: !state.lightboxOpen
    }),
    [loadImages.request]: (state) => ({
        ...state,
        loading: true,
        error: null
    }),
    [loadImages.success]: (state, action) => ({
        ...state,
        loading: false,
        images: action.payload
    }),
    [loadImages.failure]: (state, action) => ({
        ...state,
        loading: false,
        error: action.payload
    })
});

// Selectors
export const selectImages = state => state.gallery.images;
export const selectCurrentImage = state => state.gallery.currentImage;
export const selectFilter = state => state.gallery.filter;
export const selectLightboxOpen = state => state.gallery.lightboxOpen;
export const selectLoading = state => state.gallery.loading;
export const selectError = state => state.gallery.error;

// Complex selectors
export const selectFilteredImages = Store.createSelector(
    selectImages,
    selectFilter,
    (images, filter) => filter === 'all' ? 
        images : 
        images.filter(img => img.category === filter)
);

export class GalleryStore {
    static instance = null;

    constructor() {
        if (GalleryStore.instance) {
            return GalleryStore.instance;
        }
        GalleryStore.instance = this;
        
        this.currentIndex = 0;
        this.isOpen = false;
        this.items = [];
        this.onChangeCallbacks = [];
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;
    }

    static getInstance() {
        if (!GalleryStore.instance) {
            GalleryStore.instance = new GalleryStore();
        }
        return GalleryStore.instance;
    }

    setItems(items) {
        this.items = items.map((item, index) => ({
            id: index + 1,
            src: item.src,
            title: item.title || `Obra ${index + 1}`,
            description: item.description || 'Descripción de la obra.',
            width: item.width || 800,
            height: item.height || 600
        }));
        this.notifyChange();
    }

    handleTouchStart = (e) => {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
    }

    handleTouchMove = (e) => {
        e.preventDefault(); // Prevenir scroll mientras se desliza
    }

    handleTouchEnd = (e) => {
        this.touchEndX = e.changedTouches[0].clientX;
        this.touchEndY = e.changedTouches[0].clientY;

        const deltaX = this.touchEndX - this.touchStartX;
        const deltaY = this.touchEndY - this.touchStartY;

        // Solo procesar si el deslizamiento es más horizontal que vertical
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            const minSwipeDistance = 50; // Distancia mínima para considerar un swipe

            if (Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    this.previous(); // Deslizar a la derecha -> imagen anterior
                } else {
                    this.next(); // Deslizar a la izquierda -> imagen siguiente
                }
            }
        }
    }

    open(index = 0) {
        this.isOpen = true;
        this.currentIndex = index;
        this.notifyChange();
        this.renderLightbox();
    }

    close() {
        this.isOpen = false;
        this.notifyChange();
        this.removeLightbox();
        
        // Asegurar que la página de artworks es visible
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';
        document.documentElement.style.overflow = '';
        document.documentElement.style.position = '';
        document.documentElement.style.width = '';
        document.documentElement.style.height = '';

        // Forzar un reflow para asegurar que todo se renderiza correctamente
        window.scrollTo(0, window.scrollY);
    }

    next() {
        if (this.currentIndex < this.items.length - 1) {
            this.currentIndex++;
            this.updateLightboxContent();
            this.notifyChange();
        }
    }

    previous() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateLightboxContent();
            this.notifyChange();
        }
    }

    getCurrentItem() {
        return this.items[this.currentIndex];
    }

    renderLightbox() {
        const currentItem = this.getCurrentItem();
        const isLastItem = this.currentIndex === this.items.length - 1;
        const lightbox = document.createElement('div');
        lightbox.id = 'gallery-lightbox';
        lightbox.className = 'gallery-lightbox active';
        
        lightbox.innerHTML = `
            <div class="gallery-lightbox-content">
                <img src="${currentItem.src}" alt="${currentItem.alt}" />
                <div class="gallery-lightbox-info">
                    <h2>${currentItem.title}</h2>
                    <p>${currentItem.description}</p>
                </div>
                <button class="gallery-lightbox-close" aria-label="Cerrar galería">&times;</button>
                <button class="gallery-lightbox-prev ${this.currentIndex === 0 ? 'hidden' : ''}" 
                        aria-label="Imagen anterior">&lt;</button>
                <button class="gallery-lightbox-next ${isLastItem ? 'hidden' : ''}" 
                        aria-label="Imagen siguiente">&gt;</button>
            </div>
        `;

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // Add event listeners
        lightbox.querySelector('.gallery-lightbox-close').addEventListener('click', () => this.close());
        
        const prevButton = lightbox.querySelector('.gallery-lightbox-prev');
        const nextButton = lightbox.querySelector('.gallery-lightbox-next');
        
        if (!prevButton.classList.contains('hidden')) {
            prevButton.addEventListener('click', () => this.previous());
        }
        
        if (!nextButton.classList.contains('hidden')) {
            nextButton.addEventListener('click', () => this.next());
        }
        
        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.close();
            }
        });

        // Add keyboard navigation
        document.addEventListener('keydown', this.handleKeyPress);

        // Add touch navigation
        const content = lightbox.querySelector('.gallery-lightbox-content');
        content.addEventListener('touchstart', this.handleTouchStart, { passive: true });
        content.addEventListener('touchmove', this.handleTouchMove, { passive: false });
        content.addEventListener('touchend', this.handleTouchEnd, { passive: true });

        // Force reflow to trigger animation
        setTimeout(() => lightbox.classList.add('active'), 0);
    }

    updateLightboxContent() {
        const lightbox = document.getElementById('gallery-lightbox');
        if (!lightbox) return;

        const currentItem = this.getCurrentItem();
        const isLastItem = this.currentIndex === this.items.length - 1;
        const content = lightbox.querySelector('.gallery-lightbox-content');
        
        content.querySelector('img').src = currentItem.src;
        content.querySelector('img').alt = currentItem.alt;
        content.querySelector('h2').textContent = currentItem.title;
        content.querySelector('p').textContent = currentItem.description;

        // Actualizar estado de los botones
        const prevButton = content.querySelector('.gallery-lightbox-prev');
        const nextButton = content.querySelector('.gallery-lightbox-next');
        
        if (prevButton) {
            prevButton.classList.toggle('hidden', this.currentIndex === 0);
        }
        
        if (nextButton) {
            nextButton.classList.toggle('hidden', isLastItem);
        }
    }

    handleKeyPress = (e) => {
        switch(e.key) {
            case 'Escape':
                this.close();
                break;
            case 'ArrowLeft':
                this.previous();
                break;
            case 'ArrowRight':
                this.next();
                break;
        }
    }

    removeLightbox() {
        const lightbox = document.getElementById('gallery-lightbox');
        if (lightbox) {
            const content = lightbox.querySelector('.gallery-lightbox-content');
            content.removeEventListener('touchstart', this.handleTouchStart);
            content.removeEventListener('touchmove', this.handleTouchMove);
            content.removeEventListener('touchend', this.handleTouchEnd);
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
        }
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    subscribe(callback) {
        this.onChangeCallbacks.push(callback);
        return () => {
            this.onChangeCallbacks = this.onChangeCallbacks.filter(cb => cb !== callback);
        };
    }

    notifyChange() {
        this.onChangeCallbacks.forEach(callback => callback());
    }
}
