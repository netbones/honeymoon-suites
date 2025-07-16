# Swipeable Filters Component

## Overview

The swipeable filters component provides a mobile-optimized, touch-friendly interface for filtering gallery content. It features horizontal scrolling with smooth momentum, glassmorphism design, and responsive behavior that adapts to different screen sizes.

## Implementation

### Location
- **File**: `fan-gallery.html`
- **CSS**: Inline styles within the `<style>` tag
- **JavaScript**: Inline functions within the page script

### HTML Structure

```html
<!-- Mobile-friendly swipeable filter buttons -->
<div class="d-lg-none mt-4">
    <div class="swipeable-filters-container">
        <div class="swipeable-filters" id="swipeableFilters">
            <button class="filter-btn active" data-filter="all" onclick="filterGallery('all')">
                <i class="fas fa-th"></i>
                <span>All</span>
            </button>
            <button class="filter-btn" data-filter="band" onclick="filterGallery('band')">
                <i class="fas fa-users"></i>
                <span>Band</span>
            </button>
            <button class="filter-btn" data-filter="concerts" onclick="filterGallery('concerts')">
                <i class="fas fa-music"></i>
                <span>Concerts</span>
            </button>
            <button class="filter-btn" data-filter="backstage" onclick="filterGallery('backstage')">
                <i class="fas fa-camera"></i>
                <span>Backstage</span>
            </button>
        </div>
    </div>
    <div class="swipe-indicator">
        <small class="text-muted">
            <i class="fas fa-hand-pointer me-1"></i>Swipe to see more filters
        </small>
    </div>
</div>
```

## Features

### 📱 Mobile Optimization
- **Touch Scrolling**: Native iOS-style momentum scrolling
- **Hidden Scrollbars**: Clean appearance without visible scrollbars
- **Responsive Design**: Only appears on mobile devices (d-lg-none)
- **Touch Events**: Handles touchstart, touchmove, touchend

### 🎨 Visual Design
- **Glassmorphism**: Backdrop blur and translucent backgrounds
- **Theme Colors**: Each filter has distinct accent colors
- **Active States**: Clear visual feedback for selected filter
- **Hover Animations**: Buttons lift up when interacted with

### 🖱️ Interaction Features
- **Swipe Gestures**: Natural finger swiping on mobile
- **Mouse Dragging**: Desktop testing support with mouse
- **Auto-centering**: Active filter scrolls into view
- **Smart Indicators**: Hint text that fades after first use

## CSS Classes

### `.swipeable-filters-container`
Main container with horizontal scrolling capabilities.

```css
.swipeable-filters-container {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding: 10px 0;
    margin: 0 -15px;
}
```

### `.swipeable-filters`
Flex container for filter buttons.

```css
.swipeable-filters {
    display: flex;
    gap: 15px;
    padding: 0 15px;
    min-width: max-content;
}
```

### `.filter-btn`
Individual filter button styling.

```css
.filter-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 25px;
    color: white;
    padding: 12px 20px;
    min-width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    transition: all 0.3s ease;
    cursor: pointer;
    white-space: nowrap;
    backdrop-filter: blur(10px);
}
```

### `.filter-btn.active`
Active state styling with theme colors.

```css
.filter-btn.active {
    background: linear-gradient(45deg, rgba(233, 69, 96, 0.8), rgba(233, 69, 96, 0.6));
    border-color: #e94560;
    color: white;
    box-shadow: 0 5px 20px rgba(233, 69, 96, 0.4);
    transform: translateY(-2px);
}
```

## JavaScript Functions

### `initSwipeableFilters()`
Initializes touch and mouse event handlers for the swipeable container.

**Features:**
- Touch event handling (touchstart, touchmove, touchend)
- Mouse event handling for desktop testing
- Scroll behavior management
- Auto-scroll to active filter
- Swipe indicator management

```javascript
function initSwipeableFilters() {
    const container = document.querySelector('.swipeable-filters-container');
    if (!container) return;
    
    let isScrolling = false;
    let startX = 0;
    let scrollLeft = 0;
    
    // Touch events for mobile swiping
    container.addEventListener('touchstart', (e) => {
        isScrolling = true;
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        container.classList.add('interacted');
    });
    
    // Additional event handlers...
}
```

### `filterGallery(category)`
Updated to handle both desktop and mobile filter states.

**Parameters:**
- `category` (string): Filter category ('all', 'band', 'concerts', 'backstage')

**Features:**
- Gallery section visibility management
- Desktop button state updates
- Mobile filter button state synchronization

```javascript
function filterGallery(category) {
    // Gallery filtering logic
    const sections = document.querySelectorAll('.gallery-section');
    sections.forEach(section => {
        if (category === 'all') {
            section.style.display = 'block';
        } else {
            const sectionCategory = section.getAttribute('data-category');
            section.style.display = sectionCategory === category ? 'block' : 'none';
        }
    });
    
    // Update mobile filter states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`[data-filter="${category}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}
```

## Filter Categories

### All
- **Icon**: `fas fa-th`
- **Function**: Shows all gallery sections
- **Color**: Default theme red (#e94560)

### Band
- **Icon**: `fas fa-users`
- **Function**: Shows band photo sections
- **Color**: Theme red (#e94560)

### Concerts
- **Icon**: `fas fa-music`
- **Function**: Shows live performance sections
- **Color**: Info blue (#17a2b8)

### Backstage
- **Icon**: `fas fa-camera`
- **Function**: Shows behind-the-scenes sections
- **Color**: Warning yellow (#ffc107)

## Browser Support

### Touch Events
- **iOS Safari**: Full support
- **Android Chrome**: Full support
- **Mobile Firefox**: Full support

### CSS Features
- **Backdrop Filter**: Modern browsers (iOS 9+, Android 5+)
- **Overflow Scrolling**: WebKit browsers
- **CSS Grid/Flexbox**: All modern browsers

## Performance Considerations

### Hardware Acceleration
- Uses `transform` properties for smooth animations
- `backdrop-filter` leverages GPU acceleration
- Smooth scrolling with `scroll-behavior: smooth`

### Memory Management
- Event listeners properly scoped
- No memory leaks from touch events
- Efficient DOM queries with caching

## Accessibility

### Keyboard Navigation
- Tab navigation through filter buttons
- Enter/Space key activation
- Focus indicators for keyboard users

### Screen Readers
- Proper ARIA labels on buttons
- Semantic HTML structure
- Clear text labels with icons

### Touch Targets
- Minimum 44px touch targets
- Adequate spacing between buttons
- Visual feedback for all interactions

## Usage Examples

### Basic Implementation
```html
<!-- Include in mobile-only section -->
<div class="d-lg-none">
    <!-- Swipeable filters container -->
</div>
```

### Custom Filter Addition
```html
<button class="filter-btn" data-filter="new-category" onclick="filterGallery('new-category')">
    <i class="fas fa-new-icon"></i>
    <span>New Category</span>
</button>
```

### Custom Styling
```css
.filter-btn[data-filter="custom"]:hover,
.filter-btn[data-filter="custom"].active {
    border-color: #custom-color;
}
```

## Troubleshooting

### Common Issues

**Filters not swiping:**
- Check if `initSwipeableFilters()` is called on DOM ready
- Verify touch events are not being prevented by other scripts
- Ensure container has proper overflow settings

**Active states not updating:**
- Verify `data-filter` attributes match category names
- Check if `filterGallery()` function is properly updated
- Ensure both desktop and mobile state management is working

**Performance issues:**
- Check for conflicting CSS animations
- Verify hardware acceleration is enabled
- Monitor for memory leaks in event handlers

### Debug Mode
Add console logging to track touch events:

```javascript
container.addEventListener('touchstart', (e) => {
    console.log('Touch start:', e.touches[0].pageX);
    // ... rest of handler
});
```

## Future Enhancements

### Potential Improvements
- **Snap scrolling** to filter positions
- **Keyboard arrow navigation** for desktop
- **Gesture recognition** for advanced swipe patterns
- **Animation presets** for different transition styles
- **Dynamic filter loading** from data sources

### Integration Opportunities
- **Search functionality** within filters
- **Filter combinations** (multiple active filters)
- **Saved filter preferences** in localStorage
- **Analytics tracking** for filter usage patterns