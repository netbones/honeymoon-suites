// Album Carousel with Touch/Swipe Support

class AlbumCarousel {
    constructor(container) {
        this.container = container;
        this.carousel = container.querySelector('.carousel-container');
        this.slides = container.querySelectorAll('.album-slide');
        this.prevBtn = container.querySelector('.carousel-nav.prev');
        this.nextBtn = container.querySelector('.carousel-nav.next');
        this.indicators = container.querySelectorAll('.indicator');
        
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.isAnimating = false;
        this.autoplayInterval = null;
        this.autoplayDelay = 8000; // 8 seconds
        
        // Touch/Swipe properties
        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.isDragging = false;
        this.dragThreshold = 50;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateCarousel();
        this.startAutoplay();
        this.preloadImages();
    }
    
    setupEventListeners() {
        // Navigation buttons
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Touch events
        this.carousel.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        this.carousel.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
        this.carousel.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
        
        // Mouse events for desktop dragging
        this.carousel.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.carousel.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.carousel.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        this.carousel.addEventListener('mouseleave', (e) => this.handleMouseUp(e));
        
        // Keyboard navigation
        this.container.addEventListener('keydown', (e) => this.handleKeyDown(e));
        
        // Pause autoplay on hover
        this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.container.addEventListener('mouseleave', () => this.startAutoplay());
        
        // Pause autoplay when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoplay();
            } else {
                this.startAutoplay();
            }
        });
    }
    
    // Touch Events
    handleTouchStart(e) {
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
        this.isDragging = true;
        this.pauseAutoplay();
        this.carousel.classList.add('dragging');
    }
    
    handleTouchMove(e) {
        if (!this.isDragging) return;
        
        this.currentX = e.touches[0].clientX;
        this.currentY = e.touches[0].clientY;
        
        const deltaX = this.currentX - this.startX;
        const deltaY = this.currentY - this.startY;
        
        // Prevent vertical scrolling if horizontal swipe is detected
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            e.preventDefault();
        }
        
        // Visual feedback during drag
        const dragDistance = deltaX;
        const maxDrag = this.container.offsetWidth * 0.3;
        const clampedDrag = Math.max(-maxDrag, Math.min(maxDrag, dragDistance));
        
        const currentTransform = -this.currentIndex * 100;
        const dragPercent = (clampedDrag / this.container.offsetWidth) * 100;
        
        this.carousel.style.transform = `translateX(${currentTransform + dragPercent}%)`;
    }
    
    handleTouchEnd(e) {
        if (!this.isDragging) return;
        
        const deltaX = this.currentX - this.startX;
        const deltaY = this.currentY - this.startY;
        
        // Only process horizontal swipes
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.dragThreshold) {
            if (deltaX > 0) {
                this.prevSlide();
            } else {
                this.nextSlide();
            }
        } else {
            // Snap back to current slide
            this.updateCarousel();
        }
        
        this.isDragging = false;
        this.carousel.classList.remove('dragging');
        this.startAutoplay();
    }
    
    // Mouse Events (for desktop dragging)
    handleMouseDown(e) {
        e.preventDefault();
        this.startX = e.clientX;
        this.isDragging = true;
        this.pauseAutoplay();
        this.carousel.classList.add('dragging');
        this.carousel.style.cursor = 'grabbing';
    }
    
    handleMouseMove(e) {
        if (!this.isDragging) return;
        
        this.currentX = e.clientX;
        const deltaX = this.currentX - this.startX;
        
        // Visual feedback during drag
        const dragDistance = deltaX;
        const maxDrag = this.container.offsetWidth * 0.3;
        const clampedDrag = Math.max(-maxDrag, Math.min(maxDrag, dragDistance));
        
        const currentTransform = -this.currentIndex * 100;
        const dragPercent = (clampedDrag / this.container.offsetWidth) * 100;
        
        this.carousel.style.transform = `translateX(${currentTransform + dragPercent}%)`;
    }
    
    handleMouseUp(e) {
        if (!this.isDragging) return;
        
        const deltaX = this.currentX - this.startX;
        
        if (Math.abs(deltaX) > this.dragThreshold) {
            if (deltaX > 0) {
                this.prevSlide();
            } else {
                this.nextSlide();
            }
        } else {
            this.updateCarousel();
        }
        
        this.isDragging = false;
        this.carousel.classList.remove('dragging');
        this.carousel.style.cursor = 'grab';
        this.startAutoplay();
    }
    
    // Keyboard Navigation
    handleKeyDown(e) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.prevSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextSlide();
                break;
            case ' ':
                e.preventDefault();
                this.toggleAutoplay();
                break;
        }
    }
    
    // Navigation Methods
    nextSlide() {
        if (this.isAnimating) return;
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.updateCarousel();
    }
    
    prevSlide() {
        if (this.isAnimating) return;
        this.currentIndex = this.currentIndex === 0 ? this.totalSlides - 1 : this.currentIndex - 1;
        this.updateCarousel();
    }
    
    goToSlide(index) {
        if (this.isAnimating || index === this.currentIndex) return;
        this.currentIndex = index;
        this.updateCarousel();
    }
    
    updateCarousel() {
        this.isAnimating = true;
        
        // Update transform
        this.carousel.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
        
        // Update navigation buttons
        if (this.prevBtn) {
            this.prevBtn.disabled = false; // Always enabled for infinite loop
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = false; // Always enabled for infinite loop
        }
        
        // Update album cover animations
        this.updateAlbumAnimations();
        
        // Reset animation flag after transition
        setTimeout(() => {
            this.isAnimating = false;
        }, 400);
    }
    
    updateAlbumAnimations() {
        // Remove playing animation from all covers
        this.slides.forEach(slide => {
            const cover = slide.querySelector('.album-cover-carousel');
            if (cover) {
                cover.classList.remove('playing');
            }
        });
        
        // Add playing animation to current cover
        const currentSlide = this.slides[this.currentIndex];
        const currentCover = currentSlide?.querySelector('.album-cover-carousel');
        if (currentCover) {
            currentCover.classList.add('playing');
        }
    }
    
    // Autoplay Methods
    startAutoplay() {
        this.pauseAutoplay();
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoplayDelay);
    }
    
    pauseAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    
    toggleAutoplay() {
        if (this.autoplayInterval) {
            this.pauseAutoplay();
        } else {
            this.startAutoplay();
        }
    }
    
    // Preload images for smooth transitions
    preloadImages() {
        this.slides.forEach(slide => {
            const img = slide.querySelector('img[data-src]');
            if (img && window.lazyLoader) {
                window.lazyLoader.loadImageNow(img);
            }
        });
    }
    
    // Public API
    getCurrentIndex() {
        return this.currentIndex;
    }
    
    getTotalSlides() {
        return this.totalSlides;
    }
    
    destroy() {
        this.pauseAutoplay();
        // Remove event listeners if needed
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.album-carousel');
    if (carouselContainer) {
        window.albumCarousel = new AlbumCarousel(carouselContainer);
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AlbumCarousel;
}