/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#FAF7F2',
          dark: '#121110',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#1A1816',
          warm: '#F5EFEB',
          'warm-dark': '#22201D',
          muted: '#EFE8DE',
          'muted-dark': '#2A2723',
        },
        ink: {
          DEFAULT: '#1E1B18',
          dark: '#FAF7F2',
          muted: '#686058',
          'muted-dark': '#A0968B',
          faint: '#A0968B',
          'faint-dark': '#686058',
        },
        accent: {
          terracotta: '#E07A5F',
          butter: '#F4A261',
          sage: '#588157',
          sun: '#E9C46A',
          clay: '#C86D51',
          sand: '#E6DCCE',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'cozy-sm': '0 2px 8px rgba(44, 34, 25, 0.04)',
        'cozy': '0 8px 24px rgba(44, 34, 25, 0.06)',
        'cozy-lg': '0 20px 48px rgba(44, 34, 25, 0.09)',
        'tactile': '0 4px 0 rgba(44, 34, 25, 0.08)',
        'tactile-pressed': '0 1px 0 rgba(44, 34, 25, 0.08)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      }
    },
  },
  plugins: [],
}
