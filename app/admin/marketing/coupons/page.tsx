"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore, useCouponStore } from "@/lib/store"

export default function CouponAdmin() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { coupons, fetchCoupons, addCoupon } = useCouponStore()

  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: "",
    expiresAt: "",
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    } else {
      fetchCoupons()
    }
  }, [isAuthenticated, router, fetchCoupons])

  if (!isAuthenticated) return null

  const handleAdd = () => {
    if (!newCoupon.code || !newCoupon.discount || !newCoupon.expiresAt) return
    addCoupon({
      code: newCoupon.code.toUpperCase(),
      discount: parseFloat(newCoupon.discount),
      expiresAt: newCoupon.expiresAt,
    })
    setNewCoupon({ code: "", discount: "", expiresAt: "" })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">จัดการคูปองส่วนลด</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-end gap-4">
              <div>
                <Label htmlFor="code" className="font-sarabun">
                  รหัสคูปอง
                </Label>
                <Input
                  id="code"
                  value={newCoupon.code}
                  onChange={(e) =>
                    setNewCoupon((p) => ({ ...p, code: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="discount" className="font-sarabun">
                  ส่วนลด (%)
                </Label>
                <Input
                  id="discount"
                  type="number"
                  value={newCoupon.discount}
                  onChange={(e) =>
                    setNewCoupon((p) => ({ ...p, discount: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="expire" className="font-sarabun">
                  วันหมดอายุ
                </Label>
                <Input
                  id="expire"
                  type="date"
                  value={newCoupon.expiresAt}
                  onChange={(e) =>
                    setNewCoupon((p) => ({ ...p, expiresAt: e.target.value }))
                  }
                />
              </div>
              <Button onClick={handleAdd}>เพิ่มคูปอง</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-sarabun">รหัส</TableHead>
                  <TableHead className="font-sarabun">ส่วนลด</TableHead>
                  <TableHead className="font-sarabun">หมดอายุ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-sarabun">{c.code}</TableCell>
                    <TableCell className="font-sarabun text-center">
                      {c.discount}%
                    </TableCell>
                    <TableCell className="font-sarabun">
                      {new Date(c.expiresAt).toLocaleDateString("th-TH")}
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
