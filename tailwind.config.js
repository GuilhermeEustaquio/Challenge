/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0d9488',
        secondary: '#06b6d4',
        dark: '#0f172a',
        brand: {
          50:  '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
      },
      boxShadow: {
        'glow-teal': '0 0 20px 0 rgba(13,148,136,0.35)',
        'glow-sm':   '0 0 10px 0 rgba(13,148,136,0.20)',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 8px 0 rgba(13,148,136,0.25)' },
          '50%':       { boxShadow: '0 0 22px 4px rgba(13,148,136,0.50)' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
