import styles from '../../css/modules/header.module.css';

export class Header {
    constructor(container) {
        this.container = container;
        if (!this.container) {
            throw new Error('Header container not found');
        }
        this.render();
        this.addEventListeners();
    }

    render() {
        this.container.innerHTML = `
            <header class="${styles.header}">
                <a href="/" class="${styles.logo}" data-link>
                    <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:bevel;stroke-miterlimit:1.5" viewBox="0 0 408 409">
                        <circle cx="102436" cy="13938.8" r="553.055" style="fill:none;stroke-width:22.12px" transform="matrix(.36163 0 0 .36163 -36839.796 -4836.64)"/>
                        <circle cx="102436" cy="13938.8" r="553.055" style="fill:none;stroke-width:33.18px" transform="matrix(.2411 0 0 .2411 -24493.885 -3223.357)"/>
                        <circle cx="102436" cy="13938.8" r="553.055" style="fill:none;stroke-width:66.36px" transform="translate(-12144.912 -1476.333) scale(.12055)"/>
                        <circle cx="102436" cy="13938.8" r="553.055" style="fill:none;stroke-width:33.18px" transform="matrix(.2411 0 0 .2411 -24493.885 -3090.011)"/>
                    </svg>
                </a>
            </header>
        `;
    }

    addEventListeners() {
        // Asegurar que el logo siempre sea clicable
        const logo = this.container.querySelector(`.${styles.logo}`);
        if (logo) {
            logo.addEventListener('click', (e) => {
                e.preventDefault();
                const router = window.router || (window.app && window.app.router);
                if (router) {
                    router.navigate('/', false);
                } else {
                    window.location.href = '/';
                }
            });
        }
    }

    destroy() {
        // Limpiar event listeners
        const logo = this.container.querySelector(`.${styles.logo}`);
        if (logo) {
            logo.removeEventListener('click', () => {});
        }
    }
}
