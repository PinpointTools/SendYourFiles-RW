import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    cloudflare(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      manifest: {
        name: "Send Your Files",
        short_name: "SendYourFiles",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#0b1f2a",
        icons: [
          {
            src: "/icons/192/syf.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icons/512/syf.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ],
  server: { port: 34537 }
});
