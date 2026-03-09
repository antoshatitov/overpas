import type { ReactNode } from 'react'

import { SiteShell } from '@/components/site/SiteShell'
import { getSiteSettings } from '@/lib/content'

export default async function SiteLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const settings = await getSiteSettings()

  return <SiteShell settings={settings}>{children}</SiteShell>
}
