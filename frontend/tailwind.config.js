const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: media, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      gray: colors.coolGray,
      blue: colors.lightBlue,
      red: colors.rose,
      pink: '#FBE6FE',
      primary: '#FFE5D9',
      secondary: colors.pink,
      tertiary: '#D8E2DC'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
