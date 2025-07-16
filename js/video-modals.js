// Video Modal and Live Performances JavaScript Functions

// Video player instance
let videoPlayer = null;

// Video Modal Functions
function openVideoModal() {
    const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
    
    // Show the modal first
    videoModal.show();
    
    // Since XGPlayer doesn't support YouTube URLs directly, 
    // we'll try to use a direct MP4 URL or fall back to iframe
    setTimeout(() => {
        if (!videoPlayer) {
            try {
                // Try to initialize XGPlayer with a sample MP4 (replace with actual video URL if available)
                videoPlayer = new window.Player({
                    id: 'videoPlayer',
                    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Placeholder - replace with actual MP4 URL
                    width: '100%',
                    height: '500px',
                    autoplay: true,
                    poster: 'assets/5star.jpeg',
                    playsinline: true,
                    fluid: true,
                    controls: true,
                    lang: 'en',
                    volume: 0.7
                });
            } catch (error) {
                console.error('XGPlayer initialization failed:', error);
                // Fallback to iframe if XGPlayer fails
                fallbackToIframe();
            }
        } else {
            // If player exists, just play
            videoPlayer.play();
        }
    }, 300);
    
    // Pause music player if it's playing
    if (window.player && window.player.isPlaying) {
        window.player.pause();
    }
}

// Fallback function to use iframe for YouTube
function fallbackToIframe() {
    const videoContainer = document.getElementById('videoPlayer');
    videoContainer.innerHTML = `
        <div class="ratio ratio-16x9">
            <iframe src="https://www.youtube.com/embed/v8_JU3X3UlM?autoplay=1&rel=0&modestbranding=1" 
                    title="Luminous Anonymity Music Video" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen>
            </iframe>
        </div>
    `;
}

// Live Performances Modal Functions
function openLivePerformancesModal() {
    const liveModal = new bootstrap.Modal(document.getElementById('livePerformancesModal'));
    liveModal.show();
    
    // Pause music player if it's playing
    if (window.player && window.player.isPlaying) {
        window.player.pause();
    }
}

// Play specific live video
function playLiveVideo(videoType) {
    // Define video URLs for different performances
    const liveVideos = {
        'klein-karoo': {
            title: 'Klein Karoo Festival - Legendary Week',
            url: 'https://www.youtube.com/embed/v8_JU3X3UlM?autoplay=1&rel=0&modestbranding=1', // Placeholder
            description: 'The legendary week-long residency at an old casino behind a butchery'
        },
        'cape-town': {
            title: 'Cape Town Club Show',
            url: 'https://www.youtube.com/embed/v8_JU3X3UlM?autoplay=1&rel=0&modestbranding=1', // Placeholder
            description: 'Intimate club performance showcasing theatrical stage presence'
        },
        'luminous-live': {
            title: 'Luminous Anonymity - Live Performance',
            url: 'https://www.youtube.com/embed/v8_JU3X3UlM?autoplay=1&rel=0&modestbranding=1', // Placeholder
            description: 'Live performance featuring sci-fi costumes and theatrical staging'
        },
        'festival-highlights': {
            title: 'Festival Highlights Reel',
            url: 'https://www.youtube.com/embed/v8_JU3X3UlM?autoplay=1&rel=0&modestbranding=1', // Placeholder
            description: 'Best moments from various festival performances'
        }
    };
    
    const video = liveVideos[videoType];
    if (!video) return;
    
    // Close live performances modal
    const liveModal = bootstrap.Modal.getInstance(document.getElementById('livePerformancesModal'));
    if (liveModal) {
        liveModal.hide();
    }
    
    // Open video modal with the selected performance
    setTimeout(() => {
        // Update video modal title
        document.getElementById('videoModalLabel').innerHTML = `
            <i class="fas fa-camera me-2"></i>${video.title}
        `;
        
        // Update video modal description
        const modalFooter = document.querySelector('#videoModal .modal-footer .text-start');
        modalFooter.innerHTML = `
            <p class="mb-1 text-white">
                <strong>${video.title}</strong> - The Honeymoon Suites
            </p>
            <small class="text-muted">
                ${video.description}
            </small>
        `;
        
        // Show video modal
        const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
        videoModal.show();
        
        // Load the video
        setTimeout(() => {
            const videoContainer = document.getElementById('videoPlayer');
            videoContainer.innerHTML = `
                <div class="ratio ratio-16x9">
                    <iframe src="${video.url}" 
                            title="${video.title}" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowfullscreen>
                    </iframe>
                </div>
            `;
        }, 300);
    }, 300);
}

// Export functions for global access immediately
if (typeof window !== 'undefined') {
    window.openVideoModal = openVideoModal;
    window.openLivePerformancesModal = openLivePerformancesModal;
    window.playLiveVideo = playLiveVideo;
    
    // Debug logging
    console.log('Video modals functions loaded successfully');
}

// Clean up video when modal is closed
document.addEventListener('DOMContentLoaded', function() {
    const videoModal = document.getElementById('videoModal');
    if (videoModal) {
        videoModal.addEventListener('hidden.bs.modal', function () {
            if (videoPlayer) {
                try {
                    videoPlayer.pause();
                    videoPlayer.destroy();
                } catch (error) {
                    console.log('Error destroying player:', error);
                }
                videoPlayer = null;
            }
            // Also clear the container in case of iframe fallback
            const videoContainer = document.getElementById('videoPlayer');
            if (videoContainer) {
                videoContainer.innerHTML = '';
            }
        });
    }
});