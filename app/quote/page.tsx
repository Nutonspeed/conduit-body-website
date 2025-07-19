"use client"

import { useState } from "react"
import Link from "next/link"
import { useQuoteCartStore, useQuoteStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"

export default function QuotePage() {
  const { items, clearCart } = useQuoteCartStore()
  const { addQuote } = useQuoteStore()
  const [form, setForm] = useState({ name: "", phone: "", message: "" })

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = total < 500 ? 50 : total <= 1000 ? 80 : 120

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return
    const data = { ...form, items }
    const q = await addQuote(data)
    if (q) {
      toast({ title: "ส่งคำขอแล้ว", description: "เราจะติดต่อกลับโดยเร็วที่สุด" })
      clearCart()
      setForm({ name: "", phone: "", message: "" })
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold font-sarabun">สรุปคำขอใบเสนอราคา</h1>
        {items.length === 0 ? (
          <p className="text-gray-500 font-sarabun">ยังไม่มีสินค้าในคำขอ</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="font-sarabun">รายการสินค้า</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}`} className="flex justify-between">
                  <div className="font-sarabun">
                    {item.productName} ({item.size}") × {item.quantity}
                  </div>
                  <div>฿{(item.price * item.quantity).toLocaleString()}</div>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-bold">
                <span className="font-sarabun">ยอดสินค้า</span>
                <span>฿{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-sarabun">
                <span>ค่าส่งโดยประมาณ*</span>
                <span>฿{shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="font-sarabun">รวมทั้งหมด</span>
                <span>฿{(total + shipping).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">ข้อมูลผู้ติดต่อ</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="font-sarabun">ชื่อ-นามสกุล</label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label htmlFor="phone" className="font-sarabun">เบอร์โทร</label>
                <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              </div>
              <div>
                <label htmlFor="message" className="font-sarabun">หมายเหตุ</label>
                <Textarea id="message" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>
              <Button type="submit" className="w-full">ส่งคำขอใบเสนอราคา</Button>
            </form>
          </CardContent>
        </Card>
        <p className="text-sm text-gray-500 font-sarabun">*ค่าส่งโดยประมาณ</p>
        {items.length === 0 && (
          <Button asChild className="w-full">
            <Link href="/products">เลือกสินค้า</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
