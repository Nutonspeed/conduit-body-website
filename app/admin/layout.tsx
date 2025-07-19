"use client"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { useAuthStore } from '@/lib/store'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { isAuthenticated, role } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated || role !== 'admin') {
      router.push('/login')
    }
  }, [isAuthenticated, role, router])

  if (!isAuthenticated || role !== 'admin') return null
  return <>{children}</>
}
