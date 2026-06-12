<template>
  <footer class="footer">
    <!-- Top gradient — merah oranye ke biru gelap ke hitam -->
    <div class="footer__gradient" />

    <div class="footer__inner">
      <!-- Logo + tagline centered -->
      <div class="footer__brand">
        <!--
          LOGO — uncomment dan hapus <span> setelah logo.svg siap
          File: src/assets/icons/logo.svg
        -->
        <img src="/assets/images/6-9-2026 - Primary Logo Panlapan - White.png" alt="Panlapan" class="footer__logo-img" />
        <!-- <span class="footer__logo-text">panlapan</span> -->
        <span class="footer__logo-wordmark">panlapan</span>
      </div>

      <div class="divider footer__divider" />

      <!-- Tagline -->
      <p class="footer__tagline">Strategy. Creativity. Growth.</p>
      <p class="footer__sub">Turning Ideas into Impactful Creations.</p>

      <!-- Social icons -->
      <div class="footer__socials">
        <a href="mailto:hello@panlapan.com" class="footer__social-btn" aria-label="Email" data-cursor-hover>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/>
            <path d="M2 8l10 7 10-7" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </a>
        <a href="https://instagram.com/panlapan" target="_blank" rel="noopener noreferrer"
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

      <div class="divider footer__divider" />

      <!-- Bottom copy -->
      <p class="footer__copy">© {{ year }} Panlapan Creative Lab. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  position: relative;
  overflow: hidden;
  padding-bottom: 2.5rem;
}

/* Gradient background — merah-oranye di atas → biru gelap → hitam */
.footer__gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(200, 60,  20, 0.22) 0%,
    rgba(60,  20, 120, 0.30) 35%,
    rgba(10,   5,  30, 0.60) 65%,
    rgba(0,    0,   0, 1.00) 100%
  );
  pointer-events: none;
  z-index: 0;
}

.footer__inner {
  position: relative;
  z-index: 1;
  max-width: 600px;
  margin: 0 auto;
  padding: 5rem 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.25rem;
}

/* Brand block */
.footer__brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.footer__logo-img {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.footer__logo-wordmark {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-white);
  text-transform: lowercase;
}

/* Tagline */
.footer__tagline {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-white);
  letter-spacing: 0.02em;
}

.footer__sub {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.05em;
  margin-top: -0.5rem;
}

/* Divider */
.footer__divider {
  width: 100%;
  background: rgba(255, 255, 255, 0.10);
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
  border: 1px solid rgba(255, 255, 255, 0.20);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: all 0.3s ease;
}

.footer__social-btn:hover {
  border-color: var(--color-white);
  color: var(--color-white);
  background: rgba(255, 255, 255, 0.05);
}

/* Copy */
.footer__copy {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 0.05em;
}
</style>
