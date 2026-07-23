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
│   │   │   ├── HeroSection.vue         # Homepage hero
│   │   │   ├── WorksSection.vue        # Selected works / portfolio list
│   │   │   ├── ServicesSection.vue     # Services list
│   │   │   ├── ApproachSection.vue     # Our process / approach
│   │   │   ├── WhySection.vue          # Why Panlapan
│   │   │   ├── CtaSection.vue          # Get in touch / CTA
│   │   │   ├── StatsSection.vue        # (hidden) Client outcomes / stats
│   │   │   ├── AboutSection.vue        # (hidden) About
│   │   │   └── TestimonialsSection.vue # (hidden) Testimonials
│   │   └── ui/
│   │       └── CustomCursor.vue     # Custom cursor
│   │
│   ├── composables/
│   │   ├── useLenis.js             # Smooth scroll setup
│   │   ├── useCustomCursor.js      # Cursor animation logic
│   │   ├── useScrollAnimations.js  # Reusable GSAP animations
│   │   ├── useTextReveal.js        # Line/word reveal animation
│   │   ├── useParallax.js          # Scroll parallax effect
│   │   └── useMagnet.js            # Magnetic button hover effect
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
| Vite | ^6.0 | Build tool |
| Vue Router | ^4.3 | Client-side routing |
| GSAP | ^3.12 | Animations (scroll, reveal, cursor) |
| Lenis | ^1.3 | Smooth scroll |
| Tailwind CSS | ^3.4 | Utility styling |
| Lucide | ^1.0 | Icon set |

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

## ➕ Menambah Project Baru

1. Taruh gambar project di `public/assets/images/portfolio/<Kategori>/<Nama Project>/`
   - Pastikan **case nama file** persis sama antara file di folder dan path yang direferensikan di `projects.js` — hosting Linux itu case-sensitive, beda dengan Windows
   - Resize gambar ke ukuran wajar sebelum upload (logo: maks ~800px, gambar galeri: maks ~2000px). File berdimensi puluhan-ribu pixel akan ditolak oleh CDN Hostinger dengan error "invalid source image"
2. Tambah entry baru di `src/data/projects.js` (copy struktur entry yang sudah ada)
3. Kalau project ada video, isi field `video` dan kosongkan `images: []`
4. Jalankan `npm run dev` untuk cek tampilan lokal sebelum build & deploy
