/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
      'fullScreen': '100vw',
      },
      colors: {
        "primary": "#FC4747",
        "dark-blue": "#10141E",
        "white": "#FFFFFF",
        "greyish-blue": "#5A698F",
        "semi-dark-blue": "#161D2F",
      }
    },
  },
  plugins: [],
}

