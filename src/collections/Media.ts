import type { CollectionConfig } from 'payload'

import { isAdmin, publicRead } from '../lib/access.ts'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: publicRead,
    update: isAdmin,
  },
  upload: {
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 480,
        height: 320,
        fit: 'cover',
      },
      {
        name: 'card',
        width: 960,
        height: 720,
        fit: 'cover',
      },
    ],
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}
