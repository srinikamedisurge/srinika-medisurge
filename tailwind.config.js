/** Same theme as the old inline `tailwind.config` that used to sit in builder/templates/layout.js. */
module.exports = {
  content: [
    './builder/**/*.js',
    './assets/js/**/*.js',
    './site.config.js'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e'
        },
        medical: {
          teal: '#0d9488',
          emerald: '#059669',
          mint: '#10b981',
          lightGreen: '#ecfdf5',
          navy: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['"Outfit"', 'sans-serif']
      }
    }
  },
  plugins: []
};
