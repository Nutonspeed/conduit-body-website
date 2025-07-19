"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useAuthStore, useTicketStore } from "@/lib/store"

export default function AdminTickets() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { tickets, fetchTickets, closeTicket } = useTicketStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    } else {
      fetchTickets()
    }
  }, [isAuthenticated, router, fetchTickets])

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold font-sarabun">Support Tickets</h1>
        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">Tickets ({tickets.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-sarabun">ลูกค้า</TableHead>
                  <TableHead className="font-sarabun">ข้อความ</TableHead>
                  <TableHead className="font-sarabun">สถานะ</TableHead>
                  <TableHead className="font-sarabun">วันที่</TableHead>
                  <TableHead className="font-sarabun">จัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-sarabun">{t.customer}</TableCell>
                    <TableCell className="font-sarabun">{t.message}</TableCell>
                    <TableCell className="font-sarabun">{t.status}</TableCell>
                    <TableCell className="font-sarabun">{new Date(t.createdAt).toLocaleDateString("th-TH")}</TableCell>
                    <TableCell>
                      <Button size="sm" onClick={() => closeTicket(t.id)} disabled={t.status === 'closed'}>
                        ปิด</Button>
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
