import type { CollectionConfig } from 'payload'

import { isAdmin } from '../lib/access.ts'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'roles', 'updatedAt'],
  },
  auth: true,
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: isAdmin,
    update: isAdmin,
  },
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['editor'],
      options: [
        {
          label: 'Администратор',
          value: 'admin',
        },
        {
          label: 'Редактор',
          value: 'editor',
        },
      ],
      required: true,
    },
    {
      name: 'fullName',
      type: 'text',
    },
  ],
}
