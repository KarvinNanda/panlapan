<template>
  <section id="work" class="works section" ref="sectionRef">
    <div class="works__inner">

      <!-- Section header -->
      <div class="works__header" ref="headerRef">
        <span class="eyebrow">Selected Works</span>
        <h2 class="works__headline">
          Brands Don't Grow Because They're Seen.
          <span class="works__headline--alt">They Grow Because They're Remembered.</span>
        </h2>
        <p class="works__sub">
          Panlapan helps businesses build brands, create demand, and grow through
          strategy, creativity, and digital experiences.
        </p>
        <a href="#connect" class="btn-outline works__header-cta" data-cursor-hover
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
          <!-- Ken Burns image slider -->
          <div class="works__card-media">
            <div
              v-for="(img, i) in project.images.slice(0, 6)"
              :key="i"
              class="works__card-slide"
              :class="{ 'is-active': activeSlide[index] === i }"
            >
              <img
                :src="img"
                :alt="`${project.title} ${i + 1}`"
                class="works__card-img"
                loading="lazy"
              />
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
            <div class="works__card-left">
              <div class="works__card-title-row">
                <img
                  v-if="project.logo"
                  :src="project.logo"
                  :alt="project.title"
                  class="works__card-logo"
                />
                <h3 class="works__card-title">{{ project.title }}</h3>
              </div>
              <p class="works__card-desc">{{ project.description }}</p>
              <span class="works__card-cta eyebrow">View Project →</span>
            </div>

            <div class="works__card-right">
              <span class="works__card-num eyebrow">{{ String(index + 1).padStart(2, '0') }}</span>
              <div class="works__card-meta">
                <span class="eyebrow works__card-meta-label">Category</span>
                <span class="works__card-category">{{ project.category }}</span>
              </div>
              <div class="works__card-meta">
                <span class="eyebrow works__card-meta-label">Publisher</span>
                <span class="works__card-year">{{ project.year }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import projects from '@/data/projects.js'

gsap.registerPlugin(ScrollTrigger)

const router     = useRouter()
const sectionRef = ref(null)
const headerRef  = ref(null)
const listRef    = ref(null)

// Slider state
const activeSlide     = reactive(projects.map(() => 0))
const autoplayRunning = reactive(projects.map(() => true))
const timers          = []

const AUTOPLAY_MS = 3200

const startAutoplay = (index) => {
  clearInterval(timers[index])
  autoplayRunning[index] = true
  timers[index] = setInterval(() => {
    const max = Math.min(projects[index].images.length, 6)
    activeSlide[index] = (activeSlide[index] + 1) % max
  }, AUTOPLAY_MS)
}

const scrollToConnect = () => {
  document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  projects.forEach((_, i) => startAutoplay(i))

  gsap.fromTo(
    headerRef.value?.querySelectorAll('.eyebrow, h2, p, a'),
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: headerRef.value, start: 'top 80%' } }
  )

  const cards = listRef.value?.querySelectorAll('.works__card')
  if (cards?.length) {
    gsap.fromTo(cards,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: listRef.value, start: 'top 80%' } }
    )
  }
})

onUnmounted(() => {
  timers.forEach(t => clearInterval(t))
})
</script>

<style scoped>
/* ── Opsi B: Hard Cut + Thin Line ── */
.works {
  padding: 7rem 2rem;
  position: relative;
  background: var(--color-off-white);
}

/* Thin separator line di top */
.works::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(17, 17, 17, 0.18) 15%,
    rgba(17, 17, 17, 0.25) 50%,
    rgba(17, 17, 17, 0.18) 85%,
    transparent 100%
  );
  z-index: 1;
}

/* Thin separator line di bottom */
.works::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(17, 17, 17, 0.18) 15%,
    rgba(17, 17, 17, 0.25) 50%,
    rgba(17, 17, 17, 0.18) 85%,
    transparent 100%
  );
  z-index: 1;
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
  margin: 1.5rem 0;
  letter-spacing: -0.02em;
  font-weight: 700;
  color: var(--color-text-dark);
}

.works__headline--alt {
  display: block;
  color: var(--color-text-dark-60);
  font-style: italic;
  font-weight: 300;
}

.works__sub {
  font-size: 0.85rem;
  color: var(--color-text-dark-60);
  line-height: 1.8;
  margin-bottom: 2rem;
}

.works__header-cta {
  font-size: 0.65rem;
  color: var(--color-text-dark) !important;
  border-color: rgba(17,17,17,0.3) !important;
}

.works__header-cta:hover {
  border-color: var(--color-text-dark) !important;
  background: rgba(17,17,17,0.05) !important;
}

/* Override global eyebrow color inside this scoped component */
.eyebrow {
  color: var(--color-text-dark-35) !important;
}

/* Cards list */
.works__list { display: flex; flex-direction: column; }

/* Card */
.works__card {
  border-bottom: 1px solid var(--color-border-dark);
  padding: 2rem 0;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
}

.works__card:first-child { border-top: 1px solid var(--color-border-dark); }

.works__card:hover { transform: translateY(-3px); }

.works__card:hover .works__card-media {
  box-shadow: 0 12px 40px rgba(0,0,0,0.15),
              0 0 0 1px rgba(17,17,17,0.08);
}

/* ── Ken Burns slider ── */
.works__card-media {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  margin-bottom: 1.25rem;
  background: rgba(17,17,17,0.06);
  transition: box-shadow 0.4s ease;
}

.works__card-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.9s ease;
}

.works__card-slide.is-active { opacity: 1; }

.works__card-slide.is-active .works__card-img {
  animation: kenBurns 3.2s ease-out forwards;
}

@keyframes kenBurns {
  0%   { transform: scale(1.08) translate(0%, 0%);     }
  100% { transform: scale(1.00) translate(-1%, -0.5%); }
}

.works__card-img {
  width: 100%;
  height: 100%;
  object-fit: fill;
  display: block;
}

/* Progress bar */
.works__card-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(17,17,17,0.12);
  z-index: 2;
}

.works__card-progress-bar {
  height: 100%;
  width: 0%;
  background: rgba(17,17,17,0.4);
}

.works__card-progress-bar.is-running {
  animation: progressBar 3.2s linear forwards;
}

@keyframes progressBar {
  from { width: 0%; }
  to   { width: 100%; }
}

/* Card body */
.works__card-body {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.works__card-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.works__card-title-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.works__card-logo {
  width: 45px;
  height: 45px;
  object-fit: contain;
  flex-shrink: 0;
  filter: invert(1);
  opacity: 0.85;
}

.works__card-title {
  font-size: clamp(0.95rem, 1.5vw, 1.15rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--color-text-dark);
}

.works__card-desc {
  font-size: 0.75rem;
  color: var(--color-text-dark-60);
  line-height: 1.6;
  max-width: 320px;
}

.works__card-cta {
  font-size: 0.65rem;
  color: var(--color-text-dark-35);
  transition: color 0.3s ease;
}

.works__card:hover .works__card-cta { color: var(--color-text-dark); }

/* Right meta */
.works__card-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
  flex-shrink: 0;
}

.works__card-num {
  font-size: 0.75rem;
  color: var(--color-text-dark-35);
}

.works__card-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.15rem;
}

.works__card-meta-label { color: var(--color-text-dark-35); font-size: 0.6rem; }

.works__card-category,
.works__card-year {
  font-size: 0.75rem;
  color: var(--color-text-dark);
  text-align: right;
}

/* Responsive */
@media (max-width: 1024px) {
  .works__inner  { grid-template-columns: 1fr; gap: 3rem; }
  .works__header { position: static; }
}

@media (max-width: 768px) {
  .works             { padding: 5rem 1.5rem; }
  .works__card-body  { flex-direction: column; gap: 1rem; }
  .works__card-right { flex-direction: row; flex-wrap: wrap; align-items: center; gap: 1rem; }
  .works__card-meta  { align-items: flex-start; }
}
</style>
