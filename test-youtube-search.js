// Standalone YouTube Search Test Script
// Test the API key and search functionality independently

const YOUTUBE_API_KEY = 'AIzaSyB8K0ihnB9gsr45LBCYU7I7We4KxhG7YeA';

async function testYouTubeSearch() {
    console.log('Testing YouTube API with Honeymoon Suites searches...');
    
    const testQueries = [
        'Honeymoon Suites Los Libidos',
        'The Honeymoon Suites South Africa',
        'Honeymoon Suites Quality Babe',
        'Honeymoon Suites Cape Town band',
        'Kevin Parissien Honeymoon Suites',
        '"Honeymoon Suites" "Five Star"',
        'Honeymoon Suites glamrock South Africa'
    ];
    
    for (const query of testQueries) {
        try {
            console.log(`\n🔍 Searching: "${query}"`);
            const results = await searchYouTube(query);
            
            if (results.length > 0) {
                console.log(`✅ Found ${results.length} results:`);
                results.slice(0, 3).forEach((result, index) => {
                    console.log(`  ${index + 1}. "${result.snippet.title}"`);
                    console.log(`     Channel: ${result.snippet.channelTitle}`);
                    console.log(`     Video ID: ${result.id.videoId}`);
                    console.log(`     URL: https://youtube.com/watch?v=${result.id.videoId}`);
                });
            } else {
                console.log('❌ No results found');
            }
            
            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
            
        } catch (error) {
            console.error(`❌ Error searching "${query}":`, error.message);
        }
    }
}

async function searchYouTube(query) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${YOUTUBE_API_KEY}&maxResults=10`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`YouTube API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    return data.items || [];
}

// Test specific track searches
async function testSpecificTracks() {
    const tracks = [
        { title: "Is it really you?", searchQuery: "Honeymoon Suites Is it really you South Africa" },
        { title: "Los Libidos", searchQuery: "Honeymoon Suites Los Libidos" },
        { title: "Spanish Fly", searchQuery: "Honeymoon Suites Spanish Fly" },
        { title: "Quality Babe", searchQuery: "Honeymoon Suites Quality Babe" },
        { title: "Powdered Love", searchQuery: "Honeymoon Suites Powdered Love" }
    ];
    
    console.log('\n🎵 Testing specific Honeymoon Suites tracks...\n');
    
    for (const track of tracks) {
        try {
            console.log(`🎶 Testing: "${track.title}"`);
            const results = await searchYouTube(track.searchQuery);
            
            if (results.length > 0) {
                const bestMatch = findBestMatch(results, track);
                console.log(`✅ Best match: "${bestMatch.snippet.title}"`);
                console.log(`   Channel: ${bestMatch.snippet.channelTitle}`);
                console.log(`   Video ID: ${bestMatch.id.videoId}`);
                console.log(`   URL: https://youtube.com/watch?v=${bestMatch.id.videoId}`);
            } else {
                console.log(`❌ No results found for "${track.title}"`);
            }
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
        } catch (error) {
            console.error(`❌ Error testing "${track.title}":`, error.message);
        }
    }
}

function findBestMatch(searchResults, track) {
    let bestMatch = searchResults[0];
    let bestScore = 0;
    
    searchResults.forEach(result => {
        let score = 0;
        const title = result.snippet.title.toLowerCase();
        const channel = result.snippet.channelTitle.toLowerCase();
        const trackTitle = track.title.toLowerCase();
        
        // Title similarity
        if (title.includes(trackTitle)) score += 10;
        if (title.includes('honeymoon')) score += 5;
        if (title.includes('suites')) score += 5;
        
        // Channel credibility
        if (channel.includes('honeymoon')) score += 15;
        if (channel.includes('official')) score += 10;
        if (channel.includes('music')) score += 3;
        
        // Quality indicators
        if (title.includes('official')) score += 8;
        if (title.includes('hd') || title.includes('high quality')) score += 2;
        
        // Avoid covers and remixes
        if (title.includes('cover') || title.includes('remix')) score -= 5;
        
        if (score > bestScore) {
            bestScore = score;
            bestMatch = result;
        }
    });
    
    return bestMatch;
}

// Run the tests
console.log('🚀 Starting YouTube API tests for The Honeymoon Suites...');
testYouTubeSearch().then(() => {
    console.log('\n🎯 Running specific track tests...');
    return testSpecificTracks();
}).then(() => {
    console.log('\n✅ All tests completed!');
}).catch(error => {
    console.error('❌ Test failed:', error);
});

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { searchYouTube, testYouTubeSearch, testSpecificTracks, findBestMatch };
}