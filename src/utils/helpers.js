/**
 * Utilidades generales para la aplicación
 */

// Detección de dispositivo
export const deviceDetection = {
    isMobile: () => window.innerWidth <= 768,
    isTablet: () => window.innerWidth > 768 && window.innerWidth <= 1024,
    isDesktop: () => window.innerWidth > 1024
};

// Generador de números aleatorios
export const random = {
    between: (min, max) => Math.floor(Math.random() * (max - min + 1) + min),
    fromArray: array => array[Math.floor(Math.random() * array.length)]
};

// Utilidades DOM
export const dom = {
    create: (tag, className = '', content = '') => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (content) element.innerHTML = content;
        return element;
    },
    
    append: (parent, ...children) => {
        children.forEach(child => parent.appendChild(child));
        return parent;
    }
};

// Utilidades de animación
export const animation = {
    fadeIn: (element, duration = 300) => {
        element.style.opacity = 0;
        element.style.display = 'block';
        
        let start = null;
        const animate = timestamp => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            
            element.style.opacity = Math.min(progress / duration, 1);
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    },
    
    fadeOut: (element, duration = 300) => {
        return new Promise(resolve => {
            let start = null;
            const animate = timestamp => {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                
                element.style.opacity = 1 - Math.min(progress / duration, 1);
                
                if (progress < duration) {
                    requestAnimationFrame(animate);
                } else {
                    element.style.display = 'none';
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }
};

// Utilidades de formato
export const format = {
    date: (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    number: (num) => {
        return new Intl.NumberFormat('es-ES').format(num);
    }
};

// Utilidades de validación
export const validate = {
    email: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    url: (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
};

// Utilidades de almacenamiento
export const storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            return false;
        }
    },
    
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return null;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from localStorage:', e);
            return false;
        }
    }
};
