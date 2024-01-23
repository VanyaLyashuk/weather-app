/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Space Grotesk', 'sans-serif']
      }
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
      screens: { 
        sm: "100%",
        md: "100%",
        lg: "768px",
        xl: "768px",
        "2xl": "768px",
      },
    },
  },
  plugins: [],
}

