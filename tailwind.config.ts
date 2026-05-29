import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: '#07070f',
        panel: '#11111d',
        border: '#27293d',
        accent: '#6d72ff',
        muted: '#8c92c9',
      },
      boxShadow: {
        glow: '0 25px 60px rgba(109,114,255,0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
