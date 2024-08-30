/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#4D82BE',
          10: '#F1F5FA',
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
        gray: {
          50: '#F9F9F9',
          100: '#F4F4F4',
          200: '#D9D9D9',
          300: '#979797',
          400: '#717171',
          450: '#555555',
          500: '#393939',
        },
        black: '#00050E',
        red: '#EC2929',
      },
      boxShadow: {
        light: '1px 1px 5px rgba(0, 0, 0, 0.1)',
        dark: '1px 1px 5px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};
