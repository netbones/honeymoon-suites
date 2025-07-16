/**
 * Mobile Bottom Navigation Auto-Include Script
 * Automatically inserts the mobile bottom navigation component into pages
 */

(function() {
    'use strict';
    
    // Default configuration - can be overridden by setting window.mobileBottomNavConfig before this script loads
    const defaultConfig = {
        config: {
            showDots: false,
            hideOnScroll: false,
            autoHide: false
        },
        items: [
            {
                icon: 'fas fa-home',
                label: 'Home',
                href: 'index.html'
            },
            {
                icon: 'fas fa-images',
                label: 'Gallery',
                href: 'fan-gallery.html'
            },
            {
                icon: 'fas fa-star',
                label: 'Hits',
                href: 'greatest-hits.html'
            },
            {
                icon: 'fas fa-microphone',
                label: 'Interview',
                href: 'interview.html'
            },
            {
                icon: 'fas fa-users',
                label: 'Extended',
                href: 'gallery-extended.html'
            }
        ]
    };
    
    // Merge with user config if provided
    const config = window.mobileBottomNavConfig ? 
        {
            config: { ...defaultConfig.config, ...window.mobileBottomNavConfig.config },
            items: window.mobileBottomNavConfig.items || defaultConfig.items
        } : defaultConfig;
    
    // Store merged config globally
    window.mobileBottomNavConfig = config;
    
    function loadCSS() {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'components/mobile-bottom-nav/mobile-bottom-nav.css';
        document.head.appendChild(cssLink);
    }
    
    function loadHTML() {
        return fetch('components/mobile-bottom-nav/mobile-bottom-nav.html')
            .then(response => response.text())
            .then(html => {
                // Insert at the end of body
                document.body.insertAdjacentHTML('beforeend', html);
                
                // Add spacer to prevent content from being hidden
                const spacer = document.createElement('div');
                spacer.className = 'mobile-bottom-nav-spacer d-lg-none';
                document.body.appendChild(spacer);
            })
            .catch(error => {
                console.warn('Could not load mobile bottom nav HTML:', error);
            });
    }
    
    function loadJS() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'components/mobile-bottom-nav/mobile-bottom-nav.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    function setActiveBasedOnCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navItems = config.items;
        
        // Find matching nav item
        const activeIndex = navItems.findIndex(item => {
            if (item.href) {
                const itemPage = item.href.split('/').pop();
                return itemPage === currentPage;
            }
            return false;
        });
        
        if (activeIndex !== -1 && window.mobileBottomNavInstance) {
            window.mobileBottomNavInstance.setActiveTab(activeIndex);
        }
    }
    
    function initializeComponent() {
        loadCSS();
        
        loadHTML()
            .then(() => loadJS())
            .then(() => {
                // Wait a bit for the component to initialize
                setTimeout(() => {
                    if (window.mobileBottomNavInstance) {
                        setActiveBasedOnCurrentPage();
                    }
                }, 100);
            })
            .catch(error => {
                console.error('Failed to load mobile bottom nav component:', error);
            });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeComponent);
    } else {
        initializeComponent();
    }
    
    // Helper function to update nav items from any page
    window.updateMobileBottomNav = function(newItems) {
        if (window.mobileBottomNavInstance) {
            window.mobileBottomNavInstance.setNavItems(newItems);
            setActiveBasedOnCurrentPage();
        } else {
            // Store for when component loads
            window.mobileBottomNavConfig.items = newItems;
        }
    };
    
    // Helper function to set active tab
    window.setMobileBottomNavActive = function(index) {
        if (window.mobileBottomNavInstance) {
            window.mobileBottomNavInstance.setActiveTab(index);
        }
    };
    
})();