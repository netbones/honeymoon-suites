// Reusable Navbar JavaScript Component

class NavbarComponent {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.init();
    }

    // Determine current page from URL
    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().replace('.html', '');
        
        // Map filenames to page identifiers
        const pageMap = {
            'index': 'home',
            '': 'home', // Root path
            'fan-gallery': 'fan-gallery',
            'gallery-extended': 'gallery-extended',
            'greatest-hits': 'greatest-hits'
        };
        
        return pageMap[filename] || 'home';
    }

    // Initialize navbar functionality
    init() {
        this.setActiveNavItem();
        this.addPageSpecificFeatures();
    }

    // Set active state for current page
    setActiveNavItem() {
        // Remove active class from all nav links
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current page
        const currentNavLink = document.querySelector(`[data-page="${this.currentPage}"]`);
        if (currentNavLink) {
            currentNavLink.classList.add('active');
        }
    }

    // Add page-specific features to navbar
    addPageSpecificFeatures() {
        const navbarExtras = document.getElementById('navbarExtras');
        
        // Add filter dropdown for gallery pages
        if (this.currentPage === 'fan-gallery') {
            this.addGalleryFilter(navbarExtras);
        }
    }

    // Add gallery filter dropdown
    addGalleryFilter(container) {
        const filterDropdown = document.createElement('li');
        filterDropdown.className = 'nav-item dropdown';
        filterDropdown.innerHTML = `
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-filter me-1"></i>Filter
            </a>
            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#" onclick="filterGallery('all')"><i class="fas fa-th me-2"></i>All</a></li>
                <li><a class="dropdown-item" href="#" onclick="filterGallery('band')"><i class="fas fa-users me-2"></i>Band</a></li>
                <li><a class="dropdown-item" href="#" onclick="filterGallery('concerts')"><i class="fas fa-music me-2"></i>Concerts</a></li>
                <li><a class="dropdown-item" href="#" onclick="filterGallery('backstage')"><i class="fas fa-camera me-2"></i>Backstage</a></li>
            </ul>
        `;
        container.appendChild(filterDropdown);
    }

    // Public method to update active page (useful for SPA-like behavior)
    updateActivePage(pageName) {
        this.currentPage = pageName;
        this.setActiveNavItem();
    }
}

// Auto-initialize navbar when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.navbarComponent = new NavbarComponent();
});

// Function to load navbar into page (for pages that include it dynamically)
function loadNavbar(containerId = 'navbar-container') {
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById(containerId).innerHTML = html;
            // Initialize navbar after loading
            setTimeout(() => {
                window.navbarComponent = new NavbarComponent();
            }, 100);
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
        });
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavbarComponent;
}