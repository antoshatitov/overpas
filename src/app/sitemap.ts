import type { MetadataRoute } from 'next'

import { getCases, getServices } from '@/lib/content'
import { absoluteUrl } from '@/lib/utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, cases] = await Promise.all([getServices(), getCases()])

  return [
    '/',
    '/services',
    '/cases',
    '/about',
    '/contacts',
    ...services.map((service) => `/services/${service.slug}`),
    ...cases.map((item) => `/cases/${item.slug}`),
  ].map((pathname) => ({
    url: absoluteUrl(pathname),
  }))
}
