import { Router } from './utils/router';
import { helpers } from './utils/helpers';

// Components
import { Preloader } from './components/Preloader';

// Controllers
import { BaseController } from './controllers/BaseController';
import { LabController } from './controllers/LabController';
import { ObraController } from './controllers/ObraController';
import { VisionController } from './controllers/VisionController';

class App {
    constructor() {
        this.router = new Router();
        this.preloader = new Preloader();
        this.initializeControllers();
        this.initializeRoutes();
    }

    initializeControllers() {
        this.baseController = new BaseController();
        this.labController = new LabController();
        this.obraController = new ObraController();
        this.visionController = new VisionController();
    }

    initializeRoutes() {
        this.router.addRoute('/', () => this.baseController.index());
        this.router.addRoute('/lab', () => this.labController.index());
        this.router.addRoute('/obra', () => this.obraController.index());
        this.router.addRoute('/vision', () => this.visionController.index());
    }

    start() {
        this.preloader.init();
        this.router.init();
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.start();
});
