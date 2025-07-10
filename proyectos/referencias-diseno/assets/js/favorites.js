/**
 * Sistema de Favoritos Simplificado pero Robusto
 * Funcionalidad core sin complejidad excesiva
 */

class FavoritesSystem {
    constructor() {
        this.storageKey = 'referencias-favoritos';
        this.favorites = this.loadFavorites();
        this.subscribers = [];
        
        this.init();
    }

    init() {
        this.addFavoriteButtons();
        this.setupStyles();
        this.updateAllButtons();
    }

    // ===== GESTIÓN DE ESTADO =====
    
    loadFavorites() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error cargando favoritos:', error);
            return [];
        }
    }

    saveFavorites() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
            this.notifySubscribers();
            return true;
        } catch (error) {
            console.error('Error guardando favoritos:', error);
            return false;
        }
    }

    subscribe(callback) {
        this.subscribers.push(callback);
        // Llamar inmediatamente con estado actual
        callback(this.favorites);
        
        // Retornar función de cleanup
        return () => {
            const index = this.subscribers.indexOf(callback);
            if (index > -1) {
                this.subscribers.splice(index, 1);
            }
        };
    }

    notifySubscribers() {
        this.subscribers.forEach(callback => callback(this.favorites));
    }

    // ===== OPERACIONES DE FAVORITOS =====

    addFavorite(id) {
        if (!this.isFavorite(id)) {
            this.favorites.push(id);
            this.saveFavorites();
            this.updateButton(id);
            
            return true;
        }
        return false;
    }

    removeFavorite(id) {
        const index = this.favorites.indexOf(id);
        if (index > -1) {
            this.favorites.splice(index, 1);
            this.saveFavorites();
            this.updateButton(id);
            
            return true;
        }
        return false;
    }

    toggleFavorite(id) {
        if (this.isFavorite(id)) {
            this.removeFavorite(id);
        } else {
            this.addFavorite(id);
        }
    }

    isFavorite(id) {
        return this.favorites.includes(id);
    }

    getFavorites() {
        return [...this.favorites];
    }

    getFavoriteCount() {
        return this.favorites.length;
    }

    // ===== UI Y DOM =====

    addFavoriteButtons() {
        const cards = document.querySelectorAll('.reference-card');
        
        cards.forEach((card, index) => {
            const id = this.getCardId(card, index);
            
            // Buscar si ya tiene botón
            if (card.querySelector('.favorite-btn')) return;
            
            // Crear botón
            const button = this.createFavoriteButton(id);
            
            // Insertar en el mismo contenedor que el botón de explorar
            const imageContainer = card.querySelector('.reference-image-container');
            if (imageContainer) {
                imageContainer.appendChild(button);
            } else {
                // Fallback para cards sin contenedor de imagen
                const imageElement = card.querySelector('.reference-image');
                if (imageElement && imageElement.parentNode) {
                    imageElement.parentNode.style.position = 'relative';
                    imageElement.parentNode.appendChild(button);
                }
            }
        });
    }

    getCardId(card, fallbackIndex) {
        // Intentar obtener ID del enlace URL
        const link = card.querySelector('.reference-link');
        if (link && link.href) {
            return this.urlToId(link.href);
        }
        
        // Fallback: usar título
        const title = card.querySelector('.reference-title');
        if (title) {
            return this.titleToId(title.textContent);
        }
        
        // Último recurso: índice
        return `ref-${fallbackIndex}`;
    }

    urlToId(url) {
        return url.replace(/^https?:\/\//, '').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    }

    titleToId(title) {
        return title.trim().replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    }

    createFavoriteButton(id) {
        const button = document.createElement('button');
        button.className = 'favorite-btn';
        button.setAttribute('data-id', id);
        button.setAttribute('aria-label', 'Añadir a favoritos');
        button.setAttribute('title', 'Añadir a favoritos');
        
        button.innerHTML = `
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
        `;
        
        // Event listener
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.handleButtonClick(id, button);
        });
        
        return button;
    }

    handleButtonClick(id, button) {
        // Animación de click
        button.classList.add('clicking');
        
        setTimeout(() => {
            const wasAlreadyFavorite = this.isFavorite(id);
            this.toggleFavorite(id);
            
            // Crear partículas solo al añadir favorito
            if (!wasAlreadyFavorite) {
                this.createHeartParticles(button);
            }
            
            button.classList.remove('clicking');
        }, 150);
    }

    createHeartParticles(button) {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Crear múltiples partículas
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'heart-particle';
            particle.innerHTML = '♥';
            
            // Posición inicial en el centro del botón
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                color: #ef4444;
                font-size: 16px;
                pointer-events: none;
                z-index: 9999;
                transform-origin: center;
                transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                opacity: 1;
            `;
            
            document.body.appendChild(particle);
            
            // Calcular dirección aleatoria
            const angle = (i * 45) + Math.random() * 30 - 15; // Distribución en círculo
            const distance = 80 + Math.random() * 40;
            const radian = (angle * Math.PI) / 180;
            const deltaX = Math.cos(radian) * distance;
            const deltaY = Math.sin(radian) * distance;
            
            // Animar partícula
            setTimeout(() => {
                particle.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.3) rotate(${Math.random() * 360}deg)`;
                particle.style.opacity = '0';
            }, 50);
            
            // Limpiar partícula
            setTimeout(() => {
                if (particle.parentNode) {
                    document.body.removeChild(particle);
                }
            }, 1050);
        }
        
        // Efecto de pulso en el botón
        button.style.transform = 'scale(1.2)';
        setTimeout(() => {
            button.style.transform = '';
        }, 200);
    }

    updateButton(id) {
        const button = document.querySelector(`[data-id="${id}"]`);
        if (button) {
            const isFav = this.isFavorite(id);
            
            button.classList.toggle('is-favorite', isFav);
            button.setAttribute('aria-label', isFav ? 'Quitar de favoritos' : 'Añadir a favoritos');
            button.setAttribute('title', isFav ? 'Quitar de favoritos' : 'Añadir a favoritos');
            
            // Animación sutil
            if (isFav) {
                button.classList.add('added');
                setTimeout(() => button.classList.remove('added'), 600);
            }
        }
    }

    updateAllButtons() {
        const buttons = document.querySelectorAll('.favorite-btn');
        buttons.forEach(button => {
            const id = button.getAttribute('data-id');
            if (id) {
                const isFav = this.isFavorite(id);
                button.classList.toggle('is-favorite', isFav);
                button.setAttribute('aria-label', isFav ? 'Quitar de favoritos' : 'Añadir a favoritos');
                button.setAttribute('title', isFav ? 'Quitar de favoritos' : 'Añadir a favoritos');
            }
        });
    }


    getCardIdFromCard(card) {
        // Obtener ID de la card (similar a getCardId pero desde la card directamente)
        const link = card.querySelector('.reference-link');
        if (link && link.href) {
            return this.urlToId(link.href);
        }
        
        const title = card.querySelector('.reference-title');
        if (title) {
            return this.titleToId(title.textContent);
        }
        
        return `ref-${Array.from(document.querySelectorAll('.reference-card')).indexOf(card)}`;
    }

    // ===== ESTILOS =====

    setupStyles() {
        if (document.getElementById('favorites-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'favorites-styles';
        style.textContent = `
            .favorite-btn {
                position: absolute;
                top: 50%;
                right: calc(var(--space-md) + 20px);
                transform: translateY(-50%) scale(0.8);
                z-index: 25;
                background: rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                transition-delay: 0.2s;
                color: #6b6b6b;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                opacity: 0;
            }
            
            .reference-card:hover .favorite-btn {
                opacity: 1;
                transform: translateY(-50%) scale(1);
            }

            .favorite-btn:hover {
                background: rgba(255, 255, 255, 0.95);
                transform: translateY(-50%) scale(1.1) !important;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                color: #ef4444;
            }
            
            .favorite-btn.is-favorite {
                background: rgba(239, 68, 68, 0.9);
                color: white;
                border-color: rgba(239, 68, 68, 0.3);
            }
            
            .favorite-btn.is-favorite:hover {
                background: rgba(239, 68, 68, 0.95);
                transform: translateY(-50%) scale(1.1) !important;
            }
            
            .favorite-btn svg {
                width: 20px;
                height: 20px;
                transition: all 0.3s ease;
                position: absolute;
            }
            
            .favorite-btn .heart-filled {
                opacity: 0;
                transform: scale(0.8);
            }
            
            .favorite-btn.is-favorite .heart-outline {
                opacity: 0;
                transform: scale(1.2);
            }
            
            .favorite-btn.is-favorite .heart-filled {
                opacity: 1;
                transform: scale(1);
            }
            
            .favorite-btn.clicking {
                transform: scale(0.95);
            }
            
            .favorite-btn.added {
                animation: favoriteAdded 0.6s ease;
            }
            
            @keyframes favoriteAdded {
                0% { transform: scale(1); }
                50% { transform: scale(1.3); }
                100% { transform: scale(1); }
            }
            
            /* Notificaciones */
            .favorites-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #22c55e;
                color: white;
                padding: 12px 20px;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 500;
                z-index: 9999;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
            
            .favorites-notification.show {
                transform: translateX(0);
            }
            
            .favorites-notification.info {
                background: #3b82f6;
            }

            /* Responsive Mobile */
            @media (max-width: 1024px) {
                .favorite-btn {
                    width: 36px;
                    height: 36px;
                    right: calc(var(--space-sm) + 18px);
                    opacity: 1;
                    transform: translateY(-50%) scale(1);
                }
                
                .favorite-btn:hover {
                    transform: translateY(-50%) scale(1.05) !important;
                }
                
                .favorite-btn.is-favorite:hover {
                    transform: translateY(-50%) scale(1.05) !important;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    // ===== NOTIFICACIONES =====

    showNotification(message, type = 'success') {
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = `favorites-notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Mostrar
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Ocultar y limpiar
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 2000);
    }

    // ===== UTILIDADES PÚBLICAS =====

    exportFavorites() {
        const data = {
            version: '1.0',
            timestamp: new Date().toISOString(),
            favorites: this.favorites,
            count: this.favorites.length
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `referencias-favoritos-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        this.showNotification('Favoritos exportados', 'success');
    }

    importFavorites(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    
                    if (data.favorites && Array.isArray(data.favorites)) {
                        this.favorites = [...new Set([...this.favorites, ...data.favorites])];
                        this.saveFavorites();
                        this.updateAllButtons();
                        this.showNotification(`Importados ${data.favorites.length} favoritos`, 'success');
                        resolve(data.favorites.length);
                    } else {
                        throw new Error('Formato de archivo inválido');
                    }
                } catch (error) {
                    this.showNotification('Error importando favoritos', 'info');
                    reject(error);
                }
            };
            
            reader.readAsText(file);
        });
    }

    clearAllFavorites() {
        if (this.favorites.length === 0) {
            this.showNotification('No hay favoritos para limpiar', 'info');
            return;
        }
        
        if (confirm(`¿Estás seguro de que quieres eliminar ${this.favorites.length} favoritos?`)) {
            this.favorites = [];
            this.saveFavorites();
            this.updateAllButtons();
            this.showNotification('Todos los favoritos eliminados', 'info');
        }
    }
}

// ===== INICIALIZACIÓN AUTOMÁTICA =====

let favoritesSystem = null;

document.addEventListener('DOMContentLoaded', () => {
    favoritesSystem = new FavoritesSystem();
    
    // Exponer globalmente para debug
    window.favorites = favoritesSystem;
});

// Export para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FavoritesSystem;
}