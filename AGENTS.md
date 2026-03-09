# Repository Agent Rules

## 1) Рабочий процесс "1 сессия = 1 PR" (обязательный)

Любая задача выполняется в одной сессии и оформляется как один PR.
Не смешивать разные темы, рефакторинги и апдейты в одном PR.

### 1.1 Branch Naming (Agent-generated)

Агент генерирует имя ветки автоматически, если пользователь не задал имя явно.

Разрешенные префиксы веток:
- `feat/...` - new features
- `fix/...` - bug fixes
- `chore/...` - maintenance/tooling
- `refactor/...` - non-functional improvements
- `docs/...` - documentation only
- `test/...` - tests only

Правила:
- `kebab-case`
- коротко и по сути
- без пробелов
- не использовать `:` в имени ветки

Примеры:
- `fix/modal-scroll-lock`
- `feat/calculator-validation`
- `chore/update-eslint-config`

### 1.2 Commits (Conventional Commits)

Использовать Conventional Commits:
- `feat: ...`
- `fix: ...`
- `chore: ...`
- `refactor: ...`
- `docs: ...`
- `test: ...`

Требования к `subject`:
- до 72 символов
- повелительное наклонение
- `body` опционален и добавляется, если причина изменений неочевидна

Коммиты должны быть небольшими и логичными. Избегать `wip` в финале и по возможности в процессе.

STRICT: No AI attribution footers.
Никогда не добавлять:
- `Co-Authored-By: Codex`
- `Generated with Codex`
- `Generated with...`
- любые аналогичные AI-attribution подписи в commit, PR, issues, docs и выводах

### 1.3 The only allowed change flow

Когда изменения готовы и пользователь явно попросил commit, push и PR:
1. Убедиться, что текущая ветка не `main`.
2. Создать новую ветку с agent-generated именем, если нужно.
3. Выполнить commit в эту ветку.
4. Выполнить push этой ветки.
5. Открыть PR.

Одна задача -> одна ветка -> один PR.

Запрещено пушить в `main` при любом сценарии работы агента.

### 1.4 PR Requirements (Mandatory)

PR-описание должно включать все секции:
- `Summary` - что изменено
- `Why` - мотивация и ожидаемое поведение
- `Changes` - ключевые файлы или модули и что сделано
- `How to test` - точные команды и или ручные шаги с ожидаемым результатом
- `Verification` - что из lint, typecheck, tests, build запущено; если не запускалось, почему
- `Screenshots / Video` - для UI-изменений
- `Risk & Rollback` - уровень риска и безопасный способ отката

Агент сначала показывает PR summary в чате, затем создает PR и после этого публикует ссылку на PR.

### 1.5 Merging

Агент никогда не мержит PR.
Решение о merge принимает только пользователь.
