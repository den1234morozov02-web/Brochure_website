import { defineConfig, type Collection, type TinaField } from "tinacms";
import { setupUndoRedo } from "./undo-redo";

// Ветка, в которую Tina Cloud коммитит правки. Локально (tinacms dev) не используется.
const branch =
  process.env.TINA_BRANCH || process.env.CF_PAGES_BRANCH || process.env.HEAD || "main";

// --- Хелперы полей -----------------------------------------------------------

const text = (name: string, label: string, required = true): TinaField => ({
  type: "string",
  name,
  label,
  required,
});

const textarea = (name: string, label: string, required = true): TinaField => ({
  type: "string",
  name,
  label,
  required,
  ui: { component: "textarea" },
});

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const time = (name: string, label: string): TinaField => ({
  type: "string",
  name,
  label,
  description: "Формат 24 години, напр. 09:30",
  ui: {
    validate: (value?: string) =>
      value && !TIME.test(value) ? "Вкажіть час у форматі ГГ:ХХ, напр. 10:00" : undefined,
  },
});

const day = (name: string, label: string): TinaField => ({
  type: "object",
  name,
  label,
  fields: [
    { type: "boolean", name: "closed", label: "Вихідний" },
    time("open", "Відкриття"),
    time("close", "Закриття"),
  ],
});

/** Коллекция из одного JSON-файла: создавать/удалять документы нельзя, только править. */
const single = (
  name: string,
  label: string,
  fields: TinaField[]
): Collection => ({
  name,
  label,
  path: `content/${name}`,
  format: "json",
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => "/",
  },
  fields,
});

const SERVICE_ICONS = [
  ["footprints", "Стопи (рефлексологія)"],
  ["brain", "Голова"],
  ["hand", "Долоня"],
  ["hand-heart", "Долоня із серцем"],
  ["heart", "Серце"],
  ["heart-handshake", "Турбота"],
  ["users", "Двоє людей (пара)"],
  ["baby", "Малюк (вагітність)"],
  ["flower-2", "Квітка"],
  ["flower", "Квітка (проста)"],
  ["leaf", "Листок"],
  ["sprout", "Паросток"],
  ["gem", "Камінь-кристал"],
  ["stone", "Камінь"],
  ["sparkles", "Іскри"],
  ["droplets", "Краплі (олії)"],
  ["flame", "Полум'я (тепло)"],
  ["waves", "Хвилі"],
  ["wind", "Вітер (дихання)"],
  ["sun", "Сонце"],
  ["moon", "Місяць"],
  ["feather", "Перо"],
  ["smile", "Усмішка (обличчя)"],
  ["gift", "Подарунок"],
].map(([value, label]) => ({ value, label }));

// --- Конфиг ------------------------------------------------------------------

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID ?? null,
  token: process.env.TINA_TOKEN ?? null,

  // Кнопки «Крок назад / вперед» рядом с Reset/Save (см. tina/undo-redo.ts)
  cmsCallback: (cms) => {
    setupUndoRedo(cms);
    return cms;
  },

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  // Картинки кладём туда же, где лежат нынешние: public/media → "/media/..."
  media: {
    tina: {
      mediaRoot: "media",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      single("general", "Головний екран", [
        textarea("taglineEn", "Слоган (EN)"),
        textarea("taglineUk", "Слоган (UK)"),
      ]),

      single("about", "Про мене", [
        { type: "image", name: "photo", label: "Фото" },
        text("name", "Ім'я"),
        textarea("bodyEn", "Текст (EN)"),
        textarea("bodyUk", "Текст (UK)"),
      ]),

      single("qualifications", "Кваліфікація", [
        {
          type: "object",
          name: "membership",
          label: "Членство IMTA",
          fields: [
            text("org", "Організація"),
            text("statusEn", "Статус (EN)"),
            text("statusUk", "Статус (UK)"),
            text("number", "Номер"),
            text("validUntil", "Дійсний до"),
            { type: "image", name: "image", label: "Сертифікат", required: true },
          ],
        },
        {
          type: "object",
          name: "certificates",
          label: "Сертифікати",
          list: true,
          ui: {
            itemProps: (item: { titleUk?: string; titleEn?: string }) => ({
              label: item?.titleUk || item?.titleEn || "Новий сертифікат",
            }),
          },
          fields: [
            text("titleEn", "Назва (EN)"),
            text("titleUk", "Назва (UK)"),
            text("issuer", "Ким виданий (iTEC, VTCT…)"),
            { type: "image", name: "image", label: "Фото сертифіката", required: true },
          ],
        },
      ]),

      single("services", "Послуги", [
        {
          type: "object",
          name: "items",
          label: "Послуги",
          list: true,
          ui: {
            itemProps: (item: { nameUk?: string; nameEn?: string }) => ({
              label: item?.nameUk || item?.nameEn || "Нова послуга",
            }),
          },
          fields: [
            text("nameEn", "Назва (EN)"),
            text("nameUk", "Назва (UK)"),
            {
              type: "string",
              name: "icon",
              label: "Іконка",
              required: true,
              options: SERVICE_ICONS,
            },
            { type: "number", name: "duration", label: "Тривалість, хв", required: true },
            { type: "number", name: "price", label: "Ціна, €", required: true },
            text("priceNoteEn", "Примітка до ціни (EN), напр. «per couple»", false),
            text("priceNoteUk", "Примітка до ціни (UK), напр. «за пару»", false),
            textarea("descEn", "Опис (EN)"),
            textarea("descUk", "Опис (UK)"),
          ],
        },
      ]),

      single("rituals", "Ритуали", [
        {
          type: "object",
          name: "items",
          label: "Ритуали",
          list: true,
          ui: {
            itemProps: (item: { nameUk?: string; nameEn?: string }) => ({
              label: item?.nameUk || item?.nameEn || "Новий ритуал",
            }),
          },
          fields: [
            text("nameEn", "Назва (EN)"),
            text("nameUk", "Назва (UK)"),
            { type: "image", name: "image", label: "Картинка", required: true },
            { type: "number", name: "duration", label: "Тривалість, хв", required: true },
            { type: "number", name: "price", label: "Ціна, €", required: true },
            text("subtitleEn", "Підзаголовок (EN)", false),
            text("subtitleUk", "Підзаголовок (UK)", false),
            textarea("descEn", "Опис (EN)"),
            textarea("descUk", "Опис (UK)"),
            { type: "string", name: "includesEn", label: "Включає (EN)", list: true },
            { type: "string", name: "includesUk", label: "Включає (UK)", list: true },
          ],
        },
      ]),

      single("faq", "Питання (FAQ)", [
        {
          type: "object",
          name: "items",
          label: "Питання",
          list: true,
          ui: {
            itemProps: (item: { qUk?: string; qEn?: string }) => ({
              label: item?.qUk || item?.qEn || "Нове питання",
            }),
          },
          fields: [
            text("qEn", "Питання (EN)"),
            text("qUk", "Питання (UK)"),
            textarea("aEn", "Відповідь (EN)"),
            textarea("aUk", "Відповідь (UK)"),
            { type: "image", name: "image", label: "Картинка (необов'язково)" },
          ],
        },
      ]),

      single("contacts", "Контакти та години", [
        text("phone", "Телефон (також для WhatsApp), напр. +353 87 670 7356"),
        text("email", "Email (показується на сайті; заявки з форми йдуть окремо)"),
        text("instagram", "Instagram (лише нікнейм, без @)"),
        text("street", "Вулиця та будинок"),
        text("area", "Район, напр. Dublin 2"),
        text("eircode", "Eircode"),
        {
          type: "object",
          name: "hours",
          label: "Години роботи",
          fields: [
            day("mon", "Понеділок"),
            day("tue", "Вівторок"),
            day("wed", "Середа"),
            day("thu", "Четвер"),
            day("fri", "П'ятниця"),
            day("sat", "Субота"),
            day("sun", "Неділя"),
          ],
        },
      ]),
    ],
  },
});
