// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import tina from "@tinacms/astro/integration";
import { tinaAdminDevRedirect } from "@tinacms/astro/vite";

// Меняешь домен здесь после покупки — используется для sitemap и canonical/OG.
const SITE = "https://abadzhi.com";

export default defineConfig({
  site: SITE,
  i18n: {
    defaultLocale: "en",
    locales: ["en", "uk"],
    routing: {
      prefixDefaultLocale: false, // EN на "/", UK на "/uk/"
    },
  },
  // Страницы остаются статическими; адаптер нужен только для /tina-island/* (редактор Tina).
  output: "static",
  adapter: cloudflare(),
  integrations: [icon(), sitemap(), tina()],
  vite: {
    plugins: [tailwindcss(), tinaAdminDevRedirect()],
    ssr: { noExternal: ["@tinacms/astro", "@tinacms/bridge"] },
  },
});
