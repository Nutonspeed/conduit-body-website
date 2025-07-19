"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { ProductOption, ProductVariant } from "@/lib/mockData"
import {
  useAuthStore,
  useProductStore,
} from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface PageProps {
  params: { id: string }
}

export default function VariantEditor({ params }: PageProps) {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { products, updateProduct } = useProductStore()
  const product = products.find((p) => p.id === params.id)

  const [options, setOptions] = useState<ProductOption[]>(product?.options || [])
  const [variants, setVariants] = useState<ProductVariant[]>(product?.variants || [])

  useEffect(() => {
    if (!isAuthenticated) router.push("/admin/login")
  }, [isAuthenticated, router])

  if (!isAuthenticated || !product) return null

  const handleAddOption = () => {
    setOptions([...options, { name: "", values: [] }])
  }

  const handleOptionChange = (
    index: number,
    field: "name" | "values",
    value: string,
  ) => {
    setOptions((prev) => {
      const copy = [...prev]
      if (field === "name") copy[index].name = value
      else copy[index].values = value.split(",").map((v) => v.trim())
      return copy
    })
  }

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index))
  }

  const handleAddVariant = () => {
    setVariants([
      ...variants,
      { sku: "", price: product.basePrice, stock: 0, options: {} },
    ])
  }

  const handleVariantChange = (
    index: number,
    field: string,
    value: string,
    optName?: string,
  ) => {
    setVariants((prev) => {
      const copy = [...prev]
      const v = { ...copy[index] }
      if (field === "sku") v.sku = value
      else if (field === "price") v.price = Number(value)
      else if (field === "stock") v.stock = Number(value)
      else if (field === "option" && optName) {
        v.options[optName] = value
      }
      copy[index] = v
      return copy
    })
  }

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    updateProduct(product.id, { options, variants })
    router.push("/admin/products")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold font-sarabun">จัดการตัวเลือกสินค้า</h1>

        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">ตัวเลือก</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {options.map((opt, i) => (
              <div key={i} className="grid grid-cols-2 gap-4 items-end">
                <div>
                  <Label className="font-sarabun">ชื่อ</Label>
                  <Input
                    value={opt.name}
                    onChange={(e) => handleOptionChange(i, "name", e.target.value)}
                  />
                </div>
                <div>
                  <Label className="font-sarabun">ค่า (คั่นด้วย ,)</Label>
                  <Input
                    value={opt.values.join(", ")}
                    onChange={(e) =>
                      handleOptionChange(i, "values", e.target.value)
                    }
                  />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeOption(i)}
                >
                  ลบ
                </Button>
              </div>
            ))}
            <Button size="sm" onClick={handleAddOption}>
              เพิ่มตัวเลือก
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">Variants</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  {options.map((o) => (
                    <TableHead key={o.name}>{o.name}</TableHead>
                  ))}
                  <TableHead>ราคา</TableHead>
                  <TableHead>สต็อก</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {variants.map((v, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Input
                        value={v.sku}
                        onChange={(e) =>
                          handleVariantChange(idx, "sku", e.target.value)
                        }
                      />
                    </TableCell>
                    {options.map((o) => (
                      <TableCell key={o.name}>
                        <select
                          className="border rounded p-1 w-full"
                          value={v.options[o.name] || ""}
                          onChange={(e) =>
                            handleVariantChange(
                              idx,
                              "option",
                              e.target.value,
                              o.name,
                            )
                          }
                        >
                          <option value="">เลือก</option>
                          {o.values.map((val) => (
                            <option key={val} value={val}>
                              {val}
                            </option>
                          ))}
                        </select>
                      </TableCell>
                    ))}
                    <TableCell>
                      <Input
                        type="number"
                        value={v.price}
                        onChange={(e) =>
                          handleVariantChange(idx, "price", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={v.stock}
                        onChange={(e) =>
                          handleVariantChange(idx, "stock", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeVariant(idx)}
                      >
                        ลบ
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button size="sm" className="mt-4" onClick={handleAddVariant}>
              เพิ่ม Variant
            </Button>
          </CardContent>
        </Card>

        <Button onClick={handleSave}>บันทึก</Button>
      </div>
    </div>
  )
}
