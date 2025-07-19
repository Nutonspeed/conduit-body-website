"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuthStore, useCustomerStore, useTagStore } from "@/lib/store"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminCustomers() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { customers, fetchCustomers, updateCustomer } = useCustomerStore()
  const { tags, fetchTags } = useTagStore()
  const [query, setQuery] = useState("")
  const [filterTag, setFilterTag] = useState("all")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    } else {
      fetchCustomers()
      fetchTags()
    }
  }, [isAuthenticated, router, fetchCustomers, fetchTags])

  if (!isAuthenticated) {
    return null
  }

  const filtered = customers
    .filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.phone.includes(query)
    )
    .filter((c) =>
      filterTag === "all" ? true : (c.tags || []).includes(filterTag)
    )
    .sort(
      (a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime()
    )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold font-sarabun">รายชื่อลูกค้า</h1>
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
            <CardTitle className="font-sarabun">
              ลูกค้า ({filtered.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-sarabun">ชื่อ</TableHead>
                  <TableHead className="font-sarabun">เบอร์</TableHead>
                  <TableHead className="font-sarabun">ครั้งที่ติดต่อ</TableHead>
                  <TableHead className="font-sarabun">จาก</TableHead>
                  <TableHead className="font-sarabun">แท็ก</TableHead>
                  <TableHead className="font-sarabun">วันที่</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-sarabun">{c.name}</TableCell>
                    <TableCell className="font-sarabun">{c.phone}</TableCell>
                    <TableCell className="font-sarabun text-center">
                      {c.contactCount}
                    </TableCell>
                  <TableCell>
                    <Badge variant={c.from === "lead" ? "default" : "secondary"}>
                      {c.from === "lead" ? "จาก lead" : "จาก quote"}
                    </Badge>
                  </TableCell>
                  <TableCell className="space-x-1">
                    {(c.tags || []).map((t) => (
                      <Badge key={t} variant="outline" className="cursor-pointer" onClick={() => updateCustomer(c.id, { tags: (c.tags || []).filter(tag => tag !== t) })}>
                        {t} ×
                      </Badge>
                    ))}
                    <Select onValueChange={(v) => updateCustomer(c.id, { tags: [...(c.tags || []), v] })}>
                      <SelectTrigger className="w-24 h-6">
                        <SelectValue placeholder="+" />
                      </SelectTrigger>
                      <SelectContent>
                        {tags.filter((t) => !(c.tags || []).includes(t)).map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="font-sarabun">
                    {new Date(c.joinedAt).toLocaleDateString("th-TH")}
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
