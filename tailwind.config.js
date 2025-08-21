/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D63F8',
          dark: '#1E4ADA',
        },
        accent: {
          DEFAULT: '#10B981',
          dark: '#059669',
        },
        text: {
          DEFAULT: '#0F172A',
          light: '#475569',
        },
        background: {
          DEFAULT: '#FFFFFF',
          light: '#F8FAFC',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-patterns'),
  ],
};
