export class BaseView {
    constructor(container) {
        if (!container) {
            throw new Error('Container element is required');
        }
        this.container = container;
        this._eventListeners = new Map();
        this._intersectionObservers = new Set();
        this._resizeObserver = null;
        this._mutationObserver = null;
        this._timeouts = new Set();
        this._intervals = new Set();
    }

    setTitle(title) {
        document.title = `${title} - Noelia Requena`;
    }

    // Add event listener with automatic cleanup
    addEventListener(element, type, listener, options) {
        element.addEventListener(type, listener, options);
        
        if (!this._eventListeners.has(element)) {
            this._eventListeners.set(element, new Map());
        }
        
        const elementListeners = this._eventListeners.get(element);
        if (!elementListeners.has(type)) {
            elementListeners.set(type, new Set());
        }
        
        elementListeners.get(type).add({ listener, options });
    }

    // Create IntersectionObserver with automatic cleanup
    createIntersectionObserver(callback, options) {
        const observer = new IntersectionObserver(callback, options);
        this._intersectionObservers.add(observer);
        return observer;
    }

    // Create ResizeObserver with automatic cleanup
    createResizeObserver(callback) {
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
        }
        this._resizeObserver = new ResizeObserver(callback);
        return this._resizeObserver;
    }

    // Create MutationObserver with automatic cleanup
    createMutationObserver(callback) {
        if (this._mutationObserver) {
            this._mutationObserver.disconnect();
        }
        this._mutationObserver = new MutationObserver(callback);
        return this._mutationObserver;
    }

    // Set timeout with automatic cleanup
    setTimeout(callback, delay) {
        const timeoutId = setTimeout(callback, delay);
        this._timeouts.add(timeoutId);
        return timeoutId;
    }

    // Set interval with automatic cleanup
    setInterval(callback, delay) {
        const intervalId = setInterval(callback, delay);
        this._intervals.add(intervalId);
        return intervalId;
    }

    // Clear specific timeout
    clearTimeout(timeoutId) {
        clearTimeout(timeoutId);
        this._timeouts.delete(timeoutId);
    }

    // Clear specific interval
    clearInterval(intervalId) {
        clearInterval(intervalId);
        this._intervals.delete(intervalId);
    }

    // Initialize the view
    async init() {
        await this.render();
        await this.afterRender();
    }

    // Render method to be overridden by child classes
    render() {
        return Promise.resolve();
    }

    // After render method to be overridden by child classes
    afterRender() {
        return Promise.resolve();
    }

    // Cleanup method
    destroy() {
        // Clean up event listeners
        this._eventListeners.forEach((elementListeners, element) => {
            elementListeners.forEach((listeners, type) => {
                listeners.forEach(({ listener, options }) => {
                    element.removeEventListener(type, listener, options);
                });
            });
        });
        this._eventListeners.clear();

        // Clean up observers
        this._intersectionObservers.forEach(observer => observer.disconnect());
        this._intersectionObservers.clear();

        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
            this._resizeObserver = null;
        }

        if (this._mutationObserver) {
            this._mutationObserver.disconnect();
            this._mutationObserver = null;
        }

        // Clean up timeouts and intervals
        this._timeouts.forEach(timeoutId => clearTimeout(timeoutId));
        this._timeouts.clear();

        this._intervals.forEach(intervalId => clearInterval(intervalId));
        this._intervals.clear();

        // Clear container
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}
