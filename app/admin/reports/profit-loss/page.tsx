"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/lib/store"

interface Expense {
  id: string
  amount: number
  date: string
  description: string
  category: string
}

interface SaleSummary {
  date: string
  total: number
}

export default function ProfitLossPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const [sales, setSales] = useState<SaleSummary[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    } else {
      fetch("/api/reports/sales").then(res => res.json()).then(setSales)
      fetch("/api/reports/expenses").then(res => res.json()).then(setExpenses)
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  const totalSales = sales.reduce((sum, s) => sum + s.total, 0)
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
  const profit = totalSales - totalExpenses

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">สรุปกำไรขาดทุน</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 font-sarabun">
            <p>ยอดขายรวม: ฿{totalSales.toLocaleString()}</p>
            <p>รายจ่ายรวม: ฿{totalExpenses.toLocaleString()}</p>
            <p className="font-bold">กำไร: ฿{profit.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
