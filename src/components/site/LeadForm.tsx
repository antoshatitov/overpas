'use client'

import { usePathname } from 'next/navigation'
import { useMemo, useState, useTransition } from 'react'

import styles from './LeadForm.module.scss'

type LeadFormProps = {
  title?: string
  description?: string
  defaultAudience?: 'private' | 'business'
  defaultServiceSlug?: string
}

export function LeadForm({
  title = 'Запрос на проект',
  description = 'Ответим по срокам, смете и ближайшему окну старта. Без навязчивого сценария и “просто оставьте номер”.',
  defaultAudience = 'private',
  defaultServiceSlug = '',
}: LeadFormProps) {
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({
    name: '',
    phone: '',
    contactMethod: 'phone',
    audienceType: defaultAudience,
    serviceSlug: defaultServiceSlug,
    objectType: defaultAudience === 'business' ? 'Офис / коммерческое помещение' : 'Квартира / дом',
    area: '',
    comment: '',
  })

  const submitLabel = useMemo(
    () => (isPending ? 'Отправляем...' : 'Отправить заявку'),
    [isPending],
  )

  function updateField(name: string, value: string) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('idle')
    setMessage('')

    startTransition(async () => {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          area: form.area ? Number(form.area) : undefined,
          sourcePage: pathname || '/',
        }),
      })

      const payload = await response.json().catch(() => null)

      if (!response.ok) {
        setStatus('error')
        setMessage(payload?.error || 'Не удалось отправить заявку. Попробуйте еще раз.')
        return
      }

      setStatus('success')
      setMessage('Заявка отправлена. Мы свяжемся с вами в ближайшее рабочее время.')
      setForm({
        name: '',
        phone: '',
        contactMethod: 'phone',
        audienceType: defaultAudience,
        serviceSlug: defaultServiceSlug,
        objectType:
          defaultAudience === 'business'
            ? 'Офис / коммерческое помещение'
            : 'Квартира / дом',
        area: '',
        comment: '',
      })
    })
  }

  return (
    <form className={styles.shell} onSubmit={handleSubmit} id="lead-form">
      <div className={styles.head}>
        <span className={styles.eyebrow}>Лид-форма</span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.gridTwo}>
        <label className={styles.field}>
          <span className={styles.label}>Имя</span>
          <input
            className={styles.input}
            name="name"
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            required
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Телефон</span>
          <input
            className={styles.input}
            name="phone"
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            placeholder="+7 (___) ___-__-__"
            required
          />
        </label>
      </div>

      <div className={styles.gridTwo}>
        <label className={styles.field}>
          <span className={styles.label}>Канал связи</span>
          <select
            className={styles.select}
            name="contactMethod"
            value={form.contactMethod}
            onChange={(event) => updateField('contactMethod', event.target.value)}
          >
            <option value="phone">Телефон</option>
            <option value="telegram">Telegram</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Тип клиента</span>
          <select
            className={styles.select}
            name="audienceType"
            value={form.audienceType}
            onChange={(event) => updateField('audienceType', event.target.value)}
          >
            <option value="private">Частный клиент</option>
            <option value="business">Коммерческий объект</option>
          </select>
        </label>
      </div>

      <div className={styles.gridTwo}>
        <label className={styles.field}>
          <span className={styles.label}>Услуга / фокус</span>
          <input
            className={styles.input}
            name="serviceSlug"
            value={form.serviceSlug}
            onChange={(event) => updateField('serviceSlug', event.target.value)}
            placeholder="Например: fit-out офиса"
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Тип объекта</span>
          <input
            className={styles.input}
            name="objectType"
            value={form.objectType}
            onChange={(event) => updateField('objectType', event.target.value)}
            required
          />
        </label>
      </div>

      <div className={styles.gridTwo}>
        <label className={styles.field}>
          <span className={styles.label}>Площадь, м2</span>
          <input
            className={styles.input}
            name="area"
            type="number"
            min="1"
            value={form.area}
            onChange={(event) => updateField('area', event.target.value)}
          />
        </label>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>Комментарий</span>
        <textarea
          className={styles.textarea}
          name="comment"
          value={form.comment}
          onChange={(event) => updateField('comment', event.target.value)}
          placeholder="Опишите объект, сроки или ограничения по запуску."
        />
      </label>

      <div className={styles.submitRow}>
        <button className={styles.submit} type="submit" disabled={isPending}>
          {submitLabel}
        </button>

        <div className={styles.hint}>
          Отправляя форму, вы даете согласие на обработку контактных данных для
          обратной связи по проекту.
          {status === 'success' && <div className={styles.success}>{message}</div>}
          {status === 'error' && <div className={styles.error}>{message}</div>}
        </div>
      </div>
    </form>
  )
}
