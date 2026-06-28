/**
 * Часто задаваемые вопросы (Q&A). Двуязычно EN/UK.
 * Тексты EN — от заказчицы; UK — перевод.
 */
import type { Locale } from "./site";

export interface FaqItem {
  q: Record<Locale, string>;
  a: Record<Locale, string>;
  image?: string;
}

export const faq: FaqItem[] = [
  {
    q: {
      en: "What makes your treatments unique?",
      uk: "Що робить ваші процедури особливими?",
    },
    a: {
      en: "My treatments combine reflexology, aromatherapy, Indian Head Massage, chakra balancing, Pinda Sweda, pranayama, meditation, and therapeutic essential oils. Every session is individually tailored to support your physical, emotional, and energetic wellbeing.",
      uk: "Мої процедури поєднують рефлексологію, ароматерапію, індійський масаж голови, балансування чакр, Pinda Sweda, пранаяму, медитацію та терапевтичні ефірні олії. Кожен сеанс підбирається індивідуально, щоб підтримати ваше фізичне, емоційне та енергетичне благополуччя.",
    },
  },
  {
    q: {
      en: "What can I expect during my first visit?",
      uk: "Чого очікувати під час першого візиту?",
    },
    a: {
      en: "We begin with a consultation to understand your needs and create a personalised treatment. Each session is unique and designed to help you relax, restore balance, and reconnect with yourself.",
      uk: "Ми починаємо з консультації, щоб зрозуміти ваші потреби та створити індивідуальну процедуру. Кожен сеанс унікальний і покликаний допомогти вам розслабитися, відновити рівновагу та повернутися до себе.",
    },
  },
  {
    q: {
      en: "What conditions can these treatments help with?",
      uk: "З якими станами можуть допомогти ці процедури?",
    },
    a: {
      en: "Clients often seek support for stress, anxiety, poor sleep, muscle tension, headaches, burnout, emotional overwhelm, and overall wellbeing.",
      uk: "Клієнти часто звертаються по підтримку при стресі, тривозі, поганому сні, м'язовому напруженні, головних болях, вигоранні, емоційному перевантаженні та для загального добробуту.",
    },
  },
  {
    q: {
      en: "Are these treatments a replacement for medical care?",
      uk: "Чи замінюють ці процедури медичну допомогу?",
    },
    a: {
      en: "No. These therapies complement conventional healthcare but do not replace medical advice, diagnosis, or treatment.",
      uk: "Ні. Ці терапії доповнюють традиційну медицину, але не замінюють медичних консультацій, діагностики чи лікування.",
    },
  },
  {
    q: {
      en: "What should I wear?",
      uk: "Що вдягнути на сеанс?",
    },
    a: {
      en: "Wear comfortable clothing. During body treatments, professional draping is always used to ensure your comfort and privacy.",
      uk: "Вдягніть зручний одяг. Під час тілесних процедур завжди використовується професійне накривання (draping) для вашого комфорту та приватності.",
    },
  },
  {
    q: {
      en: "How long is a treatment?",
      uk: "Скільки триває процедура?",
    },
    a: {
      en: "Appointments usually last between 45 and 90 minutes, depending on the treatment.",
      uk: "Сеанси зазвичай тривають від 45 до 90 хвилин залежно від процедури.",
    },
  },
  {
    q: {
      en: "Do I need to prepare before my appointment?",
      uk: "Чи потрібно готуватися перед сеансом?",
    },
    a: {
      en: "Simply arrive a few minutes early, wear comfortable clothing, and stay well hydrated before and after your treatment.",
      uk: "Просто приходьте на кілька хвилин раніше, вдягніть зручний одяг та пийте достатньо води до та після процедури.",
    },
  },
  {
    q: {
      en: "Can I book if I’m pregnant or have a medical condition?",
      uk: "Чи можна записатися під час вагітності або за наявності захворювання?",
    },
    a: {
      en: "Please contact me before booking. Some treatments may need to be adapted or may require medical approval.",
      uk: "Будь ласка, зв’яжіться зі мною перед записом. Деякі процедури можуть потребувати адаптації або медичного дозволу.",
    },
  },
  {
    q: {
      en: "Are you a registered therapist?",
      uk: "Чи є ви зареєстрованим терапевтом?",
    },
    a: {
      en: "Yes. I am a qualified member of the Irish Massage Therapists Association (IMTA) and fully insured to practise in Ireland.",
      uk: "Так. Я кваліфікований член Ірландської асоціації масажних терапевтів (IMTA) та маю повне страхування для практики в Ірландії.",
    },
  },
  {
    q: {
      en: "Can I claim through my health insurance?",
      uk: "Чи можу я отримати відшкодування через медичне страхування?",
    },
    a: {
      en: "Depending on your policy, treatments provided by an IMTA-registered therapist may be eligible for reimbursement. A receipt will be provided after your appointment for insurance purposes.",
      uk: "Залежно від вашого полісу, процедури, проведені терапевтом, зареєстрованим в IMTA, можуть підлягати відшкодуванню. Після сеансу ви отримаєте квитанцію для страхових цілей.",
    },
  },
  {
    q: {
      en: "What is your cancellation policy?",
      uk: "Які умови скасування запису?",
    },
    a: {
      en: "Please provide at least 24 hours’ notice if you need to cancel or reschedule your appointment.",
      uk: "Будь ласка, попереджайте щонайменше за 24 години, якщо вам потрібно скасувати або перенести сеанс.",
    },
  },
  {
    q: {
      en: "Do you offer gift vouchers?",
      uk: "Чи пропонуєте ви подарункові сертифікати?",
    },
    a: {
      en: "Yes. Gift vouchers are available for all treatments and make a thoughtful gift for any occasion.",
      uk: "Так. Подарункові сертифікати доступні для всіх процедур і стануть чудовим подарунком на будь-яку нагоду.",
    },
    image: "/media/gift-voucher.jpg",
  },
];
