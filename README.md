# Panlapan Creative Lab — Website

Website agency profile built with **Vite + Vue 3 + GSAP + Lenis + Tailwind CSS**

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Folder Structure

```
panlapan/
├── public/                     # Static files (favicon, public images)
├── src/
│   ├── assets/
│   │   ├── fonts/              # Font files → taruh Century Gothic di sini
│   │   ├── icons/              # SVG icons & logo
│   │   ├── images/
│   │   │   └── portfolio/      # Project images
│   │   ├── main.css            # Global styles & CSS variables
│   │   └── ASSETS_README.md    # Panduan assets (baca ini!)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TheNavbar.vue   # Top navigation
│   │   │   └── TheFooter.vue   # Footer
│   │   ├── sections/
│   │   │   ├── HeroSection.vue      # Homepage hero
│   │   │   ├── WorksSection.vue     # Selected works / portfolio list
│   │   │   ├── ServicesSection.vue  # Services list
│   │   │   ├── ApproachSection.vue  # Our process / approach
│   │   │   ├── WhySection.vue       # Why Panlapan
│   │   │   └── CtaSection.vue       # Get in touch / CTA
│   │   └── ui/
│   │       └── CustomCursor.vue     # Custom cursor
│   │
│   ├── composables/
│   │   ├── useLenis.js         # Smooth scroll setup
│   │   ├── useCustomCursor.js  # Cursor animation logic
│   │   └── useScrollAnimations.js  # Reusable GSAP animations
│   │
│   ├── data/
│   │   └── projects.js         # ← EDIT INI untuk tambah project
│   │
│   ├── router/
│   │   └── index.js            # Vue Router config
│   │
│   ├── views/
│   │   ├── HomeView.vue        # Homepage
│   │   └── WorkDetailView.vue  # Project detail page
│   │
│   ├── App.vue                 # Root component
│   └── main.js                 # App entry point
│
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🎨 Tech Stack

| Library | Version | Purpose |
|---------|---------|---------|
| Vue 3 | ^3.4 | Core framework (Composition API) |
| Vite | ^5.2 | Build tool |
| Vue Router | ^4.3 | Client-side routing |
| GSAP | ^3.12 | Animations (scroll, reveal, cursor) |
| Lenis | ^1.0 | Smooth scroll |
| Tailwind CSS | ^3.4 | Utility styling |

---

## 📄 Pages

| Route | Page |
|-------|------|
| `/` | Homepage (Hero → Works → Services → Approach → Why → CTA) |
| `/work/:slug` | Project detail page |

---

## 🔒 Hidden Sections (ready when data tersedia)

- **Page 5** — Client Outcomes / Stats (uncomment di HomeView.vue)
- **Page 6** — About section (uncomment di HomeView.vue)
- **Page 8** — Testimonials (uncomment di HomeView.vue)

---

## 📋 Next Steps

1. Taruh font Century Gothic di `src/assets/fonts/`
2. Taruh logo di `src/assets/icons/logo.svg`
3. Taruh project images di `src/assets/images/portfolio/`
4. Update data project di `src/data/projects.js`
5. Update email & social links di `TheFooter.vue`
6. Update email di `CtaSection.vue` (href="mailto:...")
