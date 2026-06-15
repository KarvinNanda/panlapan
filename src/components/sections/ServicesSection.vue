<template>
  <section id="services" class="services section" ref="sectionRef">
    <div class="services__inner">

      <!-- Header: h2 dulu, lalu eyebrow di bawah (mobile: centered) -->
      <div class="services__header" ref="headerRef">
        <h2 class="services__headline">Services</h2>
        <span class="eyebrow services__what">What We Do</span>
      </div>

      <div class="divider" ref="dividerRef" />

      <div class="services__grid" ref="gridRef">
        <div
          v-for="(service, index) in services"
          :key="service.title"
          class="service-item"
        >
          <!-- Kiri: index + title -->
          <div class="service-item__header">
            <span class="service-item__index eyebrow">{{ String(index + 1).padStart(2, '0') }}</span>
            <h3 class="service-item__title">{{ service.title }}</h3>
          </div>

          <!-- Kanan: desc + list -->
          <div class="service-item__content">
            <p class="service-item__desc">{{ service.description }}</p>
            <ul class="service-item__list">
              <li v-for="item in service.items" :key="item" class="service-item__list-item">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Footer button — liquid glass, scroll ke hero -->
      <div class="services__footer">
        <a href="#" class="services__footer-btn" ref="footerBtnRef" @click.prevent="scrollToHero">
          panlapan
        </a>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMagnet } from '@/composables/useMagnet.js'

gsap.registerPlugin(ScrollTrigger)

const { attach: magnet } = useMagnet()

const sectionRef   = ref(null)
const headerRef    = ref(null)
const dividerRef   = ref(null)
const gridRef      = ref(null)
const footerBtnRef = ref(null)

const scrollToHero = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const services = [
  {
    title: 'Brand Strategy & Identity',
    description: 'Build a brand people recognize, trust, and choose.',
    items: ['Brand Strategy', 'Brand Positioning', 'Brand Identity', 'Rebranding', 'Brand Guidelines', 'Packaging Design']
  },
  {
    title: 'Creative & Content',
    description: 'Create stories that attract attention and drive action.',
    items: ['Social Media Management', 'Content Strategy', 'Copywriting', 'Campaign Development', 'Video Production', 'KOL & Influencer Management']
  },
  {
    title: 'Digital Experiences',
    description: 'Build digital platforms that convert.',
    items: ['Website Design & Development', 'Landing Pages', 'Booking Systems', 'UI/UX Design', 'Marketing Automation', 'CRM Integration']
  },
  {
    title: 'Events & Activations',
    description: 'Turn audiences into communities.',
    items: ['Event Management', 'Brand Activations', 'Sponsorship Strategy', 'Community Programs', 'Experiential Marketing']
  },
  {
    title: 'Creative Production',
    description: 'Bring ideas into the real world.',
    items: ['Graphic Design', 'Motion Graphics', 'Illustration', 'Merchandise Design', 'Environmental Branding', 'Presentation Deck Design']
  }
]

onMounted(() => {
  magnet(footerBtnRef.value)

  gsap.fromTo(
    headerRef.value?.querySelectorAll('h2, .eyebrow'),
    { opacity: 0, y: 25 },
    { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: headerRef.value, start: 'top 80%' } }
  )
  gsap.fromTo(dividerRef.value,
    { scaleX: 0, transformOrigin: 'left' },
    { scaleX: 1, duration: 1.2, ease: 'power4.inOut',
      scrollTrigger: { trigger: dividerRef.value, start: 'top 85%' } }
  )
  const items = gridRef.value?.querySelectorAll('.service-item')
  if (items?.length) {
    gsap.fromTo(items,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.value, start: 'top 80%' } }
    )
  }
})
</script>

<style scoped>
/* ── DESKTOP (base styles) ── */
.services {
  padding: 7rem 2rem;
  background: var(--color-black);
}

.services__inner { max-width: 1400px; margin: 0 auto; }

.services__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.services__headline {
  font-size: clamp(3rem, 7vw, 7rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
  text-transform: uppercase;
}

.services__what { flex-shrink: 0; }

.services__grid { margin-top: 2rem; display: flex; flex-direction: column; }

.service-item {
  padding: 2.5rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  transition: padding-left 0.4s ease;
}

.service-item:first-child { border-top: 1px solid rgba(255,255,255,0.08); }
.service-item:hover        { padding-left: 0.5rem; }

.service-item__header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 0.75rem;
}

.service-item__index { flex-shrink: 0; min-width: 2rem; }

.service-item__title {
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  flex: 1;
  transition: color 0.3s ease;
}

.service-item:hover .service-item__title { color: rgba(255,255,255,0.7); }

/* content wrapper — desc + list */
.service-item__content { margin-left: 3.5rem; }

.service-item__desc {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.5);
  margin-bottom: 1rem;
  line-height: 1.7;
}

.service-item__list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
}

.service-item__list-item {
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  padding: 0.3rem 0.8rem;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 100px;
  transition: all 0.3s ease;
}

.service-item:hover .service-item__list-item {
  color: rgba(255,255,255,0.5);
  border-color: rgba(255,255,255,0.2);
}

/* Footer button — liquid glass, centered */
.services__footer {
  display: flex;
  justify-content: center;
  padding-top: 4rem;
}

.services__footer-btn {
  display: inline-flex;
  align-items: center;
  padding: 1rem 3rem;
  background: linear-gradient(
    155deg,
    rgba(30, 65, 155, 0.72) 0%,
    rgba(10, 28, 90, 0.88) 100%
  );
  backdrop-filter: blur(24px) saturate(1.5);
  -webkit-backdrop-filter: blur(24px) saturate(1.5);
  color: rgba(255, 255, 255, 0.95);
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow:
    0 8px 32px rgba(0, 10, 60, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    inset 0 -1px 0 rgba(0, 0, 0, 0.18);
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-decoration: none;
  transition: all 0.35s ease;
  cursor: none;
}

.services__footer-btn:hover {
  background: linear-gradient(
    155deg,
    rgba(45, 90, 195, 0.80) 0%,
    rgba(18, 45, 120, 0.92) 100%
  );
  border-color: rgba(255, 255, 255, 0.36);
  box-shadow:
    0 12px 40px rgba(0, 10, 60, 0.70),
    inset 0 1px 0 rgba(255, 255, 255, 0.30),
    inset 0 -1px 0 rgba(0, 0, 0, 0.18);
  transform: translateY(-2px);
}

/* ── MOBILE ── */
@media (max-width: 768px) {
  .services { padding: 5rem 1.5rem; }

  /* Header: stack vertikal, center */
  .services__header {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
    margin-bottom: 2.5rem;
  }

  /* SERVICES: besar, merah, uppercase */
  .services__headline {
    font-size: clamp(3.5rem, 18vw, 5.5rem);
    color: #E73121;
    letter-spacing: -0.02em;
    line-height: 0.95;
    order: 1;
  }

  /* What We Do: di bawah SERVICES */
  .services__what {
    order: 2;
    color: rgba(255,255,255,0.50) !important;
  }

  /* Service item: 2 kolom (kiri nama, kanan konten) */
  .service-item {
    display: grid;
    grid-template-columns: 2fr 3fr;
    grid-template-areas:
      "header content";
    gap: 1.25rem;
    align-items: start;
    padding: 2rem 0;
    padding-left: 0 !important; /* override hover shift */
  }

  .service-item__header {
    grid-area: header;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    margin-bottom: 0;
  }

  /* Sembunyikan nomor index di mobile */
  .service-item__index { display: none; }

  .service-item__title {
    font-size: 0.9rem;
    font-weight: 700;
    line-height: 1.35;
    letter-spacing: -0.01em;
  }

  /* Konten kanan */
  .service-item__content {
    grid-area: content;
    margin-left: 0;
  }

  .service-item__desc {
    font-size: 0.78rem;
    color: rgba(255,255,255,0.55);
    margin-bottom: 0.75rem;
    line-height: 1.6;
  }

  /* List items: plain text, tanpa pill border */
  .service-item__list {
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 0.2rem;
  }

  .service-item__list-item {
    border: none;
    border-radius: 0;
    padding: 0;
    font-size: 0.78rem;
    text-transform: none;
    letter-spacing: 0;
    color: rgba(255,255,255,0.60);
  }

  .service-item:hover .service-item__list-item {
    color: rgba(255,255,255,0.60);
    border: none;
  }
}
</style>
