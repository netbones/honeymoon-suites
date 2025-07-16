// Simple navbar include script for static HTML pages

(function() {
    // Navbar HTML template
    const navbarHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
            <a class="navbar-brand glam-text fw-bold fs-4" href="index.html">
                <i class="fas fa-music me-2"></i>Kevin Parissien
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="index.html" data-page="home">
                            <i class="fas fa-home me-1"></i>Home
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="fan-gallery.html" data-page="fan-gallery">
                            <i class="fas fa-images me-1"></i>Fan Gallery
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="gallery-extended.html" data-page="gallery-extended">
                            <i class="fas fa-expand me-1"></i>Extended Gallery
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="greatest-hits.html" data-page="greatest-hits">
                            <i class="fas fa-star me-1"></i>Greatest Hits
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="interview.html" data-page="interview">
                            <i class="fas fa-microphone me-1"></i>Interview
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="bood-carver-tribute.html" data-page="bood-carver-tribute">
                            <i class="fas fa-heart me-1"></i>Bood Tribute
                        </a>
                    </li>
                </ul>
                <ul class="navbar-nav" id="navbarExtras">
                    <!-- Page-specific extras will be added here -->
                </ul>
            </div>
        </div>
    </nav>
    `;

    // Function to determine current page
    function getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().replace('.html', '');
        
        const pageMap = {
            'index': 'home',
            '': 'home',
            'fan-gallery': 'fan-gallery',
            'gallery-extended': 'gallery-extended',
            'greatest-hits': 'greatest-hits',
            'interview': 'interview',
            'bood-carver-tribute': 'bood-carver-tribute'
        };
        
        return pageMap[filename] || 'home';
    }

    // Function to set active nav item
    function setActiveNavItem() {
        const currentPage = getCurrentPage();
        
        // Remove active class from all nav links
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current page
        const currentNavLink = document.querySelector(`[data-page="${currentPage}"]`);
        if (currentNavLink) {
            currentNavLink.classList.add('active');
        }
    }

    // Function to add gallery filter for fan-gallery page
    function addGalleryFilter() {
        const currentPage = getCurrentPage();
        if (currentPage === 'fan-gallery') {
            const navbarExtras = document.getElementById('navbarExtras');
            if (navbarExtras) {
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
                navbarExtras.appendChild(filterDropdown);
            }
        }
    }

    // Initialize navbar
    function initNavbar() {
        // Remove any existing placeholder
        const existingPlaceholder = document.querySelector('.navbar-placeholder');
        if (existingPlaceholder) {
            existingPlaceholder.remove();
        }
        
        // Insert navbar HTML at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', navbarHTML);
        
        // Set active nav item immediately
        setActiveNavItem();
        addGalleryFilter();
    }
    
    // Add placeholder immediately to prevent layout shift
    function addNavbarPlaceholder() {
        if (!document.querySelector('.navbar-placeholder')) {
            const placeholder = document.createElement('div');
            placeholder.className = 'navbar-placeholder';
            document.body.insertAdjacentElement('afterbegin', placeholder);
        }
    }

    // Add placeholder immediately to prevent layout shift
    addNavbarPlaceholder();
    
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbar);
    } else {
        initNavbar();
    }

    // Export functions for global use
    window.navbarUtils = {
        setActiveNavItem,
        getCurrentPage,
        addGalleryFilter
    };
})();