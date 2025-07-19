"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore, useAutomationStore } from "@/lib/store"

export default function AutomationActions() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { sendBroadcast, triggerEvent } = useAutomationStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">Automation Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => sendBroadcast()}>ส่งข้อความ Broadcast (mock)</Button>
            <Button variant="secondary" onClick={() => triggerEvent("order_created")}>Trigger order_created Event</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
