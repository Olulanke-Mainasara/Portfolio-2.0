// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import pwa from "./src/integrations/pwa.mjs";
import { blogPostDates } from "./src/lib/postDates.mjs";

const postDates = blogPostDates();

export default defineConfig({
  site: "https://mainasaraolulanke.com",
  integrations: [
    react(),
    icon(),
    sitemap({
      // /offline is a service-worker fallback that carries noindex; listing it
      // for crawlers would contradict that.
      filter: (page) => new URL(page).pathname !== "/offline/",
      // Only blog posts get a lastmod, and only from their real pubDate. A
      // build-time date on every page would just be noise search engines learn
      // to distrust.
      serialize: (item) => {
        const date = postDates.get(new URL(item.url).pathname);
        return date ? { ...item, lastmod: date.toISOString() } : item;
      },
    }),
    // Must stay last: the precache walk reads the finished contents of dist/.
    pwa(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
