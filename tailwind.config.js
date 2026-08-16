/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9ccda5',
        secondary: '#ddefe3',
        accent: '#41956a',
        background: '#f7faf8',
        text: '#1a2e22',
        muted: '#6b8f75',
        border: '#c8e3cf',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
