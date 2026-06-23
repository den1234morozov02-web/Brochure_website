// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

// Меняешь домен здесь после покупки — используется для sitemap и canonical/OG.
const SITE = "https://abadzhi.ie";

export default defineConfig({
  site: SITE,
  i18n: {
    defaultLocale: "en",
    locales: ["en", "uk"],
    routing: {
      prefixDefaultLocale: false, // EN на "/", UK на "/uk/"
    },
  },
  integrations: [icon(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
