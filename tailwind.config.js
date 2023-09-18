/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      navy: '#08305C',
      dark_blue: '#0B4D89',
      sky_blue: '#339BD6',
      light_blue: '#79BDE3',
      cu_green: '#2A7C62',
      light_green: '#A4D5AD',
      cu_danger: '#D33535',
      cu_warning: '#F7B801',
      cu_dark: '#333333',
      cu_light: '#FFFFFF',
      cu_gray: '#FBFBFB',

      ...require('tailwindcss/colors'),
    }
  },
  plugins: [],
}

