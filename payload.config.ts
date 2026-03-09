import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'

import { Cases } from './src/collections/Cases.ts'
import { FAQ } from './src/collections/FAQ.ts'
import { LeadRequests } from './src/collections/LeadRequests.ts'
import { Media } from './src/collections/Media.ts'
import { Services } from './src/collections/Services.ts'
import { TeamOrCertificates } from './src/collections/TeamOrCertificates.ts'
import { Testimonials } from './src/collections/Testimonials.ts'
import { Users } from './src/collections/Users.ts'
import { SiteSettings } from './src/globals/SiteSettings.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const storageEnabled = Boolean(
  process.env.S3_BUCKET &&
    process.env.S3_ACCESS_KEY_ID &&
    process.env.S3_SECRET_ACCESS_KEY &&
    process.env.S3_REGION,
)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET || 'overpas-local-secret',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, 'src'),
    },
  },
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URI || 'postgresql://postgres:postgres@127.0.0.1:5432/overpas',
    },
    push: false,
  }),
  collections: [
    Users,
    Media,
    Services,
    Cases,
    Testimonials,
    FAQ,
    TeamOrCertificates,
    LeadRequests,
  ],
  globals: [SiteSettings],
  plugins: [
    s3Storage({
      enabled: storageEnabled,
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || 'overpas-media',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
        region: process.env.S3_REGION || 'ru-central1',
      },
    }),
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
