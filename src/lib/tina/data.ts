/**
 * Загрузка контента из Tina. requestWithMetadata помечает данные метаданными,
 * по которым tinaField() связывает элемент на странице с полем в редакторе.
 */
import { requestWithMetadata } from "@tinacms/astro/data";
import client from "../../../tina/__generated__/client";
import type {
  AboutQuery,
  ContactsQuery,
  FaqQuery,
  GeneralQuery,
  QualificationsQuery,
  RitualsQuery,
  ServicesQuery,
} from "../../../tina/__generated__/types";
import type { Locale } from "../../data/site";

export type GeneralData = GeneralQuery["general"];
export type AboutData = AboutQuery["about"];
export type QualificationsData = QualificationsQuery["qualifications"];
export type ServicesData = ServicesQuery["services"];
export type RitualsData = RitualsQuery["rituals"];
export type FaqData = FaqQuery["faq"];
export type ContactsData = ContactsQuery["contacts"];

export const getGeneral = () =>
  requestWithMetadata(client.queries.general({ relativePath: "general.json" }));
export const getAbout = () =>
  requestWithMetadata(client.queries.about({ relativePath: "about.json" }));
export const getQualifications = () =>
  requestWithMetadata(client.queries.qualifications({ relativePath: "qualifications.json" }));
export const getServices = () =>
  requestWithMetadata(client.queries.services({ relativePath: "services.json" }));
export const getRituals = () =>
  requestWithMetadata(client.queries.rituals({ relativePath: "rituals.json" }));
export const getFaq = () =>
  requestWithMetadata(client.queries.faq({ relativePath: "faq.json" }));
export const getContacts = () =>
  requestWithMetadata(client.queries.contacts({ relativePath: "contacts.json" }));

/**
 * Tina Cloud отдаёт картинки ссылками на свой CDN:
 *   https://assets.tina.io/<clientId>/__staging/<branch>/__file/<путь>
 * На опубликованном сайте берём тот же файл из нашего public/media: так сайт
 * не зависит от CDN Tina, а картинки проходят сжатие при сборке
 * (scripts/optimize-images.mjs). В редакторе (on-demand рендер) оставляем CDN —
 * только что загруженного фото в /media ещё нет до пересборки.
 * "media" — это mediaRoot из tina/config.ts.
 */
const TINA_MEDIA_URL = /^https?:\/\/assets\.[^/]*tina[^/]*\/[^/]+\/(?:__staging\/[^/]+\/)?(?:__file\/)?(.+)$/i;

export const mediaSrc = (src: string | null | undefined, prerendered: boolean) => {
  if (!src) return "";
  if (!prerendered) return src;
  const match = src.match(TINA_MEDIA_URL);
  return match ? `/media/${match[1]}` : src;
};

/** Непустые элементы списка (в редакторе новый элемент может быть ещё не создан). */
export const present = <T>(list: ReadonlyArray<T | null> | null | undefined): T[] =>
  (list ?? []).filter((x): x is T => x != null);

// --- Прайс: услуги + ритуалы одной таблицей ----------------------------------

export interface PriceRow {
  name: Record<Locale, string>;
  duration: number;
  price: number;
  note?: Record<Locale, string>;
}

export const priceRows = (services?: ServicesData, rituals?: RitualsData): PriceRow[] => [
  ...present(services?.items).map((s) => ({
    name: { en: s.nameEn, uk: s.nameUk },
    duration: s.duration,
    price: s.price,
    note: s.priceNoteEn || s.priceNoteUk ? { en: s.priceNoteEn ?? "", uk: s.priceNoteUk ?? "" } : undefined,
  })),
  ...present(rituals?.items).map((r) => ({
    name: { en: r.nameEn, uk: r.nameUk },
    duration: r.duration,
    price: r.price,
  })),
];

/** Диапазон цен для Schema.org, напр. "€55–€150". */
export const priceRange = (rows: PriceRow[]) => {
  const prices = rows.map((r) => r.price).filter((p) => Number.isFinite(p));
  return prices.length ? `€${Math.min(...prices)}–€${Math.max(...prices)}` : undefined;
};

// --- Контакты: всё производное считаем из того, что ввела заказчица ----------

const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
type DayKey = (typeof DAYS)[number];

const DAY_NAMES: Record<Locale, { short: string[]; full: string[] }> = {
  en: {
    short: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    full: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  },
  uk: {
    short: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
    full: ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота", "Неділя"],
  },
};
const SCHEMA_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface DaySchedule {
  closed: boolean;
  open: string;
  close: string;
}

const scheduleOf = (c: ContactsData | undefined, d: DayKey): DaySchedule => {
  const h = c?.hours?.[d];
  const open = h?.open ?? "";
  const close = h?.close ?? "";
  return { closed: !!h?.closed || !open || !close, open, close };
};

/** Группы дней с одинаковым расписанием: сначала рабочие, выходные в конце. */
const groupDays = (c: ContactsData | undefined) => {
  const groups = new Map<string, { schedule: DaySchedule; days: number[] }>();
  DAYS.forEach((d, i) => {
    const s = scheduleOf(c, d);
    const key = s.closed ? "closed" : `${s.open}-${s.close}`;
    if (!groups.has(key)) groups.set(key, { schedule: s, days: [] });
    groups.get(key)!.days.push(i);
  });
  return [...groups.values()].sort((a, b) => Number(a.schedule.closed) - Number(b.schedule.closed));
};

/** "Tue – Thu, Sun": подряд идущие дни схлопываются в диапазон. */
const formatDays = (days: number[], locale: Locale) => {
  const names = DAY_NAMES[locale];
  if (days.length === 1) return names.full[days[0]];
  const runs: number[][] = [];
  for (const d of days) {
    const last = runs.at(-1);
    if (last && d === last.at(-1)! + 1) last.push(d);
    else runs.push([d]);
  }
  return runs
    .map((r) =>
      r.length >= 3
        ? `${names.short[r[0]]} – ${names.short[r.at(-1)!]}`
        : r.map((d) => names.short[d]).join(", ")
    )
    .join(", ");
};

const formatTime = (t: string, locale: Locale) => {
  if (locale === "uk") return t;
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
};

export const hoursDisplay = (c: ContactsData | undefined, locale: Locale) =>
  groupDays(c).map(({ schedule, days }) => ({
    days: formatDays(days, locale),
    time: schedule.closed
      ? locale === "uk"
        ? "Вихідний"
        : "Closed"
      : `${formatTime(schedule.open, locale)} – ${formatTime(schedule.close, locale)}`,
  }));

export const openingHoursSchema = (c: ContactsData | undefined) =>
  groupDays(c)
    .filter((g) => !g.schedule.closed)
    .map(({ schedule, days }) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: days.map((d) => SCHEMA_DAYS[d]),
      opens: schedule.open,
      closes: schedule.close,
    }));

export const contactLinks = (c: ContactsData | undefined) => {
  const phone = c?.phone ?? "";
  const digits = phone.replace(/\D/g, "");
  const instagram = (c?.instagram ?? "")
    .trim()
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
    .replace(/^@/, "")
    .replace(/\/+$/, "");
  const address = [c?.street, c?.area, c?.eircode].filter(Boolean).join(", ");
  const q = encodeURIComponent(address);
  return {
    phoneDisplay: phone,
    tel: `+${digits}`,
    whatsapp: digits,
    email: c?.email ?? "",
    instagramHandle: instagram ? `@${instagram}` : "",
    instagramUrl: instagram ? `https://instagram.com/${instagram}` : "",
    address,
    mapEmbed: `https://www.google.com/maps?q=${q}&output=embed`,
    mapLink: `https://maps.google.com/?q=${q}`,
  };
};
