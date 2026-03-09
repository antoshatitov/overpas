import type { CollectionConfig } from 'payload'

import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { slugField } from '../fields/slug.ts'
import { isAdmin, publicRead } from '../lib/access.ts'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'audience', 'updatedAt'],
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
    slugField(),
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
    {
      name: 'teaser',
      type: 'text',
      required: true,
    },
    {
      name: 'intro',
      type: 'textarea',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'metricValue',
          type: 'text',
          required: true,
        },
        {
          name: 'metricLabel',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'bullets',
      type: 'array',
      required: true,
      minRows: 2,
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'deliverables',
      type: 'array',
      required: true,
      minRows: 2,
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'body',
      type: 'richText',
      editor: lexicalEditor(),
    },
  ],
}
