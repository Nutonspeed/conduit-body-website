"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Phone, Mail, ArrowLeft } from "lucide-react"

export default function OrderSuccessPage() {
  useEffect(() => {
    // Track successful order
    console.log("Order completed successfully")
  }, [])

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader className="pb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl lg:text-3xl font-bold text-slate-900 font-sarabun">
                ส่งคำขอใบเสนอราคาเรียบร้อยแล้ว!
              </CardTitle>
              <CardDescription className="text-lg font-sarabun">
                ขอบคุณสำหรับความไว้วางใจ เราจะติดต่อกลับเพื่อยืนยันรายละเอียดโดยเร็วที่สุด
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-4 font-sarabun">ขั้นตอนต่อไป</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <p className="font-sarabun">ทีมงานจะติดต่อเพื่อยืนยันรายละเอียดและราคา</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <p className="font-sarabun">จัดเตรียมสินค้าและแจ้งระยะเวลาจัดส่ง</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <p className="font-sarabun">จัดส่งสินค้าตามที่อยู่ที่ระบุ</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Phone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold mb-1 font-sarabun">โทรสอบถาม</h4>
                    <p className="text-sm text-gray-600 mb-2 font-sarabun">สอบถามสถานะคำขอใบเสนอราคา</p>
                    <Button asChild variant="outline" size="sm">
                      <Link href="tel:0-2925-9633">0-2925-9633</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Mail className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold mb-1 font-sarabun">ส่งอีเมล</h4>
                    <p className="text-sm text-gray-600 mb-2 font-sarabun">ติดต่อทีมขาย</p>
                    <Button asChild variant="outline" size="sm">
                      <Link href="mailto:sales@ozgedney.co.th">ส่งอีเมล</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="pt-6 border-t">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild variant="outline">
                    <Link href="/products">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      ดูสินค้าอื่น
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href="/">กลับหน้าแรก</Link>
                  </Button>
                </div>
              </div>

              <div className="text-sm text-gray-500 font-sarabun">
                <p>หมายเลขอ้างอิง: #{Date.now().toString().slice(-8)}</p>
                <p>
                  วันที่:{" "}
                  {new Date().toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
