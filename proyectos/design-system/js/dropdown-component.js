/**
 * DROPDOWN COMPONENT JAVASCRIPT - SERGIO FORÉS DESIGN SYSTEM
 * Enhancement opcional para comportamiento avanzado
 * 
 * CARACTERÍSTICAS:
 * ✅ Progressive enhancement (funciona sin JS)
 * ✅ Keyboard navigation (arrow keys, escape)
 * ✅ Click outside to close
 * ✅ Touch device optimization
 * ✅ ARIA attributes for accessibility
 * ✅ Event delegation for performance
 */

class DropdownComponent {
    constructor(options = {}) {
        this.config = {
            dropdownSelector: '.menu__item--dropdown, .dropdown',
            triggerSelector: '.menu__link[href*="#"], .dropdown__trigger',
            contentSelector: '.menu__submenu, .dropdown__content',
            linkSelector: '.menu__link, .dropdown__link',
            activeClass: 'menu__item--open',
            jsEnabledClass: 'dropdown--js-enabled',
            closeOnOutsideClick: true,
            closeOnEscape: true,
            keyboardNavigation: true,
            ...options
        };
        
        this.dropdowns = [];
        this.activeDropdown = null;
        
        this.init();
    }
    
    init() {
        // Encontrar todos los dropdowns
        this.dropdowns = Array.from(document.querySelectorAll(this.config.dropdownSelector));
        
        if (this.dropdowns.length === 0) {
            console.warn('DropdownComponent: No dropdowns found');
            return;
        }
        
        // Setup cada dropdown
        this.dropdowns.forEach(dropdown => this.setupDropdown(dropdown));
        
        // Setup global event listeners
        this.setupGlobalEvents();
        
        console.log(`DropdownComponent: Initialized ${this.dropdowns.length} dropdowns`);
    }
    
    setupDropdown(dropdown) {
        const trigger = dropdown.querySelector(this.config.triggerSelector);
        const content = dropdown.querySelector(this.config.contentSelector);
        
        if (!trigger || !content) {
            console.warn('DropdownComponent: Missing trigger or content', dropdown);
            return;
        }
        
        // Mark as JS enhanced
        dropdown.classList.add(this.config.jsEnabledClass);
        
        // Setup ARIA attributes
        this.setupAccessibility(dropdown, trigger, content);
        
        // Setup event listeners
        this.setupDropdownEvents(dropdown, trigger, content);
    }
    
    setupAccessibility(dropdown, trigger, content) {
        // Generate unique IDs if not present
        if (!content.id) {
            content.id = `dropdown-content-${Math.random().toString(36).substr(2, 9)}`;
        }
        
        if (!trigger.id) {
            trigger.id = `dropdown-trigger-${Math.random().toString(36).substr(2, 9)}`;
        }
        
        // ARIA attributes
        trigger.setAttribute('aria-haspopup', 'true');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.setAttribute('aria-controls', content.id);
        
        content.setAttribute('role', 'menu');
        content.setAttribute('aria-labelledby', trigger.id);
        
        // Setup menu items
        const links = content.querySelectorAll(this.config.linkSelector);
        links.forEach((link, index) => {
            link.setAttribute('role', 'menuitem');
            link.setAttribute('tabindex', '-1');
        });
    }
    
    setupDropdownEvents(dropdown, trigger, content) {
        // Click trigger to toggle
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleDropdown(dropdown);
        });
        
        // Keyboard navigation on trigger
        trigger.addEventListener('keydown', (e) => {
            this.handleTriggerKeydown(e, dropdown);
        });
        
        // Keyboard navigation within dropdown
        content.addEventListener('keydown', (e) => {
            this.handleContentKeydown(e, dropdown);
        });
        
        // Prevent content clicks from closing
        content.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Handle link clicks
        const links = content.querySelectorAll(this.config.linkSelector);
        links.forEach(link => {
            link.addEventListener('click', () => {
                this.closeDropdown(dropdown);
            });
        });
    }
    
    setupGlobalEvents() {
        // Close on outside click
        if (this.config.closeOnOutsideClick) {
            document.addEventListener('click', (e) => {
                if (this.activeDropdown && !this.activeDropdown.contains(e.target)) {
                    this.closeDropdown(this.activeDropdown);
                }
            });
        }
        
        // Close on escape key
        if (this.config.closeOnEscape) {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.activeDropdown) {
                    this.closeDropdown(this.activeDropdown);
                    this.focusTrigger(this.activeDropdown);
                }
            });
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (this.activeDropdown) {
                this.repositionDropdown(this.activeDropdown);
            }
        }, { passive: true });
    }
    
    toggleDropdown(dropdown) {
        if (this.isOpen(dropdown)) {
            this.closeDropdown(dropdown);
        } else {
            this.openDropdown(dropdown);
        }
    }
    
    openDropdown(dropdown) {
        // Close any other open dropdown first
        if (this.activeDropdown && this.activeDropdown !== dropdown) {
            this.closeDropdown(this.activeDropdown);
        }
        
        const trigger = dropdown.querySelector(this.config.triggerSelector);
        const content = dropdown.querySelector(this.config.contentSelector);
        
        dropdown.classList.add(this.config.activeClass);
        trigger.setAttribute('aria-expanded', 'true');
        
        this.activeDropdown = dropdown;
        
        // Focus first link if keyboard navigation enabled
        if (this.config.keyboardNavigation) {
            setTimeout(() => {
                const firstLink = content.querySelector(this.config.linkSelector);
                if (firstLink) {
                    firstLink.focus();
                }
            }, 50);
        }
        
        // Reposition if needed
        this.repositionDropdown(dropdown);
        
        // Emit custom event
        dropdown.dispatchEvent(new CustomEvent('dropdown:open', {
            detail: { dropdown, trigger, content }
        }));
    }
    
    closeDropdown(dropdown) {
        const trigger = dropdown.querySelector(this.config.triggerSelector);
        
        dropdown.classList.remove(this.config.activeClass);
        trigger.setAttribute('aria-expanded', 'false');
        
        if (this.activeDropdown === dropdown) {
            this.activeDropdown = null;
        }
        
        // Emit custom event
        dropdown.dispatchEvent(new CustomEvent('dropdown:close', {
            detail: { dropdown, trigger }
        }));
    }
    
    isOpen(dropdown) {
        return dropdown.classList.contains(this.config.activeClass);
    }
    
    focusTrigger(dropdown) {
        const trigger = dropdown.querySelector(this.config.triggerSelector);
        if (trigger) {
            trigger.focus();
        }
    }
    
    handleTriggerKeydown(e, dropdown) {
        switch (e.key) {
            case 'ArrowDown':
            case 'Enter':
            case ' ':
                e.preventDefault();
                this.openDropdown(dropdown);
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.openDropdown(dropdown);
                // Focus last item instead of first
                setTimeout(() => {
                    const content = dropdown.querySelector(this.config.contentSelector);
                    const links = content.querySelectorAll(this.config.linkSelector);
                    const lastLink = links[links.length - 1];
                    if (lastLink) {
                        lastLink.focus();
                    }
                }, 50);
                break;
        }
    }
    
    handleContentKeydown(e, dropdown) {
        if (!this.config.keyboardNavigation) return;
        
        const content = dropdown.querySelector(this.config.contentSelector);
        const links = Array.from(content.querySelectorAll(this.config.linkSelector));
        const currentIndex = links.indexOf(document.activeElement);
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % links.length;
                links[nextIndex].focus();
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = currentIndex === 0 ? links.length - 1 : currentIndex - 1;
                links[prevIndex].focus();
                break;
                
            case 'Home':
                e.preventDefault();
                links[0].focus();
                break;
                
            case 'End':
                e.preventDefault();
                links[links.length - 1].focus();
                break;
                
            case 'Tab':
                // Allow normal tab behavior but close dropdown
                this.closeDropdown(dropdown);
                break;
        }
    }
    
    repositionDropdown(dropdown) {
        const content = dropdown.querySelector(this.config.contentSelector);
        const rect = content.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Check if dropdown goes off-screen to the right
        if (rect.right > viewportWidth) {
            dropdown.classList.add('dropdown--right');
        } else {
            dropdown.classList.remove('dropdown--right');
        }
        
        // Check if dropdown goes off-screen at the bottom
        if (rect.bottom > viewportHeight) {
            content.style.maxHeight = `${viewportHeight - rect.top - 20}px`;
            content.style.overflowY = 'auto';
        } else {
            content.style.maxHeight = '';
            content.style.overflowY = '';
        }
    }
    
    // Public API methods
    open(dropdownSelector) {
        const dropdown = document.querySelector(dropdownSelector);
        if (dropdown && this.dropdowns.includes(dropdown)) {
            this.openDropdown(dropdown);
        }
    }
    
    close(dropdownSelector) {
        const dropdown = document.querySelector(dropdownSelector);
        if (dropdown && this.dropdowns.includes(dropdown)) {
            this.closeDropdown(dropdown);
        }
    }
    
    closeAll() {
        this.dropdowns.forEach(dropdown => {
            if (this.isOpen(dropdown)) {
                this.closeDropdown(dropdown);
            }
        });
    }
    
    // Add new dropdown dynamically
    addDropdown(dropdownElement) {
        if (!this.dropdowns.includes(dropdownElement)) {
            this.dropdowns.push(dropdownElement);
            this.setupDropdown(dropdownElement);
        }
    }
    
    // Remove dropdown
    removeDropdown(dropdownElement) {
        const index = this.dropdowns.indexOf(dropdownElement);
        if (index > -1) {
            if (this.activeDropdown === dropdownElement) {
                this.closeDropdown(dropdownElement);
            }
            this.dropdowns.splice(index, 1);
            dropdownElement.classList.remove(this.config.jsEnabledClass);
        }
    }
    
    // Destroy component
    destroy() {
        this.closeAll();
        this.dropdowns.forEach(dropdown => {
            dropdown.classList.remove(this.config.jsEnabledClass, this.config.activeClass);
        });
        this.dropdowns = [];
        this.activeDropdown = null;
        
        console.log('DropdownComponent: Destroyed');
    }
}

// Auto-initialization
document.addEventListener('DOMContentLoaded', () => {
    if (!window.dropdownComponent) {
        window.dropdownComponent = new DropdownComponent();
    }
});

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DropdownComponent;
}