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
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'scroll-x': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        'scroll-x': 'scroll-x 40s linear infinite',
      },
    },
  },
  plugins: [],
}
