import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
const repoName = process.env.GITHUB_REPOSITORY?.split('/')?.[1] ?? '';
const isCI = process.env.GITHUB_ACTIONS === 'true';
const base = isCI && repoName ? `/${repoName}/` : '/';

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'vite.svg',
        'lego.png',
        'its-lights-out-and-away-we-go.mp3',
        'images/placeholder.svg',
      ],
      manifest: {
        name: 'Lego F1 Minifigure Scanner',
        short_name: 'F1 Scanner',
        description:
          'Scan Lego F1 Data Matrix codes to identify minifigures and cars.',
        theme_color: '#161616',
        background_color: '#161616',
        display: 'standalone',
        scope: '.',
        start_url: '.',
        icons: [
          {
            src: '/vite.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,mp3}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
});
