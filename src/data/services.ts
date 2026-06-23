/**
 * Услуги и ритуалы. Тексты, названия и цены взяты с инфографики заказчицы
 * ("Experiences for Balance & Renewal", "Wellness Rituals" + три 2-часовых ритуала).
 * icon — имя иконки Lucide (https://lucide.dev).
 */

export interface Service {
  id: string;
  icon: string;
  duration: number; // минуты
  price: number; // евро
  priceNote?: { en: string; uk: string };
  name: { en: string; uk: string };
  desc: { en: string; uk: string };
}

export interface Ritual {
  id: string;
  image: string;
  duration: number;
  price: number;
  name: { en: string; uk: string };
  subtitle: { en: string; uk: string };
  desc: { en: string; uk: string };
  includes: { en: string[]; uk: string[] };
}

export const services: Service[] = [
  {
    id: "grounding",
    icon: "footprints",
    duration: 45,
    price: 55,
    name: { en: "Grounding Ritual", uk: "Ритуал заземлення" },
    desc: {
      en: "A restorative reflexology treatment designed to bring balance and stability to body and mind. Includes a personalised essential oil blend selected to support your individual needs.",
      uk: "Відновлювальна рефлексотерапія, що повертає рівновагу та стабільність тілу й розуму. Включає індивідуальну суміш ефірних олій, підібрану під ваші потреби.",
    },
  },
  {
    id: "indian-head",
    icon: "brain",
    duration: 45,
    price: 55,
    name: { en: "Indian Head Ritual", uk: "Індійський масаж голови" },
    desc: {
      en: "A deeply relaxing head, neck and shoulder treatment. Available as a dry treatment or enhanced with a bespoke aromatherapy oil blend.",
      uk: "Глибоко розслаблюючий масаж голови, шиї та плечей. Доступний як «сухий» або з індивідуальною ароматерапевтичною сумішшю олій.",
    },
  },
  {
    id: "aroma-renewal",
    icon: "flower-2",
    duration: 75,
    price: 95,
    name: { en: "Aroma Renewal Ritual", uk: "Ритуал ароматичного оновлення" },
    desc: {
      en: "A full-body aromatherapy experience featuring custom-blended essential oils for both body and scalp. Includes a soothing scalp massage to encourage deep relaxation and emotional wellbeing.",
      uk: "Ароматерапія для всього тіла з індивідуальною сумішшю ефірних олій для тіла та шкіри голови. Включає заспокійливий масаж голови для глибокого розслаблення та емоційного добробуту.",
    },
  },
  {
    id: "warm-stone",
    icon: "gem",
    duration: 75,
    price: 95,
    name: { en: "Warm Stone Ritual", uk: "Ритуал теплих каменів" },
    desc: {
      en: "A nurturing full-body treatment using warm stones to release tension and promote deep relaxation. Enhanced with personalised aromatherapy oils if desired.",
      uk: "Дбайлива процедура для всього тіла з теплими каменями, що знімає напругу та дарує глибоке розслаблення. За бажанням доповнюється індивідуальними ароматичними оліями.",
    },
  },
  {
    id: "chakra-balance",
    icon: "sparkles",
    duration: 75,
    price: 95,
    name: { en: "Chakra Balance Ritual", uk: "Ритуал балансу чакр" },
    desc: {
      en: "A holistic balancing experience combining warm herbal Pinda Sweda therapy, aromatic oils and scalp massage to restore harmony, flow and inner calm.",
      uk: "Цілісна практика балансу, що поєднує теплу трав'яну терапію Pinda Sweda, ароматичні олії та масаж голови, щоб відновити гармонію, потік енергії та внутрішній спокій.",
    },
  },
  {
    id: "nurturing",
    icon: "heart",
    duration: 75,
    price: 95,
    name: {
      en: "Nurturing Ritual for Expecting Mothers",
      uk: "Дбайливий ритуал для майбутніх мам",
    },
    desc: {
      en: "A gentle full-body pregnancy treatment designed to ease physical discomfort and encourage deep rest. Includes a relaxing scalp massage with warm oil.",
      uk: "М'яка процедура для всього тіла під час вагітності, що полегшує фізичний дискомфорт і дарує глибокий відпочинок. Включає розслаблюючий масаж голови з теплою олією.",
    },
  },
  {
    id: "couples",
    icon: "users",
    duration: 75,
    price: 150,
    priceNote: { en: "per couple", uk: "за пару" },
    name: { en: "Couples Harmony Ritual", uk: "Ритуал гармонії для пари" },
    desc: {
      en: "A shared wellness experience for two, featuring warm oil massage, personalised aromatherapy blends and optional hot stone therapy for deeper relaxation and connection.",
      uk: "Спільний велнес-досвід для двох: масаж теплою олією, індивідуальні ароматичні суміші та, за бажанням, терапія гарячими каменями для глибшого розслаблення та зв'язку.",
    },
  },
];

export const rituals: Ritual[] = [
  {
    id: "aromatherapy-journey",
    image: "/media/ritual-aromatherapy.jpg",
    duration: 120,
    price: 135,
    name: { en: "Aromatherapy Ritual", uk: "Ароматерапевтичний ритуал" },
    subtitle: {
      en: "Signature Experience · 2-Hour Journey",
      uk: "Фірмовий досвід · 2-годинна подорож",
    },
    desc: {
      en: "A complete aromatherapy journey designed to relax, restore and renew you — inside and out.",
      uk: "Повноцінна ароматерапевтична подорож, створена щоб розслабити, відновити й оновити вас — зсередини та ззовні.",
    },
    includes: {
      en: [
        "Arrival & consultation",
        "Full body aromatherapy massage (90 min)",
        "Facial cleansing & mask",
        "Indian head massage",
        "Warm peppermint foot boots",
        "Time to rest in silence",
      ],
      uk: [
        "Зустріч та консультація",
        "Ароматерапевтичний масаж усього тіла (90 хв)",
        "Очищення обличчя та маска",
        "Індійський масаж голови",
        "Теплі м'ятні чобітки для ніг",
        "Час відпочинку в тиші",
      ],
    },
  },
  {
    id: "inner-harmony",
    image: "/media/ritual-inner-harmony.jpg",
    duration: 120,
    price: 135,
    name: { en: "Inner Harmony Ritual", uk: "Ритуал внутрішньої гармонії" },
    subtitle: { en: "2-Hour Journey", uk: "2-годинна подорож" },
    desc: {
      en: "A grounding, chakra-focused journey to calm the nervous system and restore inner and energetic balance.",
      uk: "Заземлююча подорож із фокусом на чакрах, щоб заспокоїти нервову систему та відновити внутрішню й енергетичну рівновагу.",
    },
    includes: {
      en: [
        "Chakra balancing consultation",
        "Personalised essential oil blend",
        "Guided pranayama (breathwork)",
        "Chakra balancing meditation",
        "Pinda Sweda therapy",
        "Aromatherapy body & scalp ritual",
        "Restorative shavasana",
        "Herbal tea & quiet reflection",
      ],
      uk: [
        "Консультація з балансу чакр",
        "Індивідуальна суміш ефірних олій",
        "Кероване пранаяма-дихання",
        "Медитація балансу чакр",
        "Терапія Pinda Sweda",
        "Ароматерапія тіла та шкіри голови",
        "Відновлювальна шавасана",
        "Трав'яний чай і тиха рефлексія",
      ],
    },
  },
  {
    id: "wellness-ritual",
    image: "/media/ritual-wellness.jpg",
    duration: 120,
    price: 135,
    name: { en: "Wellness Ritual", uk: "Велнес-ритуал" },
    subtitle: { en: "2-Hour Journey", uk: "2-годинна подорож" },
    desc: {
      en: "A complete, unhurried ritual from a warm foot soak to your own take-home aromatherapy roller.",
      uk: "Повний, неквапливий ритуал — від теплої ванночки для ніг до вашого власного арома-ролера додому.",
    },
    includes: {
      en: [
        "Foot soak with rose petals",
        "Consultation & essential oil selection",
        "10 min pranayama (breathwork)",
        "Gentle shavasana (deep relaxation)",
        "Full body relaxation ritual",
        "Time to rest in silence",
        "Take-home aromatherapy roller",
      ],
      uk: [
        "Ванночка для ніг з пелюстками троянд",
        "Консультація та підбір ефірних олій",
        "10 хв пранаями (дихальні практики)",
        "М'яка шавасана (глибоке розслаблення)",
        "Ритуал розслаблення всього тіла",
        "Час відпочинку в тиші",
        "Ароматерапевтичний ролер додому",
      ],
    },
  },
];
