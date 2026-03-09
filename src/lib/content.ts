import {
  casesSeed,
  credentialsSeed,
  faqSeed,
  servicesSeed,
  siteSettingsSeed,
  testimonialsSeed,
  type CaseData,
  type CredentialData,
  type FAQData,
  type ServiceData,
  type SiteSettingsData,
  type TestimonialData,
} from '@/content/seed'
import { getPayloadClient, isPayloadConfigured } from '@/lib/payload'

async function safePayloadCall<T>(handler: () => Promise<T>, fallback: T): Promise<T> {
  if (!isPayloadConfigured()) {
    return fallback
  }

  try {
    return await handler()
  } catch (error) {
    console.error('Payload fallback triggered', error)
    return fallback
  }
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  return safePayloadCall(async () => {
    const payload = await getPayloadClient()
    const data = await payload.findGlobal({
      slug: 'site-settings',
      depth: 1,
    })

    return {
      ...siteSettingsSeed,
      ...data,
      coverage: Array.isArray(data.coverage)
        ? data.coverage.map((item) => item.name)
        : siteSettingsSeed.coverage,
      stats: Array.isArray(data.stats)
        ? data.stats.map((item) => ({
            value: item.value,
            label: item.label,
            detail: item.detail,
          }))
        : siteSettingsSeed.stats,
    }
  }, siteSettingsSeed)
}

export async function getServices(): Promise<ServiceData[]> {
  return safePayloadCall(async () => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'services',
      depth: 1,
      limit: 100,
      sort: 'title',
    })

    const docs = result.docs as Array<Record<string, unknown>>

    return docs.map((service) => ({
      title: String(service.title || ''),
      slug: String(service.slug || ''),
      audience: (service.audience as ServiceData['audience']) || 'both',
      teaser: String(service.teaser || ''),
      intro: String(service.intro || ''),
      metricValue: String(service.metricValue || ''),
      metricLabel: String(service.metricLabel || ''),
      bullets: Array.isArray(service.bullets)
        ? service.bullets.map((item) => String((item as { item?: string }).item || ''))
        : [],
      deliverables: Array.isArray(service.deliverables)
        ? service.deliverables.map((item) => String((item as { item?: string }).item || ''))
        : [],
    }))
  }, servicesSeed)
}

export async function getServiceBySlug(slug: string): Promise<ServiceData | null> {
  const services = await getServices()
  return services.find((service) => service.slug === slug) || null
}

export async function getCases(): Promise<CaseData[]> {
  return safePayloadCall(async () => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'cases',
      depth: 2,
      limit: 100,
      sort: '-year',
    })

    const docs = result.docs as Array<Record<string, unknown>>

    return docs.map((item) => ({
      title: String(item.title || ''),
      slug: String(item.slug || ''),
      audience: (item.audience as CaseData['audience']) || 'both',
      objectType: String(item.objectType || ''),
      location: String(item.location || ''),
      area: String(item.area || ''),
      duration: String(item.duration || ''),
      year: String(item.year || ''),
      summary: String(item.summary || ''),
      challenge: String(item.challenge || ''),
      solution: String(item.solution || ''),
      result: String(item.result || ''),
      serviceSlugs: Array.isArray(item.serviceSlugs)
        ? item.serviceSlugs.map((service) =>
            typeof service === 'string'
              ? service
              : String((service as { slug?: string }).slug || ''),
          )
        : [],
      metrics: Array.isArray(item.metrics)
        ? item.metrics.map((metric) => ({
            value: String((metric as { value?: string }).value || ''),
            label: String((metric as { label?: string }).label || ''),
          }))
        : [],
    }))
  }, casesSeed)
}

export async function getCaseBySlug(slug: string): Promise<CaseData | null> {
  const cases = await getCases()
  return cases.find((item) => item.slug === slug) || null
}

export async function getTestimonials(): Promise<TestimonialData[]> {
  return safePayloadCall(async () => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'testimonials',
      limit: 12,
      sort: '-createdAt',
    })

    const docs = result.docs as Array<Record<string, unknown>>

    return docs.map((item) => ({
      author: String(item.author || ''),
      role: String(item.role || ''),
      company: String(item.company || ''),
      audience: (item.audience as TestimonialData['audience']) || 'both',
      quote: String(item.quote || ''),
    }))
  }, testimonialsSeed)
}

export async function getFaq(): Promise<FAQData[]> {
  return safePayloadCall(async () => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'faq',
      limit: 100,
      sort: 'question',
    })

    const docs = result.docs as Array<Record<string, unknown>>

    return docs.map((item) => ({
      question: String(item.question || ''),
      answer: String(item.answer || ''),
      audience: (item.audience as FAQData['audience']) || 'both',
    }))
  }, faqSeed)
}

export async function getCredentials(): Promise<CredentialData[]> {
  return safePayloadCall(async () => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'team-or-certificates',
      limit: 24,
      sort: 'title',
    })

    const docs = result.docs as Array<Record<string, unknown>>

    return docs.map((item) => ({
      title: String(item.title || ''),
      subtitle: String(item.subtitle || ''),
      description: String(item.description || ''),
      kind: (item.kind as CredentialData['kind']) || 'certificate',
    }))
  }, credentialsSeed)
}
