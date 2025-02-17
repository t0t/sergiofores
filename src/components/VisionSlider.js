export class VisionSlider {
    constructor(container, slides) {
        this.container = container;
        this.slides = slides;
        this.currentIndex = 0;
        this.interval = null;
        this.init();
    }

    init() {
        this.renderSlides();
        this.startAutoSlide();
        this.addEventListeners();
    }

    renderSlides() {
        Object.entries(this.slides).forEach(([key, frases], index) => {
            const slide = document.createElement('div');
            slide.className = `slider1 ${index === 0 ? 'active' : ''}`;
            
            const content = document.createElement('div');
            content.className = 'slider-content';
            
            const list = document.createElement('ul');
            frases.forEach(frase => {
                const item = document.createElement('li');
                item.textContent = frase;
                list.appendChild(item);
            });
            
            content.appendChild(list);
            slide.appendChild(content);
            this.container.appendChild(slide);
        });
    }

    nextSlide() {
        const slides = this.container.querySelectorAll('.slider1');
        slides[this.currentIndex].classList.remove('active');
        this.currentIndex = (this.currentIndex + 1) % slides.length;
        slides[this.currentIndex].classList.add('active');
    }

    startAutoSlide() {
        this.interval = setInterval(() => this.nextSlide(), 5000);
    }

    stopAutoSlide() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    addEventListeners() {
        this.container.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.container.addEventListener('mouseleave', () => this.startAutoSlide());
        
        // Soporte para gestos táctiles
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        this.container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
    }

    handleSwipe() {
        const minSwipeDistance = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                // Swipe derecha
                this.prevSlide();
            } else {
                // Swipe izquierda
                this.nextSlide();
            }
        }
    }

    prevSlide() {
        const slides = this.container.querySelectorAll('.slider1');
        slides[this.currentIndex].classList.remove('active');
        this.currentIndex = (this.currentIndex - 1 + slides.length) % slides.length;
        slides[this.currentIndex].classList.add('active');
    }
}
