
// Importaciones de módulos
import { debounce } from './utils/performance.js';

// Selectores modernos con arrow functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

// Configuración de imágenes usando Map para mejor rendimiento
const alternativeImages = new Map([
  ['desarrollo-web', [
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=60',
  ]],
  ['exploracion', [
    'https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1520962922320-2038eebab146?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=800&q=60',
  ]],
  ['arte', [
    'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1501472312651-726afe119ff1?auto=format&fit=crop&w=800&q=60',
  ]],
  ['laboratorio', [
    'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1518972559570-7cc1309d3229?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&w=800&q=60',
  ]]
]);

// Estado usando Proxy para reactividad
const state = new Proxy({
  lastScroll: 0,
  navVisible: false,
  currentImageIndexes: new Map()
}, {
  set(target, prop, value) {
    target[prop] = value;
    return true;
  }
});

// Navegación usando IntersectionObserver
const handleNavigation = () => {
  const nav = $('.main-nav');
  const currentScroll = window.scrollY;
  
  if (currentScroll > 100) {
    nav?.classList.add('visible');
  } else {
    nav?.classList.remove('visible');
  }
  
  state.lastScroll = currentScroll;
};

// Gestor de cambio de imágenes usando async/await
const initImageSwitcher = () => {
  const sections = $$('.project-section');
  
  sections.forEach(section => {
    const sectionId = section.id;
    const image = section.querySelector('.section-image');
    
    if (!image || !alternativeImages.get(sectionId)) return;
    
    state.currentImageIndexes.set(sectionId, 0);
    
    const handleImageChange = async () => {
      const images = alternativeImages.get(sectionId);
      const currentIndex = state.currentImageIndexes.get(sectionId);
      const nextIndex = (currentIndex + 1) % images.length;
      
      image.style.opacity = '0';
      
      await new Promise(resolve => setTimeout(resolve, 300));
      image.src = images[nextIndex];
      image.style.opacity = '1';
      state.currentImageIndexes.set(sectionId, nextIndex);
    };
    
    // Efectos hover
    image.style.cursor = 'pointer';
    image.addEventListener('mouseenter', () => {
      image.style.transform = 'scale(1.02)';
      image.style.transition = 'transform 0.3s ease';
    });
    
    image.addEventListener('mouseleave', () => {
      image.style.transform = 'scale(1)';
    });
    
    image.addEventListener('click', handleImageChange);
  });
};

// Smooth scroll usando Promise y requestAnimationFrame
const smoothScroll = (targetElement) => {
  return new Promise(resolve => {
    const targetPosition = targetElement.getBoundingClientRect().top;
    const startPosition = window.scrollY;
    const distance = targetPosition;
    const duration = 1000;
    let startTime = null;

    const easeInOutCubic = t => 
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        resolve();
      }
    };

    requestAnimationFrame(animation);
  });
};

// Navegación suave con async/await
const initSmoothScroll = () => {
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', async (event) => {
      event.preventDefault();
      const targetId = anchor.getAttribute('href');
      const targetElement = $(targetId);
      
      if (targetElement) {
        await smoothScroll(targetElement);
        history.pushState(null, '', targetId);
      }
    });
  });
};

// Observador de intersección para animaciones de cards
const observeCards = () => {
  const cards = $$('.feature-card');
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '50px'
    }
  );

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
  });
};

// Menú móvil con Event Delegation
const initMobileMenu = () => {
  const menuToggle = $('.menu-toggle');
  const nav = $('.main-nav');

  document.addEventListener('click', (event) => {
    const target = event.target;
    
    if (target.closest('.menu-toggle')) {
      menuToggle?.classList.toggle('active');
      nav?.classList.toggle('menu-open');
    } else if (target.closest('.main-nav a')) {
      menuToggle?.classList.remove('active');
      nav?.classList.remove('menu-open');
    }
  });
};

// WhatsApp con async/await
const initWhatsAppButton = () => {
  const whatsappButton = $('#whatsappButton');
  if (whatsappButton) {
    whatsappButton.addEventListener('click', async () => {
      const phoneNumber = '34619549032';
      window.open(`https://wa.me/${phoneNumber}`, '_blank');
    });
  }
};

// Alert personalizado con async/await y animaciones
const showAlert = async () => {
  const alertElement = document.createElement('div');
  alertElement.className = 'custom-alert';
  alertElement.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
    <span>ESTE PROTOTIPO WEB ESTÁ EN DESARROLLO</span>
  `;
  
  document.body.appendChild(alertElement);
  
  await new Promise(resolve => setTimeout(resolve, 5000));
  alertElement.style.opacity = '0';
  alertElement.style.transform = 'translateX(100%)';
  
  await new Promise(resolve => setTimeout(resolve, 300));
  alertElement.remove();
};

// Inicialización con módulos
const init = async () => {
  // Event listeners optimizados
  window.addEventListener('scroll', debounce(handleNavigation, 100), { passive: true });
  
  // Inicialización de características
  initSmoothScroll();
  observeCards();
  initImageSwitcher();
  initMobileMenu();
  initWhatsAppButton();
  await showAlert();
  
  console.log(`Aplicación inicializada: ${new Date().toISOString()}`);
};

// Cargar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);

// Exportar funciones para testing
export {
  handleNavigation,
  smoothScroll,
  initSmoothScroll,
  observeCards,
  initImageSwitcher
};
