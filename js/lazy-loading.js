// Enhanced Lazy Loading for Images

class LazyImageLoader {
    constructor() {
        this.imageObserver = null;
        this.loadedImages = new Set();
        this.failedImages = new Set();
        
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupFallbacks();
        this.preloadCriticalImages();
    }
    
    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            this.imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        this.imageObserver.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '100px 0px',
                threshold: 0.01
            });
            
            this.observeImages();
        } else {
            // Fallback for older browsers
            this.loadAllImages();
        }
    }
    
    observeImages() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            this.imageObserver.observe(img);
        });
    }
    
    async loadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src || this.loadedImages.has(src)) return;
        
        try {
            // Create placeholder while loading
            this.createPlaceholder(img);
            
            // Preload the image
            await this.preloadImage(src);
            
            // Apply the image
            img.src = src;
            img.classList.add('loaded');
            img.removeAttribute('data-src');
            this.loadedImages.add(src);
            
            // Remove placeholder
            this.removePlaceholder(img);
            
        } catch (error) {
            this.handleImageError(img, src);
        }
    }
    
    preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = src;
        });
    }
    
    createPlaceholder(img) {
        const container = img.closest('.lazy-image');
        if (container && !container.querySelector('.image-placeholder')) {
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.innerHTML = `
                <div class="placeholder-content">
                    <i class="fas fa-image fa-2x text-muted mb-2"></i>
                    <div class="placeholder-text">Loading...</div>
                </div>
            `;
            container.appendChild(placeholder);
        }
    }
    
    removePlaceholder(img) {
        const container = img.closest('.lazy-image');
        if (container) {
            const placeholder = container.querySelector('.image-placeholder');
            if (placeholder) {
                placeholder.style.opacity = '0';
                setTimeout(() => placeholder.remove(), 300);
            }
        }
    }
    
    handleImageError(img, src) {
        console.warn(`Failed to load image: ${src}`);
        this.failedImages.add(src);
        
        img.classList.add('error');
        img.alt = 'Image failed to load';
        
        // Create error placeholder
        const container = img.closest('.lazy-image');
        if (container) {
            container.innerHTML = `
                <div class="error-placeholder">
                    <i class="fas fa-exclamation-triangle fa-2x text-warning mb-2"></i>
                    <div class="text-muted small">Image unavailable</div>
                </div>
            `;
        }
    }
    
    preloadCriticalImages() {
        // Preload images that are likely to be viewed first
        const criticalImages = [
            'assets/5star.jpeg',
            'assets/firstalbum.jpeg'
        ];
        
        criticalImages.forEach(src => {
            this.preloadImage(src).catch(() => {
                console.warn(`Failed to preload critical image: ${src}`);
            });
        });
    }
    
    loadAllImages() {
        // Fallback: load all images immediately
        document.querySelectorAll('img[data-src]').forEach(img => {
            this.loadImage(img);
        });
    }
    
    // Public method to manually trigger loading
    loadImageNow(img) {
        if (this.imageObserver) {
            this.imageObserver.unobserve(img);
        }
        this.loadImage(img);
    }
    
    // Public method to add new images to observer
    observeNewImages() {
        if (this.imageObserver) {
            document.querySelectorAll('img[data-src]').forEach(img => {
                if (!this.loadedImages.has(img.getAttribute('data-src'))) {
                    this.imageObserver.observe(img);
                }
            });
        }
    }
}

// Add CSS for placeholders
const style = document.createElement('style');
style.textContent = `
    .image-placeholder,
    .error-placeholder {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.1);
        transition: opacity 0.3s ease;
    }
    
    .placeholder-content,
    .error-placeholder {
        text-align: center;
        color: rgba(255, 255, 255, 0.7);
    }
    
    .placeholder-text {
        font-size: 0.9rem;
        margin-top: 0.5rem;
    }
    
    .lazy-image {
        position: relative;
    }
    
    .lazy-image img {
        transition: opacity 0.5s ease;
    }
    
    .lazy-image img:not(.loaded) {
        opacity: 0;
    }
    
    .lazy-image img.loaded {
        opacity: 1;
    }
    
    .lazy-image img.error {
        display: none;
    }
`;
document.head.appendChild(style);

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.lazyLoader = new LazyImageLoader();
});

// Re-observe images when new content is added
window.addEventListener('load', () => {
    if (window.lazyLoader) {
        window.lazyLoader.observeNewImages();
    }
});