import type { Access } from 'payload'

type UserWithRoles = {
  roles?: string[] | null
}

export const isAdmin: Access = ({ req }) => {
  const user = req.user as UserWithRoles | null

  return Boolean(user?.roles?.includes('admin'))
}

export const publicRead: Access = () => true
