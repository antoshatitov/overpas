import type { CollectionConfig } from 'payload'

import { isAdmin, publicRead } from '../lib/access.ts'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'company', 'audience'],
  },
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: publicRead,
    update: isAdmin,
  },
  fields: [
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'audience',
      type: 'select',
      required: true,
      options: [
        { label: 'Частные клиенты', value: 'private' },
        { label: 'Коммерческие объекты', value: 'business' },
        { label: 'Обе аудитории', value: 'both' },
      ],
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
  ],
}
