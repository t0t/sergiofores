export default class Animator {
    static async fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = '';
        element.style.transition = `opacity ${duration}ms ease-in-out`;
        
        // Force reflow
        element.offsetHeight;
        
        element.style.opacity = '1';
        
        return new Promise(resolve => {
            setTimeout(() => {
                element.style.transition = '';
                resolve();
            }, duration);
        });
    }

    static async fadeOut(element, duration = 300) {
        element.style.opacity = '1';
        element.style.transition = `opacity ${duration}ms ease-in-out`;
        
        // Force reflow
        element.offsetHeight;
        
        element.style.opacity = '0';
        
        return new Promise(resolve => {
            setTimeout(() => {
                element.style.display = 'none';
                element.style.transition = '';
                resolve();
            }, duration);
        });
    }

    static async slideIn(element, direction = 'right', duration = 300) {
        const start = direction === 'right' ? '100%' : '-100%';
        
        element.style.transform = `translateX(${start})`;
        element.style.display = '';
        element.style.transition = `transform ${duration}ms ease-in-out`;
        
        // Force reflow
        element.offsetHeight;
        
        element.style.transform = 'translateX(0)';
        
        return new Promise(resolve => {
            setTimeout(() => {
                element.style.transition = '';
                resolve();
            }, duration);
        });
    }

    static async slideOut(element, direction = 'left', duration = 300) {
        const end = direction === 'left' ? '-100%' : '100%';
        
        element.style.transform = 'translateX(0)';
        element.style.transition = `transform ${duration}ms ease-in-out`;
        
        // Force reflow
        element.offsetHeight;
        
        element.style.transform = `translateX(${end})`;
        
        return new Promise(resolve => {
            setTimeout(() => {
                element.style.display = 'none';
                element.style.transition = '';
                resolve();
            }, duration);
        });
    }

    static async crossFade(oldElement, newElement, duration = 300) {
        await Promise.all([
            this.fadeOut(oldElement, duration),
            this.fadeIn(newElement, duration)
        ]);
    }

    static async crossSlide(oldElement, newElement, direction = 'left', duration = 300) {
        await Promise.all([
            this.slideOut(oldElement, direction, duration),
            this.slideIn(newElement, direction === 'left' ? 'right' : 'left', duration)
        ]);
    }

    static parallax(element, scrollElement = window, options = {}) {
        const {
            speed = 0.5,
            direction = 'vertical',
            min = -100,
            max = 100
        } = options;

        const handleScroll = () => {
            const rect = element.getBoundingClientRect();
            const scrollPos = scrollElement === window ? 
                window.pageYOffset : 
                scrollElement.scrollTop;
            
            const offset = direction === 'vertical' ?
                (scrollPos * speed) :
                (scrollPos * speed);
            
            const clampedOffset = Math.max(min, Math.min(max, offset));
            
            element.style.transform = direction === 'vertical' ?
                `translateY(${clampedOffset}px)` :
                `translateX(${clampedOffset}px)`;
        };

        if (scrollElement === window) {
            window.addEventListener('scroll', handleScroll);
            // Call once to set initial position
            handleScroll();
        } else {
            scrollElement.addEventListener('scroll', handleScroll);
            // Call once to set initial position
            handleScroll();
        }

        // Return cleanup function
        return () => {
            if (scrollElement === window) {
                window.removeEventListener('scroll', handleScroll);
            } else {
                scrollElement.removeEventListener('scroll', handleScroll);
            }
        };
    }
}
