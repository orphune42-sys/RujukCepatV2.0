/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#9ccda5',
        secondary: '#ddefe3',
        accent: '#41956a',
        background: '#f7faf8',
        'background-dark': '#0f1a13',
        text: '#1a2e22',
        'text-dark': '#e2ede6',
        muted: '#6b8f75',
        border: '#c8e3cf',
        'border-dark': '#1c3626',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
