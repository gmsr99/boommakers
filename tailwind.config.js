/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#F97316',
          light: '#FB923C',
          dark: '#EA6C0A',
        },
        accent2: {
          DEFAULT: '#6366F1',
          light: '#818CF8',
        },
        dark: { DEFAULT: '#0A0A0A', 100: '#111111', 200: '#1A1A1A', 300: '#242424' },
        card: '#141414',
        border: '#242424',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-orange': 'pulse-orange 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(249,115,22,0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(249,115,22,0.25)' },
        },
        'pulse-orange': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(249,115,22,0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(249,115,22,0)' },
        },
      },
      boxShadow: {
        'orange': '0 0 30px rgba(249,115,22,0.25)',
        'orange-lg': '0 0 60px rgba(249,115,22,0.35)',
        'card': '0 4px 32px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}
