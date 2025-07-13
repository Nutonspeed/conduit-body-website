"use client"

import Link from "next/link"
import { useQuoteCartStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Plus, Minus, Trash2 } from "lucide-react"

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useQuoteCartStore()

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-gray-500 font-sarabun">ยังไม่มีสินค้าในคำขอ</p>
          <Button asChild>
            <Link href="/products">เลือกสินค้า</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold mb-4 font-sarabun">ตะกร้าคำขอใบเสนอราคา</h1>
        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">รายการสินค้า</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="flex justify-between items-center border p-3 rounded-lg">
                <div className="font-sarabun">
                  <div>{item.productName}</div>
                  <div className="text-sm text-gray-600">ขนาด: {item.size}"</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}>
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}>
                    <Plus className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-600" onClick={() => removeItem(item.productId, item.size)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between font-bold">
              <span className="font-sarabun">รวม</span>
              <span className="text-blue-600">฿{total.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
        <Button asChild className="w-full">
          <Link href="/quote">ถัดไป</Link>
        </Button>
      </div>
    </div>
  )
}
