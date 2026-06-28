/**
 * UI-строки интерфейса (кнопки, заголовки секций, подписи форм).
 * Контент услуг/отзывов живёт в src/data/*. Здесь — только обвязка.
 */
import type { Locale } from "../data/site";

export const ui = {
  en: {
    "nav.about": "About",
    "nav.services": "Services",
    "nav.rituals": "Rituals",
    "nav.pricing": "Pricing",
    "nav.faq": "FAQ",
    "nav.qualifications": "Qualifications",
    "nav.contact": "Contact",
    "nav.book": "Book now",

    "hero.cta": "Book an appointment",
    "hero.whatsapp": "Message on WhatsApp",

    "about.title": "About",
    "about.body":
      "Based in the heart of Dublin 2, I create personalised wellness rituals for people who feel overwhelmed, disconnected, exhausted or constantly in “doing mode”. Each session combines breathwork, meditation, aromatherapy, reflexology and therapeutic touch to help restore balance, calm the nervous system and create space for deep rest.",

    "cert.title": "Qualifications & Certifications",
    "cert.subtitle":
      "Fully qualified and insured, with internationally recognised iTEC / VTCT diplomas.",
    "cert.member": "Status",
    "cert.validUntil": "Valid until",
    "cert.view": "View certificate",
    "cert.toggle": "View certificates",
    "cert.hide": "Hide certificates",

    "services.title": "Services & Experiences",
    "services.subtitle": "Body & wellness experiences, tailored to you.",
    "services.min": "min",
    "services.book": "Book",

    "rituals.title": "Signature Rituals",
    "rituals.subtitle": "Immersive holistic journeys, crafted to fully restore you.",
    "rituals.includes": "Includes",
    "rituals.book": "Book this ritual",

    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Everything you might want to know before your visit.",

    "pricing.title": "Price List",
    "pricing.note":
      "Every appointment includes a personal consultation, bespoke essential oil selection (where applicable) and complimentary organic herbal tea.",
    "pricing.service": "Treatment",
    "pricing.duration": "Duration",
    "pricing.price": "Price",

    "contact.title": "Book & Contact",
    "contact.subtitle": "Send a request or reach out directly — we'll get back to you shortly.",
    "contact.hours": "Opening hours",
    "contact.address": "Address",
    "contact.directions": "Get directions",
    "contact.call": "Call",
    "contact.email": "Email",
    "contact.whatsapp": "WhatsApp",

    "form.name": "Your name",
    "form.email": "Email",
    "form.phone": "Phone",
    "form.phoneHint": "Enter a valid phone number (7–20 digits, may include + ( ) -).",
    "form.service": "Service of interest",
    "form.servicePick": "Select a service…",
    "form.date": "Preferred date / time",
    "form.message": "Message",
    "form.send": "Send request",
    "form.sending": "Sending…",
    "form.success": "Thank you! Your message has been sent.",
    "form.error": "Something went wrong. Please try again or contact us directly.",
    "form.required": "Required",

    "footer.rights": "All rights reserved.",
    "footer.follow": "Follow us",
  },

  uk: {
    "nav.about": "Про нас",
    "nav.services": "Послуги",
    "nav.rituals": "Ритуали",
    "nav.pricing": "Ціни",
    "nav.faq": "Питання",
    "nav.qualifications": "Кваліфікація",
    "nav.contact": "Контакти",
    "nav.book": "Записатися",

    "hero.cta": "Записатися на сеанс",
    "hero.whatsapp": "Написати у WhatsApp",

    "about.title": "Про нас",
    "about.body":
      "У самому серці Дубліна (Dublin 2) я створюю індивідуальні велнес-ритуали для тих, хто почувається перевантаженим, виснаженим, втратив зв'язок із собою або постійно перебуває в режимі «треба все встигнути». Кожен сеанс поєднує дихальні практики, медитацію, ароматерапію, рефлексологію та терапевтичний дотик, щоб відновити рівновагу, заспокоїти нервову систему та створити простір для глибокого відпочинку.",

    "cert.title": "Кваліфікація та сертифікати",
    "cert.subtitle":
      "Повна кваліфікація та страхування, міжнародно визнані дипломи iTEC / VTCT.",
    "cert.member": "Статус",
    "cert.validUntil": "Дійсний до",
    "cert.view": "Переглянути сертифікат",
    "cert.toggle": "Переглянути сертифікати",
    "cert.hide": "Сховати сертифікати",

    "services.title": "Послуги та досвід",
    "services.subtitle": "Тілесні та велнес-практики, підібрані для вас.",
    "services.min": "хв",
    "services.book": "Записатись",

    "rituals.title": "Фірмові ритуали",
    "rituals.subtitle": "Занурювальні цілісні подорожі для повного відновлення.",
    "rituals.includes": "Включає",
    "rituals.book": "Записатись на ритуал",

    "faq.title": "Часті запитання",
    "faq.subtitle": "Усе, що варто знати перед візитом.",

    "pricing.title": "Прайс-лист",
    "pricing.note":
      "Кожен сеанс включає особисту консультацію, індивідуальний підбір ефірних олій (за потреби) та органічний трав'яний чай.",
    "pricing.service": "Процедура",
    "pricing.duration": "Тривалість",
    "pricing.price": "Ціна",

    "contact.title": "Запис і контакти",
    "contact.subtitle": "Надішліть заявку або зв'яжіться напряму — ми скоро відповімо.",
    "contact.hours": "Години роботи",
    "contact.address": "Адреса",
    "contact.directions": "Прокласти маршрут",
    "contact.call": "Подзвонити",
    "contact.email": "Ел. пошта",
    "contact.whatsapp": "WhatsApp",

    "form.name": "Ваше ім'я",
    "form.email": "Ел. пошта",
    "form.phone": "Телефон",
    "form.phoneHint": "Введіть коректний номер телефону (7–20 цифр, можна з + ( ) -).",
    "form.service": "Послуга, що цікавить",
    "form.servicePick": "Оберіть послугу…",
    "form.date": "Бажана дата / час",
    "form.message": "Повідомлення",
    "form.send": "Надіслати заявку",
    "form.sending": "Надсилання…",
    "form.success": "Дякуємо! Ваше повідомлення надіслано.",
    "form.error": "Щось пішло не так. Спробуйте ще раз або зв'яжіться напряму.",
    "form.required": "Обов'язкове поле",

    "footer.rights": "Усі права захищені.",
    "footer.follow": "Ми в соцмережах",
  },
} as const;

export type UIKey = keyof (typeof ui)["en"];

export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui.en[key] ?? key;
  };
}

/** Префикс пути для локали: en -> "", uk -> "/uk" */
export function localePath(locale: Locale, path = ""): string {
  const base = locale === "en" ? "" : `/${locale}`;
  return `${base}${path}`;
}
