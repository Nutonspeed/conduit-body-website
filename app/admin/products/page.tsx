"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2 } from "lucide-react"
import { useAuthStore, useProductStore } from "@/lib/store"

export default function AdminProducts() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    material: "",
    sizes: "",
    basePrice: "",
    slug: "",
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const productData = {
      ...formData,
      sizes: formData.sizes.split(",").map((s) => s.trim()),
      basePrice: Number.parseFloat(formData.basePrice),
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, productData)
    } else {
      addProduct(productData)
    }

    resetForm()
    setIsDialogOpen(false)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      type: "",
      material: "",
      sizes: "",
      basePrice: "",
      slug: "",
    })
    setEditingProduct(null)
  }

  const handleEdit = (product: any) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      type: product.type,
      material: product.material,
      sizes: product.sizes.join(", "),
      basePrice: product.basePrice.toString(),
      slug: product.slug,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบสินค้านี้?")) {
      deleteProduct(id)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 font-sarabun">จัดการสินค้า</h1>
            <p className="text-gray-600 font-sarabun">เพิ่ม แก้ไข หรือลบสินค้า</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                เพิ่มสินค้า
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="font-sarabun">{editingProduct ? "แก้ไขสินค้า" : "เพิ่มสินค้าใหม่"}</DialogTitle>
                <DialogDescription className="font-sarabun">กรอกข้อมูลสินค้าให้ครบถ้วน</DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="font-sarabun">
                      ชื่อสินค้า
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="slug" className="font-sarabun">
                      Slug (URL)
                    </Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                      placeholder="จะสร้างอัตโนมัติถ้าไม่กรอก"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="font-sarabun">
                    รายละเอียด
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type" className="font-sarabun">
                      ประเภท
                    </Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกประเภท" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LB">LB</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                        <SelectItem value="T">T</SelectItem>
                        <SelectItem value="LL">LL</SelectItem>
                        <SelectItem value="LR">LR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="material" className="font-sarabun">
                      วัสดุ
                    </Label>
                    <Select
                      value={formData.material}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, material: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกวัสดุ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Aluminum">Aluminum</SelectItem>
                        <SelectItem value="Iron">Iron</SelectItem>
                        <SelectItem value="Stainless Steel">Stainless Steel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sizes" className="font-sarabun">
                      ขนาด (คั่นด้วยจุลภาค)
                    </Label>
                    <Input
                      id="sizes"
                      value={formData.sizes}
                      onChange={(e) => setFormData((prev) => ({ ...prev, sizes: e.target.value }))}
                      placeholder="1/2, 3/4, 1, 1-1/4"
                    />
                  </div>

                  <div>
                    <Label htmlFor="basePrice" className="font-sarabun">
                      ราคาเริ่มต้น (บาท)
                    </Label>
                    <Input
                      id="basePrice"
                      type="number"
                      value={formData.basePrice}
                      onChange={(e) => setFormData((prev) => ({ ...prev, basePrice: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    ยกเลิก
                  </Button>
                  <Button type="submit">{editingProduct ? "บันทึกการแก้ไข" : "เพิ่มสินค้า"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">รายการสินค้า</CardTitle>
            <CardDescription className="font-sarabun">จำนวนสินค้าทั้งหมด: {products.length} รายการ</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-sarabun">ชื่อสินค้า</TableHead>
                  <TableHead className="font-sarabun">ประเภท</TableHead>
                  <TableHead className="font-sarabun">วัสดุ</TableHead>
                  <TableHead className="font-sarabun">ขนาด</TableHead>
                  <TableHead className="font-sarabun">ราคา</TableHead>
                  <TableHead className="font-sarabun">จัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium font-sarabun">{product.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.type}</Badge>
                    </TableCell>
                    <TableCell className="font-sarabun">{product.material}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {product.sizes.slice(0, 3).map((size) => (
                          <Badge key={size} variant="secondary" className="text-xs">
                            {size}"
                          </Badge>
                        ))}
                        {product.sizes.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{product.sizes.length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-sarabun">฿{product.basePrice.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDelete(product.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
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
