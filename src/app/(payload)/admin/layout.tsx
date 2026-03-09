import type { ReactNode } from 'react'

import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'

import configPromise from '../../../../payload.config'

import { importMap } from './importMap'

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const serverFunction = (args: { args: Record<string, unknown>; name: string }) =>
    handleServerFunctions({
      ...args,
      config: configPromise,
      importMap,
    })

  return RootLayout({
    children,
    config: configPromise,
    importMap,
    serverFunction,
  })
}
