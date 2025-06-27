export class TabLink {
    constructor(container, tabs) {
        this.container = container;
        this.tabs = tabs;
        this.activeTab = 0;
        this.buttons = [];
        this.contentContainer = null;
        this.render();
        this.addEventListeners();
    }

    render() {
        // Create tab buttons container
        const tabButtons = document.createElement('div');
        tabButtons.className = 'tab-buttons';

        this.tabs.forEach((tab, index) => {
            const button = document.createElement('button');
            button.textContent = tab.label;
            button.className = index === this.activeTab ? 'active' : '';
            this.buttons.push(button);
            tabButtons.appendChild(button);
        });

        // Create content container if it doesn't exist
        if (!this.contentContainer) {
            this.contentContainer = document.createElement('div');
            this.contentContainer.className = 'tab-content';
        }
        
        // Update content
        this.contentContainer.innerHTML = this.tabs[this.activeTab].content;

        // Clear and append new content only if necessary
        if (!this.container.contains(tabButtons)) {
            this.container.innerHTML = '';
            this.container.appendChild(tabButtons);
            this.container.appendChild(this.contentContainer);
        }
    }

    addEventListeners() {
        this.buttons.forEach((button, index) => {
            button.addEventListener('click', () => {
                if (index !== this.activeTab) {
                    this.setActiveTab(index);
                }
            });
        });
    }

    setActiveTab(index) {
        // Update buttons styles
        this.buttons.forEach((button, i) => {
            button.className = i === index ? 'active' : '';
        });

        // Update content
        this.activeTab = index;
        this.contentContainer.innerHTML = this.tabs[this.activeTab].content;
    }
}
