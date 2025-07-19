"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuthStore, useOrderStore } from '@/lib/store'
import { jsPDF } from 'jspdf'

export default function ExportOrdersPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { orders, fetchOrders } = useOrderStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login')
    } else {
      fetchOrders()
    }
  }, [isAuthenticated, router, fetchOrders])

  if (!isAuthenticated) return null

  const exportPdf = (order: any) => {
    const doc = new jsPDF()
    doc.text(`Order ${order.id}`, 10, 10)
    doc.text(`Customer: ${order.customer}`, 10, 20)
    order.items.forEach((it: any, idx: number) => {
      doc.text(
        `${it.name} ${it.size} x ${it.quantity} = ฿${(it.price * it.quantity).toLocaleString()}`,
        10,
        30 + idx * 10
      )
    })
    doc.text(`Total: ฿${order.total.toLocaleString()}`, 10, 40 + order.items.length * 10)
    doc.save(`order_${order.id}.pdf`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold font-sarabun">Export Orders to PDF</h1>
        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">รายการ Order</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="flex justify-between items-center border rounded-lg p-3">
                <div>
                  <p className="font-sarabun">{o.customer}</p>
                  <p className="text-xs text-gray-500 font-sarabun">
                    {new Date(o.createdAt).toLocaleDateString('th-TH')}
                  </p>
                </div>
                <Button size="sm" variant="outline" onClick={() => exportPdf(o)}>
                  Export PDF
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
