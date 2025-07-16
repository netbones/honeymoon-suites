/**
 * Mobile Bottom Navigation Component
 * Reusable bottom navigation for mobile devices
 */

class MobileBottomNav {
    constructor(config = {}) {
        this.config = {
            containerId: 'mobileBottomNav',
            tabsId: 'mobileBottomNavTabs',
            dotsId: 'mobileSwipeDots',
            showDots: false,
            autoHide: false,
            hideOnScroll: false,
            activeClass: 'active',
            ...config
        };
        
        this.currentIndex = 0;
        this.navItems = [];
        this.isInitialized = false;
        this.lastScrollY = 0;
        
        this.init();
    }
    
    /**
     * Initialize the component
     */
    init() {
        if (this.isInitialized) return;
        
        this.container = document.getElementById(this.config.containerId);
        this.tabsContainer = document.getElementById(this.config.tabsId);
        this.dotsContainer = document.getElementById(this.config.dotsId);
        
        if (!this.container || !this.tabsContainer) {
            console.warn('Mobile Bottom Nav: Required containers not found');
            return;
        }
        
        this.setupEventListeners();
        this.isInitialized = true;
    }
    
    /**
     * Set navigation items
     * @param {Array} items - Array of navigation items
     */
    setNavItems(items) {
        this.navItems = items;
        this.renderNavItems();
        if (this.config.showDots) {
            this.renderDots();
        }
    }
    
    /**
     * Render navigation items
     */
    renderNavItems() {
        if (!this.tabsContainer) return;
        
        this.tabsContainer.innerHTML = '';
        
        this.navItems.forEach((item, index) => {
            const tab = document.createElement('div');
            tab.className = `mobile-bottom-nav-tab ${index === this.currentIndex ? this.config.activeClass : ''}`;
            tab.setAttribute('data-index', index);
            
            if (item.href) {
                tab.style.cursor = 'pointer';
            }
            
            tab.innerHTML = `
                <i class="${item.icon}"></i>
                <span>${item.label}</span>
            `;
            
            // Add click handler
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleTabClick(index, item);
            });
            
            this.tabsContainer.appendChild(tab);
        });
    }
    
    /**
     * Render dots indicator
     */
    renderDots() {
        if (!this.dotsContainer) return;
        
        this.dotsContainer.innerHTML = '';
        this.dotsContainer.classList.toggle('d-none', !this.config.showDots);
        
        if (!this.config.showDots) return;
        
        this.navItems.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `mobile-swipe-dot ${index === this.currentIndex ? this.config.activeClass : ''}`;
            dot.setAttribute('data-index', index);
            
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                this.setActiveTab(index);
                this.handleTabClick(index, this.navItems[index]);
            });
            
            this.dotsContainer.appendChild(dot);
        });
    }
    
    /**
     * Handle tab click
     * @param {number} index - Tab index
     * @param {Object} item - Navigation item
     */
    handleTabClick(index, item) {
        this.setActiveTab(index);
        
        // Handle different types of navigation
        if (item.callback && typeof item.callback === 'function') {
            item.callback(index, item);
        } else if (item.href) {
            if (item.href.startsWith('#')) {
                // Smooth scroll to section
                const target = document.querySelector(item.href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Navigate to page
                window.location.href = item.href;
            }
        } else if (item.sectionIndex !== undefined) {
            // Handle swipeable sections
            if (window.swipeToSection && typeof window.swipeToSection === 'function') {
                window.swipeToSection(item.sectionIndex);
            }
        }
        
        // Emit custom event
        this.container.dispatchEvent(new CustomEvent('bottomNavClick', {
            detail: { index, item }
        }));
    }
    
    /**
     * Set active tab
     * @param {number} index - Tab index to activate
     */
    setActiveTab(index) {
        if (index < 0 || index >= this.navItems.length) return;
        
        this.currentIndex = index;
        
        // Update tabs
        this.tabsContainer.querySelectorAll('.mobile-bottom-nav-tab').forEach((tab, i) => {
            tab.classList.toggle(this.config.activeClass, i === index);
        });
        
        // Update dots
        if (this.dotsContainer) {
            this.dotsContainer.querySelectorAll('.mobile-swipe-dot').forEach((dot, i) => {
                dot.classList.toggle(this.config.activeClass, i === index);
            });
        }
        
        // Scroll active tab into view
        const activeTab = this.tabsContainer.querySelector(`.mobile-bottom-nav-tab.${this.config.activeClass}`);
        if (activeTab) {
            activeTab.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest', 
                inline: 'center' 
            });
        }
    }
    
    /**
     * Show the navigation
     */
    show() {
        this.container.classList.remove('hidden');
        this.container.classList.add('visible');
    }
    
    /**
     * Hide the navigation
     */
    hide() {
        this.container.classList.remove('visible');
        this.container.classList.add('hidden');
    }
    
    /**
     * Toggle navigation visibility
     */
    toggle() {
        if (this.container.classList.contains('hidden')) {
            this.show();
        } else {
            this.hide();
        }
    }
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Hide on scroll (optional)
        if (this.config.hideOnScroll) {
            let scrollTimeout;
            window.addEventListener('scroll', () => {
                const currentScrollY = window.scrollY;
                
                if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
                    // Scrolling down
                    this.hide();
                } else {
                    // Scrolling up
                    this.show();
                }
                
                this.lastScrollY = currentScrollY;
                
                // Show after scroll stops
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    this.show();
                }, 150);
            });
        }
        
        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.container.classList.contains('d-lg-none')) return;
            
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.navigatePrevious();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.navigateNext();
                    break;
            }
        });
    }
    
    /**
     * Navigate to previous tab
     */
    navigatePrevious() {
        const newIndex = Math.max(0, this.currentIndex - 1);
        this.setActiveTab(newIndex);
        this.handleTabClick(newIndex, this.navItems[newIndex]);
    }
    
    /**
     * Navigate to next tab
     */
    navigateNext() {
        const newIndex = Math.min(this.navItems.length - 1, this.currentIndex + 1);
        this.setActiveTab(newIndex);
        this.handleTabClick(newIndex, this.navItems[newIndex]);
    }
    
    /**
     * Get current active index
     * @returns {number} Current active index
     */
    getCurrentIndex() {
        return this.currentIndex;
    }
    
    /**
     * Update a specific nav item
     * @param {number} index - Item index
     * @param {Object} newItem - New item data
     */
    updateNavItem(index, newItem) {
        if (index >= 0 && index < this.navItems.length) {
            this.navItems[index] = { ...this.navItems[index], ...newItem };
            this.renderNavItems();
            if (this.config.showDots) {
                this.renderDots();
            }
        }
    }
    
    /**
     * Destroy the component
     */
    destroy() {
        if (this.container) {
            this.container.remove();
        }
        this.isInitialized = false;
    }
}

// Global instance for easy access
window.MobileBottomNav = MobileBottomNav;

// Auto-initialize if config is available
document.addEventListener('DOMContentLoaded', () => {
    if (window.mobileBottomNavConfig) {
        window.mobileBottomNavInstance = new MobileBottomNav(window.mobileBottomNavConfig.config);
        if (window.mobileBottomNavConfig.items) {
            window.mobileBottomNavInstance.setNavItems(window.mobileBottomNavConfig.items);
        }
    }
});