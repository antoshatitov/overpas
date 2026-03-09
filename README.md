# Overpas

Сайт для компании «Оверпас» на `Next.js 15 + Payload CMS 3 + PostgreSQL`.

## Стек

- `Next.js 15.4`
- `React 19`
- `TypeScript`
- `Payload CMS 3`
- `PostgreSQL`
- `SCSS Modules`

## Локальный запуск

1. Установить зависимости:

```bash
npm install
```

2. Скопировать переменные окружения:

```bash
cp .env.example .env
```

3. Поднять PostgreSQL:

```bash
docker compose up -d postgres
```

4. Сгенерировать вспомогательные файлы Payload:

```bash
npm run generate:importmap
npm run generate:types
```

5. Запустить приложение:

```bash
npm run dev
```

Сайт будет доступен на `http://localhost:3000`, админка Payload на `http://localhost:3000/admin`.

## Основные маршруты

- `/`
- `/services`
- `/services/[slug]`
- `/cases`
- `/cases/[slug]`
- `/about`
- `/contacts`
- `/admin`

## Лиды

Публичная форма отправляет данные в `POST /api/leads`.

При настроенной базе:

- заявка сохраняется в коллекцию `lead-requests`
- отправляется уведомление в Telegram
- отправляется email-уведомление

Без `DATABASE_URI` маршрут не падает, но работает в режиме graceful fallback и пишет предупреждение в лог.

## Docker Compose

Для production/VPS предусмотрены:

- `Dockerfile`
- `docker-compose.yml`

Они рассчитаны на self-hosted развертывание приложения и PostgreSQL.
