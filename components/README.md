# Reusable Navbar Component

This directory contains the reusable navbar component for the Kevin Parissien & The Honeymoon Suites website.

## Files

- `navbar.html` - Static HTML template (for server-side includes)
- `navbar-include.js` - JavaScript that automatically inserts navbar into pages
- `navbar.js` - Advanced navbar class with additional features
- `README.md` - This documentation

## Quick Setup for Any Page

### 1. Add CSS
```html
<link href="css/navbar.css" rel="stylesheet">
```

### 2. Add JavaScript (before closing `</body>`)
```html
<script src="components/navbar-include.js"></script>
```

### 3. Use CSS class for content spacing
```html
<div class="container py-5 navbar-page-content">
    <!-- Your page content -->
</div>
```

## Features

✅ **Responsive Design** - Mobile hamburger menu  
✅ **Auto Active State** - Highlights current page automatically  
✅ **Gallery Filter** - Adds filter dropdown on fan-gallery page  
✅ **Smooth Animations** - Hover effects and transitions  
✅ **Accessibility** - Proper ARIA labels and focus states  
✅ **Easy Maintenance** - Update once, applies everywhere  

## Navigation Items

- **Home** → index.html
- **Fan Gallery** → fan-gallery.html  
- **Extended Gallery** → gallery-extended.html
- **Greatest Hits** → greatest-hits.html

## Automatic Features

The navbar automatically:
- Detects current page and sets active state
- Adds filter dropdown on gallery pages
- Handles mobile responsiveness
- Provides smooth animations

## Example Implementation

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Page</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/navbar.css" rel="stylesheet">
</head>
<body>
    <!-- Navbar will be inserted here automatically -->
    
    <div class="container py-5 navbar-page-content">
        <h1>Your Page Content</h1>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="components/navbar-include.js"></script>
</body>
</html>
```

## Updating All Pages

To update all pages to use the reusable navbar:

1. Replace existing navbar HTML with: `<!-- Navbar will be inserted here by navbar-include.js -->`
2. Add `<link href="css/navbar.css" rel="stylesheet">` to `<head>`
3. Add `<script src="components/navbar-include.js"></script>` before other scripts
4. Replace `style="margin-top: 80px;"` with `class="navbar-page-content"`

## Customization

To modify the navbar for all pages, edit:
- `components/navbar-include.js` - For HTML structure and functionality
- `css/navbar.css` - For styling and animations

Changes will automatically apply to all pages using the component.