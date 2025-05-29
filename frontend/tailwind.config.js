/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#880606',
          DEFAULT: '#d53d0c',
          light: '#ff8207',
        },
        secondary: {
          DEFAULT: '#231d1e',
        },
        light: '#fcfcfc',
      },
    },
  },
  plugins: [],
} 