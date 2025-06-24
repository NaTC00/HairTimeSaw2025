import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      server: {
        open: true,
      },
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "HairTime",
        short_name: "HairTime",
        description: "App per la gestione di appuntamenti nel salone",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#C7B299",
        icons: [
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        globDirectory: "dist",
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg,JPG,webp}"],
        navigateFallback: "index.html",
        importScripts: ["custom-sw.js"],
        runtimeCaching: [
          {
            urlPattern: /^https?:\/\/localhost:3000\/services\/?$/,
            handler: "CacheFirst",
            options: {
              cacheName: "services-cache",
              expiration: {
                maxEntries: 1,
                maxAgeSeconds: 60 * 60 * 24 * 90,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^http:\/\/localhost:3000\/reviews\/?$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "reviews-cache",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60,
              },
              networkTimeoutSeconds: 3,
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
