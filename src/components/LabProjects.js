export class LabProjects {
    constructor(container, modal, labService) {
        this.container = container;
        this.modal = modal;
        this.labService = labService;
        this.currentFilter = 'todos';
        this.init();
    }

    async init() {
        await this.loadProyectos();
        this.setupFilters();
        this.setupModal();
    }

    async loadProyectos(categoria = 'todos') {
        try {
            const proyectos = await this.labService.getProyectos(categoria);
            this.renderProyectos(proyectos);
        } catch (error) {
            console.error('Error al cargar proyectos:', error);
            this.mostrarError('Error al cargar los proyectos');
        }
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const categoria = button.dataset.filter;
                this.currentFilter = categoria;
                
                // Actualizar estado activo de los botones
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Cargar proyectos filtrados
                this.loadProyectos(categoria);
            });
        });
    }

    setupModal() {
        // Cerrar modal
        const closeButton = this.modal.querySelector('.modal-close');
        closeButton.addEventListener('click', () => {
            this.closeModal();
        });

        // Cerrar modal con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });

        // Cerrar modal al hacer clic fuera
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
    }

    renderProyectos(proyectos) {
        this.container.innerHTML = '';
        
        if (proyectos.length === 0) {
            this.mostrarMensajeVacio();
            return;
        }

        proyectos.forEach(proyecto => {
            const card = document.createElement('div');
            card.className = 'project-card fade-in';
            
            card.innerHTML = `
                <img src="${proyecto.imagen}" alt="${proyecto.titulo}" class="project-image">
                <div class="project-overlay">
                    <h3 class="project-title">${proyecto.titulo}</h3>
                    <span class="project-category">${this.formatCategoria(proyecto.categoria)}</span>
                </div>
            `;
            
            card.addEventListener('click', () => this.showProyectoDetails(proyecto));
            this.container.appendChild(card);
        });
    }

    async showProyectoDetails(proyecto) {
        const modalBody = this.modal.querySelector('.modal-body');
        modalBody.innerHTML = `
            <img src="${proyecto.imagen}" alt="${proyecto.titulo}" class="modal-image">
            <h2 class="modal-title">${proyecto.titulo}</h2>
            <p class="modal-description">${proyecto.descripcion}</p>
            
            <div class="modal-metadata">
                <div class="metadata-item">
                    <span class="metadata-label">Categoría</span>
                    <span class="metadata-value">${this.formatCategoria(proyecto.categoria)}</span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Estado</span>
                    <span class="metadata-value">${proyecto.estado}</span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Fecha</span>
                    <span class="metadata-value">${proyecto.fecha}</span>
                </div>
            </div>

            <div class="modal-technologies">
                <h3>Tecnologías</h3>
                <div class="tech-tags">
                    ${proyecto.tecnologias.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>

            ${this.renderEnlaces(proyecto.enlaces)}
        `;

        this.openModal();
    }

    openModal() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    formatCategoria(categoria) {
        const categorias = {
            'experimentos': 'Experimentos',
            'investigacion': 'Investigación',
            'desarrollo': 'Desarrollo'
        };
        return categorias[categoria] || categoria;
    }

    renderEnlaces(enlaces) {
        if (!enlaces || enlaces.length === 0) return '';
        
        return `
            <div class="modal-links">
                <h3>Enlaces</h3>
                <div class="links-container">
                    ${enlaces.map(enlace => `
                        <a href="${enlace.url}" class="project-link" target="_blank" rel="noopener noreferrer">
                            ${enlace.titulo}
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }

    mostrarMensajeVacio() {
        this.container.innerHTML = `
            <div class="mensaje-vacio">
                <p>No hay proyectos disponibles en esta categoría</p>
            </div>
        `;
    }

    mostrarError(mensaje) {
        this.container.innerHTML = `
            <div class="mensaje-error">
                <p>${mensaje}</p>
            </div>
        `;
    }
}
