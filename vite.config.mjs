import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    cloudflare(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Send Your Files",
        short_name: "SendYourFiles",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#0b1f2a",
        icons: [
          {
            src: "./src/assets/SendYourFiles.png",
            sizes: "256x256",
            type: "image/png"
          }
        ]
      }
    })
  ],
  server: { port: 34537 }
});
