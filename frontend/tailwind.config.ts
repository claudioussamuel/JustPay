import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        bowlby: 'var(--font-bowlby)',
        dmMono: 'var(--font-dmMono)',
        playWright: 'var(--font-playWright)',
      },
      animation: {
        'spin-slow': 'spin 7s linear infinite',
        flash: 'flash 2.5s infinite',
        'loop-scroll': 'loop-scroll 80s linear infinite',
      },
      keyframes: {
        'loop-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },

      },
      colors: {
        'brand-light':'#1261A0',
        'brand-beige':'#BBAA89',
        'brand-odd':'#58CCED',
        'brand-base-color':'#072F5F',
        'brand-hue-color':'#3895D3',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
