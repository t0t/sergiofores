// Modelo base que implementa el patrón Observable
export class BaseModel {
    constructor() {
        this.data = null;
        this.observers = [];
    }

    // Getters y setters
    getData() {
        return this.data;
    }

    setData(newData) {
        this.data = newData;
        this.notifyObservers();
    }

    // Patrón Observable
    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers() {
        this.observers.forEach(observer => observer.update(this.data));
    }

    // Métodos de persistencia
    async save() {
        // Implementar en clases hijas
        throw new Error('save debe ser implementado por las clases hijas');
    }

    async load() {
        // Implementar en clases hijas
        throw new Error('load debe ser implementado por las clases hijas');
    }

    // Validación
    validate() {
        // Implementar en clases hijas
        return true;
    }

    // Serialización
    toJSON() {
        return JSON.stringify(this.data);
    }

    fromJSON(json) {
        this.setData(JSON.parse(json));
    }
}
