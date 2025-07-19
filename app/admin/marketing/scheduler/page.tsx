"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Schedule {
  id: string
  name: string
  datetime: string
  channel: string
  content: string
}

export default function MarketingScheduler() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const [items, setItems] = useState<Schedule[]>([])
  const [form, setForm] = useState({ name: "", datetime: "", channel: "Facebook", content: "" })

  useEffect(() => {
    if (!isAuthenticated) router.push("/admin/login")
  }, [isAuthenticated, router])

  useEffect(() => {
    fetch("/api/marketing").then(res => res.json()).then(setItems)
  }, [])

  const save = async () => {
    const res = await fetch("/api/marketing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      const data = await res.json()
      setItems((prev) => [...prev, data])
      setForm({ name: "", datetime: "", channel: "Facebook", content: "" })
    }
  }

  if (!isAuthenticated) return null

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Marketing Scheduler</h1>
      <div className="grid grid-cols-4 gap-2">
        <Input placeholder="ชื่อโพสต์" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <Input type="datetime-local" value={form.datetime} onChange={e => setForm({ ...form, datetime: e.target.value })} />
        <Input placeholder="ช่องทาง" value={form.channel} onChange={e => setForm({ ...form, channel: e.target.value })} />
        <Button onClick={save}>บันทึก</Button>
      </div>
      <Textarea placeholder="เนื้อหา" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ชื่อ</TableHead>
            <TableHead>เวลา</TableHead>
            <TableHead>ช่องทาง</TableHead>
            <TableHead>เนื้อหา</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((i) => (
            <TableRow key={i.id}>
              <TableCell>{i.name}</TableCell>
              <TableCell>{new Date(i.datetime).toLocaleString()}</TableCell>
              <TableCell>{i.channel}</TableCell>
              <TableCell>{i.content}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
