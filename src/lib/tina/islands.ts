/**
 * Редактируемые области для визуального редактора Tina.
 * Когда в админке меняют поле, Tina запрашивает /tina-island/<name> и
 * подменяет на странице только эту область свежим HTML.
 */
import type { IslandRegistry } from "@tinacms/astro/experimental";
import Hero from "../../components/Hero.astro";
import About from "../../components/About.astro";
import Certificates from "../../components/Certificates.astro";
import Services from "../../components/Services.astro";
import Rituals from "../../components/Rituals.astro";
import Pricing from "../../components/Pricing.astro";
import Faq from "../../components/Faq.astro";
import Contact from "../../components/Contact.astro";
import Footer from "../../components/Footer.astro";
import type { Locale } from "../../data/site";
import {
  getAbout,
  getContacts,
  getFaq,
  getGeneral,
  getQualifications,
  getRituals,
  getServices,
  priceRows,
} from "./data";

const localeOf = (params: URLSearchParams): Locale =>
  params.get("locale") === "uk" ? "uk" : "en";

const wrapper = { tag: "div" };

type Res<K extends string, T> = { data: Record<K, T> };
const unwrap = <K extends string>(res: unknown, key: K) =>
  (res as Res<K, never>).data[key];

export const islands = {
  hero: {
    fetch: () => Promise.all([getGeneral(), getContacts()]),
    component: Hero,
    wrapper,
    propsFromData: (data, params) => {
      const [general, contacts] = data as unknown[];
      return {
        locale: localeOf(params),
        general: unwrap(general, "general"),
        contacts: unwrap(contacts, "contacts"),
      };
    },
  },
  about: {
    fetch: () => getAbout(),
    component: About,
    wrapper,
    propsFromData: (data, params) => ({ locale: localeOf(params), data: unwrap(data, "about") }),
  },
  qualifications: {
    fetch: () => getQualifications(),
    component: Certificates,
    wrapper,
    propsFromData: (data, params) => ({
      locale: localeOf(params),
      data: unwrap(data, "qualifications"),
    }),
  },
  services: {
    fetch: () => getServices(),
    component: Services,
    wrapper,
    propsFromData: (data, params) => ({ locale: localeOf(params), data: unwrap(data, "services") }),
  },
  rituals: {
    fetch: () => getRituals(),
    component: Rituals,
    wrapper,
    propsFromData: (data, params) => ({ locale: localeOf(params), data: unwrap(data, "rituals") }),
  },
  pricing: {
    fetch: () => Promise.all([getServices(), getRituals()]),
    component: Pricing,
    wrapper,
    propsFromData: (data, params) => {
      const [services, rituals] = data as unknown[];
      return {
        locale: localeOf(params),
        rows: priceRows(unwrap(services, "services"), unwrap(rituals, "rituals")),
      };
    },
  },
  faq: {
    fetch: () => getFaq(),
    component: Faq,
    wrapper,
    propsFromData: (data, params) => ({ locale: localeOf(params), data: unwrap(data, "faq") }),
  },
  contact: {
    fetch: () => Promise.all([getContacts(), getServices(), getRituals()]),
    component: Contact,
    wrapper,
    propsFromData: (data, params) => {
      const [contacts, services, rituals] = data as unknown[];
      return {
        locale: localeOf(params),
        contacts: unwrap(contacts, "contacts"),
        rows: priceRows(unwrap(services, "services"), unwrap(rituals, "rituals")),
      };
    },
  },
  footer: {
    fetch: () => getContacts(),
    component: Footer,
    wrapper,
    propsFromData: (data, params) => ({ locale: localeOf(params), contacts: unwrap(data, "contacts") }),
  },
} satisfies IslandRegistry;
