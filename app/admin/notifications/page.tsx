"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuthStore, useNotificationStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function NotificationsPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { notifications, markRead } = useNotificationStore()

  useEffect(() => {
    if (!isAuthenticated) router.push("/admin/login")
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold font-sarabun">การแจ้งเตือน</h1>
        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="flex justify-between border p-3 rounded-lg"
                >
                  <div>
                    <p className="font-sarabun">{n.message}</p>
                    <p className="text-sm text-gray-500 font-sarabun">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {!n.read && (
                    <Button size="sm" onClick={() => markRead(n.id)}>
                      อ่านแล้ว
                    </Button>
                  )}
                </div>
              ))}
              {notifications.length === 0 && (
                <p className="font-sarabun">ไม่มีการแจ้งเตือน</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
