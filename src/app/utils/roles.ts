import { Roles } from '@/types/globals'
import { auth } from '@clerk/nextjs/server'
import { CONFIG_FILES } from 'next/dist/shared/lib/constants'

export const checkRole = async (role: Roles) => {
  const { sessionClaims } = await auth()
  console.log('sessionClaims', sessionClaims?.metadata?.role)
  console.log('role', role)
  // Check if the session claims exist and if the role matches
  return sessionClaims?.metadata?.role === role
}