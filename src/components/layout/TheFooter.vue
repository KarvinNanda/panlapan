<template>
  <footer class="footer">
    <div class="footer__gradient" />

    <div class="footer__inner">

      <!-- Wordmark -->
      <span class="footer__wordmark">panlapan</span>

      <!-- Social icons -->
      <div class="footer__socials">
        <a href="mailto:hello@panlapan.com" class="footer__social-btn" aria-label="Email" data-cursor-hover>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/>
            <path d="M2 8l10 7 10-7" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </a>
        <a href="https://www.instagram.com/panlapancreative/" target="_blank" rel="noopener noreferrer"
           class="footer__social-btn" aria-label="Instagram" data-cursor-hover>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="1.5"/>
            <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/>
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
          </svg>
        </a>
        <a href="https://linkedin.com/company/panlapan" target="_blank" rel="noopener noreferrer"
           class="footer__social-btn" aria-label="LinkedIn" data-cursor-hover>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" stroke-width="1.5"/>
            <path d="M7 10v7M7 7v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M11 17v-4a2 2 0 014 0v4M11 10v7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </a>
      </div>

      <!-- Tagline + sub -->
      <p class="footer__tagline">Strategy. Creativity. Growth.</p>
      <p class="footer__sub">Turning Ideas into Impactful Creations.</p>

    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  position: relative;
  overflow: hidden;
  background: var(--color-black);
  padding-bottom: 2.5rem;
}

.footer__gradient {
  display: none;
}

.footer__inner {
  position: relative;
  z-index: 1;
  max-width: 600px;
  margin: 0 auto;
  padding: 5rem 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
}

/* Wordmark */
.footer__wordmark {
  font-size: clamp(2rem, 7vw, 2.8rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-white);
  text-transform: lowercase;
}

/* Social icons */
.footer__socials {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.footer__social-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer__social-btn:hover {
  color: var(--color-white);
}

/* Tagline */
.footer__tagline {
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  font-weight: 700;
  color: var(--color-white);
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin-bottom: -0.5rem;
}

/* Sub */
.footer__sub {
  font-size: clamp(0.75rem, 2.5vw, 0.88rem);
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.02em;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .footer__inner { padding: 4rem 1.5rem 1rem; }
}
</style>
