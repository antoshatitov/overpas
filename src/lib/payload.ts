import { getPayload } from 'payload'

import configPromise from '../../payload.config'

export function isPayloadConfigured() {
  return Boolean(process.env.DATABASE_URI)
}

export async function getPayloadClient() {
  return getPayload({
    config: configPromise,
  })
}
