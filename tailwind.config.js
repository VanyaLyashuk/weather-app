/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        custom: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        'primary': '#e76e4e',
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "768px",
      xl: "768px",
      "2xl": "768px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '12px',
        sm: '1rem',
        md: '1rem',
        lg: '1rem',
        xl: '1rem',
        "2xl": '1rem',
      },
    },
  },
  plugins: [],
}
