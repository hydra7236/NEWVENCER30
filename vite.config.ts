import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "vencer-logo.png"],
      manifest: {
        name: "VENCER 2K26 — National Level Techno-Cultural Fest",
        short_name: "Vencer 2k26",
        description: "The flagship techno-cultural fest of AITM Belagavi.",
        theme_color: "#0d1117",
        background_color: "#0d1117",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        id: "/",
        icons: [
          {
            src: "vencer-logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "vencer-logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
