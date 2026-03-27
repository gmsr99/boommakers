/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        orange: { DEFAULT: '#F5F5F5', 400: '#FFFFFF', 600: '#D4D4D4' },
        amber: '#A3A3A3',
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
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,255,255,0.08)' },
          '50%': { boxShadow: '0 0 40px rgba(255,255,255,0.16)' },
        },
      },
      boxShadow: {
        'orange': '0 0 40px rgba(255,255,255,0.08)',
        'orange-lg': '0 0 80px rgba(255,255,255,0.12)',
        'card': '0 4px 32px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}
