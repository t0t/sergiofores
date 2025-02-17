import { DataService } from './DataService.js';

export class LabService {
    constructor() {
        this.dataService = new DataService();
    }

    async getLabData() {
        try {
            const data = await this.dataService.fetchData('/src/data/lab.json');
            return data.lab;
        } catch (error) {
            console.error('Error al cargar los datos del Lab:', error);
            throw error;
        }
    }

    async getProyectos(categoria = 'todos') {
        try {
            const data = await this.getLabData();
            if (categoria === 'todos') return data.proyectos;
            
            return data.proyectos.filter(proyecto => 
                proyecto.categoria === categoria
            );
        } catch (error) {
            console.error('Error al obtener proyectos:', error);
            throw error;
        }
    }

    async getProyectoById(id) {
        try {
            const data = await this.getLabData();
            return data.proyectos.find(proyecto => proyecto.id === id);
        } catch (error) {
            console.error('Error al obtener proyecto por ID:', error);
            throw error;
        }
    }
}
