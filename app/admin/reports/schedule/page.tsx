"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/lib/store'

export default function ScheduleReportPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const [time, setTime] = useState('09:00')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold font-sarabun">Scheduled Report (Mock)</h1>
        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">ตั้งเวลา Export รายงาน</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
              <Button onClick={handleSave}>บันทึก</Button>
            </div>
            {saved && <p className="text-sm text-green-600 font-sarabun">บันทึกการตั้งเวลาสำเร็จ (mock)</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
