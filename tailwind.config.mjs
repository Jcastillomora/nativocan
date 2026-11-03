/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F89A3E',
          light: '#FDB670',
          dark: '#E6881A',
        },
        secondary: {
          DEFAULT: '#3E5C9A',
          light: '#5A7AB8',
          dark: '#2A4176',
        },
        accent: {
          DEFAULT: '#3DB57A',
          light: '#5FC792',
          dark: '#2A9462',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
