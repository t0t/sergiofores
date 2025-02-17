import { DataService } from './DataService.js';

export class ObraService {
    constructor() {
        this.dataService = new DataService();
    }

    async getObras() {
        try {
            const cached = this.dataService.getCache('obras');
            if (cached) return cached;

            const obras = await this.dataService.fetchData('/data/obras.json');
            this.dataService.setCache('obras', obras);
            return obras;
        } catch (error) {
            console.error('Error obteniendo obras:', error);
            throw error;
        }
    }

    async getObraById(id) {
        try {
            const obras = await this.getObras();
            return obras.find(obra => obra.id === id);
        } catch (error) {
            console.error(`Error obteniendo obra ${id}:`, error);
            throw error;
        }
    }

    async searchObras(query) {
        try {
            const obras = await this.getObras();
            return obras.filter(obra => {
                const searchText = `${obra.title} ${obra.description}`.toLowerCase();
                return searchText.includes(query.toLowerCase());
            });
        } catch (error) {
            console.error('Error buscando obras:', error);
            throw error;
        }
    }

    async getObrasByTag(tag) {
        try {
            const obras = await this.getObras();
            return obras.filter(obra => obra.tags.includes(tag));
        } catch (error) {
            console.error(`Error obteniendo obras con tag ${tag}:`, error);
            throw error;
        }
    }

    // Métodos de utilidad
    generateObraUrl(obra) {
        return `/obra/${obra.id}/${this.slugify(obra.title)}`;
    }

    slugify(text) {
        return text
            .toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-');
    }
}
