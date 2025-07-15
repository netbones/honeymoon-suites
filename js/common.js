// Common JavaScript Functions for Kevin Parissien & The Honeymoon Suites Fan Site

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add hover effects to cards
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.retro-card, .band-member, .photo-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Lightbox functionality
function openLightbox(imageId) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    
    if (!lightbox || !lightboxImage) return;
    
    // Default image data - can be overridden by specific pages
    const imageData = window.lightboxData || {};
    
    const data = imageData[imageId];
    if (data) {
        lightboxImage.innerHTML = `
            <div class="text-center">
                ${data.image ? `<img src="${data.image}" alt="${data.title}" style="max-width: 100%; max-height: 80vh; border-radius: 10px; box-shadow: 0 20px 60px rgba(0,0,0,0.8);">` : ''}
                <div class="mt-4 p-4 bg-dark rounded">
                    <h4 class="text-danger mb-3">${data.title}</h4>
                    <p class="text-light mb-3">${data.description}</p>
                    <p class="text-muted">${data.details}</p>
                </div>
            </div>
        `;
    }
    
    lightbox.classList.add('active');
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
    }
}

// Keyboard navigation for lightbox
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

// Initialize common functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initCardHoverEffects();
    initKeyboardNavigation();
});

// Utility functions
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function log(message, type = 'INFO') {
    const logElement = document.getElementById('debugLog') || document.getElementById('searchLog');
    if (logElement) {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = document.createElement('div');
        logEntry.innerHTML = `[${timestamp}] [${type}] ${message}`;
        logElement.appendChild(logEntry);
        logElement.scrollTop = logElement.scrollHeight;
    }
}