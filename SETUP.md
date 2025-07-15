# Setup Guide - Kevin Parissien & The Honeymoon Suites Fan Site

## 🚀 Quick Start

### 1. Basic Setup (No API Required)
```bash
# Download or clone the repository
# Open index.html in any modern web browser
# Enjoy the fan site with demo music player
```

**What works without setup:**
- ✅ Complete fan site navigation
- ✅ Photo galleries with real images
- ✅ Interactive elements (costume try-on, fan art generator)
- ✅ Demo music player with simulated playback
- ✅ All visual effects and animations

## 🔧 Advanced Setup (YouTube API Integration)

### 2. Get YouTube API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **YouTube Data API v3**
4. Create credentials → API Key
5. **Important**: Restrict the key to your domain for security

### 3. Configure API Key
```bash
# Copy the configuration template
cp config.example.js config.js

# Edit config.js and add your API key:
# Replace 'your_youtube_api_key_here' with your actual key
```

**Example config.js:**
```javascript
const CONFIG = {
    YOUTUBE_API_KEY: 'AIzaSyB8K0ihnB9gsr45LBCYU7I7We4KxhG7YeA',
    // Add other API keys here as needed
};
```

### 4. Security Configuration
In Google Cloud Console:
- ✅ **HTTP referrers**: Restrict to your domain
- ✅ **API restrictions**: Enable only YouTube Data API v3
- ✅ **Quota limits**: Set reasonable daily limits
- ✅ **Monitoring**: Enable usage alerts

## 🎵 What API Integration Enables

### Audio Testing Pages
- **Real YouTube search** for Honeymoon Suites tracks
- **Automatic track discovery** with metadata
- **Live streaming** of found tracks
- **Fallback systems** (YouTube → Bandcamp → Demo)

### Enhanced Features
- **Track availability checking** across platforms
- **Quality scoring** for search results
- **Developer tools** for audio integration testing
- **Export functionality** for test results

## 📁 File Organization

### Required Files
```
config.js              # Your API configuration (create from template)
config.example.js      # Template file (don't edit)
```

### Protected Files (in .gitignore)
```
config.js              # Contains your API keys
.env                   # Environment variables (if used)
secrets.js             # Any other sensitive configuration
```

## 🛡️ Security Best Practices

### API Key Protection
1. **Never commit** config.js to version control
2. **Use domain restrictions** in Google Cloud Console
3. **Monitor usage** regularly for unusual activity
4. **Rotate keys** periodically for security

### Production Deployment
1. **HTTPS only** - Never use API keys over HTTP
2. **Domain restrictions** - Limit to your production domain
3. **Rate limiting** - Set appropriate quotas
4. **Error handling** - Graceful fallbacks when API fails

## 🔍 Testing Your Setup

### 1. Basic Functionality Test
- Open `index.html` in browser
- Navigate through all sections
- Test music player demo mode
- Verify all images load correctly

### 2. API Integration Test
- Open `audio-options-test.html`
- Check if "API Key Loaded" appears
- Try searching for a track
- Verify YouTube player loads

### 3. Advanced Testing
- Open `enhanced-audio-test.html`
- Run "Start Auto Search"
- Check debug console for results
- Export test results

## 🐛 Troubleshooting

### Common Issues

**"No API key available" error:**
- Ensure `config.js` exists and has correct format
- Check that `CONFIG.YOUTUBE_API_KEY` is set
- Verify the key is valid in Google Cloud Console

**"API error: 403" responses:**
- Check domain restrictions in Google Cloud Console
- Ensure YouTube Data API v3 is enabled
- Verify quota limits haven't been exceeded

**Tracks not found:**
- The Honeymoon Suites are a niche South African band
- Not all tracks may be available on YouTube
- Try different search terms or manual searches

**Player not loading:**
- Check browser console for JavaScript errors
- Ensure all CSS/JS files are loading correctly
- Try different browsers (Chrome, Firefox, Safari)

### Debug Steps
1. **Open browser developer tools** (F12)
2. **Check console** for error messages
3. **Verify network requests** are successful
4. **Test with demo mode** first
5. **Check API key configuration**

## 📞 Support

### Self-Help Resources
- Check browser console for error messages
- Review `SECURITY.md` for security guidelines
- Test with different browsers and devices
- Verify all files are uploaded correctly

### Configuration Validation
```javascript
// Test in browser console:
console.log(typeof CONFIG !== 'undefined' ? 'Config loaded' : 'Config missing');
console.log(CONFIG?.YOUTUBE_API_KEY ? 'API key present' : 'API key missing');
```

## 🎯 Next Steps

### After Basic Setup
1. **Explore all gallery sections** and interactive elements
2. **Test the demo music player** functionality
3. **Read about the band** in the fan memories section

### After API Setup
1. **Test YouTube integration** in the audio lab
2. **Search for actual tracks** and verify results
3. **Export test results** for analysis
4. **Monitor API usage** in Google Cloud Console

### For Developers
1. **Review the modular CSS/JS structure**
2. **Understand the fallback systems**
3. **Explore the test lab functionality**
4. **Consider contributing improvements**

---

**Ready to rock?** 🎸 Start with the basic setup and explore the amazing world of Kevin Parissien & The Honeymoon Suites!