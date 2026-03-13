/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a0a0a',
        secondary: '#161616',
        accent: '#b08d57',
        'accent-glow': 'rgba(176, 141, 87, 0.3)',
        'text-main': '#e0e0e0',
        'text-muted': '#888888',
        'neon-cyan': '#00f2ff',
        'neon-violet': '#bc13fe',
        'charcoal': '#0d0d0d',
        'glass-bg': 'rgba(17, 17, 17, 0.6)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'scroll-x': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bar-grow': {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
      },
      animation: {
        'scroll-x': 'scroll-x 40s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        'bar-grow': 'bar-grow 1s ease-out forwards',
      },
      backgroundSize: {
        '400': '400% 100%',
      },
    },
  },
  plugins: [],
}
