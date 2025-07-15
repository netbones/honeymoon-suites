// Test Lab JavaScript for Audio Options Testing

class AudioOptionsTestLab {
    constructor() {
        this.playlist = [
            { 
                title: "Is it really you?", 
                duration: "5:40",
                youtubeId: null,
                youtubeSearchQuery: "Honeymoon Suites Is it really you South Africa",
                bandcampUrl: "https://honeymoonsuites.bandcamp.com/track/is-it-really-you",
                status: { youtube: 'unknown', bandcamp: 'available' }
            },
            { 
                title: "Los Libidos", 
                duration: "6:29",
                youtubeId: null,
                youtubeSearchQuery: "Honeymoon Suites Los Libidos",
                bandcampUrl: "https://honeymoonsuites.bandcamp.com/track/los-libidos",
                status: { youtube: 'unknown', bandcamp: 'available' }
            },
            { 
                title: "Spanish Fly", 
                duration: "5:47",
                youtubeId: null,
                youtubeSearchQuery: "Honeymoon Suites Spanish Fly",
                bandcampUrl: "https://honeymoonsuites.bandcamp.com/track/spanish-fly",
                status: { youtube: 'unknown', bandcamp: 'available' }
            },
            { 
                title: "Shoes", 
                duration: "5:14",
                youtubeId: null,
                youtubeSearchQuery: "Honeymoon Suites Shoes",
                bandcampUrl: "https://honeymoonsuites.bandcamp.com/track/shoes",
                status: { youtube: 'unknown', bandcamp: 'available' }
            },
            { 
                title: "You make me tremble", 
                duration: "5:55",
                youtubeId: null,
                youtubeSearchQuery: "Honeymoon Suites You make me tremble",
                bandcampUrl: "https://honeymoonsuites.bandcamp.com/track/you-make-me-tremble",
                status: { youtube: 'unknown', bandcamp: 'available' }
            },
            { 
                title: "Quality Babe", 
                duration: "6:42",
                youtubeId: null,
                youtubeSearchQuery: "Honeymoon Suites Quality Babe",
                bandcampUrl: "https://honeymoonsuites.bandcamp.com/track/quality-babe",
                status: { youtube: 'unknown', bandcamp: 'available' }
            }
        ];
        
        this.currentSource = null;
        this.currentTrack = null;
        this.youtubePlayer = null;
        this.youtubeReady = false;
        this.testResults = {};
        
        this.init();
    }
    
    init() {
        log('Initializing Audio Options Test Lab...');
        this.renderTrackList();
        this.loadYouTubeAPI();
        this.checkBandcampAvailability();
        log('Test lab ready for testing!');
    }
    
    renderTrackList() {
        const trackListElement = document.getElementById('trackList');
        if (!trackListElement) return;
        
        trackListElement.innerHTML = '';
        
        this.playlist.forEach((track, index) => {
            const trackElement = document.createElement('div');
            trackElement.className = 'track-item p-3 rounded mb-2';
            trackElement.onclick = () => this.testTrack(index);
            
            trackElement.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${track.title}</h6>
                        <small class="text-muted">${track.duration}</small>
                        ${track.youtubeTitle ? `<br><small class="text-info">🎵 ${track.youtubeTitle}</small>` : ''}
                        ${track.youtubeChannel ? `<br><small class="text-warning">📺 ${track.youtubeChannel}</small>` : ''}
                    </div>
                    <div class="text-end">
                        <div class="mb-1">
                            <span class="status-indicator status-${this.getStatusClass(track.status.youtube)}" 
                                  title="YouTube: ${track.youtubeTitle || 'Not tested'}"></span>
                            <small class="me-2">YT</small>
                            <span class="status-indicator status-${this.getStatusClass(track.status.bandcamp)}" 
                                  title="Bandcamp availability"></span>
                            <small>BC</small>
                        </div>
                        <button class="btn btn-outline-light btn-sm" onclick="event.stopPropagation(); testLab.testTrack(${index})">
                            <i class="fas fa-play"></i>
                        </button>
                    </div>
                </div>
            `;
            
            trackListElement.appendChild(trackElement);
        });
    }
    
    getStatusClass(status) {
        switch(status) {
            case 'available': return 'available';
            case 'unavailable': return 'unavailable';
            case 'loading': return 'loading';
            default: return 'unavailable';
        }
    }
    
    async loadYouTubeAPI() {
        log('Loading YouTube IFrame API...');
        
        if (window.YT && window.YT.Player) {
            this.initYouTubePlayer();
            return;
        }
        
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        
        window.onYouTubeIframeAPIReady = () => {
            log('YouTube API loaded successfully');
            this.initYouTubePlayer();
            this.updateSourceStatus('youtube', 'available', 'API Ready');
        };
    }
    
    initYouTubePlayer() {
        const playerElement = document.getElementById('youtubePlayer');
        if (!playerElement) return;
        
        this.youtubePlayer = new YT.Player('youtubePlayer', {
            height: '200',
            width: '100%',
            playerVars: {
                'autoplay': 0,
                'controls': 1,
                'modestbranding': 1,
                'rel': 0
            },
            events: {
                'onReady': () => {
                    this.youtubeReady = true;
                    log('YouTube player ready');
                },
                'onStateChange': (event) => this.onYouTubeStateChange(event),
                'onError': (event) => this.onYouTubeError(event)
            }
        });
    }
    
    onYouTubeStateChange(event) {
        const states = {
            [YT.PlayerState.PLAYING]: 'Playing',
            [YT.PlayerState.PAUSED]: 'Paused',
            [YT.PlayerState.ENDED]: 'Ended',
            [YT.PlayerState.BUFFERING]: 'Buffering'
        };
        
        const state = states[event.data] || 'Unknown';
        this.updatePlaybackStatus(state);
        log(`YouTube player state: ${state}`);
    }
    
    onYouTubeError(event) {
        log(`YouTube player error: ${event.data}`);
        this.updatePlaybackStatus('Error');
    }
    
    checkBandcampAvailability() {
        log('Checking Bandcamp availability...');
        this.updateSourceStatus('bandcamp', 'available', 'Embeds Available');
        
        this.playlist.forEach(track => {
            track.status.bandcamp = 'available';
        });
        this.renderTrackList();
    }
    
    updateSourceStatus(source, status, message) {
        const statusElement = document.getElementById(`${source}-status`);
        const textElement = document.getElementById(`${source}-status-text`);
        
        if (statusElement) {
            statusElement.className = `status-indicator status-${this.getStatusClass(status)}`;
        }
        if (textElement) {
            textElement.textContent = message;
        }
    }
    
    async testTrack(index) {
        const track = this.playlist[index];
        this.currentTrack = track;
        log(`Testing track: ${track.title}`);
        
        const currentTrackName = document.getElementById('currentTrackName');
        const trackDuration = document.getElementById('trackDuration');
        
        if (currentTrackName) currentTrackName.textContent = track.title;
        if (trackDuration) trackDuration.textContent = track.duration;
        
        document.querySelectorAll('.track-item').forEach((item, i) => {
            item.classList.toggle('playing', i === index);
        });
        
        const selectedSource = document.querySelector('.streaming-option.active')?.dataset.source || 'hybrid';
        
        switch(selectedSource) {
            case 'youtube':
                await this.testYouTubeTrack(track);
                break;
            case 'bandcamp':
                await this.testBandcampTrack(track);
                break;
            case 'hybrid':
                await this.testHybridTrack(track);
                break;
        }
    }
    
    async testYouTubeTrack(track) {
        log(`Testing YouTube for: ${track.title}`);
        this.showPlayer('youtube');
        
        const apiKey = document.getElementById('youtubeApiKey')?.value;
        if (!apiKey) {
            log('No YouTube API key provided, using demo video');
            this.playYouTubeVideo('dQw4w9WgXcQ');
            return;
        }
        
        try {
            const searchResults = await this.searchYouTube(track.youtubeSearchQuery, apiKey);
            if (searchResults.length > 0) {
                const videoId = searchResults[0].id.videoId;
                track.youtubeId = videoId;
                track.youtubeTitle = searchResults[0].snippet.title;
                track.youtubeChannel = searchResults[0].snippet.channelTitle;
                track.status.youtube = 'available';
                this.playYouTubeVideo(videoId);
                log(`Found YouTube video: ${track.youtubeTitle}`);
                this.renderTrackList();
            } else {
                track.status.youtube = 'unavailable';
                log(`No YouTube results found for: ${track.title}`);
                this.fallbackToNextSource(track);
            }
        } catch (error) {
            log(`YouTube search error: ${error.message}`);
            this.fallbackToNextSource(track);
        }
    }
    
    async testBandcampTrack(track) {
        log(`Testing Bandcamp for: ${track.title}`);
        this.showPlayer('bandcamp');
        this.loadBandcampEmbed(track.bandcampUrl);
    }
    
    async testHybridTrack(track) {
        log(`Testing hybrid mode for: ${track.title}`);
        
        const apiKey = document.getElementById('youtubeApiKey')?.value;
        if (apiKey) {
            await this.testYouTubeTrack(track);
        } else {
            await this.testBandcampTrack(track);
        }
    }
    
    async searchYouTube(query, apiKey) {
        // Use config if available, otherwise use provided key
        const key = apiKey || (typeof CONFIG !== 'undefined' ? CONFIG.YOUTUBE_API_KEY : '');
        if (!key) {
            throw new Error('No YouTube API key available');
        }
        
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${key}&maxResults=5`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`YouTube API error: ${response.status}`);
        }
        
        const data = await response.json();
        return data.items || [];
    }
    
    playYouTubeVideo(videoId) {
        if (this.youtubePlayer && this.youtubeReady) {
            this.youtubePlayer.loadVideoById(videoId);
            this.currentSource = 'YouTube';
            this.updateCurrentSource('YouTube');
        }
    }
    
    loadBandcampEmbed(trackUrl) {
        const container = document.getElementById('bandcampPlayer');
        if (container) {
            container.innerHTML = `
                <iframe 
                    style="border: 0; width: 100%; height: 200px;" 
                    src="${trackUrl}/embed" 
                    seamless>
                </iframe>
            `;
            this.currentSource = 'Bandcamp';
            this.updateCurrentSource('Bandcamp');
        }
    }
    
    showPlayer(type) {
        const containers = ['youtubePlayerContainer', 'bandcampPlayerContainer', 'demoPlayerContainer'];
        containers.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = id === `${type}PlayerContainer` ? 'block' : 'none';
            }
        });
        
        const playerInfo = document.getElementById('currentPlayerInfo');
        if (playerInfo) {
            playerInfo.innerHTML = `
                <h5 class="text-light">${this.currentTrack?.title || 'Unknown Track'}</h5>
                <p class="text-muted mb-0">Playing via ${type.charAt(0).toUpperCase() + type.slice(1)}</p>
            `;
        }
    }
    
    fallbackToNextSource(track) {
        log(`Falling back to Bandcamp for: ${track.title}`);
        this.testBandcampTrack(track);
    }
    
    updateCurrentSource(source) {
        const currentSource = document.getElementById('currentSource');
        if (currentSource) {
            currentSource.textContent = source;
        }
    }
    
    updatePlaybackStatus(status) {
        const playbackStatus = document.getElementById('playbackStatus');
        if (playbackStatus) {
            playbackStatus.textContent = status;
        }
    }
}

// Global functions for UI interaction
let testLab;

function selectStreamingSource(source) {
    document.querySelectorAll('.streaming-option').forEach(option => {
        option.classList.toggle('active', option.dataset.source === source);
    });
    
    if (testLab) {
        testLab.log(`Selected streaming source: ${source}`);
    }
}

function testAllTracks() {
    if (!testLab) return;
    
    testLab.log('Testing all tracks...');
    testLab.playlist.forEach((track, index) => {
        setTimeout(() => testLab.testTrack(index), index * 3000);
    });
}

function clearResults() {
    if (!testLab) return;
    
    testLab.log('Clearing test results...');
    testLab.playlist.forEach(track => {
        track.status = { youtube: 'unknown', bandcamp: 'available' };
        track.youtubeId = null;
        track.youtubeTitle = null;
        track.youtubeChannel = null;
    });
    testLab.renderTrackList();
}

function exportResults() {
    if (!testLab) return;
    
    const results = {
        timestamp: new Date().toISOString(),
        playlist: testLab.playlist,
        testResults: testLab.testResults
    };
    
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'honeymoon-suites-audio-test-results.json';
    a.click();
    URL.revokeObjectURL(url);
    
    testLab.log('Test results exported');
}

function clearLog() {
    const debugLog = document.getElementById('debugLog');
    if (debugLog) {
        debugLog.innerHTML = '';
    }
}

function toggleDemoPlayback() {
    if (testLab) {
        testLab.log('Demo playback toggled');
        testLab.updatePlaybackStatus('Demo Playing');
    }
}

// Initialize test lab when page loads
document.addEventListener('DOMContentLoaded', function() {
    testLab = new AudioOptionsTestLab();
});