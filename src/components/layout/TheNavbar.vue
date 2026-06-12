<template>
  <header ref="navRef" class="navbar" :class="{ 'navbar--scrolled': isScrolled, 'navbar--hidden': isHidden }">
    <div class="navbar__inner">

      <RouterLink to="/" class="navbar__logo" @click="closeMenu">
        <span class="navbar__logo-text">Panlapan</span>
      </RouterLink>

      <nav class="navbar__links">
        <a
          v-for="item in navItems"
          :key="item.label"
          :href="item.href"
          class="navbar__link nav-link"
          :class="{ 'navbar__link--active': activeSection === item.sectionId }"
          @click.prevent="scrollToSection(item.sectionId)"
        >
          {{ item.label }}
        </a>
      </nav>

      <a href="#connect" class="navbar__cta nav-link" @click.prevent="scrollToSection('connect')">
        <span>Start a Project</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>

      <button
        class="navbar__hamburger"
        :class="{ 'is-open': menuOpen }"
        @click="toggleMenu"
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
    </div>

    <Transition name="mobile-menu">
      <div v-if="menuOpen" class="mobile-menu">
        <nav class="mobile-menu__links">
          <a
            v-for="(item, i) in navItems"
            :key="item.label"
            :href="item.href"
            class="mobile-menu__link"
            :style="{ transitionDelay: `${i * 0.07}s` }"
            @click.prevent="mobileScrollTo(item.sectionId)"
          >
            <span class="mobile-menu__number">0{{ i + 1 }}</span>
            {{ item.label }}
          </a>
        </nav>
        <div class="mobile-menu__footer">
          <a href="#connect" class="btn-primary" @click.prevent="mobileScrollTo('connect')">
            Start a Project
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const navRef        = ref(null)
const isScrolled    = ref(false)
const isHidden      = ref(false)
const menuOpen      = ref(false)
const activeSection = ref('')
let lastScrollY = 0

const navItems = [
  { label: 'Work',     href: '#work',     sectionId: 'work'     },
  { label: 'Services', href: '#services', sectionId: 'services' },
  { label: 'About',    href: '#about',    sectionId: 'about'    },
  { label: 'Connect',  href: '#connect',  sectionId: 'connect'  },
]

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const mobileScrollTo = (id) => {
  closeMenu()
  setTimeout(() => scrollToSection(id), 300)
}

const handleScroll = () => {
  const currentY = window.scrollY
  isScrolled.value = currentY > 50
  if (currentY > lastScrollY && currentY > 100) {
    isHidden.value = true
  } else {
    isHidden.value = false
  }
  lastScrollY = currentY
  const ids = navItems.map(i => i.sectionId)
  for (const id of [...ids].reverse()) {
    const el = document.getElementById(id)
    if (el && el.getBoundingClientRect().top <= 120) {
      activeSection.value = id
      break
    }
  }
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  document.body.style.overflow = menuOpen.value ? 'hidden' : ''
}

const closeMenu = () => {
  menuOpen.value = false
  document.body.style.overflow = ''
}

onMounted(()  => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => { window.removeEventListener('scroll', handleScroll); document.body.style.overflow = '' })
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 1.5rem 2rem;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              background 0.4s ease, padding 0.4s ease;
}

.navbar--scrolled {
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 1rem 2rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.navbar--hidden { transform: translateY(-100%); }

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
}

.navbar__logo      { text-decoration: none; z-index: 110; }
.navbar__logo-text {
  font-family: var(--font-primary);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-white);
  letter-spacing: -0.02em;
  text-transform: lowercase;
}
.navbar__logo-img  { height: 28px; width: auto; display: block; }

.navbar__links     { display: flex; align-items: center; gap: 2.5rem; }

.navbar__link {
  font-family: var(--font-primary);
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  transition: color 0.3s ease;
  position: relative;
}

.navbar__link::after {
  content: '';
  position: absolute;
  bottom: -3px; left: 0;
  width: 0; height: 1px;
  background: var(--color-white);
  transition: width 0.3s ease;
}

.navbar__link:hover,
.navbar__link--active            { color: var(--color-white); }
.navbar__link:hover::after,
.navbar__link--active::after     { width: 100%; }

.navbar__cta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 100px;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-white);
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: none;
}

.navbar__cta:hover { border-color: var(--color-white); background: rgba(255,255,255,0.05); }

.navbar__hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: none;
  z-index: 110;
}

.navbar__hamburger span {
  display: block;
  width: 24px; height: 1px;
  background: var(--color-white);
  transition: transform 0.4s ease, opacity 0.4s ease;
  transform-origin: center;
}

.navbar__hamburger.is-open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
.navbar__hamburger.is-open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.navbar__hamburger.is-open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

.mobile-menu {
  position: fixed;
  inset: 0;
  background: var(--color-black);
  z-index: 105;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6rem 2rem 3rem;
}

.mobile-menu__links    { display: flex; flex-direction: column; }

.mobile-menu__link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 0;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-white);
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  letter-spacing: -0.02em;
  transition: color 0.3s ease;
}

.mobile-menu__link:hover { color: rgba(255,255,255,0.5); }

.mobile-menu__number {
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.4);
  font-weight: 400;
  align-self: flex-start;
  margin-top: 0.5rem;
}

.mobile-menu__footer { margin-top: auto; padding-top: 2rem; }

.mobile-menu-enter-active { animation: menuIn  0.5s cubic-bezier(0.25,0.46,0.45,0.94); }
.mobile-menu-leave-active { animation: menuOut 0.4s cubic-bezier(0.25,0.46,0.45,0.94); }

@keyframes menuIn  { from { clip-path: inset(0 0 100% 0); } to { clip-path: inset(0 0 0% 0); } }
@keyframes menuOut { from { clip-path: inset(0 0 0% 0); }  to { clip-path: inset(0 0 100% 0); } }

@media (max-width: 900px) {
  .navbar__links, .navbar__cta { display: none; }
  .navbar__hamburger            { display: flex; }
}
</style>
