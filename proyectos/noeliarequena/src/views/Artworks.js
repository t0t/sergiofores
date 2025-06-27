import { BaseView } from './BaseView.js';
import styles from '../css/modules/artworks.module.css';
import { ImageLoader } from '../js/modules/ImageLoader.js';
import { GalleryStore } from '../js/store/gallery.js';

export class Artworks extends BaseView {
    constructor(container) {
        super(container);
        this.artworks = [
            {
                src: '/images/obras/img1.jpg',
                title: 'Obra 1',
                description: 'Óleo sobre madera. 58x44cm, 2022',
                width: 800,
                height: 1200
            },
            {
                src: '/images/obras/img2.jpg',
                title: 'Obra 2',
                description: 'Óleo sobre lienzo. 31x23cm, 2019',
                width: 1200,
                height: 800
            },
            {
                src: '/images/obras/img3.jpg',
                title: 'Obra 3',
                description: 'Óleo sobre lienzo. 31x23cm, 2019',
                width: 800,
                height: 1200
            },
            {
                src: '/images/obras/img4.jpg',
                title: 'Obra 4',
                description: 'Óleo sobre papel. 31x21cm, 2019',
                width: 1200,
                height: 800
            },
            {
                src: '/images/obras/img5.jpg',
                title: 'Obra 5',
                description: 'Óleo sobre madera. 61x50cm, 2019',
                width: 800,
                height: 1200
            },
            {
                src: '/images/obras/img6.jpg',
                title: 'Obra 6',
                description: 'Óleo sobre madera. 41x33cm, 2019',
                width: 1200,
                height: 800
            },
            {
                src: '/images/obras/img7.jpg',
                title: 'Obra 7',
                description: 'Óleo sobre madera. 50x50cm, 2019',
                width: 800,
                height: 1200
            },
            {
                src: '/images/obras/img8.jpg',
                title: 'Obra 8',
                description: 'Óleo sobre madera. 100x100cm, 2019',
                width: 1200,
                height: 800
            },
            {
                src: '/images/obras/img9.jpg',
                title: 'Obra 9',
                description: 'Óleo sobre madera. 122x60.5cm, 2019',
                width: 800,
                height: 1200
            },
            {
                src: '/images/obras/img10.jpg',
                title: 'Obra 10',
                description: 'Óleo sobre lienzo. 116x81cm, 2019',
                width: 1200,
                height: 800
            },
            {
                src: '/images/obras/img11.jpg',
                title: 'Obra 11',
                description: 'Óleo sobre lienzo. 116x81cm, 2019',
                width: 800,
                height: 1200
            },
            {
                src: '/images/obras/img12.jpg',
                title: 'Obra 12',
                description: 'Óleo sobre madera. 73x55cm, 2019',
                width: 1200,
                height: 800
            },
            {
                src: '/images/obras/img13.jpg',
                title: 'Obra 13',
                description: 'Óleo sobre madera. 73x55cm, 2019',
                width: 800,
                height: 1200
            },
            {
                src: '/images/obras/img14.jpg',
                title: 'Obra 14',
                description: 'Óleo sobre madera. 80x65cm, 2020',
                width: 1200,
                height: 800
            },
            {
                src: '/images/obras/img15.jpg',
                title: 'Obra 15',
                description: 'Óleo sobre madera. 92x73cm, 2020',
                width: 800,
                height: 1200
            },
            {
                src: '/images/obras/img19.jpg',
                title: 'Obra 19',
                description: 'Óleo sobre madera. 100x40cm, 2020',
                width: 800,
                height: 1200
            },
            {
                src: '/images/obras/img20.jpg',
                title: 'Obra 20',
                description: 'Óleo sobre madera. 122x60.5cm, 2020',
                width: 1200,
                height: 800
            },
            {
                src: '/images/obras/img21.jpg',
                title: 'Obra 21',
                description: 'Óleo sobre madera. 92x73cm, 2020',
                width: 800,
                height: 1200
            },
            {
                src: '/images/obras/img22.jpg',
                title: 'Obra 22',
                description: 'Óleo sobre madera. 58x44cm, 2021',
                width: 1200,
                height: 800
            },
            {
                src: '/images/obras/img23.jpg',
                title: 'Obra 23',
                description: 'Óleo sobre lienzo. 90x73cm, 2021',
                width: 800,
                height: 1200
            },
            {
                src: '/images/obras/img24.jpg',
                title: 'Obra 24',
                description: 'Óleo sobre lienzo. 92x73cm, 2021',
                width: 1200,
                height: 800
            },
            {
                src: '/images/obras/img25.jpg',
                title: 'Obra 25',
                description: 'Óleo sobre lienzo. 100x100cm, 2021',
                width: 800,
                height: 1200
            },
            {
                src: '/images/obras/img26.jpg',
                title: 'Obra 26',
                description: 'Óleo sobre madera. 100x100cm, 2021',
                width: 1200,
                height: 800
            },
            {
                src: '/images/obras/img27.jpg',
                title: 'Obra 27',
                description: 'Óleo sobre lienzo. 140x81cm, 2021',
                width: 800,
                height: 1200
            },
            {
                src: '/images/obras/img28.jpg',
                title: 'Obra 28',
                description: 'Óleo sobre lienzo, 120x100cm, 2021',
                width: 1200,
                height: 800
            },
            {
                src: '/images/obras/img29.jpg',
                title: 'Obra 29',
                description: 'Óleo sobre lienzo, 146x97cm, 2023',
                width: 800,
                height: 1200
            },
            {
                src: '/images/obras/img30.jpg',
                title: 'Obra 30',
                description: 'Óleo sobre lienzo, 146x89cm, 2023',
                width: 1200,
                height: 800
            },
            {
                src: '/images/obras/img31.jpg',
                title: 'Obra 31',
                description: 'Óleo sobre lienzo, 146x89cm, 2023',
                width: 800,
                height: 1200
            },
            {
                src: '/images/obras/img32.jpg',
                title: 'Obra 32',
                description: 'Óleo sobre lienzo, 130x89cm, 2022',
                width: 1200,
                height: 800
            },
            {
                src: '/images/obras/img33.jpg',
                title: 'Obra 33',
                description: 'Óleo sobre lienzo, 146x97cm, 2023',
                width: 800,
                height: 1200
            },
            {
                src: '/images/obras/img34.jpg',
                title: 'Obra 34',
                description: 'Óleo sobre lienzo, 130x89cm, 2022',
                width: 1200,
                height: 800
            },
            {
                src: '/images/obras/img35.jpg',
                title: 'Obra 35',
                description: 'Óleo sobre lienzo,100x100cm, 2021',
                width: 800,
                height: 1200
            },
            {
                src: '/images/obras/img36.jpg',
                title: 'Obra 36',
                description: 'Óleo sobre lienzo,130x89cm, 2023',
                width: 1200,
                height: 800
            },
            {
                src: '/images/obras/img37.jpg',
                title: 'Obra 37',
                description: 'Óleo sobre lienzo, 146x114cm, 2024',
                width: 800,
                height: 1200
            },
            {
                src: '/images/obras/img38.jpg',
                title: 'Obra 38',
                description: 'Óleo sobre lienzo, 146x114cm, 2024',
                width: 800,
                height: 1200
            },
            {
                src: '/images/obras/img39.jpg',
                title: 'Obra 39',
                description: 'Óleo sobre lienzo, 130x89cm, 2023',
                width: 1200,
                height: 800
            },
            {
                src: '/images/obras/img40.jpg',
                title: 'Obra 40',
                description: 'Óleo sobre lienzo, 150x90cm, 2023',
                width: 800,
                height: 1200
            },
            {
                src: '/images/obras/img41.jpg',
                title: 'Obra 41',
                description: 'Óleo sobre lienzo, 130x80cm, 2023',
                width: 1200,
                height: 800
            }
        ].map((artwork, index) => ({
            ...artwork,
            width: (index % 2 === 0) ? 800 : 1200,
            height: (index % 2 === 0) ? 1200 : 800
        }));
        this.galleryStore = new GalleryStore();
        this.resizeObserver = null;
        this._boundResizeHandler = this.handleResize.bind(this);
    }

    async init() {
        await super.init();
        this.setTitle('Artworks');
        
        this.container.innerHTML = `
            <section class="${styles.artworks}">
                <div class="container">
                    <div class="grid gap-4">
                    </div>
                </div>
                <div class="${styles.masonryGrid}">
                    ${this.generateArtworksHTML()}
                </div>
                <div class="${styles.review} container">
                    <div class="${styles.tabs}">
                        <button class="${styles.tablink} ${styles.active}" data-lang="en">EN</button>
                        <button class="${styles.tablink}" data-lang="es">ES</button>
                    </div>
                    
                    <div id="en" class="${styles.tabcontent} ${styles.active}">
                        <h3>Review</h3>
                        <p>"A body in space. A tremor in time. A process of light and shade. Once revealed, the body disintegrates and is deconstructed. A spontaneous crystallisation of dynamic contrasts. A chiaroscuro of fragility and power, cold and heat. The body is a temple of tensions; hermetic, open and shut at the same time, existing only in the logic of membranes. Light that passes through, reflected like the nervous shade of something more. The ornament of the oils captures it like an insect in amber. Frozen but at the same time fluttering. An encrypted longing, like a puzzle in multiple dimensions. The precise and graceful line (a calligraphy of mysteries), unravelling the inexhaustible mystery of beauty. Ariadne's thread entangling. A dark profession. The beauty of horror and the horror of beauty. We need the contrast. The balance in the contradiction. Always the light and the shade, the chiaroscuro...</p>

                        <p>As in the Japanese technique, kintsugi, the lacquer repairs the cracks in the broken ceramic, which is the body. There is a beauty in the crack, like a latent sign of its interior life: vortex of a wound made manifest on the outside. Cloth covers the shape like a gauze a mould. Skin as impasto. Life as a continuous moment of uncertainty. Are we free or are we confined within the coordinates of chance? This is the mystery of a body in a room, a body inhabiting a space, of a body being space. Existence is naked like a question in the void, spilling over the morning air, reflected in the light coming through the window. In this frame, in this space we celebrate the mystery of life."</p>
                        <p class="${styles.author}">— Román Bayarri</p>
                    </div>
                    
                    <div id="es" class="${styles.tabcontent}">
                        <h3>Reseña</h3>
                        <p>"Un cuerpo en el espacio. Un temblor en el tiempo. Un proceso de luz y sombra. Una vez revelado, el cuerpo se desintegra y se deconstruye. Una cristalización espontánea de contrastes dinámicos. Un claroscuro de fragilidad y poder, frío y calor. El cuerpo es un templo de tensiones; hermético, abierto y cerrado al mismo tiempo, existiendo solo en la lógica de las membranas. Luz que atraviesa, reflejada como la sombra nerviosa de algo más. El ornamento de los óleos lo captura como un insecto en ámbar. Congelado pero al mismo tiempo revoloteando. Un anhelo encriptado, como un rompecabezas en múltiples dimensiones. La línea precisa y grácil (una caligrafía de misterios), desentrañando el misterio inagotable de la belleza. El hilo de Ariadna enredándose. Una profesión oscura. La belleza del horror y el horror de la belleza. Necesitamos el contraste. El equilibrio en la contradicción. Siempre la luz y la sombra, el claroscuro...</p>
                        <p>Como en la técnica japonesa, kintsugi, la laca repara las grietas en la cerámica rota, que es el cuerpo. Hay una belleza en la grieta, como un signo latente de su vida interior: vórtice de una herida que se manifiesta en el exterior. La tela cubre la forma como una gasa un molde. La piel como empaste. La vida como un momento continuo de incertidumbre. ¿Somos libres o estamos confinados dentro de las coordenadas del azar? Este es el misterio de un cuerpo en una habitación, un cuerpo habitando un espacio, de un cuerpo siendo espacio. La existencia está desnuda como una pregunta en el vacío, derramándose sobre el aire de la mañana, reflejada en la luz que entra por la ventana. En este marco, en este espacio celebramos el misterio de la vida."</p>
                        <p class="${styles.author}">— Román Bayarri</p>
                    </div>
                </div>
            </section>
        `;

        // Inicializar el store de la galería
        this.galleryStore.setItems(this.artworks);

        // Configurar eventos
        this.setupGalleryEvents();
        window.addEventListener('resize', this._boundResizeHandler);

        // Asegurarnos de que las imágenes se cargan y el masonry se inicializa
        requestAnimationFrame(async () => {
            try {
                await this.loadAndResizeImages();
            } catch (error) {
            }
        });

        return this;
    }

    resizeGridItem(item) {
        if (!item || !this.container) return;

        const grid = this.container.querySelector(`.${styles.masonryGrid}`);
        if (!grid) return;

        const rowHeight = parseInt(window.getComputedStyle(grid).gridAutoRows) || 1;
        const rowGap = parseInt(window.getComputedStyle(grid).rowGap) || 10;
        
        const contentHeight = item.getBoundingClientRect().height;
        const rowSpan = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));
        
        item.style.setProperty('--span', rowSpan);
    }

    handleResize() {
        const images = this.container.querySelectorAll(`.${styles.artworkImage}`);
        images.forEach(image => this.resizeGridItem(image));
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

        const images = this.container.querySelectorAll(`.${styles.artworkImage}`);
        images.forEach(image => {
            this.resizeObserver.observe(image);
        });
    }

    async loadAndResizeImages() {
        const imageLoadPromises = [];
        const images = this.container.querySelectorAll(`.${styles.artworkImage}`);
        
        images.forEach(img => {
            imageLoadPromises.push(new Promise(resolve => {
                if (img.complete) {
                    this.resizeGridItem(img);
                    resolve();
                } else {
                    img.onload = () => {
                        this.resizeGridItem(img);
                        resolve();
                    };
                    img.onerror = () => {
                        resolve();
                    };
                }
            }));
        });

        await Promise.all(imageLoadPromises);
    }

    generateArtworksHTML() {
        return this.artworks.map((artwork, index) => {
            return `
                <img 
                    class="${styles.artworkImage}"
                    src="${artwork.src}"
                    alt="${artwork.title}"
                    loading="lazy"
                    width="${artwork.width}"
                    height="${artwork.height}"
                    data-index="${index}"
                />
            `;
        }).join('');
    }

    setupGalleryEvents() {
        const images = this.container.querySelectorAll(`.${styles.artworkImage}`);
        images.forEach(image => {
            image.addEventListener('click', (e) => {
                e.preventDefault();
                const index = parseInt(image.dataset.index);
                if (!isNaN(index)) {
                    this.galleryStore.open(index);
                }
            });
        });

        // Setup language tabs
        const tabs = this.container.querySelectorAll(`.${styles.tablink}`);
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const lang = tab.dataset.lang;
                
                // Update active tab
                tabs.forEach(t => t.classList.remove(styles.active));
                tab.classList.add(styles.active);
                
                // Update active content
                const contents = this.container.querySelectorAll(`.${styles.tabcontent}`);
                contents.forEach(content => {
                    if (content.id === lang) {
                        content.classList.add(styles.active);
                    } else {
                        content.classList.remove(styles.active);
                    }
                });
            });
        });
    }

    destroy() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }

        window.removeEventListener('resize', this._boundResizeHandler);

        const images = this.container.querySelectorAll(`.${styles.artworkImage}`);
        images.forEach(image => {
            image.removeEventListener('click', () => {});
        });
        
        super.destroy();
    }
}
