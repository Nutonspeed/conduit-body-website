"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuthStore, useCustomerStore } from "@/lib/store"

export default function AdminCustomers() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { customers } = useCustomerStore()
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const filtered = customers
    .filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.phone.includes(query)
    )
    .sort(
      (a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime()
    )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold font-sarabun">รายชื่อลูกค้า</h1>
        <Input
          placeholder="ค้นหา..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-sm"
        />
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
