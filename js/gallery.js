// Gallery JavaScript for Kevin Parissien & The Honeymoon Suites

// Gallery filtering functionality
function filterGallery(category) {
    const sections = document.querySelectorAll('.gallery-section');
    
    sections.forEach(section => {
        if (category === 'all') {
            section.style.display = 'block';
        } else {
            const sectionCategory = section.getAttribute('data-category');
            section.style.display = sectionCategory === category ? 'block' : 'none';
        }
    });
    
    // Update active button
    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.remove('btn-danger');
        btn.classList.add('btn-outline-light');
    });
    event.target.classList.remove('btn-outline-light');
    event.target.classList.add('btn-danger');
}

// Costume try-on functionality
function changeCostume(type) {
    const display = document.getElementById('costumeDisplay');
    if (!display) return;
    
    const costumes = {
        'fur': {
            name: 'Red Fake Fur Coat',
            description: 'Floor-length red fake fur coat that made the band feel like rock stars. Stefan\'s signature design that pushed buttons in personalities they didn\'t know they had.',
            icon: 'fas fa-tshirt'
        },
        'scifi': {
            name: 'Sci-Fi Outfit',
            description: 'Futuristic outfits with turned-up collars that transported the band to another dimension. Perfect for the Luminous Anonymity video shoot.',
            icon: 'fas fa-rocket'
        },
        'glam': {
            name: 'Full Glam Rock',
            description: 'Complete glamrock ensemble with sequins, leather, and attitude. The ultimate 90s South African rock star look.',
            icon: 'fas fa-star'
        }
    };
    
    const costume = costumes[type];
    display.innerHTML = `
        <div class="text-center">
            <i class="${costume.icon} fa-3x text-danger mb-3"></i>
            <h6 class="text-warning">${costume.name}</h6>
            <p class="text-light small">${costume.description}</p>
        </div>
    `;
}

// Fan art generator
function generateFanArt() {
    const display = document.getElementById('fanArtDisplay');
    if (!display) return;
    
    const artStyles = [
        {
            style: 'Abstract Glamrock',
            colors: ['#e94560', '#4ecdc4', '#45b7d1'],
            description: 'Swirling colors representing the band\'s psychedelic energy'
        },
        {
            style: 'Retro Poster',
            colors: ['#ff6b6b', '#ffeaa7', '#96ceb4'],
            description: 'Vintage concert poster aesthetic with bold typography'
        },
        {
            style: 'Neon Dreams',
            colors: ['#e94560', '#00ff88', '#ff00ff'],
            description: 'Electric neon vibes of 90s Cape Town nightlife'
        }
    ];
    
    const randomArt = artStyles[Math.floor(Math.random() * artStyles.length)];
    const gradient = `linear-gradient(45deg, ${randomArt.colors.join(', ')})`;
    
    display.innerHTML = `
        <div class="text-center">
            <div style="background: ${gradient}; height: 100px; border-radius: 10px; margin-bottom: 15px; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-weight: bold;">
                    HONEYMOON SUITES
                </div>
            </div>
            <h6 class="text-warning">${randomArt.style}</h6>
            <p class="text-light small">${randomArt.description}</p>
        </div>
    `;
}

// Initialize gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    // Animate photo cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.photo-card').forEach(card => {
        observer.observe(card);
    });
    
    // Add CSS for fadeInUp animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .photo-card {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
    
    // Add click listeners to track list items
    document.querySelectorAll('.playlist-item').forEach((item, index) => {
        item.addEventListener('click', function() {
            const musicPlayer = document.getElementById('musicPlayer');
            if (musicPlayer && !musicPlayer.classList.contains('active')) {
                togglePlaylist();
            }
            
            setTimeout(() => {
                if (window.player) window.player.playTrack(index);
            }, 300);
        });
    });
});

// Set lightbox data for gallery
window.lightboxData = {
    'band1': {
        title: 'The Complete Band',
        image: 'https://helenakingwill.com/wp-content/uploads/2017/09/honeymoons-2-e1504873114287.jpg',
        description: 'Early band photo showing all original members',
        details: 'From top: Douglas Armstrong, Julia Raynam, Eddie Boyd, Eastern North, Bood Carver, Kevin Parissien, Jamie Jupiter'
    },
    'band2': {
        title: 'Five Star Album',
        image: 'assets/5star.jpeg',
        description: 'The definitive Honeymoon Suites experience',
        details: '12 tracks of glamrock magic from the legendary South African band'
    },
    'band3': {
        title: 'Bood Carver',
        image: 'https://helenakingwill.com/wp-content/uploads/2017/09/img_7689.jpg',
        description: 'Bass & Guitar virtuoso',
        details: 'Songwriter since age 7, influenced by 70s classics like Bee Gees and ABBA'
    }
};