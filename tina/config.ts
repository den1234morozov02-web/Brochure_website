import { defineConfig } from "tinacms";

// Ветка, в которую Tina Cloud коммитит правки. Локально (tinacms dev) не используется.
const branch =
  process.env.TINA_BRANCH || process.env.CF_PAGES_BRANCH || process.env.HEAD || "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID ?? null,
  token: process.env.TINA_TOKEN ?? null,

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
      {
        name: "about",
        label: "Про мене / About",
        path: "content/about",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => "/",
        },
        fields: [
          { type: "image", name: "photo", label: "Фото" },
          { type: "string", name: "name", label: "Ім'я", required: true },
          {
            type: "string",
            name: "bodyEn",
            label: "Текст (EN)",
            required: true,
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "bodyUk",
            label: "Текст (UK)",
            required: true,
            ui: { component: "textarea" },
          },
        ],
      },
      {
        name: "rituals",
        label: "Ритуали / Rituals",
        path: "content/rituals",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => "/",
        },
        fields: [
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
              { type: "string", name: "nameEn", label: "Назва (EN)", required: true },
              { type: "string", name: "nameUk", label: "Назва (UK)", required: true },
              { type: "image", name: "image", label: "Картинка", required: true },
              { type: "number", name: "duration", label: "Тривалість, хв", required: true },
              { type: "number", name: "price", label: "Ціна, €", required: true },
              { type: "string", name: "subtitleEn", label: "Підзаголовок (EN)" },
              { type: "string", name: "subtitleUk", label: "Підзаголовок (UK)" },
              {
                type: "string",
                name: "descEn",
                label: "Опис (EN)",
                required: true,
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "descUk",
                label: "Опис (UK)",
                required: true,
                ui: { component: "textarea" },
              },
              { type: "string", name: "includesEn", label: "Включає (EN)", list: true },
              { type: "string", name: "includesUk", label: "Включає (UK)", list: true },
            ],
          },
        ],
      },
    ],
  },
});
