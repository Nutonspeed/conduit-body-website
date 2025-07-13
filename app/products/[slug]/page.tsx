"use client"

import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Shield, Award } from "lucide-react"
import { products } from "@/lib/mockData"
import { useEffect } from "react"
// Add Facebook Pixel tracking for product views
import { fbPixelTrack } from "@/components/FacebookPixel"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug)

  if (!product) {
    notFound()
  }

  // Add useEffect to track product views:
  useEffect(() => {
    if (product) {
      fbPixelTrack.viewContent(product.name, product.basePrice)
    }
  }, [product])

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div>
            <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt={product.name}
                width={400}
                height={400}
                className="object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <Image
                    src={`/placeholder.svg?height=100&width=100`}
                    alt={`${product.name} view ${i}`}
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex gap-2 mb-4">
              <Badge variant="outline">{product.type}</Badge>
              <Badge variant="outline">{product.material}</Badge>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 font-sarabun">{product.name}</h1>

            <p className="text-lg text-gray-600 mb-6 font-sarabun">{product.description}</p>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-2xl font-bold text-blue-600 mb-2">เริ่มต้น ฿{product.basePrice.toLocaleString()}</p>
              <p className="text-sm text-gray-600 font-sarabun">*ราคาขึ้นอยู่กับขนาดและจำนวน</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h3 className="font-bold mb-2 font-sarabun">ขนาดที่มีจำหน่าย</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Badge key={size} variant="secondary">
                      {size}"
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-2 font-sarabun">วัสดุ</h3>
                <p className="text-gray-600 font-sarabun">{product.material}</p>
              </div>

              <div>
                <h3 className="font-bold mb-2 font-sarabun">มาตรฐานรับรong</h3>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    UL Listed
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    NEMA Standard
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="flex-1">
                <Link href={`/order?product=${product.slug}`}>สั่งซื้อ / ขอใบเสนอราคา</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="tel:0-2925-9633">โทรสอบถาม</Link>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <CardTitle className="font-sarabun">คุณภาพมาตรฐาน</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center font-sarabun">
                ผ่านการรับรองมาตรฐาน UL และ NEMA รับประกันคุณภาพระดับสากล
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <CardTitle className="font-sarabun">ทนทานใช้งานยาวนาน</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center font-sarabun">
                วัสดุคุณภาพสูง ทนต่อสภาพแวดล้อมที่รุนแรง ใช้งานได้ยาวนาน
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Award className="w-12 h-12 text-yellow-600 mx-auto mb-2" />
              <CardTitle className="font-sarabun">ติดตั้งง่าย</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center font-sarabun">
                ออกแบบให้ติดตั้งได้ง่าย ประหยัดเวลาและค่าแรงในการติดตั้ง
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6 font-sarabun">สินค้าที่เกี่ยวข้อง</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter((p) => p.id !== product.id && p.type === product.type)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Card key={relatedProduct.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="p-4">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                      <Image
                        src="/placeholder.svg?height=150&width=150"
                        alt={relatedProduct.name}
                        width={150}
                        height={150}
                        className="object-contain"
                      />
                    </div>
                    <CardTitle className="text-lg font-sarabun">{relatedProduct.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-lg font-bold text-blue-600 mb-3">
                      เริ่มต้น ฿{relatedProduct.basePrice.toLocaleString()}
                    </p>
                    <Button asChild className="w-full" size="sm">
                      <Link href={`/products/${relatedProduct.slug}`}>ดูรายละเอียด</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
