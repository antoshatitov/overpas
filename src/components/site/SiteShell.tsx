import type { ReactNode } from 'react'

import type { SiteSettingsData } from '@/content/seed'

import { Footer } from './Footer'
import { Header } from './Header'

type SiteShellProps = {
  children: ReactNode
  settings: SiteSettingsData
}

export function SiteShell({ children, settings }: SiteShellProps) {
  return (
    <>
      <Header phone={settings.phone} />
      {children}
      <Footer settings={settings} />
    </>
  )
}
