"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/store"

interface Payment {
  id: string
  amount: number
  uploadedAt: string
}

export default function TaxReportPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const [payments, setPayments] = useState<Payment[]>([])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    } else {
      fetch("/api/payments").then((res) => res.json()).then(setPayments)
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  const summary: Record<string, number> = {}
  for (const p of payments) {
    const month = p.uploadedAt.slice(0, 7)
    summary[month] = (summary[month] || 0) + (p.amount || 0)
  }
  const rows = Object.entries(summary).map(([m, total]) => ({
    month: m,
    total,
    vat: total * 0.07,
  }))

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold font-sarabun">รายงานภาษี (mock)</h1>
          <Button onClick={() => router.push("/admin/reports/tax/export")}>Export CSV</Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">สรุปยอดต่อเดือน</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-sarabun">เดือน</TableHead>
                  <TableHead className="font-sarabun">ยอดขาย</TableHead>
                  <TableHead className="font-sarabun">ภาษี 7%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.month}>
                    <TableCell className="font-sarabun">{r.month}</TableCell>
                    <TableCell className="font-sarabun">฿{r.total.toLocaleString()}</TableCell>
                    <TableCell className="font-sarabun">฿{r.vat.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
