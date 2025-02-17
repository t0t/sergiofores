import { BaseController } from './BaseController.js';
import { ObraModel } from '../models/ObraModel.js';

export class ObraController extends BaseController {
    constructor() {
        super();
        this.model = new ObraModel();
    }

    async init() {
        try {
            // Cargar datos
            await this.model.load();
            
            // Renderizar vista
            this.renderObras();
            
            // Configurar eventos
            this.setupEventListeners();
        } catch (error) {
            console.error('Error inicializando ObraController:', error);
            // Manejar error (mostrar mensaje al usuario, etc.)
        }
    }

    async renderObras() {
        const obras = this.model.getData();
        const container = document.querySelector('#obras-container');
        
        if (!container) return;

        container.innerHTML = obras.map(obra => `
            <article class="obra" data-id="${obra.id}">
                <img src="${obra.preview}" alt="${obra.title}" loading="lazy">
                <div class="obra-info">
                    <h2>${obra.title}</h2>
                    <p>${obra.description}</p>
                </div>
            </article>
        `).join('');
    }

    setupEventListeners() {
        // Delegación de eventos para las obras
        document.querySelector('#obras-container')?.addEventListener('click', (e) => {
            const obraElement = e.target.closest('.obra');
            if (obraElement) {
                const obraId = parseInt(obraElement.dataset.id);
                this.handleObraClick(obraId);
            }
        });

        // Filtros
        document.querySelectorAll('.obra-filter')?.forEach(filter => {
            filter.addEventListener('click', (e) => {
                const tag = e.target.dataset.tag;
                this.filterObras(tag);
            });
        });
    }

    handleObraClick(obraId) {
        this.model.setCurrentObra(obraId);
        // Actualizar URL
        window.history.pushState({}, '', `/obra/${obraId}`);
        // Mostrar detalle de obra
        this.renderObraDetail(obraId);
    }

    filterObras(tag) {
        const obras = tag ? 
            this.model.filterObrasByTag(tag) : 
            this.model.getData();
        
        // Actualizar vista con obras filtradas
        this.renderObras(obras);
    }

    renderObraDetail(obraId) {
        const obra = this.model.getObraById(obraId);
        if (!obra) return;

        const modal = document.createElement('div');
        modal.className = 'obra-modal';
        modal.innerHTML = `
            <div class="obra-modal-content">
                <button class="close-modal">&times;</button>
                <img src="${obra.imagen}" alt="${obra.title}">
                <div class="obra-detail-info">
                    <h1>${obra.title}</h1>
                    <p>${obra.description}</p>
                </div>
            </div>
        `;

        // Manejar cierre del modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
            window.history.pushState({}, '', '/obra');
        });

        document.body.appendChild(modal);
    }
}
