/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        background: '#0a0a0a',
        cardBg: 'rgba(255, 255, 255, 0.1)',
        textColor: '#e0e0e0',
      },
    },
  },
  plugins: [],
}