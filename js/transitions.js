// Page Transitions and Lazy Loading

class PageTransitions {
    constructor() {
        this.isTransitioning = false;
        this.preloadedPages = new Set();
        this.lazyImages = [];
        
        this.init();
    }
    
    init() {
        this.createTransitionOverlay();
        this.setupSmoothLinks();
        this.setupLazyLoading();
        this.preloadCriticalPages();
        this.handlePageLoad();
    }
    
    createTransitionOverlay() {
        // Create transition overlay if it doesn't exist
        if (!document.getElementById('pageTransition')) {
            const overlay = document.createElement('div');
            overlay.id = 'pageTransition';
            overlay.className = 'page-transition';
            overlay.innerHTML = '<div class="loading-spinner"></div>';
            document.body.appendChild(overlay);
        }
    }
    
    setupSmoothLinks() {
        // Add smooth transitions to internal links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href]');
            if (!link) return;
            
            const href = link.getAttribute('href');
            
            // Only handle internal HTML pages
            if (href && href.endsWith('.html') && !href.startsWith('http')) {
                e.preventDefault();
                this.navigateToPage(href);
            }
        });
    }
    
    async navigateToPage(url) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        // Show transition overlay
        const overlay = document.getElementById('pageTransition');
        overlay.classList.remove('fade-out');
        
        // Preload the page if not already cached
        if (!this.preloadedPages.has(url)) {
            await this.preloadPage(url);
        }
        
        // Small delay for smooth transition
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Navigate to the page
        window.location.href = url;
    }
    
    async preloadPage(url) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                this.preloadedPages.add(url);
                console.log(`Preloaded: ${url}`);
            }
        } catch (error) {
            console.warn(`Failed to preload: ${url}`, error);
        }
    }
    
    preloadCriticalPages() {
        // Preload key pages in the background
        const criticalPages = [
            'fan-gallery.html',
            'gallery-extended.html',
            'greatest-hits.html'
        ];
        
        // Delay preloading to not interfere with current page
        setTimeout(() => {
            criticalPages.forEach(page => {
                this.preloadPage(page);
            });
        }, 2000);
    }
    
    handlePageLoad() {
        // Handle page load completion
        window.addEventListener('load', () => {
            this.hideTransitionOverlay();
            this.initPageContent();
        });
        
        // Fallback for DOMContentLoaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.hideTransitionOverlay(), 100);
            });
        } else {
            this.hideTransitionOverlay();
        }
    }
    
    hideTransitionOverlay() {
        const overlay = document.getElementById('pageTransition');
        if (overlay) {
            overlay.classList.add('fade-out');
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 500);
        }
        
        this.isTransitioning = false;
    }
    
    initPageContent() {
        // Add page-content class for fade-in animation
        const main = document.querySelector('main') || document.body;
        main.classList.add('page-content');
    }
    
    setupLazyLoading() {
        // Set up intersection observer for lazy loading
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        imageObserver.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });
            
            // Observe all lazy images
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            this.loadAllImages();
        }
    }
    
    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;
        
        // Create a new image to preload
        const imageLoader = new Image();
        imageLoader.onload = () => {
            img.src = src;
            img.classList.add('loaded');
            img.removeAttribute('data-src');
        };
        imageLoader.onerror = () => {
            img.classList.add('error');
            console.warn(`Failed to load image: ${src}`);
        };
        imageLoader.src = src;
    }
    
    loadAllImages() {
        // Fallback: load all images immediately
        document.querySelectorAll('img[data-src]').forEach(img => {
            this.loadImage(img);
        });
    }
}

// Resource preloader for critical assets
class ResourcePreloader {
    constructor() {
        this.totalResources = 0;
        this.loadedResources = 0;
        this.progressBar = null;
        
        this.init();
    }
    
    init() {
        this.createProgressBar();
        this.preloadCriticalResources();
    }
    
    createProgressBar() {
        const preloader = document.createElement('div');
        preloader.className = 'resource-preloader';
        preloader.innerHTML = '<div class="progress"></div>';
        document.body.appendChild(preloader);
        
        this.progressBar = preloader.querySelector('.progress');
    }
    
    async preloadCriticalResources() {
        const resources = [
            'css/common.css',
            'css/gallery.css',
            'css/music-player.css',
            'js/common.js',
            'js/gallery.js',
            'assets/5star.jpeg',
            'assets/firstalbum.jpeg'
        ];
        
        this.totalResources = resources.length;
        
        const promises = resources.map(resource => this.preloadResource(resource));
        await Promise.allSettled(promises);
        
        this.hideProgressBar();
    }
    
    async preloadResource(url) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                this.updateProgress();
            }
        } catch (error) {
            console.warn(`Failed to preload: ${url}`);
            this.updateProgress();
        }
    }
    
    updateProgress() {
        this.loadedResources++;
        const percentage = (this.loadedResources / this.totalResources) * 100;
        
        if (this.progressBar) {
            this.progressBar.style.width = `${percentage}%`;
        }
    }
    
    hideProgressBar() {
        setTimeout(() => {
            const preloader = document.querySelector('.resource-preloader');
            if (preloader) {
                preloader.style.opacity = '0';
                setTimeout(() => preloader.remove(), 300);
            }
        }, 500);
    }
}

// Initialize transitions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PageTransitions();
    new ResourcePreloader();
});

// Prevent white flash by setting background immediately
document.documentElement.style.background = 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)';