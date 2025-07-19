"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { usePaymentMethodStore } from "@/lib/store"

export default function PaymentUploadPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const amount = searchParams.get("amount") || "0"
  const methodId = searchParams.get("method") || ""
  const { methods } = usePaymentMethodStore()

  const method = methods.find((m) => m.id === methodId)
  const [fileData, setFileData] = useState<string>("")

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setFileData(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fileData) {
      alert("กรุณาอัปโหลดสลิป")
      return
    }
    await fetch("/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ methodId, amount: Number(amount), slip: fileData }),
    })
    alert("บันทึกการชำระเงินเรียบร้อย")
    router.push("/order/success")
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <CardTitle className="font-sarabun">อัปโหลดหลักฐานการชำระเงิน</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-sarabun mb-4">
              ช่องทาง: {method?.name ?? "-"} | ยอดชำระ: ฿{amount}
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input type="file" accept="image/*" onChange={handleFile} />
              <Button type="submit">ส่งหลักฐาน</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
