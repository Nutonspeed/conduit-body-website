"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { useAuthStore, usePaymentMethodStore } from "@/lib/store"

export default function AdminPaymentMethods() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { methods, fetchMethods, addMethod } = usePaymentMethodStore()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [form, setForm] = useState({ name: "", account: "" })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    } else {
      fetchMethods()
    }
  }, [isAuthenticated, router, fetchMethods])

  if (!isAuthenticated) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addMethod(form)
    setForm({ name: "", account: "" })
    setIsDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-sarabun">ช่องทางการชำระเงิน</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" /> เพิ่มช่องทาง
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-sarabun">เพิ่มช่องทางชำระเงิน</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="font-sarabun">ชื่อช่องทาง</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="acc" className="font-sarabun">รายละเอียด/เลขบัญชี</Label>
                  <Input id="acc" value={form.account} onChange={(e) => setForm({ ...form, account: e.target.value })} required />
                </div>
                <Button type="submit">บันทึก</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">รายการช่องทาง</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-sarabun">ชื่อ</TableHead>
                  <TableHead className="font-sarabun">รายละเอียด</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {methods.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-sarabun">{m.name}</TableCell>
                    <TableCell className="font-sarabun">{m.account}</TableCell>
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
