/**
 * Загрузка контента из Tina. requestWithMetadata помечает данные метаданными,
 * по которым tinaField() связывает элемент на странице с полем в редакторе.
 */
import { requestWithMetadata } from "@tinacms/astro/data";
import client from "../../../tina/__generated__/client";
import type { AboutQuery, RitualsQuery } from "../../../tina/__generated__/types";
import type { Ritual } from "../../data/services";

export type AboutData = AboutQuery["about"];
export type RitualsData = RitualsQuery["rituals"];
export type RitualItem = NonNullable<NonNullable<RitualsData["items"]>[number]>;

export const getAbout = () =>
  requestWithMetadata(client.queries.about({ relativePath: "about.json" }));

export const getRituals = () =>
  requestWithMetadata(client.queries.rituals({ relativePath: "rituals.json" }));

/** Непустые ритуалы (в редакторе элемент списка может быть ещё не заполнен). */
export const ritualItems = (data: RitualsData | undefined): RitualItem[] =>
  (data?.items ?? []).filter((r): r is RitualItem => r != null);

/** Приводит ритуалы из Tina к форме, которую ждут прайс, форма записи и JSON-LD. */
export const toRituals = (data: RitualsData | undefined): Ritual[] =>
  ritualItems(data).map((r, i) => ({
    id: `ritual-${i}`,
    image: r.image,
    duration: r.duration,
    price: r.price,
    name: { en: r.nameEn, uk: r.nameUk },
    subtitle: { en: r.subtitleEn ?? "", uk: r.subtitleUk ?? "" },
    desc: { en: r.descEn, uk: r.descUk },
    includes: {
      en: (r.includesEn ?? []).filter((s): s is string => !!s),
      uk: (r.includesUk ?? []).filter((s): s is string => !!s),
    },
  }));
