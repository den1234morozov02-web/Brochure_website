/**
 * То, что НЕ редактируется в Tina (техническое и SEO).
 * Контакты, адрес, часы, слоган и весь контент — в content/*.json (правятся в /admin).
 */

export const site = {
  name: "Abadzhi Wellness Space",

  // --- SEO: уникальные title/description под локаль (гео + услуги) ---
  seo: {
    en: {
      title: "Holistic Massage & Aromatherapy in Dublin 2 | Abadzhi Wellness Space",
      description:
        "Aromatherapy, holistic massage, reflexology and facial rituals in Dublin 2. Personalised wellness treatments by Tetiana Abadzhi, IMTA-registered & fully insured therapist. Book your session today.",
    },
    uk: {
      title: "Холістичний масаж та ароматерапія в Дубліні | Abadzhi Wellness Space",
      description:
        "Ароматерапія, холістичний масаж, рефлексологія та ритуали для обличчя в Дубліні (Dublin 2). Індивідуальні велнес-процедури від Тетяни Абаджі — сертифікованого терапевта IMTA. Запишіться сьогодні.",
    },
  },

  // --- Web3Forms access key (получить на web3forms.com, бесплатно) ---
  // Письма уходят на email, привязанный к этому ключу.
  web3formsKey: "a737b0ef-04f6-4e24-861a-57e5045d8c04", // привязан к beautyspacedublin@gmail.com

  // Для Schema.org (PostalAddress): улица и Eircode берутся из Tina, это — постоянное.
  addressLocality: "Dublin",
  addressRegion: "Co. Dublin",
  addressCountry: "IE",

  // Координаты для гео-разметки. ПРИБЛИЗИТЕЛЬНЫЕ — уточни в Google Maps
  // (правый клик по точке салона → координаты) и впиши точные.
  // При переезде салона обновить вручную.
  geo: { lat: 53.3346, lng: -6.2519 },
} as const;

export type Locale = "en" | "uk";
