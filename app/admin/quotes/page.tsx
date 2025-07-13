"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Download } from "lucide-react"
import { useAuthStore, useQuoteStore, useInvoiceStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

export default function AdminQuotes() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { quotes, updateStatus } = useQuoteStore()
  const { createInvoiceFromQuote, getInvoiceForQuote } = useInvoiceStore()
  const { toast } = useToast()

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
                  <TableHead className="font-sarabun">บิล</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.map((q) => {
                  const invoice = getInvoiceForQuote(q.id)
                  return (
                    <TableRow key={q.id}>
                      <TableCell className="font-sarabun">{q.name}</TableCell>
                      <TableCell className="font-sarabun">{q.phone}</TableCell>
                      <TableCell className="font-sarabun">{q.message}</TableCell>
                      <TableCell>
                        <Select
                          value={q.status}
                          onValueChange={(v) => updateStatus(q.id, v as any)}
                          disabled={q.status === "ปิดการขาย"}
                        >
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
                      <TableCell>
                        {q.status === "ปิดการขาย" && invoice ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                ดูบิล
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle className="font-sarabun">
                                  ใบเสนอราคา {invoice.invoiceId}
                                </DialogTitle>
                              </DialogHeader>
                              <div className="space-y-2 font-sarabun">
                                <p>ลูกค้า: {invoice.customer}</p>
                                <p>วันที่: {new Date(invoice.createdAt).toLocaleDateString("th-TH")}</p>
                                <ul className="space-y-1 text-sm">
                                  {invoice.items.map((it, idx) => (
                                    <li key={idx}>
                                      {it.productName} {it.size}&quot; × {it.quantity} = ฿{(it.price * it.quantity).toLocaleString()}
                                    </li>
                                  ))}
                                </ul>
                                <p className="font-bold">รวม ฿{invoice.amount.toLocaleString()}</p>
                                <Button
                                  className="mt-2"
                                  onClick={() => {
                                    const blob = new Blob(["mock"], { type: "application/pdf" })
                                    const link = document.createElement("a")
                                    link.href = URL.createObjectURL(blob)
                                    link.download = `${invoice.invoiceId}.pdf`
                                    document.body.appendChild(link)
                                    link.click()
                                    document.body.removeChild(link)
                                  }}
                                >
                                  ดาวน์โหลดใบเสนอราคา
                                </Button>
                                <Button
                                  variant="ghost"
                                  onClick={() => {
                                    console.log(`ส่ง mock quote ไปยังแชท: ${q.id}`)
                                    toast({ description: "ส่งลิงก์ใบเสนอราคาแล้ว (mock)" })
                                  }}
                                >
                                  ส่งใบเสนอราคาเข้าแชท
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => {
                              if (confirm("ยืนยันสร้างบิล (mock)?")) {
                                const inv = createInvoiceFromQuote(q)
                                updateStatus(q.id, "ปิดการขาย")
                                toast({ description: `สร้างบิล ${inv.invoiceId} แล้ว (mock)` })
                              }
                           }}
                          >
                            สร้างบิล (mock)
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
