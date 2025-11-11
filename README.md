# SEO Tech Developer - 2025 Impact Report

A minimalist, interactive one-page impact report showcasing the SEO Tech Developer program's achievements and outcomes.

## Features

- ✨ **Smooth scroll animations** with intersection observer
- 📊 **Interactive data visualizations** using Chart.js
- 🎨 **Minimalist design** following brand guidelines
- 📱 **Fully responsive** for all devices
- 🚀 **Performance optimized** for fast loading
- 💫 **Animated counters** and gauge charts
- 🎯 **Parallax effects** for depth

## Design System

### Colors
- Primary Red: `#eb0029`
- Black: `#000000`
- Dark Gray: `#4d4d4d`
- Medium Gray: `#babcbf`
- Light Gray: `#e5e7e7`
- White: `#ffffff`
- Blue: `#115a7f`
- Light Blue: `#83b4df`

### Typography
- Font Family: Founders Grotesk (Regular & Bold)

## Deployment to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to GitHub and create a new repository
2. Name it: `seo-impact-report` (or your preferred name)
3. Keep it public
4. Don't initialize with README (we already have one)

### Step 2: Push Code to GitHub

```bash
cd seo-impact-report

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: SEO Tech Developer Impact Report"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/seo-impact-report.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes for deployment
7. Your site will be available at: `https://YOUR_USERNAME.github.io/seo-impact-report/`

## Local Development

To test locally, you can use any simple HTTP server:

### Using Python:
```bash
cd seo-impact-report
python -m http.server 8000
# Visit: http://localhost:8000
```

### Using Node.js (npx):
```bash
cd seo-impact-report
npx serve
# Visit: http://localhost:3000
```

### Using VS Code:
- Install "Live Server" extension
- Right-click `index.html`
- Select "Open with Live Server"

## File Structure

```
seo-impact-report/
├── index.html          # Main HTML structure
├── styles.css          # All styles and responsive design
├── script.js           # Interactivity and animations
└── README.md           # Documentation
```

## Customization

### Update Content
- Edit text directly in `index.html`
- All content is in semantic HTML sections

### Update Images
- Replace image URLs in `index.html` with your actual image links
- Current placeholder images are from your provided URLs

### Update Data
- Modify chart data in `script.js`
- Update counter values in `data-count` attributes
- Adjust statistics in the HTML

### Update Colors
- Change CSS variables in `styles.css` under `:root`
- Brand colors are centralized for easy updates

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized images recommended (WebP format)
- Lazy loading implemented for images
- Chart.js loaded from CDN
- Minimal JavaScript for fast loading

## Credits

**Designed for:** SEO Tech Developer Program  
**Year:** 2025  
**Developer:** Amen Divine Ikamba (Tech Developer Intern)

## License

© 2025 SEO Tech Developer. All rights reserved.
