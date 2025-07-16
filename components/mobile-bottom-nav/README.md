# Mobile Bottom Navigation Component

A reusable, touch-friendly bottom navigation component that sits at the bottom of mobile screens for better user navigation.

## Features

✅ **Fixed Bottom Position** - Always visible at the bottom of the screen  
✅ **Touch-Friendly** - Optimized for mobile interactions  
✅ **Auto-Hide on Scroll** - Optional hide/show on scroll behavior  
✅ **Swipe Dots** - Optional dot indicators for swipeable content  
✅ **Keyboard Navigation** - Arrow key support  
✅ **Safe Area Support** - Works with device notches and home indicators  
✅ **Auto-Active Detection** - Automatically highlights current page  
✅ **Customizable** - Easy to configure for different use cases  

## Quick Setup

### 1. Auto-Include (Recommended)
Add this single line before your closing `</body>` tag:

```html
<script src="components/mobile-bottom-nav/mobile-bottom-nav-include.js"></script>
```

### 2. Manual Setup
```html
<!-- CSS -->
<link href="components/mobile-bottom-nav/mobile-bottom-nav.css" rel="stylesheet">

<!-- HTML (add to body) -->
<div class="mobile-bottom-nav d-lg-none" id="mobileBottomNav">
    <div class="mobile-bottom-nav-container">
        <div class="mobile-bottom-nav-tabs" id="mobileBottomNavTabs"></div>
        <div class="mobile-swipe-dots d-none" id="mobileSwipeDots"></div>
    </div>
</div>
<div class="mobile-bottom-nav-spacer d-lg-none"></div>

<!-- JavaScript -->
<script src="components/mobile-bottom-nav/mobile-bottom-nav.js"></script>
```

## Configuration

### Basic Configuration
```javascript
// Set before including the component
window.mobileBottomNavConfig = {
    config: {
        showDots: false,
        hideOnScroll: true,
        autoHide: false
    },
    items: [
        {
            icon: 'fas fa-home',
            label: 'Home',
            href: 'index.html'
        },
        {
            icon: 'fas fa-images',
            label: 'Gallery',
            href: 'fan-gallery.html'
        },
        {
            icon: 'fas fa-microphone',
            label: 'Interview',
            href: 'interview.html'
        }
    ]
};
```

### For Swipeable Sections (like index.html)
```javascript
window.mobileBottomNavConfig = {
    config: {
        showDots: true,
        hideOnScroll: false
    },
    items: [
        {
            icon: 'fas fa-user',
            label: 'About',
            sectionIndex: 0,
            callback: (index, item) => swipeToSection(item.sectionIndex)
        },
        {
            icon: 'fas fa-users',
            label: 'Band',
            sectionIndex: 1,
            callback: (index, item) => swipeToSection(item.sectionIndex)
        },
        {
            icon: 'fas fa-music',
            label: 'Music',
            sectionIndex: 2,
            callback: (index, item) => swipeToSection(item.sectionIndex)
        },
        {
            icon: 'fas fa-images',
            label: 'Gallery',
            sectionIndex: 3,
            callback: (index, item) => swipeToSection(item.sectionIndex)
        },
        {
            icon: 'fas fa-star',
            label: 'Reviews',
            sectionIndex: 4,
            callback: (index, item) => swipeToSection(item.sectionIndex)
        }
    ]
};
```

## Navigation Item Types

### 1. Page Navigation
```javascript
{
    icon: 'fas fa-home',
    label: 'Home',
    href: 'index.html'
}
```

### 2. Section Scrolling
```javascript
{
    icon: 'fas fa-info',
    label: 'About',
    href: '#about'
}
```

### 3. Swipeable Sections
```javascript
{
    icon: 'fas fa-music',
    label: 'Music',
    sectionIndex: 2,
    callback: (index, item) => swipeToSection(item.sectionIndex)
}
```

### 4. Custom Callback
```javascript
{
    icon: 'fas fa-cog',
    label: 'Settings',
    callback: (index, item) => {
        // Custom action
        openSettingsModal();
    }
}
```

## API Methods

### Initialize Manually
```javascript
const nav = new MobileBottomNav({
    showDots: true,
    hideOnScroll: false
});

nav.setNavItems([
    { icon: 'fas fa-home', label: 'Home', href: 'index.html' }
]);
```

### Update Navigation
```javascript
// Update all items
window.updateMobileBottomNav(newItems);

// Set active tab
window.setMobileBottomNavActive(2);

// Using instance methods
window.mobileBottomNavInstance.setActiveTab(1);
window.mobileBottomNavInstance.show();
window.mobileBottomNavInstance.hide();
```

## Integration with Existing Swipeable Sections

### For index.html
Replace the existing mobile navigation tabs with the bottom nav:

```html
<!-- Remove this old navigation -->
<!-- <div class="mobile-nav-tabs" id="mobileNavTabs">...</div> -->

<!-- Add this before closing </body> -->
<script>
window.mobileBottomNavConfig = {
    config: { showDots: true },
    items: [
        { icon: 'fas fa-user', label: 'About', sectionIndex: 0, callback: (i, item) => swipeToSection(item.sectionIndex) },
        { icon: 'fas fa-users', label: 'Band', sectionIndex: 1, callback: (i, item) => swipeToSection(item.sectionIndex) },
        { icon: 'fas fa-music', label: 'Music', sectionIndex: 2, callback: (i, item) => swipeToSection(item.sectionIndex) },
        { icon: 'fas fa-images', label: 'Gallery', sectionIndex: 3, callback: (i, item) => swipeToSection(item.sectionIndex) },
        { icon: 'fas fa-star', label: 'Reviews', sectionIndex: 4, callback: (i, item) => swipeToSection(item.sectionIndex) }
    ]
};
</script>
<script src="components/mobile-bottom-nav/mobile-bottom-nav-include.js"></script>
```

### Sync with Swipeable Sections
Update your `swipeToSection` function to sync with the bottom nav:

```javascript
function swipeToSection(sectionIndex) {
    // Existing swipe logic...
    
    // Sync with bottom nav
    if (window.mobileBottomNavInstance) {
        window.mobileBottomNavInstance.setActiveTab(sectionIndex);
    }
}
```

## Styling Customization

### CSS Custom Properties
```css
.mobile-bottom-nav {
    --nav-bg: rgba(26, 26, 46, 0.95);
    --nav-border: rgba(255, 255, 255, 0.1);
    --tab-bg: rgba(255, 255, 255, 0.05);
    --tab-active-bg: linear-gradient(45deg, rgba(233, 69, 96, 0.8), rgba(233, 69, 96, 0.6));
    --tab-text: rgba(255, 255, 255, 0.7);
    --tab-active-text: white;
}
```

### Responsive Breakpoints
- Shows only on mobile (< 992px)
- Compact mode on very small screens (< 375px)
- Safe area support for devices with notches

## Events

### Listen for Navigation Changes
```javascript
document.getElementById('mobileBottomNav').addEventListener('bottomNavClick', (e) => {
    const { index, item } = e.detail;
    console.log('Navigation clicked:', index, item);
});
```

## Browser Support

- ✅ iOS Safari 12+
- ✅ Chrome Mobile 70+
- ✅ Firefox Mobile 68+
- ✅ Samsung Internet 10+
- ✅ Progressive enhancement for older browsers

## Best Practices

1. **Keep labels short** - Use 1-2 words maximum
2. **Use consistent icons** - Stick to Font Awesome or similar
3. **Limit items** - 3-5 items work best on mobile
4. **Test on devices** - Always test on real mobile devices
5. **Consider thumb reach** - Place important items within easy reach

## Troubleshooting

### Navigation not showing
- Check that you're on a mobile viewport (< 992px)
- Verify CSS and JS files are loading correctly
- Check browser console for errors

### Active state not updating
- Ensure `swipeToSection` calls `setActiveTab`
- Check that navigation items match current page
- Verify callback functions are working

### Styling issues
- Check CSS specificity conflicts
- Verify Bootstrap classes aren't overriding styles
- Test with browser dev tools mobile emulation

This component provides a modern, accessible, and user-friendly navigation experience for mobile users while maintaining the glamrock aesthetic of the site.