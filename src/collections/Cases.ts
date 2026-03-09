import type { CollectionConfig } from 'payload'

import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { slugField } from '../fields/slug.ts'
import { isAdmin, publicRead } from '../lib/access.ts'

export const Cases: CollectionConfig = {
  slug: 'cases',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'objectType', 'year'],
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
      type: 'row',
      fields: [
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
          name: 'objectType',
          type: 'text',
          required: true,
        },
        {
          name: 'year',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'location',
          type: 'text',
          required: true,
        },
        {
          name: 'area',
          type: 'text',
          required: true,
        },
        {
          name: 'duration',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'challenge',
      type: 'textarea',
      required: true,
    },
    {
      name: 'solution',
      type: 'textarea',
      required: true,
    },
    {
      name: 'result',
      type: 'textarea',
      required: true,
    },
    {
      name: 'serviceSlugs',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
    },
    {
      name: 'metrics',
      type: 'array',
      minRows: 1,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'gallery',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'body',
      type: 'richText',
      editor: lexicalEditor(),
    },
  ],
}
