import type { CollectionConfig } from 'payload'

import { isAdmin, publicRead } from '../lib/access.ts'

export const FAQ: CollectionConfig = {
  slug: 'faq',
  admin: {
    useAsTitle: 'question',
  },
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: publicRead,
    update: isAdmin,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
    },
    {
      name: 'audience',
      type: 'select',
      required: true,
      defaultValue: 'both',
      options: [
        { label: 'Частные клиенты', value: 'private' },
        { label: 'Коммерческие объекты', value: 'business' },
        { label: 'Обе аудитории', value: 'both' },
      ],
    },
  ],
}
