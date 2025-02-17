import { BaseModel } from './BaseModel.js';

export class ObraModel extends BaseModel {
    constructor() {
        super();
        this.obras = [];
        this.currentObra = null;
    }

    async load() {
        try {
            const response = await fetch('/data/obras.json');
            const data = await response.json();
            this.setData(data.obras);
            return this.getData();
        } catch (error) {
            console.error('Error cargando obras:', error);
            throw error;
        }
    }

    getObraById(id) {
        return this.obras.find(obra => obra.id === id);
    }

    filterObrasByTag(tag) {
        return this.obras.filter(obra => obra.tags.includes(tag));
    }

    getCurrentObra() {
        return this.currentObra;
    }

    setCurrentObra(id) {
        this.currentObra = this.getObraById(id);
        this.notifyObservers();
    }

    validate() {
        return this.obras.every(obra => {
            return (
                obra.id &&
                obra.title &&
                obra.preview &&
                obra.imagen &&
                obra.description
            );
        });
    }
}
