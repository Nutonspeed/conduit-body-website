"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuthStore } from "@/lib/store"

export default function AdminLogin() {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    remember: false,
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      if (credentials.username === "admin" && credentials.password === "password123") {
        login(credentials.remember)
        router.push("/admin")
      } else {
        setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง")
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold font-sarabun">เข้าสู่ระบบ Admin</CardTitle>
          <CardDescription className="font-sarabun">กรุณาเข้าสู่ระบบเพื่อจัดการเว็บไซต์</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username" className="font-sarabun">
                ชื่อผู้ใช้
              </Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
                required
                className="font-sarabun"
                placeholder="admin"
              />
            </div>

            <div>
              <Label htmlFor="password" className="font-sarabun">
                รหัสผ่าน
              </Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                required
                className="font-sarabun"
                placeholder="password123"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={credentials.remember}
                onCheckedChange={(checked) => setCredentials((prev) => ({ ...prev, remember: checked as boolean }))}
              />
              <Label htmlFor="remember" className="text-sm font-sarabun">
                จดจำการเข้าสู่ระบบ
              </Label>
            </div>

            {error && <div className="text-red-600 text-sm font-sarabun">{error}</div>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </Button>
          </form>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 font-sarabun">
              <strong>ข้อมูลทดสอบ:</strong>
              <br />
              ชื่อผู้ใช้: admin
              <br />
              รหัสผ่าน: password123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
