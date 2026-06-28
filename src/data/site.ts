/**
 * Единая точка правок контактов и реквизитов салона.
 * Пока стоят ПЛЕЙСХОЛДЕРЫ (помечены TODO) и тестовые контакты Дениса —
 * заменить на данные заказчицы перед запуском.
 */

export const site = {
  name: "Abadzhi Wellness Space",
  tagline: {
    en: "A holistic space to reset, restore and reconnect with yourself.",
    uk: "Простір цілісності, щоб відновитись і повернутись до себе.",
  },

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

  // --- Контакты ---
  phone: "+353876707356",
  phoneDisplay: "+353 87 670 7356",
  whatsapp: "353876707356", // для wa.me (без + и пробелов), привязан к этому же номеру
  email: "beautyspacedublin@gmail.com",

  // --- Web3Forms access key (получить на web3forms.com, бесплатно) ---
  // Письма уходят на email, привязанный к этому ключу.
  web3formsKey: "a737b0ef-04f6-4e24-861a-57e5045d8c04", // привязан к beautyspacedublin@gmail.com

  // --- Адрес (ирландский почтовый адрес не транслитерируем) ---
  address: {
    en: "7 Upper Pembroke Street, Dublin 2, D02 T681",
    uk: "7 Upper Pembroke Street, Dublin 2, D02 T681",
  },
  // Структурный адрес для Schema.org (PostalAddress)
  addressParts: {
    street: "7 Upper Pembroke Street",
    locality: "Dublin",
    region: "Co. Dublin",
    postalCode: "D02 T681",
    country: "IE",
  },
  // Координаты для гео-разметки. ПРИБЛИЗИТЕЛЬНЫЕ — уточни в Google Maps
  // (правый клик по точке салона → координаты) и впиши точные.
  geo: { lat: 53.3346, lng: -6.2519 },
  // Ценовой диапазон услуг (для rich-результатов)
  priceRange: "€55–€150",
  // встраиваемая карта Google (по адресу + eircode)
  mapEmbed:
    "https://www.google.com/maps?q=7%20Upper%20Pembroke%20Street%2C%20Dublin%202%2C%20D02%20T681&output=embed",
  mapLink:
    "https://maps.google.com/?q=7%20Upper%20Pembroke%20Street%2C%20Dublin%202%2C%20D02%20T681",

  // --- Часы работы ---
  hours: {
    en: [
      { days: "Mon – Fri", time: "9:00 – 19:00" },
      { days: "Saturday", time: "10:00 – 17:00" },
      { days: "Sunday", time: "Closed" },
    ],
    uk: [
      { days: "Пн – Пт", time: "9:00 – 19:00" },
      { days: "Субота", time: "10:00 – 17:00" },
      { days: "Неділя", time: "Вихідний" },
    ],
  },
  // Машиночитаемые часы для Schema.org (openingHoursSpecification)
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    { days: ["Saturday"], opens: "10:00", closes: "17:00" },
  ],

  // --- Соцсети ---
  instagram: "https://instagram.com/abadzhi.ie",
  instagramHandle: "@abadzhi.ie",
} as const;

export type Locale = "en" | "uk";
