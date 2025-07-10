/**
 * EnhancedHeader - Header mejorado con búsqueda, filtros y favoritos
 * Componente principal de navegación y control
 */

import store from '../state/Store.js';

class EnhancedHeader {
    constructor(element) {
        this.element = element;
        this.searchInput = null;
        this.favoritesCounter = null;
        this.searchDebounceTimer = null;
        this.searchDebounceDelay = 300;
        
        this.init();
    }

    init() {
        this.createHeaderStructure();
        this.bindEvents();
        this.subscribeToStore();
        this.updateUI();
    }

    createHeaderStructure() {
        this.element.innerHTML = `
            <div class="header-container">
                <!-- Branding y título -->
                <div class="header-brand">
                    <h1 class="header-title">
                        <span class="title-main">Referencias de Diseño</span>
                        <span class="title-counter" id="results-counter">32 referencias</span>
                    </h1>
                    <p class="header-subtitle">Colección curada de sitios web excepcionales</p>
                </div>

                <!-- Controles principales -->
                <div class="header-controls">
                    <!-- Búsqueda -->
                    <div class="search-container">
                        <div class="search-input-wrapper">
                            <svg class="search-icon" viewBox="0 0 24 24" width="20" height="20">
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                                      fill="none" stroke="currentColor" stroke-width="2"/>
                            </svg>
                            <input 
                                type="text" 
                                class="search-input" 
                                placeholder="Buscar por título, URL o descripción..."
                                aria-label="Buscar referencias"
                                autocomplete="off"
                                spellcheck="false"
                            >
                            <button class="search-clear" aria-label="Limpiar búsqueda" style="display: none;">
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2"/>
                                </svg>
                            </button>
                        </div>
                        <div class="search-suggestions" style="display: none;"></div>
                    </div>

                    <!-- Filtros rápidos -->
                    <div class="quick-filters">
                        <button class="filter-btn active" data-filter="all">
                            <span class="filter-label">Todos</span>
                            <span class="filter-count">32</span>
                        </button>
                        <button class="filter-btn" data-filter="portfolio">
                            <span class="filter-label">Portfolio</span>
                            <span class="filter-count">8</span>
                        </button>
                        <button class="filter-btn" data-filter="agency">
                            <span class="filter-label">Agencias</span>
                            <span class="filter-count">12</span>
                        </button>
                        <button class="filter-btn" data-filter="experimental">
                            <span class="filter-label">Experimental</span>
                            <span class="filter-count">6</span>
                        </button>
                        <button class="filter-btn" data-filter="cultural">
                            <span class="filter-label">Cultural</span>
                            <span class="filter-count">4</span>
                        </button>
                    </div>

                    <!-- Acciones del usuario -->
                    <div class="user-actions">
                        <!-- Favoritos -->
                        <button class="action-btn favorites-toggle" 
                                aria-label="Ver favoritos"
                                data-tooltip="Favoritos">
                            <svg class="action-icon" viewBox="0 0 24 24" width="20" height="20">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                                      fill="none" stroke="currentColor" stroke-width="2"/>
                            </svg>
                            <span class="action-label">Favoritos</span>
                            <span class="favorites-count">0</span>
                        </button>

                        <!-- Vista -->
                        <button class="action-btn view-toggle" 
                                aria-label="Cambiar vista"
                                data-tooltip="Cambiar vista">
                            <svg class="view-grid" viewBox="0 0 24 24" width="20" height="20">
                                <rect x="3" y="3" width="7" height="7" fill="none" stroke="currentColor" stroke-width="2"/>
                                <rect x="14" y="3" width="7" height="7" fill="none" stroke="currentColor" stroke-width="2"/>
                                <rect x="14" y="14" width="7" height="7" fill="none" stroke="currentColor" stroke-width="2"/>
                                <rect x="3" y="14" width="7" height="7" fill="none" stroke="currentColor" stroke-width="2"/>
                            </svg>
                            <svg class="view-list" viewBox="0 0 24 24" width="20" height="20" style="display: none;">
                                <line x1="8" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2"/>
                                <line x1="8" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2"/>
                                <line x1="8" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2"/>
                                <line x1="3" y1="6" x2="3" y2="6" stroke="currentColor" stroke-width="2"/>
                                <line x1="3" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2"/>
                                <line x1="3" y1="18" x2="3" y2="18" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </button>

                        <!-- Tema -->
                        <button class="action-btn theme-toggle" 
                                aria-label="Cambiar tema"
                                data-tooltip="Modo oscuro">
                            <svg class="theme-light" viewBox="0 0 24 24" width="20" height="20">
                                <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/>
                                <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2"/>
                                <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2"/>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2"/>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2"/>
                                <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2"/>
                                <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2"/>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2"/>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2"/>
                            </svg>
                            <svg class="theme-dark" viewBox="0 0 24 24" width="20" height="20" style="display: none;">
                                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" 
                                      fill="none" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </button>

                        <!-- Menú adicional -->
                        <div class="dropdown">
                            <button class="action-btn dropdown-toggle" 
                                    aria-label="Más opciones"
                                    data-tooltip="Más opciones">
                                <svg viewBox="0 0 24 24" width="20" height="20">
                                    <circle cx="12" cy="12" r="1" fill="currentColor"/>
                                    <circle cx="19" cy="12" r="1" fill="currentColor"/>
                                    <circle cx="5" cy="12" r="1" fill="currentColor"/>
                                </svg>
                            </button>
                            <div class="dropdown-menu">
                                <button class="dropdown-item" data-action="export-favorites">
                                    <svg viewBox="0 0 24 24" width="16" height="16">
                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" 
                                              fill="none" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                    Exportar favoritos
                                </button>
                                <button class="dropdown-item" data-action="import-favorites">
                                    <svg viewBox="0 0 24 24" width="16" height="16">
                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" 
                                              fill="none" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                    Importar favoritos
                                </button>
                                <div class="dropdown-divider"></div>
                                <button class="dropdown-item" data-action="reset-all">
                                    <svg viewBox="0 0 24 24" width="16" height="16">
                                        <path d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8" 
                                              fill="none" stroke="currentColor" stroke-width="2"/>
                                        <path d="M21 3v5h-5" fill="none" stroke="currentColor" stroke-width="2"/>
                                        <path d="M21 12a9 9 0 01-9 9 9.75 9.75 0 01-6.74-2.74L3 16" 
                                              fill="none" stroke="currentColor" stroke-width="2"/>
                                        <path d="M3 21v-5h5" fill="none" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                    Restablecer todo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Filtros activos (tags) -->
                <div class="active-filters" style="display: none;">
                    <span class="active-filters-label">Filtros activos:</span>
                    <div class="active-filters-list"></div>
                    <button class="clear-filters" aria-label="Limpiar todos los filtros">
                        Limpiar todo
                    </button>
                </div>
            </div>
        `;

        // Referencias a elementos
        this.searchInput = this.element.querySelector('.search-input');
        this.searchClear = this.element.querySelector('.search-clear');
        this.favoritesCounter = this.element.querySelector('.favorites-count');
        this.resultsCounter = this.element.querySelector('#results-counter');
    }

    bindEvents() {
        // Búsqueda
        this.searchInput.addEventListener('input', (e) => {
            this.handleSearchInput(e.target.value);
        });

        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.clearSearch();
            }
        });

        this.searchClear.addEventListener('click', () => {
            this.clearSearch();
        });

        // Filtros
        this.element.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.currentTarget.dataset.filter;
                this.setActiveFilter(filter);
            });
        });

        // Acciones de usuario
        this.element.querySelector('.favorites-toggle').addEventListener('click', () => {
            this.toggleFavoritesView();
        });

        this.element.querySelector('.view-toggle').addEventListener('click', () => {
            this.toggleViewMode();
        });

        this.element.querySelector('.theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Dropdown
        this.setupDropdown();

        // Limpiar filtros
        this.element.querySelector('.clear-filters').addEventListener('click', () => {
            store.dispatch('CLEAR_FILTERS');
        });
    }

    handleSearchInput(value) {
        // Debounce búsqueda
        clearTimeout(this.searchDebounceTimer);
        
        // Mostrar/ocultar botón clear
        this.searchClear.style.display = value ? 'flex' : 'none';
        
        this.searchDebounceTimer = setTimeout(() => {
            store.dispatch('SET_FILTER', { type: 'search', value });
        }, this.searchDebounceDelay);
    }

    clearSearch() {
        this.searchInput.value = '';
        this.searchClear.style.display = 'none';
        store.dispatch('SET_FILTER', { type: 'search', value: '' });
        this.searchInput.focus();
    }

    setActiveFilter(category) {
        // Actualizar botones
        this.element.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === category);
        });

        store.dispatch('SET_FILTER', { type: 'category', value: category });
    }

    toggleFavoritesView() {
        const onlyFavorites = store.getState('activeFilters.onlyFavorites');
        store.dispatch('SET_FILTER', { type: 'onlyFavorites', value: !onlyFavorites });
        
        this.element.querySelector('.favorites-toggle').classList.toggle('active', !onlyFavorites);
    }

    toggleViewMode() {
        const currentMode = store.getState('ui.viewMode');
        const newMode = currentMode === 'grid' ? 'list' : 'grid';
        
        store.setState('ui.viewMode', newMode);
        
        // Actualizar iconos
        const gridIcon = this.element.querySelector('.view-grid');
        const listIcon = this.element.querySelector('.view-list');
        
        if (newMode === 'list') {
            gridIcon.style.display = 'none';
            listIcon.style.display = 'block';
        } else {
            gridIcon.style.display = 'block';
            listIcon.style.display = 'none';
        }
    }

    toggleTheme() {
        const currentTheme = store.getState('ui.theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        store.setState('ui.theme', newTheme);
        
        // Aplicar tema al documento
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Actualizar iconos
        const lightIcon = this.element.querySelector('.theme-light');
        const darkIcon = this.element.querySelector('.theme-dark');
        
        if (newTheme === 'dark') {
            lightIcon.style.display = 'none';
            darkIcon.style.display = 'block';
        } else {
            lightIcon.style.display = 'block';
            darkIcon.style.display = 'none';
        }
    }

    setupDropdown() {
        const toggle = this.element.querySelector('.dropdown-toggle');
        const menu = this.element.querySelector('.dropdown-menu');
        
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('show');
        });

        // Cerrar al hacer click fuera
        document.addEventListener('click', () => {
            menu.classList.remove('show');
        });

        // Acciones del dropdown
        this.element.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleDropdownAction(action);
                menu.classList.remove('show');
            });
        });
    }

    handleDropdownAction(action) {
        switch (action) {
            case 'export-favorites':
                this.exportFavorites();
                break;
            case 'import-favorites':
                this.importFavorites();
                break;
            case 'reset-all':
                this.resetAll();
                break;
        }
    }

    exportFavorites() {
        const favorites = store.getState('favorites');
        if (favorites.length === 0) {
            alert('No tienes favoritos para exportar');
            return;
        }

        // Implementar exportación
        console.log('Exportando favoritos:', favorites);
    }

    importFavorites() {
        // Implementar importación
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.click();
    }

    resetAll() {
        if (confirm('¿Estás seguro de que quieres restablecer todos los datos? Esta acción no se puede deshacer.')) {
            localStorage.clear();
            location.reload();
        }
    }

    subscribeToStore() {
        // Actualizar contador de favoritos
        store.subscribe('favorites', (favorites) => {
            this.favoritesCounter.textContent = favorites.length;
            this.element.querySelector('.favorites-toggle').classList.toggle('has-favorites', favorites.length > 0);
        });

        // Actualizar filtros activos
        store.subscribe('activeFilters', () => {
            this.updateActiveFilters();
        });
    }

    updateActiveFilters() {
        const filters = store.getState('activeFilters');
        const activeFiltersEl = this.element.querySelector('.active-filters');
        const listEl = this.element.querySelector('.active-filters-list');
        
        const activeTags = [];
        
        if (filters.search) {
            activeTags.push(`Búsqueda: "${filters.search}"`);
        }
        
        if (filters.category !== 'all') {
            activeTags.push(`Categoría: ${filters.category}`);
        }
        
        if (filters.onlyFavorites) {
            activeTags.push('Solo favoritos');
        }
        
        if (activeTags.length > 0) {
            listEl.innerHTML = activeTags.map(tag => 
                `<span class="active-filter-tag">${tag}</span>`
            ).join('');
            activeFiltersEl.style.display = 'flex';
        } else {
            activeFiltersEl.style.display = 'none';
        }
    }

    updateUI() {
        const favorites = store.getState('favorites');
        const theme = store.getState('ui.theme');
        const viewMode = store.getState('ui.viewMode');
        
        // Aplicar estado inicial
        this.favoritesCounter.textContent = favorites.length;
        document.documentElement.setAttribute('data-theme', theme);
        
        // Otros updates...
        this.updateActiveFilters();
    }

    static autoRegister(selector = '.header') {
        const element = document.querySelector(selector);
        if (element) {
            return new EnhancedHeader(element);
        }
        return null;
    }
}

export default EnhancedHeader;