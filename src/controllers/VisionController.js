import { BaseController } from './BaseController.js';
import { VisionModel } from '../models/VisionModel.js';

export class VisionController extends BaseController {
    constructor() {
        super();
        this.model = new VisionModel();
        this.currentSlide = 0;
    }

    async init() {
        try {
            // Cargar datos
            await this.model.load();
            
            // Renderizar vista
            this.renderVision();
            
            // Configurar eventos
            this.setupEventListeners();
            
            // Iniciar slider si existe
            this.initSlider();
        } catch (error) {
            console.error('Error inicializando VisionController:', error);
        }
    }

    renderVision() {
        const data = this.model.getData();
        const container = document.querySelector('#vision-container');
        
        if (!container) return;

        // Renderizar header
        this.renderHeader(data);

        // Renderizar secciones
        this.renderSections(data);

        // Renderizar códigos
        this.renderCodigos(data.codigos);
    }

    renderHeader(data) {
        const header = document.querySelector('header[title="sintesis"]');
        if (!header) return;

        header.innerHTML = `
            <h1>${data.titulo}</h1>
            <h2>${data.subtitulo}</h2>
            <div class="cover-image" style="background-image: url(${data.galeria1[0]})"></div>
        `;
    }

    renderSections(data) {
        const container = document.querySelector('.slider--container');
        if (!container) return;

        container.innerHTML = data.headings.map((heading, index) => `
            <div class="slider1 card" data-index="${index}">
                <h3>${heading}</h3>
                <${index === 0 ? 'ol' : 'ul'} ${index === 0 ? 'start="0"' : ''}>
                    ${this.model.getFrasesByHeading(index).map(frase => 
                        `<li>${frase}</li>`
                    ).join('')}
                </${index === 0 ? 'ol' : 'ul'}>
            </div>
        `).join('');
    }

    renderCodigos(codigos) {
        const container = document.querySelector('#codigos-container');
        if (!container) return;

        container.innerHTML = `
            <div class="codigos-search">
                <input type="text" placeholder="Buscar códigos..." id="codigos-search">
            </div>
            <div class="codigos-grid">
                ${codigos.map(codigo => `
                    <div class="codigo-card" data-palabra="${codigo.palabra}">
                        <h3>${codigo.palabra}</h3>
                        <div class="codigo-frecuencia">${codigo.frecuencia}</div>
                        <p>${codigo.descripcion}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    setupEventListeners() {
        // Búsqueda de códigos
        document.querySelector('#codigos-search')?.addEventListener('input', (e) => {
            const query = e.target.value;
            const resultados = this.model.searchCodigos(query);
            this.updateCodigosDisplay(resultados);
        });

        // Navegación del slider
        document.querySelectorAll('.slider-nav')?.forEach(nav => {
            nav.addEventListener('click', (e) => {
                const direction = e.target.dataset.direction;
                this.navigateSlider(direction);
            });
        });
    }

    initSlider() {
        const slides = document.querySelectorAll('.slider1');
        if (!slides.length) return;

        // Añadir navegación si no existe
        const container = document.querySelector('.slider--container');
        if (!container.querySelector('.slider-nav')) {
            container.insertAdjacentHTML('beforeend', `
                <div class="slider-navigation">
                    <button class="slider-nav" data-direction="prev">&lt;</button>
                    <button class="slider-nav" data-direction="next">&gt;</button>
                </div>
            `);
        }

        this.showSlide(this.currentSlide);
    }

    navigateSlider(direction) {
        const slides = document.querySelectorAll('.slider1');
        if (!slides.length) return;

        if (direction === 'next') {
            this.currentSlide = (this.currentSlide + 1) % slides.length;
        } else {
            this.currentSlide = this.currentSlide === 0 ? slides.length - 1 : this.currentSlide - 1;
        }

        this.showSlide(this.currentSlide);
    }

    showSlide(index) {
        const slides = document.querySelectorAll('.slider1');
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
            slide.classList.toggle('active', i === index);
        });
    }

    updateCodigosDisplay(codigos) {
        const container = document.querySelector('.codigos-grid');
        if (!container) return;

        container.innerHTML = codigos.map(codigo => `
            <div class="codigo-card" data-palabra="${codigo.palabra}">
                <h3>${codigo.palabra}</h3>
                <div class="codigo-frecuencia">${codigo.frecuencia}</div>
                <p>${codigo.descripcion}</p>
            </div>
        `).join('');
    }
}
