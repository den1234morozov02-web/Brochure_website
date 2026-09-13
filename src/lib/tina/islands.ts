/**
 * Редактируемые области для визуального редактора Tina.
 * Когда в админке меняют поле, Tina запрашивает /tina-island/<name> и
 * подменяет на странице только эту область свежим HTML.
 */
import type { IslandRegistry } from "@tinacms/astro/experimental";
import About from "../../components/About.astro";
import Rituals from "../../components/Rituals.astro";
import type { Locale } from "../../data/site";
import { getAbout, getRituals, type AboutData, type RitualsData } from "./data";

const localeOf = (params: URLSearchParams): Locale =>
  params.get("locale") === "uk" ? "uk" : "en";

export const islands = {
  about: {
    fetch: () => getAbout(),
    component: About,
    wrapper: { tag: "div" },
    propsFromData: (data, params) => ({
      locale: localeOf(params),
      data: (data as { data: { about: AboutData } }).data.about,
    }),
  },
  rituals: {
    fetch: () => getRituals(),
    component: Rituals,
    wrapper: { tag: "div" },
    propsFromData: (data, params) => ({
      locale: localeOf(params),
      data: (data as { data: { rituals: RitualsData } }).data.rituals,
    }),
  },
} satisfies IslandRegistry;
