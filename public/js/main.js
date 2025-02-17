import './preloader.js';

// Responsive handler
class ResponsiveHandler {
  constructor() {
    this.width = window.innerWidth;
    this.breakpoints = {
      mobile: 422,
      tablet: 1023,
      desktop: 1024
    };
    
    this.init();
  }

  init() {
    this.handleResize();
    window.addEventListener('resize', () => this.handleResize());
    this.setCurrentYear();
  }

  handleResize() {
    this.width = window.innerWidth;
    
    if (this.width > this.breakpoints.desktop) {
      this.handleDesktop();
    } else if (this.width > this.breakpoints.mobile) {
      this.handleTablet();
    } else {
      this.handleMobile();
    }
  }

  handleDesktop() {
    document.body.dataset.device = 'desktop';
  }

  handleTablet() {
    document.body.dataset.device = 'tablet';
  }

  handleMobile() {
    document.body.dataset.device = 'mobile';
  }

  setCurrentYear() {
    const yearElement = document.getElementById("fecha");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }
}

// Initialize responsive handler
new ResponsiveHandler();
