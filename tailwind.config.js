/** @type {import('tailwindcss').Config} */
export default {
 important: true,
 content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
 darkMode: 'class',
 theme: {
  container: {
   center: true,
   padding: '18px',
  },
  extend: {
   colors: {
    primary: '#FAFBFA',
    secondary: '#5874A7',
    third: '#163270',
   },
   fontFamily: {
    primary: ['Jomolhari', 'serif'],
    secondary: ['jsMath-cmmi10', 'sans-serif'],
   },
  },
 },
 plugins: [],
};
