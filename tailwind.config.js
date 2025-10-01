/**** Tailwind config aligned to Crosspay branding ****/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f0f0f',
        text: {
          primary: '#d1d1d1',
          secondary: '#6c6c6c',
        },
        purple: {
          accent: '#7b3aec',
          g1: '#d03fb1',
          g2: '#ac57da',
          g3: '#6340e7'
        }
      },
      borderRadius: {
        'xl2': '22px'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(123, 58, 236, 0.15)'
      },
      fontFamily: {
        dmsans: ['var(--font-dmsans)']
      }
    },
  },
  plugins: [],
};
