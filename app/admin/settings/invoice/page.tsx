"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore, useInvoiceSettingStore } from "@/lib/store"

export default function InvoiceSettingsPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { settings, updateSettings } = useInvoiceSettingStore()
  const [form, setForm] = useState(settings)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateSettings({
      startNumber: Number(form.startNumber),
      footer: form.footer,
      logo: form.logo,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">ตั้งค่าใบแจ้งหนี้</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="num" className="font-sarabun">หมายเลขเริ่มต้น</Label>
                <Input id="num" type="number" value={form.startNumber} onChange={(e) => setForm({ ...form, startNumber: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="logo" className="font-sarabun">โลโก้ (URL)</Label>
                <Input id="logo" value={form.logo} onChange={(e) => setForm({ ...form, logo: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="footer" className="font-sarabun">ฟุตเตอร์</Label>
                <Input id="footer" value={form.footer} onChange={(e) => setForm({ ...form, footer: e.target.value })} />
              </div>
              <Button type="submit">บันทึก</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
