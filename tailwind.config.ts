import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        amber: {
          DEFAULT: '#D97706',
          light: '#FFB77D',
          dark: '#904D00',
          container: '#432100',
        },
        steel: {
          darkest: '#0E0E0E',
          dark: '#131313',
          mid: '#1C1B1B',
          surface: '#20201F',
          high: '#2A2A2A',
          highest: '#353535',
          bright: '#393939',
          blue: '#1E3A5F',
          'blue-container': '#2F4A70',
        },
        concrete: '#F5F0E8',
        'warm-gray': '#E5E2E1',
        'muted-gold': '#CAC6BE',
        rust: '#C2410C',
        'success-green': '#15803D',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Inter', 'monospace'],
      },
      backgroundImage: {
        'amber-gradient': 'linear-gradient(135deg, #FFB77D 0%, #D97706 100%)',
        'steel-gradient': 'linear-gradient(180deg, #1E3A5F 0%, #131313 100%)',
        'hero-gradient': 'linear-gradient(to bottom, rgba(19,19,19,0.3) 0%, rgba(19,19,19,0.85) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        slideInRight: { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(0)' } },
      },
      boxShadow: {
        'ambient': '0 20px 40px rgba(229, 226, 225, 0.06)',
        'amber-glow': '0 0 20px rgba(217, 119, 6, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
