import { ImageLoader } from './ImageLoader.js';

export class ImageGallery {
    constructor(container, images, options = {}) {
        this.container = container;
        this.images = images;
        this.options = {
            columns: options.columns || 3,
            gap: options.gap || 20,
            lazy: options.lazy !== undefined ? options.lazy : true,
            ...options
        };
        this.render();
    }

    render() {
        const gallery = document.createElement('div');
        gallery.className = 'gallery grid gap-4';

        this.images.forEach(image => {
            const item = document.createElement('div');
            item.className = `col-span-12 md:col-span-6 lg:col-span-${12/this.options.columns}`;
            
            item.innerHTML = ImageLoader.generateImageHTML(
                image.src,
                image.alt || '',
                image.className || '',
                this.options.lazy
            );

            if (this.options.onClick) {
                item.addEventListener('click', () => this.options.onClick(image));
            }

            gallery.appendChild(item);
        });

        this.container.appendChild(gallery);
    }

    static createMasonryLayout(container, images, options = {}) {
        const columns = options.columns || 3;
        const columnHeights = new Array(columns).fill(0);
        const columnElements = columnHeights.map(() => document.createElement('div'));

        columnElements.forEach(col => {
            col.className = `masonry-column col-span-12 md:col-span-${12/columns}`;
            container.appendChild(col);
        });

        images.forEach((image, index) => {
            const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
            const item = document.createElement('div');
            item.className = 'masonry-item';
            item.innerHTML = ImageLoader.generateImageHTML(
                image.src,
                image.alt || '',
                image.className || '',
                options.lazy !== false
            );

            columnElements[shortestColumn].appendChild(item);
            columnHeights[shortestColumn] += image.height / image.width;
        });
    }
}
