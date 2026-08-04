# software.kunev.dev

Учебен сайт за паралелка **„Разработка на софтуер“** (професия код 061303, направление 0613) — материали по специалните предмети, подредени по класове, раздели, теми и седмици според официалната учебна програма.

**Продукция:** [software.kunev.dev](https://software.kunev.dev) (Vercel, deploy при push към `main`)

## Стек

- [Next.js](https://nextjs.org/) (App Router, статичен рендер)
- [Tailwind CSS 4](https://tailwindcss.com/) — cyber teal dark тема (токени в `src/app/globals.css`)
- TypeScript, без база данни и без auth — цялото съдържание е публично и статично

## Структура на съдържанието

Учебната програма се пази като структурирани TypeScript данни, не в JSX:

```
src/data/types.ts        # модел: клас → предмет → раздел → тема → седмици (теория/практика)
src/data/curriculum.ts   # съдържанието: VIII клас · „Дигитални технологии“ (Раздели I–II, Теми 1–6)
src/lib/curriculum.ts    # достъп и помощни функции (getSubject, formatWeeks, toRoman…)
```

### Добавяне на нов клас/предмет

1. Добавете обект в `curriculum.grades` (или запълнете `subjects` на съществуващ клас с `available: true`) в `src/data/curriculum.ts`.
2. Няма нужда от промени по страниците — маршрутът `/<клас>/<предмет>` (напр. `/8/digitalni-tehnologii`), началната страница, навигацията и sitemap-ът се генерират от данните.

## Разработка

```bash
npm install
npm run build   # проверка (remote-only workflow — без локален dev сървър)
```
