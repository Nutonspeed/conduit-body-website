"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useInvoiceStore } from "@/lib/store"

export default function AccountInvoices() {
  const { invoices, fetchInvoices } = useInvoiceStore()

  useEffect(() => {
    fetchInvoices()
  }, [fetchInvoices])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">ประวัติใบแจ้งหนี้</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-sarabun">หมายเลข</TableHead>
                  <TableHead className="font-sarabun">วันที่</TableHead>
                  <TableHead className="font-sarabun">ยอด</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((inv) => (
                  <TableRow key={inv.invoiceId}>
                    <TableCell className="font-sarabun">{inv.invoiceId}</TableCell>
                    <TableCell className="font-sarabun">{new Date(inv.createdAt).toLocaleDateString("th-TH")}</TableCell>
                    <TableCell className="font-sarabun">฿{inv.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Button size="sm" asChild>
                        <Link href={`/admin/invoices/${inv.invoiceId}`}>ดู / ดาวน์โหลด</Link>
                      </Button>
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
