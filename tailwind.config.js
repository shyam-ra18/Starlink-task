/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkblue: '#3D4C7E',
        midpurple: '#7076B6',
        greypurple: '#E2E4F0',
        darkPurple: '#51547b',
      },
    },
  },
  plugins: [],
}

