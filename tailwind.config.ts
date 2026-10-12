import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        heritage: {
          50: '#fdf8f4',
          100: '#f9eee5',
          200: '#f3dcce',
          300: '#eac2ac',
          400: '#de9e81',
          500: '#d07657',
          600: '#c05a3c',
          700: '#a0442e',
          800: '#83392a',
          900: '#6d3126',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        imperial: {
          red: '#b91c1c',
          deepred: '#7f1d1d',
          gold: '#d97706',
          yellow: '#facc15',
          jade: '#047857',
          darkjade: '#064e3b',
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        serif: ['var(--font-merriweather)', 'Georgia', 'serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.06), 0 2px 6px -2px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 10px 25px -3px rgba(185, 28, 28, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
};
export default config;
