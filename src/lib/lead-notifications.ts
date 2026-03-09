import nodemailer from 'nodemailer'

import type { LeadInput } from '@/lib/lead-schema'

function renderLeadText(lead: LeadInput) {
  return [
    `Новая заявка с сайта Overpas`,
    `Имя: ${lead.name}`,
    `Телефон: ${lead.phone}`,
    `Предпочтительный канал: ${lead.contactMethod}`,
    `Аудитория: ${lead.audienceType}`,
    `Услуга: ${lead.serviceSlug || 'не выбрана'}`,
    `Тип объекта: ${lead.objectType}`,
    `Площадь: ${lead.area ? `${lead.area} м2` : 'не указана'}`,
    `Страница: ${lead.sourcePage}`,
    `Комментарий: ${lead.comment || 'нет'}`,
  ].join('\n')
}

export async function notifyTelegram(lead: LeadInput) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return
  }

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: renderLeadText(lead),
    }),
  })
}

export async function notifyEmail(lead: LeadInput) {
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const to = process.env.LEADS_EMAIL_TO
  const from = process.env.LEADS_EMAIL_FROM || 'no-reply@overpas.ru'

  if (!host || !port || !user || !pass || !to) {
    return
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: {
      user,
      pass,
    },
  })

  await transporter.sendMail({
    to,
    from,
    subject: 'Новая заявка с сайта Overpas',
    text: renderLeadText(lead),
  })
}
