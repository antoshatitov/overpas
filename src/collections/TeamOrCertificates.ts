import type { CollectionConfig } from 'payload'

import { isAdmin, publicRead } from '../lib/access.ts'

export const TeamOrCertificates: CollectionConfig = {
  slug: 'team-or-certificates',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'kind'],
  },
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: publicRead,
    update: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'kind',
      type: 'select',
      required: true,
      options: [
        { label: 'Команда', value: 'team' },
        { label: 'Сертификат / гарантия', value: 'certificate' },
        { label: 'Партнер', value: 'partner' },
      ],
    },
  ],
}
