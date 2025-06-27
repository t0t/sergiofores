import { BaseView } from './BaseView.js';
import styles from '../css/modules/exposiciones.module.css';

export class Exposiciones extends BaseView {
    constructor(container) {
        super(container);
        this.exposiciones = [
            {
                id: 1,
                title: 'Can Puget',
                date: 'Sala de exposiciones Manlleu, 2023',
                thumbnail: '/images/expos/cartel_v1.jpeg',
                subtitle: 'Ciertos procesos emocionales coagulan en forma de cuadros',
                content: {
                    description: [
                        'Pinto desnudos como una forma de expresión posible que, lejos de alegorías y connotaciones reivindicativas, son en mí una tentativa de despojar de capas al cuerpo para acceder hacia mi verdad encarnada. Una desnudez que escoge la piel y la carne, que descarta arquetipos y capas teorizadas.',
                        'Busco reconocerme, descubrirme en el anonimato de distintos cuerpos, siendo ése el lugar donde no hay ausencia y donde lamo mis propias heridas irracionales, donde despojo a mi realidad de sus vestiduras.',
                        'Me apetece significar una piel cristalina, translúcida, frágil: como una vasija cubriendo la superficie del cuadro donde me puedo hacer invisible, y entrar o salir a voluntad.',
                        'En los matices del proceso pictórico se van superponiendo las instantáneas de cómo me sentí en ahoras ya transitados.',
                        'Me inundo en sensaciones mientras bajo a mi mundo emocional por medio de la materia, percepciones que una vez plasmadas parece que desaparecen o tal vez quedan escondidas como un misterio esperando a ser desvelado. Me dejo sorprender por mi propia necesidad irracional de fijar sombras sutiles, de remarcar cómo se proyecta la luz y se reafirman contornos; vinculándome a la sorpresa del propio descubrimiento.',
                        'En ocasiones al aplicar una determinada vibración de color, conecto con una sensación de éxtasis, como una pulsión de fundirme en una vibración divina. La luz iluminando partes del cuerpo descubre con capas muy delgadas y traslúcidas el camino que siento hacia lo sublime. Las corrientes delicadas de las luces y sus tonos se imprimen, de algún modo, también en mi cuerpo y en mi mente.',
                        'Los procesos pictóricos son un espejo, generando un espacio donde mis carencias y miedos se van viendo revelados tímidamente, donde danzan mis dualidades internas. Espacio donde es posible un encuentro conmigo misma, un encuentro en el que mi hacer caótico y desbordado busca contener(se) de todo lo que va quedando fijado.'
                    ],
                    media: [
                        {
                            type: 'video',
                            poster: '/images/expos/video_expo_6_poster.jpg',
                            sources: [
                                { src: '/images/expos/video_expo_6.webm', type: 'video/webm' },
                                { src: '/images/expos/video_expo_6.mp4', type: 'video/mp4' }
                            ]
                        },
                        {
                            type: 'video',
                            poster: '/images/expos/video_expo_5_poster.jpg',
                            sources: [
                                { src: '/images/expos/video_expo_5.webm', type: 'video/webm' },
                                { src: '/images/expos/video_expo_5.mp4', type: 'video/mp4' }
                            ]
                        }
                    ]
                }
            },
            {
                id: 2,
                title: 'Exposición colectiva',
                date: 'Muestra de arte contemporáneo MGA, 2024',
                thumbnail: '/images/expos/expo2_3.jpg',
                subtitle: 'Autocensura',
                content: {
                    description: [
                        'Oculto, reprimo, me callo.',
                        'Experimentando un deterioro',
                        'y una deformación.'
                    ],
                    details: 'Autocensura. Óleo sobre lienzo, 130x89cm, 2024',
                    media: [
                        {
                            type: 'video',
                            poster: '/images/expos/video_expo_7_poster.jpg',
                            sources: [
                                { src: '/images/expos/video_expo_7.webm', type: 'video/webm' },
                                { src: '/images/expos/video_expo_7.mp4', type: 'video/mp4' }
                            ]
                        },
                        {
                            type: 'image',
                            src: '/images/expos/expo2_1.jpg',
                            alt: 'Exposición colectiva - Imagen 1'
                        },
                        {
                            type: 'image',
                            src: '/images/expos/expo2_2.jpg',
                            alt: 'Exposición colectiva - Imagen 2'
                        },
                        {
                            type: 'image',
                            src: '/images/expos/expo2_3.jpg',
                            alt: 'Exposición colectiva - Imagen 3'
                        }
                    ]
                }
            }
        ];
        
        this.currentExpo = null;
        this._cleanupFunctions = [];
        this._isExpoClick = false;
        this.resizeObserver = null;
    }

    async init() {
        await super.init();
        this.setTitle('Exposiciones');
        
        if (this.currentExpo) {
            this.renderExpo(this.currentExpo);
        } else {
            this.renderGrid();
        }
        
        this.setupEvents();
        return this;
    }

    renderGrid() {
        this.container.innerHTML = `
            <section class="${styles.exposicionesGrid}">
                <div class="container">
                    <div class="${styles.grid}">
                        ${this.exposiciones.map(expo => `
                            <article class="${styles.expoItem}" data-expo-id="${expo.id}" role="button" tabindex="0">
                                <div class="${styles.thumbnail}">
                                    <img src="${expo.thumbnail}" alt="${expo.title}" loading="lazy">
                                </div>
                                <div class="${styles.info}">
                                    <h3>${expo.title}</h3>
                                    <p class="${styles.date}">${expo.date}</p>
                                </div>
                            </article>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    renderExpo(expo) {
        this.container.innerHTML = `
            <section class="${styles.exposicionDetalle}">
                <div class="container">
                    <div class="${styles.content}">
                        <h2>${expo.title}</h2>
                        <h3>${expo.subtitle}</h3>
                        <div class="${styles.text}">
                            ${expo.content.description.map(paragraph => `
                                <p>${paragraph}</p>
                            `).join('')}
                        </div>
                        <div class="${styles.mediaContainer}">
                            ${expo.content.media.map(media => `
                                ${media.type === 'video' ? `
                                    <video 
                                        class="${styles.video}" 
                                        controls 
                                        preload="none"
                                        playsinline
                                        poster="${media.poster}"
                                    >
                                        ${media.sources.map(source => `
                                            <source src="${source.src}" type="${source.type}">
                                        `).join('')}
                                        Tu navegador no soporta el elemento video.
                                    </video>
                                ` : `
                                    <img 
                                        src="${media.src}" 
                                        alt="${media.alt || ''}" 
                                        class="${styles.image}"
                                        loading="lazy"
                                    />
                                `}
                            `).join('')}
                        </div>
                        ${expo.content.details ? `
                            <div class="${styles.details}">
                                <p>${expo.content.details}</p>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </section>
        `;

        // Configurar el ResizeObserver para los elementos multimedia
        this.setupResizeObserver();
    }

    setupResizeObserver() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }

        this.resizeObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                this.resizeGridItem(entry.target);
            });
        });

        const mediaItems = this.container.querySelectorAll(`.${styles.image}, .${styles.video}`);
        mediaItems.forEach(item => {
            this.resizeObserver.observe(item);
        });
    }

    resizeGridItem(item) {
        if (!item || !this.container) return;

        const container = item.closest(`.${styles.mediaContainer}`);
        if (!container) return;

        const rowHeight = 1;
        const rowGap = parseInt(window.getComputedStyle(container).rowGap) || 10;
        
        const contentHeight = item.getBoundingClientRect().height;
        const rowSpan = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));
        
        item.style.setProperty('--span', rowSpan);
    }

    setupEvents() {
        // Limpiar eventos anteriores
        this._cleanupFunctions.forEach(cleanup => cleanup());
        this._cleanupFunctions = [];

        // Eventos para el grid
        const items = this.container.querySelectorAll(`.${styles.expoItem}`);
        
        items.forEach(item => {
            const handler = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const id = parseInt(item.dataset.expoId);
                this.currentExpo = this.exposiciones.find(expo => expo.id === id);
                this._isExpoClick = true;
                this.init();
            };

            item.style.cursor = 'pointer';
            item.addEventListener('click', handler, true);
            this._cleanupFunctions.push(() => item.removeEventListener('click', handler, true));
        });

        // Manejar el botón de exposiciones del menú
        const expoHandler = (e) => {
            const link = e.target.closest('a[href="/exposiciones"]');
            if (link) {
                e.preventDefault();
                e.stopPropagation();
                this.currentExpo = null;
                this.init();
            }
        };

        document.addEventListener('click', expoHandler, true);
        this._cleanupFunctions.push(() => document.removeEventListener('click', expoHandler, true));
    }

    getPrevExpo(currentId) {
        const currentIndex = this.exposiciones.findIndex(expo => expo.id === currentId);
        return this.exposiciones[currentIndex - 1];
    }

    getNextExpo(currentId) {
        const currentIndex = this.exposiciones.findIndex(expo => expo.id === currentId);
        return this.exposiciones[currentIndex + 1];
    }

    destroy() {
        this._cleanupFunctions.forEach(cleanup => cleanup());
        this._cleanupFunctions = [];
        super.destroy();
    }
}