// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import pagefind from 'astro-pagefind';

// https://astro.build/config
export default defineConfig({
  site: 'https://huynhdu.info',

  i18n: {
    locales: ['vi', 'en'],
    defaultLocale: 'vi',
    routing: {
      prefixDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap(), mdx(), react(), pagefind()],
});
