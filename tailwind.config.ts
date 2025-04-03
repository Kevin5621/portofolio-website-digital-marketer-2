import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'text-green-500',
    'bg-green-500',
    'border-green-500',
    'text-blue-500',
    'bg-blue-500',
    'border-blue-500',
    'text-red-500',
    'bg-red-500',
    'border-red-500',
    'text-amber-500',
    'bg-amber-500',
    'border-amber-500',
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
        'sans': ['Poppins', 'sans-serif'],
        'serif': ['Poppins', 'sans-serif'],
        'mono': ['Poppins', 'sans-serif'],
        'space': ['Poppins', 'sans-serif'],
        'inter': ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
};

export default config;