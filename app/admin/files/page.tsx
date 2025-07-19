"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, Trash2 } from "lucide-react"
import { useAuthStore, useFileStore } from "@/lib/store"

export default function AdminFiles() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { files, fetchFiles, uploadFile, deleteFile } = useFileStore()
  const [selected, setSelected] = useState<File | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    } else {
      fetchFiles()
    }
  }, [isAuthenticated, router, fetchFiles])

  if (!isAuthenticated) return null

  const handleUpload = () => {
    if (selected) {
      uploadFile(selected.name)
      setSelected(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold font-sarabun">File Manager</h1>
        <div className="flex items-center gap-2">
          <Input
            type="file"
            onChange={(e) => setSelected(e.target.files?.[0] || null)}
            className="max-w-xs"
          />
          <Button onClick={handleUpload} disabled={!selected}>
            <Upload className="w-4 h-4 mr-2" /> Upload
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">Files ({files.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-sarabun">ชื่อไฟล์</TableHead>
                  <TableHead className="font-sarabun">อัพโหลดเมื่อ</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {files.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell className="font-sarabun">{f.name}</TableCell>
                    <TableCell className="font-sarabun">
                      {new Date(f.uploadedAt).toLocaleString("th-TH")}
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => deleteFile(f.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
