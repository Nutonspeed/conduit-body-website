"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useAuthStore, usePaymentStore, usePaymentMethodStore } from "@/lib/store"

export default function AdminPayments() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { payments, fetchPayments, verifyPayment } = usePaymentStore()
  const { methods, fetchMethods } = usePaymentMethodStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    } else {
      fetchPayments()
      fetchMethods()
    }
  }, [isAuthenticated, router, fetchPayments, fetchMethods])

  if (!isAuthenticated) return null

  const getMethodName = (id: string) => methods.find((m) => m.id === id)?.name || ""

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">การชำระเงิน</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-sarabun">วันที่</TableHead>
                  <TableHead className="font-sarabun">ช่องทาง</TableHead>
                  <TableHead className="font-sarabun">จำนวน</TableHead>
                  <TableHead className="font-sarabun">สถานะ</TableHead>
                  <TableHead className="font-sarabun">สลิป</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-sarabun">
                      {new Date(p.uploadedAt).toLocaleDateString("th-TH")}
                    </TableCell>
                    <TableCell className="font-sarabun">{getMethodName(p.methodId)}</TableCell>
                    <TableCell className="font-sarabun">฿{p.amount.toLocaleString()}</TableCell>
                    <TableCell className="font-sarabun">{p.status}</TableCell>
                    <TableCell>
                      <img src={p.slip} alt="slip" className="w-16 h-16 object-cover" />
                    </TableCell>
                    <TableCell>
                      {p.status === "pending" && (
                        <Button size="sm" onClick={() => verifyPayment(p.id)}>
                          ยืนยัน
                        </Button>
                      )}
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
