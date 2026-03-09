export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-zа-я0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatAudienceLabel(audience: 'private' | 'business' | 'both') {
  if (audience === 'private') {
    return 'Частные клиенты'
  }

  if (audience === 'business') {
    return 'Коммерческие объекты'
  }

  return 'Частные и коммерческие объекты'
}

export function absoluteUrl(pathname = '/') {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'http://localhost:3000'

  return `${base}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
}
