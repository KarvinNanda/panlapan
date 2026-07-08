<template>
  <section id="work" class="works section" ref="sectionRef">
    <div class="works__inner">

      <!-- Section header -->
      <div class="works__header" ref="headerRef">
        <h2 class="works__headline">
          <span class="text-reveal-wrapper"><span class="reveal-target">Brands Don't Grow Because They're Seen.</span></span>
          <span class="text-reveal-wrapper"><span class="works__headline--alt reveal-target">They Grow Because They're Remembered.</span></span>
        </h2>
        <p class="works__sub">
          <span class="text-reveal-wrapper"><span class="reveal-target" style="display: block;">Panlapan helps businesses build brands, create demand, and grow through</span></span>
          <span class="text-reveal-wrapper"><span class="reveal-target" style="display: block;">strategy, creativity, and digital experiences.</span></span>
        </p>
        <a href="#connect" class="btn-navy works__header-cta"
           data-cursor-hover
           @click.prevent="scrollToConnect">
          Start a Project
        </a>
      </div>

      <!-- Project cards -->
      <div class="works__list" ref="listRef">
        <div
          v-for="(project, index) in projects"
          :key="project.slug"
          class="works__card project-card"
          @click="$router.push(`/work/${project.slug}`)"
        >
          <!-- Ken Burns image slider — hidden for video-only projects -->
          <div class="works__card-media" v-if="project.images?.length">
            <div
              v-for="(img, i) in project.images.slice(0, 6)"
              :key="i"
              class="works__card-slide"
              :class="{ 'is-active': activeSlide[index] === i }"
            >
              <div class="works__card-parallax" data-parallax>
                <img
                  :src="img"
                  :alt="`${project.title} ${i + 1}`"
                  class="works__card-img"
                  loading="lazy"
                />
              </div>
            </div>

            <!-- Progress bar -->
            <div class="works__card-progress">
              <div
                class="works__card-progress-bar"
                :class="{ 'is-running': autoplayRunning[index] }"
                :key="`${index}-${activeSlide[index]}`"
              />
            </div>
          </div>

          <!-- Card body -->
          <div class="works__card-body">
            <div class="works__card-header">
              <div class="works__card-title-row">
                <img
                  v-if="project.logo"
                  :src="project.logo"
                  :alt="project.title"
                  class="works__card-logo"
                />
                <h3 class="works__card-title">{{ project.title }}</h3>
              </div>
              <span class="works__card-num">{{ String(index + 1).padStart(2, '0') }}</span>
            </div>

            <div class="works__card-content">
              <div class="works__card-left">
                <p class="works__card-desc">{{ project.description }}</p>
                <span class="works__card-cta eyebrow">View Project</span>
              </div>

              <div class="works__card-right">
                <div class="works__card-meta">
                  <span class="works__card-meta-label">Category</span>
                  <span class="works__card-category">{{ project.category }}</span>
                </div>
                <div class="works__card-meta">
                  <span class="works__card-meta-label">Publisher</span>
                  <span class="works__card-year">{{ project.year }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile CTA — tampil di bawah semua card (<=1024px) -->
      <div class="works__footer-cta">
        <a href="#connect" class="btn-navy" data-cursor-hover
           @click.prevent="scrollToConnect">
          Start a Project
        </a>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMagnet } from '@/composables/useMagnet.js'
import { useTextReveal } from '@/composables/useTextReveal.js'
import projectsRaw from '@/data/projects.js'

const projects = [...projectsRaw].sort((a, b) => a.title.localeCompare(b.title))

gsap.registerPlugin(ScrollTrigger)

const { attach: magnet } = useMagnet()
const { revealText } = useTextReveal()

const router      = useRouter()
const sectionRef  = ref(null)
const headerRef   = ref(null)
const listRef     = ref(null)

// Slider state
const activeSlide     = reactive(projects.map(() => 0))
const autoplayRunning = reactive(projects.map(() => true))
const timers          = []

const AUTOPLAY_MS = 2400

const startAutoplay = (index) => {
  clearInterval(timers[index])
  const imgs = projects[index]?.images
  if (!imgs?.length || imgs.length <= 1) return
  autoplayRunning[index] = true
  timers[index] = setInterval(() => {
    const max = Math.min(imgs.length, 6)
    activeSlide[index] = (activeSlide[index] + 1) % max
  }, AUTOPLAY_MS)
}

const scrollToConnect = () => {
  document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  projects.forEach((_, i) => startAutoplay(i))

  gsapCtx = gsap.context(() => {
    // 1. Text Reveal for header
    const targets = headerRef.value?.querySelectorAll('.reveal-target')
    if (targets?.length) {
      revealText(targets, headerRef.value)
    }

    // 2. Button fade in
    gsap.fromTo(
      headerRef.value?.querySelector('.works__header-cta'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9, delay: 0.3, ease: 'power3.out', scrollTrigger: { trigger: headerRef.value, start: 'top 80%' } }
    )

    // 3. Card stagger
    const cards = listRef.value?.querySelectorAll('.works__card')
    if (cards?.length) {
      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: listRef.value, start: 'top 82%' } }
      )
    }

    // 4. Parallax images
    const parallaxWraps = listRef.value?.querySelectorAll('[data-parallax]')
    if (parallaxWraps?.length) {
      parallaxWraps.forEach(wrap => {
        gsap.fromTo(wrap,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: wrap.closest('.works__card-media'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        )
      })
    }
  })
})

let gsapCtx = null

onUnmounted(() => {
  timers.forEach(t => clearInterval(t))
  gsapCtx?.revert()
})
</script>

<style scoped>
.works {
  padding: 7rem 2rem;
  position: relative;
  background: var(--color-black);
}

.works__inner {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 5rem;
  align-items: start;
  position: relative;
  z-index: 1;
}

/* Sticky header */
.works__header { position: sticky; top: 8rem; }

.works__headline {
  font-size: clamp(1.6rem, 2.8vw, 2.4rem);
  line-height: 1.15;
  margin: 0 0 1.5rem;
  letter-spacing: -0.02em;
  font-weight: 700;
  color: var(--color-white);
}

.works__headline--alt {
  display: block;
  font-size: clamp(1.6rem, 2.8vw, 2.4rem);
  line-height: 1.15;
  margin: 0 0 1.5rem;
  letter-spacing: -0.02em;
  font-weight: 700;
  color: var(--color-white);
}

.works__sub {
  font-size: clamp(0.82rem, 1.2vw, 0.95rem);
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.75;
  margin-bottom: 2rem;
  font-weight: 400;
}

/* Desktop header CTA — visual styles come from .btn-navy in main.css */
/* Mobile footer CTA — visual styles come from .btn-navy in main.css */

/* Mobile footer CTA */
.works__footer-cta {
  grid-column: 1 / -1;
  display: none;
  justify-content: center;
  padding-top: 2.5rem;
}

/* Override eyebrow color for dark bg */
.eyebrow {
  color: rgba(255, 255, 255, 0.999) !important;
}

/* Cards list */
.works__list { display: flex; flex-direction: column; }

/* Card */
.works__card {
  border-bottom: 1px solid rgba(255, 255, 255, 0.10);
  padding: 2rem 0;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
}

.works__card:first-child { border-top: 1px solid rgba(255, 255, 255, 0.10); }

.works__card:hover { transform: translateY(-3px); }

.works__card:hover .works__card-media {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5),
              0 0 0 1px rgba(255, 255, 255, 0.08);
}

/* ── Ken Burns slider ── */
.works__card-media {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  margin-bottom: 1.25rem;
  background: rgba(255, 255, 255, 0.06);
  transition: box-shadow 0.4s ease;
}

.works__card-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.55s ease;
  will-change: opacity;
}

.works__card-slide.is-active { opacity: 1; }

.works__card-slide.is-active .works__card-img {
  animation: kenBurns 3.2s ease-out forwards;
}

@keyframes kenBurns {
  0%   { transform: scale(1.08); }
  100% { transform: scale(1.00); }
}

.works__card-parallax {
  width: 100%;
  height: 116%; /* Taller for parallax room */
  top: -8%;
  position: absolute;
}

.works__card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Hover: scale image, lift card body */
.works__card:hover .works__card-slide.is-active .works__card-img {
  transform: scale(1.06) !important; /* override kenBurns end state */
}

/* Progress bar */
.works__card-progress {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 2px;
  background: rgba(255, 255, 255, 0.15);
  z-index: 2;
}

.works__card-progress-bar {
  height: 100%;
  width: 0%;
  background: rgba(255, 255, 255, 0.65);
}

.works__card-progress-bar.is-running {
  animation: progressBar 2.4s linear forwards;
}

@keyframes progressBar {
  from { width: 0%; }
  to   { width: 100%; }
}

/* Card body */
.works__card-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.works__card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.works__card-content {
  display: grid;
  grid-template-columns: 1fr 130px;
  gap: 1rem;
  align-items: stretch;
}

.works__card-left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
}

.works__card-title-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.works__card-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
  flex-shrink: 0;
  opacity: 0.85;
}

.works__card-title {
  font-size: clamp(0.95rem, 1.5vw, 1.15rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--color-white);
}

.works__card-desc {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.60);
  line-height: 1.6;
  max-width: 320px;
}

.works__card-cta {
  font-size: 0.65rem;
  color: rgb(255, 255, 255);
  transition: color 0.3s ease;
}

.works__card:hover .works__card-cta { color: var(--color-white); }

/* Right meta */
.works__card-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.75rem;
  flex-shrink: 0;
  min-width: 120px;
}

.works__card-num {
  font-size: 0.75rem;
  color: #E73121;
  
}

.works__card-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.works__card-meta-label {
  color: #909090;
  font-size: 0.6rem;
  font-weight: bold;
}

.works__card-category,
.works__card-year {
  font-size: 0.75rem;
  color: var(--color-white);
  text-align: right;
}

/* Responsive */
@media (max-width: 1024px) {
  .works__inner      { grid-template-columns: 1fr; gap: 3rem; }
  .works__header     { position: static; }
  .works__header-cta { display: none; }
  .works__footer-cta { display: flex; }
}

@media (max-width: 768px) {
  .works { padding: 5rem 1.5rem; }

  .works__card-content { grid-template-columns: 1fr 110px; gap: 0.75rem; }
  .works__card-right { min-width: unset; }
  .works__card-meta { align-items: flex-end; }
  .works__card-category,
  .works__card-year        { text-align: right; }
  .works__card-logo        { width: 30px; height: 30px; }
}
</style>
