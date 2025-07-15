// Fan Gallery JavaScript for Kevin Parissien & The Honeymoon Suites

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

// Lightbox image data
const imageData = {
    'band1': {
        title: 'The Complete Band',
        image: 'https://helenakingwill.com/wp-content/uploads/2017/09/honeymoons-2-e1504873114287.jpg',
        description: 'Complete band photo showing all original members',
        details: 'From top: Douglas Armstrong, Julia Raynam, Eddie Boyd, Eastern North, Bood Carver, Kevin Parissien, Jamie Jupiter'
    },
    'band2': {
        title: 'Five Star Album',
        image: 'assets/5star.jpeg',
        description: 'The definitive Honeymoon Suites experience - 12 tracks of glamrock magic',
        details: 'Official album cover featuring the distinctive Honeymoon Suites aesthetic'
    },
    'band3': {
        title: 'Bood Carver - Bass & Guitar',
        image: 'https://helenakingwill.com/wp-content/uploads/2017/09/img_7689.jpg',
        description: 'Portrait of Julian "Bood" Carver',
        details: 'Songwriter since age 7, influenced by 70s classics like Bee Gees and ABBA. Scorpio who brought rhythmic foundation to the band.'
    },
    'concert1': {
        title: 'Luminous Anonymity Video',
        description: 'Official music video shot by Majita Films with 25-person crew working for free on Workers\' Day.',
        details: 'Directed by Tim Green, produced by Platon Trakoshis'
    },
    'concert2': {
        title: 'Live Performance',
        description: 'Rare live footage showing the band\'s theatrical stage presence and musical prowess',
        details: 'Cape Town venues including The Magnet, The Lounge, and Graceland'
    },
    'backstage1': {
        title: 'Folk Me - Later Project',
        image: 'https://helenakingwill.com/wp-content/uploads/2017/09/folk-me-e1504904542828.jpg',
        description: 'Folk Me band featuring Bood Carver and Jamie',
        details: 'Later musical project that was about to be revived before Bood\'s passing'
    },
    'backstage2': {
        title: 'Angels on Horseback',
        image: 'https://helenakingwill.com/wp-content/uploads/2017/09/cimg1891.jpg',
        description: 'Award-winning cowboy-cabaret show featuring band members',
        details: 'Theatrical endeavor showcasing the band\'s performance versatility'
    },
    'backstage3': {
        title: 'B&S Studios Recording Sessions',
        description: 'Where the magic of the Five Star album was captured.',
        details: 'Creating their unique blend of goodtime rock and lounge-lizard schmaltz'
    }
};

// Lightbox functionality using common.js
function openLightbox(imageId) {
    window.openLightbox(imageId, imageData);
}

// Costume try-on functionality
function changeCostume(type) {
    const display = document.getElementById('costumeDisplay');
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
    if (display && costume) {
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
    
    if (display) {
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
}