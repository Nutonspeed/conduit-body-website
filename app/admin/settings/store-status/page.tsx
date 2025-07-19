"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useAuthStore, useSettingStore } from "@/lib/store"

export default function StoreStatus() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { storeOpen, fetchSettings, toggleStore } = useSettingStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    } else {
      fetchSettings()
    }
  }, [isAuthenticated, router, fetchSettings])

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold font-sarabun">สถานะร้านค้า</h1>
        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">เปิด/ปิด ร้านค้า</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Label htmlFor="toggle" className="font-sarabun">
                {storeOpen ? "เปิดอยู่" : "ปิดอยู่"}
              </Label>
              <Switch
                id="toggle"
                checked={storeOpen}
                onCheckedChange={(checked) => toggleStore(checked as boolean)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
