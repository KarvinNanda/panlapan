// ================================================
// PANLAPAN — Portfolio / Projects Data
//
// IMAGE PATH CONVENTION
//   All paths start with /assets/... (served from the /public folder)
//   thumbnail   → Hover preview in Works list  | 400 × 500 px  (JPG/WebP)
//   coverImage  → Hero on detail page          | 1400 × 800 px (JPG/WebP)
//   images[]    → Gallery on detail page       | 1200 × 900 px (JPG/WebP)
//   TIP: use WebP for best performance; JPG as fallback
// ================================================

export const projects = [
  {
    id: 1,
    slug: 'prana-holistic-care',
    title: 'Prana Holistic Care',
    client: 'Prana Holistic Care by Marisa',
    year: '2025',
    industry: 'Beautycare',
    category: 'Brand Identity',
    tags: ['Brand Identity', 'Packaging Design', 'Visual System','Interior Design'],

    // logo → shown beside title on detail page
    // File: public/assets/images/portfolio/Prana Holistic Care/logo.png
    logo: '/assets/images/portfolio/Branding/Prana Holistic Care by Marisa/Asset/00 Logo/PNG/MARISA LOGO-01.png',

    // thumbnail → shown on hover in the Works list
    // File: public/assets/images/portfolio/prana-thumb.jpg  (400×500px)
    thumbnail: 'assets/images/portfolio/Branding/Prana Holistic Care by Marisa/Asset/00 Logo/PNG/MARISA LOGO-01.png',

    // coverImage → full-width hero image at top of detail page
    coverImage: '/assets/images/portfolio/Branding/Prana Holistic Care by Marisa/01 Branding.png',

    // images[] → gallery grid on detail page
    //   Index 0 → full-width (wide/hero shot)
    //   Index 1+ → 2-column grid (detail/product shots)
    // 01 Branding.png dipindah ke coverImage, tidak double di gallery
    images: [
      '/assets/images/portfolio/Branding/Prana Holistic Care by Marisa/18 product display.png',
      '/assets/images/portfolio/Branding/Prana Holistic Care by Marisa/07 tag.png',
      '/assets/images/portfolio/Branding/Prana Holistic Care by Marisa/15 mug front.png',
      '/assets/images/portfolio/Branding/Prana Holistic Care by Marisa/09 paperbag.png',
      '/assets/images/portfolio/Branding/Prana Holistic Care by Marisa/10 coaster.png',
      '/assets/images/portfolio/Interior/Prana Holistic care by Marisa/01 Facade.png',
      '/assets/images/portfolio/Interior/Prana Holistic care by Marisa/02 display area.png',
      '/assets/images/portfolio/Interior/Prana Holistic care by Marisa/03 front.png',
      '/assets/images/portfolio/Interior/Prana Holistic care by Marisa/04 healing room.png',
      '/assets/images/portfolio/Interior/Prana Holistic care by Marisa/05 VIP healing room.png',
    ],

    description: 'Prana Holistic Care by Marisa was designed to be more than a wellness brand. It was built as a holistic experience where healing, beauty, intention, and craftsmanship meet.',
    fullDescription: `Panlapan Creative developed the brand identity, packaging system, stationery, merchandise, uniform, and visual applications to create one cohesive brand language. Inspired by the pillars Wellness | Wear | Wonders, every element was crafted to reflect the essence of pranic healing, gemstone energy, and personal transformation.

The lotus symbol became the heart of the identity, representing growth, balance, and spiritual awakening. Combined with a warm palette of burgundy, ivory, beige, and gold, the brand carries a sense of calm luxury that feels intimate, sacred, and timeless.

From gemstone jewelry boxes to candle labels, bath salt packaging, paper bags, hang tags, product cards, and interior graphics, every touchpoint was designed to become part of the customer's ritual. The result is a complete brand ecosystem that feels elegant, meaningful, and deeply connected to the holistic journey of Prana Holistic Care by Marisa.`,
    deliverables: [
      'Brand Identity System',
      'Packaging Design',
      'Stationery & Merchandise',
      'Uniform Design',
      'Visual Applications',
      'Interior Graphics',
    ],
    accentColor: '#C4A882',
  },

  {
    id: 2,
    slug: 'pensil-media',
    title: 'Pensil Media',
    client: 'PT Mega Kreasi Pensil Media',
    year: '2024',
    industry: 'Agency / Media',
    category: 'Interior Design',
    tags: ['Interior Design', 'Environmental Branding', 'Spatial Design'],

    // logo → shown beside title on detail page
    // File: public/assets/images/portfolio/Pensil Media/logo.png
    logo: '/assets/images/portfolio/Interior/Pensil media/pensil.png',

    // thumbnail → hover preview di Works list (400×500px)
    // File: public/assets/images/portfolio/Pensil Media/thumb.jpg
    thumbnail: '/assets/images/portfolio/Interior/Pensil media/pensil.png',

    // coverImage → hero image di detail page (1400×800px)
    // File: public/assets/images/portfolio/Pensil Media/cover.jpg
    coverImage: '/assets/images/portfolio/Pensil Media/cover.jpg',

    // images[] → gallery di detail page (1200×900px)
    // Index 0 → full-width
    // Index 1+ → 2-column grid
    // Files: public/assets/images/portfolio/Pensil Media/[01-xx].jpg
    images: [
      '/assets/images/portfolio/Interior/Pensil media/2nd floor brainstorm room.png',
      '/assets/images/portfolio/Interior/Pensil media/2nd floor creative staff working space.png',
      '/assets/images/portfolio/Interior/Pensil media/3rd floor mini meeting corner.png',
      '/assets/images/portfolio/Interior/Pensil media/4th floor brainstorm room.png',
      '/assets/images/portfolio/Interior/Pensil media/CMO room 2.png',
      '/assets/images/portfolio/Interior/Pensil media/CMO room.png',
      '/assets/images/portfolio/Interior/Pensil media/Essentials.png',
      '/assets/images/portfolio/Interior/Pensil media/Finance room.png',
      '/assets/images/portfolio/Interior/Pensil media/Lighting.png',
      '/assets/images/portfolio/Interior/Pensil media/Rooftop.png',
      '/assets/images/portfolio/Interior/Pensil media/Lobby entrance 1.png',
      '/assets/images/portfolio/Interior/Pensil media/Lobby entrance 2.png',
      '/assets/images/portfolio/Interior/Pensil media/Staff working area.png',
      '/assets/images/portfolio/Interior/Pensil media/Waiting area, lobby.png',
      
    ],

    description: 'Pensil Media\'s office was designed as more than a workplace — a physical embodiment of a next-generation agency that thrives on agility, innovation, and multidisciplinary thinking.',

    fullDescription: `Panlapan Creative was entrusted to design the interior of Pensil, a next generation agency that plays across the most diverse media channels — from ATL and OOH to digital, mobile, and experiential.

The challenge was to translate the agency's dynamic spirit into a physical environment that reflects the way they work, think, and connect. Rather than a conventional corporate office, we envisioned a workplace that balances professionalism with warmth — where productivity coexists with comfort, and every corner supports different modes of creativity.

One of the key narratives lies in its intentional contrast of atmosphere. Bright, naturally lit areas support focused work and strategic discussions, while warmer and softer lighting encourages informal conversation, reflection, and spontaneous exchanges of ideas.

At the heart of the space stands the symbolic presence of the pencil itself — more than a visual identity, a metaphor for the creative process. Every campaign begins with a simple sketch. Through sculptural installations and custom-designed elements, this familiar object reminds us that even the most impactful ideas often start from a single line.

Warm timber tones, textured materials, dark wood flooring, and greenery soften the fast-paced nature of agency life. Formal meeting areas support strategic decision-making, while lounges, reading corners, and communal zones allow ideas to flow organically beyond the table.`,

    deliverables: [
      'Interior Design',
      'Spatial Planning',
      'Environmental Branding',
      'Custom Installations',
      'Lighting Design',
      'Furniture Curation',
    ],

    accentColor: '#E8B84B',
  },

  {
    id: 3,
    slug: 'nivea',
    title: 'Nivea',
    client: 'Nivea / Beiersdorf',
    year: '2024',
    industry: 'Beauty & Skincare',
    category: 'Packaging Design',
    tags: ['Packaging Design', 'Visual System', 'Brand Identity'],

    // logo → shown beside title on detail page
    // File: public/assets/images/portfolio/Nivea/logo.png
    logo: '/assets/images/portfolio/Packaging/Nivea/nivea.png',

    // thumbnail → hover preview di Works list (400×500px)
    // File: public/assets/images/portfolio/Nivea/thumb.jpg
    thumbnail: '/assets/images/portfolio/Packaging/Nivea/nivea.png',

    // coverImage → hero image di detail page (1400×800px)
    // File: public/assets/images/portfolio/Nivea/cover.jpg
    coverImage: '/assets/images/portfolio/Nivea/cover.jpg',

    // images[] → gallery di detail page (1200×900px)
    // Index 0 → full-width
    // Index 1+ → 2-column grid
    // Files: public/assets/images/portfolio/Nivea/[01-xx].jpg
    images: [
      '/assets/images/portfolio/Packaging/Nivea/Bundling package box Nivea lip butter.png',
      '/assets/images/portfolio/Packaging/Nivea/Illustration for Nivea lip butter display.png',
      '/assets/images/portfolio/Packaging/Nivea/Illustration Mizzu Abel cantika.png',
      '/assets/images/portfolio/Packaging/Nivea/Illustration Mizzu Rachel Godard.png',
      '/assets/images/portfolio/Packaging/Nivea/Illustration Nivea display.png',
      '/assets/images/portfolio/Packaging/Nivea/Illustration Nivea miscellAir water.png',
      '/assets/images/portfolio/Packaging/Nivea/Illustration Nivea x Mizzu - Kiara leswara.PNG',
      '/assets/images/portfolio/Packaging/Nivea/Mizzu - tasya farasya.png',
      '/assets/images/portfolio/Packaging/Nivea/Nivea lip butter illustration .png',
      '/assets/images/portfolio/Packaging/Nivea/Nivea pouch 1.png',
      '/assets/images/portfolio/Packaging/Nivea/Nivea pouch 2.png',
      '/assets/images/portfolio/Packaging/Nivea/Nivea x Mizzu - Abel cantika.PNG',
      '/assets/images/portfolio/Packaging/Nivea/Nivea x Mizzu - Minyo.png',
      '/assets/images/portfolio/Packaging/Nivea/Nivea x Mizzu - Tasya farasya2.png', 
    ],

    description: 'Panlapan Creative partnered with Nivea to develop packaging design that stays true to the brand\'s trusted identity while bringing a fresh, considered aesthetic to the shelf.',

    fullDescription: `Nivea is one of the world's most recognised skincare brands, trusted by millions across generations. For this collaboration, Panlapan Creative was brought in to handle packaging design — translating Nivea's established brand language into packaging that feels both familiar and refined.

The work centred on maintaining the core equity of the Nivea identity — its iconic deep blue, clean typography, and sense of reliability — while elevating the tactile and visual quality of the packaging across product lines.

Every design decision was guided by the balance between mass-market accessibility and premium shelf presence. From structural considerations to surface finishes and typography hierarchy, each element was carefully crafted to communicate trust, clarity, and care at the point of purchase.

The result is packaging that feels unmistakably Nivea, while carrying a renewed confidence that resonates with both loyal customers and new audiences.`,

    deliverables: [
      'Packaging Design',
      'Visual System',
      'Typography Layout',
      'Print Production Artwork',
      'Packaging Mockups',
    ],

    accentColor: '#003DA5',
  },

  // ── ADD MORE PROJECTS BELOW ───────────────────────────────
  // {
  //   id: 2,
  //   slug: 'project-slug',
  //   title: 'Project Title',
  //   client: 'Client Name',
  //   year: '2025',
  //   industry: 'Industry',
  //   category: 'Category',
  //   tags: ['Tag 1', 'Tag 2'],
  //   thumbnail:  '/assets/images/portfolio/slug-thumb.jpg',   // 400×500px
  //   coverImage: '/assets/images/portfolio/slug-cover.jpg',   // 1400×800px
  //   images: [
  //     '/assets/images/portfolio/slug-1.jpg',  // full-width  1200×900px
  //     '/assets/images/portfolio/slug-2.jpg',  // grid        1200×900px
  //   ],
  //   description: 'Short intro...',
  //   fullDescription: `Long body...`,
  //   deliverables: ['Item 1', 'Item 2'],
  //   accentColor: '#HEXCODE',
  // },
]

export const getProjectBySlug = (slug) => projects.find(p => p.slug === slug) || null

export default projects
