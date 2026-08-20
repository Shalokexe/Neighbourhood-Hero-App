/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hero: {
          dark: "#080B12",
          card: "#121826",
          cyan: "#00E5FF",
          red: "#FF2A54",
          blue: "#2563EB",
          gold: "#FFC72C"
        }
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
