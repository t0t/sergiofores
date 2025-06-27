export class EventBus {
    constructor() {
        this._events = new Map();
        this._onceEvents = new Map();
    }

    // Subscribe to an event
    on(event, callback) {
        if (!this._events.has(event)) {
            this._events.set(event, new Set());
        }
        this._events.get(event).add(callback);

        // Return unsubscribe function
        return () => this.off(event, callback);
    }

    // Subscribe to an event only once
    once(event, callback) {
        if (!this._onceEvents.has(event)) {
            this._onceEvents.set(event, new Set());
        }
        this._onceEvents.get(event).add(callback);

        // Return unsubscribe function
        return () => this.off(event, callback, true);
    }

    // Unsubscribe from an event
    off(event, callback, once = false) {
        const events = once ? this._onceEvents : this._events;
        const listeners = events.get(event);
        
        if (listeners) {
            listeners.delete(callback);
            if (listeners.size === 0) {
                events.delete(event);
            }
        }
    }

    // Emit an event
    emit(event, ...args) {
        // Regular event listeners
        const listeners = this._events.get(event);
        if (listeners) {
            listeners.forEach(callback => {
                try {
                    callback(...args);
                } catch (error) {
                    console.error(`Error in event listener for ${event}:`, error);
                }
            });
        }

        // Once event listeners
        const onceListeners = this._onceEvents.get(event);
        if (onceListeners) {
            onceListeners.forEach(callback => {
                try {
                    callback(...args);
                } catch (error) {
                    console.error(`Error in once event listener for ${event}:`, error);
                }
            });
            this._onceEvents.delete(event);
        }
    }

    // Emit an event and wait for all listeners to complete
    async emitAsync(event, ...args) {
        const promises = [];

        // Regular event listeners
        const listeners = this._events.get(event);
        if (listeners) {
            listeners.forEach(callback => {
                try {
                    const result = callback(...args);
                    if (result instanceof Promise) {
                        promises.push(result);
                    }
                } catch (error) {
                    console.error(`Error in async event listener for ${event}:`, error);
                    promises.push(Promise.reject(error));
                }
            });
        }

        // Once event listeners
        const onceListeners = this._onceEvents.get(event);
        if (onceListeners) {
            onceListeners.forEach(callback => {
                try {
                    const result = callback(...args);
                    if (result instanceof Promise) {
                        promises.push(result);
                    }
                } catch (error) {
                    console.error(`Error in async once event listener for ${event}:`, error);
                    promises.push(Promise.reject(error));
                }
            });
            this._onceEvents.delete(event);
        }

        return Promise.all(promises);
    }

    // Check if an event has listeners
    hasListeners(event) {
        return (
            (this._events.has(event) && this._events.get(event).size > 0) ||
            (this._onceEvents.has(event) && this._onceEvents.get(event).size > 0)
        );
    }

    // Get all registered events
    getEvents() {
        return Array.from(new Set([
            ...this._events.keys(),
            ...this._onceEvents.keys()
        ]));
    }

    // Remove all listeners for an event
    removeAllListeners(event) {
        if (event) {
            this._events.delete(event);
            this._onceEvents.delete(event);
        } else {
            this._events.clear();
            this._onceEvents.clear();
        }
    }

    // Create a namespaced event name
    static createEventName(...parts) {
        return parts.join('.');
    }
}
