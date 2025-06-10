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
        enabled: true, // abilita SW anche in dev preview
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
        globDirectory: "dist",
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg,JPG,webp}"],
        navigateFallback: "index.html",
        runtimeCaching: [
          {
            urlPattern: /^http:\/\/localhost:3000\/reviews\/?$/, // <-- esattamente l'URL che hai dato
            handler: "NetworkFirst",
            options: {
              cacheName: "reviews-cache",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60, // 1 ora
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
