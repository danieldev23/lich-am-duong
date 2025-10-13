import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        // ngaydep.com inspired colors
        primary: {
          DEFAULT: '#2d7d46', // Green từ navbar ngaydep.com
          light: '#3a9957',
          dark: '#236336',
          50: '#f0f9f4',
          100: '#daf2e4',
          200: '#b5e5c9',
          300: '#85d3a6',
          400: '#55ba7f',
          500: '#2d7d46',
          600: '#236336',
          700: '#1d5029',
          800: '#163d21',
          900: '#0f2a16',
        },
        accent: {
          DEFAULT: '#e74c3c', // Soft red từ ngaydep.com
          light: '#ec7063',
          dark: '#c0392b',
          50: '#fef5f4',
          100: '#fce8e6',
          200: '#f9d5d1',
          300: '#f5b7b0',
          400: '#ef8579',
          500: '#e74c3c',
          600: '#c0392b',
          700: '#a12e23',
          800: '#852620',
          900: '#6f221f',
        },
        beige: {
          DEFAULT: '#faf8f3',
          50: '#fdfcf9',
          100: '#faf8f3',
          200: '#f5f0e6',
          300: '#ebe4d3',
          400: '#dcd2bb',
          500: '#cbbfa4',
          600: '#b8a88a',
          700: '#a08f72',
          800: '#83735d',
          900: '#6a5f4d',
        },
        highlight: '#2d7d46',
        danger: '#e74c3c',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
