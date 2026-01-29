import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cibaduyut Leather Color Palette
        'cibaduyut': {
          'brown': {
            50: '#FAF5F0',
            100: '#F5E6D3',
            200: '#E8D0B8',
            300: '#C4956A',
            400: '#A67C52',
            500: '#8B5A2B',
            600: '#704A23',
            700: '#5D3A1A',
            800: '#4A2E15',
            900: '#3D2314',
          },
          'gold': '#D4A574',
          'cream': '#FAF7F2',
          'warm-white': '#FFFDF9',
          'dark': '#1C1410',
        },
      },
      fontFamily: {
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.5s ease-out',
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
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      boxShadow: {
        'leather': '0 4px 20px -2px rgba(61, 35, 20, 0.15)',
        'leather-lg': '0 10px 40px -10px rgba(61, 35, 20, 0.25)',
        'leather-hover': '0 20px 60px -15px rgba(61, 35, 20, 0.3)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms"), require("daisyui")],
  daisyui: {
    themes: [
      {
        cibaduyut: {
          "primary": "#8B5A2B",
          "secondary": "#D4A574",
          "accent": "#C4956A",
          "neutral": "#3D2314",
          "base-100": "#FFFDF9",
          "info": "#5D3A1A",
          "success": "#4A7C59",
          "warning": "#D4A574",
          "error": "#A54A4A",
        },
      },
    ],
  },
};
export default config;
