import { BaseModel } from './BaseModel.js';

export class VisionModel extends BaseModel {
    constructor() {
        super();
        this.data = {
            titulo: '',
            subtitulo: '',
            headings: [],
            frases1: [],
            frases2: [],
            frases3: [],
            galeria1: [],
            galeria2: [],
            codigos: []
        };
    }

    async load() {
        try {
            const response = await fetch('/data/vision.json');
            const data = await response.json();
            this.setData(data.vision);
            return this.getData();
        } catch (error) {
            console.error('Error cargando datos de visión:', error);
            throw error;
        }
    }

    getFrasesByHeading(headingIndex) {
        const frasesKey = `frases${headingIndex + 1}`;
        return this.data[frasesKey] || [];
    }

    getGaleriaByIndex(index) {
        const galeriaKey = `galeria${index + 1}`;
        return this.data[galeriaKey] || [];
    }

    getCodigos() {
        return this.data.codigos || [];
    }

    getCodigoByPalabra(palabra) {
        return this.data.codigos.find(codigo => 
            codigo.palabra.toLowerCase() === palabra.toLowerCase()
        );
    }

    searchCodigos(query) {
        const searchTerm = query.toLowerCase();
        return this.data.codigos.filter(codigo => 
            codigo.palabra.toLowerCase().includes(searchTerm) ||
            codigo.descripcion.toLowerCase().includes(searchTerm)
        );
    }

    validate() {
        return (
            Array.isArray(this.data.headings) &&
            Array.isArray(this.data.frases1) &&
            Array.isArray(this.data.frases2) &&
            Array.isArray(this.data.frases3) &&
            Array.isArray(this.data.galeria1) &&
            Array.isArray(this.data.galeria2) &&
            Array.isArray(this.data.codigos) &&
            typeof this.data.titulo === 'string' &&
            typeof this.data.subtitulo === 'string'
        );
    }
}
