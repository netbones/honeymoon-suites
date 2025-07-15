// Enhanced Music Player with Real Streaming APIs
// Kevin Parissien & The Honeymoon Suites Fan Site

class StreamingMusicPlayer {
    constructor() {
        this.playlist = [
            { 
                title: "Is it really you?", 
                duration: "5:40", 
                youtubeId: null, // To be populated with actual video IDs
                bandcampUrl: "https://honeymoonsuites.bandcamp.com/track/is-it-really-you",
                searchQuery: "Honeymoon Suites Is it really you South Africa"
            },
            { 
                title: "Los Libidos", 
                duration: "6:29", 
                youtubeId: null,
                bandcampUrl: "https://honeymoonsuites.bandcamp.com/track/los-libidos",
                searchQuery: "Honeymoon Suites Los Libidos"
            },
            { 
                title: "Spanish Fly", 
                duration: "5:47", 
                youtubeId: null,
                bandcampUrl: "https://honeymoonsuites.bandcamp.com/track/spanish-fly",
                searchQuery: "Honeymoon Suites Spanish Fly"
            },
            { 
                title: "Shoes", 
                duration: "5:14", 
                youtubeId: null,
                bandcampUrl: "https://honeymoonsuites.bandcamp.com/track/shoes",
                searchQuery: "Honeymoon Suites Shoes"
            },
            { 
                title: "You make me tremble", 
                duration: "5:55", 
                youtubeId: null,
                bandcampUrl: "https://honeymoonsuites.bandcamp.com/track/you-make-me-tremble",
                searchQuery: "Honeymoon Suites You make me tremble"
            },
            { 
                title: "Quality Babe", 
                duration: "6:42", 
                youtubeId: null,
                bandcampUrl: "https://honeymoonsuites.bandcamp.com/track/quality-babe",
                searchQuery: "Honeymoon Suites Quality Babe"
            },
            { 
                title: "Powdered Love", 
                duration: "5:01", 
                youtubeId: null,
                bandcampUrl: "https://honeymoonsuites.bandcamp.com/track/powdered-love",
                searchQuery: "Honeymoon Suites Powdered Love"
            },
            { 
                title: "Oh my God (Evil twin)", 
                duration: "3:28", 
                youtubeId: null,
                bandcampUrl: "https://honeymoonsuites.bandcamp.com/track/oh-my-god-evil-twin",
                searchQuery: "Honeymoon Suites Oh my God Evil twin"
            },
            { 
                title: "Work that skirt", 
                duration: "4:00", 
                youtubeId: null,
                bandcampUrl: "https://honeymoonsuites.bandcamp.com/track/work-that-skirt",
                searchQuery: "Honeymoon Suites Work that skirt"
            },
            { 
                title: "Dr. Strangelove", 
                duration: "5:46", 
                youtubeId: null,
                bandcampUrl: "https://honeymoonsuites.bandcamp.com/track/dr-strangelove",
                searchQuery: "Honeymoon Suites Dr Strangelove"
            },
            { 
                title: "Party in my head", 
                duration: "6:21", 
                youtubeId: null,
                bandcampUrl: "https://honeymoonsuites.bandcamp.com/track/party-in-my-head",
                searchQuery: "Honeymoon Suites Party in my head"
            },
            { 
                title: "Los Libidos (Radio Mix)", 
                duration: "3:33", 
                youtubeId: null,
                bandcampUrl: "https://honeymoonsuites.bandcamp.com/track/los-libidos-radio-mix",
                searchQuery: "Honeymoon Suites Los Libidos Radio Mix"
            }
        ];
        
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.isShuffled = false;
        this.volume = 70;
        this.streamingSource = 'youtube'; // 'youtube' or 'bandcamp'
        
        // YouTube Player
        this.youtubePlayer = null;
        this.youtubeReady = false;
        
        // Bandcamp Player
        this.bandcampPlayer = null;
        
        this.initializePlayer();
    }
    
    async initializePlayer() {
        // Load YouTube API
        await this.loadYouTubeAPI();
        
        // Initialize UI
        this.setupEventListeners();
        
        // Try to find YouTube videos for tracks
        await this.searchForTracks();
    }
    
    loadYouTubeAPI() {
        return new Promise((resolve) => {
            if (window.YT && window.YT.Player) {
                resolve();
                return;
            }
            
            // Load YouTube IFrame API
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            
            // YouTube API ready callback
            window.onYouTubeIframeAPIReady = () => {
                this.createYouTubePlayer();
                resolve();
            };
        });
    }
    
    createYouTubePlayer() {
        // Create hidden YouTube player
        const playerDiv = document.createElement('div');
        playerDiv.id = 'youtube-player';
        playerDiv.style.display = 'none';
        document.body.appendChild(playerDiv);
        
        this.youtubePlayer = new YT.Player('youtube-player', {
            height: '0',
            width: '0',
            playerVars: {
                'autoplay': 0,
                'controls': 0,
                'disablekb': 1,
                'fs': 0,
                'modestbranding': 1,
                'rel': 0
            },
            events: {
                'onReady': () => {
                    this.youtubeReady = true;
                    console.log('YouTube player ready');
                },
                'onStateChange': (event) => this.onYouTubeStateChange(event),
                'onError': (event) => this.onYouTubeError(event)
            }
        });
    }
    
    onYouTubeStateChange(event) {
        switch(event.data) {
            case YT.PlayerState.PLAYING:
                this.isPlaying = true;
                this.updatePlayButton();
                this.startProgressTracking();
                break;
            case YT.PlayerState.PAUSED:
                this.isPlaying = false;
                this.updatePlayButton();
                this.stopProgressTracking();
                break;
            case YT.PlayerState.ENDED:
                this.nextTrack();
                break;
        }
    }
    
    onYouTubeError(event) {
        console.error('YouTube player error:', event.data);
        // Fallback to next track or Bandcamp
        this.nextTrack();
    }
    
    async searchForTracks() {
        // In a real implementation, you'd use YouTube Data API to search
        // For demo purposes, we'll use placeholder video IDs
        // You would need to implement actual search functionality
        
        console.log('Searching for tracks on YouTube...');
        
        // Example: You could use YouTube Data API v3 to search
        // const searchResults = await this.searchYouTube(track.searchQuery);
        
        // For now, we'll use some known video IDs or search manually
        // This would be replaced with actual API calls
        this.playlist[0].youtubeId = 'dQw4w9WgXcQ'; // Placeholder
        this.playlist[1].youtubeId = 'dQw4w9WgXcQ'; // Placeholder
        // ... etc
    }
    
    async searchYouTube(query) {
        // YouTube Data API v3 search implementation
        // Requires API key from Google Cloud Console
        const API_KEY = 'YOUR_YOUTUBE_API_KEY'; // User would need to provide this
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.items;
        } catch (error) {
            console.error('YouTube search error:', error);
            return [];
        }
    }
    
    setupEventListeners() {
        // Add click listeners to playlist items
        document.querySelectorAll('.playlist-item').forEach((item, index) => {
            item.addEventListener('click', () => this.playTrack(index));
        });
    }
    
    playTrack(index) {
        this.currentTrackIndex = index;
        const track = this.playlist[index];
        
        // Update UI
        document.getElementById('currentTrack').textContent = track.title;
        document.getElementById('totalTime').textContent = track.duration;
        
        // Update playlist visual state
        document.querySelectorAll('.playlist-item').forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        
        // Play based on available source
        if (this.streamingSource === 'youtube' && track.youtubeId && this.youtubeReady) {
            this.playYouTube(track.youtubeId);
        } else {
            this.playBandcamp(track.bandcampUrl);
        }
    }
    
    playYouTube(videoId) {
        if (this.youtubePlayer && this.youtubeReady) {
            this.youtubePlayer.loadVideoById(videoId);
            this.youtubePlayer.setVolume(this.volume);
        }
    }
    
    playBandcamp(trackUrl) {
        // Create Bandcamp embed iframe
        this.createBandcampEmbed(trackUrl);
    }
    
    createBandcampEmbed(trackUrl) {
        // Remove existing Bandcamp player
        const existingEmbed = document.getElementById('bandcamp-embed');
        if (existingEmbed) {
            existingEmbed.remove();
        }
        
        // Create new Bandcamp embed
        const embedContainer = document.createElement('div');
        embedContainer.id = 'bandcamp-embed';
        embedContainer.style.display = 'none';
        
        // Bandcamp embed iframe
        const iframe = document.createElement('iframe');
        iframe.style.border = '0';
        iframe.style.width = '100%';
        iframe.style.height = '120px';
        iframe.src = `${trackUrl}/embed`;
        iframe.seamless = true;
        
        embedContainer.appendChild(iframe);
        document.body.appendChild(embedContainer);
        
        // Note: Bandcamp embeds have limited JavaScript control
        // You might need to use postMessage API for more control
    }
    
    togglePlay() {
        if (this.streamingSource === 'youtube' && this.youtubePlayer && this.youtubeReady) {
            if (this.isPlaying) {
                this.youtubePlayer.pauseVideo();
            } else {
                this.youtubePlayer.playVideo();
            }
        }
        // Bandcamp player control would need different implementation
    }
    
    nextTrack() {
        let nextIndex;
        if (this.isShuffled) {
            nextIndex = Math.floor(Math.random() * this.playlist.length);
        } else {
            nextIndex = (this.currentTrackIndex + 1) % this.playlist.length;
        }
        this.playTrack(nextIndex);
    }
    
    previousTrack() {
        const prevIndex = this.currentTrackIndex === 0 ? 
            this.playlist.length - 1 : this.currentTrackIndex - 1;
        this.playTrack(prevIndex);
    }
    
    setVolume(value) {
        this.volume = value;
        if (this.youtubePlayer && this.youtubeReady) {
            this.youtubePlayer.setVolume(value);
        }
    }
    
    updatePlayButton() {
        const playBtn = document.getElementById('playPauseBtn');
        if (playBtn) {
            playBtn.innerHTML = this.isPlaying ? 
                '<i class="fas fa-pause"></i>' : 
                '<i class="fas fa-play"></i>';
        }
    }
    
    startProgressTracking() {
        this.progressInterval = setInterval(() => {
            if (this.youtubePlayer && this.youtubeReady && this.isPlaying) {
                const currentTime = this.youtubePlayer.getCurrentTime();
                const duration = this.youtubePlayer.getDuration();
                this.updateProgress(currentTime, duration);
            }
        }, 1000);
    }
    
    stopProgressTracking() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
    }
    
    updateProgress(currentTime, duration) {
        const percentage = (currentTime / duration) * 100;
        const progressFill = document.getElementById('progressFill');
        const currentTimeEl = document.getElementById('currentTime');
        
        if (progressFill) {
            progressFill.style.width = percentage + '%';
        }
        
        if (currentTimeEl) {
            currentTimeEl.textContent = this.formatTime(currentTime);
        }
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    seekTo(event) {
        if (this.youtubePlayer && this.youtubeReady) {
            const progressBar = event.currentTarget;
            const rect = progressBar.getBoundingClientRect();
            const percentage = (event.clientX - rect.left) / rect.width;
            const duration = this.youtubePlayer.getDuration();
            const seekTime = percentage * duration;
            this.youtubePlayer.seekTo(seekTime);
        }
    }
    
    toggleShuffle() {
        this.isShuffled = !this.isShuffled;
        const shuffleBtn = document.getElementById('shuffleBtn');
        if (shuffleBtn) {
            shuffleBtn.classList.toggle('btn-danger', this.isShuffled);
            shuffleBtn.classList.toggle('btn-outline-light', !this.isShuffled);
        }
    }
    
    switchStreamingSource(source) {
        this.streamingSource = source;
        console.log(`Switched to ${source} streaming`);
        
        // Update UI to show current source
        const sourceIndicator = document.getElementById('streamingSource');
        if (sourceIndicator) {
            sourceIndicator.textContent = source === 'youtube' ? 'YouTube' : 'Bandcamp';
        }
    }
}

// Export for use in main HTML file
window.StreamingMusicPlayer = StreamingMusicPlayer;