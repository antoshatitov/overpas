import type { CollectionConfig } from 'payload'

import { isAdmin } from '../lib/access.ts'

export const LeadRequests: CollectionConfig = {
  slug: 'lead-requests',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'audienceType', 'status', 'createdAt'],
  },
  access: {
    create: () => true,
    delete: isAdmin,
    read: isAdmin,
    update: isAdmin,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'contactMethod',
          type: 'select',
          required: true,
          options: [
            { label: 'Телефон', value: 'phone' },
            { label: 'Telegram', value: 'telegram' },
            { label: 'WhatsApp', value: 'whatsapp' },
          ],
        },
        {
          name: 'audienceType',
          type: 'select',
          required: true,
          options: [
            { label: 'Частный клиент', value: 'private' },
            { label: 'Коммерческий объект', value: 'business' },
          ],
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'new',
          options: [
            { label: 'Новая', value: 'new' },
            { label: 'В работе', value: 'in-progress' },
            { label: 'Закрыта', value: 'closed' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'serviceSlug',
          type: 'text',
        },
        {
          name: 'objectType',
          type: 'text',
          required: true,
        },
        {
          name: 'area',
          type: 'number',
        },
      ],
    },
    {
      name: 'sourcePage',
      type: 'text',
      required: true,
    },
    {
      name: 'comment',
      type: 'textarea',
    },
  ],
}
