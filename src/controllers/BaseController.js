// Controlador base que implementa el patrón Observer
export class BaseController {
    constructor() {
        this.model = null;
        this.view = null;
        this.observers = [];
    }

    // Inicialización del controlador
    async init() {
        await this.loadModel();
        await this.loadView();
        this.setupEventListeners();
    }

    // Cargar el modelo
    async loadModel() {
        throw new Error('loadModel debe ser implementado por las clases hijas');
    }

    // Cargar la vista
    async loadView() {
        throw new Error('loadView debe ser implementado por las clases hijas');
    }

    // Configurar event listeners
    setupEventListeners() {
        // Implementar en clases hijas
    }

    // Patrón Observer
    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }

    // Métodos de utilidad
    async fetchData(url) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    // Validación de datos
    validateData(data, schema) {
        // Implementar validación según necesidades
        return true;
    }
}
