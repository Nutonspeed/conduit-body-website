"use client"

import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import QRCode from "qrcode"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useInvoiceStore } from "@/lib/store"

export default function InvoicePage() {
  const params = useParams<{ invoiceId: string }>()
  const { getInvoiceById } = useInvoiceStore()
  const invoice = getInvoiceById(params.invoiceId)
  const [qr, setQr] = useState<string | null>(null)

  useEffect(() => {
    if (invoice && invoice.status === "รอชำระ") {
      QRCode.toDataURL(`https://example.com/pay/${invoice.invoiceId}`)
        .then(setQr)
        .catch(() => setQr(null))
    }
  }, [invoice])

  if (!invoice) {
    return (
      <div className="min-h-screen py-8 flex items-center justify-center">
        <p className="font-sarabun">ไม่พบข้อมูลบิล</p>
      </div>
    )
  }

  const shipping =
    invoice.amount < 500 ? 50 : invoice.amount <= 1000 ? 80 : 120

  const statusVariant =
    invoice.status === "รอชำระ"
      ? "default"
      : invoice.status === "ชำระแล้ว"
        ? "secondary"
        : "destructive"

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-6">
        <div className="flex items-center gap-4">
          <Image src="/placeholder-logo.png" alt="logo" width={80} height={80} />
          <div>
            <h1 className="text-3xl font-bold font-sarabun">
              ใบแจ้งหนี้ {invoice.invoiceId}
            </h1>
            <p className="text-sm text-gray-500 font-sarabun">
              วันที่ {new Date(invoice.createdAt).toLocaleDateString("th-TH")}
            </p>
            <Badge variant={statusVariant} className="mt-2">
              {invoice.status}
            </Badge>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">รายละเอียด</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 font-sarabun">
            <p>ลูกค้า: {invoice.customer}</p>
            <ul className="space-y-1 text-sm">
              {invoice.items.map((it, idx) => (
                <li key={idx}>
                  {it.productName} {it.size}&quot; × {it.quantity} = ฿
                  {(it.price * it.quantity).toLocaleString()}
                </li>
              ))}
            </ul>
            <p className="font-bold">ยอดสินค้า ฿{invoice.amount.toLocaleString()}</p>
            <p>ค่าส่ง (โดยประมาณ) ฿{shipping.toLocaleString()}</p>
            <p className="font-bold">
              รวมทั้งหมด ฿{(invoice.amount + shipping).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        {invoice.status === "รอชำระ" && qr && (
          <div className="text-center space-y-2">
            <Image src={qr} alt="mock qr" width={200} height={200} className="mx-auto" />
            <p className="text-sm text-gray-500 font-sarabun">
              QR นี้ใช้เพื่อทดสอบระบบเท่านั้น
            </p>
          </div>
        )}
        {invoice.status === "ชำระแล้ว" && (
          <p className="text-center font-sarabun">
            บิลนี้ชำระเรียบร้อยแล้ว
          </p>
        )}
        {invoice.status === "หมดอายุ" && (
          <p className="text-center font-sarabun">
            บิลนี้หมดอายุแล้ว โปรดติดต่อแอดมิน
          </p>
        )}
      </div>
    </div>
  )
}
