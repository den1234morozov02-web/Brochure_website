# Abadzhi Wellness Space — сайт-визитка

Двуязычный (EN / UK) одностраничный сайт салона: услуги, прайс, отзывы,
запись и контакты. Сделан на **Astro 5 + Tailwind 4**, статическая генерация.

## Запуск

```bash
npm install
npm run dev      # http://localhost:4321  (UK-версия: /uk/)
npm run build    # сборка в dist/
npm run preview  # локальный просмотр собранного
```

## Где что менять (без правки разметки)

| Что | Файл |
|-----|------|
| Контакты, адрес, часы, соцсети, ключ Web3Forms | `src/data/site.ts` |
| Услуги и ритуалы (тексты, цены, длительность) | `src/data/services.ts` |
| Тексты интерфейса (кнопки, заголовки) | `src/i18n/ui.ts` |
| Фото/логотип | `public/media/` |

## ⚠️ Перед запуском в прод заменить плейсхолдеры

Всё помечено `TODO` в `src/data/site.ts`:

1. **Web3Forms** — зарегистрироваться на https://web3forms.com (бесплатно),
   получить Access Key и вписать в `web3formsKey`. На привязанный к ключу email
   будут приходить заявки с формы записи. Сейчас стоит тестовый ключ Дениса.
2. **Телефон / WhatsApp** (`phone`, `phoneDisplay`, `whatsapp` — для wa.me без `+`).
3. **Email** заказчицы.
4. **Адрес** + ссылка на карту (`mapEmbed`, `mapLink`) — взять embed-код в
   Google Maps → «Поделиться» → «Встроить карту».
5. **Часы работы**, **Instagram**.
6. Текст «о себе» — в `src/i18n/ui.ts` (`about.body`, обе локали).
7. Фото мастера/салона — положить в `public/media/`, подставить в
   `src/components/About.astro` вместо плейсхолдера.

## Деплой (бесплатно)

Cloudflare Pages или Netlify, build-команда `npm run build`, каталог `dist`.
После покупки домена обновить `SITE` в `astro.config.mjs` (для sitemap/OG).
