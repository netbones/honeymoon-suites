// Music Player JavaScript for Kevin Parissien & The Honeymoon Suites

class HoneymoonSuitesPlayer {
    constructor() {
        this.playlist = [
            { title: "Is it really you?", duration: "5:40", file: "demo-track-1.mp3" },
            { title: "Los Libidos", duration: "6:29", file: "demo-track-2.mp3" },
            { title: "Spanish Fly", duration: "5:47", file: "demo-track-3.mp3" },
            { title: "Shoes", duration: "5:14", file: "demo-track-4.mp3" },
            { title: "You make me tremble", duration: "5:55", file: "demo-track-5.mp3" },
            { title: "Quality Babe", duration: "6:42", file: "demo-track-6.mp3" },
            { title: "Powdered Love", duration: "5:01", file: "demo-track-7.mp3" },
            { title: "Oh my God (Evil twin)", duration: "3:28", file: "demo-track-8.mp3" },
            { title: "Work that skirt", duration: "4:00", file: "demo-track-9.mp3" },
            { title: "Dr. Strangelove", duration: "5:46", file: "demo-track-10.mp3" },
            { title: "Party in my head", duration: "6:21", file: "demo-track-11.mp3" },
            { title: "Los Libidos (Radio Mix)", duration: "3:33", file: "demo-track-12.mp3" }
        ];
        
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.isShuffled = false;
        this.volume = 0.7;
        this.currentTime = 0;
        this.duration = 0;
        
        this.audioContext = null;
        this.demoInterval = null;
        
        this.initializePlayer();
    }
    
    initializePlayer() {
        document.querySelectorAll('.playlist-item').forEach((item, index) => {
            item.addEventListener('click', () => this.playTrack(index));
        });
        
        this.simulateAudioPlayback();
    }
    
    simulateAudioPlayback() {
        this.demoInterval = setInterval(() => {
            if (this.isPlaying) {
                this.currentTime += 1;
                this.updateProgress();
                
                if (this.currentTime >= this.getDurationInSeconds()) {
                    this.nextTrack();
                }
            }
        }, 1000);
    }
    
    getDurationInSeconds() {
        const duration = this.playlist[this.currentTrackIndex].duration;
        const [minutes, seconds] = duration.split(':').map(Number);
        return minutes * 60 + seconds;
    }
    
    playTrack(index) {
        this.currentTrackIndex = index;
        this.currentTime = 0;
        this.duration = this.getDurationInSeconds();
        
        const currentTrackEl = document.getElementById('currentTrack');
        const totalTimeEl = document.getElementById('totalTime');
        
        if (currentTrackEl) currentTrackEl.textContent = this.playlist[index].title;
        if (totalTimeEl) totalTimeEl.textContent = this.playlist[index].duration;
        
        document.querySelectorAll('.playlist-item').forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        
        this.play();
    }
    
    play() {
        this.isPlaying = true;
        const playBtn = document.getElementById('playPauseBtn');
        const waveform = document.getElementById('waveform');
        
        if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        if (waveform) waveform.style.animationPlayState = 'running';
    }
    
    pause() {
        this.isPlaying = false;
        const playBtn = document.getElementById('playPauseBtn');
        const waveform = document.getElementById('waveform');
        
        if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i>';
        if (waveform) waveform.style.animationPlayState = 'paused';
    }
    
    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
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
    
    toggleShuffle() {
        this.isShuffled = !this.isShuffled;
        const shuffleBtn = document.getElementById('shuffleBtn');
        if (shuffleBtn) {
            shuffleBtn.classList.toggle('btn-danger', this.isShuffled);
            shuffleBtn.classList.toggle('btn-outline-light', !this.isShuffled);
        }
    }
    
    setVolume(value) {
        this.volume = value / 100;
    }
    
    seekTo(event) {
        const progressBar = event.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const percentage = (event.clientX - rect.left) / rect.width;
        this.currentTime = percentage * this.duration;
        this.updateProgress();
    }
    
    updateProgress() {
        const percentage = (this.currentTime / this.duration) * 100;
        const progressFill = document.getElementById('progressFill');
        const currentTimeEl = document.getElementById('currentTime');
        
        if (progressFill) progressFill.style.width = percentage + '%';
        if (currentTimeEl) currentTimeEl.textContent = formatTime(this.currentTime);
    }
}

// Global player instance
let player;

// Global functions for UI interaction
function togglePlaylist() {
    const musicPlayer = document.getElementById('musicPlayer');
    if (musicPlayer) {
        musicPlayer.classList.toggle('active');
        
        if (!player && musicPlayer.classList.contains('active')) {
            player = new HoneymoonSuitesPlayer();
        }
    }
}

function togglePlay() {
    if (player) player.togglePlay();
}

function nextTrack() {
    if (player) player.nextTrack();
}

function previousTrack() {
    if (player) player.previousTrack();
}

function toggleShuffle() {
    if (player) player.toggleShuffle();
}

function setVolume(value) {
    if (player) player.setVolume(value);
}

function seekTo(event) {
    if (player) player.seekTo(event);
}

// Export functions to global scope
if (typeof window !== 'undefined') {
    window.togglePlaylist = togglePlaylist;
    window.togglePlay = togglePlay;
    window.nextTrack = nextTrack;
    window.previousTrack = previousTrack;
    window.toggleShuffle = toggleShuffle;
    window.setVolume = setVolume;
    window.seekTo = seekTo;
    window.player = player;
}