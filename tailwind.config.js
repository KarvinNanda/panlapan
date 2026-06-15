/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    // Override ALL default font stacks → Century Gothic everywhere
    fontFamily: {
      sans:  ['"Century Gothic"', 'CenturyGothic', '"AppleGothic"', 'sans-serif'],
      serif: ['"Century Gothic"', 'CenturyGothic', '"AppleGothic"', 'sans-serif'],
      mono:  ['"Century Gothic"', 'CenturyGothic', '"AppleGothic"', 'sans-serif'],
    },
    extend: {
      colors: {
        'black': '#000000',
        'white': '#FFFFFF',
        'black-20': 'rgba(0, 0, 0, 0.20)',
        'white-10': 'rgba(255, 255, 255, 0.10)',
        'white-20': 'rgba(255, 255, 255, 0.20)',
        'white-60': 'rgba(255, 255, 255, 0.60)',
      },
      letterSpacing: {
        'widest2': '0.2em',
        'widest3': '0.3em',
      }
    }
  },
  plugins: []
}
