# 🎨 Customization Guide

## Quick Updates You Can Make

### 1. Update Text Content

**Location:** `index.html`

Find and replace text directly in the HTML. All content is clearly marked with comments.

Example:
```html
<!-- Mission Statement -->
<section class="mission">
    <p class="mission-text">
        Your updated mission text here...
    </p>
</section>
```

---

### 2. Update Statistics & Numbers

**Method 1: Simple text replacement in HTML**

Find the stat cards and update the numbers:
```html
<div class="stat-card" data-count="1000">
    <div class="stat-number">0+</div>
    <div class="stat-label">Your Label Here</div>
</div>
```

- `data-count="1000"` - Change this number to update the animated counter
- The `0+` will be replaced automatically by the animation

**Method 2: Update chart data in JavaScript**

**Location:** `script.js` (around line 50)

```javascript
data: {
    labels: ['2021', '2022', '2023', '2024', '2025'],
    datasets: [{
        label: 'Accepted Students',
        data: [54, 77, 110, 170, 199],  // ← Change these numbers
        //...
    }]
}
```

---

### 3. Update Images

**Replace placeholder images with your actual images:**

In `index.html`, find image tags and update the `src` attribute:

```html
<!-- Before -->
<img src="https://via.placeholder.com/..." alt="Description">

<!-- After -->
<img src="your-image-url-here.jpg" alt="Description">
```

**Image optimization tips:**
- Use WebP format for smaller file sizes
- Recommended sizes:
  - Hero image: 1920x1080px
  - Section images: 1200x800px
  - Thumbnails: 400x300px
  - Partner logos: 200x80px (transparent background)

---

### 4. Update Colors

**Location:** `styles.css` (top of file)

```css
:root {
    --color-primary: #eb0029;      /* Main red color */
    --color-black: #000000;        /* Text color */
    --color-dark-gray: #4d4d4d;    /* Secondary text */
    --color-medium-gray: #babcbf;  /* Borders */
    --color-light-gray: #e5e7e7;   /* Backgrounds */
    --color-white: #ffffff;        /* White */
    --color-blue: #115a7f;         /* Accent blue */
    --color-light-blue: #83b4df;   /* Light blue */
}
```

Change any color by updating the hex code!

---

### 5. Add New Sections

**Copy an existing section structure:**

```html
<section class="your-section-name">
    <div class="container">
        <h2 class="section-title">Your Section Title</h2>
        <p>Your content here...</p>
    </div>
</section>
```

**Add corresponding CSS:**

```css
.your-section-name {
    background: var(--color-white);
    /* Your custom styles */
}
```

---

### 6. Update Partner Logos

**Location:** `index.html` - Partners section

```html
<div class="partners-grid">
    <div class="partner-logo">
        <img src="logo1.png" alt="Partner Name">
    </div>
    <div class="partner-logo">
        <img src="logo2.png" alt="Partner Name">
    </div>
    <!-- Add more partner logos -->
</div>
```

**Tips:**
- Use transparent PNG logos
- Recommended size: 200x80px
- White or transparent background works best

---

### 7. Update Testimonials

**Location:** `index.html` - Testimonials section

```html
<div class="testimonial-card">
    <div class="stars">★★★★★</div>
    <blockquote class="testimonial-quote">
        "Your testimonial text here..."
    </blockquote>
    <div class="testimonial-author">
        <strong>Student Name</strong><br>
        <span>University Name</span>
    </div>
</div>
```

**Add more testimonials:**
Just copy the entire `testimonial-card` div and update the content.

---

### 8. Update Footer

**Location:** `index.html` - Footer section

```html
<footer class="footer">
    <div class="footer-links">
        <a href="your-url">Your Link</a>
        <!-- Add more links -->
    </div>
    <div class="footer-social">
        <a href="linkedin-url">LinkedIn</a>
        <a href="twitter-url">Twitter</a>
        <!-- Add more social links -->
    </div>
</footer>
```

---

### 9. Adjust Animation Speed

**Location:** `script.js`

**Counter animation speed:**
```javascript
const duration = 2000; // Change to 1000 for faster, 3000 for slower
```

**Scroll animation speed:**
```javascript
// In the CSS
section {
    transition: all 0.8s ease; /* Change 0.8s to your preferred speed */
}
```

---

### 10. Update Fonts

**Currently using:** Founders Grotesk (referenced in CSS)

**To change font:**

1. **Using Google Fonts:**
   - Visit https://fonts.google.com
   - Select your font
   - Copy the `<link>` code
   - Paste in `<head>` of `index.html`
   - Update CSS:
   ```css
   :root {
       --font-primary: 'Your Font Name', sans-serif;
   }
   ```

2. **Using custom font files:**
   - Add font files to project folder
   - Add to CSS:
   ```css
   @font-face {
       font-family: 'Your Font';
       src: url('your-font.woff2') format('woff2');
   }
   ```

---

## Advanced Customizations

### Add Google Analytics

Add before closing `</head>` tag in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

### Add Custom Animations

Add to `styles.css`:

```css
@keyframes yourAnimation {
    0% { /* starting state */ }
    100% { /* ending state */ }
}

.your-element {
    animation: yourAnimation 1s ease;
}
```

### Change Layout Structure

Modify grid layouts in `styles.css`:

```css
.your-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 columns */
    gap: 40px;
}
```

---

## Responsive Design Tips

The site is already responsive, but to adjust breakpoints:

**Location:** `styles.css` (bottom of file)

```css
@media (max-width: 1024px) {
    /* Tablet styles */
}

@media (max-width: 768px) {
    /* Mobile styles */
}
```

---

## File Organization Best Practices

```
seo-impact-report/
├── index.html          # Keep all HTML here
├── styles.css          # Keep all CSS here
├── script.js           # Keep all JS here
├── images/             # Create folder for images
│   ├── hero.jpg
│   ├── logos/
│   └── testimonials/
└── README.md
```

---

## Testing Checklist

Before deploying updates:

- [ ] Test on desktop (Chrome, Firefox, Safari)
- [ ] Test on mobile (iOS, Android)
- [ ] Check all links work
- [ ] Verify all images load
- [ ] Test animations and interactions
- [ ] Check loading speed
- [ ] Verify responsive design
- [ ] Test with slow internet connection

---

## Common Issues & Solutions

### Issue: Counter not animating
**Solution:** Check `data-count` attribute matches the target number

### Issue: Chart not showing
**Solution:** Verify Chart.js CDN link in HTML and chart data in JS

### Issue: Images not loading
**Solution:** Check image URLs are correct and accessible

### Issue: Layout broken on mobile
**Solution:** Check responsive CSS breakpoints and grid settings

### Issue: Animations not smooth
**Solution:** Reduce animation complexity or adjust timing values

---

## Resources

- **Chart.js Documentation:** https://www.chartjs.org/docs/
- **CSS Grid Guide:** https://css-tricks.com/snippets/css/complete-guide-grid/
- **Image Optimization:** https://tinypng.com/
- **Color Picker:** https://coolors.co/
- **Google Fonts:** https://fonts.google.com/

---

## Need Help?

1. Check browser console (F12) for errors
2. Validate HTML: https://validator.w3.org/
3. Validate CSS: https://jigsaw.w3.org/css-validator/
4. Test responsiveness: Browser DevTools (F12 → Toggle Device)

---

**Happy customizing! 🎉**
