import type { Metadata } from 'next'

import { absoluteUrl } from '@/lib/utils'

type MetadataArgs = {
  title: string
  description: string
  pathname?: string
}

export function buildMetadata({
  title,
  description,
  pathname = '/',
}: MetadataArgs): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(pathname),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(pathname),
      type: 'website',
      locale: 'ru_RU',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
