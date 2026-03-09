import { NextResponse } from 'next/server'

import { notifyEmail, notifyTelegram } from '@/lib/lead-notifications'
import { leadSchema } from '@/lib/lead-schema'
import { getPayloadClient, isPayloadConfigured } from '@/lib/payload'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = leadSchema.parse(body)

    if (!isPayloadConfigured()) {
      console.warn('Lead captured without database connection', data)
    } else {
      const payload = await getPayloadClient()

      await payload.create({
        collection: 'lead-requests',
        data,
      })
    }

    await Promise.allSettled([notifyTelegram(data), notifyEmail(data)])

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        ok: false,
        error: 'Проверьте поля формы и попробуйте снова.',
      },
      {
        status: 400,
      },
    )
  }
}
