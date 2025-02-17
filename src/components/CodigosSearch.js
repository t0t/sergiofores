export class CodigosSearch {
    constructor(searchInput, resultsContainer, visionService) {
        this.searchInput = searchInput;
        this.resultsContainer = resultsContainer;
        this.visionService = visionService;
        this.debounceTimeout = null;
        this.init();
    }

    init() {
        this.loadCodigos();
        this.addEventListeners();
    }

    async loadCodigos() {
        try {
            const codigos = await this.visionService.buscarCodigos('');
            this.renderCodigos(codigos);
        } catch (error) {
            console.error('Error al cargar códigos:', error);
            this.mostrarError('Error al cargar los códigos');
        }
    }

    addEventListeners() {
        this.searchInput.addEventListener('input', () => {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = setTimeout(() => {
                this.handleSearch();
            }, 300);
        });
    }

    async handleSearch() {
        const query = this.searchInput.value.trim();
        try {
            const resultados = await this.visionService.buscarCodigos(query);
            this.renderCodigos(resultados);
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            this.mostrarError('Error al realizar la búsqueda');
        }
    }

    renderCodigos(codigos) {
        this.resultsContainer.innerHTML = '';
        
        if (codigos.length === 0) {
            this.mostrarMensajeVacio();
            return;
        }

        codigos.forEach(codigo => {
            const card = document.createElement('div');
            card.className = 'codigo-card';
            
            card.innerHTML = `
                <h3>${codigo.palabra}</h3>
                <span class="codigo-frecuencia">${codigo.frecuencia}</span>
                <p>${codigo.descripcion}</p>
            `;
            
            this.resultsContainer.appendChild(card);
        });
    }

    mostrarMensajeVacio() {
        this.resultsContainer.innerHTML = `
            <div class="mensaje-vacio">
                <p>No se encontraron códigos que coincidan con tu búsqueda</p>
            </div>
        `;
    }

    mostrarError(mensaje) {
        this.resultsContainer.innerHTML = `
            <div class="mensaje-error">
                <p>${mensaje}</p>
            </div>
        `;
    }
}
