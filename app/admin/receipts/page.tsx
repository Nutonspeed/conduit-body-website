"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAuthStore, useReceiptStore } from "@/lib/store"

export default function AdminReceipts() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { receipts, fetchReceipts } = useReceiptStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    } else {
      fetchReceipts()
    }
  }, [isAuthenticated, router, fetchReceipts])

  if (!isAuthenticated) return null

  const download = (r: any) => {
    const csv = [
      ["Description", "Qty", "Price"],
      ...r.items.map((it: any) => [it.description, it.quantity, it.price]),
      ["Total", "", r.total],
    ]
      .map((row) => row.join(","))
      .join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `receipt_${r.id}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">ใบเสร็จย้อนหลัง</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-sarabun">วันที่</TableHead>
                  <TableHead className="font-sarabun">ออเดอร์</TableHead>
                  <TableHead className="font-sarabun">จำนวนเงิน</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {receipts.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-sarabun">
                      {new Date(r.issuedAt).toLocaleDateString("th-TH")}
                    </TableCell>
                    <TableCell className="font-sarabun">{r.orderId}</TableCell>
                    <TableCell className="font-sarabun">฿{r.total.toLocaleString()}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">ดู</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="font-sarabun">ใบเสร็จ {r.id}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-1 font-sarabun text-sm">
                            {r.items.map((it: any, idx: number) => (
                              <p key={idx}>
                                {it.description} × {it.quantity} = ฿{(it.price * it.quantity).toLocaleString()}
                              </p>
                            ))}
                            <p className="font-bold">รวม ฿{r.total.toLocaleString()}</p>
                          </div>
                          <Button className="mt-2" onClick={() => download(r)}>
                            ดาวน์โหลด CSV
                          </Button>
                        </DialogContent>
                      </Dialog>
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
