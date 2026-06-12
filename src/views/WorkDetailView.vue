<template>
  <main class="work-detail" v-if="project">
    <!-- Back navigation -->
    <div class="work-detail__back-wrap" ref="backRef">
      <RouterLink to="/" class="work-detail__back" data-cursor-hover>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M13 7H1M1 7L7 13M1 7L7 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Back to Work</span>
      </RouterLink>
    </div>

    <!-- Hero -->
    <section class="work-detail__hero" ref="heroRef">
      <div class="work-detail__hero-inner">
        <div class="work-detail__meta" ref="metaRef">
          <span class="eyebrow">{{ project.industry }}</span>
          <span class="work-detail__meta-sep">·</span>
          <span class="eyebrow">{{ project.year }}</span>
        </div>
        <!-- Title + Logo -->
        <div class="work-detail__title-row">
          <h1 class="work-detail__title" ref="titleRef">{{ project.title }}</h1>
          <img
            v-if="project.logo"
            :src="project.logo"
            :alt="`${project.title} logo`"
            class="work-detail__logo"
          />
        </div>

        <p class="work-detail__client eyebrow" ref="clientRef">{{ project.client }}</p>
      </div>

      <!-- Tags -->
      <div class="work-detail__tags" ref="tagsRef">
        <span v-for="tag in project.tags" :key="tag" class="work-detail__tag">
          {{ tag }}
        </span>
      </div>
    </section>

    <!-- Cover image -->
    <section class="work-detail__cover" ref="coverRef">
      <div class="work-detail__cover-img-wrap">
        <img
          :src="project.coverImage || project.thumbnail"
          :alt="project.title"
          class="work-detail__cover-img"
          loading="eager"
        />
      </div>
    </section>

    <!-- Content -->
    <section class="work-detail__content">
      <div class="work-detail__content-inner">
        <!-- Description -->
        <div class="work-detail__description" ref="descRef">
          <span class="eyebrow">Overview</span>
          <p class="work-detail__desc-text">{{ project.description }}</p>
          <p class="work-detail__desc-full">{{ project.fullDescription }}</p>
        </div>

        <!-- Deliverables sidebar -->
        <div class="work-detail__sidebar" ref="sidebarRef">
          <span class="eyebrow">Deliverables</span>
          <ul class="work-detail__deliverables">
            <li v-for="item in project.deliverables" :key="item" class="work-detail__deliverable">
              <span class="work-detail__deliverable-dot" />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Project images gallery -->
    <section class="work-detail__gallery" ref="galleryRef" v-if="project.images?.length">
      <div class="work-detail__gallery-grid">
        <div
          v-for="(img, i) in project.images"
          :key="i"
          class="work-detail__gallery-item"
          :class="{ 'work-detail__gallery-img': i === 0 }"
        >
          <img
            :src="img"
            :alt="`${project.title} — Image ${i + 1}`"
            class="work-detail__gallery-img"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <!-- Next project / CTA -->
    <section class="work-detail__bottom">
      <div class="divider" />
      <div class="work-detail__cta">
        <p class="work-detail__cta-label eyebrow">Ready to build something great?</p>
        <RouterLink to="/#connect" class="btn-primary" data-cursor-hover>
          Start a Project
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </RouterLink>
      </div>
    </section>
  </main>

  <!-- 404 state -->
  <main class="work-detail work-detail--404" v-else>
    <div class="work-detail__404">
      <h1>Project not found</h1>
      <RouterLink to="/" class="btn-primary">Back to Home</RouterLink>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getProjectBySlug } from '@/data/projects.js'
import { useParallax } from '@/composables/useParallax.js'

gsap.registerPlugin(ScrollTrigger)

const { parallax } = useParallax()

const route = useRoute()
const project = computed(() => getProjectBySlug(route.params.slug))

const backRef = ref(null)
const heroRef = ref(null)
const metaRef = ref(null)
const titleRef = ref(null)
const clientRef = ref(null)
const tagsRef = ref(null)
const coverRef = ref(null)
const descRef = ref(null)
const sidebarRef = ref(null)
const galleryRef = ref(null)

onMounted(() => {
  if (!project.value) return

  // Entrance sequence
  const tl = gsap.timeline({ delay: 0.1 })

  tl.fromTo(backRef.value,
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
  )

  tl.fromTo(metaRef.value,
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
    '-=0.3'
  )

  tl.fromTo(titleRef.value,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' },
    '-=0.3'
  )

  tl.fromTo('.work-detail__logo',
    { opacity: 0, scale: 0.8 },
    { opacity: 0.9, scale: 1, duration: 0.6, ease: 'power3.out' },
    '-=0.6'
  )

  tl.fromTo([clientRef.value, tagsRef.value],
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out' },
    '-=0.4'
  )

  // Cover — parallax + clip reveal
  gsap.fromTo('.work-detail__cover-img',
    { scale: 1.15 },
    {
      scale: 1,
      duration: 1.6,
      ease: 'power3.out',
      scrollTrigger: { trigger: coverRef.value, start: 'top 80%' }
    }
  )

  gsap.fromTo('.work-detail__cover-img-wrap',
    { clipPath: 'inset(100% 0 0 0)' },
    {
      clipPath: 'inset(0% 0 0 0)',
      duration: 1.2,
      ease: 'power4.inOut',
      scrollTrigger: { trigger: coverRef.value, start: 'top 80%' }
    }
  )

  // Parallax cover as you scroll
  parallax('.work-detail__cover-img', 0.12, { trigger: coverRef.value })

  // Content reveal
  gsap.fromTo([descRef.value, sidebarRef.value],
    { opacity: 0, y: 30 },
    {
      opacity: 1, y: 0,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: descRef.value, start: 'top 80%' }
    }
  )

  // Gallery items — cascade reveal with rotation
  const galleryItems = document.querySelectorAll('.work-detail__gallery-item')
  if (galleryItems.length) {
    gsap.fromTo(galleryItems,
      { opacity: 0, y: 60, rotation: 1.5 },
      {
        opacity: 1, y: 0, rotation: 0,
        stagger: { amount: 0.6, from: 'start' },
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: galleryRef.value, start: 'top 80%' }
      }
    )
  }
})
</script>

<style scoped>
/* Entire page — off-white background */
.work-detail {
  padding-top: 6rem;
  background: var(--color-off-white);
  min-height: 100dvh;
  background-image: linear-gradient(
    to bottom,
    #000000 0px,
    var(--color-off-white) 120px
  );
  background-attachment: local;
}

/* Back link */
.work-detail__back-wrap {
  padding: 1.5rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.work-detail__back {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(17, 17, 17, 0.5);
  text-decoration: none;
  transition: color 0.3s ease;
}

.work-detail__back:hover { color: var(--color-text-dark); }

/* Hero */
.work-detail__hero {
  padding: 3rem 2rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.work-detail__hero-inner { margin-bottom: 2rem; }

.work-detail__meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.work-detail__meta .eyebrow { color: var(--color-text-dark-35); }

.work-detail__meta-sep { color: rgba(17,17,17,0.2); }

.work-detail__title-row {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.work-detail__title {
  font-size: clamp(2rem, 5vw, 4.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 0.95;
  color: var(--color-text-dark);
  margin-bottom: 0;
}

.work-detail__logo {
  width: 56px;
  height: 56px;
  object-fit: contain;
  flex-shrink: 0;
  filter: invert(1);
  opacity: 0.85;
}

.work-detail__client { color: var(--color-text-dark-35); }

/* Tags */
.work-detail__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.work-detail__tag {
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-dark-60);
  padding: 0.35rem 0.9rem;
  border: 1px solid var(--color-border-dark);
  border-radius: 100px;
}

/* Cover */
.work-detail__cover {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.work-detail__cover-img-wrap {
  overflow: hidden;
  border-radius: 8px;
  aspect-ratio: 16 / 9;
  background: rgba(17,17,17,0.06);
}

.work-detail__cover-img {
  width: 100%;
  height: 100%;
  object-fit: fill;
}

/* Content */
.work-detail__content {
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.work-detail__content-inner {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 5rem;
}

.work-detail__description {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.work-detail__description .eyebrow { color: var(--color-text-dark-35); }

.work-detail__desc-text {
  font-size: 1.2rem;
  line-height: 1.7;
  color: var(--color-text-dark);
  font-weight: 400;
}

.work-detail__desc-full {
  font-size: 0.9rem;
  line-height: 1.9;
  color: var(--color-text-dark-60);
  white-space: pre-line;
}

.work-detail__sidebar { padding-top: 2rem; }

.work-detail__sidebar .eyebrow { color: var(--color-text-dark-35); }

.work-detail__deliverables {
  list-style: none;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.work-detail__deliverable {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.8rem;
  color: var(--color-text-dark-60);
  letter-spacing: 0.05em;
}

.work-detail__deliverable-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(17,17,17,0.3);
  flex-shrink: 0;
}

/* Gallery */
.work-detail__gallery {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.work-detail__gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.work-detail__gallery-item--wide { grid-column: 1 / -1; }

.work-detail__gallery-img {
  width: 100%;
  height: auto;
  object-fit: fill;
  border-radius: 6px;
  aspect-ratio: 4/3;
  display: block;
}

.work-detail__gallery-item--wide .work-detail__gallery-img {
  aspect-ratio: 16/7;
}

/* Bottom CTA */
.work-detail__bottom {
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.work-detail__bottom .divider { background: var(--color-border-dark); }

.work-detail__cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 3rem;
  gap: 2rem;
}

.work-detail__cta-label {
  font-size: 1rem;
  color: var(--color-text-dark-60);
}

.work-detail__cta .btn-primary {
  background: var(--color-text-dark);
  color: var(--color-off-white);
}

.work-detail__cta .btn-primary:hover {
  background: rgba(17,17,17,0.85);
}

/* 404 state */
.work-detail--404 {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  background: var(--color-off-white);
}

.work-detail__404 {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  color: var(--color-text-dark);
}

@media (max-width: 1024px) {
  .work-detail__content-inner { grid-template-columns: 1fr; gap: 3rem; }
}

@media (max-width: 768px) {
  .work-detail__gallery-grid      { grid-template-columns: 1fr; }
  .work-detail__gallery-item--wide { grid-column: 1; }
  .work-detail__cta               { flex-direction: column; align-items: flex-start; }
}
</style>
