/**
 * Квалификации Tetiana Abadzhi. Картинки — в public/media/certificates/.
 * Данные взяты с самих сертификатов (iTEC / VTCT / IMTA).
 */

export interface Certificate {
  title: { en: string; uk: string };
  issuer: string; // оставляем как на дипломе (не переводим)
  image: string;
}

/** Членство в проф. ассоциации — выносим отдельным «бейджем». */
export const membership = {
  org: "Irish Massage Therapists Association (IMTA)",
  status: { en: "Full Member", uk: "Повноправний член" },
  number: "2972",
  image: "/media/certificates/imta-membership.jpg",
};

export const certificates: Certificate[] = [
  {
    title: { en: "Level 3 Diploma in Holistic Massage", uk: "Диплом Level 3 з холістичного масажу" },
    issuer: "iTEC",
    image: "/media/certificates/holistic-massage.jpg",
  },
  {
    title: { en: "Level 3 Diploma in Aromatherapy Treatments", uk: "Диплом Level 3 з ароматерапії" },
    issuer: "VTCT (ITEC)",
    image: "/media/certificates/aromatherapy.jpg",
  },
  {
    title: { en: "Level 3 Diploma in Reflexology Treatments", uk: "Диплом Level 3 з рефлексотерапії" },
    issuer: "iTEC",
    image: "/media/certificates/reflexology.jpg",
  },
  {
    title: { en: "Level 3 Certificate in Stone Therapy Massage", uk: "Сертифікат Level 3 зі стоунтерапії" },
    issuer: "VTCT (ITEC)",
    image: "/media/certificates/stone-therapy.jpg",
  },
  {
    title: { en: "Level 3 Diploma in Indian Head Massage", uk: "Диплом Level 3 з індійського масажу голови" },
    issuer: "iTEC",
    image: "/media/certificates/indian-head.jpg",
  },
  {
    title: { en: "Level 3 Diploma in Sports Massage", uk: "Диплом Level 3 зі спортивного масажу" },
    issuer: "iTEC",
    image: "/media/certificates/sports-massage.jpg",
  },
  {
    title: { en: "Level 2 Certificate in Facial Skincare", uk: "Сертифікат Level 2 з догляду за обличчям" },
    issuer: "VTCT (ITEC)",
    image: "/media/certificates/facial-skincare.jpg",
  },
  {
    title: { en: "Level 3 Diploma in Yoga Teaching", uk: "Диплом Level 3 з викладання йоги" },
    issuer: "VTCT Skills (ITEC)",
    image: "/media/certificates/yoga-teaching.jpg",
  },
];
