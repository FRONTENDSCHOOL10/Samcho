/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#4D82BE',
          50: '#D3E0EF',
          100: '#C5D6EA',
          200: '#A7C1DF',
          300: '#89ACD4',
          400: '#6B97C9',
          500: '#4D82BE',
          600: '#38669A',
          700: '#294B71',
          800: '#1A3048',
          900: '#0B151F',
          950: '#04070B',
        },
      },
    },
  },
  plugins: [],
};
