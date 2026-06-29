/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        phosphor:  '#39ff14',
        amber:     '#f5c518',
        danger:    '#ff3131',
        surface:   '#1a1a1a',
        void:      '#0a0a0a',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '92%':      { opacity: '1' },
          '93%':      { opacity: '0.4' },
          '94%':      { opacity: '1' },
          '96%':      { opacity: '0.6' },
          '97%':      { opacity: '1' },
        },
        scanline: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        typein: {
          from: { width: '0' },
          to:   { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        slideup: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        flicker:  'flicker 4s infinite',
        scanline: 'scanline 8s linear infinite',
        blink:    'blink 1s step-end infinite',
        slideup:  'slideup 0.3s ease forwards',
      },
    },
  },
  plugins: [],
}
