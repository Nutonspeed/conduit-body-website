"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useInvoiceStore } from "@/lib/store"

export default function InvoiceDetail() {
  const params = useParams()
  const { fetchInvoices, invoices } = useInvoiceStore()
  const [invoice, setInvoice] = useState<any>(null)

  useEffect(() => {
    fetchInvoices().then(() => {
      const inv = invoices.find((i) => i.invoiceId === params.id)
      setInvoice(inv)
    })
  }, [params.id, fetchInvoices, invoices])

  if (!invoice) return null

  return (
    <div className="p-8">
      <div className="max-w-xl mx-auto bg-white p-6 shadow font-sarabun" id="print-area">
        <h1 className="text-2xl font-bold mb-4">ใบแจ้งหนี้ {invoice.invoiceId}</h1>
        <p>ลูกค้า: {invoice.customer}</p>
        <p>วันที่: {new Date(invoice.createdAt).toLocaleDateString("th-TH")}</p>
        <ul className="my-4 space-y-1 text-sm">
          {invoice.items.map((it: any, idx: number) => (
            <li key={idx}>
              {it.productName} {it.size}&quot; × {it.quantity} = ฿{(it.price * it.quantity).toLocaleString()}
            </li>
          ))}
        </ul>
        <p className="font-bold">รวม ฿{invoice.amount.toLocaleString()}</p>
      </div>
      <div className="mt-4 flex justify-center">
        <Button onClick={() => window.print()}>พิมพ์ / บันทึก PDF</Button>
      </div>
    </div>
  )
}
