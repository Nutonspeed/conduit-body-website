"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuthStore, useSettingsStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function StockSettings() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { stockThreshold, setThreshold } = useSettingsStore()
  const [value, setValue] = useState(stockThreshold)

  useEffect(() => {
    if (!isAuthenticated) router.push("/admin/login")
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold font-sarabun">ตั้งค่าการแจ้งเตือน Stock</h1>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="font-sarabun">ระดับ Stock ต่ำ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
            />
            <Button onClick={() => setThreshold(value)}>บันทึก</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
