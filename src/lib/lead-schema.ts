import { z } from 'zod'

export const leadSchema = z.object({
  name: z.string().trim().min(2, 'Укажите имя'),
  phone: z
    .string()
    .trim()
    .min(10, 'Укажите телефон')
    .regex(/^[0-9+\-()\s]+$/, 'Телефон содержит недопустимые символы'),
  contactMethod: z.enum(['phone', 'telegram', 'whatsapp']),
  audienceType: z.enum(['private', 'business']),
  serviceSlug: z.string().trim().optional().or(z.literal('')),
  objectType: z.string().trim().min(2, 'Укажите тип объекта'),
  area: z.coerce.number().positive().max(10000).optional(),
  comment: z.string().trim().max(1200).optional().or(z.literal('')),
  sourcePage: z.string().trim().min(1),
})

export type LeadInput = z.infer<typeof leadSchema>
