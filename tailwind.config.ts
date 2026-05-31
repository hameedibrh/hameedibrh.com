import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          pink: '#EA4080',
          red: '#EA4335',
          orange: '#F5A623',
          yellow: '#FBBC04',
          green: '#34A853',
          teal: '#0D9488',
          blue: '#4285F4',
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.7)',
          dark: 'rgba(20, 20, 35, 0.75)',
          border: 'rgba(255, 255, 255, 0.25)',
        },
        surface: {
          light: '#FFFBF7',
          dark: '#0F0A14',
        },
      },
      backdropBlur: {
        glass: '12px',
      },
      spacing: {
        '1x': '8px',
        '2x': '16px',
        '3x': '24px',
        '4x': '32px',
        '5x': '40px',
        '6x': '48px',
        '7x': '56px',
        '8x': '64px',
        '9x': '72px',
        '10x': '80px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        typing: {
          '0%': { width: '0' },
          '50%': { width: '100%' },
          '100%': { width: '0' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        'gradient-mesh': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        typing: 'typing 3.5s steps(40) infinite',
        blob: 'blob 7s infinite',
        'gradient-mesh': 'gradient-mesh 15s ease infinite',
      },
    },
  },
  plugins: [],
};

export default config;
