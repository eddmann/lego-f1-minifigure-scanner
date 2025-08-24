import type { Config } from 'tailwindcss';

// Tailwind v4 uses content inference via @import "tailwindcss" in CSS.
// This config only extends theme colors and plugins if needed.
export default {
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'system-ui', 'sans-serif'],
        racing: ['Rajdhani', 'system-ui', 'sans-serif'],
      },
      colors: {
        legoRed: '#d62828',
        legoYellow: '#fcbf49',
        legoBlue: '#3a86ff',
        f1Black: '#161616',
        f1Dark: '#212121',
        neonGreen: '#80ed99',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 300ms ease-out',
      },
    },
  },
} satisfies Config;
