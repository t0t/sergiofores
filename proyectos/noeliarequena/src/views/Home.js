import { BaseView } from './BaseView.js';
import styles from '../css/modules/home.module.css';
import Animator from '../js/modules/Animator.js';

export class Home extends BaseView {
    constructor(container) {
        super(container);
        this._cleanupFunctions = [];
        this.currentSlide = 0;
        this.slides = [
            {
                image: '/images/bg1.jpg',
                text: 'Un anhelo cifrado, <br>un enigma de muchas dimensiones...'
            },
            {
                image: '/images/bg2.jpg',
                text: 'La existencia se desnuda, <br> una pregunta en el vacío...'
            },
            {
                image: '/images/bg3.jpg',
                text: 'El cuerpo como un temblor en el tiempo, <br>como un proceso de luz y sombra.'
            },
            {
                image: '/images/bg4.jpg',
                text: 'El cuerpo como un templo de tensiones, <br>como un templo hermético abierto <br>y cerrado al mismo tiempo...'
            }
        ];
    }

    async render() {
        this.setTitle('Home');
        this.container.innerHTML = `
            <section class="${styles.hero}">
                <h1>Noelia Requena</h1>
            </section>

            <section class="${styles.intro}">
                <div class="container">
                    <div class="${styles.introContent}">
                        <div class="${styles.symbols}">
                            ☽ □ ♇
                        </div>
                        <p class="emphasis">Busco expresar la complejidad de las emociones humanas a través
                                de la pintura. Mi trabajo se centra en explorar la relación entre el cuerpo, la identidad y la
                                experiencia vivida.</p>
                    </div>
                </div>
            </section>

            <div class="${styles.slideshow}">
                ${this.slides.map((slide, index) => `
                    <section class="${styles.slide} ${index === 0 ? styles.active : ''}" 
                             style="background-image: url('${slide.image}')">
                        <div class="${styles.slideContent}">
                            <div class="${styles.slideText}">
                                ${slide.text}
                            </div>
                        </div>
                    </section>
                `).join('')}
                
                <div class="${styles.slideNav}">
                    <button class="${styles.prevSlide}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                        </svg>
                    </button>
                    <button class="${styles.nextSlide}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        this.initializeSlideshow();
    }

    initializeSlideshow() {
        const slideshow = this.container.querySelector(`.${styles.slideshow}`);
        const slides = this.container.querySelectorAll(`.${styles.slide}`);
        const prevBtn = this.container.querySelector(`.${styles.prevSlide}`);
        const nextBtn = this.container.querySelector(`.${styles.nextSlide}`);

        const goToSlide = (index) => {
            slides.forEach(slide => slide.classList.remove(styles.active));
            this.currentSlide = (index + slides.length) % slides.length;
            slides[this.currentSlide].classList.add(styles.active);
        };

        // Event listeners
        prevBtn.addEventListener('click', () => goToSlide(this.currentSlide - 1));
        nextBtn.addEventListener('click', () => goToSlide(this.currentSlide + 1));

        // Auto advance
        const autoAdvance = setInterval(() => {
            goToSlide(this.currentSlide + 1);
        }, 5000);

        // Cleanup
        this._cleanupFunctions.push(() => {
            clearInterval(autoAdvance);
            prevBtn.removeEventListener('click', () => {});
            nextBtn.removeEventListener('click', () => {});
        });
    }

    destroy() {
        this._cleanupFunctions.forEach(cleanup => cleanup());
        this._cleanupFunctions = [];
        super.destroy();
    }
}
