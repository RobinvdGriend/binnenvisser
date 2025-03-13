import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Univers', ...defaultTheme.fontFamily.sans],
        display: ['Alte Haas Grotesk', ...defaultTheme.fontFamily.sans]
      }
    },
    colors: {
      'light-yellow': '#f5f1bf',
      'brick-orange': '#d24a19',
      'dark-red': '#8a181a',
      'dark-green': '#7a5510',
      'off-white': '#fdfdf8',
    }
  },
  plugins: []
}
