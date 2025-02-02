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
      colors: {
        'brand-light':'#1261A0',
        'brand-odd':'#58CCED',
        'brand-base-color':'#072F5F',
        'brand-hue-color':'#3895D3',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
