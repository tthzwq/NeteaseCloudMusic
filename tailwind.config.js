/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      black: "#000000",
      white: "#ffffff",
      primary: "#d33a31",
      ct: "#2d2d2d",
      ctd: "#787878",
    },
    extend: {
      backdropBlur: {
        xxs: '1px',
      },
      boxShadow: {
        'innercard': 'inset 0px 40px 20px -20px rgba(0,0,0,0.15), inset 0px 0px 0px 1px #f2f0f2',
      }
    },
  },
  plugins: [],
}

