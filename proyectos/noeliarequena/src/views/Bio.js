import { BaseView } from './BaseView.js';
import styles from '../css/modules/bio.module.css';
import { TabLink } from '../js/components/TabLink.js';

export class Bio extends BaseView {
    constructor(container) {
        super(container);
        this.tabLink = null;
    }

    async init() {
        await super.init();
        this.setTitle('Bio');
        
        this.container.innerHTML = `
            <section class="${styles.bio} container">
                <div class="grid gap-8">
                    <div class="col-span-12 md:col-span-6">
                        <div class="${styles.avatarContainer}">
                            <img 
                                src="/images/avatar.jpg" 
                                alt="Noelia Requena" 
                                class="${styles.avatar}"
                                loading="lazy"
                                onload="this.classList.add('${styles.loaded}')"
                            />
                        </div>
                    </div>
                    
                    <div class="col-span-12 md:col-span-6">
                        <div class="${styles.bioContent}">
                            <div id="bio-tabs" class="${styles.bioTabs}"></div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        // Initialize tabs
        const tabsContainer = this.container.querySelector('#bio-tabs');
        if (!tabsContainer) {
            console.error('Bio tabs container not found');
            return this;
        }

        const tabs = [
            {
                label: 'EN',
                content: `
                    <blockquote class="emphasis">
                        "When one becomes aware of the mystery of existence and does not understand it, but out of sheer sincerity and inner coherence, she needs answers even to the pain, then one finds her golden and wonderful Ariadna's thread"
                    </blockquote>
                    <p class="${styles.quoteAuthor}">
                        — Blas Cubells
                    </p>
                    
                    <dl>
                        <dt>Born in Vic (Barcelona) in 1976.</dt>
                        <dt>1985-1991</dt>
                        <dd>
                            During my childhood I trained at the
                            <i>Escola de dibuix i art Masferrer</i> in Vic with the teachers
                            Pere Isern Puntí, Eduard Xandri Calvet, Lluís Bres Oliva, Lluís Gros
                            Pujol...
                        </dd>
            
                        <dt>1994-1995</dt>
                        <dd>
                            Studied at the
                            <i>Escola d'arts aplicades i oficis artístics</i> (School of Applied
                            Arts and Crafts) in Vic.
                        </dd>
                        <dt>1997-2001</dt>
                        <dd>
                            Degree in Fashion Design from the
                            <i>Escola Superior de Disseny Bau</i> in Barcelona.
                        </dd>
                        <dt>2000-2001</dt>
                            <dd>Millinery workshop in Barcelona with <i>Nina Pawloswsky</i>.</dd>
                        <dt>1999-2004</dt>
                        <dd>
                        Began working with the women's fashion brand
                        <i>Giménez&amp;Zuazo</i> and its other brand <i>Boba by G&amp;Z</i>,
                        with distribution nationally and internationally through 250
                        multi-brands channels in Spain, France, Italy, Japan and others.
                        </dd>
            
                        <dd>
                            Under the leadership of the partners, co-managed the design
                            department. I was responsible for the entire design process and the
                            illustrations, developing the collections, researching the latest
                            looks and trends, design, drafting and supervising the technical
                            specifications, coordination with the patterns team, managing
                            accessories and materials, coordination with fabric printing and production companies.
                        </dd>
                        <dt>2004-2010</dt>
                        <dd>
                            Creative director and founding partner of the women's fashion brand
                            Obvia. Development of the business idea, part of the management
                            team, co-director of the design department, director of production,
                            director of sales. National distribution to multi-brand points of
                            sale in Spain. Local production.
                        </dd>
                        <dt>2010-2018</dt>
                        <dd>
                            Freelance Textile Graphic Designer. Designer of prints for women, men and children's clothing&nbsp;for
                            <i>Padma Diseño S.L., Zara, Pull&amp;Bear, Bershka, Mango, Replay, Springfield, Blue Inc., Studio F Women / STF Group Colombia</i>...
                        </dd>
            
                        <dt>2019</dt>
                        <dd>
                        Left the world of fashion and illustration to begin looking for a
                        more intimate mode of expression.
                        </dd>
                        <dd>
                        In parallel with my professional career, I maintained a constant
                        level of training in the art world, with incursions into a variety
                        of techniques such as lacquer, ceramics, sculpture, oils, art for
                        children, artist books, as well as astrology and active learning.
                        </dd>
                        <dd>
                        Currently, I live with my partner, the multidisciplinary artist
                        Sergio Forés. Mother to two children and searching for alternative
                        ways of life and education. In 2014 I moved to a small village in
                        Alt Penedès surrounded by vineyards and nature.
                        </dd>
                    </dl>
                `
            },
            {
                label: 'ES',
                content: `
                    <blockquote class="emphasis">
                        "Cuando uno toma conciencia del misterio de la existencia y no lo entiende, pero por pura sinceridad y coherencia interior, necesita respuestas hasta el dolor, entonces encuentra su dorado y maravilloso hilo de Ariadna"
                    </blockquote>
                    <p class="${styles.quoteAuthor}">
                        — Blas Cubells
                    </p>
                    
                    <dl>
                        <dt>Nacida en Vic (Barcelona) en 1976.</dt>
                        <dt>1985-1991</dt>
                        <dd>
                            Durante mi infancia me formé en la
                            <i>Escola de dibuix i art Masferrer</i> de Vic con los profesores
                            Pere Isern Puntí, Eduard Xandri Calvet, Lluís Bres Oliva, Lluís Gros
                            Pujol...
                        </dd>
            
                        <dt>1994-1995</dt>
                        <dd>
                            Estudié en la
                            <i>Escola d'arts aplicades i oficis artístics</i> de Vic.
                        </dd>
                        <dt>1997-2001</dt>
                        <dd>
                            Graduada en Diseño de Moda por la
                            <i>Escola Superior de Disseny Bau</i> de Barcelona.
                        </dd>
                        <dt>2000-2001</dt>
                            <dd>Taller de sombrerería en Barcelona con <i>Nina Pawloswsky</i>.</dd>
                        <dt>1999-2004</dt>
                        <dd>
                        Comencé a trabajar con la marca de moda femenina
                        <i>Giménez&amp;Zuazo</i> y su otra marca <i>Boba by G&amp;Z</i>,
                        con distribución nacional e internacional a través de 250
                        canales multimarca en España, Francia, Italia, Japón y otros.
                        </dd>
            
                        <dd>
                            Bajo la dirección de los socios, cogestioné el departamento de diseño.
                            Fui responsable de todo el proceso de diseño y las ilustraciones,
                            desarrollo de colecciones, investigación de las últimas tendencias,
                            diseño, redacción y supervisión de especificaciones técnicas,
                            coordinación con el equipo de patronaje, gestión de accesorios y
                            materiales, coordinación con empresas de estampación textil y producción.
                        </dd>
                        <dt>2004-2010</dt>
                        <dd>
                            Directora creativa y socia fundadora de la marca de moda femenina
                            Obvia. Desarrollo de la idea de negocio, parte del equipo directivo,
                            codirectora del departamento de diseño, directora de producción,
                            directora de ventas. Distribución nacional a puntos de venta
                            multimarca en España. Producción local.
                        </dd>
                        <dt>2010-2018</dt>
                        <dd>
                            Diseñadora Gráfica Textil Freelance. Diseñadora de estampados para ropa de mujer, hombre y niños&nbsp;para
                            <i>Padma Diseño S.L., Zara, Pull&amp;Bear, Bershka, Mango, Replay, Springfield, Blue Inc., Studio F Women / STF Group Colombia</i>...
                        </dd>
            
                        <dt>2019</dt>
                        <dd>
                        Dejé el mundo de la moda y la ilustración para comenzar a buscar un
                        modo de expresión más íntimo.
                        </dd>
                        <dd>
                        En paralelo a mi carrera profesional, mantuve una formación constante
                        en el mundo del arte, con incursiones en diversas técnicas como la
                        laca, la cerámica, la escultura, el óleo, el arte para niños, los
                        libros de artista, así como la astrología y el aprendizaje activo.
                        </dd>
                        <dd>
                        Actualmente, vivo con mi pareja, el artista multidisciplinar
                        Sergio Forés. Madre de dos hijos y en búsqueda de formas alternativas
                        de vida y educación. En 2014 me mudé a un pequeño pueblo del
                        Alt Penedès rodeado de viñedos y naturaleza.
                        </dd>
                    </dl>
                `
            }
        ];

        this.tabLink = new TabLink(tabsContainer, tabs);

        return this;
    }

    destroy() {
        if (this.tabLink) {
            this.tabLink = null;
        }
        super.destroy();
    }
}
