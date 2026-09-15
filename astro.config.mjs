// @ts-check
import { defineConfig } from 'astro/config';

const siteUrl = (process.env.PUBLIC_SITE_URL || 'http://localhost:4321').replace(/\/$/, '');

export default defineConfig({
  site: siteUrl,
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  redirects: {
    '/captura': '/',
  },
});
