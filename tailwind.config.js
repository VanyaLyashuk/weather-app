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
      boxShadow: {
        'dark-shadow': 'inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05), 0 0.3px 0.4px hsla(0, 0%, 0%, 0.02), 0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09)',
        'light-shadow': 'rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;',
      }
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
