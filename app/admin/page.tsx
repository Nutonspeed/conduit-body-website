"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"
import { Users, ShoppingCart, TrendingUp, Clock, LineChart as LineChartIcon } from "lucide-react"
import { useAuthStore, useLeadStore } from "@/lib/store"

export default function AdminDashboard() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { leads, fetchLeads } = useLeadStore()
  const [sales, setSales] = useState<{ date: string; total: number }[]>([])
  const [expenses, setExpenses] = useState<{ id: string; amount: number; date: string }[]>([])
  const [customers, setCustomers] = useState<any[]>([])
  const [payments, setPayments] = useState<any[]>([])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    } else {
      fetchLeads()
      fetch("/api/reports/sales").then((res) => res.json()).then(setSales)
      fetch("/api/reports/expenses").then((res) => res.json()).then(setExpenses)
      fetch("/api/customers").then((res) => res.json()).then(setCustomers)
      fetch("/api/payments").then((res) => res.json()).then(setPayments)
    }
  }, [isAuthenticated, router, fetchLeads])

  if (!isAuthenticated) {
    return null
  }

  const totalLeads = leads.length
  const newLeads = leads.filter((lead) => lead.status === "รอติดต่อ").length
  const inProgressLeads = leads.filter((lead) => lead.status === "กำลังเจรจา").length
  const closedLeads = leads.filter((lead) => lead.status === "ปิดการขาย").length

  const recentLeads = leads.slice(0, 5)

  const today = new Date().toISOString().split("T")[0]
  const salesMap = Object.fromEntries(sales.map((s) => [s.date, s.total]))
  const expenseMap = expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.date] = (acc[e.date] || 0) + e.amount
    return acc
  }, {})
  const last7 = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const key = d.toISOString().split("T")[0]
    return {
      date: key,
      sales: salesMap[key] || 0,
      expenses: expenseMap[key] || 0,
    }
  })

  const todaySales = salesMap[today] || 0
  const newCustomers = customers.filter((c) => c.joinedAt?.startsWith(today)).length
  const newOrders = payments.filter((p) => p.uploadedAt?.startsWith(today)).length

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2 font-sarabun">Dashboard</h1>
          <p className="text-gray-600 font-sarabun">ภาพรวมการขายและ Leads</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-sarabun">ยอดขายวันนี้</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">฿{todaySales.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-sarabun">ลูกค้าใหม่วันนี้</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{newCustomers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-sarabun">ออเดอร์ใหม่วันนี้</CardTitle>
              <LineChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{newOrders}</div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-sarabun">Leads ทั้งหมด</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLeads}</div>
              <p className="text-xs text-muted-foreground font-sarabun">+2 จากเดือนที่แล้ว</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-sarabun">รอติดต่อ</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{newLeads}</div>
              <p className="text-xs text-muted-foreground font-sarabun">ต้องติดตามด่วน</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-sarabun">กำลังเจรจา</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{inProgressLeads}</div>
              <p className="text-xs text-muted-foreground font-sarabun">อยู่ในขั้นตอนการขาย</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-sarabun">ปิดการขาย</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{closedLeads}</div>
              <p className="text-xs text-muted-foreground font-sarabun">สำเร็จแล้ว</p>
            </CardContent>
          </Card>
        </div>

        {/* Financial Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-sarabun">ยอดขาย / รายจ่าย 7 วัน</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{ sales: { label: "Sales", color: "hsl(var(--chart-1))" }, expenses: { label: "Expenses", color: "hsl(var(--chart-2))" } }}
              className="h-72"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={last7}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="sales" fill="var(--color-sales)" name="Sales" />
                  <Bar dataKey="expenses" fill="var(--color-expenses)" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">Leads ล่าสุด</CardTitle>
            <CardDescription className="font-sarabun">รายการ Leads ที่เข้ามาใหม่</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold font-sarabun">{lead.customerName}</h3>
                      <Badge
                        variant={
                          lead.status === "รอติดต่อ"
                            ? "destructive"
                            : lead.status === "กำลังเจรจา"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {lead.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 font-sarabun">
                      {lead.company} • {lead.phone}
                    </p>
                    <p className="text-sm text-gray-600 font-sarabun">สนใจ: {lead.productInterest}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 font-sarabun">
                      {new Date(lead.createdAt).toLocaleDateString("th-TH")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
