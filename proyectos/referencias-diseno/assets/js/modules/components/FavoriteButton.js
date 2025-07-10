/**
 * FavoriteButton - Componente de botón de favorito
 * Auto-registrable y reactivo al estado global
 */

import store from '../state/Store.js';

class FavoriteButton {
    constructor(element, referenceId) {
        this.element = element;
        this.referenceId = referenceId;
        this.isAnimating = false;
        
        this.init();
    }

    init() {
        this.setupElement();
        this.bindEvents();
        this.subscribeToStore();
        this.updateUI();
    }

    setupElement() {
        // Asegurar estructura HTML correcta
        if (!this.element.querySelector('.favorite-icon')) {
            this.element.innerHTML = `
                <span class="favorite-icon" aria-hidden="true">
                    <svg class="heart-outline" viewBox="0 0 24 24" width="20" height="20">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                              fill="none" 
                              stroke="currentColor" 
                              stroke-width="2"/>
                    </svg>
                    <svg class="heart-filled" viewBox="0 0 24 24" width="20" height="20">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                              fill="currentColor"/>
                    </svg>
                </span>
                <span class="favorite-label">
                    <span class="add-text">Añadir a favoritos</span>
                    <span class="remove-text">Quitar de favoritos</span>
                </span>
            `;
        }

        // Añadir clases CSS
        this.element.classList.add('favorite-button');
        this.element.setAttribute('role', 'button');
        this.element.setAttribute('tabindex', '0');
        this.element.setAttribute('aria-label', 'Añadir a favoritos');
    }

    bindEvents() {
        // Click handler
        this.element.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggle();
        });

        // Keyboard support
        this.element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggle();
            }
        });

        // Hover effects
        this.element.addEventListener('mouseenter', () => {
            this.element.classList.add('hover');
        });

        this.element.addEventListener('mouseleave', () => {
            this.element.classList.remove('hover');
        });
    }

    subscribeToStore() {
        // Suscribirse a cambios en favoritos
        this.unsubscribe = store.subscribe('favorites', () => {
            this.updateUI();
        });
    }

    toggle() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        
        // Animación de click
        this.element.classList.add('clicking');
        
        // Dispatch action al store
        store.dispatch('TOGGLE_FAVORITE', this.referenceId);
        
        // Animación de cambio de estado
        setTimeout(() => {
            this.playToggleAnimation();
        }, 100);
        
        setTimeout(() => {
            this.element.classList.remove('clicking');
            this.isAnimating = false;
        }, 300);
    }

    playToggleAnimation() {
        const isFavorite = this.isFavorite();
        
        if (isFavorite) {
            // Animación de "añadido a favoritos"
            this.element.classList.add('adding');
            this.createFloatingHeart();
            
            setTimeout(() => {
                this.element.classList.remove('adding');
            }, 600);
        } else {
            // Animación de "quitado de favoritos"
            this.element.classList.add('removing');
            
            setTimeout(() => {
                this.element.classList.remove('removing');
            }, 300);
        }
    }

    createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        
        const rect = this.element.getBoundingClientRect();
        heart.style.left = rect.left + rect.width / 2 + 'px';
        heart.style.top = rect.top + rect.height / 2 + 'px';
        
        document.body.appendChild(heart);
        
        // Animar y limpiar
        setTimeout(() => {
            heart.style.transform = 'translateY(-30px) scale(1.5)';
            heart.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 1000);
    }

    updateUI() {
        const isFavorite = this.isFavorite();
        
        // Actualizar clases
        this.element.classList.toggle('is-favorite', isFavorite);
        
        // Actualizar aria-label
        const label = isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos';
        this.element.setAttribute('aria-label', label);
        
        // Actualizar estado visual
        this.element.setAttribute('data-favorite', isFavorite);
    }

    isFavorite() {
        const favorites = store.getState('favorites');
        return favorites.includes(this.referenceId);
    }

    destroy() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        
        // Limpiar event listeners se hace automáticamente al remover el elemento
        this.element.classList.remove('favorite-button');
    }

    // Método estático para auto-registro
    static autoRegister(selector = '[data-reference-id]') {
        const elements = document.querySelectorAll(selector);
        const instances = [];
        
        elements.forEach(element => {
            const referenceId = element.dataset.referenceId;
            if (referenceId) {
                // Buscar o crear botón de favorito
                let favoriteButton = element.querySelector('.favorite-button');
                
                if (!favoriteButton) {
                    favoriteButton = document.createElement('button');
                    favoriteButton.className = 'favorite-button';
                    
                    // Insertar en posición apropiada (esquina superior derecha de la imagen)
                    const imageContainer = element.querySelector('.reference-image').parentNode;
                    imageContainer.style.position = 'relative';
                    favoriteButton.style.position = 'absolute';
                    favoriteButton.style.top = '12px';
                    favoriteButton.style.right = '12px';
                    favoriteButton.style.zIndex = '10';
                    
                    imageContainer.appendChild(favoriteButton);
                }
                
                const instance = new FavoriteButton(favoriteButton, referenceId);
                instances.push(instance);
            }
        });
        
        return instances;
    }
}

export default FavoriteButton;