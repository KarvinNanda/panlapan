// ================================================
// Motion tokens — satu sumber durasi, easing & media query
// untuk semua animasi GSAP di project ini.
// ================================================

export const EASE = {
  out:   'expo.out',     // elemen masuk: cepat di awal, halus di akhir
  in:    'power2.in',    // elemen keluar
  inOut: 'power3.inOut', // garis / divider
}

export const DUR = {
  fast:   0.3,
  base:   0.7,
  slow:   1.0,
  reveal: 1.1,
}

export const STAGGER = {
  tight: 0.06,
  base:  0.08,
}

export const MQ = {
  motionOk:    '(prefers-reduced-motion: no-preference)',
  reduce:      '(prefers-reduced-motion: reduce)',
  finePointer: '(hover: hover) and (pointer: fine)',
}

// Section padding (min 5rem) sudah lebih tinggi dari navbar (maks 80px),
// jadi scroll ke section cukup mendarat tepat di top-nya.
export const NAV_OFFSET = 0
