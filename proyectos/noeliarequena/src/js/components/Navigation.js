import styles from '../../css/modules/navigation.module.css';

export class Navigation {
    constructor(container) {
        this.container = container;
        if (!this.container) {
            throw new Error('Navigation container not found');
        }
        this.isMenuOpen = false;
        this.render();
        this.addEventListeners();
    }

    render() {
        this.container.innerHTML = `
            <nav id="navbar" class="${styles.menu}" aria-label="Menú principal">
                <button class="${styles.hamburger}" 
                        aria-expanded="false"
                        aria-controls="main-menu"
                        aria-label="Abrir menú">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </button>
                <div id="main-menu" class="${styles.menuItems}" role="menu">
                    <a href="/exposiciones" data-link role="menuitem">expo</a>
                    <a href="/artworks" data-link role="menuitem">artworks</a>
                    <a href="/bio" data-link role="menuitem">bio</a>
                </div>
            </nav>
        `;

        // Marcar el enlace activo
        this.updateActiveLink();
    }

    addEventListeners() {
        // Toggle menú en móvil
        const hamburger = this.container.querySelector(`.${styles.hamburger}`);
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                this.isMenuOpen = !this.isMenuOpen;
                hamburger.classList.toggle(styles.active);
                hamburger.setAttribute('aria-expanded', this.isMenuOpen);
                this.container.querySelector(`.${styles.menuItems}`).classList.toggle(styles.active);
                document.body.classList.toggle('menu-active');
            });

            // Soporte para teclado
            hamburger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    hamburger.click();
                }
            });
        }

        // Cerrar menú al hacer click en un enlace
        const menuItems = this.container.querySelectorAll(`.${styles.menuItems} a`);
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => this.handleClick(e));

            // Soporte para teclado en los enlaces
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleClick(e);
                }
            });
        });

        // Gestionar el foco dentro del menú
        const handleTabKey = (e) => {
            if (!this.isMenuOpen) return;
            
            const focusableElements = this.container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };

        this.container.addEventListener('keydown', handleTabKey);

        // Cerrar menú al hacer scroll
        let lastScroll = window.scrollY;
        window.addEventListener('scroll', () => {
            if (window.innerWidth > 768) {
                const currentScroll = window.scrollY;
                const navbar = document.getElementById('navbar');
                
                if (currentScroll > lastScroll && currentScroll > 100) {
                    // Scrolling down
                    navbar.classList.add(styles.hidden);
                    if (this.isMenuOpen) {
                        this.isMenuOpen = false;
                        hamburger.classList.remove(styles.active);
                        hamburger.setAttribute('aria-expanded', 'false');
                        this.container.querySelector(`.${styles.menuItems}`).classList.remove(styles.active);
                        document.body.classList.remove('menu-active');
                    }
                } else {
                    // Scrolling up
                    navbar.classList.remove(styles.hidden);
                }
                lastScroll = currentScroll;
            }
        });

        // Actualizar el enlace activo cuando cambia la ruta
        window.addEventListener('popstate', () => this.updateActiveLink());
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-link]')) {
                setTimeout(() => this.updateActiveLink(), 0);
            }
        });
    }

    handleClick(e) {
        const link = e.target.closest('[data-link]');
        if (link) {
            e.preventDefault();
            const href = link.getAttribute('href');
            
            // Si estamos en la misma ruta, disparar un evento de reseteo
            if (href === window.location.pathname) {
                window.dispatchEvent(new CustomEvent('resetView'));
            }
            
            window.router.navigate(href);

            // Cerrar el menú después de navegar
            if (window.innerWidth <= 768) {
                this.isMenuOpen = false;
                const hamburger = this.container.querySelector(`.${styles.hamburger}`);
                hamburger.classList.remove(styles.active);
                hamburger.setAttribute('aria-expanded', 'false');
                this.container.querySelector(`.${styles.menuItems}`).classList.remove(styles.active);
                document.body.classList.remove('menu-active');
            }
        }
    }

    updateActiveLink() {
        const currentPath = window.location.pathname;
        const links = this.container.querySelectorAll('a');
        
        links.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add(styles.active);
            } else {
                link.classList.remove(styles.active);
            }
        });
    }
}
