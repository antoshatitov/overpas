import type { FieldHook, TextField } from 'payload'

import { slugify } from '../lib/utils.ts'

const buildSlug: FieldHook = ({ data, operation, value }) => {
  if (typeof value === 'string' && value.length > 0) {
    return slugify(value)
  }

  if (operation === 'create' || operation === 'update') {
    if (data && typeof data.title === 'string') {
      return slugify(data.title)
    }
  }

  return value
}

export function slugField(): TextField {
  return {
    name: 'slug',
    type: 'text',
    required: true,
    unique: true,
    index: true,
    admin: {
      position: 'sidebar',
    },
    hooks: {
      beforeValidate: [buildSlug],
    },
  }
}
