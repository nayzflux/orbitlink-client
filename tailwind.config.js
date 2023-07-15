/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gradient-1': 'radial-gradient(circle, rgba(56,147,255,1) 0%, rgba(171,0,255,1) 100%);'
      }
    },
  },
  plugins: [],
}