export class Menu {
    constructor() {
        this.menuElement = null;
    }

    init() {
        this.menuElement = document.querySelector('.menu');
        // Aquí irá la lógica del menú
    }

    toggle() {
        if (this.menuElement) {
            this.menuElement.classList.toggle('menu--open');
        }
    }
}
