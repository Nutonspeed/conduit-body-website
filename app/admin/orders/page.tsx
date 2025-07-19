"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuthStore, useOrderStore, useTagStore } from "@/lib/store"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminOrders() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { orders, fetchOrders, updateOrder } = useOrderStore()
  const { tags, fetchTags } = useTagStore()
  const [query, setQuery] = useState("")
  const [filterTag, setFilterTag] = useState("all")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    } else {
      fetchOrders()
      fetchTags()
    }
  }, [isAuthenticated, router, fetchOrders, fetchTags])

  if (!isAuthenticated) return null

  const filtered = orders
    .filter((o) => o.customerName.toLowerCase().includes(query.toLowerCase()))
    .filter((o) => (filterTag === "all" ? true : (o.tags || []).includes(filterTag)))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold font-sarabun">Orders</h1>
        <div className="flex gap-4">
          <Input
            placeholder="ค้นหา..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-sm"
          />
          <Select value={filterTag} onValueChange={setFilterTag}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทั้งหมด</SelectItem>
              {tags.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">Orders ({filtered.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-sarabun">ลูกค้า</TableHead>
                  <TableHead className="font-sarabun">ยอด</TableHead>
                  <TableHead className="font-sarabun">สถานะ</TableHead>
                  <TableHead className="font-sarabun">แท็ก</TableHead>
                  <TableHead className="font-sarabun">วันที่</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-sarabun">{o.customerName}</TableCell>
                    <TableCell className="font-sarabun">฿{o.total.toLocaleString()}</TableCell>
                    <TableCell className="font-sarabun">{o.status}</TableCell>
                    <TableCell className="space-x-1">
                      {(o.tags || []).map((t) => (
                        <Badge key={t} variant="outline" className="cursor-pointer" onClick={() => updateOrder(o.id, { tags: (o.tags || []).filter(tag => tag !== t) })}>
                          {t} ×
                        </Badge>
                      ))}
                      <Select onValueChange={(v) => updateOrder(o.id, { tags: [...(o.tags || []), v] })}>
                        <SelectTrigger className="w-24 h-6">
                          <SelectValue placeholder="+" />
                        </SelectTrigger>
                        <SelectContent>
                          {tags.filter((t) => !(o.tags || []).includes(t)).map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="font-sarabun">
                      {new Date(o.createdAt).toLocaleDateString("th-TH")}
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
