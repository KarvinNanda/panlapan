<template>
  <!-- Single root element required for <Transition> in App.vue -->
  <main :class="project ? 'work-detail' : 'work-detail work-detail--404'">

    <!-- Scroll progress bar (only on real project page) -->
    <div class="work-detail__progress" ref="progressRef" v-if="project" />

    <!-- ── Project page ── -->
    <template v-if="project">

    <!-- Back navigation -->
    <div class="work-detail__back-wrap" ref="backRef">
      <a href="/" class="work-detail__back">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M13 7H1M1 7L7 13M1 7L7 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Back</span>
      </a>
    </div>

    <!-- Header: Logo + Title + Description + Meta -->
    <section class="work-detail__header" ref="headerRef">

      <!-- Logo + Title row -->
      <div class="work-detail__title-row">
        <img
          v-if="project.logo"
          :src="project.logo"
          :alt="`${project.title} logo`"
          class="work-detail__logo"
        />
        <h1 class="work-detail__title">
          <span class="text-reveal-wrapper"><span class="reveal-target">{{ project.title }}</span></span>
        </h1>
      </div>

      <!-- Full description -->
      <div class="work-detail__desc" ref="descRef">
        <p v-for="(para, i) in descParagraphs" :key="i">
          <span class="text-reveal-wrapper"><span class="reveal-target" style="display: block;">{{ para }}</span></span>
        </p>
      </div>

      <!-- Category + Publisher row -->
      <div class="work-detail__meta" ref="metaRef">
        <div class="work-detail__meta-item">
          <span class="work-detail__meta-label">Category</span>
          <span class="work-detail__meta-value">{{ project.industry }}</span>
        </div>
        <div class="work-detail__meta-item">
          <span class="work-detail__meta-label">Publisher</span>
          <span class="work-detail__meta-value">{{ project.year }}</span>
        </div>
      </div>
    </section>

    <!-- Video player (manual play) — shown if project has a video -->
    <section class="work-detail__video-section" ref="videoSectionRef" v-if="project.video">
      <div class="work-detail__video-wrap">
        <video
          ref="videoEl"
          :src="project.video"
          class="work-detail__video"
          preload="metadata"
          playsinline
          @ended="isPlaying = false"
        />
        <Transition name="overlay-fade">
          <div
            v-if="!isPlaying"
            class="work-detail__video-overlay"
            @click="playVideo"
          >
            <button class="work-detail__play-btn" aria-label="Play">
              <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
          </div>
        </Transition>
      </div>
    </section>

    <!-- Images stacked full-width -->
    <section class="work-detail__gallery" ref="galleryRef" v-if="project.images?.length">
      <div
        v-for="(img, i) in project.images"
        :key="i"
        class="work-detail__img-wrap"
      >
        <img
          :src="img"
          :alt="`${project.title} — Image ${i + 1}`"
          class="work-detail__image"
          loading="lazy"
        />
      </div>
    </section>

    </template>
    <!-- ── 404 state ── -->
    <template v-else>
      <div class="work-detail__404">
        <h1>Project not found</h1>
        <RouterLink to="/" class="btn-primary">Back to Home</RouterLink>
      </div>
    </template>

  </main>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTextReveal } from '@/composables/useTextReveal.js'
import { getProjectBySlug } from '@/data/projects.js'

gsap.registerPlugin(ScrollTrigger)

const { revealText } = useTextReveal()

const route = useRoute()
const project = computed(() => getProjectBySlug(route.params.slug))

const descParagraphs = computed(() => {
  const text = project.value?.fullDescription || project.value?.description || ''
  return text.split(/\n\n+/).filter(Boolean)
})

const progressRef    = ref(null)
const backRef        = ref(null)
const headerRef      = ref(null)
const descRef        = ref(null)
const metaRef        = ref(null)
const galleryRef     = ref(null)
const videoSectionRef = ref(null)
const videoEl        = ref(null)
const isPlaying      = ref(false)

const playVideo = () => {
  if (videoEl.value) {
    videoEl.value.play()
    isPlaying.value = true
  }
}

let ctx = null
let onScroll = null

onMounted(async () => {
  await nextTick()

  // Scroll progress bar
  if (project.value) {
    onScroll = () => {
      if (!progressRef.value) return
      const total = document.documentElement.scrollHeight - window.innerHeight
      progressRef.value.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
  }

  if (!project.value) return

  ctx = gsap.context(() => {
    const tl = gsap.timeline({ delay: 0.1 })

    if (backRef.value) {
      tl.fromTo(backRef.value,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }
      )
    }

    const titleRow = headerRef.value?.querySelector('.work-detail__title-row')
    if (titleRow) {
      const logo = titleRow.querySelector('.work-detail__logo')
      const title = titleRow.querySelector('.work-detail__title')
      if (logo) {
        tl.fromTo(logo,
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.6)' },
          '-=0.1'
        )
      }
      if (title) {
        const target = title.querySelector('.reveal-target')
        if (target) revealText(target, null, 0.4)
      }
    }

    if (descRef.value) {
      const targets = descRef.value.querySelectorAll('.reveal-target')
      if (targets?.length) revealText(targets, descRef.value, 0)
    }

    if (metaRef.value) {
      gsap.fromTo(metaRef.value,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: metaRef.value, start: 'top 90%' } }
      )
    }

    if (videoSectionRef.value) {
      gsap.fromTo(videoSectionRef.value,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: videoSectionRef.value, start: 'top 90%' } }
      )
    }

    const wraps = galleryRef.value?.querySelectorAll('.work-detail__img-wrap')
    if (wraps?.length) {
      wraps.forEach((wrap) => {
        // Entrance clip-path animation
        gsap.fromTo(wrap,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.2,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: wrap, start: 'top 95%' }
          }
        )

        // Image Parallax
        const img = wrap.querySelector('.work-detail__image')
        if (img) {
          gsap.fromTo(img,
            { yPercent: -8, scale: 1.15 },
            {
              yPercent: 8,
              ease: 'none',
              scrollTrigger: {
                trigger: wrap,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
              }
            }
          )
        }
      })
    }
  })
})

onUnmounted(() => {
  if (onScroll) window.removeEventListener('scroll', onScroll)
  ctx?.revert()
})
</script>

<style scoped>
/* Scroll progress bar */
.work-detail__progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: #E73121;
  transform-origin: left center;
  transform: scaleX(0);
  z-index: 200;
  pointer-events: none;
}

.work-detail {
  padding-top: 6rem;
  background: var(--color-off-white);
  min-height: 100dvh;
  /* background-image: linear-gradient(
    to bottom,
    #000000 0px,
    var(--color-off-white) 120px
  ); */
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

.work-detail__back svg {
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.work-detail__back:hover svg { transform: translateX(-5px); }

/* Header section */
.work-detail__header {
  padding: 1.5rem 2rem 3rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* Logo + Title */
.work-detail__title-row {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.work-detail__logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
  flex-shrink: 0;
}

.work-detail__title {
  font-size: clamp(2rem, 5vw, 4.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 0.95;
  color: var(--color-text-dark);
}

/* Description */
.work-detail__desc {
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.work-detail__desc p {
  font-size: clamp(0.88rem, 1.4vw, 1rem);
  line-height: 1.85;
  color: var(--color-text-dark-60);
  max-width: 700px;
}

/* Category / Publisher */
.work-detail__meta {
  display: flex;
  justify-content: space-between;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border-dark);
}

.work-detail__meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.work-detail__meta-label {
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(17, 17, 17, 0.35);
}

.work-detail__meta-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text-dark);
}

/* Gallery — stacked full-width */
.work-detail__gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 2rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
}

.work-detail__img-wrap {
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  justify-content: center;
}

.work-detail__image {
  display: block;
  width: auto;
  max-width: 100%;
  height: auto;
  max-height: 80vh;
  transition: transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.work-detail__img-wrap:hover .work-detail__image {
  transform: scale(1.03);
}

/* Video section */
.work-detail__video-section {
  padding: 2rem 2rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
}

.work-detail__video-wrap {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: #000;
  aspect-ratio: 16 / 9;
}

.work-detail__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.work-detail__video-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.38);
  cursor: pointer;
  transition: background 0.3s ease;
}

.work-detail__video-overlay:hover { background: rgba(0, 0, 0, 0.22); }

.work-detail__play-btn {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #111;
  transition: transform 0.3s ease, background 0.3s ease;
}

.work-detail__play-btn:hover {
  transform: scale(1.08);
  background: #fff;
}

.work-detail__play-btn svg { margin-left: 3px; }

.overlay-fade-enter-active,
.overlay-fade-leave-active { transition: opacity 0.35s ease; }
.overlay-fade-enter-from,
.overlay-fade-leave-to { opacity: 0; }

/* 404 — overrides the gradient when project not found */
.work-detail--404 {
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: none;
  padding-top: 0;
}

.work-detail__404 {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  color: var(--color-text-dark);
}

@media (max-width: 768px) {
  .work-detail__header       { padding: 1rem 1.5rem 2.5rem; }
  .work-detail__gallery      { padding: 0 1.5rem 3rem; gap: 0.75rem; }
  .work-detail__video-section { padding: 0 1.5rem 3rem; }
  .work-detail__play-btn     { width: 56px; height: 56px; }
  .work-detail__title-row    { gap: 0.9rem; }
  .work-detail__logo         { width: 36px; height: 36px; }
  .work-detail__meta         { gap: 2.5rem; }
}
</style>
