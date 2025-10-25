import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00AEEF',
          light: '#5BD8FF',
          dark: '#00AEEF'
        },
        accent: {
          orange: '#F5821F',
          green: '#00B894',
          red: '#FF3B30'
        },
        button: {
          DEFAULT: '#F5821F',
          hover: '#d96c12'
        },
        slate: {
          950: '#0F172A'
        }
      },
      fontFamily: {
        heading: ['"KG Life is Messy"', 'sans-serif'],
        button: ['Poppins', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 12px 30px rgba(0, 174, 239, 0.18)'
      }
    }
  },
  plugins: []
};

export default config;
