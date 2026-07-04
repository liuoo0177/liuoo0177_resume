/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ---------- 色彩体系 ----------
      colors: {
        moss: {
          50:  '#f4f7f2',
          100: '#e6efe1',
          200: '#c8dcc0',
          300: '#a3c496',
          400: '#7eaa6e',
          500: '#5f8f4e',
          600: '#4a723c',
          700: '#3c5b31',
          800: '#324a2a',
          900: '#2b3d24',
          950: '#142014',
        },
        cream: {
          50:  '#fdfcf9',
          100: '#faf7f0',
          200: '#f5eedb',
          300: '#ede0bc',
          400: '#e3cd97',
          500: '#d9b976',
          600: '#c9a256',
          700: '#a88545',
          800: '#886b3c',
          900: '#6f5934',
        },
      },

      // ---------- 毛玻璃阴影 ----------
      boxShadow: {
        'glass-xs':  '0 2px 8px 0 rgba(20, 40, 20, 0.03)',
        'glass-sm':  '0 4px 16px 0 rgba(20, 40, 20, 0.04)',
        'glass':     '0 8px 32px 0 rgba(20, 40, 20, 0.06)',
        'glass-lg':  '0 16px 48px 0 rgba(20, 40, 20, 0.08)',
        'glass-xl':  '0 24px 64px 0 rgba(20, 40, 20, 0.10)',
      },

      // ---------- 自定义圆角 ----------
      borderRadius: {
        'glass': '1.25rem',
        'glass-lg': '1.75rem',
      },

      // ---------- 字体 ----------
      fontFamily: {
        serif: ['"Instrument Serif"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:  ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', '-apple-system', 'PingFang SC', 'sans-serif'],
        body:  ['"Inter"', '"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'PingFang SC', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
