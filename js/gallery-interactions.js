// Gallery Interactive Elements for Kevin Parissien & The Honeymoon Suites

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

// Virtual costume try-on functionality
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
    if (costume) {
        display.innerHTML = `
            <div class="text-center">
                <i class="${costume.icon} fa-3x text-danger mb-3"></i>
                <h6 class="text-warning">${costume.name}</h6>
                <p class="text-light small">${costume.description}</p>
            </div>
        `;
    }
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

// Track item interactions for greatest hits page
function initTrackInteractions() {
    const trackItems = document.querySelectorAll('.track-item');
    
    trackItems.forEach(track => {
        track.addEventListener('click', function() {
            // Remove active class from all tracks
            trackItems.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked track
            this.classList.add('active');
            
            // Add visual feedback
            this.style.background = 'rgba(233, 69, 96, 0.3)';
            setTimeout(() => {
                this.style.background = '';
            }, 200);
        });
    });
}

// Initialize gallery interactions
document.addEventListener('DOMContentLoaded', function() {
    initTrackInteractions();
});