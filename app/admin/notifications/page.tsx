"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuthStore, useNotificationStore } from '@/lib/store'

export default function AdminNotifications() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { notifications, fetchNotifications, markRead, deleteNotification } = useNotificationStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login')
    } else {
      fetchNotifications()
    }
  }, [isAuthenticated, router, fetchNotifications])

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold font-sarabun">การแจ้งเตือน</h1>
        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">รายการแจ้งเตือน</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className="flex justify-between items-center border rounded-lg p-3">
                <div>
                  <p className="font-sarabun">{n.message}</p>
                  <p className="text-xs text-gray-500 font-sarabun">
                    {new Date(n.createdAt).toLocaleString('th-TH')}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!n.read && <Badge>ใหม่</Badge>}
                  <Button size="sm" variant="outline" onClick={() => markRead(n.id)} disabled={n.read}>
                    ทำเครื่องหมายอ่านแล้ว
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => deleteNotification(n.id)}>
                    ลบ
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
