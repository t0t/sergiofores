import { DataService } from './DataService.js';

export class VisionService {
    constructor() {
        this.dataService = new DataService();
    }

    async getVisionData() {
        try {
            const data = await this.dataService.fetchData('/src/data/vision.json');
            return data.vision;
        } catch (error) {
            console.error('Error al cargar los datos de Visión:', error);
            throw error;
        }
    }

    async buscarCodigos(query) {
        try {
            const data = await this.getVisionData();
            if (!query) return data.codigos;
            
            return data.codigos.filter(codigo => 
                codigo.palabra.toLowerCase().includes(query.toLowerCase()) ||
                codigo.descripcion.toLowerCase().includes(query.toLowerCase())
            );
        } catch (error) {
            console.error('Error al buscar códigos:', error);
            throw error;
        }
    }

    async getSliderContent() {
        try {
            const data = await this.getVisionData();
            return {
                frases1: data.frases1,
                frases2: data.frases2,
                frases3: data.frases3
            };
        } catch (error) {
            console.error('Error al obtener contenido del slider:', error);
            throw error;
        }
    }
}
