// Mobile Swipeable Sections JavaScript

// Mobile sections state management
let currentMobileSection = 0;
const totalMobileSections = 5;

/**
 * Navigate to a specific mobile section
 * @param {number} sectionIndex - Index of the section to navigate to (0-4)
 */
function swipeToSection(sectionIndex) {
    const wrapper = document.getElementById('mobileSectionsWrapper');
    if (!wrapper) return;
    
    currentMobileSection = Math.max(0, Math.min(sectionIndex, totalMobileSections - 1));
    const translateX = -currentMobileSection * 20; // 20% per section
    wrapper.style.transform = `translateX(${translateX}%)`;
    
    // Update navigation tabs
    document.querySelectorAll('.mobile-nav-tab').forEach((tab, index) => {
        tab.classList.toggle('active', index === currentMobileSection);
    });
    
    // Update dots
    document.querySelectorAll('.mobile-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentMobileSection);
    });
    
    // Mark as interacted for UI feedback
    const container = document.querySelector('.mobile-sections-container');
    if (container) {
        container.classList.add('interacted');
    }
    
    // Auto-scroll active tab into view
    const activeTab = document.querySelector('.mobile-nav-tab.active');
    if (activeTab) {
        activeTab.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest', 
            inline: 'center' 
        });
    }
}

/**
 * Initialize mobile swipeable sections functionality
 */
function initMobileSwipeableSections() {
    const container = document.querySelector('.mobile-sections-container');
    if (!container) return;
    
    let isScrolling = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    
    // Touch events for section swiping
    container.addEventListener('touchstart', (e) => {
        isScrolling = true;
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
    }, { passive: true });
    
    container.addEventListener('touchmove', (e) => {
        if (!isScrolling) return;
        currentX = e.touches[0].pageX;
        const currentY = e.touches[0].pageY;
        
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;
        
        // Only handle horizontal swipes (prevent vertical scroll interference)
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
            e.preventDefault();
        }
    }, { passive: false });
    
    container.addEventListener('touchend', (e) => {
        if (!isScrolling) return;
        
        const deltaX = currentX - startX;
        const threshold = 50; // Minimum swipe distance
        
        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0 && currentMobileSection > 0) {
                // Swipe right - go to previous section
                swipeToSection(currentMobileSection - 1);
            } else if (deltaX < 0 && currentMobileSection < totalMobileSections - 1) {
                // Swipe left - go to next section
                swipeToSection(currentMobileSection + 1);
            }
        }
        
        isScrolling = false;
    }, { passive: true });
    
    // Dot navigation click handlers
    document.querySelectorAll('.mobile-dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            swipeToSection(index);
        });
        
        // Touch feedback for dots
        dot.addEventListener('touchstart', () => {
            dot.style.transform = 'scale(1.2)';
        }, { passive: true });
        
        dot.addEventListener('touchend', () => {
            setTimeout(() => {
                dot.style.transform = '';
            }, 150);
        }, { passive: true });
    });
    
    // Mobile nav tabs touch scrolling
    initMobileNavTabsScrolling();
    
    // Keyboard navigation support
    initKeyboardNavigation();
    
    console.log('Mobile swipeable sections initialized');
}

/**
 * Initialize mobile navigation tabs scrolling functionality
 */
function initMobileNavTabsScrolling() {
    const navTabs = document.getElementById('mobileNavTabs');
    if (!navTabs) return;
    
    let isNavScrolling = false;
    let navStartX = 0;
    let navScrollLeft = 0;
    
    navTabs.addEventListener('touchstart', (e) => {
        isNavScrolling = true;
        navStartX = e.touches[0].pageX - navTabs.offsetLeft;
        navScrollLeft = navTabs.scrollLeft;
        navTabs.style.cursor = 'grabbing';
    }, { passive: true });
    
    navTabs.addEventListener('touchmove', (e) => {
        if (!isNavScrolling) return;
        e.preventDefault();
        const x = e.touches[0].pageX - navTabs.offsetLeft;
        const walk = (x - navStartX) * 2; // Scroll speed multiplier
        navTabs.scrollLeft = navScrollLeft - walk;
    }, { passive: false });
    
    navTabs.addEventListener('touchend', () => {
        isNavScrolling = false;
        navTabs.style.cursor = 'grab';
    }, { passive: true });
    
    // Mouse events for desktop testing
    navTabs.addEventListener('mousedown', (e) => {
        isNavScrolling = true;
        navTabs.style.cursor = 'grabbing';
        navStartX = e.pageX - navTabs.offsetLeft;
        navScrollLeft = navTabs.scrollLeft;
    });
    
    navTabs.addEventListener('mouseleave', () => {
        isNavScrolling = false;
        navTabs.style.cursor = 'grab';
    });
    
    navTabs.addEventListener('mouseup', () => {
        isNavScrolling = false;
        navTabs.style.cursor = 'grab';
    });
    
    navTabs.addEventListener('mousemove', (e) => {
        if (!isNavScrolling) return;
        e.preventDefault();
        const x = e.pageX - navTabs.offsetLeft;
        const walk = (x - navStartX) * 2;
        navTabs.scrollLeft = navScrollLeft - walk;
    });
}

/**
 * Initialize keyboard navigation for mobile sections
 */
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Only handle keyboard navigation when mobile sections are visible
        const container = document.querySelector('.mobile-sections-container');
        if (!container || window.getComputedStyle(container).display === 'none') return;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                if (currentMobileSection > 0) {
                    swipeToSection(currentMobileSection - 1);
                }
                break;
            case 'ArrowRight':
                e.preventDefault();
                if (currentMobileSection < totalMobileSections - 1) {
                    swipeToSection(currentMobileSection + 1);
                }
                break;
            case 'Home':
                e.preventDefault();
                swipeToSection(0);
                break;
            case 'End':
                e.preventDefault();
                swipeToSection(totalMobileSections - 1);
                break;
        }
    });
}

/**
 * Get current mobile section index
 * @returns {number} Current section index
 */
function getCurrentMobileSection() {
    return currentMobileSection;
}

/**
 * Navigate to next mobile section
 */
function nextMobileSection() {
    if (currentMobileSection < totalMobileSections - 1) {
        swipeToSection(currentMobileSection + 1);
    }
}

/**
 * Navigate to previous mobile section
 */
function previousMobileSection() {
    if (currentMobileSection > 0) {
        swipeToSection(currentMobileSection - 1);
    }
}

/**
 * Handle smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    // Handle smooth scroll links
    document.querySelectorAll('.smooth-scroll, a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just a hash or external link
            if (!href || href === '#' || href.startsWith('http')) return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            
            // Check if we're on mobile and need to navigate to a section
            const mobileContainer = document.querySelector('.mobile-sections-container');
            const isMobile = mobileContainer && window.getComputedStyle(mobileContainer).display !== 'none';
            
            if (isMobile) {
                // Handle mobile section navigation
                const sectionMap = {
                    'about': 0,
                    'band': 1,
                    'music': 2,
                    'gallery': 3,
                    'reviews': 4
                };
                
                if (sectionMap.hasOwnProperty(targetId)) {
                    swipeToSection(sectionMap[targetId]);
                    return;
                }
            }
            
            // Handle desktop smooth scrolling
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Auto-initialize mobile swipeable sections when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure all other scripts are loaded
    setTimeout(() => {
        initMobileSwipeableSections();
        initSmoothScrolling();
    }, 100);
});

// Export functions for global access
if (typeof window !== 'undefined') {
    window.swipeToSection = swipeToSection;
    window.getCurrentMobileSection = getCurrentMobileSection;
    window.nextMobileSection = nextMobileSection;
    window.previousMobileSection = previousMobileSection;
    window.initMobileSwipeableSections = initMobileSwipeableSections;
    window.initSmoothScrolling = initSmoothScrolling;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        swipeToSection,
        getCurrentMobileSection,
        nextMobileSection,
        previousMobileSection,
        initMobileSwipeableSections
    };
}