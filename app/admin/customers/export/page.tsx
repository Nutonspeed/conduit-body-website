"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore, useCustomerStore } from '@/lib/store'

export default function ExportCustomersPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { customers, fetchCustomers } = useCustomerStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login')
    } else {
      fetchCustomers()
    }
  }, [isAuthenticated, router, fetchCustomers])

  if (!isAuthenticated) return null

  const exportCSV = () => {
    const headers = ['ชื่อ', 'เบอร์', 'ครั้งที่ติดต่อ', 'จาก', 'วันที่']
    const csv = [
      headers.join(','),
      ...customers.map((c) =>
        [
          c.name,
          c.phone,
          c.contactCount,
          c.from,
          new Date(c.joinedAt).toLocaleDateString('th-TH'),
        ]
          .map((f) => `"${f}"`)
          .join(',')
      ),
    ].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `customers_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold font-sarabun">Export Customers CSV</h1>
        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">ลูกค้า {customers.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={exportCSV}>Export CSV</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
