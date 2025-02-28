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
        primary: '#6676a3',
        secondary: '#00FFFF',
        dark: '#121212',
        light: '#f5f5f5',
        'gray-dark': '#1a1a1a',
        'gray-light': '#a3a3a3',
      },
      fontFamily: {
        'space': ['extenda 40 hecto'],
        'inter': ['extenda 40 hecto']
      }
    },
  },
  plugins: [],
};

export default config;