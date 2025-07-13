"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download } from "lucide-react"
import { useAuthStore, useQuoteStore } from "@/lib/store"

export default function AdminQuotes() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { quotes, updateStatus } = useQuoteStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const exportCSV = () => {
    const headers = ["ชื่อ", "เบอร์", "หมายเหตุ", "สถานะ"]
    const rows = quotes.map((q) => [q.name, q.phone, q.message, q.status])
    const csv = [headers, ...rows].map((r) => r.map((f) => `"${f}"`).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `quotes_${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const statusBadge = (status: string) => {
    switch (status) {
      case "ใหม่":
        return "destructive"
      case "กำลังตอบ":
        return "default"
      case "ปิดการขาย":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold font-sarabun">คำขอใบเสนอราคา</h1>
          <Button onClick={exportCSV}>
            <Download className="w-4 h-4 mr-2" /> Export as CSV
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">รายการคำขอ ({quotes.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-sarabun">ชื่อ</TableHead>
                  <TableHead className="font-sarabun">เบอร์</TableHead>
                  <TableHead className="font-sarabun">หมายเหตุ</TableHead>
                  <TableHead className="font-sarabun">สถานะ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell className="font-sarabun">{q.name}</TableCell>
                    <TableCell className="font-sarabun">{q.phone}</TableCell>
                    <TableCell className="font-sarabun">{q.message}</TableCell>
                    <TableCell>
                      <Select value={q.status} onValueChange={(v) => updateStatus(q.id, v as any)}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ใหม่">ใหม่</SelectItem>
                          <SelectItem value="กำลังตอบ">กำลังตอบ</SelectItem>
                          <SelectItem value="ปิดการขาย">ปิดการขาย</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
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
