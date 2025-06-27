export class ImageLoader {
    static #loadAttempts = new Map();
    static #MAX_RETRIES = 2;

    static async loadImage(src, options = {}) {
        const {
            lazy = true,
            threshold = 0.1,
            rootMargin = '50px 0px',
            placeholder = '/images/placeholder.jpg',
            fallback = '/images/error.jpg'
        } = options;

        // Incrementar el contador de intentos
        const attempts = (this.#loadAttempts.get(src) || 0) + 1;
        this.#loadAttempts.set(src, attempts);

        // Si excedimos los intentos máximos, usar el fallback directamente
        if (attempts > this.#MAX_RETRIES) {
            console.warn(`Max retries exceeded for image: ${src}, using fallback`);
            return new Promise((resolve) => {
                const img = new Image();
                img.src = fallback;
                img.onload = () => resolve(img);
            });
        }

        return new Promise((resolve, reject) => {
            const img = new Image();

            const handleError = () => {
                console.warn(`Failed to load image: ${src}, attempt ${attempts} of ${this.#MAX_RETRIES}`);
                if (src !== fallback && attempts <= this.#MAX_RETRIES) {
                    img.src = fallback;
                } else {
                    reject(new Error(`Failed to load image after ${attempts} attempts: ${src}`));
                }
            };

            const handleLoad = () => {
                // Limpiar el contador de intentos cuando la carga es exitosa
                this.#loadAttempts.delete(src);
                resolve(img);
            };

            if (lazy) {
                const observer = new IntersectionObserver(
                    (entries, observer) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                img.src = src;
                                observer.unobserve(img);
                            }
                        });
                    },
                    { threshold, rootMargin }
                );

                img.onload = () => {
                    handleLoad();
                    observer.disconnect();
                };
                img.onerror = handleError;

                img.src = placeholder;
                observer.observe(img);
            } else {
                img.onload = handleLoad;
                img.onerror = handleError;
                img.src = src;
            }
        });
    }

    static async preloadImages(srcs) {
        const results = await Promise.allSettled(
            srcs.map(src => ImageLoader.loadImage(src, { lazy: false }))
        );

        const errors = results
            .filter(result => result.status === 'rejected')
            .map(result => result.reason);

        if (errors.length > 0) {
            console.warn('Some images failed to preload:', errors);
        }

        return results
            .filter(result => result.status === 'fulfilled')
            .map(result => result.value);
    }

    static generateSrcSet(src) {
        const sizes = [300, 600, 900, 1200];
        return sizes
            .map(size => `${src}?width=${size} ${size}w`)
            .join(', ');
    }

    static generateImageHTML(src, alt = '', className = '', lazy = true) {
        const srcset = this.generateSrcSet(src);
        const lazyAttr = lazy ? 'loading="lazy"' : '';
        const classAttr = className ? `class="${className}"` : '';
        
        return `
            <picture>
                <source srcset="${srcset}" type="image/jpeg">
                <img 
                    src="${src}" 
                    alt="${alt}"
                    ${classAttr}
                    ${lazyAttr}
                    onerror="if (!this.dataset.retried) { this.dataset.retried = true; this.src='/images/error.jpg'; }"
                >
            </picture>
        `;
    }
}
