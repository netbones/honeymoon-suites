# Security Guidelines

## API Key Management

### ⚠️ Important Security Notes

**For Static HTML Sites:**
- API keys in client-side code are **always visible** to users
- Never use server-side API keys in client-side code
- Only use API keys that are designed for client-side use
- Consider rate limiting and domain restrictions

### 🔐 Current API Usage

**YouTube Data API v3:**
- ✅ Safe for client-side use (with restrictions)
- ✅ Can be restricted by domain/referrer
- ✅ Has quota limits to prevent abuse
- ⚠️ Should be restricted to your domain only

### 🛡️ Security Best Practices

1. **Domain Restrictions:**
   - Restrict API keys to your specific domain
   - Set up referrer restrictions in Google Cloud Console

2. **Quota Management:**
   - Monitor API usage in Google Cloud Console
   - Set up alerts for unusual activity

3. **Key Rotation:**
   - Regularly rotate API keys
   - Keep backup keys ready

### 🔧 Setup Instructions

1. **Copy configuration files:**
   ```bash
   cp .env.example .env
   cp config.example.js config.js
   ```

2. **Add your API keys:**
   - Edit `.env` or `config.js` with your actual keys
   - Never commit these files to version control

3. **Configure API restrictions:**
   - Go to Google Cloud Console
   - Restrict keys to your domain
   - Enable only required APIs

### 🚨 If Keys Are Compromised

1. **Immediately revoke** the compromised key
2. **Generate a new key** with proper restrictions
3. **Update your application** with the new key
4. **Monitor usage** for any suspicious activity

### 📝 Environment Variables (for future server-side use)

```bash
# YouTube API
YOUTUBE_API_KEY=your_key_here

# Other services
SPOTIFY_CLIENT_ID=your_id_here
BANDCAMP_API_KEY=your_key_here
```

### 🔍 Code Review Checklist

- [ ] No hardcoded API keys in source code
- [ ] API keys loaded from config files
- [ ] Config files in .gitignore
- [ ] API keys restricted by domain
- [ ] Quota limits configured
- [ ] Error handling for API failures

### 📞 Contact

If you discover a security vulnerability, please contact the maintainers immediately.