# Pauch Website - Руководство для клиента

**English version:** см. `/Users/nicolaecretu24/Desktop/pouchwebsite_2/README.md`

Это инструкция для нетехнического пользователя. Контент можно менять прямо в GitHub через браузер.

## 1. Что это за сайт

- Статический мультиязычный сайт (EN, RO, RU)
- Каталог товаров + блог + юридические страницы
- Заказы уходят в Telegram через единую deep-link ссылку

## 2. Основные файлы для редактирования

- Товары: `/Users/nicolaecretu24/Desktop/pouchwebsite_2/src/content/products/*.json`
- Статьи блога: `/Users/nicolaecretu24/Desktop/pouchwebsite_2/src/content/blog/*.json`
- Категории блога: `/Users/nicolaecretu24/Desktop/pouchwebsite_2/src/content/hubs/*.json`
- Тексты интерфейса (меню, блоки главной, FAQ):
  - `/Users/nicolaecretu24/Desktop/pouchwebsite_2/src/i18n/en.json`
  - `/Users/nicolaecretu24/Desktop/pouchwebsite_2/src/i18n/ro.json`
  - `/Users/nicolaecretu24/Desktop/pouchwebsite_2/src/i18n/ru.json`
- Изображения товаров: `/Users/nicolaecretu24/Desktop/pouchwebsite_2/public/images/products/`
- Изображения блога: `/Users/nicolaecretu24/Desktop/pouchwebsite_2/public/images/blog/`
- Ссылка для заказа в Telegram: `/Users/nicolaecretu24/Desktop/pouchwebsite_2/src/i18n/index.ts` (`TELEGRAM_DEEP_LINK`)

## 3. Безопасный процесс публикации (через GitHub)

1. Откройте нужный файл в GitHub.
2. Нажмите `Edit this file` (иконка карандаша).
3. Внесите изменения.
4. Напишите понятное сообщение коммита.
5. Выберите `Commit directly to the main branch`.
6. Нажмите Commit.
7. Дождитесь деплоя.
8. Проверьте сайт.

Если нужно откатить изменение, сделайте `Revert` в истории коммитов.

## 4. Правила редактирования товаров

### 4.1 Что реально показывает каталог

В каталоге отображаются только JSON-файлы из `/src/content/products/`.

Если картинка лежит в `/public/images/products/`, но на нее нет ссылки из JSON, на сайте она не появится.

### 4.2 Обязательные поля товара

Ключевые поля в каждом JSON:

- `slug`: уникальный ключ URL
- `brand`: название бренда
- `strength`: числовой уровень (используется для сортировки)
- `strengthCategory`: только одно из значений:
  - `easy`
  - `medium`
  - `strong`
  - `hardcore`
- `flavorCategory`: только одно из значений:
  - `mint`
  - `citrus`
  - `berry`
  - `coffee`
  - `tropical`
- `pouchesPerCan`: число (обычно `20`)
- `image`: пример `"/images/products/velo_easy.png"`
- `translations.en`, `translations.ro`, `translations.ru` с полями `name` и `description`

В текущей логике сайта нет поля цены для товара. Цены добавлять не нужно.

### 4.3 Формат изображений товара

Рекомендуется использовать прозрачные `.png` изображения банок, потому что карточки стилизованы под такой тип изображений.

## 5. Правила редактирования блога

Каждый файл блога содержит сразу 3 языка.

Важные поля внутри переводов:

- `title`
- `slug`
- `metaTitle`
- `metaDescription`
- `excerpt`
- `content`
- опционально `faq`

Поля уровня статьи:

- `postId` (уникальный)
- `publishedAt` (`YYYY-MM-DD`)
- `hub` (`switching`, `strength`, `selection`, `safety`)
- `image` (пример `"/images/blog/your-image.png"`)

## 6. Редактирование текстов интерфейса

Меняйте только значения в:

- `/src/i18n/en.json`
- `/src/i18n/ro.json`
- `/src/i18n/ru.json`

Ключи JSON переименовывать нельзя.

## 7. Юридические страницы

- `/src/pages/en/terms.astro`, `/src/pages/en/privacy.astro`, `/src/pages/en/age-policy.astro`
- `/src/pages/ro/terms.astro`, `/src/pages/ro/privacy.astro`, `/src/pages/ro/age-policy.astro`
- `/src/pages/ru/terms.astro`, `/src/pages/ru/privacy.astro`, `/src/pages/ru/age-policy.astro`

## 8. Текущее поведение языка и редиректа

- Все локализованные страницы идут через `/en/`, `/ro/`, `/ru/`.
- Корень `/` использует кастомный редирект:
  - Если JS включен: выбор языка по языку браузера (`en`, `ro`, `ru`)
  - Если язык браузера не поддерживается: переход на `/ro/`
  - Если JS выключен: переход на `/ro/`

## 9. Текущее SEO поведение

- Canonical ставится для каждой страницы.
- `hreflang` генерируется для EN/RO/RU на каждой странице.
- `x-default` указывает на эквивалентную румынскую страницу, а не на главную.
- Корень `/` намеренно закрыт от индексации и canonical ведет на `/ro/`.
- Sitemap генерируется автоматически при сборке через Astro sitemap.

## 10. Деплой

В репозитории есть конфигурации для обеих платформ:

- GitHub Pages: `/Users/nicolaecretu24/Desktop/pouchwebsite_2/.github/workflows/deploy.yml`
- Netlify: `/Users/nicolaecretu24/Desktop/pouchwebsite_2/netlify.toml`

Используйте ту платформу, которая подключена в вашем аккаунте.

## 11. Чек-лист перед коммитом

1. Редактировали нужный файл?
2. Обновили все нужные языки (EN/RO/RU)?
3. JSON валиден (запятые, кавычки, скобки)?
4. Картинка загружена и путь совпадает?
5. Slug корректный?
6. Деплой прошел успешно?

## 12. Команды для разработчика (опционально)

```bash
npm install
npm run dev
npm run build
npm run preview
```
