module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeOut 0.5s ease-in-out',
      },
      keyframes: (theme) => ({
        fadeOut: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }),
    },
  },
}
