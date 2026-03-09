import type { Metadata } from 'next'

import '@fontsource-variable/golos-text'
import '@fontsource/ibm-plex-sans-condensed/700.css'

import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Оверпас',
    template: '%s | Оверпас',
  },
  description:
    'Оверпас выполняет ремонт жилых и коммерческих помещений в Калининграде и Калининградской области.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
