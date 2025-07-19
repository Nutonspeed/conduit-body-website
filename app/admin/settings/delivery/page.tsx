"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2 } from "lucide-react"
import { useAuthStore, useDeliveryMethodStore } from "@/lib/store"

export default function DeliverySettings() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { deliveryMethods, fetchDeliveryMethods, addDeliveryMethod, updateDeliveryMethod, deleteDeliveryMethod } = useDeliveryMethodStore()

  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [form, setForm] = useState({ name: "", price: "" })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    } else {
      fetchDeliveryMethods()
    }
  }, [isAuthenticated, router, fetchDeliveryMethods])

  if (!isAuthenticated) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = { name: form.name, price: parseFloat(form.price) }
    if (editing) {
      updateDeliveryMethod(editing.id, data)
    } else {
      addDeliveryMethod(data)
    }
    setOpen(false)
    setEditing(null)
    setForm({ name: "", price: "" })
  }

  const handleEdit = (method: any) => {
    setEditing(method)
    setForm({ name: method.name, price: method.price.toString() })
    setOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("ยืนยันการลบ?")) {
      deleteDeliveryMethod(id)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-sarabun">ช่องทางจัดส่ง</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditing(null); setForm({ name: "", price: "" }) }}>
                <Plus className="w-4 h-4 mr-2" />เพิ่มช่องทาง
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-sarabun">{editing ? "แก้ไข" : "เพิ่ม"} ช่องทางจัดส่ง</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="font-sarabun">ชื่อ</label>
                  <Input id="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div>
                  <label htmlFor="price" className="font-sarabun">ค่าจัดส่ง (บาท)</label>
                  <Input id="price" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>ยกเลิก</Button>
                  <Button type="submit">บันทึก</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">รายการช่องทางจัดส่ง</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-sarabun">ชื่อ</TableHead>
                  <TableHead className="font-sarabun">ค่าจัดส่ง</TableHead>
                  <TableHead className="font-sarabun">จัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deliveryMethods.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-sarabun">{m.name}</TableCell>
                    <TableCell className="font-sarabun">฿{m.price}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(m)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDelete(m.id)}>
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
