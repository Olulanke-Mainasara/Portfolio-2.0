// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";
import pwa from "./src/integrations/pwa.mjs";

export default defineConfig({
  site: "https://mainasaraolulanke.com",
  integrations: [react(), icon(), pwa()],
  vite: {
    plugins: [tailwindcss()],
  },
});
