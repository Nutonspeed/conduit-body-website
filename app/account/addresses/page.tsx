"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2 } from "lucide-react"
import { useAddressStore } from "@/lib/store"

export default function AddressBookPage() {
  const { addresses, fetchAddresses, addAddress, updateAddress, deleteAddress } = useAddressStore()

  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [form, setForm] = useState({ label: "", address: "" })

  useEffect(() => {
    fetchAddresses()
  }, [fetchAddresses])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editing) {
      updateAddress(editing.id, form)
    } else {
      addAddress(form)
    }
    setOpen(false)
    setEditing(null)
    setForm({ label: "", address: "" })
  }

  const handleEdit = (addr: any) => {
    setEditing(addr)
    setForm({ label: addr.label, address: addr.address })
    setOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("ลบที่อยู่นี้?")) {
      deleteAddress(id)
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-sarabun">ที่อยู่ของฉัน</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditing(null); setForm({ label: "", address: "" }) }}>
                <Plus className="w-4 h-4 mr-2" />เพิ่มที่อยู่
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-sarabun">{editing ? "แก้ไข" : "เพิ่ม"} ที่อยู่</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="label" className="font-sarabun">ชื่อที่อยู่</label>
                  <Input id="label" value={form.label} onChange={e => setForm({ ...form, label: e.target.value })} required />
                </div>
                <div>
                  <label htmlFor="address" className="font-sarabun">รายละเอียด</label>
                  <Textarea id="address" rows={3} value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} required />
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
            <CardTitle className="font-sarabun">รายการที่อยู่</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-sarabun">ชื่อ</TableHead>
                  <TableHead className="font-sarabun">ที่อยู่</TableHead>
                  <TableHead className="font-sarabun">จัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {addresses.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-sarabun">{a.label}</TableCell>
                    <TableCell className="font-sarabun whitespace-pre-line">{a.address}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(a)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDelete(a.id)}>
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
