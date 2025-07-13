"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, ShoppingCart, TrendingUp, Clock } from "lucide-react"
import { useAuthStore, useLeadStore } from "@/lib/store"

export default function AdminDashboard() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { leads } = useLeadStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const totalLeads = leads.length
  const newLeads = leads.filter((lead) => lead.status === "รอติดต่อ").length
  const inProgressLeads = leads.filter((lead) => lead.status === "กำลังเจรจา").length
  const closedLeads = leads.filter((lead) => lead.status === "ปิดการขาย").length

  const recentLeads = leads.slice(0, 5)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2 font-sarabun">Dashboard</h1>
          <p className="text-gray-600 font-sarabun">ภาพรวมการขายและ Leads</p>
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
