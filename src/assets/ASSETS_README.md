# 📁 Panlapan — Assets Folder

Taruh semua asset agency kamu di folder ini sesuai struktur berikut:

---

## 📂 Struktur Folder

```
src/assets/
├── fonts/          → Font files Century Gothic (.woff2, .woff)
├── icons/          → Logo & icon SVG files
└── images/
    └── portfolio/  → Project/portfolio images
        ├── prana-thumb.jpg        → Thumbnail untuk list project
        ├── prana-cover.jpg        → Cover image halaman detail
        ├── prana-1.jpg            → Gallery image 1
        ├── prana-2.jpg            → Gallery image 2
        ├── prana-3.jpg            → Gallery image 3
        └── prana-4.jpg            → Gallery image 4

public/
├── favicon.svg     → Favicon website
└── assets/
    └── images/
        └── portfolio/  → Copy juga ke sini untuk production build
```

---

## 🖼️ Spesifikasi Image

| Type        | Ukuran Rekomendasi | Format |
|-------------|-------------------|--------|
| Thumbnail   | 400 × 500px       | WebP / JPG |
| Cover       | 1400 × 800px      | WebP / JPG |
| Gallery     | 1200 × 900px      | WebP / JPG |

---

## 🔤 Font Setup (Century Gothic)

Jika punya file font, taruh di `src/assets/fonts/` dan tambahkan di `main.css`:

```css
@font-face {
  font-family: "Century Gothic";
  src: url('@/assets/fonts/CenturyGothic.woff2') format('woff2'),
       url('@/assets/fonts/CenturyGothic.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Century Gothic";
  src: url('@/assets/fonts/CenturyGothic-Bold.woff2') format('woff2'),
       url('@/assets/fonts/CenturyGothic-Bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

---

## 🏷️ Logo

Taruh logo Panlapan di `src/assets/icons/logo.svg`

Lalu update di `TheNavbar.vue`, ganti text logo dengan:
```html
<img src="@/assets/icons/logo.svg" alt="Panlapan" class="navbar__logo-img" />
```

---

## ➕ Tambah Project Baru

Edit file `src/data/projects.js`, tambahkan entry baru:

```js
{
  id: 2,
  slug: 'nama-project',       // URL: /work/nama-project
  title: 'Nama Project',
  client: 'Nama Client',
  year: '2025',
  industry: 'Industri',
  category: 'Kategori',
  tags: ['Tag 1', 'Tag 2'],
  thumbnail: '/assets/images/portfolio/nama-thumb.jpg',
  coverImage: '/assets/images/portfolio/nama-cover.jpg',
  description: 'Deskripsi singkat...',
  fullDescription: `Deskripsi panjang...`,
  deliverables: ['Item 1', 'Item 2'],
  images: [
    '/assets/images/portfolio/nama-1.jpg',
    '/assets/images/portfolio/nama-2.jpg',
  ],
  accentColor: '#HEXCODE'   // Warna accent untuk project ini
}
```
