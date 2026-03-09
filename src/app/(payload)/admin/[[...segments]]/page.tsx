import { RootPage } from '@payloadcms/next/views'

import configPromise from '../../../../../payload.config'

import { importMap } from '../importMap'

type PageProps = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export default function AdminPage({ params, searchParams }: PageProps) {
  return RootPage({
    config: configPromise,
    importMap,
    params,
    searchParams,
  })
}
