/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base:      '#0d0e12',
        panel:     '#15171d',
        surface:   '#1a1c23',
        elevated:  '#212430',
        border:    '#2a2d37',
        accent:    '#fbbf24',
        cyan:      '#22d3ee',
        success:   '#10b981',
        danger:    '#f87171',
        textPrimary:   '#e8e9ed',
        textSecondary: '#9396a3',
        textMuted:     '#5c5f6b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        slideup:  { from: { opacity:'0', transform:'translateY(8px)' }, to:{ opacity:'1', transform:'translateY(0)' } },
        fadein:   { from: { opacity:'0' }, to: { opacity:'1' } },
        pulse2:   { '0%,100%':{ opacity:'1' }, '50%':{ opacity:'0.5' } },
      },
      animation: {
        slideup: 'slideup 0.25s ease forwards',
        fadein:  'fadein 0.2s ease forwards',
        pulse2:  'pulse2 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
