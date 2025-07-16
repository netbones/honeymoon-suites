// Index Page Specific JavaScript

// Page-specific initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize album carousel
    if (typeof initializeAlbumCarousel === 'function') {
        initializeAlbumCarousel();
    }
    
    // Add click listeners to track list items
    document.querySelectorAll('.playlist-item').forEach((item, index) => {
        item.addEventListener('click', function() {
            // Open player if not already open
            const musicPlayer = document.getElementById('musicPlayer');
            if (!musicPlayer.classList.contains('active')) {
                togglePlaylist();
            }
            
            // Play the selected track
            setTimeout(() => {
                if (player) player.playTrack(index);
            }, 300);
        });
    });
});

// Add keyboard shortcuts for music player
document.addEventListener('keydown', function(e) {
    if (!player) return;
    
    switch(e.code) {
        case 'Space':
            e.preventDefault();
            player.togglePlay();
            break;
        case 'ArrowRight':
            e.preventDefault();
            player.nextTrack();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            player.previousTrack();
            break;
    }
});