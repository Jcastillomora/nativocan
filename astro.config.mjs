import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://nativocan.pages.dev',
  output: 'static',
  integrations: [tailwind()], // sitemap() temporarily disabled due to build error
  build: {
    inlineStylesheets: 'auto',
  }
});