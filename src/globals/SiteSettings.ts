import type { GlobalConfig } from 'payload'

import { isAdmin, publicRead } from '../lib/access.ts'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: publicRead,
    update: isAdmin,
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'city',
          type: 'text',
          required: true,
        },
        {
          name: 'region',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
        {
          name: 'secondaryPhone',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          required: true,
        },
      ],
    },
    {
      name: 'address',
      type: 'text',
      required: true,
    },
    {
      name: 'workingHours',
      type: 'text',
      required: true,
    },
    {
      name: 'heroEyebrow',
      type: 'text',
      required: true,
    },
    {
      name: 'heroTitle',
      type: 'textarea',
      required: true,
    },
    {
      name: 'heroBody',
      type: 'textarea',
      required: true,
    },
    {
      name: 'coverage',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      minRows: 2,
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
        {
          name: 'detail',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
